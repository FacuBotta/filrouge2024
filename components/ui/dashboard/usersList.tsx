'use client';

import Backdrop from '@/components/layouts/Backdrop';

export const UsersList = ({ users }: { users: any }) => {
  console.log('users from usersList', users);
  return (
    <Backdrop>
      <select multiple name="userRecipientId" className="w-full p-2">
        {/* <option value="">Select a user</option> */}
        {users?.map((user: any) => (
          <option value={user.id} key={user.id}>
            {/* TODO: add image and name */}
            {user.email}
          </option>
        ))}
      </select>
    </Backdrop>
  );
};
