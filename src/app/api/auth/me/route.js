// import { NextResponse } from "next/server";
// import { getCurrentUser } from "@/lib/auth";
// import { connect } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET() {
//   try {
//     const tokenUser = await getCurrentUser();

//     if (!tokenUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           user: null,
//         },
//         { status: 401 },
//       );
//     }

//     const usersCollection = await connect("users");

//     const user = await usersCollection.findOne({
//       _id: new ObjectId(tokenUser.userId),
//     });

//     if (!user || user.status !== "active") {
//       return NextResponse.json(
//         {
//           success: false,
//           user: null,
//         },
//         { status: 401 },
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user._id.toString(),
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         image: user.image || "",
//       },
//     });
//   } catch (error) {
//     console.error("Me API error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         user: null,
//       },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const tokenUser = await getCurrentUser();

    if (!tokenUser) {
      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        { status: 401 },
      );
    }

    const usersCollection = await connect("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(tokenUser.userId),
    });

    if (!user || user.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image || "",
      },
    });
  } catch (error) {
    console.error("Me error:", error);

    return NextResponse.json(
      {
        success: false,
        user: null,
      },
      { status: 500 },
    );
  }
}
