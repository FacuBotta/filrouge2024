'use client';

import { UserAvatar } from '@/public/images/UserAvatar';
import { BasicProfileInformation } from '@/types/types';
import { useEffect, useState } from 'react';

interface SelectUserListProps {
  users: BasicProfileInformation[];
  takeUsers: (selectedUsers: BasicProfileInformation[]) => void;
  closeModal: () => void;
}

export default function SelectUserList({
  users,
  takeUsers,
  closeModal,
}: SelectUserListProps) {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [filterUser, setFilterUser] =
    useState<BasicProfileInformation[]>(users);

  const searchUsers = (searchTerm: string) => {
    const filteredUsers = users.filter((user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterUser(filteredUsers);
  };

  // Turn of the scroll of the body when the modal is open
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
  const handleUserSelection = (userId: string) => {
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
    takeUsers(selectedUsers);
    closeModal();
  };

  return (
    <div className="w-full max-w-[320px] 4xl:max-w-[420px] h-[85vh] max-h-[700px] flex flex-col justify-between gap-2 p-4 rounded-xl border bg-light-cards dark:bg-dark-bg mx-2 mt-2">
      <header className="w-full">
        <p className="text-2xl font-semibold mb-3">Mes contactes</p>
        <input
          type="search"
          onChange={(e) => searchUsers(e.target.value)}
          placeholder="Rechercher..."
          className="newEventInput !bg-light-grey dark:!bg-transparent"
        />
      </header>
      <ul className="flex flex-col w-full h-full no-scrollbar overflow-y-scroll inset-shadow-lg border border-light-borderCards dark:border-dark-borderCards rounded-lg p-2 bg-light-ciel dark:bg-dark-bg ">
        {filterUser.map((user) => (
          <li
            key={user.id}
            className={`cursor-pointer flex gap-2 bg-light-blue dark:bg-dark-cards items-end my-2 border-2 rounded-lg p-2 ${
              selectedUserIds.includes(user.id)
                ? 'border-light-yellow'
                : 'border-inherit'
            }`}
            onClick={() => handleUserSelection(user.id)}
          >
            <div className="shrink-1">
              <UserAvatar src={user.image} />
            </div>
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
      <footer className="flex flex-col gap-2 ">
        <button className="primary-btn w-full" onClick={confirmSelection}>
          Confirmer
        </button>
        <button className="secondary-btn w-full" onClick={closeModal}>
          Annuler
        </button>
      </footer>
    </div>
  );
}
