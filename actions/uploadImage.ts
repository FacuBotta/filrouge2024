'use server';

import { writeFile } from 'fs/promises';
import path from 'path';

export async function uploadImage(file: File, fileName: string) {
  if (!file) {
    throw new Error('Aucun fichier fourni');
  }

  const buffer = await file.arrayBuffer();
  const filepath = path.join(process.cwd(), 'public', 'uploads', fileName);

  try {
    await writeFile(filepath, Buffer.from(buffer));
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'image:", error);
    return { success: false, error: "Erreur lors de la sauvegarde de l'image" };
  }
}
