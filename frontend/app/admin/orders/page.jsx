"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:7007/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("⚠️ Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:7007/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((order) => order._id !== id));
      alert("✅ Order deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting order");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:7007/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map((order) => (order._id === id ? { ...order, status } : order)));
    } catch (err) {
      alert(err.response?.data?.message || "Error updating status");
    }
  };

  return (
    <ProtectedRoute role="admin">
      <div className="p-8 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-[#e3ac28] mb-6">Orders Management</h1>

        {/* 🧠 Tableau desktop */}
        <div className="hidden md:block bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No orders found.</p>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2 text-center w-12">#</th>
                  <th className="border px-4 py-2">User</th>
                  <th className="border px-4 py-2">Total ($)</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Paid</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border"
                  >
                    <td className="border px-4 py-2 text-center text-gray-600 font-medium">{index + 1}</td>
                    <td className="border px-4 py-2">{order.user?.email || "Deleted User"}</td>
                    <td className="border px-4 py-2 font-medium">${order.totalPrice}</td>
                    <td className="border px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2">{order.isPaid ? "Yes" : "No"}</td>
                    <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-red-600 transition"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 📱 Cartes mobile */}
        <div className="block md:hidden space-y-4">
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#e3ac28] font-semibold">#{index + 1}</span>
                  <span className="text-sm text-gray-600 capitalize">{order.status}</span>
                </div>

                <p className="font-bold text-gray-800">{order.user?.email || "Deleted User"}</p>
                <p className="text-gray-600 text-sm">💰 ${order.totalPrice}</p>
                <p className="text-gray-600 text-sm">Paid: {order.isPaid ? "Yes" : "No"}</p>
                <p className="text-gray-600 text-sm">
                  📅 {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                
                <button
                  onClick={() => handleDelete(user._id)}
                  className="mt-3 bg-red-500 text-white w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
