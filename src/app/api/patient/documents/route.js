import { NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ১. ডকুমেন্ট এবং রোগীর নোট জমা নেওয়া (POST)
export async function POST(req) {
  try {
    const body = await req.json();
    const { patientId, doctorId, documentUrl, documentName, notes } = body;

    if (!patientId || !doctorId || !documentUrl) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const medicalRecordsCollection = await connect("medical_records");

    const newRecord = {
      patientId: ObjectId.isValid(patientId)
        ? new ObjectId(patientId)
        : patientId,
      doctorId: ObjectId.isValid(doctorId) ? new ObjectId(doctorId) : doctorId,
      documentUrl,
      documentName: documentName || "Document.pdf",
      notes: notes || "",
      prescription: null,
      createdAt: new Date(),
    };

    const result = await medicalRecordsCollection.insertOne(newRecord);

    return NextResponse.json({
      success: true,
      recordId: result.insertedId.toString(),
      message: "Document uploaded successfully",
    });
  } catch (error) {
    console.error("Upload Document API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 },
    );
  }
}

// ২. উক্ত রোগীর পূর্বের রেকর্ড ও প্রেসক্রিপশন নিয়ে আসা (GET)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
      return NextResponse.json(
        { success: false, message: "Patient ID is required" },
        { status: 400 },
      );
    }

    const medicalRecordsCollection = await connect("medical_records");
    const queryId = ObjectId.isValid(patientId)
      ? new ObjectId(patientId)
      : patientId;

    const records = await medicalRecordsCollection
      .aggregate([
        {
          $match: {
            $or: [{ patientId: queryId }, { patientId: patientId }],
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctorInfo",
          },
        },
        {
          $unwind: {
            path: "$doctorInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: { $toString: "$_id" },
            documentUrl: 1,
            documentName: 1,
            notes: 1,
            prescription: 1,
            createdAt: 1,
            "doctorId.name": "$doctorInfo.name",
            "doctorId.email": "$doctorInfo.email",
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();

    return NextResponse.json({ success: true, records });
  } catch (error) {
    console.error("Fetch Documents API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch patient records" },
      { status: 500 },
    );
  }
}
