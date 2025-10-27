"use client";
import Link from "next/link";
import { LayoutDashboard, Users, LogOut, X, Menu, Package, Star, ChevronDown,Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true); // Sidebar ouverte par défaut
  const [openProducts, setOpenProducts] = useState(false); // Dropdown Products

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth");
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir si fermé */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-5 left-5 p-2 bg-[#e3ac28] text-white rounded-full shadow-lg z-50 hover:bg-yellow-500 transition"
          title="Open Sidebar"
        >
          <Menu size={20} />
        </button>
      )}

      {isOpen && (
        <aside className="w-64 bg-white shadow-lg flex flex-col justify-between relative transition-transform duration-300">
          {/* Bouton fermer */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition"
            title="Close Sidebar"
          >
            <X size={20} />
          </button>

          <div>
            {/* Logo */}
            <div className="p-5 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-[#e3ac28]">MyAdmin</h1>
            </div>

            {/* Menu */}
            <nav className="mt-6 px-4 space-y-2">
              {/* Dashboard */}
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>

              {/* Users */}
              <Link
                href="/admin/users"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <Users size={20} />
                <span>Users</span>
              </Link>

              {/* Orders */}
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <Star size={20} />
                <span>Orders</span>
              </Link>
               {/* Messages - juste avant le Logout */}
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Mail size={20} />
            <span>Messages</span>
          </Link>

              {/* Dropdown Products */}
              <button
                onClick={() => setOpenProducts(!openProducts)}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Package size={20} />
                  <span>Products</span>
                </div>
                <ChevronDown
                  className={`transition-transform ${openProducts ? "rotate-180" : ""}`}
                />
              </button>

              {openProducts && (
                <div className="ml-8 mt-2 flex flex-col gap-2">
                  <Link href="/admin/products" className="hover:text-[#e3ac28]">
                    All Products
                  </Link>
                  <Link href="/admin/products/add" className="hover:text-[#e3ac28]">
                    Add Products
                  </Link>
                  <Link href="/admin/products/new" className="hover:text-[#e3ac28]">
                    New Products
                  </Link>
                  <Link href="/admin/products/promotions" className="hover:text-[#e3ac28]">
                    Promotions
                  </Link>
                </div>
              )}
            </nav>
          </div>
         
          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-[#e3ac28] hover:text-yellow-500 transition w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>


        </aside>
      )}
    </>
  );
}
