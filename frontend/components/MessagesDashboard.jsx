"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Mail } from "lucide-react";

const API_URL = "http://localhost:7007/api/contact";

const getMessages = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.messages;
};

const deleteMessage = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();
  return data;
};

export default function MessagesDashboard() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  const handleDelete = async (id) => {
    if (confirm("⚠️ Are you sure you want to delete this message?")) {
      await deleteMessage(id);
      fetchMessages();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-[#e3ac28] mb-6 flex items-center gap-2">
        <Mail className="text-[#e3ac28]" /> Contact Messages
      </h1>

      {/* Desktop */}
      <div className="hidden md:block bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No messages found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <motion.tr
                  key={msg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border"
                >
                  <td className="border px-4 py-2 font-medium">{msg.name}</td>
                  <td className="border px-4 py-2">{msg.email}</td>
                  <td className="border px-4 py-2 max-w-[200px] truncate">{msg.message}</td>
                  <td className="border px-4 py-2">{new Date(msg.date).toLocaleString()}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 mx-auto"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No messages found.</p>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md p-4"
            >
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                <Mail className="text-[#e3ac28]" size={16} /> {msg.name}
              </h2>
              <p className="text-gray-600 mt-1">{msg.email}</p>
              <p className="text-gray-600 mt-1">{msg.message}</p>
              <p className="text-gray-500 text-sm mt-1">{new Date(msg.date).toLocaleString()}</p>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
