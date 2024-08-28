import React from "react";
import CalendarImage from "@/public/images/homeSliderImages/CalendarImage";
import EventsImage from "@/public/images/homeSliderImages/EventsImage";
import MessagesImage from "@/public/images/homeSliderImages/MessagesImage";
import ReviewsImage from "@/public/images/homeSliderImages/ReviewsImage";
import SecurityImage from "@/public/images/homeSliderImages/SecurityImage";

interface Slide {
  id: number;
  title: string;
  content: string;
  color: string;
  image: JSX.Element;
}

const SlideData = (): Slide[] => {
  return [
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
};

export default SlideData;