"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import dynamic from "next/dynamic";

const AdminProfile = dynamic(() => import("@/components/AdminProfile"), { ssr: false });

export default function AdminProfilePage() {
  return (
    <ProtectedRoute role="admin">
      <AdminProfile />
    </ProtectedRoute>
  );
}
