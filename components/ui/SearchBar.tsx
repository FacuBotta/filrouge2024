'use client';

import { Icon } from 'facu-ui';
import { useState } from 'react';

interface SearchBarProps {
  title: string;
  searchType?: 'events' | 'users' | 'messages' | 'all';
}

export default function SearchBar({ title }: SearchBarProps) {
  let placeHolder = '';
  const [isOpen, setIsOpen] = useState<boolean>(false);

  switch (title) {
    case 'users':
      placeHolder = 'Un nom ? Une ville ?';
      break;
    case 'events':
      placeHolder = 'mot clé, lieu, date ?';
      break;
    case 'messages':
      placeHolder = 'Un conversation ? Un sujet ?';
      break;
    case 'all':
      placeHolder = 'Un mot clé, un contact, une tache ?';
      break;
    default:
      placeHolder = 'Un mot clé ?';
      break;
  }

  return (
    <div className="relative flex w-full max-w-[500px] overflow-visible">
      <div className="flex items-center gap-2 w-full">
        <input
          type="search"
          placeholder={placeHolder}
          className="w-full h-10 p-5 text-xl placeholder:select-none placeholder:text-dark-greenLight/50 border-2 border-dark-bg bg-dark-bg dark:border-light-grey rounded-lg focus:outline-bg-light-yellow"
        />
        <Icon onClick={() => setIsOpen(!isOpen)} type="search" width={40} />
      </div>
      {isOpen && (
        <div className="absolute select-none z-50 top-12 right-0 w-full dark:bg-dark-bg bg-light-blue border border-light-grey rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-4 text-light-grey">
            Filtrer et Trier
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="sort"
                className="block text-sm text-light-grey mb-2"
              >
                Trier par
              </label>
              <select
                id="sort"
                className="w-full p-2 border rounded-lg bg-dark-bg text-light-grey"
              >
                <option value="date">Plus récent</option>
                <option value="popularité">Plus populaire</option>
                <option value="proximité">Plus ancien</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm text-light-grey mb-2"
              >
                Catégorie
              </label>
              <select
                id="category"
                className="w-full p-2 border rounded-lg bg-dark-bg text-light-grey"
              >
                <option value="toutes">Toutes les catégories</option>
                <option value="culture">Culture</option>
                <option value="sport">Sport</option>
                <option value="éducation">Éducation</option>
              </select>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full p-2 bg-light-yellow text-dark-bg font-bold rounded-lg hover:bg-light-yellow/80"
            >
              Appliquer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
