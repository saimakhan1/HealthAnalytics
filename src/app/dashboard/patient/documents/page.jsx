"use client";

import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  X,
  CheckCircle2,
} from "lucide-react";

export default function PatientDocuments() {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter((file) => {
      return (
        file.type === "application/pdf" ||
        file.type === "image/png" ||
        file.type === "image/jpeg"
      );
    });

    setFiles((previous) => [...previous, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((previous) => previous.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#a71930]">DOCUMENT CENTER</p>

        <h1 className="mt-1 text-3xl font-extrabold text-[#5c0b1b]">
          Upload Medical Documents
        </h1>

        <p className="mt-2 text-gray-500">
          Upload prescriptions and reports for AI-powered health extraction.
        </p>
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
        className={`rounded-3xl border-2 border-dashed p-10 text-center transition sm:p-16 ${
          dragging
            ? "border-[#a71930] bg-[#fff1f3]"
            : "border-[#e6c7cd] bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1f3] text-[#a71930]">
          <Upload size={28} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#5c0b1b]">
          Drop your medical documents here
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Supported formats: PDF, PNG and JPEG
        </p>

        <button
          onClick={() => inputRef.current?.click()}
          className="mt-6 rounded-xl bg-[#a71930] px-6 py-3 font-bold text-white transition hover:bg-[#7f1025]"
        >
          Choose Files
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#5c0b1b]">
            Selected Documents
          </h2>

          <div className="mt-5 space-y-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1f3] text-[#a71930]">
                  {file.type === "application/pdf" ? (
                    <FileText size={20} />
                  ) : (
                    <ImageIcon size={20} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-gray-800">
                    {file.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={() => removeFile(index)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              alert(
                "Document upload UI is ready. Connect this button to your Gemini API processing endpoint next.",
              );
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#a71930] px-6 py-3 font-bold text-white hover:bg-[#7f1025]"
          >
            <CheckCircle2 size={18} />
            Process Documents with AI
          </button>
        </div>
      )}
    </div>
  );
}
