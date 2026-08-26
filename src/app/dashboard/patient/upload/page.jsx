// // Helper function to turn a File into a Base64 string
// const convertFileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file); // Converts to "data:application/pdf;base64,..."
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };

// // Inside your submit/upload handler:
// const handleUploadSubmit = async (e) => {
//   e.preventDefault();

//   if (!selectedFile) return;

//   try {
//     // 1. Convert file to Base64
//     const base64String = await convertFileToBase64(selectedFile);

//     // 2. Send the Base64 string to your backend API
//     const response = await fetch("/api/patient/upload", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         documentName: selectedFile.name,
//         fileUrl: base64String, // Store this base64 string in MongoDB
//         doctorId: selectedDoctorId,
//         notes: notes,
//       }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       alert("Uploaded successfully!");
//     }
//   } catch (err) {
//     console.error("Upload error:", err);
//   }
// };

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function PatientUploadPage() {
  const { user } = useAuth();
  const [doctorId, setDoctorId] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ফাইলকে Base64 String-এ রূপান্তর করার ফাংশন
  const convertToBase64 = (fileData) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // ফাইল সিলেক্ট করলে অটোমেটিক ডকুমেন্ট নাম বসিয়ে দেবে
      if (!documentName) {
        setDocumentName(selectedFile.name);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !doctorId) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Data",
        text: "Please select a doctor and a file.",
      });
    }

    setUploading(true);

    try {
      const base64File = await convertToBase64(file);

      const payload = {
        patientId: user._id,
        doctorId: doctorId,
        documentName: documentName || file.name,
        documentUrl: base64File, // ডাটাবেজে আসল ফাইল সেভ হবে (blob না)
        notes: notes,
      };

      const res = await fetch("/api/patient/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Uploaded!",
          text: "Document uploaded successfully.",
          confirmButtonColor: "#a71930",
        });

        // Form Reset
        setFile(null);
        setDocumentName("");
        setNotes("");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err.message || "Failed to upload file.",
        confirmButtonColor: "#a71930",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6 bg-white rounded-2xl shadow-sm border mt-10">
      <h2 className="text-2xl font-bold text-[#5c0b1b] mb-4">
        Upload Health Record
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Doctor ID</label>
          <input
            type="text"
            placeholder="Enter Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a71930]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Document Name
          </label>
          <input
            type="text"
            placeholder="e.g. Blood Test Report"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a71930]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Select Document / Image
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="w-full text-sm border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Notes (Optional)
          </label>
          <textarea
            placeholder="Add any notes for the doctor..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a71930]"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-[#a71930] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#7f1025] transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Submit Record"}
        </button>
      </form>
    </div>
  );
}
