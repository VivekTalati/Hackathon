// SkillSense Server-Authoritative Realtime Classroom Event System
// Multi-Device Server-Sent Events (SSE) & WebSocket compatible architecture

export type ClassroomEventType =
  | 'DRILL_STARTED'
  | 'DRILL_PAUSED'
  | 'DRILL_RESUMED'
  | 'DRILL_ENDED'
  | 'STUDENT_JOINED'
  | 'STUDENT_CONNECTED'
  | 'STUDENT_DISCONNECTED'
  | 'ATTEMPT_SUBMITTED'
  | 'STUDENT_COMPLETED';

export interface ClassroomEvent<T = any> {
  id: string;
  type: ClassroomEventType;
  drillId: string;
  classId?: string;
  timestamp: string;
  payload: T;
}

type EventListener = (event: ClassroomEvent) => void;

class RealtimeClassroomHub {
  private listeners: Map<string, Set<EventListener>> = new Map();
  private recentEvents: Map<string, ClassroomEvent[]> = new Map();

  /**
   * Subscribe to events for a specific drill session
   */
  subscribe(drillId: string, listener: EventListener): () => void {
    if (!this.listeners.has(drillId)) {
      this.listeners.set(drillId, new Set());
    }
    this.listeners.get(drillId)!.add(listener);

    return () => {
      const set = this.listeners.get(drillId);
      if (set) {
        set.delete(listener);
        if (set.size === 0) {
          this.listeners.delete(drillId);
        }
      }
    };
  }

  /**
   * Broadcast an event to all connected devices in the drill
   */
  broadcast(event: Omit<ClassroomEvent, 'id' | 'timestamp'>): ClassroomEvent {
    const fullEvent: ClassroomEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };

    // Store in recent buffer (last 50 events per drill for reconnect reconciliation)
    if (!this.recentEvents.has(event.drillId)) {
      this.recentEvents.set(event.drillId, []);
    }
    const buffer = this.recentEvents.get(event.drillId)!;
    buffer.push(fullEvent);
    if (buffer.length > 50) buffer.shift();

    // Dispatch to in-memory listeners
    const listeners = this.listeners.get(event.drillId);
    if (listeners) {
      listeners.forEach((listener) => {
        try {
          listener(fullEvent);
        } catch (err) {
          console.error('Error dispatching realtime listener:', err);
        }
      });
    }

    return fullEvent;
  }

  /**
   * Get missed events after a given ISO timestamp for smooth reconnection
   */
  getEventsSince(drillId: string, sinceIsoString: string): ClassroomEvent[] {
    const buffer = this.recentEvents.get(drillId) || [];
    const sinceTime = new Date(sinceIsoString).getTime();
    return buffer.filter((e) => new Date(e.timestamp).getTime() > sinceTime);
  }
}

const globalForHub = globalThis as unknown as {
  skillsenseRealtimeHub: RealtimeClassroomHub | undefined;
};

export const realtimeHub =
  globalForHub.skillsenseRealtimeHub ?? new RealtimeClassroomHub();

if (process.env.NODE_ENV !== 'production') {
  globalForHub.skillsenseRealtimeHub = realtimeHub;
}
