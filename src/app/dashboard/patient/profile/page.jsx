"use client";

import { useState } from "react";
import { Save, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PatientProfile() {
  const { user, refreshUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const response = await fetch("/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to update profile.");
        return;
      }

      await refreshUser();

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">MY PROFILE</p>

        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Profile Settings
        </h1>

        <p className="mt-2 text-gray-500">Manage your personal information.</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[#5c0b1b] to-[#a71930] p-8 text-white">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-3xl font-extrabold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>

              <p className="mt-1 capitalize text-white/70">
                {user?.role} account
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          {message && (
            <div className="rounded-xl bg-[#fff1f3] px-4 py-3 text-sm font-medium text-[#8f1730]">
              {message}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#a71930] focus:ring-4 focus:ring-[#fff1f3]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              value={user?.email || ""}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Account Type
            </label>

            <div className="flex items-center gap-3 rounded-xl bg-[#fff1f3] px-4 py-3">
              <UserCircle size={20} className="text-[#a71930]" />

              <span className="font-semibold capitalize text-[#681225]">
                {user?.role}
              </span>
            </div>
          </div>

          <button
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#a71930] px-6 py-3 font-bold text-white transition hover:bg-[#7f1025] disabled:opacity-60"
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
