// import { NextResponse } from "next/server";
// import { connect } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// // Get only records assigned to this doctor
// export async function GET(req) {
//   try {
//     const medicalRecordsCollection = await connect("medical_records");
//     const { searchParams } = new URL(req.url);
//     const doctorId = searchParams.get("doctorId");

//     if (!doctorId) {
//       return NextResponse.json(
//         { success: false, message: "Doctor ID missing" },
//         { status: 400 },
//       );
//     }

//     const records = await medicalRecordsCollection
//       .aggregate([
//         { $match: { doctorId: new ObjectId(doctorId) } },
//         {
//           $lookup: {
//             from: "users",
//             localField: "patientId",
//             foreignField: "_id",
//             as: "patientId",
//           },
//         },
//         { $unwind: "$patientId" },
//         {
//           $project: {
//             documentUrl: 1,
//             documentName: 1,
//             notes: 1,
//             prescription: 1,
//             createdAt: 1,
//             "patientId.name": 1,
//             "patientId.email": 1,
//           },
//         },
//         { $sort: { createdAt: -1 } },
//       ])
//       .toArray();

//     return NextResponse.json({ success: true, records });
//   } catch (error) {
//     console.error("Fetch doctor records error:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch assigned patients" },
//       { status: 500 },
//     );
//   }
// }

// // Doctor submits/updates a prescription
// export async function POST(req) {
//   try {
//     const medicalRecordsCollection = await connect("medical_records");
//     const { recordId, medications, instructions } = await req.json();

//     if (!recordId) {
//       return NextResponse.json(
//         { success: false, message: "Record ID required" },
//         { status: 400 },
//       );
//     }

//     await medicalRecordsCollection.updateOne(
//       { _id: new ObjectId(recordId) },
//       {
//         $set: {
//           prescription: {
//             medications,
//             instructions,
//             prescribedAt: new Date(),
//           },
//         },
//       },
//     );

//     return NextResponse.json({ success: true, message: "Prescription saved" });
//   } catch (error) {
//     console.error("Save prescription error:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to save prescription" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const medicalRecordsCollection = await connect("medical_records");
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("doctorId");

    if (!doctorId) {
      return NextResponse.json(
        { success: false, message: "Doctor ID missing" },
        { status: 400 },
      );
    }

    const docObjectId = ObjectId.isValid(doctorId)
      ? new ObjectId(doctorId)
      : doctorId;

    const records = await medicalRecordsCollection
      .aggregate([
        {
          $match: {
            $or: [{ doctorId: docObjectId }, { doctorId: doctorId }],
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "patientId",
            foreignField: "_id",
            as: "patientInfo",
          },
        },
        {
          $unwind: {
            path: "$patientInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            documentUrl: 1,
            documentName: 1,
            notes: 1,
            prescription: 1,
            createdAt: 1,
            "patientId.name": "$patientInfo.name",
            "patientId.email": "$patientInfo.email",
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();

    return NextResponse.json({ success: true, records });
  } catch (error) {
    console.error("Fetch doctor records error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch assigned patients" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const medicalRecordsCollection = await connect("medical_records");
    const { recordId, prescription } = await req.json();

    if (!recordId || !prescription) {
      return NextResponse.json(
        { success: false, message: "Missing required parameters" },
        { status: 400 },
      );
    }

    const recObjectId = ObjectId.isValid(recordId)
      ? new ObjectId(recordId)
      : recordId;

    await medicalRecordsCollection.updateOne(
      { _id: recObjectId },
      {
        $set: {
          prescription,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({
      success: true,
      message: "Prescription saved successfully",
    });
  } catch (error) {
    console.error("Save prescription error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save prescription" },
      { status: 500 },
    );
  }
}
