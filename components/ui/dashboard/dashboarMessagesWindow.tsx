interface messagesProps {
  id: string;
  senderId: string;
  conversationId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function DashboardMessagesWindow(
  conversations: messagesProps[]
) {
  return (
    <div>
      {/* {conversations.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))} */}
    </div>
  );
}
