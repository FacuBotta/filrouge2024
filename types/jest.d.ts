import '@jest/globals';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWith(...args: unknown[]): R;
      toBeNull(): R;
    }
  }
}

declare module '@jest/expect' {
  interface Matchers<R> {
    toHaveBeenCalledWith(...args: unknown[]): R;
    toBeNull(): R;
  }
}

declare const expect: jest.Expect;
