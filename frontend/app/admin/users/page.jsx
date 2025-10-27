"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:7007/api/auth/admin/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("⚠️ Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:7007/api/auth/admin/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
      alert("✅ User deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting user");
    }
  };

  return (
    <ProtectedRoute role="admin">
      <div className="p-8 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-[#e3ac28] mb-6">Users Management</h1>

        {/* 🧠 Mode tableau sur desktop */}
        <div className="hidden md:block bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
          {users.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No users found.</p>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2 text-center w-12">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Country</th>
                  <th className="border px-4 py-2">Role</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border"
                  >
                    <td className="border px-4 py-2 text-center text-gray-600 font-medium">{index + 1}</td>
                    <td className="border px-4 py-2 font-medium">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className="border px-4 py-2">{user.address?.country || "-"}</td>
                    <td className="border px-4 py-2 capitalize">{user.role}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
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

        {/* 📱 Mode cartes sur mobile */}
        <div className="block md:hidden space-y-4">
          {users.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No users found.</p>
          ) : (
            users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#e3ac28] font-semibold">#{index + 1}</span>
                  <span className="text-sm text-gray-600 capitalize">{user.role}</span>
                </div>

                <p className="font-bold text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-600 text-sm">📞 {user.phone}</p>
                <p className="text-gray-600 text-sm">🌍 {user.address?.country || "-"}</p>

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
