import { z } from "zod";

// Define schema for Resend config
const resendSchema = z.object({
  apiKey: z.string().min(1, "Resend API key is required"),
});

// Validate environment variables
export const resend = resendSchema.parse({
  apiKey: process.env.RESEND_API_KEY,
});