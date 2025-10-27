
"use client";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminTopbar({ adminEmail }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  // Charger les messages
  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:7007/api/contact");
      const data = await res.json();
      const msgs = data.messages.map((msg) => ({ ...msg, isRead: msg.isRead || false }));
      setMessages(msgs);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg._id === id ? { ...msg, isRead: true } : msg))
    );
    router.push("/admin/messages");
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  // Recherche produits (route admin)
  const fetchProducts = async (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:7007/api/products/search?q=${encodeURIComponent(term)}`
      );
      if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
      const data = await res.json();
      const results = data.results || [];
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (err) {
      console.error("❌ Erreur recherche produits:", err);
      setSearchResults([]);
      setShowSearchResults(true);
    }
  };

  // Déclenchement recherche avec debounce 500ms
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(searchTerm);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center relative">
      {/* Barre de recherche */}
      <div className="relative w-1/3">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            className="bg-transparent ml-2 outline-none w-full text-sm"
          />
        </div>

        {/* Résultats de recherche */}
        {showSearchResults && (
          <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-80 overflow-y-auto">
            {searchResults.length === 0 ? (
              <p className="text-gray-500 text-sm px-4 py-2">Aucun produit trouvé</p>
            ) : (
              searchResults.map((prod) => (
                <button
                  key={prod._id}
                  onClick={() => router.push(`/admin/products/${prod._id}`)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 text-sm flex flex-col"
                >
                  <span className="font-medium text-gray-800">{prod.name}</span>
                  <span className="text-gray-500 truncate">{prod.category}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Notifications & Profil */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setShowMessages(!showMessages)} className="relative">
            <Bell size={22} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {showMessages && (
            <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-lg py-2 z-50 max-h-96 overflow-y-auto">
              {messages.filter((msg) => !msg.isRead).length === 0 ? (
                <p className="text-gray-500 px-4 py-2">No new messages</p>
              ) : (
                messages
                  .filter((msg) => !msg.isRead)
                  .map((msg) => (
                    <button
                      key={msg._id}
                      onClick={() => handleRead(msg._id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex flex-col gap-1 border-b last:border-b-0"
                    >
                      <span className="font-medium text-gray-800">{msg.name}</span>
                      <span className="text-gray-600 text-sm truncate">{msg.message}</span>
                      <span className="text-gray-400 text-xs">
                        {new Date(msg.date).toLocaleString()}
                      </span>
                    </button>
                  ))
              )}
            </div>
          )}
        </div>

        {/* Dropdown Admin */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <User size={18} className="text-gray-600" />
            <span className="text-sm font-medium">Admin</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg py-2 z-50">
              <div className="px-4 py-2 text-xs text-gray-600 border-b">{adminEmail || "admin@example.com"}</div>

              <button
                onClick={() => router.push("/profile/edit")}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <Settings size={16} /> Settings
              </button>

              <button
                onClick={() => router.push("/admin/profile")}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <User size={16} /> Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
