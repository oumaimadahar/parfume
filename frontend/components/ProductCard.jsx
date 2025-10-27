"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, user }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà liké le produit (si tu charges la liste des likes plus tard)
  }, []);

  const handleLike = async () => {
    if (!user) {
      // 🔒 Si pas connecté, redirige vers login
      localStorage.setItem("redirectAfterLogin", `/product/${product._id}`);
      router.push("/auth");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:7007/api/likes/${product._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Toggle local
      setLiked(!liked);
    } catch (err) {
      console.error("Erreur lors du like:", err);
    }
  };

  return (
    <div className="relative group">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-lg w-full h-64 object-cover cursor-pointer"
        onClick={() => router.push(`/product/${product._id}`)}
      />

      {/* ❤️ Bouton Like */}
      <button
        onClick={handleLike}
        className="absolute top-3 right-3 bg-white/70 hover:bg-white p-2 rounded-full"
      >
        <Heart
          size={22}
          className={`transition-colors ${
            liked ? "text-red-500 fill-red-500" : "text-gray-400"
          }`}
        />
      </button>

      <div className="mt-3">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
  );
}
