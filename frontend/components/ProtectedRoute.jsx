// "use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ role, children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/auth");
    } else if (role && user.role !== role) {
      router.push("/auth"); // ou page "non autorisé"
    } else {
      setLoading(false);
    }
  }, [router, role]);

  if (loading) return null;
  return children;
}
