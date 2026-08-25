// // app/api/patient/health-records/route.js
// import { NextResponse } from "next/server";
// import { getCurrentUser } from "@/lib/auth";
// import { connect } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET() {
//   try {
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 },
//       );
//     }

//     const userId = currentUser.userId || currentUser._id;
//     const queryId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

//     const recordsCollection = await connect("health_records");
//     const records = await recordsCollection
//       .find({ patientId: queryId })
//       .sort({ createdAt: -1 })
//       .toArray();

//     return NextResponse.json({
//       success: true,
//       records: records.map((record) => ({
//         _id: record._id.toString(),
//         doctorName: record.doctorName || "Dr. Unassigned",
//         specialty: record.specialty || "General Practitioner",
//         date: record.createdAt
//           ? new Date(record.createdAt).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             })
//           : "N/A",
//         medicines: record.medicines || [],
//         vitalSigns: record.vitalSigns || {},
//         testResults: record.testResults || [],
//         notes: record.notes || "",
//         documentUrl: record.documentUrl || "",
//       })),
//     });
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch records" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ১. স্বাস্থ্য রেকর্ড পাওয়ার জন্য (GET)
export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const userId = currentUser.userId || currentUser._id;
    const queryId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

    const recordsCollection = await connect("health_records");
    const records = await recordsCollection
      .find({ patientId: queryId })
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      records: records.map((r) => ({ ...r, _id: r._id.toString() })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching records" },
      { status: 500 },
    );
  }
}

// ২. রোগী নিজে ম্যানুয়ালি তথ্য সেভ করার জন্য (POST)
export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const userId = currentUser.userId || currentUser._id;
    const patientId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

    const body = await request.json();
    const { title, date, bp, sugar, cholesterol, weight, notes } = body;

    if (!title || !date) {
      return NextResponse.json(
        { success: false, message: "Title and Date are required" },
        { status: 400 },
      );
    }

    const recordsCollection = await connect("health_records");

    const newRecord = {
      patientId,
      title, // যেমন: 'সাধারণ স্বাস্থ্য পরীক্ষা', 'ল্যাব রিপোর্ট' ইত্যাদি
      date,
      bp: bp || "N/A",
      sugar: sugar || "N/A",
      cholesterol: cholesterol || "N/A",
      weight: weight || "N/A",
      notes: notes || "",
      createdAt: new Date(),
    };

    await recordsCollection.insertOne(newRecord);

    return NextResponse.json({
      success: true,
      message: "Record added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to add record" },
      { status: 500 },
    );
  }
}
