import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { connect } from "@/lib/dbConnect";
import { createToken } from "@/lib/auth";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        {
          success: false,
          message: "Google credential is required.",
        },
        { status: 400 },
      );
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Google account.",
        },
        { status: 401 },
      );
    }

    const { sub: googleId, email, name, picture, email_verified } = payload;

    if (!email || !email_verified) {
      return NextResponse.json(
        {
          success: false,
          message: "Google email could not be verified.",
        },
        { status: 401 },
      );
    }

    const usersCollection = await connect("users");

    const normalizedEmail = email.trim().toLowerCase();

    // Find existing user by email
    let user = await usersCollection.findOne({
      email: normalizedEmail,
    });

    /*
     * EXISTING USER
     */
    if (user) {
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

      // Update Google information
      await usersCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            googleId,
            image: picture || user.image || "",
            updatedAt: new Date(),
          },
        },
      );

      user = {
        ...user,
        googleId,
        image: picture || user.image || "",
      };
    } else {
      /*
       * NEW GOOGLE USER
       *
       * Google users are always registered
       * as patients.
       */
      const newUser = {
        name: name || "Google User",
        email: normalizedEmail,
        googleId,
        image: picture || "",
        role: "patient",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await usersCollection.insertOne(newUser);

      user = {
        ...newUser,
        _id: result.insertedId,
      };
    }

    // Create JWT
    const token = await createToken(user);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Google login successful.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image || "",
      },
    });

    // Set authentication cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Google authentication failed.",
      },
      { status: 500 },
    );
  }
}
