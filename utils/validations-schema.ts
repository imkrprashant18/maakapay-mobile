import { z } from "zod";

export const signUpSchema = z.object({
        fullName: z.string().min(2, "Full name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Enter a valid phone number"),
        password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;



export const verifySchema = z.object({
        otp: z.string().length(6, "Please enter the full 6-digit code"),
});

export type VerifyFormData = z.infer<typeof verifySchema>;



export const loginSchema = z.object({
        email: z.string().email("Please enter a valid work email"),
        password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;