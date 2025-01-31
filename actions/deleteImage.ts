'use server';

import { unlink } from 'fs/promises';

export async function deleteImage(path: string) {
  try {
    await unlink(path);
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression de l'image",
    };
  }
}
