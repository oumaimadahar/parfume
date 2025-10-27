"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserProfile from "@/components/UserProfile";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === "admin") {
        router.replace("/admin/profile"); // redirection pour admin
      }
    }
  }, [router]);

  return (
    <ProtectedRoute>
      <UserProfile /> {/* Si c’est un utilisateur normal */}
    </ProtectedRoute>
  );
}
