"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import dynamic from "next/dynamic";

const AdminEditProfile = dynamic(() => import("@/components/AdminEditProfile"), { ssr: false });
const UserEditProfile = dynamic(() => import("@/components/UserEditProfile"), { ssr: false });

export default function EditProfilePage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setRole(user.role);
    }
  }, []);

  if (!role) return null; // loading ou fallback

  return (
    <ProtectedRoute>
      {role === "admin" ? <AdminEditProfile /> : <UserEditProfile />}
    </ProtectedRoute>
  );
}
