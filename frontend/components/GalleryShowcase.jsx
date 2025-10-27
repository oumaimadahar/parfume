'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: '/images/womenshopping.jpg', category: 'floral', alt: 'Celestial Bloom' },
  { src: '/images/floral.jpg', category: 'floral', alt: 'Fantasy Perfume Visual' },
  { src: '/images/happywomen.jpeg', category: 'floral', alt: 'Floral Symphony' },
  { src: '/images/beautifulhappy.jpg', category: 'fresh', alt: 'Timeless Classics' },
  { src: '/images/bottles.jpg', category: 'fresh', alt: 'Mystical Oud' },
  { src: '/images/fresh.jpeg', category: 'fresh', alt: 'Perfume bottle in nature' },
];

const GalleryShowcase = () => {
  const [filter, setFilter] = useState('all');

  const filteredImages =
    filter === 'all' ? images : images.filter(image => image.category === filter);

  return (
    <div className="px-8 py-12">
      {/* Titre et description centrés */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Memories in Every Bottle</h1>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-center">
        Immerse yourself in the beauty and creativity of our gallery and step into a world of imagination and beauty.
      </p>

      {/* Boutons de filtre */}
      <div className="mb-8 flex gap-4 justify-center">
        {['all', 'floral', 'fresh'].map(cat => (
          <button
            key={cat}
            className="text-black font-semibold px-3 py-1 "
            onClick={() => setFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Galerie */}
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg w-96 h-96"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Image */}
            <motion.img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />

            {/* Overlay jaune au hover */}
            <motion.div
              className="absolute inset-0 bg-[#e3ac28] flex items-center justify-center opacity-0 rounded-lg"
              whileHover={{ opacity: 1 }}
              onHoverStart={() => { /* Enlève l'image au survol */ }}
              onHoverEnd={() => { /* Remet l'image au départ */ }}
            >
              <h2 className="text-white font-bold text-[20px]">{image.alt}</h2>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryShowcase;