import CustomError, { ValidationError } from '@/utils/customError';
import { expect } from '@jest/globals';
describe('CustomError class', () => {
  it('should create an instance with a message and no errors', () => {
    const error = new CustomError('Test error');

    expect(error).toBeInstanceOf(CustomError);
    expect(error.message).toBe('Test error');
    expect(error.ok).toBe(false);
    expect(error.errors).toBeUndefined();
  });

  it('should create an instance with a message and errors', () => {
    const errors: ValidationError[] = [
      { message: 'Invalid field', path: ['field1'] },
      { message: 'Required field', path: ['field2'] },
    ];

    const error = new CustomError('Validation error', errors);

    expect(error).toBeInstanceOf(CustomError);
    expect(error.message).toBe('Validation error');
    expect(error.ok).toBe(false);
    expect(error.errors).toEqual(errors);
  });

  it('should set the name property to the constructor name', () => {
    const error = new CustomError('Test error');

    expect(error.name).toBe('CustomError');
  });

  it('should inherit from the built-in Error class', () => {
    const error = new CustomError('Test error');

    expect(error).toBeInstanceOf(Error);
  });
});
