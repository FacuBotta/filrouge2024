'use client';

import Backdrop from '@/components/layouts/Backdrop';

export const UsersList = ({ users }: { users: any }) => {
  // console.log('users from usersList', users);
  {
    /* <input type="checkbox" id="userList" className="hidden peer" />

      <label htmlFor="userList" className="cursor-pointer block mb-2">
        Toggle User List
      </label>
      <input name="sujet" type="text" placeholder="sujet" />
      <div className="hidden peer-checked:block">
        <UsersList users={registeredUsers} />
      </div> */
  }
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
