import { NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const usersCollection = await connect("users");

    const doctors = await usersCollection
      .find({ role: { $regex: /^doctor$/i } })
      .project({ password: 0 })
      .toArray();

    return NextResponse.json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch doctors" },
      { status: 500 },
    );
  }
}
