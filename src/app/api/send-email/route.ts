import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { EmailTemplate } from '../../../components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const {
    name,
    email,
    message,
    phone,
    formType,
    preferredDate,
    groupSize,
    visitPurpose,
    specialRequirements
  } = await req.json();

  console.log('Received request with data:', {
    name,
    email,
    message,
    phone,
    formType,
    preferredDate,
    groupSize,
    visitPurpose,
    specialRequirements
  });

  try {
    console.log('Attempting to send email via Resend...');
    const subject = formType === 'farm-tour'
      ? 'New Farm Tour Request from Golden Nest Website'
      : 'New Message from Golden Nest Contact Form';

    const { data, error } = await resend.emails.send({
      from: 'Golden Nest <onboarding@resend.dev>',
      //TODO!: Change to the actual email address
      to: ['thereshi.l@gmail.com'],
      subject,
      react: React.createElement(EmailTemplate, {
        name,
        email,
        message,
        phone,
        formType,
        preferredDate,
        groupSize,
        visitPurpose,
        specialRequirements
      }),
    });

    if (error) {
      console.error('Resend API returned an error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log('Resend API returned data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
