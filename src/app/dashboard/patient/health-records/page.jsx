"use client";

import { useEffect, useState } from "react";
import {
  PlusCircle,
  Activity,
  HeartPulse,
  Scale,
  Droplet,
  Calendar,
  FileText,
} from "lucide-react";

export default function HealthRecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form input state
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    bp: "",
    sugar: "",
    cholesterol: "",
    weight: "",
    notes: "",
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/patient/health-records");
      const data = await res.json();
      if (data.success) setRecords(data.records);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/patient/health-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setFormData({
          title: "",
          date: new Date().toISOString().split("T")[0],
          bp: "",
          sugar: "",
          cholesterol: "",
          weight: "",
          notes: "",
        });
        fetchRecords(); // Reload data
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#a71930]">
            PERSONAL TRACKER
          </p>
          <h1 className="text-3xl font-extrabold text-[#5c0b1b]">
            Health Records
          </h1>
          <p className="text-sm text-gray-500">
            Keep track of your blood pressure, sugar levels, and report history.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-xl bg-[#a71930] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#851326]"
        >
          <PlusCircle size={18} />
          {showForm ? "Close Form" : "Add New Record"}
        </button>
      </div>

      {/* Manual Data Entry Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-red-100 bg-[#fffcfc] p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-[#5c0b1b]">
            Add New Health Record
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Record Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Blood Test or Daily Checkup"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#a71930]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#a71930]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Blood Pressure (BP)
              </label>
              <input
                type="text"
                placeholder="e.g., 120/80"
                value={formData.bp}
                onChange={(e) =>
                  setFormData({ ...formData, bp: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#a71930]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Blood Sugar (mmol/L or mg/dL)
              </label>
              <input
                type="text"
                placeholder="e.g., 6.5 mmol/L"
                value={formData.sugar}
                onChange={(e) =>
                  setFormData({ ...formData, sugar: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#a71930]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Lipid / Cholesterol (mg/dL)
              </label>
              <input
                type="text"
                placeholder="e.g., 190 mg/dL"
                value={formData.cholesterol}
                onChange={(e) =>
                  setFormData({ ...formData, cholesterol: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#a71930]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Weight (kg)
              </label>
              <input
                type="text"
                placeholder="e.g., 70 kg"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#a71930]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Comments or Notes (Doctor Suggestions)
            </label>
            <textarea
              rows={2}
              placeholder="Write any additional information..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-[#a71930]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#5c0b1b] py-3 text-sm font-semibold text-white hover:bg-[#420712]"
          >
            Save Record
          </button>
        </form>
      )}

      {/* History Timeline */}
      {loading ? (
        <p className="text-center text-sm text-gray-400 py-10">Loading...</p>
      ) : records.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <Activity className="mx-auto text-[#a71930]" size={36} />
          <h2 className="mt-4 text-lg font-bold text-gray-700">
            No health records found
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Click the "Add New Record" button above to save your information.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-bold text-[#5c0b1b]">
                  {item.title}
                </h3>
                <span className="flex items-center gap-1.5 rounded-full bg-[#fff1f3] px-3 py-1 text-xs font-semibold text-[#a71930]">
                  <Calendar size={13} /> {item.date}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-[#fffafb] p-3 text-center">
                  <HeartPulse className="mx-auto text-[#a71930]" size={20} />
                  <p className="mt-1 text-xs text-gray-500">Blood Pressure</p>
                  <p className="font-bold text-gray-800">{item.bp}</p>
                </div>

                <div className="rounded-xl bg-[#fffafb] p-3 text-center">
                  <Droplet className="mx-auto text-[#a71930]" size={20} />
                  <p className="mt-1 text-xs text-gray-500">Blood Sugar</p>
                  <p className="font-bold text-gray-800">{item.sugar}</p>
                </div>

                <div className="rounded-xl bg-[#fffafb] p-3 text-center">
                  <Activity className="mx-auto text-[#a71930]" size={20} />
                  <p className="mt-1 text-xs text-gray-500">
                    Lipid / Cholesterol
                  </p>
                  <p className="font-bold text-gray-800">{item.cholesterol}</p>
                </div>

                <div className="rounded-xl bg-[#fffafb] p-3 text-center">
                  <Scale className="mx-auto text-[#a71930]" size={20} />
                  <p className="mt-1 text-xs text-gray-500">Weight</p>
                  <p className="font-bold text-gray-800">{item.weight}</p>
                </div>
              </div>

              {item.notes && (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                  <FileText
                    size={16}
                    className="text-gray-400 mt-0.5 shrink-0"
                  />
                  <p>{item.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
