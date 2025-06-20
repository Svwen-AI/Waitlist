import { z } from 'zod';

export const FormTypeEnum = z.enum(['personal', 'company']);

export const OccupancyEnum = z.enum([
  'student',
  'freelancer',
  'employeed',
  'unemployeed',
  'other',
]);

export const TeamSizeEnum = z.enum([
  '1-5',
  '6-10',
  '11-20',
  '21-50',
  '50+',
]);

const baseFields = {
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Invalid email').trim(),
};

export const personalWaitlistSchema = z.object({
  formType: z.literal('personal'),
  ...baseFields,
  occupancy: OccupancyEnum,
});

export const companyWaitlistSchema = z.object({
  formType: z.literal('company'),
  ...baseFields,
  companyName: z.string().min(1, 'Company name is required').trim(),
  teamSize: TeamSizeEnum,
});

export const waitlistSchema = z.discriminatedUnion('formType', [
  personalWaitlistSchema,
  companyWaitlistSchema,
]);
