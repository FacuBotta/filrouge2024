import { handleError } from '@/lib/zod/handleError';
import CustomError from '@/utils/customError';
import { ZodError, ZodIssueCode } from 'zod';
import { expect } from '@jest/globals';

describe('handleError function', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Hide console.error output before each test
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore console.error after each test
  });
  it('should handle Zod validation errors correctly', () => {
    const zodError = new ZodError([
      {
        message: 'Invalid type',
        path: ['field1'],
        code: ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'number',
      },
      {
        message: 'Required',
        path: ['field2'],
        code: ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'undefined',
      },
    ]);

    const result = handleError(zodError);
    expect(result).toBeInstanceOf(CustomError);

    expect(result.message).toBe('Invalid type, Required');
    expect(result.ok).toBe(false);
    expect(result.errors).toEqual([
      { message: 'Invalid type', path: ['field1'] },
      { message: 'Required', path: ['field2'] },
    ]);
  });

  it('should handle generic errors correctly', () => {
    const genericError = new Error('Something went wrong');

    const result = handleError(genericError);

    expect(result).toBeInstanceOf(CustomError);

    expect(result.message).toBe('Une erreur est survenue');
    expect(result.errors).toBeUndefined();
  });
});
