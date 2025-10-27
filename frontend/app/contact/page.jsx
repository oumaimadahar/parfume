"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Clock, Mail, Phone } from "lucide-react";
import Navbar from "@/components/NavBar";
import HeaderTop from "@/components/HeaderTop";
import Link from "next/link";
import Footer from '@/components/footer';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:7007/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name + " " + form.surname,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", surname: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Something went wrong");
      }
    } catch (err) {
      setStatus("Server error, please try again later");
    }
  };

  return (
    <main className="bg-white overflow-x-hidden">
      <HeaderTop />
      <Navbar />

      {/* ===== Section Contact Info ===== */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* PARTIE 1 */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-gray-400 tracking-widest text-sm uppercase">
              YOUR VOICE MATTERS, AND WE'RE HERE TO LISTEN
            </p>
            <h2 className="text-4xl font-bold text-[#e3ac28]">Reach Out and Connect</h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              At Perfume Luxury, your voice matters. We invite you to share your thoughts, questions, or feedback with us.
            </p>
            <Link href="#contact">
              <motion.button
                className="bg-[#e3ac28] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>

          {/* PARTIE 2 */}
          <motion.div
            className="space-y-6 text-gray-700 flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-start gap-4">
              <MapPin className="text-[#e3ac28]" size={24} />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Address :</h3>
                <p>1 Bd de l'Océan, Casablanca 20180</p>
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
                <p>Luxuryperfume@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-[#e3ac28]" size={24} />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Phone :</h3>
                <p>+212 600 123 456</p>
              </div>
            </div>
          </motion.div>

          {/* PARTIE 3 */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.1256805254584!2d-7.709466325473442!3d33.576085942724696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d4a33900f835%3A0xb540923b5bdf10fb!2sMorocco%20Mall!5e0!3m2!1sfr!2sma!4v1760456151856!5m2!1sfr!2sma"
              width="100%"
              height="350"
              style={{ filter: "grayscale(100%) contrast(90%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>



      {/* ===== Section Fragrance Consultation ===== */}
      <section
        id="contact"
        className="w-full py-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("/images/backgroundContact.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 px-6 justify-center items-start">

          {/* LEFT SIDE - Texte + Image */}
          <div className="text-white p-10 flex flex-col justify-between relative max-w-lg mx-auto lg:mx-0">
            {/* Texte en haut */}
            <div className="space-y-4 mb-6">
              <p className="uppercase tracking-widest text-sm text-[#e3ac28]">Captivate your senses</p>
              <h2 className="text-3xl md:text-4xl font-serif text-white">Fragrance Consultation</h2>
              <p className="text-gray-200">
                Our commitment to quality and excellence means that every product has been selected with care and consideration.
              </p>
            </div>

            {/* Image + texte + numéro */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <div className="flex flex-col items-center">
                <div className="w-56 h-80 overflow-hidden rounded-t-full">
                  <img src="/images/femme.jpeg" alt="Femme" className="w-full h-full object-cover" />
                </div>


                {/* Numéro en dessous */}
                <div className="mt-2 bg-[#e3ac28] text-white font-semibold px-6 py-2 rounded-md text-center">
                  +212 600 123 456
                </div>
              </div>

              <div className="flex flex-col justify-start space-y-4">
                <div>
                  <h4 className="text-lg font-semibold">Consultation Service</h4>
                  <p className="text-sm text-gray-200">
                    Every product has been selected with care and consideration.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Customer Support</h4>
                  <p className="text-sm text-gray-200">
                    World of possibilities, a treasure trove of carefully curated products.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Formulaire */}
          <div className="bg-white mt-10 p-4 rounded-lg shadow-xl flex-1 max-w-md mx-auto lg:mx-0">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Reach out to us today</h3>
            <p className="text-sm text-gray-600 mb-6 text-justify">
              Have questions, feedback, or need assistance? Don’t hesitate to reach out to us, your communication is valuable to us
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={form.surname}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 w-full"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 w-full"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 w-full"
                required
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#e3ac28] text-white font-semibold py-3 w-full rounded-md tracking-wide uppercase hover:bg-yellow-500"
              >
                Send
              </motion.button>

              {status && <p className="text-center text-sm text-gray-700 mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </section>
      <Footer/>
      


    </main>
  );
}
