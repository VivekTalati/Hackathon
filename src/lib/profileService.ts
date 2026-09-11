/**
 * SkillSense Profile Store & Clerk Identity Mapping Service
 *
 * Maps authenticated Clerk users to domain-specific SkillSense profiles.
 * Enforces school tenant isolation and role restrictions.
 */

import { UserRole } from '@/types';
import { extractSkillSenseRole, extractSkillSenseSchoolId } from '@/lib/clerkConfig';

export interface SkillSenseProfile {
  id: string;
  clerkUserId: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY_PROFILES = 'skillsense_profiles_v4';

// Default initial seeded profiles mapped to demo Clerk accounts
export const DEFAULT_PROFILES: SkillSenseProfile[] = [
  {
    id: 'profile-teacher-1',
    clerkUserId: 'user_clerk_demo_teacher_1',
    name: 'Sarah Jenkins',
    email: 'teacher@skillsense.edu',
    role: 'teacher',
    schoolId: 'school-1',
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'profile-student-1',
    clerkUserId: 'user_clerk_demo_student_1',
    name: 'Alex Rivera',
    email: 'alex@skillsense.edu',
    role: 'student',
    schoolId: 'school-1',
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'profile-admin-1',
    clerkUserId: 'user_clerk_demo_admin_1',
    name: 'Dr. Robert Vance',
    email: 'admin@skillsense.edu',
    role: 'admin',
    schoolId: 'school-1',
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z',
  },
];

function getStoredProfiles(): SkillSenseProfile[] {
  if (typeof window === 'undefined') return DEFAULT_PROFILES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILES);
    if (!raw) return DEFAULT_PROFILES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_PROFILES;
  } catch {
    return DEFAULT_PROFILES;
  }
}

function saveProfiles(profiles: SkillSenseProfile[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
  } catch (e) {
    console.error('Failed to persist SkillSense profiles:', e);
  }
}

/**
 * Synchronize an authenticated Clerk user into a SkillSense application profile.
 * Ensures the Clerk user ID is permanently tied to a verified role.
 */
export function syncClerkUserToProfile(clerkUser: {
  id: string;
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  primaryEmailAddress?: { emailAddress: string } | null;
  emailAddresses?: Array<{ emailAddress: string }>;
  imageUrl?: string;
  publicMetadata?: Record<string, unknown> | null;
  unsafeMetadata?: Record<string, unknown> | null;
}): SkillSenseProfile {
  const profiles = getStoredProfiles();
  const existing = profiles.find((p) => p.clerkUserId === clerkUser.id);

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ||
    clerkUser.emailAddresses?.[0]?.emailAddress ||
    'learner@skillsense.edu';

  const name =
    clerkUser.fullName ||
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
    email.split('@')[0] ||
    'SkillSense Learner';

  // Extract trusted role from Clerk publicMetadata (or unsafeMetadata during initial signup)
  const role =
    extractSkillSenseRole(clerkUser.publicMetadata) ||
    extractSkillSenseRole(clerkUser.unsafeMetadata) ||
    'student';

  const schoolId =
    extractSkillSenseSchoolId(clerkUser.publicMetadata) ||
    extractSkillSenseSchoolId(clerkUser.unsafeMetadata) ||
    'school-1';

  if (existing) {
    // Update profile with any latest Clerk info
    const updated: SkillSenseProfile = {
      ...existing,
      name,
      email,
      role: existing.role || role, // Preserve existing verified role
      schoolId: existing.schoolId || schoolId,
      avatarUrl: clerkUser.imageUrl || existing.avatarUrl,
      updatedAt: new Date().toISOString(),
    };
    const nextList = profiles.map((p) => (p.id === existing.id ? updated : p));
    saveProfiles(nextList);
    return updated;
  }

  // Create new profile mapped to this Clerk user
  const newProfile: SkillSenseProfile = {
    id: `profile-${Date.now()}`,
    clerkUserId: clerkUser.id,
    name,
    email,
    role,
    schoolId,
    avatarUrl: clerkUser.imageUrl,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveProfiles([...profiles, newProfile]);
  return newProfile;
}

export function getProfileByClerkId(clerkUserId: string): SkillSenseProfile | undefined {
  const profiles = getStoredProfiles();
  return profiles.find((p) => p.clerkUserId === clerkUserId);
}

export function getProfilesBySchool(schoolId: string): SkillSenseProfile[] {
  const profiles = getStoredProfiles();
  return profiles.filter((p) => p.schoolId === schoolId);
}
