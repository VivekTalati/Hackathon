import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/authHelpers';
import { evaluateStudentAnswer, calculateMasteryLevel } from '@/lib/adaptiveEngine';
import { realtimeHub } from '@/lib/realtime/hub';

export async function POST(request: NextRequest) {
  try {
    const authContext = await requireUser();
    const body = await request.json();

    const {
      submissionId,
      sessionId,
      drillId,
      questionId,
      answer,
      responseTimeMs,
      reasoningChoice,
    } = body as {
      submissionId: string;
      sessionId: string;
      drillId: string;
      questionId: string;
      answer: string | string[];
      responseTimeMs: number;
      reasoningChoice?: string;
    };

    if (!submissionId || !sessionId || !questionId) {
      return NextResponse.json(
        { error: 'Missing required parameters: submissionId, sessionId, questionId' },
        { status: 400 }
      );
    }

    // --- PHASE 11: IDEMPOTENCY CHECK ---
    const existingAttempt = await prisma.studentAttempt.findUnique({
      where: { id: submissionId },
    });

    if (existingAttempt) {
      return NextResponse.json({
        idempotentReplay: true,
        attemptId: existingAttempt.id,
        isCorrect: existingAttempt.isCorrect,
        message: 'Attempt was already recorded successfully (idempotent submission).',
      });
    }

    // 1. Fetch Question
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    // 2. Evaluate Answer Authoritatively on Server
    let parsedCorrectAnswer = question.correctAnswer;
    try {
      if (question.correctAnswer.startsWith('[') || question.correctAnswer.startsWith('{')) {
        parsedCorrectAnswer = JSON.parse(question.correctAnswer);
      }
    } catch {}

    const isCorrect = Array.isArray(parsedCorrectAnswer)
      ? JSON.stringify(parsedCorrectAnswer) === JSON.stringify(answer)
      : String(parsedCorrectAnswer).trim().toLowerCase() === String(answer).trim().toLowerCase();

    // 3. Fetch Session & recent attempts
    let session = await prisma.drillSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      session = await prisma.drillSession.create({
        data: {
          id: sessionId,
          drillId,
          studentId: authContext.userId,
          studentName: authContext.name,
          state: 'ACTIVE',
          score: 0,
          correctCount: 0,
          totalAnswered: 0,
          currentDifficulty: 2,
        },
      });
    }

    const pastAttempts = await prisma.studentAttempt.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'desc' },
      take: 10,
    });

    // 4. Fetch or init student mastery for this skill
    let mastery = await prisma.studentMastery.findUnique({
      where: {
        studentId_skillId: {
          studentId: authContext.userId,
          skillId: question.skillId,
        },
      },
    });

    const currentScore = mastery ? mastery.masteryScore : 0.50;

    const evalResult = evaluateStudentAnswer(
      session.currentDifficulty,
      currentScore,
      isCorrect,
      responseTimeMs,
      pastAttempts.map((a) => ({
        id: a.id,
        sessionId: a.sessionId,
        drillId,
        studentId: a.studentId,
        questionId: a.questionId,
        skillId: a.skillId,
        studentAnswer: a.studentAnswer,
        isCorrect: a.isCorrect,
        responseTimeMs: a.responseTimeMs,
        difficulty: a.difficulty,
        reasoningChoice: a.reasoningChoice || undefined,
        misconceptionsIdentified: a.misconceptionsIdentified ? JSON.parse(a.misconceptionsIdentified) : [],
        isRapidGuess: a.isRapidGuess,
        timestamp: a.timestamp.toISOString(),
      }))
    );

    // 5. Persist Attempt
    const attempt = await prisma.studentAttempt.create({
      data: {
        id: submissionId,
        sessionId,
        studentId: authContext.userId,
        questionId,
        skillId: question.skillId,
        studentAnswer: typeof answer === 'string' ? answer : JSON.stringify(answer),
        isCorrect,
        responseTimeMs,
        difficulty: session.currentDifficulty,
        reasoningChoice: reasoningChoice || null,
        misconceptionsIdentified: isCorrect ? null : question.misconceptionTags,
        isRapidGuess: evalResult.isRapidGuess,
      },
    });

    // 6. Update Session Stats
    const newTotal = session.totalAnswered + 1;
    const newCorrect = session.correctCount + (isCorrect ? 1 : 0);
    const newStreak = isCorrect ? session.currentStreak + 1 : 0;
    const newMaxStreak = Math.max(session.maxStreak, newStreak);
    const newAvgTime = Math.round(
      (session.averageResponseTimeMs * session.totalAnswered + responseTimeMs) / newTotal
    );

    const updatedSession = await prisma.drillSession.update({
      where: { id: sessionId },
      data: {
        score: session.score + (isCorrect ? session.currentDifficulty * 10 : 0),
        correctCount: newCorrect,
        totalAnswered: newTotal,
        currentStreak: newStreak,
        maxStreak: newMaxStreak,
        averageResponseTimeMs: newAvgTime,
        currentDifficulty: evalResult.nextDifficulty,
        rapidGuessCount: session.rapidGuessCount + (evalResult.isRapidGuess ? 1 : 0),
        lastActiveAt: new Date(),
      },
    });

    // 7. Update Student Mastery
    const newLevel = calculateMasteryLevel(evalResult.updatedMastery);
    const parsedMisconceptions: string[] = mastery?.commonMisconceptions
      ? JSON.parse(mastery.commonMisconceptions)
      : [];
    if (!isCorrect && question.misconceptionTags) {
      try {
        const tags: string[] = JSON.parse(question.misconceptionTags);
        tags.forEach((t) => {
          if (!parsedMisconceptions.includes(t)) parsedMisconceptions.push(t);
        });
      } catch {}
    }

    await prisma.studentMastery.upsert({
      where: {
        studentId_skillId: {
          studentId: authContext.userId,
          skillId: question.skillId,
        },
      },
      update: {
        masteryScore: evalResult.updatedMastery,
        attemptsCount: (mastery?.attemptsCount || 0) + 1,
        accuracy: Math.round(
          ((mastery?.accuracy || 0) * (mastery?.attemptsCount || 0) + (isCorrect ? 100 : 0)) /
            ((mastery?.attemptsCount || 0) + 1)
        ),
        level: newLevel,
        trend: evalResult.updatedMastery >= (mastery?.masteryScore || 0.5) ? 'improving' : 'needs_practice',
        lastPracticed: new Date(),
        commonMisconceptions: JSON.stringify(parsedMisconceptions),
      },
      create: {
        studentId: authContext.userId,
        subjectId: question.subjectId,
        skillId: question.skillId,
        masteryScore: evalResult.updatedMastery,
        accuracy: isCorrect ? 100 : 0,
        attemptsCount: 1,
        averageResponseTimeMs: responseTimeMs,
        recentAccuracy: isCorrect ? 100 : 0,
        level: newLevel,
        trend: isCorrect ? 'improving' : 'needs_practice',
        commonMisconceptions: isCorrect ? '[]' : question.misconceptionTags || '[]',
      },
    });

    // 8. Broadcast Realtime Aggregate Event to Teacher Monitor
    realtimeHub.broadcast({
      drillId,
      type: 'ATTEMPT_SUBMITTED',
      payload: {
        studentId: authContext.userId,
        studentName: authContext.name,
        questionId,
        isCorrect,
        score: updatedSession.score,
        totalAnswered: updatedSession.totalAnswered,
        correctCount: updatedSession.correctCount,
        rapidGuess: evalResult.isRapidGuess,
      },
    });

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      isCorrect,
      explanation: question.explanation,
      feedbackMessage: evalResult.feedbackMessage,
      nextDifficulty: evalResult.nextDifficulty,
      consecutiveWrongCount: evalResult.consecutiveWrongCount,
      recommendReasoning: evalResult.recommendReasoningCheck,
    });
  } catch (err: any) {
    console.error('Error submitting attempt:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
