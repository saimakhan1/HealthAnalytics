// // // // // // "use client";

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useAuth } from "@/context/AuthContext";
// // // // // // import { Send, User, CheckCircle } from "lucide-react";
// // // // // // import Swal from "sweetalert2";

// // // // // // export default function DoctorPrescriptionsPage() {
// // // // // //   const { user } = useAuth();
// // // // // //   const [records, setRecords] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [selectedRecord, setSelectedRecord] = useState(null);
// // // // // //   const [medications, setMedications] = useState("");
// // // // // //   const [instructions, setInstructions] = useState("");
// // // // // //   const [submitting, setSubmitting] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     if (user?._id) {
// // // // // //       fetchRecords();
// // // // // //     }
// // // // // //   }, [user]);

// // // // // //   const fetchRecords = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const res = await fetch(`/api/doctor/prescriptions?doctorId=${user._id}`);
// // // // // //       const data = await res.json();
// // // // // //       if (data.success) {
// // // // // //         setRecords(data.records);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error(err);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePrescribe = async (recordId) => {
// // // // // //     if (!medications.trim()) {
// // // // // //       return Swal.fire({
// // // // // //         icon: "warning",
// // // // // //         title: "Missing Information",
// // // // // //         text: "Please enter the medication details.",
// // // // // //         confirmButtonColor: "#a71930",
// // // // // //       });
// // // // // //     }

// // // // // //     setSubmitting(true);
// // // // // //     try {
// // // // // //       const res = await fetch("/api/doctor/prescriptions", {
// // // // // //         method: "POST",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify({
// // // // // //           recordId,
// // // // // //           prescription: { medications, instructions },
// // // // // //         }),
// // // // // //       });

// // // // // //       const data = await res.json();

// // // // // //       if (data.success) {
// // // // // //         Swal.fire({
// // // // // //           icon: "success",
// // // // // //           title: "Prescription Sent",
// // // // // //           text: "The patient can now view their prescription in their dashboard.",
// // // // // //           confirmButtonColor: "#a71930",
// // // // // //         });

// // // // // //         setSelectedRecord(null);
// // // // // //         setMedications("");
// // // // // //         setInstructions("");
// // // // // //         fetchRecords();
// // // // // //       } else {
// // // // // //         throw new Error(data.message);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       Swal.fire({
// // // // // //         icon: "error",
// // // // // //         title: "Failed",
// // // // // //         text: err.message || "Failed to submit prescription.",
// // // // // //         confirmButtonColor: "#a71930",
// // // // // //       });
// // // // // //     } finally {
// // // // // //       setSubmitting(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="mx-auto max-w-6xl space-y-8 p-6">
// // // // // //       <div>
// // // // // //         <p className="text-sm font-semibold text-[#a71930]">
// // // // // //           PATIENT SUBMISSIONS
// // // // // //         </p>
// // // // // //         <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
// // // // // //           Assigned Health Records & Documents
// // // // // //         </h1>
// // // // // //       </div>

// // // // // //       {loading ? (
// // // // // //         <div className="py-12 text-center text-gray-500">
// // // // // //           Loading patient records...
// // // // // //         </div>
// // // // // //       ) : records.length === 0 ? (
// // // // // //         <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
// // // // // //           <p className="text-gray-500">
// // // // // //             No patient documents assigned to you yet.
// // // // // //           </p>
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <div className="grid gap-6 md:grid-cols-2">
// // // // // //           {records.map((rec) => (
// // // // // //             <div
// // // // // //               key={rec._id}
// // // // // //               className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
// // // // // //             >
// // // // // //               <div className="space-y-4">
// // // // // //                 <div className="flex items-center gap-3">
// // // // // //                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
// // // // // //                     <User size={20} />
// // // // // //                   </div>
// // // // // //                   <div>
// // // // // //                     <h2 className="font-bold text-gray-800">
// // // // // //                       {rec.patientId?.name || "Patient Record"}
// // // // // //                     </h2>
// // // // // //                     <p className="text-xs text-gray-500">
// // // // // //                       {rec.patientId?.email}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <div className="rounded-xl bg-gray-50 p-3 text-xs">
// // // // // //                   <p className="font-semibold text-gray-600">Document Name:</p>
// // // // // //                   <p className="mt-1 truncate font-medium text-[#a71930]">
// // // // // //                     {rec.documentName}
// // // // // //                   </p>
// // // // // //                   {rec.notes && (
// // // // // //                     <p className="mt-2 text-gray-500">
// // // // // //                       <strong>Notes:</strong> {rec.notes}
// // // // // //                     </p>
// // // // // //                   )}
// // // // // //                 </div>

// // // // // //                 {rec.prescription?.medications ? (
// // // // // //                   <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
// // // // // //                     <div className="flex items-center gap-1.5 font-bold">
// // // // // //                       <CheckCircle size={14} /> Prescription Added
// // // // // //                     </div>
// // // // // //                     <p className="mt-1">{rec.prescription.medications}</p>
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   <div className="text-xs font-semibold text-amber-600">
// // // // // //                     Pending Prescription
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>

// // // // // //               <div className="mt-6">
// // // // // //                 {selectedRecord === rec._id ? (
// // // // // //                   <div className="space-y-3 rounded-xl border p-4">
// // // // // //                     <textarea
// // // // // //                       placeholder="Enter prescribed medications..."
// // // // // //                       value={medications}
// // // // // //                       onChange={(e) => setMedications(e.target.value)}
// // // // // //                       className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// // // // // //                     />
// // // // // //                     <textarea
// // // // // //                       placeholder="Instructions/Dosage (optional)..."
// // // // // //                       value={instructions}
// // // // // //                       onChange={(e) => setInstructions(e.target.value)}
// // // // // //                       className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// // // // // //                     />
// // // // // //                     <div className="flex gap-2">
// // // // // //                       <button
// // // // // //                         onClick={() => handlePrescribe(rec._id)}
// // // // // //                         disabled={submitting}
// // // // // //                         className="flex-1 rounded-lg bg-[#a71930] py-2 text-xs font-bold text-white hover:bg-[#7f1025]"
// // // // // //                       >
// // // // // //                         Submit
// // // // // //                       </button>
// // // // // //                       <button
// // // // // //                         onClick={() => setSelectedRecord(null)}
// // // // // //                         className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700"
// // // // // //                       >
// // // // // //                         Cancel
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   <button
// // // // // //                     onClick={() => {
// // // // // //                       setSelectedRecord(rec._id);
// // // // // //                       setMedications(rec.prescription?.medications || "");
// // // // // //                       setInstructions(rec.prescription?.instructions || "");
// // // // // //                     }}
// // // // // //                     className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff1f3] py-2.5 text-xs font-bold text-[#a71930] hover:bg-[#fbdde3]"
// // // // // //                   >
// // // // // //                     <Send size={14} />
// // // // // //                     {rec.prescription?.medications
// // // // // //                       ? "Update Prescription"
// // // // // //                       : "Add Prescription"}
// // // // // //                   </button>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { useAuth } from "@/context/AuthContext";
// // // // // import { Send, User, CheckCircle, Eye, Download, FileText } from "lucide-react";
// // // // // import Swal from "sweetalert2";

// // // // // export default function DoctorPrescriptionsPage() {
// // // // //   const { user } = useAuth();
// // // // //   const [records, setRecords] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [selectedRecord, setSelectedRecord] = useState(null);
// // // // //   const [medications, setMedications] = useState("");
// // // // //   const [instructions, setInstructions] = useState("");
// // // // //   const [submitting, setSubmitting] = useState(false);

// // // // //   useEffect(() => {
// // // // //     if (user?._id) {
// // // // //       fetchRecords();
// // // // //     }
// // // // //   }, [user]);

// // // // //   const fetchRecords = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const res = await fetch(`/api/doctor/prescriptions?doctorId=${user._id}`);
// // // // //       const data = await res.json();
// // // // //       if (data.success) {
// // // // //         setRecords(data.records);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handlePrescribe = async (recordId) => {
// // // // //     if (!medications.trim()) {
// // // // //       return Swal.fire({
// // // // //         icon: "warning",
// // // // //         title: "Missing Information",
// // // // //         text: "Please enter the medication details.",
// // // // //         confirmButtonColor: "#a71930",
// // // // //       });
// // // // //     }

// // // // //     setSubmitting(true);
// // // // //     try {
// // // // //       const res = await fetch("/api/doctor/prescriptions", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           recordId,
// // // // //           prescription: { medications, instructions },
// // // // //         }),
// // // // //       });

// // // // //       const data = await res.json();

// // // // //       if (data.success) {
// // // // //         Swal.fire({
// // // // //           icon: "success",
// // // // //           title: "Prescription Sent",
// // // // //           text: "The patient can now view their prescription in their dashboard.",
// // // // //           confirmButtonColor: "#a71930",
// // // // //         });

// // // // //         setSelectedRecord(null);
// // // // //         setMedications("");
// // // // //         setInstructions("");
// // // // //         fetchRecords();
// // // // //       } else {
// // // // //         throw new Error(data.message);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       Swal.fire({
// // // // //         icon: "error",
// // // // //         title: "Failed",
// // // // //         text: err.message || "Failed to submit prescription.",
// // // // //         confirmButtonColor: "#a71930",
// // // // //       });
// // // // //     } finally {
// // // // //       setSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="mx-auto max-w-6xl space-y-8 p-6">
// // // // //       <div>
// // // // //         <p className="text-sm font-semibold text-[#a71930]">
// // // // //           PATIENT SUBMISSIONS
// // // // //         </p>
// // // // //         <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
// // // // //           Assigned Health Records & Documents
// // // // //         </h1>
// // // // //       </div>

// // // // //       {loading ? (
// // // // //         <div className="py-12 text-center text-gray-500">
// // // // //           Loading patient records...
// // // // //         </div>
// // // // //       ) : records.length === 0 ? (
// // // // //         <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
// // // // //           <p className="text-gray-500">
// // // // //             No patient documents assigned to you yet.
// // // // //           </p>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <div className="grid gap-6 md:grid-cols-2">
// // // // //           {records.map((rec) => {
// // // // //             // Priority check for common document URL property names in Mongoose models
// // // // //             const fileUrl =
// // // // //               rec.fileUrl || rec.documentUrl || rec.url || rec.filePath;

// // // // //             return (
// // // // //               <div
// // // // //                 key={rec._id}
// // // // //                 className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
// // // // //               >
// // // // //                 <div className="space-y-4">
// // // // //                   <div className="flex items-center gap-3">
// // // // //                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
// // // // //                       <User size={20} />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <h2 className="font-bold text-gray-800">
// // // // //                         {rec.patientId?.name || "Patient Record"}
// // // // //                       </h2>
// // // // //                       <p className="text-xs text-gray-500">
// // // // //                         {rec.patientId?.email}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="rounded-xl bg-gray-50 p-3 text-xs space-y-2">
// // // // //                     <div>
// // // // //                       <p className="font-semibold text-gray-600">
// // // // //                         Document Name:
// // // // //                       </p>
// // // // //                       <p className="mt-0.5 truncate font-medium text-[#a71930]">
// // // // //                         {rec.documentName}
// // // // //                       </p>
// // // // //                     </div>

// // // // //                     {rec.notes && (
// // // // //                       <p className="text-gray-500">
// // // // //                         <strong>Notes:</strong> {rec.notes}
// // // // //                       </p>
// // // // //                     )}

// // // // //                     {/* View / Download Actions */}
// // // // //                     {fileUrl ? (
// // // // //                       <div className="pt-2 flex items-center gap-2 border-t border-gray-200">
// // // // //                         <a
// // // // //                           href={fileUrl}
// // // // //                           target="_blank"
// // // // //                           rel="noopener noreferrer"
// // // // //                           className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
// // // // //                         >
// // // // //                           <Eye size={13} className="text-[#a71930]" />
// // // // //                           View File
// // // // //                         </a>
// // // // //                         <a
// // // // //                           href={fileUrl}
// // // // //                           download
// // // // //                           target="_blank"
// // // // //                           rel="noopener noreferrer"
// // // // //                           className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
// // // // //                         >
// // // // //                           <Download size={13} className="text-[#a71930]" />
// // // // //                           Download
// // // // //                         </a>
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <div className="pt-1 text-gray-400 italic flex items-center gap-1">
// // // // //                         <FileText size={12} /> No file link attached
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </div>

// // // // //                   {rec.prescription?.medications ? (
// // // // //                     <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
// // // // //                       <div className="flex items-center gap-1.5 font-bold">
// // // // //                         <CheckCircle size={14} /> Prescription Added
// // // // //                       </div>
// // // // //                       <p className="mt-1">{rec.prescription.medications}</p>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <div className="text-xs font-semibold text-amber-600">
// // // // //                       Pending Prescription
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>

// // // // //                 <div className="mt-6">
// // // // //                   {selectedRecord === rec._id ? (
// // // // //                     <div className="space-y-3 rounded-xl border p-4">
// // // // //                       <textarea
// // // // //                         placeholder="Enter prescribed medications..."
// // // // //                         value={medications}
// // // // //                         onChange={(e) => setMedications(e.target.value)}
// // // // //                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// // // // //                       />
// // // // //                       <textarea
// // // // //                         placeholder="Instructions/Dosage (optional)..."
// // // // //                         value={instructions}
// // // // //                         onChange={(e) => setInstructions(e.target.value)}
// // // // //                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// // // // //                       />
// // // // //                       <div className="flex gap-2">
// // // // //                         <button
// // // // //                           onClick={() => handlePrescribe(rec._id)}
// // // // //                           disabled={submitting}
// // // // //                           className="flex-1 rounded-lg bg-[#a71930] py-2 text-xs font-bold text-white hover:bg-[#7f1025]"
// // // // //                         >
// // // // //                           Submit
// // // // //                         </button>
// // // // //                         <button
// // // // //                           onClick={() => setSelectedRecord(null)}
// // // // //                           className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700"
// // // // //                         >
// // // // //                           Cancel
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <button
// // // // //                       onClick={() => {
// // // // //                         setSelectedRecord(rec._id);
// // // // //                         setMedications(rec.prescription?.medications || "");
// // // // //                         setInstructions(rec.prescription?.instructions || "");
// // // // //                       }}
// // // // //                       className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff1f3] py-2.5 text-xs font-bold text-[#a71930] hover:bg-[#fbdde3]"
// // // // //                     >
// // // // //                       <Send size={14} />
// // // // //                       {rec.prescription?.medications
// // // // //                         ? "Update Prescription"
// // // // //                         : "Add Prescription"}
// // // // //                     </button>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>
// // // // //             );
// // // // //           })}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { useAuth } from "@/context/AuthContext";
// // // // import { Send, User, CheckCircle, Eye, Download, FileText } from "lucide-react";
// // // // import Swal from "sweetalert2";

// // // // export default function DoctorPrescriptionsPage() {
// // // //   const { user } = useAuth();
// // // //   const [records, setRecords] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [selectedRecord, setSelectedRecord] = useState(null);
// // // //   const [medications, setMedications] = useState("");
// // // //   const [instructions, setInstructions] = useState("");
// // // //   const [submitting, setSubmitting] = useState(false);

// // // //   useEffect(() => {
// // // //     if (user?._id) {
// // // //       fetchRecords();
// // // //     }
// // // //   }, [user]);

// // // //   const fetchRecords = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await fetch(`/api/doctor/prescriptions?doctorId=${user._id}`);
// // // //       const data = await res.json();
// // // //       if (data.success) {
// // // //         setRecords(data.records);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Safe file downloader handling Blob URLs, Base64 strings, and Standard HTTP URLs
// // // //   const handleDownloadFile = async (fileUrl, fileName = "patient_document") => {
// // // //     if (!fileUrl) return;

// // // //     // Direct download trigger for Blob URLs and Data URLs without calling fetch()
// // // //     if (fileUrl.startsWith("blob:") || fileUrl.startsWith("data:")) {
// // // //       const link = document.createElement("a");
// // // //       link.href = fileUrl;
// // // //       link.download = fileName;
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       document.body.removeChild(link);
// // // //       return;
// // // //     }

// // // //     // Standard HTTP/HTTPS remote URLs
// // // //     try {
// // // //       const response = await fetch(fileUrl);
// // // //       const blob = await response.blob();
// // // //       const blobObjectUrl = URL.createObjectURL(blob);

// // // //       const link = document.createElement("a");
// // // //       link.href = blobObjectUrl;
// // // //       link.download = fileName;
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       document.body.removeChild(link);

// // // //       setTimeout(() => URL.revokeObjectURL(blobObjectUrl), 500);
// // // //     } catch (err) {
// // // //       console.error("Download error:", err);
// // // //       // Fallback redirect
// // // //       window.open(fileUrl, "_blank");
// // // //     }
// // // //   };

// // // //   // Safe file viewer in new tab handling Blob URLs, Base64 strings, and Standard HTTP URLs
// // // //   const handleViewFile = async (fileUrl) => {
// // // //     if (!fileUrl) return;

// // // //     // Handle Blob URLs or Data URLs directly
// // // //     if (fileUrl.startsWith("blob:") || fileUrl.startsWith("data:")) {
// // // //       const newWindow = window.open();
// // // //       if (newWindow) {
// // // //         newWindow.document.write(
// // // //           `<html>
// // // //             <head><title>Patient Document Preview</title></head>
// // // //             <body style="margin:0; background:#1e1e1e; display:flex; justify-content:center; align-items:center; height:100vh;">
// // // //               <iframe src="${fileUrl}" style="width:100%; height:100%; border:none;"></iframe>
// // // //             </body>
// // // //           </html>`,
// // // //         );
// // // //       }
// // // //       return;
// // // //     }

// // // //     // Handle Standard HTTP/HTTPS remote URLs
// // // //     try {
// // // //       const response = await fetch(fileUrl);
// // // //       const blob = await response.blob();
// // // //       const reader = new FileReader();

// // // //       reader.onloadend = () => {
// // // //         const base64data = reader.result;
// // // //         const newWindow = window.open();
// // // //         if (newWindow) {
// // // //           newWindow.document.write(
// // // //             `<html>
// // // //               <head><title>Patient Document Preview</title></head>
// // // //               <body style="margin:0; background:#1e1e1e; display:flex; justify-content:center; align-items:center; height:100vh;">
// // // //                 <iframe src="${base64data}" style="width:100%; height:100%; border:none;"></iframe>
// // // //               </body>
// // // //             </html>`,
// // // //           );
// // // //         }
// // // //       };
// // // //       reader.readAsDataURL(blob);
// // // //     } catch (err) {
// // // //       console.error("View error:", err);
// // // //       window.open(fileUrl, "_blank");
// // // //     }
// // // //   };

// // // //   const handlePrescribe = async (recordId) => {
// // // //     if (!medications.trim()) {
// // // //       return Swal.fire({
// // // //         icon: "warning",
// // // //         title: "Missing Information",
// // // //         text: "Please enter the medication details.",
// // // //         confirmButtonColor: "#a71930",
// // // //       });
// // // //     }

// // // //     setSubmitting(true);
// // // //     try {
// // // //       const res = await fetch("/api/doctor/prescriptions", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           recordId,
// // // //           prescription: { medications, instructions },
// // // //         }),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (data.success) {
// // // //         Swal.fire({
// // // //           icon: "success",
// // // //           title: "Prescription Sent",
// // // //           text: "The patient can now view their prescription in their dashboard.",
// // // //           confirmButtonColor: "#a71930",
// // // //         });

// // // //         setSelectedRecord(null);
// // // //         setMedications("");
// // // //         setInstructions("");
// // // //         fetchRecords();
// // // //       } else {
// // // //         throw new Error(data.message);
// // // //       }
// // // //     } catch (err) {
// // // //       Swal.fire({
// // // //         icon: "error",
// // // //         title: "Failed",
// // // //         text: err.message || "Failed to submit prescription.",
// // // //         confirmButtonColor: "#a71930",
// // // //       });
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="mx-auto max-w-6xl space-y-8 p-6">
// // // //       <div>
// // // //         <p className="text-sm font-semibold text-[#a71930]">
// // // //           PATIENT SUBMISSIONS
// // // //         </p>
// // // //         <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
// // // //           Assigned Health Records & Documents
// // // //         </h1>
// // // //       </div>

// // // //       {loading ? (
// // // //         <div className="py-12 text-center text-gray-500">
// // // //           Loading patient records...
// // // //         </div>
// // // //       ) : records.length === 0 ? (
// // // //         <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
// // // //           <p className="text-gray-500">
// // // //             No patient documents assigned to you yet.
// // // //           </p>
// // // //         </div>
// // // //       ) : (
// // // //         <div className="grid gap-6 md:grid-cols-2">
// // // //           {records.map((rec) => {
// // // //             const fileUrl =
// // // //               rec.fileUrl || rec.documentUrl || rec.url || rec.filePath;

// // // //             return (
// // // //               <div
// // // //                 key={rec._id}
// // // //                 className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
// // // //               >
// // // //                 <div className="space-y-4">
// // // //                   <div className="flex items-center gap-3">
// // // //                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
// // // //                       <User size={20} />
// // // //                     </div>
// // // //                     <div>
// // // //                       <h2 className="font-bold text-gray-800">
// // // //                         {rec.patientId?.name || "Patient Record"}
// // // //                       </h2>
// // // //                       <p className="text-xs text-gray-500">
// // // //                         {rec.patientId?.email}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="rounded-xl bg-gray-50 p-3 text-xs space-y-2">
// // // //                     <div>
// // // //                       <p className="font-semibold text-gray-600">
// // // //                         Document Name:
// // // //                       </p>
// // // //                       <p className="mt-0.5 truncate font-medium text-[#a71930]">
// // // //                         {rec.documentName}
// // // //                       </p>
// // // //                     </div>

// // // //                     {rec.notes && (
// // // //                       <p className="text-gray-500">
// // // //                         <strong>Notes:</strong> {rec.notes}
// // // //                       </p>
// // // //                     )}

// // // //                     {/* View / Download Actions */}
// // // //                     {fileUrl ? (
// // // //                       <div className="pt-2 flex items-center gap-2 border-t border-gray-200">
// // // //                         <button
// // // //                           type="button"
// // // //                           onClick={() => handleViewFile(fileUrl)}
// // // //                           className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
// // // //                         >
// // // //                           <Eye size={13} className="text-[#a71930]" />
// // // //                           View File
// // // //                         </button>
// // // //                         <button
// // // //                           type="button"
// // // //                           onClick={() =>
// // // //                             handleDownloadFile(fileUrl, rec.documentName)
// // // //                           }
// // // //                           className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
// // // //                         >
// // // //                           <Download size={13} className="text-[#a71930]" />
// // // //                           Download
// // // //                         </button>
// // // //                       </div>
// // // //                     ) : (
// // // //                       <div className="pt-1 text-gray-400 italic flex items-center gap-1">
// // // //                         <FileText size={12} /> No file link attached
// // // //                       </div>
// // // //                     )}
// // // //                   </div>

// // // //                   {rec.prescription?.medications ? (
// // // //                     <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
// // // //                       <div className="flex items-center gap-1.5 font-bold">
// // // //                         <CheckCircle size={14} /> Prescription Added
// // // //                       </div>
// // // //                       <p className="mt-1">{rec.prescription.medications}</p>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="text-xs font-semibold text-amber-600">
// // // //                       Pending Prescription
// // // //                     </div>
// // // //                   )}
// // // //                 </div>

// // // //                 <div className="mt-6">
// // // //                   {selectedRecord === rec._id ? (
// // // //                     <div className="space-y-3 rounded-xl border p-4">
// // // //                       <textarea
// // // //                         placeholder="Enter prescribed medications..."
// // // //                         value={medications}
// // // //                         onChange={(e) => setMedications(e.target.value)}
// // // //                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// // // //                       />
// // // //                       <textarea
// // // //                         placeholder="Instructions/Dosage (optional)..."
// // // //                         value={instructions}
// // // //                         onChange={(e) => setInstructions(e.target.value)}
// // // //                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// // // //                       />
// // // //                       <div className="flex gap-2">
// // // //                         <button
// // // //                           onClick={() => handlePrescribe(rec._id)}
// // // //                           disabled={submitting}
// // // //                           className="flex-1 rounded-lg bg-[#a71930] py-2 text-xs font-bold text-white hover:bg-[#7f1025]"
// // // //                         >
// // // //                           Submit
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => setSelectedRecord(null)}
// // // //                           className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700"
// // // //                         >
// // // //                           Cancel
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <button
// // // //                       onClick={() => {
// // // //                         setSelectedRecord(rec._id);
// // // //                         setMedications(rec.prescription?.medications || "");
// // // //                         setInstructions(rec.prescription?.instructions || "");
// // // //                       }}
// // // //                       className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff1f3] py-2.5 text-xs font-bold text-[#a71930] hover:bg-[#fbdde3]"
// // // //                     >
// // // //                       <Send size={14} />
// // // //                       {rec.prescription?.medications
// // // //                         ? "Update Prescription"
// // // //                         : "Add Prescription"}
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useAuth } from "@/context/AuthContext";
// // // import { Send, User, CheckCircle, Eye, Download, FileText } from "lucide-react";
// // // import Swal from "sweetalert2";

// // // export default function DoctorPrescriptionsPage() {
// // //   const { user } = useAuth();
// // //   const [records, setRecords] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedRecord, setSelectedRecord] = useState(null);
// // //   const [medications, setMedications] = useState("");
// // //   const [instructions, setInstructions] = useState("");
// // //   const [submitting, setSubmitting] = useState(false);

// // //   useEffect(() => {
// // //     if (user?._id) {
// // //       fetchRecords();
// // //     }
// // //   }, [user]);

// // //   const fetchRecords = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await fetch(`/api/doctor/prescriptions?doctorId=${user._id}`);
// // //       const data = await res.json();
// // //       if (data.success) {
// // //         setRecords(data.records);
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Handles File Downloads for Base64 and HTTP/HTTPS URLs
// // //   const handleDownloadFile = (fileUrl, fileName = "patient_document") => {
// // //     if (!fileUrl) return;

// // //     if (fileUrl.startsWith("blob:")) {
// // //       Swal.fire({
// // //         icon: "error",
// // //         title: "Invalid File Link",
// // //         text: "This file was saved as a temporary browser blob URL by the patient. Please re-upload the document.",
// // //         confirmButtonColor: "#a71930",
// // //       });
// // //       return;
// // //     }

// // //     const link = document.createElement("a");
// // //     link.href = fileUrl;
// // //     link.download = fileName;
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //   };

// // //   // Handles File Preview for Base64 and HTTP/HTTPS URLs
// // //   const handleViewFile = (fileUrl) => {
// // //     if (!fileUrl) return;

// // //     if (fileUrl.startsWith("blob:")) {
// // //       Swal.fire({
// // //         icon: "error",
// // //         title: "Invalid File Link",
// // //         text: "This file was saved as a temporary browser blob URL by the patient. Please re-upload the document.",
// // //         confirmButtonColor: "#a71930",
// // //       });
// // //       return;
// // //     }

// // //     // Open Base64 or HTTP file directly in a new window
// // //     const win = window.open();
// // //     if (win) {
// // //       win.document.write(`
// // //         <html>
// // //           <head><title>Patient Document Preview</title></head>
// // //           <body style="margin:0; background:#1e1e1e; display:flex; justify-content:center; align-items:center; height:100vh;">
// // //             <iframe src="${fileUrl}" style="width:100%; height:100%; border:none;"></iframe>
// // //           </body>
// // //         </html>
// // //       `);
// // //     }
// // //   };

// // //   const handlePrescribe = async (recordId) => {
// // //     if (!medications.trim()) {
// // //       return Swal.fire({
// // //         icon: "warning",
// // //         title: "Missing Information",
// // //         text: "Please enter the medication details.",
// // //         confirmButtonColor: "#a71930",
// // //       });
// // //     }

// // //     setSubmitting(true);
// // //     try {
// // //       const res = await fetch("/api/doctor/prescriptions", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           recordId,
// // //           prescription: { medications, instructions },
// // //         }),
// // //       });

// // //       const data = await res.json();

// // //       if (data.success) {
// // //         Swal.fire({
// // //           icon: "success",
// // //           title: "Prescription Sent",
// // //           text: "The patient can now view their prescription in their dashboard.",
// // //           confirmButtonColor: "#a71930",
// // //         });

// // //         setSelectedRecord(null);
// // //         setMedications("");
// // //         setInstructions("");
// // //         fetchRecords();
// // //       } else {
// // //         throw new Error(data.message);
// // //       }
// // //     } catch (err) {
// // //       Swal.fire({
// // //         icon: "error",
// // //         title: "Failed",
// // //         text: err.message || "Failed to submit prescription.",
// // //         confirmButtonColor: "#a71930",
// // //       });
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="mx-auto max-w-6xl space-y-8 p-6">
// // //       <div>
// // //         <p className="text-sm font-semibold text-[#a71930]">
// // //           PATIENT SUBMISSIONS
// // //         </p>
// // //         <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
// // //           Assigned Health Records & Documents
// // //         </h1>
// // //       </div>

// // //       {loading ? (
// // //         <div className="py-12 text-center text-gray-500">
// // //           Loading patient records...
// // //         </div>
// // //       ) : records.length === 0 ? (
// // //         <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
// // //           <p className="text-gray-500">
// // //             No patient documents assigned to you yet.
// // //           </p>
// // //         </div>
// // //       ) : (
// // //         <div className="grid gap-6 md:grid-cols-2">
// // //           {records.map((rec) => {
// // //             const fileUrl =
// // //               rec.fileUrl || rec.documentUrl || rec.url || rec.filePath;

// // //             return (
// // //               <div
// // //                 key={rec._id}
// // //                 className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
// // //               >
// // //                 <div className="space-y-4">
// // //                   <div className="flex items-center gap-3">
// // //                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
// // //                       <User size={20} />
// // //                     </div>
// // //                     <div>
// // //                       <h2 className="font-bold text-gray-800">
// // //                         {rec.patientId?.name || "Patient Record"}
// // //                       </h2>
// // //                       <p className="text-xs text-gray-500">
// // //                         {rec.patientId?.email}
// // //                       </p>
// // //                     </div>
// // //                   </div>

// // //                   <div className="rounded-xl bg-gray-50 p-3 text-xs space-y-2">
// // //                     <div>
// // //                       <p className="font-semibold text-gray-600">
// // //                         Document Name:
// // //                       </p>
// // //                       <p className="mt-0.5 truncate font-medium text-[#a71930]">
// // //                         {rec.documentName}
// // //                       </p>
// // //                     </div>

// // //                     {rec.notes && (
// // //                       <p className="text-gray-500">
// // //                         <strong>Notes:</strong> {rec.notes}
// // //                       </p>
// // //                     )}

// // //                     {/* View / Download Actions */}
// // //                     {fileUrl ? (
// // //                       <div className="pt-2 flex items-center gap-2 border-t border-gray-200">
// // //                         <button
// // //                           type="button"
// // //                           onClick={() => handleViewFile(fileUrl)}
// // //                           className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
// // //                         >
// // //                           <Eye size={13} className="text-[#a71930]" />
// // //                           View File
// // //                         </button>
// // //                         <button
// // //                           type="button"
// // //                           onClick={() =>
// // //                             handleDownloadFile(fileUrl, rec.documentName)
// // //                           }
// // //                           className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
// // //                         >
// // //                           <Download size={13} className="text-[#a71930]" />
// // //                           Download
// // //                         </button>
// // //                       </div>
// // //                     ) : (
// // //                       <div className="pt-1 text-gray-400 italic flex items-center gap-1">
// // //                         <FileText size={12} /> No file link attached
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {rec.prescription?.medications ? (
// // //                     <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
// // //                       <div className="flex items-center gap-1.5 font-bold">
// // //                         <CheckCircle size={14} /> Prescription Added
// // //                       </div>
// // //                       <p className="mt-1">{rec.prescription.medications}</p>
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-xs font-semibold text-amber-600">
// // //                       Pending Prescription
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 <div className="mt-6">
// // //                   {selectedRecord === rec._id ? (
// // //                     <div className="space-y-3 rounded-xl border p-4">
// // //                       <textarea
// // //                         placeholder="Enter prescribed medications..."
// // //                         value={medications}
// // //                         onChange={(e) => setMedications(e.target.value)}
// // //                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// // //                       />
// // //                       <textarea
// // //                         placeholder="Instructions/Dosage (optional)..."
// // //                         value={instructions}
// // //                         onChange={(e) => setInstructions(e.target.value)}
// // //                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// // //                       />
// // //                       <div className="flex gap-2">
// // //                         <button
// // //                           onClick={() => handlePrescribe(rec._id)}
// // //                           disabled={submitting}
// // //                           className="flex-1 rounded-lg bg-[#a71930] py-2 text-xs font-bold text-white hover:bg-[#7f1025]"
// // //                         >
// // //                           Submit
// // //                         </button>
// // //                         <button
// // //                           onClick={() => setSelectedRecord(null)}
// // //                           className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700"
// // //                         >
// // //                           Cancel
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <button
// // //                       onClick={() => {
// // //                         setSelectedRecord(rec._id);
// // //                         setMedications(rec.prescription?.medications || "");
// // //                         setInstructions(rec.prescription?.instructions || "");
// // //                       }}
// // //                       className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff1f3] py-2.5 text-xs font-bold text-[#a71930] hover:bg-[#fbdde3]"
// // //                     >
// // //                       <Send size={14} />
// // //                       {rec.prescription?.medications
// // //                         ? "Update Prescription"
// // //                         : "Add Prescription"}
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useAuth } from "@/context/AuthContext";
// // import { Send, User, CheckCircle, Eye, FileText } from "lucide-react";
// // import Swal from "sweetalert2";

// // export default function DoctorPrescriptionsPage() {
// //   const { user } = useAuth();
// //   const [records, setRecords] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedRecord, setSelectedRecord] = useState(null);
// //   const [medications, setMedications] = useState("");
// //   const [instructions, setInstructions] = useState("");
// //   const [submitting, setSubmitting] = useState(false);

// //   useEffect(() => {
// //     if (user?._id) {
// //       fetchRecords();
// //     }
// //   }, [user]);

// //   const fetchRecords = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await fetch(`/api/doctor/prescriptions?doctorId=${user._id}`);
// //       const data = await res.json();
// //       if (data.success) {
// //         setRecords(data.records);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Displays Image / PDF directly inside SweetAlert2 modal
// //   const handleViewFile = (fileUrl, fileName = "Patient Document") => {
// //     if (!fileUrl) return;

// //     if (fileUrl.startsWith("blob:")) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Invalid File Link",
// //         text: "This file was saved as a temporary browser blob URL by the patient. Please request a re-upload.",
// //         confirmButtonColor: "#a71930",
// //       });
// //       return;
// //     }

// //     // Check if file is a PDF (by extension or base64 mime type)
// //     const isPdf =
// //       fileUrl.includes("application/pdf") || fileUrl.endsWith(".pdf");

// //     if (isPdf) {
// //       Swal.fire({
// //         title: fileName,
// //         html: `<iframe src="${fileUrl}" style="width:100%; height:450px; border:none; border-radius:8px;"></iframe>`,
// //         width: 700,
// //         showCloseButton: true,
// //         confirmButtonColor: "#a71930",
// //         confirmButtonText: "Close",
// //       });
// //     } else {
// //       // Handles images (Base64 data URIs or standard Image URLs)
// //       Swal.fire({
// //         title: fileName,
// //         imageUrl: fileUrl,
// //         imageAlt: "Patient Document Image",
// //         imageWidth: 600,
// //         imageHeight: "auto",
// //         showCloseButton: true,
// //         confirmButtonColor: "#a71930",
// //         confirmButtonText: "Close",
// //       });
// //     }
// //   };

// //   const handlePrescribe = async (recordId) => {
// //     if (!medications.trim()) {
// //       return Swal.fire({
// //         icon: "warning",
// //         title: "Missing Information",
// //         text: "Please enter the medication details.",
// //         confirmButtonColor: "#a71930",
// //       });
// //     }

// //     setSubmitting(true);
// //     try {
// //       const res = await fetch("/api/doctor/prescriptions", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           recordId,
// //           prescription: { medications, instructions },
// //         }),
// //       });

// //       const data = await res.json();

// //       if (data.success) {
// //         Swal.fire({
// //           icon: "success",
// //           title: "Prescription Sent",
// //           text: "The patient can now view their prescription in their dashboard.",
// //           confirmButtonColor: "#a71930",
// //         });

// //         setSelectedRecord(null);
// //         setMedications("");
// //         setInstructions("");
// //         fetchRecords();
// //       } else {
// //         throw new Error(data.message);
// //       }
// //     } catch (err) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Failed",
// //         text: err.message || "Failed to submit prescription.",
// //         confirmButtonColor: "#a71930",
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="mx-auto max-w-6xl space-y-8 p-6">
// //       <div>
// //         <p className="text-sm font-semibold text-[#a71930]">
// //           PATIENT SUBMISSIONS
// //         </p>
// //         <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
// //           Assigned Health Records & Documents
// //         </h1>
// //       </div>

// //       {loading ? (
// //         <div className="py-12 text-center text-gray-500">
// //           Loading patient records...
// //         </div>
// //       ) : records.length === 0 ? (
// //         <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
// //           <p className="text-gray-500">
// //             No patient documents assigned to you yet.
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="grid gap-6 md:grid-cols-2">
// //           {records.map((rec) => {
// //             const fileUrl =
// //               rec.fileUrl || rec.documentUrl || rec.url || rec.filePath;

// //             return (
// //               <div
// //                 key={rec._id}
// //                 className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
// //               >
// //                 <div className="space-y-4">
// //                   <div className="flex items-center gap-3">
// //                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
// //                       <User size={20} />
// //                     </div>
// //                     <div>
// //                       <h2 className="font-bold text-gray-800">
// //                         {rec.patientId?.name || "Patient Record"}
// //                       </h2>
// //                       <p className="text-xs text-gray-500">
// //                         {rec.patientId?.email}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="rounded-xl bg-gray-50 p-3 text-xs space-y-2">
// //                     <div>
// //                       <p className="font-semibold text-gray-600">
// //                         Document Name:
// //                       </p>
// //                       <p className="mt-0.5 truncate font-medium text-[#a71930]">
// //                         {rec.documentName}
// //                       </p>
// //                     </div>

// //                     {rec.notes && (
// //                       <p className="text-gray-500">
// //                         <strong>Notes:</strong> {rec.notes}
// //                       </p>
// //                     )}

// //                     {/* View Action (Opens SweetAlert2 Modal) */}
// //                     {fileUrl ? (
// //                       <div className="pt-2 flex items-center gap-2 border-t border-gray-200">
// //                         <button
// //                           type="button"
// //                           onClick={() =>
// //                             handleViewFile(fileUrl, rec.documentName)
// //                           }
// //                           className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
// //                         >
// //                           <Eye size={14} className="text-[#a71930]" />
// //                           View Document
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <div className="pt-1 text-gray-400 italic flex items-center gap-1">
// //                         <FileText size={12} /> No file link attached
// //                       </div>
// //                     )}
// //                   </div>

// //                   {rec.prescription?.medications ? (
// //                     <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
// //                       <div className="flex items-center gap-1.5 font-bold">
// //                         <CheckCircle size={14} /> Prescription Added
// //                       </div>
// //                       <p className="mt-1">{rec.prescription.medications}</p>
// //                     </div>
// //                   ) : (
// //                     <div className="text-xs font-semibold text-amber-600">
// //                       Pending Prescription
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="mt-6">
// //                   {selectedRecord === rec._id ? (
// //                     <div className="space-y-3 rounded-xl border p-4">
// //                       <textarea
// //                         placeholder="Enter prescribed medications..."
// //                         value={medications}
// //                         onChange={(e) => setMedications(e.target.value)}
// //                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// //                       />
// //                       <textarea
// //                         placeholder="Instructions/Dosage (optional)..."
// //                         value={instructions}
// //                         onChange={(e) => setInstructions(e.target.value)}
// //                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
// //                       />
// //                       <div className="flex gap-2">
// //                         <button
// //                           onClick={() => handlePrescribe(rec._id)}
// //                           disabled={submitting}
// //                           className="flex-1 rounded-lg bg-[#a71930] py-2 text-xs font-bold text-white hover:bg-[#7f1025]"
// //                         >
// //                           Submit
// //                         </button>
// //                         <button
// //                           onClick={() => setSelectedRecord(null)}
// //                           className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700"
// //                         >
// //                           Cancel
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <button
// //                       onClick={() => {
// //                         setSelectedRecord(rec._id);
// //                         setMedications(rec.prescription?.medications || "");
// //                         setInstructions(rec.prescription?.instructions || "");
// //                       }}
// //                       className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff1f3] py-2.5 text-xs font-bold text-[#a71930] hover:bg-[#fbdde3]"
// //                     >
// //                       <Send size={14} />
// //                       {rec.prescription?.medications
// //                         ? "Update Prescription"
// //                         : "Add Prescription"}
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { Send, User, CheckCircle, Eye, FileText } from "lucide-react";
// import Swal from "sweetalert2";

// export default function DoctorPrescriptionsPage() {
//   const { user } = useAuth();
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [medications, setMedications] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (user?._id) {
//       fetchRecords();
//     }
//   }, [user]);

//   const fetchRecords = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/doctor/prescriptions?doctorId=${user._id}`);
//       const data = await res.json();
//       if (data.success) {
//         setRecords(data.records);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Modernized File Preview handling using SweetAlert2 Modal
//   const handleViewFile = (fileUrl, fileName = "Patient Document") => {
//     if (!fileUrl) {
//       return Swal.fire({
//         icon: "warning",
//         title: "File Not Found",
//         text: "No valid file link is attached to this patient record.",
//         confirmButtonColor: "#a71930",
//       });
//     }

//     // Handle temporary blob URLs leftover from client upload
//     if (fileUrl.startsWith("blob:")) {
//       return Swal.fire({
//         icon: "error",
//         title: "Invalid File Link",
//         text: "This file was uploaded as a temporary browser link. Please ask the patient to re-upload.",
//         confirmButtonColor: "#a71930",
//       });
//     }

//     const cleanUrl = fileUrl.toLowerCase();
//     const isPdf =
//       cleanUrl.includes("application/pdf") || cleanUrl.endsWith(".pdf");

//     // Check if link is an image format (Base64 data string, standard image URLs)
//     const isImage =
//       fileUrl.startsWith("data:image/") ||
//       /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(fileUrl) ||
//       !isPdf;

//     if (isPdf) {
//       Swal.fire({
//         title: fileName,
//         html: `<iframe src="${fileUrl}" style="width:100%; height:450px; border:none; border-radius:8px;"></iframe>`,
//         width: 750,
//         showCloseButton: true,
//         confirmButtonColor: "#a71930",
//         confirmButtonText: "Close",
//       });
//     } else if (isImage) {
//       Swal.fire({
//         title: fileName,
//         imageUrl: fileUrl,
//         imageAlt: fileName,
//         imageWidth: 600,
//         imageHeight: "auto",
//         showCloseButton: true,
//         confirmButtonColor: "#a71930",
//         confirmButtonText: "Close",
//       });
//     } else {
//       window.open(fileUrl, "_blank");
//     }
//   };

//   const handlePrescribe = async (recordId) => {
//     if (!medications.trim()) {
//       return Swal.fire({
//         icon: "warning",
//         title: "Missing Information",
//         text: "Please enter the medication details.",
//         confirmButtonColor: "#a71930",
//       });
//     }

//     setSubmitting(true);
//     try {
//       const res = await fetch("/api/doctor/prescriptions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           recordId,
//           prescription: { medications, instructions },
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Prescription Sent",
//           text: "The patient can now view their prescription in their dashboard.",
//           confirmButtonColor: "#a71930",
//         });

//         setSelectedRecord(null);
//         setMedications("");
//         setInstructions("");
//         fetchRecords();
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed",
//         text: err.message || "Failed to submit prescription.",
//         confirmButtonColor: "#a71930",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mx-auto max-w-6xl space-y-8 p-6">
//       <div>
//         <p className="text-sm font-semibold text-[#a71930]">
//           PATIENT SUBMISSIONS
//         </p>
//         <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
//           Assigned Health Records & Documents
//         </h1>
//       </div>

//       {loading ? (
//         <div className="py-12 text-center text-gray-500">
//           Loading patient records...
//         </div>
//       ) : records.length === 0 ? (
//         <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
//           <p className="text-gray-500">
//             No patient documents assigned to you yet.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2">
//           {records.map((rec) => {
//             const fileUrl =
//               rec.fileUrl || rec.documentUrl || rec.url || rec.filePath;

//             return (
//               <div
//                 key={rec._id}
//                 className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
//               >
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
//                       <User size={20} />
//                     </div>
//                     <div>
//                       <h2 className="font-bold text-gray-800">
//                         {rec.patientId?.name || "Patient Record"}
//                       </h2>
//                       <p className="text-xs text-gray-500">
//                         {rec.patientId?.email}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="rounded-xl bg-gray-50 p-3 text-xs space-y-2">
//                     <div>
//                       <p className="font-semibold text-gray-600">
//                         Document Name:
//                       </p>
//                       <p className="mt-0.5 truncate font-medium text-[#a71930]">
//                         {rec.documentName}
//                       </p>
//                     </div>

//                     {rec.notes && (
//                       <p className="text-gray-500">
//                         <strong>Notes:</strong> {rec.notes}
//                       </p>
//                     )}

//                     {/* View Action (Opens SweetAlert2 Modal) */}
//                     {fileUrl ? (
//                       <div className="pt-2 flex items-center gap-2 border-t border-gray-200">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleViewFile(fileUrl, rec.documentName)
//                           }
//                           className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
//                         >
//                           <Eye size={14} className="text-[#a71930]" />
//                           View Document
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="pt-1 text-gray-400 italic flex items-center gap-1">
//                         <FileText size={12} /> No file link attached
//                       </div>
//                     )}
//                   </div>

//                   {rec.prescription?.medications ? (
//                     <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
//                       <div className="flex items-center gap-1.5 font-bold">
//                         <CheckCircle size={14} /> Prescription Added
//                       </div>
//                       <p className="mt-1">{rec.prescription.medications}</p>
//                     </div>
//                   ) : (
//                     <div className="text-xs font-semibold text-amber-600">
//                       Pending Prescription
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-6">
//                   {selectedRecord === rec._id ? (
//                     <div className="space-y-3 rounded-xl border p-4">
//                       <textarea
//                         placeholder="Enter prescribed medications..."
//                         value={medications}
//                         onChange={(e) => setMedications(e.target.value)}
//                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
//                       />
//                       <textarea
//                         placeholder="Instructions/Dosage (optional)..."
//                         value={instructions}
//                         onChange={(e) => setInstructions(e.target.value)}
//                         className="w-full rounded-lg border p-2 text-xs focus:outline-none"
//                       />
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handlePrescribe(rec._id)}
//                           disabled={submitting}
//                           className="flex-1 rounded-lg bg-[#a71930] py-2 text-xs font-bold text-white hover:bg-[#7f1025]"
//                         >
//                           Submit
//                         </button>
//                         <button
//                           onClick={() => setSelectedRecord(null)}
//                           className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         setSelectedRecord(rec._id);
//                         setMedications(rec.prescription?.medications || "");
//                         setInstructions(rec.prescription?.instructions || "");
//                       }}
//                       className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff1f3] py-2.5 text-xs font-bold text-[#a71930] hover:bg-[#fbdde3]"
//                     >
//                       <Send size={14} />
//                       {rec.prescription?.medications
//                         ? "Update Prescription"
//                         : "Add Prescription"}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Send, User, CheckCircle, Eye, FileText } from "lucide-react";
import Swal from "sweetalert2";

export default function DoctorPrescriptionsPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Scoped per-record form state to prevent state collision
  const [formData, setFormData] = useState({
    medications: "",
    instructions: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/doctor/prescriptions?doctorId=${user._id}`);
      const data = await res.json();
      if (data.success) {
        setRecords(data.records);
      }
    } catch (err) {
      console.error("Failed to fetch records:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      fetchRecords();
    }
  }, [user, fetchRecords]);

  // Robust file viewer with explicit type checks
  const handleViewFile = (fileUrl, fileName = "Patient Document") => {
    if (!fileUrl) {
      return Swal.fire({
        icon: "warning",
        title: "File Not Found",
        text: "No valid file link is attached to this patient record.",
        confirmButtonColor: "#a71930",
      });
    }

    if (fileUrl.startsWith("blob:")) {
      return Swal.fire({
        icon: "error",
        title: "Invalid File Link",
        text: "This file was uploaded as a temporary browser link. Please ask the patient to re-upload.",
        confirmButtonColor: "#a71930",
      });
    }

    const cleanUrl = fileUrl.toLowerCase();
    const isPdf =
      cleanUrl.includes("application/pdf") || cleanUrl.endsWith(".pdf");
    const isImage =
      fileUrl.startsWith("data:image/") ||
      /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(cleanUrl);

    if (isPdf) {
      Swal.fire({
        title: fileName,
        html: `<iframe src="${encodeURI(fileUrl)}" style="width:100%; height:450px; border:none; border-radius:8px;"></iframe>`,
        width: 750,
        showCloseButton: true,
        confirmButtonColor: "#a71930",
        confirmButtonText: "Close",
      });
    } else if (isImage) {
      Swal.fire({
        title: fileName,
        imageUrl: fileUrl,
        imageAlt: fileName,
        imageWidth: 600,
        imageHeight: "auto",
        showCloseButton: true,
        confirmButtonColor: "#a71930",
        confirmButtonText: "Close",
      });
    } else {
      // Direct external link or unsupported format fallback
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleOpenPrescribeForm = (rec) => {
    setSelectedRecord(rec._id);
    setFormData({
      medications: rec.prescription?.medications || "",
      instructions: rec.prescription?.instructions || "",
    });
  };

  const handlePrescribe = async (recordId) => {
    if (!formData.medications.trim()) {
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
          prescription: {
            medications: formData.medications,
            instructions: formData.instructions,
          },
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
        setFormData({ medications: "", instructions: "" });
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
          {records.map((rec) => {
            const fileUrl =
              rec.fileUrl || rec.documentUrl || rec.url || rec.filePath;
            const isEditing = selectedRecord === rec._id;

            return (
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

                  <div className="rounded-xl bg-gray-50 p-3 text-xs space-y-2">
                    <div>
                      <p className="font-semibold text-gray-600">
                        Document Name:
                      </p>
                      <p className="mt-0.5 truncate font-medium text-[#a71930]">
                        {rec.documentName}
                      </p>
                    </div>

                    {rec.notes && (
                      <p className="text-gray-500">
                        <strong>Notes:</strong> {rec.notes}
                      </p>
                    )}

                    {fileUrl ? (
                      <div className="pt-2 flex items-center gap-2 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewFile(fileUrl, rec.documentName)
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
                        >
                          <Eye size={14} className="text-[#a71930]" />
                          View Document
                        </button>
                      </div>
                    ) : (
                      <div className="pt-1 text-gray-400 italic flex items-center gap-1">
                        <FileText size={12} /> No file link attached
                      </div>
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
                  {isEditing ? (
                    <div className="space-y-3 rounded-xl border p-4">
                      <textarea
                        placeholder="Enter prescribed medications..."
                        value={formData.medications}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            medications: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border p-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#a71930]"
                      />
                      <textarea
                        placeholder="Instructions/Dosage (optional)..."
                        value={formData.instructions}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            instructions: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border p-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#a71930]"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePrescribe(rec._id)}
                          disabled={submitting}
                          className="flex-1 rounded-lg bg-[#a71930] py-2 text-xs font-bold text-white hover:bg-[#7f1025] disabled:opacity-50"
                        >
                          {submitting ? "Submitting..." : "Submit"}
                        </button>
                        <button
                          onClick={() => setSelectedRecord(null)}
                          className="rounded-lg bg-gray-200 px-3 py-2 text-xs text-gray-700 hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenPrescribeForm(rec)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff1f3] py-2.5 text-xs font-bold text-[#a71930] hover:bg-[#fbdde3] transition"
                    >
                      <Send size={14} />
                      {rec.prescription?.medications
                        ? "Update Prescription"
                        : "Add Prescription"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
