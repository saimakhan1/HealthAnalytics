"use client";

import { useAuth } from "@/context/AuthContext";

export default function DoctorDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#681225]">Doctor Dashboard</h1>

      <p className="mt-2 text-gray-600">Welcome, Dr. {user?.name}</p>
    </div>
  );
}
