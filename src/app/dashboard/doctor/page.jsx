// "use client";

// import { useAuth } from "@/context/AuthContext";

// export default function DoctorDashboard() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="p-10">Loading...</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-[#681225]">Doctor Dashboard</h1>

//       <p className="mt-2 text-gray-600">Welcome, Dr. {user?.name}</p>
//     </div>
//   );

// }

"use client";

import Link from "next/link";
import {
  Users,
  FileText,
  Pill,
  Activity,
  Search,
  ArrowRight,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/dashboard/StatCard";

export default function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#5c0b1b] via-[#7f1025] to-[#a71930] p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              Doctor Portal
            </span>

            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Welcome, Dr. {user?.name}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
              Review patient history, medications and diagnostic results before
              consultations.
            </p>
          </div>

          <Link
            href="/dashboard/doctor/patients"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#8f1730] shadow-lg"
          >
            <Search size={18} />
            Find Patient
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Patients"
          value="0"
          description="Patients available in the system"
          icon={Users}
        />

        <StatCard
          title="Records Reviewed"
          value="0"
          description="AI structured medical records"
          icon={FileText}
          variant="green"
        />

        <StatCard
          title="Medicines Tracked"
          value="0"
          description="Medication records analyzed"
          icon={Pill}
          variant="orange"
        />

        <StatCard
          title="Test Results"
          value="0"
          description="Diagnostic records available"
          icon={Activity}
          variant="purple"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#5c0b1b]">
                Patient Health Intelligence
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Search patients by their unique Patient ID.
              </p>
            </div>

            <Stethoscope className="text-[#a71930]" size={25} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              placeholder="Enter Patient ID..."
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#a71930] focus:ring-4 focus:ring-[#fff1f3]"
            />

            <Link
              href="/dashboard/doctor/patients"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#a71930] px-6 py-3 font-bold text-white hover:bg-[#7f1025]"
            >
              Search
              <Search size={17} />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#5c0b1b]">Doctor Profile</h2>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1f3] text-xl font-bold text-[#a71930]">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <p className="font-bold text-gray-800">{user?.name}</p>

              <p className="text-sm capitalize text-gray-500">{user?.role}</p>
            </div>
          </div>

          <Link
            href="/dashboard/doctor/profile"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#e8c5cb] py-3 text-sm font-bold text-[#a71930]"
          >
            Manage Profile
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
