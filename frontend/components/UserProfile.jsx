"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7007/api/auth";

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(`${BASE_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth");
  };

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/delete-account`, { headers: { Authorization: `Bearer ${token}` } });
      alert("Account deleted successfully!");
      handleLogout();
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error deleting account");
    }
  };

  if (!user) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">

        {/* 🔹 Bouton Back to Home */}
        <button
          onClick={() => router.push("/")}
          className="mb-4 flex items-center justify-center gap-2 bg-white text-[#e3ac28] px-4 py-2 rounded-lg font-semibold shadow hover:bg-[#e3ac28] hover:text-white transition"
        >
          <Home size={20} /> Back to Home
        </button>

        <h2 className="text-3xl font-bold text-[#e3ac28] mb-6 text-center">
          👤 Welcome, {user.firstName} {user.lastName}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Country:</strong> {user.address?.country}</p>
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <button 
            onClick={handleDeleteAccount} 
            className="w-full flex items-center justify-center gap-2 text-red-600 py-3 rounded-lg border border-red-600 font-semibold hover:bg-red-600 hover:text-white transition"
          >
            Delete Account
          </button>

          <button 
            onClick={handleEditProfile} 
            className="w-full flex items-center justify-center gap-2 text-[#e3ac28] py-3 rounded-lg border border-[#e3ac28] font-semibold hover:bg-[#e3ac28] hover:text-white transition"
          >
            Edit Profile
          </button>

          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 bg-[#e3ac28] text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
