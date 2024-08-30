import { MessageForm } from '@/components/forms/messageForm';

const NewMessagePage: React.FC = () => {
  return (
    <div className="min-h-screen w-full p-10 flex flex-col gap-2">
      New Message initial page
      <MessageForm />
    </div>
  );
};

export default NewMessagePage;
