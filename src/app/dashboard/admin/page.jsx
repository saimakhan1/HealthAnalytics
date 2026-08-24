// "use client";

// import { useAuth } from "@/context/AuthContext";

// export default function AdminDashboard() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="p-10">Loading...</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-[#681225]">Admin Dashboard</h1>

//       <p className="mt-2 text-gray-600">Welcome, {user?.name}</p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import {
  Users,
  UserCheck,
  UserCog,
  FileCheck2,
  Settings,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/dashboard/StatCard";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#5c0b1b] via-[#7f1025] to-[#a71930] p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              Administration
            </span>

            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Welcome, {user?.name}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
              Manage users, monitor system activity and configure the
              HealthAnalytics platform.
            </p>
          </div>

          <Link
            href="/dashboard/admin/users"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#8f1730]"
          >
            <Users size={18} />
            Manage Users
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="0"
          description="Patients and doctors"
          icon={Users}
        />

        <StatCard
          title="Patients"
          value="0"
          description="Registered patient accounts"
          icon={UserCheck}
          variant="green"
        />

        <StatCard
          title="Doctors"
          value="0"
          description="Registered doctors"
          icon={UserCog}
          variant="orange"
        />

        <StatCard
          title="AI Documents"
          value="0"
          description="Successfully processed"
          icon={FileCheck2}
          variant="purple"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AdminAction
          icon={Users}
          title="User Directory"
          description="View and manage patient and doctor accounts."
          href="/dashboard/admin/users"
        />

        <AdminAction
          icon={FileCheck2}
          title="Audit Monitoring"
          description="Monitor document processing and system activity."
          href="/dashboard/admin"
        />

        <AdminAction
          icon={Settings}
          title="System Settings"
          description="Manage mock data and application configuration."
          href="/dashboard/admin/settings"
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h2 className="font-bold text-[#5c0b1b]">System Status</h2>
            <p className="text-sm text-gray-500">
              HealthAnalytics administration overview
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatusItem label="Authentication" status="Operational" />
          <StatusItem label="Database" status="Connected" />
          <StatusItem label="AI Engine" status="Ready" />
        </div>
      </div>
    </div>
  );
}

function AdminAction({ icon: Icon, title, description, href }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
        <Icon size={22} />
      </div>

      <h3 className="mt-5 font-bold text-[#5c0b1b]">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>

      <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#a71930]">
        Open
        <ArrowRight
          size={16}
          className="transition group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

function StatusItem({ label, status }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
      <span className="text-sm font-medium text-gray-600">{label}</span>

      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
        {status}
      </span>
    </div>
  );
}
