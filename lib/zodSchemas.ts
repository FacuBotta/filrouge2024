import { z } from 'zod';

const validEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
];

const domainRegex = validEmailDomains.join('|');
const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${domainRegex})$`);

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Adresse e-mail invalide' })
    .regex(emailRegex, {
      message:
        "Veuillez utiliser une adresse e-mail d'un fournisseur connu (Gmail, Yahoo, etc.)",
    }),
});

export const signUpSchema = z.object({
  email: z
    .string()
    .email({ message: 'Veuillez utiliser une adresse e-mail valide' }),
});

export const newEventSchema = z.object({
  title: z
    .string()
    .max(100, { message: 'Le titre doit être de 100 caractères maximum' }),
  categoryId: z.string(),
  isPublic: z.boolean(),
  eventStart: z.string().refine(
    (value) => {
      const date = new Date(value);
      const now = new Date();
      return !isNaN(date.getTime()) && date >= now;
    },
    {
      message: 'La date doit être valide et ne peut pas être dans le passé',
    }
  ),
  eventEnd: z.string().refine(
    (value) => {
      const date = new Date(value);
      const now = new Date();
      return !isNaN(date.getTime()) && date >= now;
    },
    {
      message: 'La date doit être valide et ne peut pas être dans le passé',
    }
  ),
  description: z
    .string()
    .min(30, {
      message: "Il faut un peu de l'inspiration pour cette description!",
    })
    .max(1000, {
      message: 'La description doit être de 1000 caractères maximum',
    }),
});
// participants: z.array(z.string()).optional(),
// TODO: ADD EDIT PROFILE SCHEMA
