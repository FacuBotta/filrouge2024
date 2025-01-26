'use client';

import { UserAvatar } from '@/public/images/UserAvatar';
import { BasicProfileInformation } from '@/types/types';
import { useState } from 'react';

interface SelectUserListProps {
  users: BasicProfileInformation[];
  closeAndTakeUsers: (selectedUsers: BasicProfileInformation[]) => void;
}

export default function SelectUserList({
  users,
  closeAndTakeUsers,
}: SelectUserListProps) {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const confirmSelection = () => {
    const selectedUsers = users.filter((user) =>
      selectedUserIds.includes(user.id)
    );
    closeAndTakeUsers(selectedUsers);
  };

  return (
    <div className="w-full max-w-[320px] 4xl:max-w-[420px] flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-dark-bg">
      <header className="w-full">
        <p className="text-2xl font-semibold mb-3">Mes contactes</p>
        <input
          type="search"
          placeholder="Rechercher..."
          className="w-full h-10 p-5 text-xl placeholder:select-none placeholder:text-dark-greenLight/50 border-2 border-dark-bg bg-dark-bg dark:border-light-grey rounded-lg focus:outline-bg-light-yellow"
        />
      </header>
      <div className="flex w-full max-h-[520px] no-scrollbar overflow-y-scroll inset-shadow-lg ">
        <ul className="w-full">
          {users.map((user) => (
            <li
              key={user.id}
              className={`cursor-pointer flex gap-2 items-end my-2 border-2 rounded-lg p-2 ${
                selectedUserIds.includes(user.id)
                  ? 'border-light-yellow'
                  : 'border-inherit'
              }`}
              onClick={() => toggleUserSelection(user.id)}
            >
              <div className="shrink-1">
                <UserAvatar src={user.image} />
              </div>
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={confirmSelection}>Confirmer</button>
    </div>
  );
}
