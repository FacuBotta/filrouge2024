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

  // console.log('params from conversation page', currentConversation);
  return (
    <div className="bg-dark-yellowLight dark:bg-light-grey/20 p-5">
      <h2>
        {currentConversation?.title}{' '}
        <span className="font-extralight text-sm">
          Createt At: {currentConversation?.createdAt.toLocaleString()}
        </span>
      </h2>
      <div className="flex flex-col gap-2 bg-gray-200 w-[80%] h-[300px] m-auto p-10 mb-8">
        {currentConversation?.messages?.map((message) => (
          <div
            key={message.id}
            className="border border-gray-800 p-2 flex flex-col dark:bg-dark-bg/80"
          >
            <p>{message.content} </p>
            <div className="flex flex-col text-sm border-t border-gray-900">
              <span className="text-green-600 font-extralight">
                At : {message.createdAt.toLocaleTimeString()}
              </span>
              <span>From :{message.sender.email}</span>
            </div>
          </div>
        ))}
      </div>
      <MessageForm />
    </div>
  );
}
