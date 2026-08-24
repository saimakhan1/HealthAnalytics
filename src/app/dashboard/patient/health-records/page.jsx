"use client";

import { Activity, CalendarDays, FileText, Pill } from "lucide-react";

export default function HealthRecordsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">HEALTH HISTORY</p>

        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Health Records
        </h1>

        <p className="mt-2 text-gray-500">
          Your AI-structured medical history will appear here.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1f3] text-[#a71930]">
          <Activity size={28} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#5c0b1b]">
          No Health Records Yet
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
          Upload a prescription or medical report. Once the AI extraction
          process is connected, your consultation date, doctor, medicines, vital
          signs and test results will appear here.
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
          <RecordPlaceholder icon={CalendarDays} label="Consultations" />
          <RecordPlaceholder icon={Pill} label="Medicines" />
          <RecordPlaceholder icon={FileText} label="Test Results" />
        </div>
      </div>
    </div>
  );
}

function RecordPlaceholder({ icon: Icon, label }) {
  return (
    <div className="rounded-xl bg-[#fffafb] p-5">
      <Icon className="mx-auto text-[#a71930]" size={22} />

      <p className="mt-2 text-sm font-semibold text-gray-600">{label}</p>
    </div>
  );
}
