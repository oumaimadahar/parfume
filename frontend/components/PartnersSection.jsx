"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const partners = [
  { id: 1, image: "/images/partner1.png", name: "Partner 1" },
  { id: 2, image: "/images/partner2.png", name: "Partner 2" },
  { id: 3, image: "/images/partner3.png", name: "Partner 3" },
  { id: 4, image: "/images/partner4.png", name: "Partner 4" },
  { id: 5, image: "/images/partner5.png", name: "Partner 5" },
];

export default function PartnersSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-10 px-6">
      <div className="text-center mb-12">
        <p className="text-sm text-gray-400 tracking-widest">OUR PARTNERS</p>
        <h2 className="text-4xl font-bold text-[#e3ac28] mt-2">Trusted by</h2>
      </div>

      {/* Grille responsive avec images plus petites */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center">
        {partners.map((partner) => (
          <motion.div
            key={partner.id}
            className="flex items-center justify-center cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHovered(partner.id)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: partner.id * 0.1 }}
          >
            <img
              src={partner.image}
              alt={partner.name}
              className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain transition-all duration-300 ${
                hovered && hovered !== partner.id ? "grayscale opacity-50" : ""
              }`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
