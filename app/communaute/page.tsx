import { selectAllBasicUserInfos } from '@/actions/userServerActions/selectAllBasicUserInfos';
import UserCard from '@/components/ui/dashboard/UserCard';
import { BasicUserDataCard } from '@/types/types';

export default async function CommunityPage() {
  const users: BasicUserDataCard[] = await selectAllBasicUserInfos();

  return (
    <section className="animate w-fit  mx-auto flex flex-col mt-5">
      <h1 className="text-3xl font-bold my-5">Communauté</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
