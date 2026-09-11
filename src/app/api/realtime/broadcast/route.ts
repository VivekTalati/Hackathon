import { NextRequest, NextResponse } from 'next/server';
import { realtimeHub, ClassroomEventType } from '@/lib/realtime/hub';
import { requireUser } from '@/lib/authHelpers';

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const { drillId, classId, type, payload } = body as {
      drillId: string;
      classId?: string;
      type: ClassroomEventType;
      payload: any;
    };

    if (!drillId || !type) {
      return NextResponse.json({ error: 'drillId and type are required' }, { status: 400 });
    }

    const event = realtimeHub.broadcast({
      drillId,
      classId,
      type,
      payload: {
        ...payload,
        senderId: user.userId,
        senderRole: user.role,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to broadcast event' },
      { status: 500 }
    );
  }
}
