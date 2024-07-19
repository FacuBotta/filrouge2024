
import Button from "@/components/Button";
import HomeImage from "../../public/images/HomeImage";
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex items-center justify-center w-full min-h-screen bg-light-ciel dark:bg-dark-bg">
        <div className="h-full w-[90%] flex flex-col items-center lg:!items-start gap-4 mb-[100px] text-dark-bg dark:text-dark-grey lg:mr-5 sm:w-[70%] lg:w-[40%] max-w-[500px] ">
          <h1 className="text-[60px] sm:text-[80px] font-bold text-nowrap dark:text-dark-greenLight">EventHub</h1>
          <p><strong>EventHub</strong> est votre solution tout-en-un pour la gestion d&apos;événements et de RDV. Simplifiez l&apos;organisation de vos activités avec notre interface moderne et intuitive. Avec EventHub, vous pouvez facilement synchroniser vos événements avec Google Calendar, gérer vos tâches, et communiquer efficacement avec vos collègues. Que vous planifiez un petit rassemblement ou un grand événement, EventHub vous offre les outils nécessaires pour réussir !</p>
          <div className="flex gap-8">
            <Button><Link href="/signin">SignIn!</Link></Button>
            {/* <Button><Link href="/signup">SignUp!</Link></Button> */}
          </div>
        </div>
        <HomeImage className="hidden lg:block w-[500px]" theme="dark"/>
      </section>
    </main>
  );
}
