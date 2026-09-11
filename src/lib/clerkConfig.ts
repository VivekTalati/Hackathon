/**
 * SkillSense Clerk Authentication Configuration & Role Utilities
 */

import { UserRole } from '@/types';

export function hasClerkConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return Boolean(
    key &&
      key.trim().length > 0 &&
      !key.includes('YOUR_CLERK_PUBLISHABLE_KEY') &&
      key.startsWith('pk_')
  );
}

export function extractSkillSenseRole(publicMetadata?: Record<string, unknown> | null): UserRole {
  if (!publicMetadata) return 'student';
  const role = publicMetadata.role as string;
  if (role === 'admin') return 'admin';
  if (role === 'teacher') return 'teacher';
  return 'student';
}

export function extractSkillSenseSchoolId(publicMetadata?: Record<string, unknown> | null): string {
  if (!publicMetadata) return 'school-1';
  return (publicMetadata.schoolId as string) || 'school-1';
}
