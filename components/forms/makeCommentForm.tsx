'use client';

import { makeComment } from '@/actions/commentsServerActions/makeComment';
import { ScoreGiverRef } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import ScoreGiver from './ScoreGiver';

export default function MakeCommentForm({
  recipientId,
}: {
  recipientId: string;
}) {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const scoreRef = useRef<ScoreGiverRef>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = commentRef.current?.value;
    try {
      if (content) {
        setIsLoading(true);
        const score = scoreRef.current?.getScore();
        if (!score) {
          throw new Error('Score is not defined');
        }
        const response = await makeComment(content, recipientId, score);
        if (response.ok) {
          toast.success(response.message);
          commentRef.current.value = '';
          router.refresh();
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la création du commentaire');
    }
  };
  const toggleForm = () => {
    if (commentRef.current) {
      commentRef.current.value = '';
    }
    setFormOpen(!formOpen);
  };

  return (
    <div>
      <button
        onClick={() => setFormOpen(true)}
        className={`${formOpen ? 'hidden' : 'primary-btn mb-2'} `}
      >
        Laisser un commentaire
      </button>
      <form
        className={`${formOpen ? 'h-[280px] opacity-100' : 'h-[0px] opacity-0'} overflow-hidden w-[300px] transition-all duration-300 ease-in-out`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <ScoreGiver ref={scoreRef} />
        <textarea
          ref={commentRef}
          name="comment"
          id="comment"
          rows={4}
          placeholder="Tapez un commentaire"
          className="w-full p-2 border-2 border-black dark:border-dark-grey/50 rounded-lg dark:bg-transparent dark:placeholder:text-dark-greenLight/50"
        ></textarea>
        <div className="flex gap-2">
          <button
            type="submit"
            className="primary-btn w-full"
            disabled={isLoading}
          >
            Envoyer
          </button>
          <div className="secondary-btn" onClick={() => toggleForm()}>
            Annuler
          </div>
        </div>
      </form>
    </div>
  );
}
