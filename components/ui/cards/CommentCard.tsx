import { UserAvatar } from '@/public/images/UserAvatar';
import { Comment } from '@/types/types';
import { Link } from 'next-view-transitions';
import RantingUser from '../RantingUser';

export default function CommentCard({ comment }: { comment: Comment }) {
  console.log({ author: comment });
  return (
    <div
      key={comment.id}
      className="flex flex-col gap-2 p-1 border-2 border-card rounded-lg w-full max-w-[280px]"
    >
      <div className="flex items-center gap-5 p-2  border-b w-full">
        <Link href={`/communaute/profile/${comment.author.id}`}>
          <UserAvatar src={comment.author.image} className="size-12" />
        </Link>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{comment.author.username}</p>
          <p className="text-sm font-thin">
            {comment.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="text-lg pl-2">
        <RantingUser starWidth={15} ranting={comment.rating?.score || 0} />
        <p>{comment.content}</p>
      </div>
    </div>
  );
}
