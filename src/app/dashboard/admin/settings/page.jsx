"use client";

import { Database, RefreshCcw, Settings2, Trash2 } from "lucide-react";

export default function AdminSettingsPage() {
  const clearBrowserCache = () => {
    const confirmed = window.confirm(
      "This will clear browser-side application data. Continue?",
    );

    if (!confirmed) return;

    localStorage.clear();

    alert("Browser-side data cleared.");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">
          SYSTEM CONFIGURATION
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          System Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Configure mock data and system behavior.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <SettingCard
          icon={Database}
          title="Database"
          description="HealthAnalytics currently uses your MongoDB backend for authentication and user data."
        />

        <SettingCard
          icon={Settings2}
          title="AI Processing"
          description="Gemini processing can be connected to the document upload workflow."
        />

        <SettingCard
          icon={RefreshCcw}
          title="Mock Dataset"
          description="Use predefined patient records for assessment demonstrations."
          action={
            <button
              onClick={() => alert("Mock dataset feature is ready to connect.")}
              className="rounded-xl bg-[#a71930] px-4 py-2 text-sm font-bold text-white hover:bg-[#7f1025]"
            >
              Load Dataset
            </button>
          }
        />

        <SettingCard
          icon={Trash2}
          title="Clear Browser Data"
          description="Remove browser-side application data used by the frontend."
          action={
            <button
              onClick={clearBrowserCache}
              className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
            >
              Clear Data
            </button>
          }
        />
      </div>
    </div>
  );
}

function SettingCard({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
        <Icon size={22} />
      </div>

      <h2 className="mt-5 font-bold text-[#5c0b1b]">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
