"use client";
import { motion } from "framer-motion";


const WhyChooseUsSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 px-6 md:px-20 border-t  border-gray-300">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Partie gauche */}
        <motion.div
          className="flex-1 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <p className="text-gray-500 uppercase text-sm tracking-widest">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e3ac28]">
            Fast, Reliable, and Committed to Your Satisfaction.
          </h2>
          <p className="text-justify text-gray-600">
            Our team consists of highly skilled professionals with extensive training and certifications,
            ensuring top-quality service. We've been committed to excellence since the very beginning.
          </p>
         
        </motion.div>
        {/* Partie droite : vidéo + image */}
        <motion.div
          className="flex-1 grid grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          {/* Vidéo à la place de la première image */}
          <div className="h-60 md:h-80 overflow-hidden rounded-lg">
            <video
              src="/videos/about-video.mp4" // 🔹 Mets le chemin de ta vidéo
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Deuxième image */}
          <div className="h-60 md:h-80 -mt-12 overflow-hidden rounded-lg">
            <img
              src="/images/about-2.jpg"
              alt="About 2"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
