import React from 'react';
import IconWrapper from './IconWrapper';

export default function RantingUser({
  ranting,
  starWidth,
}: {
  ranting: number;
  starWidth?: number;
}): React.JSX.Element {
  const stars = Array.from({ length: ranting }, (_, i) => (
    <IconWrapper
      type="star"
      key={i}
      cursor="default"
      strokeWidth={1}
      width={starWidth || 25}
      color="black"
      className=" fill-light-yellow"
    />
  ));
  let i = 0;
  while (i < 5 - ranting) {
    stars.push(
      <IconWrapper
        type="star"
        cursor="default"
        key={i + 10}
        strokeWidth={1}
        color="black"
        width={starWidth || 25}
        className=" dark:fill-light-grey/50"
      />
    );
    i++;
  }

  return (
    <div className="flex flex-col justify-center items-center w-fit">
      <div className="flex gap-1 items-center">{stars}</div>
    </div>
  );
}
