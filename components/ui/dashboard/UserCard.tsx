import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface UserCardProps {
  user: {
    id: string;
    userName: string;
    image: string;
    description: string;
    eventsCreated: number;
    rating: number;
  };
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/profile/${user.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <div className="relative w-24 h-24">
              <Image
                src={user.image}
                alt={user.userName}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.userName}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{user.description}</p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{user.rating.toFixed(1)}</span>
                </div>
                <div className="text-gray-600">
                  {user.eventsCreated} événements créés
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
