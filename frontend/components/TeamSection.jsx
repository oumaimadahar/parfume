"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Kevin Berke",
    role: "Administrator",
    image: "/images/team4.webp",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Barbara Hamby",
    role: "Labor Assistance",
    image: "/images/team3.webp",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Michael Murray",
    role: "Perfume Expert",
    image: "/images/team2.webp",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Kristopher Bunn",
    role: "Perfume Expert",
    image: "/images/team1.webp",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
];

export default function TeamSection() {
  return (
    <section className="py-10 px-6">
      {/* Titres */}
      <div className="text-center mb-12">
        <p className="text-sm text-gray-400 tracking-widest">OUR TEAM</p>
        <h2 className="text-4xl font-bold text-[#e3ac28] mt-2">
          Meet Our Experts
        </h2>
      </div>

      {/* Grille de membres */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            className="group relative w-full h-96 overflow-hidden rounded-xl shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: member.id * 0.1 }}
          >
            {/* Image en background */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 "
              style={{ backgroundImage: `url(${member.image})` }}
            />

            {/* Overlay pour texte + réseaux */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end items-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {/* Réseaux sociaux */}
              <div className="flex gap-3 mb-2">
                <a href={member.socials.facebook} target="_blank">
                  <Facebook size={20} className="hover:text-yellow-500" />
                </a>
                <a href={member.socials.twitter} target="_blank">
                  <Twitter size={20} className="hover:text-yellow-500" />
                </a>
                <a href={member.socials.linkedin} target="_blank">
                  <Linkedin size={20} className="hover:text-yellow-500" />
                </a>
              </div>

              {/* Nom et rôle */}
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
