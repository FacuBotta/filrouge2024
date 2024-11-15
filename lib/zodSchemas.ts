import { z } from 'zod';

const validEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
];

const domainRegex = validEmailDomains.join('|');
const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${domainRegex})$`);

const emailErrorMessages = {
  domainError:
    "Veuillez utiliser une adresse e-mail d'un fournisseur connu (Gmail, Yahoo, etc.)",
  existError: 'Cet email est déjà associé à un compte',
  formatError: 'Adresse e-mail invalide',
};

export const emailSchema = z.object({
  email: z
    .string()
    .email({ message: emailErrorMessages.formatError })
    .regex(emailRegex, {
      message: emailErrorMessages.domainError,
    }),
});

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit être de 8 caractères minimum' })
    .max(30, { message: 'Le mot de passe doit être de 30 caractères maximum' })
    .regex(passwordRegex, {
      message:
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
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
