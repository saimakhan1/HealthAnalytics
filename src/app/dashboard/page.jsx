"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    const role = user.role?.toLowerCase();

    if (role === "doctor") {
      router.replace("/dashboard/doctor");
    } else if (role === "admin") {
      router.replace("/dashboard/admin");
    } else {
      router.replace("/dashboard/patient");
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#f5d7dc] border-t-[#a71930]" />
    </div>
  );
}
