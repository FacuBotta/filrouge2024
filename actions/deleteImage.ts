import { unlink } from 'fs/promises';
import path from 'path';

/**
 * Deletes an image from the server.
 *
 * @param {string} imagePath - The relative path to the image file to be deleted.
 * @returns {Promise<void>} Resolves if the image is successfully deleted.
 * @throws {Error} If there is an error deleting the image.
 */
export async function deleteImage(imagePath: string): Promise<void> {
  const absolutePath = path.join(process.cwd(), 'public', imagePath);

  try {
    await unlink(absolutePath);
  } catch (error) {
    console.error('Error deleting the image:', error);
    throw new Error("Erreur lors de la suppression de l'image");
  }
}
