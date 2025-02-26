'use client';
import { updateUserProfile } from '@/actions/userServerActions/updateUserProfile';
import { updateUserSchema } from '@/lib/zod/zodSchemas';
import { UserAvatar } from '@/public/images/UserAvatar';
import {
  getFormDataFileValue,
  getFormDataStringValue,
} from '@/utils/getFormDataValue';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';

interface EditProfileFormProps {
  username: string | null;
  image: string | null;
  description: string | null;
}

export const EditProfileForm = ({
  username,
  image,
  description,
}: EditProfileFormProps): React.JSX.Element => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(image);
  console.log('form form', image);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const userName = getFormDataStringValue(formData, 'username');
      const description = getFormDataStringValue(formData, 'description');
      const imageFile = getFormDataFileValue(formData, 'new-image');

      // Validate the form data using Zod schema
      updateUserSchema.parse({
        username: userName,
        image: imageFile,
        description,
      });

      // If the image hasn't changed, remove the new-image field from formData
      if (image === imagePreview) {
        formData.delete('new-image');
        if (image) {
          formData.append('old-image', image);
        }
      } else if (image) {
        formData.append('old-image', image);
      }

      const response = await updateUserProfile(formData);
      if (response.ok) {
        toast.success(response.message);
        router.push('/profile');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        const errorMessages = error.errors.map((err) => err.message).join(', ');
        toast.error(`Erreur de validation : ${errorMessages}`);
      } else {
        // Handle other errors
        console.error('Une erreur est survenue :', error);
        toast.error('Une erreur inattendue est survenue. Veuillez réessayer.');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form
        className="flex flex-col gap-5 mt-2 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="image-upload" className="cursor-pointer">
          <UserAvatar src={imagePreview} className="size-32 my-5 mx-auto" />
          <input
            id="image-upload"
            type="file"
            name="new-image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <input
          className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
          type="text"
          name="username"
          defaultValue={username || ''}
          placeholder="Username"
        />
        <textarea
          className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
          name="description"
          rows={6}
          maxLength={300}
          defaultValue={description || ''}
          placeholder="Donne une petite description de toi pour partager avec le reste de la communauté! (max 300 caractères)"
        />
        <button type="submit" className="primary-btn !w-full">
          Sauvegarder
        </button>
      </form>
    </div>
  );
};
