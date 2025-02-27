import { UserDataService } from '@/types/servicesTypes/types';
import { BasicEventData, UserData } from '@/types/types';

export const mapUserData = (user: UserDataService): UserData => {
  const totalComments = user.CommentsReceived.length;
  const totalScore = user.CommentsReceived.reduce(
    (acc, comment) => acc + (comment.rating?.score || 0),
    0
  );

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    image: user.image,
    description: user.description,
    eventsCreated: user.EventsCreated,
    eventsJoined: user.EventsJoined.map(
      ({ event }) =>
        ({
          ...event,
          creator: event.user,
        }) as BasicEventData
    ),
    tasks: user.Tasks,
    comments: user.CommentsReceived,
    score: totalComments > 0 ? totalScore / totalComments : 0,
  };
};
