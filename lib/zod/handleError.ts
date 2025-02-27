import CustomError from '@/utils/customError';
import { ZodError } from 'zod';

// This interface is used by the handleError function to type the error object
export interface ValidationError {
  message: string;
  path: (string | number)[];
}

/**
 * Handles errors and converts them into a standardized `CustomError` instance.
 * Supports both generic errors and `ZodError` validation errors.
 * *
 * @param {unknown} error - The error to handle. This can be any type of error, including validation errors from Zod.
 * @returns {CustomError<ValidationError[]>} A structured `CustomError` instance containing:
 *   - `message`: A general error message, which may describe validation errors or a generic issue.
 *   - `errors`: An array of validation errors if the error is a `ZodError`; otherwise, it is undefined.
 *
 * @example
 * try {
 *   schema.parse(data);
 * } catch (error) {
 *   return handleError(error);
 * }
 */
export function handleError(error: unknown): CustomError<ValidationError[]> {
  if (error instanceof ZodError) {
    // Extract validation errors from Zod
    const validationErrors: ValidationError[] = error.errors.map(
      ({ message, path }) => ({
        message,
        path,
      })
    );

    // Create an instance of CustomError with the validation error details
    const message = validationErrors.map((e) => e.message).join(', ');
    return new CustomError<ValidationError[]>(message, validationErrors);
  }

  // For other errors, generate a CustomError with a generic message
  return new CustomError<ValidationError[]>('Une erreur est survenue');
}
