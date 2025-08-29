import { z } from "zod";

// Define schema for Google config
const googleSchema = z.object({
  verification: z.string().min(1, "Google verification key is required"),
  // maps: z.string().min(1, "Google Maps API key is required"),
  // recaptcha: z.string().min(1, "Google reCAPTCHA key is required"),
});

// Validate environment variables
export const google = googleSchema.parse({
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  // maps: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
  // recaptcha: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA,
});