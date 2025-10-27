"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { motion } from "framer-motion";
import { Trash2, Edit, Star, Gift, List } from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/api/products");
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

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

  const handleEdit = (id) => {
    router.push(`/admin/products/edit/${id}`);
  };

  return (
    <ProtectedRoute role="admin">
      <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
        {/* Titre avec icône de liste */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e3ac28] mb-6 flex items-center gap-2 justify-center sm:justify-start">
          <List className="text-[#e3ac28]" size={24} />
          Products Management
        </h1>

        {/* VERSION TABLEAU (desktop) */}
        <div className="hidden sm:block bg-white shadow-xl rounded-2xl p-4 sm:p-6 overflow-x-auto">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No products found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Stock</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">New</th>
                  <th className="border px-4 py-2">Discount</th>
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
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">${product.price}</td>
                    <td className="border px-4 py-2">{product.stock}</td>
                    <td className="border px-4 py-2">{product.category || "-"}</td>
                    <td className="border px-4 py-2 text-center">
                      {product.isNew ? <Star className="text-gray-400 mx-auto" /> : "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {product.discount > 0 ? <Gift className="text-gray-400 mx-auto" /> : "-"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
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

        {/* VERSION MOBILE (cards) */}
        <div className="sm:hidden flex flex-col gap-4">
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No products found.</p>
          ) : (
            products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md p-4"
              >
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600">
                  Price: <span className="font-medium">${product.price}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Stock: <span className="font-medium">{product.stock}</span>
                </p>
                <p className="text-sm text-gray-600">Category: {product.category || "-"}</p>
                <div className="flex items-center gap-2 mt-2">
                  {product.isNew && <Star className="text-gray-400" size={18} />}
                  {product.discount > 0 && <Gift className="text-gray-400" size={18} />}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-yellow-500"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-red-600"
                  >
                    <Trash2 size={14} /> Delete
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
