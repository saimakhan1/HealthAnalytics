import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/lib/dbConnect";

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();

    // Required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 },
      );
    }

    // Allowed roles
    if (!["patient", "doctor", "admin"].includes(role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user role.",
        },
        { status: 400 },
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 },
      );
    }

    const usersCollection = await connect("users");

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing email
    const existingUser = await usersCollection.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already registered.",
        },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      image: "",
      status: "active",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful.",
        user: {
          id: result.insertedId.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          image: newUser.image,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Registration failed.",
      },
      { status: 500 },
    );
  }
}
