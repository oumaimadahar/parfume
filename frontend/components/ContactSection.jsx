"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <section className="w-full bg-white grid grid-cols-1 lg:grid-cols-2 mt-20 border-t border-gray-200">
      {/* ======== PARTIE GAUCHE (FORMULAIRE + INFOS) ======== */}
      <div className="p-10 lg:p-16 flex flex-col justify-center">
        <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-2">
          Reach Out and Connect
        </h2>
        <p className="uppercase tracking-[3px] text-gray-700 text-sm mb-8">
          Connecting for Excellence
        </p>

        {/* === INFOS CONTACT === */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-sm">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Address :</p>
            <p className="text-gray-700">Casablanca, Morocco</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Email :</p>
            <p className="text-gray-700">luxuryperfume@gmail.com</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Phone :</p>
            <p className="text-gray-700">+212 600 123 456</p>
          </div>
        </div>

        {/* === FORMULAIRE === */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 w-full focus:outline-none focus:border-[#e3ac28]"
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={form.surname}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-3 w-full focus:outline-none focus:border-[#e3ac28]"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 w-full focus:outline-none focus:border-[#e3ac28]"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 w-full focus:outline-none focus:border-[#e3ac28]"
            required
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="bg-[#e3ac28] text-white font-semibold px-8 w-full py-3 rounded-md uppercase tracking-wide hover:bg-yellow-500 transition"
          >
            Send Message
          </motion.button>

          {status && <p className="mt-2 text-center text-gray-800">{status}</p>}
        </form>
      </div>

      {/* ======== PARTIE DROITE (IMAGE) ======== */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/images/avatar-01.jpg"
          alt="Luxury contact"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
