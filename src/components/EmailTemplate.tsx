import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

const main = {
  backgroundColor: '#f3f4f6',
  fontFamily: 'Inter, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const heading = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '24px',
  color: '#1f2937',
};

const text = {
  color: '#24292e',
  fontSize: '16px',
  lineHeight: '26px',
};

const button = {
  backgroundColor: '#EA580C',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
};

const logo = {
  margin: '0 auto',
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
  phone,
}) => (
  <Html>
    <Head />
    <Preview>New message from your Golden Nest contact form</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={{ padding: '20px' }}>
          <Img
            src="http://goldern-nest.vercel.app/images/logo_transparent.png"
            width="150"
            height="auto"
            alt="Golden Nest Logo"
            style={logo}
          />
          <Heading style={heading}>New Contact Form Submission</Heading>
          <Text style={text}>You have received a new message from golden nest website contact form.</Text>
          <Section style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            <Text style={text}><strong>Name:</strong> {name}</Text>
            <Text style={text}><strong>Email:</strong> {email}</Text>
            {phone && <Text style={text}><strong>Phone:</strong> {phone}</Text>}
            <Text style={text}><strong>Message:</strong></Text>
            <Text style={text}>{message}</Text>
          </Section>
          <Button style={button} href={`mailto:${email}`}>
            Reply to {name}
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);
