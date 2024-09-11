import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { selectUserTasks } from '@/actions/TasksServerActions/selectUserTasks';
import TasksProfile from '@/components/ui/dashboard/TasksProfile';
import IconWrapper from '@/components/ui/IconWrapper';
import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';
import { Tasks } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const DashboardPage: React.FC = async () => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  const { id, description, username, email, image } = userAuthenticated;

  const userTasks: Tasks[] = await selectUserTasks(id as string);

  // console.log('userAuthenticated from dashboard profile page', userTasks);

  return (
    <section className="no-scrollbar max-h-[95%] px-2 w-full max-w-[1300px] mx-auto flex flex-col sm:!flex-row items-start justify-start gap-5 overflow-y-scroll scroll-smooth divide-y sm:divide-y-0 sm:divide-x my-auto">
      <div className="w-full sm:w-[40%] h-full flex-col flex items-center justify-center pt-5 gap-2">
        <div className="relative">
          <Link href="/dashboard/edit-profile">
            <IconWrapper
              type="edit"
              strokeWidth={2}
              className="hover:scale-110 hover:dark:text-dark-greenLight transition-all ease-in-out absolute bottom-2 right-[-10px]"
            />
          </Link>
          {image ? (
            <Image
              src={image}
              alt="user avatar"
              width={200}
              height={200}
              className="rounded-full border-2 border-dark-bg dark:border-dark-grey"
            />
          ) : (
            <DefaultUserAvatar className="size-full rounded-full " />
          )}
        </div>
        <h1 className="font-bold text-2xl">{username ? username : email}</h1>
        {/* TODO: add the points to the user profile */}
        <div className="flex mb-2">
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow "
          />
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow"
          />
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow"
          />
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow"
          />
          <IconWrapper
            type="star"
            strokeWidth={2}
            className="stroke-black fill-light-yellow"
          />
        </div>
        {/* TODO: add the description to the user profile */}
        <h3 className="font-bold text-2xl">Bio</h3>
        <p className="text-balance text-center mx-auto">{description}</p>
      </div>
      <div className="flex flex-col w-full sm:w-[70%] text-center sm:text-left h-full gap-5 lg:gap-10 pb-10 px-2 sm:px-5 sm:overflow-x-hidden sm:overflow-y-scroll soft-scrollbar">
        <div>
          <h1 className="font-bold text-2xl mb-5">Mes notes</h1>
          <TasksProfile tasks={userTasks} />
        </div>
        <div>
          <h1 className="font-bold text-2xl">Mes événements</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            velit eaque, veniam error molestias nemo tempora suscipit pariatur.
            Provident quas at cum debitis quibusdam consequatur nam repellendus
            natus, voluptate deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            velit eaque, veniam error molestias nemo tempora suscipit pariatur.
            Provident quas at cum debitis quibusdam consequatur nam repellendus
            natus, voluptate deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            velit eaque, veniam error molestias nemo tempora suscipit pariatur.
            Provident quas at cum debitis quibusdam consequatur nam repellendus
            natus, voluptate deserunt!
          </p>
        </div>
        <div>
          <h1 className="font-bold text-2xl">Mes avis</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            velit eaque, veniam error molestias nemo tempora suscipit pariatur.
            Provident quas at cum debitis quibusdam consequatur nam repellendus
            natus, voluptate deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            velit eaque, veniam error molestias nemo tempora suscipit pariatur.
            Provident quas at cum debitis quibusdam consequatur nam repellendus
            natus, voluptate deserunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            velit eaque, veniam error molestias nemo tempora suscipit pariatur.
            Provident quas at cum debitis quibusdam consequatur nam repellendus
            natus, voluptate deserunt!
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
