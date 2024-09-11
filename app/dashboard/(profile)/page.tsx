import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { selectUserTasks } from '@/actions/TasksServerActions/selectUserTasks';
import TasksProfile from '@/components/ui/dashboard/TasksProfile';
import IconWrapper from '@/components/ui/IconWrapper';
import { Tasks } from '@prisma/client';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const DashboardPage: React.FC = async () => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  const { id, name, username, email, image } = userAuthenticated;

  const userTasks: Tasks[] = await selectUserTasks(id as string);

  // console.log('userAuthenticated from dashboard profile page', userTasks);

  return (
    <section className="no-scrollbar max-h-[95%] px-2 w-full max-w-[1300px] mx-auto flex flex-col sm:!flex-row items-start justify-start gap-5 overflow-y-scroll scroll-smooth sm:divide-x my-auto">
      <div className="w-full sm:w-[40%] h-full flex-col flex items-center justify-center pt-5 gap-5">
        <div className="relative">
          <IconWrapper
            type="edit"
            strokeWidth={2}
            className="hover:scale-110 hover:dark:text-dark-greenLight transition-all ease-in-out absolute bottom-2 right-[-10px]"
          />
          <Image
            src={image as string}
            alt="user avatar"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <h1 className="font-bold text-2xl">{name ? name : email}</h1>
        {/* TODO: add the points to the user profile */}
        <h3>puntuacion</h3>
        {/* TODO: add the description to the user profile */}
        <h3 className="font-bold text-2xl">Ma description</h3>
        <p className="text-balance text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos?
        </p>
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
      </div>
    </section>
  );
};

export default DashboardPage;
