
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import HeaderTop from "@/components/HeaderTop";
import Navbar from "@/components/NavBar";
import Footer from "@/components/footer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // ✅ Pour éviter SSR

  useEffect(() => {
    setMounted(true); // Le composant est monté côté client
  }, []);

  useEffect(() => {
    if (!mounted) return; // Ne rien faire tant que le composant n'est pas monté
    if (!query) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Utiliser une URL publique pour l'API ou un proxy
        const res = await axios.get("http://localhost:7007/api/products"); 
        const allProducts = res.data.products || [];

        const filtered = allProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filtered);
      } catch (error) {
        console.error("❌ Erreur lors de la recherche :", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [mounted, query]);

  return (
    <>
      <HeaderTop />
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Results for: <span className="text-[#e3ac28]">{query}</span>
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucun produit trouvé pour "<span className="font-semibold">{query}</span>" 😔
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <Link href={`/products/${product._id}`}>
                  <div className="relative w-full h-64">
                    <Image
                      src={product.imageUrl || "/images/default.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold">{product.name}</h2>

                  {product.discount > 0 ? (
                    <div className="mt-2">
                      <p className="text-gray-400 line-through">
                        {product.price.toFixed(2)} $
                      </p>
                      <p className="text-[#e3ac28] font-bold">
                        {(product.price * (1 - product.discount / 100)).toFixed(2)} $
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 text-gray-700 font-semibold">
                      {product.price.toFixed(2)} $
                    </p>
                  )}

                  <Link
                    href={`/products/${product._id}`}
                    className="mt-4 inline-block bg-[#e3ac28] text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
