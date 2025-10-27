
"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import HeaderTop from '@/components/HeaderTop';
import Navbar from '@/components/NavBar';
import Footer from '@/components/footer';

export default function NotFound() {
  return (
    <>
    <HeaderTop/>
    <Navbar/>
      <section className="min-h-screen flex items-center justify-center bg-white font-[Arvo] px-4 py-1">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">

          {/* Partie gauche - Texte */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-7xl md:text-8xl font-bold text-gray-800 mb-4">
              404
            </h1>
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">
              Looks like you're lost
            </h3>
            <p className="text-gray-600 mb-6">
              The page you’re looking for is not available!
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-[#e3ac28] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              <FiArrowLeft size={20} />
              <span className="ml-2">Back Home</span>
            </Link>
          </div>

          {/* Partie droite - GIF agrandi */}
          <div className="flex-1 w-full max-w-lg md:max-w-xl">
            <img
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
              alt="404 Animation"
              className="w-full  object-contain h-[400px] md:h-[630px]"
            />
          </div>

        </div>
      </section>
      <Footer/>
    </>
  );
}
