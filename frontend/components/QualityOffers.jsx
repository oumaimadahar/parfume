"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function QualityOffers() {
    return (
        <section className="w-full bg-white mt-10 border-t border-gray-200 overflow-hidden">
            {/* --- SECTION GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* =============== PARTIE 1 =============== */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative flex flex-col justify-center p-10 lg:p-20"
                >
                    <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4 z-10">
                        Quality Offers
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 z-10 max-w-md">
                        Where achievement takes the spotlight, we can tailor our skills to
                        meet your needs.
                    </p>
                    <Link href="/shop/gift-sets">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#e3ac28] text-white font-semibold px-6 py-3 rounded-md uppercase tracking-wide hover:bg-yellow-500 transition"
                        >
                            Find Out More
                        </motion.button>
                    </Link>
                </motion.div>

                {/* =============== PARTIE 2 =============== */}
                <div className="grid grid-cols-2">
                    {/* Vidéo simple sans fond ni bord */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="relative w-full h-[400px] overflow-hidden rounded-lg" // Ajustez ici la hauteur
                    >
                        <motion.video
                            src="/videos/offre1.mp4" // 🔹 remplace par le bon chemin
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.div>

                    {/* Image normale */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden"
                    >
                        <Image
                            src="/images/offre.png"
                            alt="perfume bottle"
                            fill
                            className="object-cover transition-transform duration-500 rounded-lg"
                        />
                    </motion.div>
                </div>
            </div>


            {/* --- LIGNE INFÉRIEURE --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 ">
                {/* =============== PARTIE 3 =============== */}
                <div className="grid grid-cols-2 gap-0">
                    {/* Image normale */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-[300px] overflow-hidden"
                    >
                        <Image
                            src="/images/woman with white flower.jpg"
                            alt="woman white flower"
                            fill
                            className="object-cover transition-transform duration-500 rounded-lg"
                        />
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-[300px] overflow-hidden"
                    >
                        <Image
                            src="/images/offre3.jpg"
                            alt="woman white flower"
                            fill
                            className="object-cover transition-transform duration-500 rounded-lg"
                        />
                    </motion.div>
                </div>

                {/* =============== PARTIE 4 – background jaune avec texte =============== */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                    className="relative bg-[#e3ac28] flex items-center justify-center p-10 h-[300px] overflow-hidden rounded-lg hover:bg-yellow-500 transition"
                >

                    <h2 className="text-4xl lg:text-5xl font-serif text-white mb-4 text-center">
                        Luxury – Elegance and Modern Fragrance
                    </h2>


                </motion.div>
            </div>


            {/* Responsive ajustement */}
            <style jsx>{`
        @media (max-width: 1024px) {
          section {
            text-align: center;
          }
        }
      `}</style>
        </section>
    );
}