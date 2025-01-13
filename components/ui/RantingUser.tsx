import IconWrapper from './IconWrapper';

export default function RantingUser({
  ranting,
}: {
  ranting: number;
}): JSX.Element {
  const stars = Array.from({ length: ranting }, (_, i) => (
    <IconWrapper
      type="star"
      key={i}
      cursor="default"
      strokeWidth={2}
      className="stroke-black fill-light-yellow"
    />
  ));
  let i = 0;
  while (i < 5 - ranting) {
    stars.push(
      <IconWrapper
        type="star"
        cursor="default"
        key={i + 10}
        strokeWidth={2}
        className="stroke-black "
      />
    );
    i++;
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex gap-2 items-center">{stars}</div>
      <p>{ranting} votes</p>
    </div>
  );
}
