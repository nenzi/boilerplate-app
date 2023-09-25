import z from 'zod';

export const querySchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
});

export type queryData = z.infer<typeof querySchema>;
