
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function NewProductsSection() {
  const [newProducts, setNewProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7007/api/products/new");
        setNewProducts(response.data.newProducts || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewProducts();
  }, []);

  const sliderImages = [
    { url: "/images/parfume1.jpg", link: "/products/fragrance-collection" },
    { url: "/images/parfume2.jpg", link: "/products/fragrance-collection" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    if (typeof window === "undefined") return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const goToProductDetails = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <div id="NewProducts" className="max-w-6xl mx-auto py-16 px-4">
      {/* TITRE PRINCIPAL */}
      <motion.h2
        className="text-3xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        New Arrivals
      </motion.h2>

      <div className="lg:flex  lg:gap-8">
        {/* PARTIE GAUCHE SLIDER */}
        <motion.div
          className="lg:w-1/2 relative h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden mb-8 lg:mb-0 lg:sticky lg:top-20 shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {sliderImages.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${slide.url})` }}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}

          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center p-4 z-10">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Fragrance Collection
            </motion.h2>
            <motion.p
              className="text-white text-lg md:text-2xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Setting moment and memories
            </motion.p>

            <motion.button
              className="bg-[#e3ac28] text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
              whileHover={{ scale: 1.1, boxShadow: "0 15px 30px rgba(227, 172, 40, 0.5)", y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              onClick={() => router.push("/about")}
            >
              View More
            </motion.button>
          </div>

          {/* INDICATEURS DE SLIDE */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {sliderImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[#e3ac28] scale-125 shadow-md" : "bg-white/50 hover:bg-white/80"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>

        {/* PARTIE DROITE : PRODUITS */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {newProducts.map((product) => (
            <motion.div
              key={product._id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* 🆕 Badge “NEW” */}
              {product.isNew && (
                <motion.span
                  className="absolute top-3 left-3 bg-[#e3ac28] text-white text-sm font-bold px-3 py-1 rounded-full shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  NEW
                </motion.span>
              )}

              <div
                className="cursor-pointer"
                onClick={() => goToProductDetails(product._id)}
              >
                <img
                  src={product.imageUrl || "/images/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
              </div>

              <p className="text-lg font-bold text-black mb-4">
                {product.price}${" "}
              </p>

              <motion.button
                onClick={() => addToCart(product)}
                className="bg-[#e3ac28] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-500 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
