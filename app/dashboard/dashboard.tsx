import SignOutButton from '@/components/ui/sigOutButton';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { MessageForm } from '@/components/forms/messageForm';
import React from 'react';
import { getUserMessages } from '@/actions/messagesServerActions/getUserMessages';
import DashboardMessagesWindow from '@/components/ui/dashboarMessagesWindow';

export const DashboardPage: React.FC<{ user: User }> = async ({ user }) => {
  if (!user.password) {
    redirect('/complete-profile');
  }
  const conversations = (await getUserMessages()) || [];
  // const messages = (await getUserMessages()) || [];
  console.log(conversations[0].messages);
  return (
    <div className="min-h-screen w-full p-10 grid grid-rows-fill gap-2">
      <div className="bg-light-yellow col-span-3 h-[100px]">
        <SignOutButton />
        <p>Welcome, {user.name || user.email}!</p>
      </div>
      <aside className="bg-dark-greenLight row-span-4">algo</aside>
      <section className="bg-light-blue col-span-2 row-span-3 ">
        <h2>Messages</h2>
        {conversations[0].messages.map((message) => (
          <div key={message.id}>
            <p>
              {message.content}{' '}
              <span className="text-green-600">
                {message.createdAt.toLocaleTimeString()}
              </span>
              <span>{message.sender.email}</span>
            </p>
          </div>
        ))}
        {/* <DashboardMessagesWindow messages={conversations} /> */}

        <MessageForm />
      </section>
    </div>
  );
};

export default DashboardPage;
