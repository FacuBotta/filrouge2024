import HomeImage from "../public/images/HomeImage";
import Link from "next/link";
import { checkIsAuthenticated } from "@/actions/authServerActions/checkIsAuthenticated";
import CardCategory from "@/components/ui/CardCategory";
import SportImage from "@/public/images/categoryImages/SportImage";
import EducationImage from "@/public/images/categoryImages/EducationImage";
import CityTourImage from "@/public/images/categoryImages/CityTourImage";
import OutDoorImage from "@/public/images/categoryImages/OutDoorImage";
import LanguageImage from "@/public/images/categoryImages/LanguageImage";
import OthersImage from "@/public/images/categoryImages/OthersImage";
import SliderHome from "@/components/ui/SliderHome";

export default async function Home() {
  const isAuthenticated = await checkIsAuthenticated();
  return (
    <main className="flex min-h-screen flex-col select-none">
      <section className="flex items-center justify-center w-full min-h-screen bg-light-ciel dark:bg-dark-bg snap-start ">
        <div className="flex h-full w-[90%] m-auto items-center justify-center text-center lg:!text-start">
          <div className="text-dark-bg dark:text-dark-grey lg:mr-10 sm:w-[70%] lg:w-[40%] max-w-[500px] ">
            <h1 className="text-[60px] mt-[-20px] sm:text-[80px] font-bold text-nowrap dark:text-dark-greenLight">EventHub</h1>
            <p className="text-balance"><strong>EventHub</strong> est votre solution tout-en-un pour la gestion d&apos;événements et de RDV. Simplifiez l&apos;organisation de vos activités avec notre interface moderne et intuitive. Vous pouvez facilement synchroniser vos événements avec Google Calendar, gérer vos tâches, et communiquer avec vos collègues. Que vous planifiez un petit rassemblement ou un grand événement, EventHub vous offre les outils nécessaires pour réussir !</p>
            <div className="flex gap-8 mt-4 justify-center lg:!justify-start">
              {isAuthenticated ? (
                <Link
                  className="inline-flex items-center justify-center px-4 py-1 border-2 border-transparent text-lg rounded-lg bg-light-yellow text-dark-bg font-bold hover:border-dark-bg dark:hover:border-dark-grey"
                  href="/dashboard"
                >
                  Voir le tableau de bord
                </Link>
              ) : (
                <Link
                  className="inline-flex items-center justify-center px-4 py-1 border-2 border-transparent text-lg rounded-lg bg-light-yellow text-dark-bg font-bold hover:border-dark-bg dark:hover:border-dark-grey"
                  href="/login"
                >
                  Commencer maintenant !
                </Link>
              )}
            </div>
          </div>
          <HomeImage className="hidden lg:block w-[500px] h-full"/>
        </div>
      </section>
      <section className="flex flex-col p-5 items-center justify-center w-full min-h-screen bg-light-red dark:bg-dark-bg snap-start scroll-mt-20 sm:scroll-mt-0">
        <h1 className="text-3xl sm:text-6xl font-bold mb-8 dark:text-dark-greenLight">Catégories</h1>
        <div className="my-5 grid grid-cols-2 sm:grid-cols-3 gap-10 w-full max-w-[900px]">
          <CardCategory
            color="bg-light-yellow"
            image={<SportImage/>}
            title="Sport"
          />
          <CardCategory
            color="bg-light-ciel"
            image={<EducationImage/>}
            title="Education"
          />
          <CardCategory
            color="bg-dark-greenLight"
            image={<CityTourImage/>}
            title="City Tours"
          />
          <CardCategory
            color="bg-light-blue"
            image={<OutDoorImage/>}
            title="Air Libre"
          />
          <CardCategory
            color="bg-light-grey"
            image={<LanguageImage/>}
            title="Language"
          />
          <CardCategory
            color="bg-dark-yellowLight"
            image={<OthersImage/>}
            title="Autres"
          />
        </div>
        <Link
          className="inline-flex items-center justify-center px-4 py-1 border-2 border-transparent text-lg rounded-lg bg-light-yellow text-dark-bg font-bold hover:border-dark-bg dark:hover:border-dark-grey"
          href="/Category"
        >
          Voir plus
        </Link>
      </section>
      <section className="flex flex-col px-5 items-center justify-center w-full min-h-screen bg-light-yellow dark:bg-dark-bg snap-start ">
        <h1 className="mb-14 text-3xl sm:text-6xl font-bold dark:text-dark-greenLight">Fonctionnalités</h1>
        <SliderHome/>
      </section>
    </main>
  );
}
