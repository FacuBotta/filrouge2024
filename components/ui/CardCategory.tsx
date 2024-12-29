import Link from 'next/link';
import React from 'react';

interface cardCategoryProps {
  image: React.ReactNode;
  title: string;
  color:
    | 'bg-light-ciel'
    | 'bg-dark-grey'
    | 'bg-dark-yellow'
    | 'bg-dark-green'
    | 'bg-dark-greenLight'
    | 'bg-dark-yellowLight'
    | 'bg-dark-red'
    | 'bg-light-blue'
    | 'bg-light-grey'
    | 'bg-light-yellow'
    | 'bg-light-red';
}

export default function CardCategory(props: cardCategoryProps) {
  const categoryLink = props.title.toLowerCase().replaceAll(' ', '-');
  return (
    <Link
      href={`/events/${categoryLink}`}
      className={`flex flex-col items-center justify-between aspect-square p-5 border-2 border-black ${props.color} sm:hover:scale-105 transition-all duration-300 ease-in-out`}
    >
      <div className="flex w-full max-h-[70%] items-center justify-center">
        {props.image}
      </div>
      <p className="font-bold text-dark-bg">{props.title}</p>
    </Link>
  );
}
