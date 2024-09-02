import { getConversationById } from '@/actions/messagesServerActions/getConversationById';
import { handleMessageSendSubmit } from '@/actions/messagesServerActions/handleMessageSendSubmit';
import { SendMessageInput } from '@/components/forms/SendMessageInput';
import { auth } from '@/lib/auth/authConfig';
import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { Conversation, Message } from '@/types/types';
import { redirect } from 'next/navigation';

export default async function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  // take the current user from the auth
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  // take the conversation from the id in the url
  const currentConversation: Conversation | undefined =
    await getConversationById(params.conversationId);
  let prevMessage: Message | undefined;

  return (
    <section className="flex flex-col items-start justify-start px-2 w-full h-full">
      <div className="flex flex-col gap-2 w-full pb-2 border-b">
        <h2>
          {currentConversation?.title}
          <span className="font-extralight text-sm">
            Created At: {currentConversation?.createdAt?.toLocaleString()}
          </span>
        </h2>
      </div>
      {/* messages window */}
      <div className="no-scrollbar flex flex-col gap-2 bg-dark-grey/20 w-full max-h-[600px] m-auto p-2 rounded-xl overflow-y-scroll scroll-smooth">
        {currentConversation?.messages?.reduce((acc, message, index, arr) => {
          // Add a separator if the difference between the current and previous message is greater than a day
          if (index > 0) {
            const prevMessage = arr[index - 1];
            const isMoreThanOneDay =
              message.createdAt.getTime() - prevMessage.createdAt.getTime() >=
              1000 * 60 * 60 * 24;
            if (isMoreThanOneDay) {
              acc.push(
                <div
                  key={`separator-${index}`}
                  className="w-full text-center my-2 text-gray-500"
                >
                  <hr className="border-gray-300" />
                  <span className="px-2 ">
                    {prevMessage.createdAt.toDateString()}
                  </span>
                  <hr className="border-gray-300" />
                </div>
              );
            }
          }
          acc.push(
            <div
              key={message.id}
              className={`flex flex-row-reverse w-[80%] items-center ${
                session?.user?.id === message?.sender?.id ? 'ml-5' : 'm-auto'
              }`}
            >
              <div
                className={`border border-gray-800 p-2 flex flex-col w-full ${
                  session?.user?.id === message?.sender?.id
                    ? 'bg-dark-yellowLight/50'
                    : 'bg-dark-bg/50'
                }`}
              >
                <p>{message.content} </p>
                <div className="flex gap-5 text-sm border-t border-gray-900">
                  <span>From: {message.sender.email}</span>
                  <span className="text-green-600 font-extralight">
                    At: {message.createdAt.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              {message.sender.image ? (
                <img
                  className="size-12 aspect-square rounded-full border mx-2"
                  src={message.sender.image || ''}
                  alt="user avatar"
                />
              ) : (
                <DefaultUserAvatar
                  key={message.sender.id}
                  className="size-12 mx-2 opacity-50"
                />
              )}
            </div>
          );
          return acc;
        }, [] as JSX.Element[])}
      </div>
      <form action={handleMessageSendSubmit} className="w-full pb-10">
        <input
          type="hidden"
          name="conversationId"
          value={currentConversation?.id}
        />
        <SendMessageInput />
      </form>
    </section>
  );
}
