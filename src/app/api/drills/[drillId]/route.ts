import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser, requireTeacher } from '@/lib/authHelpers';
import { realtimeHub } from '@/lib/realtime/hub';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ drillId: string }> }
) {
  try {
    const { drillId } = await context.params;
    const drill = await prisma.drill.findUnique({
      where: { id: drillId },
      include: {
        sessions: true,
        drillQuestions: {
          include: { question: true },
        },
      },
    });

    if (!drill) {
      return NextResponse.json({ error: 'Drill not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, drill });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ drillId: string }> }
) {
  try {
    const teacher = await requireTeacher();
    const { drillId } = await context.params;
    const body = await request.json();
    const { action } = body as { action: 'start' | 'pause' | 'resume' | 'complete' };

    const drill = await prisma.drill.findUnique({ where: { id: drillId } });
    if (!drill) {
      return NextResponse.json({ error: 'Drill not found' }, { status: 404 });
    }

    const now = new Date();
    let updateData: any = {};
    let eventType: any = 'DRILL_STARTED';

    if (action === 'start') {
      updateData = { status: 'LIVE', startedAt: now, pausedAt: null };
      eventType = 'DRILL_STARTED';
    } else if (action === 'pause') {
      updateData = { status: 'PAUSED', pausedAt: now };
      eventType = 'DRILL_PAUSED';
    } else if (action === 'resume') {
      updateData = { status: 'LIVE', resumedAt: now, pausedAt: null };
      eventType = 'DRILL_RESUMED';
    } else if (action === 'complete') {
      updateData = { status: 'COMPLETED', endsAt: now };
      eventType = 'DRILL_ENDED';
    }

    const updated = await prisma.drill.update({
      where: { id: drillId },
      data: updateData,
    });

    // Authoritative multi-device broadcast
    realtimeHub.broadcast({
      drillId,
      type: eventType,
      payload: {
        status: updated.status,
        startedAt: updated.startedAt,
        pausedAt: updated.pausedAt,
        resumedAt: updated.resumedAt,
        endsAt: updated.endsAt,
        durationMinutes: updated.durationMinutes,
      },
    });

    return NextResponse.json({ success: true, drill: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
