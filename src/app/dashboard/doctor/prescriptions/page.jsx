"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Send, User, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function DoctorPrescriptionsPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [medications, setMedications] = useState("");
  const [instructions, setInstructions] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/doctor/prescriptions?doctorId=${user._id}`);
      const data = await res.json();
      if (data.success) {
        setRecords(data.records);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrescribe = async (recordId) => {
    if (!medications.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter the medication details.",
        confirmButtonColor: "#a71930",
      });
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/doctor/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recordId,
          prescription: { medications, instructions },
        }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Prescription Sent",
          text: "The patient can now view their prescription in their dashboard.",
          confirmButtonColor: "#a71930",
        });

        setSelectedRecord(null);
        setMedications("");
        setInstructions("");
        fetchRecords();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message || "Failed to submit prescription.",
        confirmButtonColor: "#a71930",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">
          PATIENT SUBMISSIONS
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Assigned Health Records & Documents
        </h1>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">
          Loading patient records...
        </div>
      ) : records.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">
            No patient documents assigned to you yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {records.map((rec) => (
            <div
              key={rec._id}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800">
                      {rec.patientId?.name || "Patient Record"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {rec.patientId?.email}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 text-xs">
                  <p className="font-semibold text-gray-600">Document Name:</p>
                  <p className="mt-1 truncate font-medium text-[#a71930]">
                    {rec.documentName}
                  </p>
                  {rec.notes && (
                    <p className="mt-2 text-gray-500">
                      <strong>Notes:</strong> {rec.notes}
                    </p>
                  )}
                </div>

                {rec.prescription?.medications ? (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle size={14} /> Prescription Added
                    </div>
                    <p className="mt-1">{rec.prescription.medications}</p>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-amber-600">
                    Pending Prescription
                  </div>
                )}
              </div>

              <div className="mt-6">
                {selectedRecord === rec._id ? (
                  <div className="space-y-3 rounded-xl border p-4">
                    <textarea
                      placeholder="Enter prescribed medications..."
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      className="w-full rounded-lg border p-2 text-xs focus:outline-none"
                    />
                    <textarea
                      placeholder="Instructions/Dosage (optional)..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full rounded-lg border p-2 text-xs focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePrescribe(rec._id)}
                        disabled={submitting}
                        className="flex-1 rounded-lg bg-[#a71930] py-2 text-xs font-bold text-white hover:bg-[#7f1025]"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setSelectedRecord(null)}
                        className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedRecord(rec._id);
                      setMedications(rec.prescription?.medications || "");
                      setInstructions(rec.prescription?.instructions || "");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff1f3] py-2.5 text-xs font-bold text-[#a71930] hover:bg-[#fbdde3]"
                  >
                    <Send size={14} />
                    {rec.prescription?.medications
                      ? "Update Prescription"
                      : "Add Prescription"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
