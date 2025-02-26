/**
 * Represents a custom error that extends the built-in `Error` class.
 * This class allows for additional structured error information.
 *
 * @template T - The type of additional error details (e.g., validation errors).
 */
class CustomError<T = unknown> extends Error {
  /**
   * Indicates that the operation was not successful.
   * Always `false` for instances of `CustomError`.
   */
  public ok: boolean;

  /**
   * A error message describing the issue.
   */
  public message: string;

  /**
   * Additional error details, such as validation errors or metadata.
   * This field is optional.
   */
  public errors?: T;

  /**
   * Creates an instance of `CustomError`.
   *
   * @param {string} message - A descriptive error message.
   * @param {T} [errors] - Optional additional error details.
   */
  constructor(message: string, errors?: T) {
    super(message);
    this.name = this.constructor.name;
    this.ok = false;
    this.message = message;
    this.errors = errors;
  }
}

export default CustomError;
