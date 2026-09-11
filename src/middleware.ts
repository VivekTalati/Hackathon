import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Matcher paths that require authentication and role inspection
const TEACHER_ROUTES = ['/teacher'];
const STUDENT_ROUTES = ['/student'];
const ADMIN_ROUTES = ['/admin'];
const PUBLIC_ROUTES = ['/', '/login', '/unauthorized'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files, Next.js internals, and public endpoints
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    PUBLIC_ROUTES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Inspect route requirements
  const isTeacherRoute = TEACHER_ROUTES.some((route) => pathname.startsWith(route));
  const isStudentRoute = STUDENT_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  if (!isTeacherRoute && !isStudentRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // Retrieve auth session token or cookie
  // Clerk standard session cookie or development authenticated session cookie
  const clerkSession =
    request.cookies.get('__session')?.value ||
    request.cookies.get('skillsense_session')?.value;

  // If no session exists, redirect directly to institutional login
  if (!clerkSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Inspect role cookie for role-based portal protection
  const userRole = request.cookies.get('skillsense_role')?.value;

  if (userRole) {
    if (isTeacherRoute && userRole !== 'teacher' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (isStudentRoute && userRole !== 'student' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (isAdminRoute && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
