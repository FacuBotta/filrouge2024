import { z } from 'zod';

// Definimos una expresión regular que permite solo dominios específicos.
const validEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
];

// Convertimos el arreglo de dominios en una expresión regular.
const domainRegex = validEmailDomains.join('|');
const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${domainRegex})$`);

// Esquema de validación de correo electrónico
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
  email: z.string().email({ message: 'Correo electrónico inválido' }),
});

// TODO: ADD EDIT PROFILE SCHEMA
