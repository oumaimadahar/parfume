"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { motion } from "framer-motion";
import { Edit, Trash2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminNewProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // 🔹 Charger uniquement les produits "isNew: true"
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const res = await axiosInstance.get("/api/products");
        const allProducts = res.data.products || [];
        const newOnes = allProducts.filter((p) => p.isNew === true);
        setProducts(newOnes);
      } catch (err) {
        console.error("❌ Error fetching new products:", err);
      }
    };
    fetchNewProducts();
  }, []);

  // 🔹 Supprimer un produit
  const handleDelete = async (id) => {
    if (!confirm("⚠️ Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("✅ Product deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  // 🔹 Rediriger vers la page d’édition
  const handleEdit = (id) => {
    router.push(`/admin/products/edit/${id}`);
  };

  return (
    <ProtectedRoute role="admin">
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-[#e3ac28] mb-6 flex items-center gap-2">
          <Star className="text-[#e3ac28]" /> New Products
        </h1>

        {/* ✅ Version Desktop : tableau */}
        <div className="hidden md:block bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No new products found.
            </p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Stock</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border"
                  >
                    <td className="border px-4 py-2 font-medium">
                      {product.name}
                    </td>
                    <td className="border px-4 py-2">${product.price}</td>
                    <td className="border px-4 py-2">{product.stock}</td>
                    <td className="border px-4 py-2">{product.category || "-"}</td>
                    <td className="border px-4 py-2 max-w-[200px] truncate">
                      {product.description || "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 flex items-center gap-1"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ✅ Version Mobile : cartes */}
        <div className="md:hidden flex flex-col gap-4">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No new products found.
            </p>
          ) : (
            products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md p-4"
              >
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                  <Star className="text-[#e3ac28]" size={16} /> {product.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Price:</span> ${product.price}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Stock:</span> {product.stock}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category || "-"}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description || "-"}
                </p>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
