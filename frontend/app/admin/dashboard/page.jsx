"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Package,
  Star,
  Gift,
  List,
} from "lucide-react";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [promoProducts, setPromoProducts] = useState([]);
  const [ordersByMonth, setOrdersByMonth] = useState([]);
  const [newProductsByMonth, setNewProductsByMonth] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7007/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get(`${BASE_URL}/auth/admin/all-users`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setUsers(res.data.users || []))
      .catch(console.error);

    axios.get(`${BASE_URL}/orders`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        const fetchedOrders = res.data.orders || [];
        setOrders(fetchedOrders);

        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const dataByMonth = months.map((m,i)=>({
          month: m,
          count: fetchedOrders.filter(o => o.createdAt && new Date(o.createdAt).getMonth() === i).length
        }));
        setOrdersByMonth(dataByMonth);
      })
      .catch(console.error);

    axios.get(`${BASE_URL}/products`)
      .then(res => {
        const allProducts = res.data.products || [];
        setProducts(allProducts);
        setNewProducts(allProducts.filter(p => p.isNew));
        setPromoProducts(allProducts.filter(p => p.discount > 0));

        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const dataByMonth = months.map((m,i)=>({
          month: m,
          count: allProducts.filter(p => p.createdAt && new Date(p.createdAt).getMonth() === i && p.isNew).length
        }));
        setNewProductsByMonth(dataByMonth);
      })
      .catch(console.error);

  }, []);

  const paidOrdersCount = orders.filter(o => o.isPaid).length;
  const unpaidOrdersCount = orders.filter(o => !o.isPaid).length;
  const COLORS = ["#4ade80", "#f87171"]; // Vert = Paid, Rouge = Unpaid

  return (
    <ProtectedRoute role="admin">
      <div className="space-y-8 p-4 md:p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-[#e3ac28] mb-4">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Users" count={users.length} icon={<Users size={24} />} />
          <Card title="Total Orders" count={orders.length} icon={<Package size={24} />} />
          <Card title="Paid Orders" count={paidOrdersCount} icon={<Package size={24} />} color="green" />
          <Card title="Unpaid Orders" count={unpaidOrdersCount} icon={<Package size={24} />} color="red" />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="All Products" count={products.length} icon={<List size={24} />} />
          <Card title="New Products" count={newProducts.length} icon={<Star size={24} />} color="yellow" />
          <Card title="Promo Products" count={promoProducts.length} icon={<Gift size={24} />} color="purple" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h3 className="text-gray-600 mb-2 font-medium">Orders by Month</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ordersByMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#e3ac28" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h3 className="text-gray-600 mb-2 font-medium">Paid vs Unpaid Orders</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Paid", value: paidOrdersCount },
                    { name: "Unpaid", value: unpaidOrdersCount },
                  ]}
                  innerRadius={40}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Table (desktop) */}
        <div className="mt-4">
          <h3 className="text-gray-600 font-medium mb-2">Transactions</h3>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">#</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">User</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order, idx) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{order.user?.name || order.user?.email || "Unknown"}</td>
                    <td className="px-4 py-3">${order.totalPrice.toFixed(2)}</td>
                    <td className={`px-4 py-3 font-semibold ${order.isPaid ? "text-green-600" : "text-red-600"}`}>
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </td>
                    <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {orders.map((order, idx) => (
              <div key={order._id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col">
                <span className="text-gray-400 text-sm mb-1">#{idx + 1}</span>
                <span className="font-semibold text-gray-700">{order.user?.name || order.user?.email || "Unknown"}</span>
                <span className="mt-1 text-gray-600">Total: <span className="font-medium">${order.totalPrice.toFixed(2)}</span></span>
                <span className={`mt-1 font-semibold ${order.isPaid ? "text-green-600" : "text-red-600"}`}>
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
                <span className="mt-1 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}

const Card = ({ title, count, icon, color }) => (
  <div className={`bg-white p-4 rounded-2xl shadow flex flex-col justify-between hover:shadow-lg transition border-l-4 ${color === "green" ? "border-green-500" : color === "red" ? "border-red-500" : color === "yellow" ? "border-yellow-400" : color === "purple" ? "border-purple-500" : "border-gray-300"}`}>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-800">{count}</p>
  </div>
);
