import * as z from "zod";

export const ModulSchema = z.object({
  name: z.string(),
  owner: z.string().optional(),
  description: z.string().min(3).optional(),
  // password: z.string().mpin(6).optional(),
  bannerImage: z.any().optional(),
});

export const IsiModulSchema = z.object({
  type: z.string(),
  judul: z.string(),
  description: z.string().min(3).optional(),
  link_video: z.string().optional(),
  deadline: z.string().optional(),
  time: z.string().optional(),
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
  name: z.string(),
  email: z.string().email("Invalid email address"),
  gender: z.string(),
  bio: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(150, "Title must be at most 150 characters long"),
  phoneNumber: z.string(),
  dateOfBirth: z.string(),
  image: z.any().optional(),
  oldPassword: z.string().min(8).optional(),
  newPassword: z.string().min(8).optional(),
});