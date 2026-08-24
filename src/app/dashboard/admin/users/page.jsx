"use client";

import { useState } from "react";
import { Search, UserCheck, UserX, Trash2, Users } from "lucide-react";

const demoUsers = [
  {
    id: "PAT-001",
    name: "Sabila Khan",
    email: "sabila@example.com",
    role: "patient",
    status: "active",
  },
  {
    id: "DOC-001",
    name: "Marzan Kabir",
    email: "marzan@example.com",
    role: "doctor",
    status: "active",
  },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(demoUsers);

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.id.toLowerCase().includes(value)
    );
  });

  const toggleStatus = (id) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "suspended" : "active",
            }
          : user,
      ),
    );
  };

  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?",
    );

    if (!confirmed) return;

    setUsers((previous) => previous.filter((user) => user.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">USER MANAGEMENT</p>

        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Patient & Doctor Directory
        </h1>

        <p className="mt-2 text-gray-500">
          Manage system access and account status.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or ID..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#a71930] focus:ring-4 focus:ring-[#fff1f3]"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="bg-[#fffafb]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] font-bold text-[#a71930]">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-bold text-gray-800">{user.name}</p>

                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                    {user.id}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#fff1f3] px-3 py-1 text-xs font-bold capitalize text-[#a71930]">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        user.status === "active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-[#fff1f3] hover:text-[#a71930]"
                        title="Suspend / Activate"
                      >
                        {user.status === "active" ? (
                          <UserX size={18} />
                        ) : (
                          <UserCheck size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <Users className="mx-auto text-gray-300" size={40} />

            <p className="mt-3 font-semibold text-gray-500">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
