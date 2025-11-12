
# Email Implementation Plan for Golden Nest

This document outlines the step-by-step process for integrating a secure, server-side email sending functionality into the Golden Nest contact form using Resend.

## 1. Overview

We will create a dedicated API route in our Next.js application to handle email sending. This server-side approach ensures that our API keys (like `RESEND_API_KEY`) are never exposed on the client-side (in the user's browser).

The process involves:
1.  Installing the necessary libraries.
2.  Storing the Resend API key securely.
3.  Creating a new API endpoint to handle the email logic.
4.  Creating a React component for the email template.
5.  Updating the contact form to call our new API endpoint.

## 2. Installation

First, we need to add the `resend` and `react-email` packages to the project.

```bash
yarn add resend react-email
```

## 3. Configuration

### Environment Variables

To keep your API key secure, we will use environment variables. Create a new file named `.env.local` in the root of your project (`/Users/lucas/Documents/Work/goldern_nest/.env.local`).

Add your Resend API key to this file:

```
RESEND_API_KEY=your_actual_resend_api_key_here
```

**Important:** The `.env.local` file is listed in the `.gitignore` file by default, so it will not be committed to your git repository.

### Next.js Configuration

No changes are required in `next.config.ts` for this implementation. Next.js automatically loads the environment variables from the `.env.local` file for use on the server side.

## 4. Implementation Steps

### Step 4.1: Create the API Route

We will create a new API route that will be responsible for sending the email.

**File:** `/Users/lucas/Documents/Work/goldern_nest/src/app/api/send-email/route.ts`

**Content:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message, phone } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Golden Nest <onboarding@resend.dev>',
      to: ['bespokeappslabs@outlook.com'],
      subject: 'New Message from Golden Nest Contact Form',
      react: EmailTemplate({ name, email, message, phone }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
```

### Step 4.2: Create the Email Template

We will create a simple React component to serve as the template for our email.

**File:** `/Users/lucas/Documents/Work/goldern_nest/src/components/EmailTemplate.tsx`

**Content:**
```tsx
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
  phone,
}) => (
  <div>
    <h1>New Contact Form Submission</h1>
    <p>
      You have received a new message from the Golden Nest contact form.
    </p>
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
      {phone && <li><strong>Phone:</strong> {phone}</li>}
    </ul>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
);
```

### Step 4.3: Update the Contact Page

Finally, we will update the contact form to call our new API route and handle the loading and success/error states.

**File:** `/Users/lucas/Documents/Work/goldern_nest/src/app/contact/page.tsx`

**Changes:**
- Add `isLoading` and `error` states.
- Update the `handleSubmit` function to be `async` and make a `fetch` call to `/api/send-email`.
- Update the submit button to show a loading state.
- Display an error message if the submission fails.

This completes the implementation plan.
