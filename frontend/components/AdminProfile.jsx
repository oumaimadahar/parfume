"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AdminProfile = () => {
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

  const handleGoDashboard = () => {
    router.push("/admin/dashboard");
  };

  if (!user) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-[#e3ac28] mb-6 text-center">
          👤 Welcome, {user.firstName} {user.lastName}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Country:</strong> {user.address?.country}</p>
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          {/* Bouton pour accéder au dashboard */}
          <button onClick={handleGoDashboard} className="w-full flex items-center justify-center gap-2 text-[#e3ac28] py-3 rounded-lg border border-[#e3ac28] font-semibold hover:bg-[#e3ac28] hover:text-white transition">
            Dashboard
          </button>

          {/* Bouton pour éditer le profil */}
          <button onClick={handleEditProfile} className="w-full flex items-center justify-center gap-2 text-[#e3ac28] py-3 rounded-lg border border-[#e3ac28] font-semibold hover:bg-[#e3ac28] hover:text-white transition">
            Edit Profile
          </button>

          {/* Bouton logout */}
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-[#e3ac28] text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProfile;
