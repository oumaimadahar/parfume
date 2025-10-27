
"use client";
import Link from "next/link";

export default function CategoriesSection() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Our Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Femme */}
        <Link href="/shop/women" className="flex flex-col items-center">
          <div className="w-56 h-80 overflow-hidden rounded-t-full">
            <img
              src="/images/femme.jpeg"
              alt="Femme"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-700">Women</h3>
        </Link>

        {/* Homme */}
        <Link href="/shop/man" className="flex flex-col items-center">
          <div className="w-56 h-80 overflow-hidden rounded-t-full">
            <img
              src="/images/homme.jpg"
              alt="Homme"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-700">Man</h3>
        </Link>

        {/* Bakhoor */}
        <Link href="/shop/bakhoor" className="flex flex-col items-center">
          <div className="w-56 h-80 overflow-hidden rounded-t-full">
            <video
              src="/videos/Backoor.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-700">Bakhoor</h3>
        </Link>
      </div>
    </div>
  );
}
