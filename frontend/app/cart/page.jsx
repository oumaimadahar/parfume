
"use client";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  // Charger le panier au démarrage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Mettre à jour le panier dans localStorage et notifier la Navbar
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Modifier la quantité d’un produit
  const handleQuantityChange = (id, type) => {
    const updatedCart = cart.map(item => {
      if (item._id === id) {
        const newQty = type === "increase" ? (item.quantity || 1) + 1 : Math.max(1, (item.quantity || 1) - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  // Supprimer un produit du panier
  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    updateCart(updatedCart);
  };

  // Vider le panier
  const handleClearCart = () => updateCart([]);

  // Navigation
  const handleCheckout = () => router.push("/checkout");
  const handleBackToShop = () => router.push("/shop/women");
  const handleGoToProduct = (id) => router.push(`/products/${id}`);

  // Total
  const totalPrice = cart.reduce((acc, item) => {
    const price = item.price ? (item.discount ? (item.price * (100 - item.discount)) / 100 : item.price) : 0;
    return acc + price * (item.quantity || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-center">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-3 px-4 w-1/6">Image</th>
              <th className="py-3 px-4 w-1/6">Name</th>
              <th className="py-3 px-4 w-1/6">Price</th>
              <th className="py-3 px-4 w-1/6">Quantity</th>
              <th className="py-3 px-4 w-1/6">Subtotal</th>
              <th className="py-3 px-4 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr key="empty">
                <td colSpan="6" className="text-center py-10 text-gray-600">
                  Your cart is empty.
                </td>
              </tr>
            ) : (
              cart.map(item => {
                const price = item.price ? (item.discount ? (item.price * (100 - item.discount)) / 100 : item.price) : 0;
                return (
                  <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 cursor-pointer" onClick={() => handleGoToProduct(item._id)}>
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="py-3 px-4 cursor-pointer" onClick={() => handleGoToProduct(item._id)}>
                      {item.name}
                    </td>
                    <td className="py-3 px-4">${price.toFixed(2)}</td>
                    <td className="py-3 px-4 flex justify-center items-center gap-2">
                      <button onClick={() => handleQuantityChange(item._id, "decrease")} className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">-</button>
                      <span className="font-semibold">{item.quantity || 0}</span>
                      <button onClick={() => handleQuantityChange(item._id, "increase")} className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">+</button>
                    </td>
                    <td className="py-3 px-4 font-bold">${(price * (item.quantity || 0)).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <button onClick={() => handleRemove(item._id)} className="text-red-500 hover:text-red-700 transition">
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-6">
        {cart.length === 0 ? (
          <p className="text-center text-gray-600 py-10">Your cart is empty.</p>
        ) : (
          cart.map(item => {
            const price = item.price ? (item.discount ? (item.price * (100 - item.discount)) / 100 : item.price) : 0;
            return (
              <div key={item._id} className="border rounded-lg p-4 flex flex-col gap-4 shadow hover:shadow-lg transition">
                <div className="relative w-full h-64 cursor-pointer" onClick={() => handleGoToProduct(item._id)}>
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded transition duration-500 group-hover:opacity-0" />
                  {item.hoverImage && (
                    <img src={item.hoverImage} alt={item.name} className="w-full h-full object-cover rounded absolute top-0 left-0 opacity-0 hover:opacity-100 transition duration-500" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-800 cursor-pointer" onClick={() => handleGoToProduct(item._id)}>{item.name}</h3>
                  <p className="text-gray-800 font-bold text-lg">${price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => handleQuantityChange(item._id, "decrease")} className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">-</button>
                    <span className="font-semibold">{item.quantity || 0}</span>
                    <button onClick={() => handleQuantityChange(item._id, "increase")} className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">+</button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold text-gray-800">${(price * (item.quantity || 0)).toFixed(2)}</p>
                    <button onClick={() => handleRemove(item._id)} className="text-white bg-red-500 p-3 rounded-full hover:bg-red-600 transition">
                      <FiTrash2 size={24} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-wrap justify-between items-center mt-8 gap-4">
        <button onClick={handleBackToShop} className="bg-white border border-[#e3ac28] text-[#e3ac28] px-6 py-3 rounded-lg hover:bg-[#e3ac28] hover:text-white transition w-full sm:w-auto">
          Back to Shop
        </button>

        {cart.length > 0 && (
          <>
            <button onClick={handleCheckout} className="bg-[#e3ac28] text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition w-full sm:w-auto">
              Checkout
            </button>
            <button onClick={handleClearCart} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition w-full sm:w-auto">
              Clear Cart
            </button>

            <p className="text-lg font-semibold text-gray-800 whitespace-nowrap">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
