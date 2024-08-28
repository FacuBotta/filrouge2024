"use client";
import React, { useState, useRef, useEffect, FC } from "react";
import CalendarImage from "@/public/images/homeSliderImages/CalendarImage";
import EventsImage from "@/public/images/homeSliderImages/EventsImage";
import MessagesImage from "@/public/images/homeSliderImages/MessagesImage";
import ReviewsImage from "@/public/images/homeSliderImages/ReviewsImage";
import SecurityImage from "@/public/images/homeSliderImages/SecurityImage";
import { MessagesImage2 } from "@/public/images/homeSliderImages/MessagesImage2";

interface Slide {
  id: number;
  title: string;
  content: string;
  color: string;
  image: React.ReactNode
}

const SliderHome: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Système de notation et commentaires",
      content: "Donnez votre avis et notez les événements auxquels vous avez participé. Grâce aux commentaires des autres utilisateurs, choisissez les meilleures rencontres et améliorez continuellement vos événements.",
      color: "bg-light-red",
      image: <ReviewsImage />,
    },
    {
      id: 2,
      title: "Système de Messagerie",
      content: "Communiquez en temps réel avec vos invités via notre système de messagerie intégré. Partagez des informations, répondez aux questions et restez en contact avant, pendant et après l'événement.",
      color: "bg-dark-yellowLight",
      image: <MessagesImage />,
    },
    {
      id: 3,
      title: "Synchronisation avec Google et son calendrier",
      content: "Synchronisez votre compte Google et intégrez vos événements directement dans votre calendrier. Restez toujours organisé et ne manquez jamais un événement important.",
      color: "bg-light-ciel",
      image: <CalendarImage />,
    },
    {
      id: 4,
      title: "Création d'événements",
      content: "Créez facilement vos événements en quelques clics. Invitez vos amis, choisissez l'heure et le lieu, et gérez tous les détails en un seul endroit.",
      color: "bg-dark-greenLight",
      image: <EventsImage />,
    },
    {
      id: 5,
      title: "Signalement des utilisateurs",
      content: "Assurez la sécurité de la communauté en signalant les comportements inappropriés. Notre système de signalement permet de maintenir un environnement sécurisé et respectueux pour tous les utilisateurs.",
      color: "bg-dark-yellowLight",
      image: <SecurityImage />,
    },
  ];

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Cambia de slide cada 3 segundos
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.scrollWidth / slides.length;
      slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  /* useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, []); */

  return (
    <div
      className="w-full max-w-[1000px] mx-auto h-[70vh] sm:h-[40vh] lg:h-[50vh]"
      // onMouseEnter={stopAutoSlide} // Detener el auto-slide cuando el usuario interactúa
      // onMouseLeave={startAutoSlide} // Reiniciar el auto-slide cuando el usuario deja de interactuar
    >
      <div className="relative overflow-hidden w-full h-full">
        <div
          id="slider-category"
          className="flex h-full w-full overflow-x-scroll overflow-y-hidden no-scrollbar snap-x snap-mandatory"
          ref={sliderRef}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`w-full h-full flex justify-center items-start sm:border-b border-dark-bg dark:border-dark-greenLight snap-center`}
              style={{ minWidth: "100%" }}
            >
              <article className="text-wrap text-center sm:text-left w-full sm:max-w-[50%] mt-5 sm:ml-5">
                <h2 className="text-xl sm:text-3xl font-bold mb-5">{slide.title}</h2>
                <p className="sm:px-5">{slide.content}</p>
              </article>
              <div className="hidden sm:flex items-end h-full w-[50%]">
                {slide.image}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden sm:flex justify-center items-center gap-5 mt-2 h-5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            className={`bg-black size-3 lg:size-2 flex rounded-full ${currentIndex == index ? 'bg-light-red dark:bg-dark-greenLight scale-125' : 'bg-black'}`}
            aria-label={`Slide ${slide.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderHome;
