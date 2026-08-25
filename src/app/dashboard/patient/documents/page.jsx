"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, X, CheckCircle2, UserCheck, Pill } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function PatientDocuments() {
  const inputRef = useRef(null);
  const { user } = useAuth();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    fetchDoctors();
    if (user?._id) fetchPatientRecords();
  }, [user]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      if (data.success) setDoctors(data.doctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const fetchPatientRecords = async () => {
    try {
      const res = await fetch(`/api/patient/documents?patientId=${user._id}`);
      const data = await res.json();
      if (data.success) setRecords(data.records);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  const handleFiles = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "image/png" ||
        file.type === "image/jpeg",
    );

    if (validFiles.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Format",
        text: "Please upload PDF, PNG, or JPEG files.",
        confirmButtonColor: "#a71930",
      });
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleSubmit = async () => {
    if (!selectedDoctor) {
      return Swal.fire({
        icon: "warning",
        title: "Doctor Not Selected",
        text: "Please choose a doctor to send your documents to.",
        confirmButtonColor: "#a71930",
      });
    }

    if (files.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Document Chosen",
        text: "Please upload at least one file.",
        confirmButtonColor: "#a71930",
      });
    }

    if (!user?._id) {
      return Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please log in again before submitting.",
        confirmButtonColor: "#a71930",
      });
    }

    setLoading(true);

    try {
      const fakeUploadedUrl = URL.createObjectURL(files[0]);

      const res = await fetch("/api/patient/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: user._id,
          doctorId: selectedDoctor,
          documentUrl: fakeUploadedUrl,
          documentName: files[0].name,
          notes,
        }),
      });

      const contentType = res.headers.get("content-type");
      let data = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(
          `Server responded with ${res.status}: ${text || res.statusText}`,
        );
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

      Swal.fire({
        icon: "success",
        title: "Document Sent!",
        text: "Your medical record has been submitted to your doctor.",
        confirmButtonColor: "#a71930",
      });

      setFiles([]);
      setNotes("");
      fetchPatientRecords();
    } catch (err) {
      console.error("Submission Error:", err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message || "Failed to submit document. Try again.",
        confirmButtonColor: "#a71930",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">DOCUMENT CENTER</p>
        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Upload Medical Records for Your Doctor
        </h1>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-[#5c0b1b]">
          <UserCheck size={20} /> 1. Select Your Doctor
        </h2>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="mt-3 w-full rounded-xl border p-3 focus:border-[#a71930] focus:outline-none"
        >
          <option value="">Choose a doctor from the list...</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              Dr. {doc.name} ({doc.email})
            </option>
          ))}
        </select>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`rounded-3xl border-2 border-dashed p-10 text-center transition ${
          dragging
            ? "border-[#a71930] bg-[#fff1f3]"
            : "border-[#e6c7cd] bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1f3] text-[#a71930]">
          <Upload size={28} />
        </div>
        <h2 className="mt-5 text-xl font-bold text-[#5c0b1b]">
          2. Drop medical history files here
        </h2>
        <p className="mt-2 text-sm text-gray-500">PDF, PNG, or JPEG</p>
        <button
          onClick={() => inputRef.current?.click()}
          className="mt-6 rounded-xl bg-[#a71930] px-6 py-3 font-bold text-white hover:bg-[#7f1025]"
        >
          Choose Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-4 rounded-2xl border bg-white p-6">
          <h3 className="font-bold text-[#5c0b1b]">Selected Documents</h3>
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border p-3"
            >
              <span className="truncate font-medium">{file.name}</span>
              <button
                onClick={() => setFiles(files.filter((_, i) => i !== idx))}
              >
                <X size={18} className="text-red-500" />
              </button>
            </div>
          ))}

          <textarea
            placeholder="Add relevant notes/symptoms for the doctor..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border p-3 text-sm focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#a71930] py-3 font-bold text-white hover:bg-[#7f1025] disabled:opacity-50"
          >
            <CheckCircle2 size={18} />
            {loading ? "Sending..." : "Submit File to Doctor"}
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#5c0b1b]">
          <Pill size={22} /> Prescriptions & Feedback
        </h2>

        {records.length === 0 ? (
          <p className="text-sm text-gray-500">
            No medical records uploaded yet.
          </p>
        ) : (
          <div className="space-y-4">
            {records.map((rec) => (
              <div
                key={rec._id}
                className="space-y-2 rounded-xl border bg-gray-50 p-4"
              >
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-semibold">
                    Doctor: Dr. {rec.doctorId?.name || "Assigned Doctor"}
                  </span>
                  <span>{new Date(rec.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm">
                  <strong>Uploaded Document:</strong> {rec.documentName}
                </p>

                {rec.prescription?.medications ? (
                  <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">
                    <p className="font-bold text-green-800">Prescription:</p>
                    <p>{rec.prescription.medications}</p>
                    {rec.prescription.instructions && (
                      <>
                        <p className="mt-2 font-bold text-green-800">
                          Instructions:
                        </p>
                        <p>{rec.prescription.instructions}</p>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-xs font-medium text-amber-600">
                    Pending Doctor Review
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
