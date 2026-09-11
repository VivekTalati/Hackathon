'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { hasClerkConfigured } from '@/lib/clerkConfig';

export function SkillSenseAuthProvider({ children }: { children: React.ReactNode }) {
  const isClerkReady = hasClerkConfigured();

  if (isClerkReady) {
    return (
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        appearance={{
          variables: {
            colorPrimary: '#4f46e5',
            colorBackground: '#ffffff',
            borderRadius: '1rem',
          },
        }}
      >
        {children}
      </ClerkProvider>
    );
  }

  return <>{children}</>;
}
