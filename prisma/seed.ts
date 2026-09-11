import { PrismaClient } from '@prisma/client';
import {
  DEMO_SCHOOL,
  DEMO_TEACHERS,
  DEMO_STUDENTS,
  DEMO_ADMIN,
  DEMO_CLASSES,
  SUBJECTS,
  DEMO_ACHIEVEMENTS,
} from '../src/data/seed';
import { EXPANDED_QUESTIONS } from '../src/data/expandedQuestions';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SkillSense database...');

  // 1. School
  const school = await prisma.school.upsert({
    where: { code: DEMO_SCHOOL.code },
    update: { name: DEMO_SCHOOL.name },
    create: {
      id: DEMO_SCHOOL.id,
      name: DEMO_SCHOOL.name,
      code: DEMO_SCHOOL.code,
    },
  });
  console.log(`✓ School seeded: ${school.name}`);

  // 2. Users (Teachers, Students, Admin)
  const allUsers = [...DEMO_TEACHERS, ...DEMO_STUDENTS, DEMO_ADMIN];
  for (const u of allUsers) {
    await prisma.userProfile.upsert({
      where: { id: u.id },
      update: {
        name: u.name,
        email: u.email,
        role: u.role,
        avatarUrl: u.avatarUrl,
        schoolId: school.id,
      },
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        avatarUrl: u.avatarUrl,
        schoolId: school.id,
      },
    });
  }
  console.log(`✓ Users seeded: ${allUsers.length} profiles`);

  // 3. Classrooms & Memberships
  for (const c of DEMO_CLASSES) {
    const classroom = await prisma.classroom.upsert({
      where: { code: c.code },
      update: {
        name: c.name,
        grade: c.grade,
        teacherId: c.teacherId,
        schoolId: school.id,
      },
      create: {
        id: c.id,
        name: c.name,
        grade: c.grade,
        code: c.code,
        teacherId: c.teacherId,
        schoolId: school.id,
      },
    });

    // Enroll demo students into 6A
    if (c.id === 'class-6a') {
      for (const s of DEMO_STUDENTS) {
        await prisma.classMembership.upsert({
          where: {
            classId_studentId: {
              classId: classroom.id,
              studentId: s.id,
            },
          },
          update: {},
          create: {
            classId: classroom.id,
            studentId: s.id,
          },
        });
      }
    }
  }
  console.log(`✓ Classrooms & memberships seeded: ${DEMO_CLASSES.length} classes`);

  // 4. Subjects, Topics & Skills
  for (const s of SUBJECTS) {
    await prisma.subject.upsert({
      where: { id: s.id },
      update: { name: s.name, icon: s.icon, description: s.description },
      create: {
        id: s.id,
        name: s.name,
        icon: s.icon,
        description: s.description,
      },
    });

    for (const t of s.topics) {
      await prisma.topic.upsert({
        where: { id: t.id },
        update: {
          name: t.name,
          description: t.description,
          gradeLevels: JSON.stringify(t.gradeLevels),
        },
        create: {
          id: t.id,
          subjectId: s.id,
          name: t.name,
          description: t.description,
          gradeLevels: JSON.stringify(t.gradeLevels),
        },
      });

      for (const sk of t.skills) {
        await prisma.skill.upsert({
          where: { id: sk.id },
          update: {
            name: sk.name,
            description: sk.description,
            defaultDifficulty: sk.defaultDifficulty,
          },
          create: {
            id: sk.id,
            topicId: t.id,
            subjectId: s.id,
            name: sk.name,
            description: sk.description,
            defaultDifficulty: sk.defaultDifficulty,
          },
        });
      }
    }
  }
  console.log(`✓ Subjects, Topics & Skills seeded`);

  // 5. Expanded Question Bank (181 questions)
  for (const q of EXPANDED_QUESTIONS) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {
        prompt: q.prompt,
        difficulty: q.difficulty,
        correctAnswer: typeof q.correctAnswer === 'string' ? q.correctAnswer : JSON.stringify(q.correctAnswer),
        explanation: q.explanation,
        hint: q.hint,
        options: q.options ? JSON.stringify(q.options) : null,
        misconceptionTags: q.misconceptionTags ? JSON.stringify(q.misconceptionTags) : null,
      },
      create: {
        id: q.id,
        subjectId: q.subjectId,
        topicId: q.topicId,
        skillId: q.skillId,
        gradeLevel: q.gradeLevel,
        difficulty: q.difficulty,
        type: q.type,
        prompt: q.prompt,
        options: q.options ? JSON.stringify(q.options) : null,
        correctAnswer: typeof q.correctAnswer === 'string' ? q.correctAnswer : JSON.stringify(q.correctAnswer),
        explanation: q.explanation,
        hint: q.hint,
        estimatedSeconds: q.estimatedSeconds,
        misconceptionTags: q.misconceptionTags ? JSON.stringify(q.misconceptionTags) : null,
      },
    });
  }
  console.log(`✓ Questions seeded: ${EXPANDED_QUESTIONS.length} items`);

  // 6. Demo Drill
  const demoDrill = await prisma.drill.upsert({
    where: { id: 'drill-math-demo' },
    update: {
      status: 'READY',
      durationMinutes: 5,
    },
    create: {
      id: 'drill-math-demo',
      schoolId: school.id,
      classId: 'class-6a',
      teacherId: 'teacher-1',
      title: 'Fractions Mastery: Unlike Denominators',
      subjectId: 'math',
      topicId: 'fractions',
      durationMinutes: 5,
      isAdaptive: true,
      targetQuestionCount: 8,
      status: 'READY',
      enableReasoningChecks: true,
      feedbackMode: 'immediate',
    },
  });
  console.log(`✓ Demo drill seeded: ${demoDrill.title}`);

  // 7. Demo Achievements
  for (const ach of DEMO_ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { id: ach.id },
      update: { title: ach.title, description: ach.description },
      create: {
        id: ach.id,
        title: ach.title,
        description: ach.description,
        icon: ach.icon,
        badgeType: ach.badgeType,
      },
    });
  }
  console.log(`✓ Achievements seeded: ${DEMO_ACHIEVEMENTS.length} items`);

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
