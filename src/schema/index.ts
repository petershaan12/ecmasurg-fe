import * as z from "zod";

export const ModulSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  image: z.string().url().optional(),
  email: z.string().email().optional(),
  bio: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(150, "Title must be at most 150 characters long")
    .optional(),
  password: z.string().min(6).optional(),
  newPassword: z.string().min(6).optional(),
  role: z.string().optional(),
  points: z.number().optional(),
});
