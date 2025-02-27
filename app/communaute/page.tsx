import { selectAllBasicUserInfos } from '@/actions/userServerActions/selectAllBasicUserInfos';
import PageHeader from '@/components/layouts/PageHeader';
import UserCard from '@/components/ui/dashboard/UserCard';
import { BasicProfileInformation } from '@/types/types';

export default async function communautePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  const users: BasicProfileInformation[] =
    await selectAllBasicUserInfos(search);

  return (
    <div className="flex justify-start items-start mt-10 min-h-screen gap-10 max-w-max w-full mx-auto">
      <section className="animate-scroll w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center mt-5">
        <PageHeader title="Communauté" searchType="users" />
        <div className="w-full flex flex-wrap gap-10 mt-5 mb-10">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </div>
  );
}
