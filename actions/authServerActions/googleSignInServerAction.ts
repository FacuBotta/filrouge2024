'use server';
import { signIn } from '@/lib/auth/authConfig';

export async function handleGoogleSignIn() {
  try {
    await signIn('google', { redirectTo: '/dashboard' });
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    throw error;
  }
}
