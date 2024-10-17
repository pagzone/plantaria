import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }).max(255, { message: "Email too long" }),
  password: z.string({ message: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }).max(255, { message: "Password too long" }),
  remember: z.boolean().optional()
})

export const signUpFormSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: 'Name must be at least 3 characters' }),
    location: z
      .string()
      .min(1, { message: "Location is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" })
      .max(255, { message: "Email too long" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(255, { message: "Password too long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const identityFormSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    location: z.string().min(1, { message: "Location is required" }),
  });

export type LoginFormSchema = typeof loginFormSchema;
export type SignUpFormSchema = typeof signUpFormSchema;
export type IdentityFormSchema = typeof identityFormSchema;