import * as z from "zod";

export const ModulSchema = z.object({
  name: z.string().optional(),
  owner: z.string().optional(),
  description: z.string().min(3).optional(),
  // password: z.string().min(6).optional(),
  bannerImage: z.string().url().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const EditProfileSchema = z.object({
  name: z.string().optional(),
  gender: z.string().optional(),
  bio: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(150, "Title must be at most 150 characters long")
    .optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.date().optional(),
  image: z.string().url().optional(),
  oldPassword: z.string().min(8).optional(),
  newPassword: z.string().min(8).optional(),
});