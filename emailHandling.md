
# Email Handling in Golden Nest

This document outlines the process for handling email submissions from the contact form in the Golden Nest application.

## Recommended Approach: Server-Side Email Sending

For security and reliability, we recommend handling email sending on the server-side. The example application uses `emailjs-com` on the client-side, but a Next.js application can leverage its server-side capabilities to create a more robust and secure email solution.

**Benefits of server-side email handling:**

*   **Security:** API keys and other sensitive information are not exposed to the client-side.
*   **Reliability:** Server-side code is less prone to issues like network errors or browser limitations.
*   **Scalability:** Serverless functions can handle a large volume of requests without impacting the performance of the frontend.
*   **Flexibility:** You can use powerful libraries like `Nodemailer` or integrate with transactional email services like Resend, SendGrid, or AWS SES.

## Implementation with Resend and React Email

We will use [Resend](https://resend.com/) for its modern API and generous free tier, and [React Email](https://react.email/) to build our email templates with React components.

### 1. Installation

First, install the necessary libraries:

```bash
yarn add resend react-email
```

### 2. Create an API Route

Next, create a new API route to handle the email sending logic. Create a new file at `/Users/lucas/Documents/Work/goldern_nest/src/app/api/send-email/route.ts`:

```typescript
// /Users/lucas/Documents/Work/goldern_nest/src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/EmailTemplate'; // We will create this next

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message, phone } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Golden Nest <onboarding@resend.dev>', // Replace with your domain
      to: ['test@info.com'],
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

### 3. Create an Email Template

Create a new file at `/Users/lucas/Documents/Work/goldern_nest/src/components/EmailTemplate.tsx` to define the email template using React components:

```tsx
// /Users/lucas/Documents/Work/goldern_nest/src/components/EmailTemplate.tsx
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

### 4. Update the Contact Page

Now, update the `handleSubmit` function in `/Users/lucas/Documents/Work/goldern_nest/src/app/contact/page.tsx` to call the new API route:

```tsx
// /Users/lucas/Documents/Work/goldern_nest/src/app/contact/page.tsx

// ... imports

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "", phone: "" });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false)
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  // ... handleChange and the rest of the component remains the same
  // You will need to add loading and error states to the form
}
```

### 5. Environment Variables

Finally, you need to add your Resend API key to your environment variables. Create a `.env.local` file in the root of your project and add the following:

```
RESEND_API_KEY=your_resend_api_key
```

You can get your API key from the [Resend dashboard](https://resend.com/dashboard/api-keys).

This setup provides a secure and robust way to handle email submissions from your contact form.
