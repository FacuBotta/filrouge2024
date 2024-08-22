import FooterImage from "@/public/images/FooterImage";
import Link from "next/link";

export default function Footer() {
  // TODO: update links
  return (
    <footer className="flex flex-col min-w-full items-center p-4 lg:py-24 bg-dark-grey dark:bg-dark-green">
      <div className="w-full flex gap-5 flex-wrap items-start justify-center sm:items-start">
        <div className="w-full max-w-[550px] lg:w-[60%] flex justify-center">
          <FooterImage/>
        </div>
        <div className="flex flex-wrap gap-5 text-center justify-center sm:text-left dark:text-dark-yellowLight">
          <div className="flex flex-col items-left">
            {/* Styles coming from global.css */}
            <h1 className="text-2xl font-bold mb-2 underline">Contact</h1>
            <Link href="/contact">Besoin d&lsquo;aide ?</Link>
            <Link href="/contact">Declarer un problème</Link>
            <Link href="/contact">Dénoncer un utilisateur</Link>
          </div>
          <div className="flex flex-col items-left">
            <h1 className="text-2xl font-bold mb-2 underline">À propos</h1>
            <Link href="/contact">Mentions légales</Link>
            <Link href="/contact">Ce site</Link>
            <Link href="/contact">FAQ</Link>
          </div>
          <div className="flex flex-col items-left">
            <h1 className="text-2xl font-bold mb-2 underline">Compte</h1>
            <Link href="/contact">Supprimer mon compte</Link>
            <Link href="/contact">Récupérer mot de passe</Link>
            <Link href="/contact">Log-In/Sig-Up</Link>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] my-5 bg-dark-bg dark:bg-light-yellow"></div>
      <div>
        Made with ❤️ by <a href="https://github.com/FacuBotta" target="_blank" rel="noreferrer">Facu Botta</a>
      </div>
    </footer>
  )
}