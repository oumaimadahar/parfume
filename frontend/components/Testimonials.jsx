"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Nadia El Idrissi",
    job: "Beauty Influencer",
    message:
      "From the very first spray, I knew it was true luxury. Every detail — from the bottle to the fragrance — tells a story of elegance.",
    photo: "/images/avatar-01.jpg",
  },
  {
    name: "Meryem Boutayeb",
    job: "Content Creator",
    message:
      "Luxury is more than a perfume — it’s an emotion. The notes of vanilla and amber remind me of sweet, warm memories.",
    photo: "/images/avatar-02.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => resetTimeout();
  }, [current]);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex justify-center items-center text-white"
      style={{
        backgroundImage: "url('/images/background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="w-full max-w-4xl overflow-hidden relative z-10 px-4 sm:px-6">
        <motion.div
          className="flex"
          animate={{ x: `-${current * 100}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex flex-col items-center text-center gap-6 px-3"
            >
              {/* Message */}
              <p className="text-base sm:text-lg md:text-xl italic max-w-md sm:max-w-xl md:max-w-2xl leading-relaxed">
                “{t.message}”
              </p>

              {/* Photo + Nom + Rôle */}
              <div className="flex items-center gap-3 sm:gap-4 mt-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {t.name}
                  </h3>
                  <span className="text-sm text-gray-300">{t.job}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Flèches gauche/droite */}
        <button
          className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 hover:bg-white/30 rounded-full p-2 sm:p-3 transition"
          onClick={prevSlide}
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
        <button
          className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 hover:bg-white/30 rounded-full p-2 sm:p-3 transition"
          onClick={nextSlide}
        >
          <ChevronRight size={22} className="text-white" />
        </button>
      </div>
    </div>
  );
}
