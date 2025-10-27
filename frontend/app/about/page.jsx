"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/NavBar";
import HeaderTop from "@/components/HeaderTop";
import AboutStatsSection from "@/components/AboutStatsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import LuxuryFragranceSection from "@/components/LuxuryFragranceSection";
import Footer from '@/components/footer';

export default function AboutPage() {
    return (
        <div className="relative min-h-screen">
            {/* ✅ Header en haut */}
            <HeaderTop />
            {/* ✅ Navbar en haut */}
            <Navbar />

            {/* ✅ Section principale */}
            <section
                className="relative h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/about-bg.jpg')", // 🔹 Mets ton image ici
                }}
            >
                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* ✅ Contenu centré */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative text-center text-white px-6"
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        The Essence of <span className="text-[#e3ac28]">Luxury</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Our story begins with passion, craftsmanship, and a timeless desire to create beauty that transcends trends.
                    </motion.p>

                    <motion.button
                        className="bg-[#e3ac28] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.6 } }}
                        onClick={() =>
                            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
                        }
                    >
                        Explore Our Journey
                    </motion.button>
                </motion.div>
            </section>
            {/* ✅ Section Statistiques */}
            <AboutStatsSection />
            {/* Nouvelle Section Why Choose Us */}
            <WhyChooseUsSection />
            {/* Section Team */}
            <TeamSection />
            {/* Section Partners */}
            <PartnersSection/>
            {/* Section Luxury Fragrance */}
            <LuxuryFragranceSection/>
            {/* Footer */}
             <Footer/>
        </div>
       
        
    );
}
