"use client";

import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#681225]">Admin Dashboard</h1>

      <p className="mt-2 text-gray-600">Welcome, {user?.name}</p>
    </div>
  );
}
