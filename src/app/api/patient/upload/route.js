import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // আপনার DB Connection File
import PatientRecord from "@/models/PatientRecord"; // আপনার Mongoose Model

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { patientId, doctorId, documentName, documentUrl, notes } = body;

    if (!patientId || !doctorId || !documentUrl) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Base64 ফাইল ডাটা সরাসরি MongoDB-তে সেভ হবে
    const newRecord = await PatientRecord.create({
      patientId,
      doctorId,
      documentName,
      documentUrl, // ডাটাবেজে data:image/png;base64,... টেক্সট আকারে ফাইলটি স্থায়ী হয়ে যাবে
      notes,
    });

    return NextResponse.json({
      success: true,
      message: "Record uploaded successfully",
      record: newRecord,
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while saving record" },
      { status: 500 },
    );
  }
}
