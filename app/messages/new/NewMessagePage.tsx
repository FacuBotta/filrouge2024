'use client';
import { createConversation } from '@/actions/messagesServerActions/createConversation';
import Backdrop from '@/components/layouts/Backdrop';
import Button from '@/components/ui/Button';
import IconWrapper from '@/components/ui/IconWrapper';
import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { UserAvatar } from '@/public/images/UserAvatar';
import { RegisteredUsers } from '@/types/types';
import { Link } from 'next-view-transitions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
export const NewMessagePage = ({ users }: { users: RegisteredUsers[] }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedUsersIds = selectedUsers.join(',');
    formData.set('participantsId', selectedUsersIds);

    const response = await createConversation(formData);
    if (response?.ok) {
      router.push(`/messages`);
    } else {
      console.error(response);
    }
  };
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Backdrop>
      <div className="w-full max-w-[400px] h-fit max-h-[600px] flex flex-col gap-2 p-4 mx-2 bg-light-blue dark:bg-dark-bg rounded-xl">
        <Link href="/messages">
          <IconWrapper
            type="plus"
            strokeWidth={2}
            className="transform rotate-45"
          />
        </Link>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full h-full flex flex-col gap-3"
        >
          <p>Subject</p>
          <input
            type="text"
            name="sujet"
            placeholder="Sujet"
            className="p-2 border-2 rounded-lg"
          />
          <p>Destinataires</p>
          <div className="flex w-full max-h-[320px] no-scrollbar overflow-y-scroll">
            <ul className="w-full">
              {users?.map((user: RegisteredUsers) => (
                <li
                  key={user.id}
                  className={`cursor-pointer flex gap-2 items-end my-2 border-2 rounded-lg p-2 ${selectedUsers.includes(user.id) ? 'border-light-yellow' : 'border-inherit'}`}
                  onClick={() => toggleUserSelection(user.id)}
                >
                  {user.image ? (
                    <UserAvatar src={user.image} />
                  ) : (
                    <DefaultUserAvatar className="size-12 opacity-40" />
                  )}
                  <span>{user.email}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button width="100%" type="submit">
            Create
          </Button>
        </form>
      </div>
    </Backdrop>
  );
};
