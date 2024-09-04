'use client';

export const NotificationSpan = ({
  notifications,
}: {
  notifications: string | number | undefined;
}) => {
  if (!notifications) {
    return null;
  }
  console.log(notifications);
  return (
    <span className="bg-red-500 text-white rounded-full px-2 py-1 mx-1 text-xs relative bottom-3">
      {notifications}
    </span>
  );
};
