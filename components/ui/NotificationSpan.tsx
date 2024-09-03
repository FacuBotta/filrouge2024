'use client';

export const NotificationSpan = ({
  notifications,
}: {
  notifications: string[] | null;
}) => {
  if (notifications?.length === 0) {
    return null;
  }
  return (
    <span className="bg-red-500 text-white rounded-full px-2 mx-1 py-1 text-xs relative bottom-3">
      {notifications?.length}
    </span>
  );
};
