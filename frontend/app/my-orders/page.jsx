
"use client";

import React, { useState, useEffect } from "react";
import HeaderTop from "@/components/HeaderTop";
import Navbar from "@/components/NavBar";
import Image from "next/image";
import axios from "axios";
import { FaShoppingBag } from "react-icons/fa";
import Footer from '@/components/footer';


export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:7007/api/orders/my-orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user)
    return (
      <div>
        <HeaderTop />
        <Navbar />
        <p className="text-center py-20">You need to login to see your orders.</p>
      </div>
    );

  if (loading)
    return (
      <div>
        <HeaderTop />
        <Navbar />
        <p className="text-center py-20">Loading your orders…</p>
      </div>
    );

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-300 text-yellow-900";
      case "confirmed":
        return "bg-blue-300 text-blue-900";
      case "shipped":
        return "bg-indigo-300 text-indigo-900";
      case "delivered":
        return "bg-green-300 text-green-900";
      case "cancelled":
        return "bg-red-300 text-red-900";
      default:
        return "bg-gray-300 text-gray-900";
    }
  };

  return (
    <div>
      <HeaderTop />
      <Navbar />

      <div className="min-h-screen py-8 px-4 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
            <button
              onClick={() => window.location.href = "/shop/women"}
              className="flex items-center gap-2  border border-[#e3ac28] text-[#e3ac28]  px-4 py-2 rounded hover:bg-[#e3ac28] hover:text-white transition"
            >
              <FaShoppingBag /> Back to Shop
            </button>
          </div>


          {orders.length === 0 ? (
            <p className="text-gray-600">You have not placed any orders yet.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => {
                const orderTotal = order.items.reduce(
                  (sum, item) =>
                    sum + (item.product?.price || 0) * (item.quantity || 0),
                  0
                );

                return (
                  <div
                    key={order._id}
                    className="border rounded-lg p-4 sm:p-6 bg-white shadow-md"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-1">
                      <span className="font-semibold text-gray-800 break-words w-full sm:w-auto">
                        Order ID: {order._id}
                      </span>
                      <span className="text-gray-500 break-words w-full sm:w-auto">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>


                    {/* Address & Status */}
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-gray-700">Address: {order.address}</p>
                      <span
                        className={`px-3 py-1 rounded-full font-semibold ${statusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-4">
                      {order.items.map((item, index) => (
                        <div
                          key={`${item.product?._id}-${index}`}
                          className="flex items-center gap-4"
                        >
                          <div className="w-20 h-20 relative flex-shrink-0">
                            {item.product?.imageUrl ? (
                              <Image
                                src={item.product.imageUrl}
                                alt={item.product?.name || "Product"}
                                fill
                                className="object-cover rounded"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <p className="font-semibold">
                              {item.product?.name || "Product"}
                            </p>
                            <p className="text-gray-600">
                              Quantity: {item.quantity || 0} × $
                              {item.product?.price || 0} = $
                              {(item.product?.price || 0) * (item.quantity || 0)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <p className="mt-4 font-bold text-right">
                      Total: ${orderTotal.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />

    </div>
  );
}




