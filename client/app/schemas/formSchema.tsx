
import { z } from 'zod';

export const formSchema = z.discriminatedUnion('formType', [
  z.object({
    formType: z.literal('company'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    companyName: z.string().min(1, 'Company name is required'),
    teamSize: z.string().min(1, 'Team size is required'),
  }),
  z.object({
    formType: z.literal('personal'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    occupancy: z.string().min(1, 'Occupancy is required'),
  }),
]);

export type FormSchema = z.infer<typeof formSchema>;
