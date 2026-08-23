import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/lib/dbConnect";
import { createToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const usersCollection = await connect("users");

    const user = await usersCollection.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    // Check account status

    if (user.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been suspended.",
        },
        { status: 403 },
      );
    }

    // Compare password

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    // Create token

    const token = await createToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image || "",
      },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during login.",
      },
      { status: 500 },
    );
  }
}
