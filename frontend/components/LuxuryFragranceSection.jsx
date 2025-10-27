"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LuxuryFragranceSection() {
  return (
    <section className="py-10 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Partie gauche : texte */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-2 tracking-widest uppercase">
            Enchanted Fragrance
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#e3ac28] mb-4 leading-tight">
            Shop In Our Store
          </h2>

          <p className=" text-justify text-gray-700 mb-6 leading-relaxed text-base md:text-lg">
            Discover the art of sophistication with Parfume Luxury — where every fragrance tells a story of grace, passion, and timeless allure.
            Explore our exclusive collection crafted to awaken the senses and embody pure elegance in every drop.
          </p>

          <Link href="/shop/women">
            <motion.button
              className="bg-[#e3ac28] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>

        {/* Partie droite : image */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/images/fragrance-luxury.png"
            alt="Luxury Fragrance"
            className="w-full h-auto max-h-[450px] object-cover rounded-2xl shadow-xl" // Enlever hover:scale-105 ici
          />
        </motion.div>
      </div>
    </section>
  );
}