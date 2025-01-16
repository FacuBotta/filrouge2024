import { selectAllBasicUserInfos } from '@/actions/userServerActions/selectAllBasicUserInfos';

export default async function CommunityPage() {
  const users = await selectAllBasicUserInfos();
  console.log(users);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Communauté</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))} */}
      </div>
    </div>
  );
}
