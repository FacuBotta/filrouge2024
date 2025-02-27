import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .email({ message: 'Veuillez utiliser une adresse e-mail valide' }),
});

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,30}$/;

export const passwordRegexMessage =
  '8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial, \' " _ - ne sont pas autorisés';

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit être de 8 caractères minimum' })
    .max(30, { message: 'Le mot de passe doit être de 30 caractères maximum' })
    .regex(passwordRegex, {
      message: passwordRegexMessage,
    }),
});

export const signUpSchema = z.object({
  email: z
    .string()
    .email({ message: 'Veuillez utiliser une adresse e-mail valide' }),
});

export const eventAddressSchema = z.object({
  url: z.string().url(),
  lat: z.number(),
  lng: z.number(),
  formattedAddress: z.string(),
  vicinity: z.string(),
});

export const newEventSchema = z.object({
  categoryId: z.string(),
  title: z
    .string()
    .max(100, { message: 'Le titre doit être de 100 caractères maximum' }),
  description: z
    .string()
    .min(30, {
      message: "Il faut un peu de l'inspiration pour cette description!",
    })
    .max(1000, {
      message: 'La description doit être de 1000 caractères maximum',
    }),
  eventStart: z.date().refine(
    (value) => {
      const date = value;
      const now = new Date();
      return !isNaN(date.getTime()) && date >= now;
    },
    {
      message: 'La date doit être valide et ne peut pas être dans le passé',
    }
  ),
  eventEnd: z
    .date()
    .nullable()
    .refine(
      (value) => {
        if (!value) return true;
        const date = value;
        const now = new Date();
        return !isNaN(date.getTime()) && date >= now;
      },
      {
        message: 'La date doit être valide et ne peut pas être dans le passé',
      }
    ),
  isPublic: z.boolean(),
  participants: z.array(z.string()),
  address: eventAddressSchema,
  image: z.instanceof(File),
});

// Generar el tipo TypeScript a partir del esquema
export type NewEventForm = z.infer<typeof newEventSchema>;

const validCategoryTitles = [
  'sport',
  'education',
  'language',
  'city tours',
  'air libre',
  'autres',
];

export const categoryTitleSchema = z
  .string()
  .regex(new RegExp(`^(${validCategoryTitles.join('|')})$`), {
    message: 'Titre invalide',
  });

// participants: z.array(z.string()).optional(),
// TODO: ADD EDIT PROFILE SCHEMA

/* 
=========================================================
============ USER SERVICES OUTPUT SCHEMAS ===============
=========================================================
*/
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const updateUserSchema = z.object({
  username: z
    .string()
    .max(30, "Le nom d'utilisateur doit comporter 30 caractères ou moins")
    .optional(),
  image: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "La taille de l'image doit être de 2 Mo ou moins",
      }),
      z.null(),
      z.undefined(),
    ])
    .optional(),
  description: z
    .string()
    .max(1000, 'La description doit comporter 1000 caractères ou moins')
    .optional(),
  oldImage: z.string().optional(),
});

export const getUserServiceSchema = z.object({
  id: z.string(),
  email: z.string().email().nullable(),
  username: z.string().nullable(),
  image: z.string().nullable(),
  description: z.string().nullable(),
  _count: z.object({
    Ratings: z.number(),
    EventsCreated: z.number(),
  }),
});
export type getUserServiceType = z.infer<typeof getUserServiceSchema>;

export const getAllUsersServiceSchema = z.array(getUserServiceSchema);
