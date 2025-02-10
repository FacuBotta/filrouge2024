import { unlink } from 'fs/promises';
import path from 'path';

export async function deleteImage(imagePath: string) {
  try {
    // Asegúrate de tener el path absoluto
    const absolutePath = path.resolve('public', imagePath);

    await unlink(absolutePath);
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression de l'image",
    };
  }
}
