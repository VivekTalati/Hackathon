# SkillSense — Clerk Authentication Architecture & Setup Guide

> **SkillSense Architecture Document:** Official Clerk Authentication Integration, Profile Store, Role-Based Access Control (RBAC), and Route Protection.

---

## 1. Overview

SkillSense uses **Clerk** as its identity and authentication provider.
- **Clerk manages:** Identity, credentials, sessions, password encryption, 2FA, OAuth SSO (Google / Microsoft 365), and session revocation.
- **SkillSense manages:** Application profiles, educational roles (`teacher`, `student`, `admin`), school tenant isolation (`schoolId`), class memberships, adaptive practice history, and formative telemetry.

```
+------------------+         +----------------------------+         +-------------------------+
|   Clerk Auth     |  ---->  |   SkillSense Profile Store |  ---->  |  Role-Based Workspace   |
| (Identity & JWT) |         | (Role, SchoolId, Tenancy)  |         | (/teacher, /student)    |
+------------------+         +----------------------------+         +-------------------------+
```

---

## 2. Quick Setup (Under 2 Minutes)

### Step 1: Create a Clerk Application
1. Go to [dashboard.clerk.com](https://dashboard.clerk.com) and sign in or create an account.
2. Click **"Add application"** and name it **SkillSense**.
3. Under **Authentication options**, check:
   - **Email**
   - **Password**
   - *(Optional)* **Google**
   - *(Optional)* **Microsoft**
4. Click **Create application**.

### Step 2: Copy API Keys into `.env.local`
From your Clerk Dashboard under **API Keys**, copy the credentials into `D:\sou\Hackathon\.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Route Redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login?mode=sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Step 3: Configure Roles in Clerk `publicMetadata`
SkillSense reads the trusted user role from Clerk's `publicMetadata`.
In your Clerk Dashboard -> **Users**, click on a user -> **Metadata** -> **Public Metadata**:

#### For a Teacher:
```json
{
  "role": "teacher",
  "schoolId": "school-1"
}
```

#### For a Student:
```json
{
  "role": "student",
  "schoolId": "school-1"
}
```

#### For an Administrator:
```json
{
  "role": "admin",
  "schoolId": "school-1"
}
```

---

## 3. Strict Security Rules Enforced

### 1. No Admin Self-Registration
The public Sign-Up form only permits registering as a **Student** or a **Teacher** (requiring verified institutional email and school affiliation code).
**Admin accounts cannot be self-created.** They must be provisioned or invited by an existing system administrator through Clerk's invitation API or Clerk Dashboard.

### 2. No Fake Account Switching
A teacher can never click on a student's name in a dropdown and "become" that student. That vulnerability has been completely removed. Session switching requires genuine Clerk multi-session authentication where both credentials have been verified.

### 3. Server-Enforced Route Protection
The Next.js middleware ([`src/middleware.ts`](file:///D:/sou/Hackathon/src/middleware.ts)) verifies session tokens on every request:
- `/teacher/*` — Requires active session with role `teacher` or `admin`. Unauthorized users are redirected to `/unauthorized`.
- `/student/*` — Requires active session with role `student` or `admin`.
- `/admin/*` — Strictly restricted to `admin`.
- Unauthenticated requests to any portal are immediately redirected to `/login?redirect_url=...`.

### 4. Honest OAuth State
If Google or Microsoft SSO are not configured in your Clerk Dashboard, the buttons will display a clear informational dialog explaining that OAuth must be enabled in the Clerk Dashboard, rather than pretending that the user logged in.

---

## 4. Development Fallback Behavior

When `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is not configured in `.env.local`:
- SkillSense detects the missing key and displays an explicit banner:  
  *`"⚠️ Clerk Keys Not Configured in .env.local — Running in Local Development Sandbox Mode. See CLERK_SETUP.md to connect live Clerk instance."`*
- The app remains browsable for local testing without crashing Next.js.
- Adding valid Clerk keys instantly upgrades the app to live production Clerk authentication.
