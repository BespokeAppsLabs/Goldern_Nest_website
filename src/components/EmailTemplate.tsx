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
  formType?: string;
  preferredDate?: string;
  groupSize?: string;
  visitPurpose?: string;
  specialRequirements?: string;
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
  backgroundColor: '#b99b30',
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
  formType,
  preferredDate,
  groupSize,
  visitPurpose,
  specialRequirements,
}) => (
  <Html>
    <Head />
    <Preview>
      {formType === 'farm-tour'
        ? 'New farm tour request from Golden Nest website'
        : 'New message from your Golden Nest contact form'
      }
    </Preview>
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
          <Heading style={heading}>
            {formType === 'farm-tour'
              ? 'New Farm Tour Request'
              : 'New Contact Form Submission'
            }
          </Heading>
          <Text style={text}>
            {formType === 'farm-tour'
              ? 'You have received a new farm tour request from the Golden Nest website.'
              : 'You have received a new message from Golden Nest website contact form.'
            }
          </Text>

          <Section style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            {/* Contact Information */}
            <Text style={{...text, fontWeight: 'bold', marginBottom: '10px'}}>Contact Information:</Text>
            <Text style={text}><strong>Name:</strong> {name}</Text>
            <Text style={text}><strong>Email:</strong> {email}</Text>
            {phone && <Text style={text}><strong>Phone:</strong> {phone}</Text>}

            {/* Farm Tour Information */}
            {formType === 'farm-tour' && (
              <>
                <Text style={{...text, fontWeight: 'bold', marginTop: '20px', marginBottom: '10px'}}>
                  Farm Tour Details:
                </Text>
                {preferredDate && <Text style={text}><strong>Preferred Date:</strong> {preferredDate}</Text>}
                {groupSize && <Text style={text}><strong>Group Size:</strong> {groupSize}</Text>}
                {visitPurpose && <Text style={text}><strong>Purpose of Visit:</strong> {visitPurpose}</Text>}
                {specialRequirements && (
                  <>
                    <Text style={text}><strong>Special Requirements:</strong></Text>
                    <Text style={{...text, fontStyle: 'italic'}}>{specialRequirements}</Text>
                  </>
                )}
              </>
            )}

            {/* Message */}
            <Text style={{...text, fontWeight: 'bold', marginTop: '20px', marginBottom: '10px'}}>
              {formType === 'farm-tour' ? 'Additional Notes:' : 'Message:'}
            </Text>
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
