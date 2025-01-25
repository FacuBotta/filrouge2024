import { UserAvatar } from '@/public/images/UserAvatar';
import { BasicProfileInformation } from '@/types/types';
import { Link } from 'next-view-transitions';
import RantingUser from '../RantingUser';

export default function UserCard({ user }: { user: BasicProfileInformation }) {
  return (
    <Link className="user-card" href={`/communaute/profile/${user.id}`}>
      <UserAvatar className="size-32" src={user.image} />
      <h3 className="text-xl font-semibold">{user.username}</h3>
      <RantingUser ranting={user._count.Ratings} />
      {user._count.EventsCreated} événements créés
      <p className="mt-1 line-clamp-2">{user.description}</p>
    </Link>
  );
}
