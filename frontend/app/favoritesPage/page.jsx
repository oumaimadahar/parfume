
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiHeart, FiHome } from "react-icons/fi";
import { useRouter } from "next/navigation";
import HeaderTop from "@/components/HeaderTop";
import Navbar from "@/components/NavBar";
import Footer from '@/components/footer';

const FavoritesPage = () => {
  const router = useRouter();
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7007/api/likes";
const fetchLikes = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/auth?redirect=/favorites");
    return;
  }

  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setLikes(res.data.likes);

    const likedIds = res.data.likes
      .filter(like => like.product)
      .map(like => like.product._id);

    localStorage.setItem("likedProducts", JSON.stringify(likedIds));
    window.dispatchEvent(new Event("likesUpdated"));
  } catch (err) {
    console.error(err);

    // ✅ Vérifie si l’erreur vient d’un token expiré
    if (err.response?.status === 401 && err.response?.data?.message?.includes("expired")) {
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/auth?redirect=/favorites");
      return;
    }

    alert("Erreur lors de la récupération des likes");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchLikes();
  }, []);

  const handleToggleLike = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth?redirect=/favorites");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/${productId}`, {}, { headers: { Authorization: `Bearer ${token}` } });

      setLikes(prev => prev.filter(like => like.product?._id !== productId));

      const likedIds = likes
        .filter(like => like.product?._id && like.product._id !== productId)
        .map(like => like.product._id);
      localStorage.setItem("likedProducts", JSON.stringify(likedIds));
      window.dispatchEvent(new Event("likesUpdated"));
    } catch (err) {
      console.error("Erreur lors de la suppression du like :", err);
      alert("Impossible de supprimer ce like pour le moment.");
    }
  };

  return (
    <div className="min-h-screen">
      <HeaderTop />
      <Navbar />

      {/* Barre titre + bouton */}
      <div className="flex items-center justify-between mt-10 mb-6 px-6 md:px-16">
        <h1 className="text-3xl font-bold text-gray-800">Mes Likes</h1>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-4 py-2 bg-[#e3ac28] text-white rounded-lg hover:bg-yellow-500 transition"
        >
          <FiHome size={20} />
          Back to Home
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center mt-10">Chargement...</p>}

      {/* Si liste vide */}
      {!loading && likes.length === 0 && (
        <p className="text-center mt-10 text-gray-600">Vous n’avez aucun produit liké.</p>
      )}

      {/* Grille produits likés */}
      {!loading && likes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-16 py-8">
          {likes.map((like) => {
            if (!like.product) return null;

            const hasDiscount = like.product.discount > 0;
            const discountedPrice = hasDiscount
              ? (like.product.price * (100 - like.product.discount)) / 100
              : like.product.price;

            return (
              <div key={like._id} className="bg-white rounded-lg shadow p-4 relative group cursor-pointer">
                <img
                  src={like.product.imageUrl || like.product.image}
                  alt={like.product.name}
                  className="rounded-lg w-full h-64 object-cover transition duration-500 group-hover:opacity-0"
                  onClick={() => router.push(`/products/${like.product._id}`)}
                />

                {like.product.hoverImage && (
                  <img
                    src={like.product.hoverImage}
                    alt={like.product.name}
                    className="rounded-lg w-full h-64 object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-500"
                    onClick={() => router.push(`/products/${like.product._id}`)}
                  />
                )}

                <button
                  onClick={() => handleToggleLike(like.product._id)}
                  className="absolute top-4 right-4 p-2 rounded-full border border-gray-300 hover:bg-red-500 hover:text-white transition"
                >
                  <FiHeart className="text-red-600" />
                </button>

                <h3 className="mt-4 text-lg font-medium">{like.product.name}</h3>

                <div className="flex gap-2 mt-2">
                  {hasDiscount && <span className="line-through text-gray-400">${like.product.price}</span>}
                  <span className="font-semibold">${discountedPrice}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default FavoritesPage;
