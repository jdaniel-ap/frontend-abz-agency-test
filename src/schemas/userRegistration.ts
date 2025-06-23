import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .min(13, "The phone number must be at least 13 characters")
    .regex(/^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX"),
  position_id: z.number().min(1, "Please select a position"),
  photo: z
    .union([z.instanceof(File), z.undefined()])
    .refine((file) => file instanceof File, "Photo is required"),
});

export type UserRegistrationForm = z.infer<typeof userRegistrationSchema>;
