"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserEditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7007/api/auth";

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(`${BASE_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data.user);
        setUpdatedData({
          firstName: res.data.user.firstName || "",
          lastName: res.data.user.lastName || "",
          email: res.data.user.email || "",
          phone: res.data.user.phone || "",
          street: res.data.user.address?.street || "",
          city: res.data.user.address?.city || "",
          country: res.data.user.address?.country || "",
          gender: res.data.user.gender || "",
        });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");

    try {
      const res = await axios.put(`${BASE_URL}/update`, {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        phone: updatedData.phone,
        gender: updatedData.gender,
        address: {
          street: updatedData.street,
          city: updatedData.city,
          country: updatedData.country,
        },
      }, { headers: { Authorization: `Bearer ${token}` } });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("✅ Profile updated successfully!");
      router.push("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating profile");
    }
  };

  if (!user) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-[#e3ac28] mb-6 text-center">✏️ Edit Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* First & Last Name */}
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={updatedData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="flex-1 border rounded-lg p-2"
              required
            />
            <input
              type="text"
              name="lastName"
              value={updatedData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="flex-1 border rounded-lg p-2"
              required
            />
          </div>

          {/* Email & Phone */}
          <div className="flex gap-4">
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1 border rounded-lg p-2"
              required
            />
            <input
              type="text"
              name="phone"
              value={updatedData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="flex-1 border rounded-lg p-2"
              required
            />
          </div>

          {/* Street & City */}
          <div className="flex gap-4">
            <input
              type="text"
              name="street"
              value={updatedData.street}
              onChange={handleChange}
              placeholder="Street"
              className="flex-1 border rounded-lg p-2"
            />
            <input
              type="text"
              name="city"
              value={updatedData.city}
              onChange={handleChange}
              placeholder="City"
              className="flex-1 border rounded-lg p-2"
            />
          </div>

          {/* Country & Gender */}
          <div className="flex gap-4">
            <input
              type="text"
              name="country"
              value={updatedData.country}
              onChange={handleChange}
              placeholder="Country"
              className="flex-1 border rounded-lg p-2"
            />
            <select
              name="gender"
              value={updatedData.gender}
              onChange={handleChange}
              className="flex-1 border rounded-lg p-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button type="submit" className="flex items-center justify-center gap-2 flex-1 bg-[#e3ac28] text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
              <Save size={20} /> Save
            </button>
            <button type="button" onClick={() => router.push("/profile")} className="flex items-center justify-center gap-2 flex-1 bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition">
              <X size={20} /> Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UserEditProfile;
