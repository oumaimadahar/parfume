"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import HeaderTop from "@/components/HeaderTop";
import Navbar from "@/components/NavBar";
import Image from "next/image";
import axios from "axios";
import { FiX, FiHome, FiCreditCard } from "react-icons/fi";
import Footer from '@/components/footer';

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:7007/api/orders/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(res.data.order);
      } catch (err) {
        console.error("Error fetching order:", err);
        alert("Unable to fetch the order.");
        router.push("/checkout");
      }
    };
    fetchOrder();
  }, [orderId, router]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCVV) {
      alert("Please fill in all card details.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:7007/api/orders/${orderId}/pay`,
        { cardNumber, cardExpiry, cardCVV },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Payment successful!");
      router.push("/my-orders");
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/checkout");
  };

  const handleBackHome = () => {
    router.push("/");
  };

  if (!order)
    return <p className="text-center mt-20">Loading order...</p>;

  const totalPrice = order.items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div>
      <HeaderTop />
      <Navbar />
      <div className="min-h-screen py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Card Payment Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Card Payment
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handlePayment}>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="border rounded-lg p-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardCVV}
                  onChange={(e) => setCardCVV(e.target.value)}
                  className="border rounded-lg p-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-[#e3ac28]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#e3ac28] text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center gap-2"
              >
                <FiCreditCard /> {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
              <div className="flex flex-col gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.product?.imageUrl && (
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name || "Product"}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.product?.name || "Product"}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#e3ac28] font-semibold">
                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total and Buttons */}
            <div className="mt-4 border-t pt-4 flex flex-col gap-3">
              <div className="flex justify-between font-bold text-lg mb-3">
                <span>Total:</span>
                <span className="text-[#e3ac28]">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 border border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  <FiX /> Cancel
                </button>
                <button
                  onClick={handleBackHome}
                  className="flex items-center gap-2 border border-[#e3ac28] text-[#e3ac28] py-2 px-4 rounded-lg hover:bg-[#e3ac28] hover:text-white transition"
                >
                  <FiHome /> Back to Home
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}
