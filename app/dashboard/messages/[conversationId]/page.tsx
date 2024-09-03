import { getConversationById } from '@/actions/messagesServerActions/getConversationById';
import { handleDeleteConversation } from '@/actions/messagesServerActions/handleDeleteConversation';
import { handleMessageSendSubmit } from '@/actions/messagesServerActions/handleMessageSendSubmit';
import { SendMessageInput } from '@/components/forms/SendMessageInput';
import DashboardMessagesWindow from '@/components/ui/dashboard/DashboardMessagesWindow';
import IconWrapper from '@/components/ui/IconWrapper';
import { auth } from '@/lib/auth/authConfig';
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

  // check if the conversation exists
  if (!currentConversation || currentConversation.id === undefined) {
    redirect('/dashboard/messages');
  }
  const messages: Message[] = currentConversation.messages || [];
  return (
    <section className="flex flex-col items-start justify-between px-2 pb-20 w-full h-[95%]">
      {/* conversation header */}
      <div className="flex justify-between gap-2 w-full px-2 pt-3 border-b ">
        <h2 className="mb-0">
          {currentConversation.title?.toLocaleUpperCase()}
          {' - '}
          <span className="font-extralight text-sm">
            Created At: {currentConversation.createdAt?.toLocaleString()}
          </span>
        </h2>
        <form action={handleDeleteConversation}>
          <input
            type="hidden"
            name="conversationId"
            value={currentConversation.id}
          />
          <button>
            {/* TODO: change icon if the user is not the creator */}
            <IconWrapper
              type="delete"
              strokeWidth={2}
              className="hover:text-red-600 dark:hover:text-dark-greenLight hover:scale-110"
            />
          </button>
        </form>
      </div>
      {/* messages window */}
      <DashboardMessagesWindow messages={messages} session={session} />

      {/* form to send messages to the current conversation */}
      <form action={handleMessageSendSubmit} className="w-full ">
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
