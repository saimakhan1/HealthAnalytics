import { NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/auth";
import { ObjectId } from "mongodb";

// GET: Fetch all users (Admins only)
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized: Admin access required." },
        { status: 403 },
      );
    }

    const usersCollection = await connect("users");

    // Fetch all users while excluding password field
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Admin user fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch users." },
      { status: 500 },
    );
  }
}

// PATCH: Update user role (Make Admin / Change Role)
export async function PATCH(req) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized: Admin access required." },
        { status: 403 },
      );
    }

    const { userId, newRole } = await req.json();

    const allowedRoles = ["patient", "doctor", "admin"];
    if (!allowedRoles.includes(newRole)) {
      return NextResponse.json(
        { message: "Invalid role specified." },
        { status: 400 },
      );
    }

    // Safety check: Prevent logged-in admin from demoting themselves
    if (userId === currentUser.userId && newRole !== "admin") {
      return NextResponse.json(
        { message: "You cannot remove admin status from yourself." },
        { status: 400 },
      );
    }

    const usersCollection = await connect("users");
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User role updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Role update error:", error);
    return NextResponse.json(
      { message: "Failed to update user role." },
      { status: 500 },
    );
  }
}
