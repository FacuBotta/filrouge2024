'use client';

import SearchBar from '../ui/SearchBar';

interface HeaderPageProps {
  title: string;
  searchType: 'events' | 'users' | 'messages' | 'all';
}

export default function PageHeader({ title, searchType }: HeaderPageProps) {
  return (
    <div className="relative z-20 flex flex-col gap-5 w-[95%] mx-auto mb-5 4xl:mb-10 4xl:mt-20 flex-wrap overflow-visible">
      <h1 className="text-4xl font-bold text-light-grey">{title}</h1>
      <SearchBar title={searchType} />
    </div>
  );
}
