import { z } from 'zod';

export const CreateUserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
});

export const UpdateUserSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
});

export const updateWhereSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
});

export type updateWhereData = z.infer<typeof updateWhereSchema>;

export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
