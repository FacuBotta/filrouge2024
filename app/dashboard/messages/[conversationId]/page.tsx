import { MessageForm } from '@/components/forms/messageForm';
import prisma from '@/lib/prisma';

export default async function ConversationPage({
  params,
}: {
  params: { slug: string };
}) {
  const currentConversation = await prisma.conversation.findFirst({
    where: {
      id: params.slug,
    },
    include: {
      messages: {
        include: {
          sender: true,
        },
      },
    },
  });

  // console.log('currentConversation from conversation page', currentConversation);
  return (
    <section className="flex flex-col min-w-full">
      <div>
        <h2>
          {currentConversation?.title}{' '}
          <span className="font-extralight text-sm">
            Create At: {currentConversation?.createdAt.toLocaleString()}
          </span>
        </h2>
      </div>
      {/* messages window */}
      <div className="flex flex-col gap-2 bg-dark-grey/20 w-full h-[300px] m-auto p-2 rounded-xl overflow-y-scroll scroll-smooth ">
        {currentConversation?.messages?.map((message) => (
          <div
            key={message.id}
            className="border border-gray-800 p-2 flex flex-col dark:bg-dark-bg/80 w-[80%] m-auto"
          >
            <p>{message.content} </p>
            <div className="flex gap-5 text-sm border-t border-gray-900">
              <span>From : {message.sender.email}</span>
              <span className="text-green-600 font-extralight">
                At : {message.createdAt.toLocaleTimeString()}
              </span>
            </div>
            {/* <img src={message?.sender?.image} alt="user avatar" /> */}
          </div>
        ))}
      </div>
      <MessageForm />
    </section>
  );
}
