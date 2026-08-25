"use client";

import { useState, useEffect } from "react";
import { Search, UserCheck, UserX, Trash2, Users, Loader2 } from "lucide-react";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load real users on mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/admin/users", {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users.");
        }

        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // Handle Role Change (Promote to Admin / Change Role)
  const changeRole = async (userId, newRole) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, newRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update role.");
      }

      // Update state locally
      setUsers((previous) =>
        previous.map((user) => {
          const id = user._id || user.id;
          return id === userId ? { ...user, role: newRole } : user;
        }),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleStatus = (id) => {
    setUsers((previous) =>
      previous.map((user) => {
        const userId = user._id || user.id;
        if (userId === id) {
          return {
            ...user,
            status: user.status === "active" ? "suspended" : "active",
          };
        }
        return user;
      }),
    );
  };

  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?",
    );

    if (!confirmed) return;

    setUsers((previous) =>
      previous.filter((user) => (user._id || user.id) !== id),
    );
  };

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();
    const userId = (user._id || user.id || "").toString();

    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      userId.toLowerCase().includes(value)
    );
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">USER MANAGEMENT</p>

        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Patient & Doctor Directory
        </h1>

        <p className="mt-2 text-gray-500">
          Manage system access, account status, and admin privileges.
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
        {loading ? (
          <div className="flex h-64 items-center justify-center gap-3 text-gray-500">
            <Loader2 className="animate-spin" size={24} />
            <p className="font-medium">Loading directory...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center font-medium text-red-600">
            {error}
          </div>
        ) : (
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
                {filteredUsers.map((user) => {
                  const id = (user._id || user.id).toString();
                  const status = user.status || "active";

                  return (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] font-bold text-[#a71930]">
                            {user.name ? user.name.charAt(0) : "U"}
                          </div>

                          <div>
                            <p className="font-bold text-gray-800">
                              {user.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                        {id.slice(-6).toUpperCase()}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => changeRole(id, e.target.value)}
                          className="cursor-pointer rounded-full border border-transparent bg-[#fff1f3] px-3 py-1 text-xs font-bold capitalize text-[#a71930] outline-none transition focus:border-[#a71930]"
                        >
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            status === "active"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => toggleStatus(id)}
                            className="rounded-lg p-2 text-gray-500 hover:bg-[#fff1f3] hover:text-[#a71930]"
                            title="Suspend / Activate"
                          >
                            {status === "active" ? (
                              <UserX size={18} />
                            ) : (
                              <UserCheck size={18} />
                            )}
                          </button>

                          <button
                            onClick={() => deleteUser(id)}
                            className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <Users className="mx-auto text-gray-300" size={40} />

            <p className="mt-3 font-semibold text-gray-500">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
