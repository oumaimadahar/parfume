
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock, User, Venus, Phone, MapPin, Globe, LogIn, UserPlus, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const Authe = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "", password: "", firstName: "", lastName: "", gender: "", phone: "", city: "", country: "",
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7007/api/auth";

  // ✅ Cleanup token at mount to avoid stale login
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double submit
    setIsSubmitting(true);

    try {
      const apiUrl = isLogin ? `${BASE_URL}/login` : `${BASE_URL}/register`;
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : {
            firstName: form.firstName,
            lastName: form.lastName,
            gender: form.gender,
            email: form.email,
            password: form.password,
            phone: form.phone,
            address: { city: form.city, country: form.country },
          };

      const res = await axios.post(apiUrl, payload);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirection based on role
        if (res.data.user.role === "admin") router.push("/admin/dashboard");
        else router.push("/profile");
      } else {
        alert("✅ User registered successfully! Please login now.");
        setIsLogin(true);
        setForm({ ...form, password: "" });
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative flex w-[850px] h-[500px] shadow-xl rounded-2xl overflow-hidden mt-2">
        {/* Left Panel */}
        <motion.div
          key={isLogin ? "login-panel" : "register-panel"}
          initial={{ x: isLogin ? -400 : 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`absolute top-0 h-full w-1/2 flex flex-col items-center justify-center text-white p-8 ${isLogin ? "left-0 bg-[#e3ac28]" : "left-1/2 bg-[#e3ac28]"}`}
        >
          <h2 className="text-3xl font-bold mb-4">{isLogin ? "Hello, Welcome!" : "Welcome Back!"}</h2>
          <p className="mb-4">{isLogin ? "Don’t have an account?" : "Already have an account?"}</p>
          <button
            onClick={() => { setIsLogin(!isLogin); setForm({ email: "", password: "", firstName: "", lastName: "", gender: "", phone: "", city: "", country: "" }); }}
            className="flex items-center justify-center gap-2 bg-white text-[#e3ac28] px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#e3ac28] hover:text-white transition"
          >
            {isLogin ? <UserPlus size={20} /> : <LogIn size={20} />}
            {isLogin ? "Register" : "Login"}
          </button>
          <button
            onClick={() => router.push("/")}
            className="mt-6 flex items-center gap-2 bg-white text-[#e3ac28] px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#e3ac28] hover:text-white transition"
          >
            <Home size={20} />
            Back to Home
          </button>
        </motion.div>

        {/* Right Panel - Form */}
        <motion.div
          key={isLogin ? "login-form" : "register-form"}
          initial={{ x: isLogin ? 400 : -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`absolute top-0 h-full w-1/2 bg-white flex flex-col justify-center items-center px-10 ${isLogin ? "right-0" : "left-0"}`}
        >
          <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {!isLogin && (
              <>
                {/* Register Fields */}
                <div className="flex space-x-4">
                  <div className="flex-1 flex items-center border rounded-lg px-3">
                    <User className="text-gray-400" size={20} />
                    <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="w-full p-2 focus:outline-none" required />
                  </div>
                  <div className="flex-1 flex items-center border rounded-lg px-3">
                    <User className="text-gray-400" size={20} />
                    <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-full p-2 focus:outline-none" required />
                  </div>
                </div>
                <div className="flex items-center border rounded-lg px-3">
                  <Venus className="text-gray-400" size={20} />
                  <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 focus:outline-none" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex items-center border rounded-lg px-3">
                  <Phone className="text-gray-400" size={20} />
                  <input type="tel" name="phone" placeholder="+212 601010101" value={form.phone} onChange={handleChange} className="w-full p-2 focus:outline-none" required />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1 flex items-center border rounded-lg px-3">
                    <MapPin className="text-gray-400" size={20} />
                    <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full p-2 focus:outline-none" required />
                  </div>
                  <div className="flex-1 flex items-center border rounded-lg px-3">
                    <Globe className="text-gray-400" size={20} />
                    <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} className="w-full p-2 focus:outline-none" required />
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center border rounded-lg px-3">
              <Mail className="text-gray-400" size={20} />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 focus:outline-none" required />
            </div>
            <div className="flex items-center border rounded-lg px-3">
              <Lock className="text-gray-400" size={20} />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 focus:outline-none" required />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-[#e3ac28] text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
              {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Authe;
