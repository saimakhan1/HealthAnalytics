// "use client";

// import { useAuth } from "@/context/AuthContext";

// export default function PatientDashboard() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="p-10">Loading...</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-[#681225]">Patient Dashboard</h1>

//       <p className="mt-2 text-gray-600">Welcome, {user?.name}</p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import {
  Upload,
  FileText,
  Activity,
  CalendarDays,
  ArrowRight,
  HeartPulse,
  Pill,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/dashboard/StatCard";

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Welcome */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#5c0b1b] via-[#7f1025] to-[#a71930] p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              Patient Portal
            </span>

            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Welcome, {user?.name || "Patient"}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
              Keep your medical documents organized and access your health
              history from one secure place.
            </p>
          </div>

          <Link
            href="/dashboard/patient/documents"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#8f1730] shadow-lg transition hover:bg-[#fff1f3]"
          >
            <Upload size={18} />
            Upload Document
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Health Records"
          // value="0"
          // description="AI processed medical records"
          icon={FileText}
        />

        <StatCard
          title="Consultations"
          // value="0"
          // description="Total consultation history"
          icon={Stethoscope}
          variant="green"
        />

        <StatCard
          title="Medicines"
          // value="0"
          // description="Medicines found in records"
          icon={Pill}
          variant="orange"
        />

        <StatCard
          title="Test Results"
          // value="0"
          // description="Diagnostic results available"
          icon={Activity}
          variant="purple"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#5c0b1b]">
                Medical Documents
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload prescriptions and medical reports for AI analysis.
              </p>
            </div>

            <FileText className="text-[#a71930]" size={24} />
          </div>

          <Link
            href="/dashboard/patient/documents"
            className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e8c5cb] bg-[#fffafb] p-6 text-center transition hover:border-[#a71930] hover:bg-[#fff1f3]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1f3] text-[#a71930]">
              <Upload size={25} />
            </div>

            <h3 className="mt-4 font-bold text-gray-800">
              Upload a medical document
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              PDF, PNG or JPEG supported
            </p>
          </Link>
        </div>

        {/* Profile */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1f3] text-2xl font-extrabold text-[#a71930]">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h2 className="font-bold text-gray-800">{user?.name}</h2>

              <p className="text-sm capitalize text-gray-500">{user?.role}</p>
            </div>
          </div>

          <div className="my-6 h-px bg-gray-100" />

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-400">Email</p>
              <p className="mt-1 font-semibold text-gray-700">{user?.email}</p>
            </div>

            <div>
              <p className="text-gray-400">Patient ID</p>
              <p className="mt-1 font-semibold text-[#a71930]">
                {user?.patientId || user?._id || "Not assigned"}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/patient/profile"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#e8c5cb] py-3 text-sm font-bold text-[#a71930] transition hover:bg-[#fff1f3]"
          >
            View Profile
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Empty history */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1f3] text-[#a71930]">
          <HeartPulse size={25} />
        </div>

        <h2 className="mt-4 text-lg font-bold text-[#5c0b1b]">
          Your Health Timeline
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
          Once your medical documents are processed by the AI engine, your
          consultations, medicines, vital signs and test results will appear
          here chronologically.
        </p>

        <Link
          href="/dashboard/patient/health-records"
          className="mt-5 inline-flex items-center gap-2 font-bold text-[#a71930]"
        >
          View Health Records
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
