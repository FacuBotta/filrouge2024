'use client';
import { updateUserProfile } from '@/actions/userServerActions/updateUserProfile';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface EditProfileFormProps {
  username: string;
  image: string;
  description: string;
}

export const EditProfileForm = ({
  username,
  image,
  description,
}: EditProfileFormProps): React.JSX.Element => {
  // TODO : parse data with zod and set errors to form fields
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await updateUserProfile(formData);
    if (response.ok) {
      toast.success(response.message);
      router.push('/profile');
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-5 mt-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
        type="text"
        name="username"
        defaultValue={username}
        placeholder="Username"
      />
      <input
        className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
        type="text"
        name="image"
        defaultValue={image}
        placeholder="Le URL de ta photo"
      />
      <textarea
        className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
        name="description"
        rows={6}
        maxLength={300}
        defaultValue={description}
        placeholder="Donne une petite description de toi pour partager avec le reste de la communauté! (max 300 caractères)"
      />
      <button type="submit" className="primary-btn !w-full">
        Sauvegarder
      </button>
    </form>
  );
};
