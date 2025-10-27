"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* ---- PARTIE 1 : Texte ---- */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 tracking-widest text-sm uppercase">
            YOUR VOICE MATTERS, AND WE'RE HERE TO LISTEN
          </p>

          <h2 className="text-4xl font-bold text-[#e3ac28]">
            Reach Out and Connect
          </h2>

          <p className="text-gray-700 leading-relaxed">
            We value your feedback and inquiries. Please feel free to get in touch
            with us using the contact information below or by filling out the
            contact form. We look forward to hearing from you and will respond as
            soon as possible. Your communication is important to us, and we are
            committed to providing you with the best service and support.
          </p>

          <Link href="/contact-form">
            <motion.button
              className="bg-[#e3ac28] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* ---- PARTIE 2 : Informations de contact ---- */}
        <motion.div
          className="space-y-6 text-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <MapPin className="text-[#e3ac28]" size={24} />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Address :</h3>
              <p>23 Ocean Av. Miami, FL 33101</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="text-[#e3ac28]" size={24} />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Timetables :</h3>
              <p>09:00 am – 11:00 pm</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-[#e3ac28]" size={24} />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Email :</h3>
              <p>info@perfume.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-[#e3ac28]" size={24} />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Phone :</h3>
              <p>+1 834 268 302</p>
            </div>
          </div>
        </motion.div>

        {/* ---- PARTIE 3 : Google Maps ---- */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.611882923305!2d-80.19179068496944!3d25.761679983626537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b7e59b4b6e93%3A0xc0b7b3c258fa99f!2sMiami%2C%20FL%2033101!5e0!3m2!1sen!2sus!4v1683650814467!5m2!1sen!2sus"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
