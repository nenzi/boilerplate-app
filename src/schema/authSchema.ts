import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type loginData = z.infer<typeof loginSchema>;
export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;
