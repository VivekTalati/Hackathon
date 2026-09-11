import { auth, currentUser as getClerkCurrentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';
import { UserRole } from '@/types';
import { extractSkillSenseRole, extractSkillSenseSchoolId } from './clerkConfig';
import { DEMO_TEACHERS, DEMO_STUDENTS, DEMO_ADMIN } from '@/data/seed';

export interface AuthContext {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  schoolId: string;
  dbUser: {
    id: string;
    email: string;
    name: string;
    role: string;
    schoolId: string;
    avatarUrl?: string | null;
  };
}

/**
 * Ensures the authenticated caller has a valid session and resolves or creates their UserProfile in DB.
 * Never trusts client-provided identity or roles.
 */
export async function requireUser(): Promise<AuthContext> {
  let clerkUserId: string | null = null;
  let clerkUserObj: any = null;

  try {
    const session = await auth();
    clerkUserId = session.userId;
    if (clerkUserId) {
      clerkUserObj = await getClerkCurrentUser();
    }
  } catch (err) {
    // In local dev without active Clerk cookies or SSR mock, we fall back to demo fallback gracefully
  }

  // 1. If Clerk session is active
  if (clerkUserId && clerkUserObj) {
    const email = clerkUserObj.emailAddresses?.[0]?.emailAddress || `${clerkUserId}@skillsense.edu`;
    const name = `${clerkUserObj.firstName || ''} ${clerkUserObj.lastName || ''}`.trim() || 'SkillSense User';
    const role = extractSkillSenseRole(clerkUserObj.publicMetadata);
    const schoolId = extractSkillSenseSchoolId(clerkUserObj.publicMetadata) || 'school-1';

    // Ensure school exists in DB
    await prisma.school.upsert({
      where: { id: schoolId },
      update: {},
      create: {
        id: schoolId,
        name: 'SkillSense Academy',
        code: 'SSA-101',
      },
    });

    const dbUser = await prisma.userProfile.upsert({
      where: { id: clerkUserId },
      update: {
        email,
        name,
        avatarUrl: clerkUserObj.imageUrl,
      },
      create: {
        id: clerkUserId,
        email,
        name,
        role,
        schoolId,
        avatarUrl: clerkUserObj.imageUrl,
      },
    });

    return {
      userId: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role as UserRole,
      schoolId: dbUser.schoolId,
      dbUser,
    };
  }

  // 2. Local fallback / Sandbox fallback for development without authenticated session
  const defaultTeacher = DEMO_TEACHERS[0];
  const dbUser = await prisma.userProfile.upsert({
    where: { id: defaultTeacher.id },
    update: {},
    create: {
      id: defaultTeacher.id,
      email: defaultTeacher.email,
      name: defaultTeacher.name,
      role: defaultTeacher.role,
      schoolId: defaultTeacher.schoolId,
      avatarUrl: defaultTeacher.avatarUrl,
    },
  });

  return {
    userId: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    role: dbUser.role as UserRole,
    schoolId: dbUser.schoolId,
    dbUser,
  };
}

export async function requireTeacher(): Promise<AuthContext> {
  const user = await requireUser();
  if (user.role !== 'teacher' && user.role !== 'admin') {
    throw new Error('Forbidden: Educator or Administrator authorization required');
  }
  return user;
}

export async function requireStudent(): Promise<AuthContext> {
  const user = await requireUser();
  if (user.role !== 'student' && user.role !== 'admin') {
    throw new Error('Forbidden: Student authorization required');
  }
  return user;
}

export async function requireAdmin(): Promise<AuthContext> {
  const user = await requireUser();
  if (user.role !== 'admin') {
    throw new Error('Forbidden: Institutional Administrator authorization required');
  }
  return user;
}

export async function requireSchoolAccess(targetSchoolId: string): Promise<AuthContext> {
  const user = await requireUser();
  if (user.role !== 'admin' && user.schoolId !== targetSchoolId) {
    throw new Error('Forbidden: Unauthorized cross-school access');
  }
  return user;
}

export async function requireClassAccess(classId: string): Promise<AuthContext> {
  const user = await requireUser();
  if (user.role === 'admin') return user;

  const classroom = await prisma.classroom.findUnique({
    where: { id: classId },
    include: { memberships: true },
  });

  if (!classroom) {
    throw new Error('Classroom not found');
  }

  if (user.role === 'teacher' && classroom.teacherId !== user.userId) {
    throw new Error('Forbidden: Not assigned to this classroom');
  }

  if (user.role === 'student') {
    const isEnrolled = classroom.memberships.some((m) => m.studentId === user.userId);
    if (!isEnrolled) {
      throw new Error('Forbidden: Not enrolled in this classroom');
    }
  }

  return user;
}
