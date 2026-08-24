"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  UserCircle,
  FileText,
  Activity,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Search,
  Upload,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function DashboardShell({ children }) {
  const { user, loading, logout } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#f9dce1] border-t-[#a71930]" />
          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <h2 className="text-xl font-bold text-[#5c0b1b]">
            Authentication Required
          </h2>

          <p className="mt-2 text-gray-500">
            Please login to access your dashboard.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-6 rounded-xl bg-[#a71930] px-6 py-3 font-semibold text-white transition hover:bg-[#7f1025]"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const role = user.role?.toLowerCase();

  const dashboardPath =
    role === "doctor"
      ? "/dashboard/doctor"
      : role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/patient";

  const navigation =
    role === "patient"
      ? [
          {
            label: "Overview",
            href: "/dashboard/patient",
            icon: LayoutDashboard,
          },
          {
            label: "My Profile",
            href: "/dashboard/patient/profile",
            icon: UserCircle,
          },
          {
            label: "Upload Document",
            href: "/dashboard/patient/documents",
            icon: Upload,
          },
          {
            label: "Health Records",
            href: "/dashboard/patient/health-records",
            icon: Activity,
          },
        ]
      : role === "doctor"
        ? [
            {
              label: "Overview",
              href: "/dashboard/doctor",
              icon: LayoutDashboard,
            },
            {
              label: "My Profile",
              href: "/dashboard/doctor/profile",
              icon: UserCircle,
            },
            {
              label: "Patients",
              href: "/dashboard/doctor/patients",
              icon: Search,
            },
          ]
        : [
            {
              label: "Overview",
              href: "/dashboard/admin",
              icon: LayoutDashboard,
            },
            {
              label: "My Profile",
              href: "/dashboard/admin/profile",
              icon: UserCircle,
            },
            {
              label: "Users",
              href: "/dashboard/admin/users",
              icon: Users,
            },
            {
              label: "System Settings",
              href: "/dashboard/admin/settings",
              icon: Settings,
            },
          ];

  const roleInfo = {
    patient: {
      label: "Patient Portal",
      icon: HeartPulse,
    },
    doctor: {
      label: "Doctor Portal",
      icon: Stethoscope,
    },
    admin: {
      label: "Admin Portal",
      icon: ShieldCheck,
    },
  };

  const currentRole = roleInfo[role] || roleInfo.patient;

  const RoleIcon = currentRole.icon;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#f0dce0] bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a71930] text-white shadow-md">
              <HeartPulse size={23} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold text-[#5c0b1b]">
                HealthAnalytics
              </h1>

              <p className="text-[11px] font-medium text-gray-400">
                Smart Health Management
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-[#fff1f3] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role */}
        <div className="mx-4 mt-5 rounded-2xl bg-[#fff1f3] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a71930] text-white">
              <RoleIcon size={19} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Current Portal
              </p>

              <p className="text-sm font-bold capitalize text-[#681225]">
                {currentRole.label}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <div className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                (item.href !== dashboardPath &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#a71930] text-white shadow-md"
                      : "text-gray-600 hover:bg-[#fff1f3] hover:text-[#a71930]"
                  }`}
                >
                  <Icon size={19} />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User bottom */}
        <div className="border-t border-gray-100 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7dce1] font-bold text-[#8f1730]">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-800">
                {user.name}
              </p>

              <p className="truncate text-xs capitalize text-gray-500">
                {user.role}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-72">
        {/* Header */}
        {/* <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-4 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2.5 text-gray-600 hover:bg-[#fff1f3] hover:text-[#a71930] lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block">
            <p className="text-xs font-medium text-gray-400">HealthAnalytics</p>

            <h2 className="text-lg font-bold text-[#5c0b1b]">
              {currentRole.label}
            </h2>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-gray-800">{user.name}</p>
              <p className="text-xs capitalize text-gray-400">{user.role}</p>
            </div>

            <Link
              href={`${dashboardPath}/profile`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1f3] font-bold text-[#a71930] ring-4 ring-[#fff7f8] transition hover:bg-[#f7dce1]"
            >
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </Link>
          </div>
        </header> */}

        {/* Page content */}
        <main className="min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
