import { writeFile } from 'fs/promises';
import path from 'path';

/**
 * Uploads an image to the server and saves it to uploads folder.
 * The image is saved with a unique name based on the base name and the current timestamp.
 *
 * @param {File} file - The image file to be uploaded.
 * @param {string} baseName - The base name for the image file. It will be used to generate a safe file name.
 * @returns {Promise<{ imagePath: string | null }>}
 * @throws {Error} If no file is provided.
 */
export async function uploadImage(
  file: File,
  baseName: string
): Promise<{ imagePath: string | null }> {
  if (!file) {
    throw new Error('No file provided');
  }
  const safeTitle = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
  const imageName = `${safeTitle}_${Date.now()}.jpg`;
  const imagePath = `/uploads/${imageName}`;

  const buffer = await file.arrayBuffer();
  const filepath = path.join(process.cwd(), 'public', 'uploads', imageName);

  try {
    await writeFile(filepath, Buffer.from(buffer));
    return { imagePath };
  } catch (error) {
    console.error('Error saving the image:', error);
    return { imagePath: null };
  }
}
