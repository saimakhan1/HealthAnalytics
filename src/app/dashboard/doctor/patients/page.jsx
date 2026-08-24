"use client";

import { Search, UserRound, Activity } from "lucide-react";
import { useState } from "react";

export default function DoctorPatientsPage() {
  const [patientId, setPatientId] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">PATIENT INDEX</p>

        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Patient Search
        </h1>

        <p className="mt-2 text-gray-500">
          Search patient records using a unique Patient ID.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearched(true);
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter Patient ID..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#a71930] focus:ring-4 focus:ring-[#fff1f3]"
            />
          </div>

          <button className="rounded-xl bg-[#a71930] px-7 py-3 font-bold text-white hover:bg-[#7f1025]">
            Search Patient
          </button>
        </form>
      </div>

      {searched && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <UserRound className="mx-auto text-gray-300" size={42} />

          <h2 className="mt-4 text-xl font-bold text-[#5c0b1b]">
            Patient Search Ready
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Patient database integration will display the selected patient's
            health analytics here.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-xl bg-[#fff1f3] px-4 py-3 text-sm font-semibold text-[#a71930]">
              <Activity size={17} />
              Patient ID: {patientId || "Not entered"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
