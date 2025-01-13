import NotFoundImage from '@/public/images/NotFoundImage';
import { Link } from 'next-view-transitions';
export default function NotFound() {
  return (
    <main className="min-h-screen px-3 flex flex-col gap-10 items-center justify-center bg-light-ciel dark:bg-dark-bg">
      <h1 className="text-3xl sm:text-6xl font-bold dark:text-dark-yellow">
        404 - Page Not Found
      </h1>
      <div className="w-full sm:w-[60%] max-w-[600px] flex">
        <NotFoundImage />
      </div>
      <Link href={'/'}>Home</Link>
    </main>
  );
}
