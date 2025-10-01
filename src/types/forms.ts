import { z } from 'zod';

// Phone Form Schema
export const phoneSchema = z.object({
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  countryCode: z.string().min(1, 'Please select a country'),
});

export type PhoneFormData = z.infer<typeof phoneSchema>;

// OTP Form Schema
export const otpSchema = z.object({
  otp: z.string()
    .min(6, 'OTP must be 6 digits')
    .max(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only digits'),
});

export type OTPFormData = z.infer<typeof otpSchema>;

// Create Chatroom Form Schema
export const createChatroomSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title must be less than 50 characters'),
});

export type CreateChatroomFormData = z.infer<typeof createChatroomSchema>;
