"use client";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slidesData = [
  {
    id: 1,
    background: "/images/pr-03.jpeg",
    title: "Welcome to Our Site",
    description: "Discover amazing products and experiences.",
    buttonText: "Learn More",
    link: "/about", // 🔗 lien ajouté
  },
  {
    id: 2,
    background: "/images/pr-01.jpeg",
    title: "New Collection",
    description: "Check out our latest trends and offers.",
    buttonText: "Shop Now",
    link: "#NewProducts",
  },
  {
    id: 3,
    background: "/images/pr-02.jpeg",
    title: "Join Us Today",
    description: "Sign up and get exclusive benefits.",
    buttonText: "Sign Up",
    link: "/auth", // 🔗 lien ajouté
  },
];

// 🔹 Flèches
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 z-10"
  >
    <ChevronRight size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 z-10"
  >
    <ChevronLeft size={24} />
  </button>
);

const BackgroundSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <div key={slide.id} className="relative w-full h-[500px]">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `url(${slide.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.div
                className="text-center text-white max-w-2xl p-4 space-y-4"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                <motion.h2
                  className="text-4xl md:text-5xl font-bold"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-[17px] md:text-xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.6 } }}
                >
                  <Link href={slide.link} onMouseDown={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#e3ac28] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                    >
                      {slide.buttonText}
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BackgroundSlider;
