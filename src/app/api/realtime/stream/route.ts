import { NextRequest } from 'next/server';
import { realtimeHub, ClassroomEvent } from '@/lib/realtime/hub';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const drillId = searchParams.get('drillId');

  if (!drillId) {
    return new Response('Missing drillId parameter', { status: 400 });
  }

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  // Send initial connected handshake
  writer.write(
    encoder.encode(`event: connected\ndata: ${JSON.stringify({ drillId, status: 'connected', time: new Date().toISOString() })}\n\n`)
  );

  // Subscribe to hub events for this drill
  const unsubscribe = realtimeHub.subscribe(drillId, (event: ClassroomEvent) => {
    try {
      writer.write(
        encoder.encode(`event: message\ndata: ${JSON.stringify(event)}\n\n`)
      );
    } catch (err) {
      // Client disconnected
      unsubscribe();
    }
  });

  // Keep-alive heartbeat every 15 seconds
  const heartbeat = setInterval(() => {
    try {
      writer.write(encoder.encode(': heartbeat\n\n'));
    } catch {
      clearInterval(heartbeat);
      unsubscribe();
    }
  }, 15000);

  request.signal.addEventListener('abort', () => {
    clearInterval(heartbeat);
    unsubscribe();
    writer.close().catch(() => {});
  });

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
