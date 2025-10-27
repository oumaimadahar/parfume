
"use client";

import { useState, useEffect } from "react";
import HeaderTop from "@/components/HeaderTop";
import Navbar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiTrash2, FiX } from "react-icons/fi";  // ok pour le trash
import { FaHome, FaListAlt } from "react-icons/fa"; // correct pour FontAwesome
import Footer from '@/components/footer';


export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    address: "",
    city: "",
    phone: "",
    paymentMethod: "cash",
  });
  const [isDirect, setIsDirect] = useState(false);

  // Charger le panier ou produit direct
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const updateCart = () => {
      const directProduct = JSON.parse(localStorage.getItem("directProduct"));
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

      if (directProduct) {
        setCart([directProduct]);
        setIsDirect(true);
        localStorage.removeItem("directProduct");
      } else {
        setCart(storedCart);
        setIsDirect(false);
      }
    };

    updateCart();

    window.addEventListener("directProductUpdated", updateCart);
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("directProductUpdated", updateCart);
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  // Calcul du total
  useEffect(() => {
    const totalPrice = cart.reduce((sum, item) => {
      const price =
        item.discount && item.discount > 0
          ? (item.price * (100 - item.discount)) / 100
          : item.price;
      return sum + price * item.quantity;
    }, 0);
    setTotal(totalPrice);
  }, [cart]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);

    if (!isDirect) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const newCart = storedCart.filter((item) => item._id !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // Soumettre la commande
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/auth");
      return;
    }

    if (cart.length === 0) {
      alert("Votre commande est vide !");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const fullAddress = `${form.address}, ${form.city}, Tel: ${form.phone}`;

      // Envoyer seulement productId et quantity
      const orderData = {
        address: fullAddress,
        paymentMethod: form.paymentMethod,
        items: cart.map((i) => ({
          productId: i._id,
          quantity: i.quantity,
        })),
      };

      const res = await axios.post(
        "http://localhost:7007/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        const order = res.data.order;

        if (form.paymentMethod === "cash") {
          alert("✅ Commande passée avec succès !");
          if (!isDirect) {
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));
          }
          router.push("/my-orders");
        } else if (form.paymentMethod === "card") {
          router.push(`/payment/${order._id}`);
        }
      }
    } catch (err) {
      console.error("Erreur commande :", err.response?.data || err);
      alert(
        "❌ Une erreur est survenue lors du passage de la commande. Vérifiez que le panier n'est pas vide et que vous êtes connecté."
      );
    }
  };

  return (
    <div>
      <HeaderTop />
      <Navbar />
      <div className="min-h-screen py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8 grid md:grid-cols-2 gap-10">
          {/* Formulaire de livraison */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Shipping Information
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                required
              />

              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit Card</option>
              </select>

              <button
                type="submit"
                className="bg-[#e3ac28] text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Confirm Order
              </button>
            </form>
          </div>

          {/* Récapitulatif */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Order</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => {
                  const price =
                    item.discount && item.discount > 0
                      ? (item.price * (100 - item.discount)) / 100
                      : item.price;

                  return (
                    <div
                      key={item._id}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-gray-600 text-sm">
                            Quantity : {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-[#e3ac28] font-semibold">
                          ${(price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition flex items-center gap-1"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total :</span>
                  <span className="text-[#e3ac28]">${total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Boutons supplémentaires */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 border border-[#e3ac28] text-[#e3ac28] px-4 py-2 rounded hover:bg-[#e3ac28] hover:text-white transition"
              >
                <FaHome /> Back to Home
              </button>
              <button
                onClick={() => router.push("/my-orders")}
                className="flex items-center gap-2 border border-gray-500 text-gray-500 hover:bg-gray-600 hover:text-white transition px-4 py-2 rounded"
              >
                <FaListAlt /> My Orders
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="flex items-center gap-2  border border-red-500 text-red-500  hover:bg-red-600 hover:text-white transition px-4 py-2 rounded"
              >
                <FiX /> Canal
              </button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
