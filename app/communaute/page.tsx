import { selectAllBasicUserInfos } from '@/actions/userServerActions/selectAllBasicUserInfos';
import PageHeader from '@/components/layouts/PageHeader';
import UserCard from '@/components/ui/dashboard/UserCard';
import { BasicProfileInformation } from '@/types/types';

export default async function CommunityPage() {
  const users: BasicProfileInformation[] = await selectAllBasicUserInfos();

  return (
    <section className="animate w-fit  mx-auto flex flex-col mt-5">
      <PageHeader title="Communauté" searchType="users" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
