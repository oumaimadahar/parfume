"use client";

import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, Save, ArrowLeft, PlusCircle } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    discount: 0,
    isNew: false,
    image: null,
    hoverImage: null, // 🔹 Hover image ajouté
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") setForm({ ...form, [name]: checked });
    else if (type === "file") setForm({ ...form, [name]: files[0] }); // fonctionne pour image et hoverImage
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock || !form.category) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) formData.append(key, form[key]);
    });

    try {
      setLoading(true);
      await axiosInstance.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product added successfully!");
      router.push("/admin/products");
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute role="admin">
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-8">
        {/* Header */}
        <div className="w-full max-w-2xl flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#e3ac28] flex items-center gap-2">
            <PlusCircle size={28} />
            Add New Product
          </h1>
          <button
            onClick={() => router.push("/admin/products")}
            className="flex items-center gap-1 text-sm sm:text-base text-gray-600 hover:text-[#e3ac28] transition"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
        >
          {/* Nom */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e3ac28] outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e3ac28] outline-none"
              placeholder="Write a short description..."
            ></textarea>
          </div>

          {/* Prix et Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e3ac28] outline-none"
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e3ac28] outline-none"
                placeholder="Enter stock quantity"
                required
              />
            </div>
          </div>

          {/* Catégorie et Promotion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e3ac28] outline-none"
                placeholder="Enter category"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#e3ac28] outline-none"
                placeholder="0"
              />
            </div>
          </div>

          {/* Toggle isNew et Upload Images */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
            {/* Toggle Nouveau */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Mark as New:</span>
              <button
                type="button"
                onClick={() => setForm({ ...form, isNew: !form.isNew })}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                  form.isNew ? "bg-[#e3ac28]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                    form.isNew ? "translate-x-6" : ""
                  }`}
                ></span>
              </button>
            </div>

            {/* Upload Images */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image principale */}
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#e3ac28]">
                  <Upload size={18} />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                {form.image && (
                  <p className="text-sm text-gray-500 truncate max-w-[150px]">
                    {form.image.name}
                  </p>
                )}
              </div>

              {/* Hover Image */}
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#e3ac28]">
                  <Upload size={18} />
                  <span>Upload Hover Image</span>
                  <input
                    type="file"
                    name="hoverImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                {form.hoverImage && (
                  <p className="text-sm text-gray-500 truncate max-w-[150px]">
                    {form.hoverImage.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bouton Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-[#e3ac28] text-white py-2 px-6 rounded-lg mt-4 font-semibold hover:bg-[#c99820] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Product"}
          </motion.button>
        </motion.form>
      </div>
    </ProtectedRoute>
  );
}
