"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export default function AdminProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    discount: "",
    isNew: false,
  });

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:7007/api/products/${id}`);
      if (!res.ok) throw new Error(`Product not found (${res.status})`);
      const data = await res.json();
      setProduct(data.product);
      setFormData({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price || "",
        stock: data.product.stock || "",
        category: data.product.category || "",
        discount: data.product.discount || "",
        isNew: data.product.isNew || false,
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:7007/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Error updating product (${res.status})`);
      const data = await res.json();
      alert("Product updated successfully ✅");
      setProduct(data.product);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading)
    return <p className="p-6 text-gray-500 text-center">Loading product...</p>;
  if (error)
    return (
      <p className="p-6 text-red-500 text-center font-medium">Error: {error}</p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="relative w-full md:w-1/3 h-64 rounded-lg overflow-hidden shadow-sm">
          <Image
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info Form */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Admin - {product.name}
          </h1>

          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-inner"
          >
            <label className="flex flex-col">
              Name
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                required
              />
            </label>

            <label className="flex flex-col">
              Description
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                required
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                Price
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                  required
                />
              </label>

              <label className="flex flex-col">
                Stock
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                  required
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                Category
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                />
              </label>

              <label className="flex flex-col">
                Discount (%)
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount: Number(e.target.value),
                    })
                  }
                  className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) =>
                  setFormData({ ...formData, isNew: e.target.checked })
                }
                className="w-4 h-4"
              />
              New Product
            </label>

            <button
              type="submit"
              className="bg-[#e3ac28] text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
