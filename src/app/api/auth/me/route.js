// // // import { NextResponse } from "next/server";
// // // import { getCurrentUser } from "@/lib/auth";
// // // import { connect } from "@/lib/dbConnect";
// // // import { ObjectId } from "mongodb";

// // // export async function GET() {
// // //   try {
// // //     const tokenUser = await getCurrentUser();

// // //     if (!tokenUser) {
// // //       return NextResponse.json(
// // //         {
// // //           success: false,
// // //           user: null,
// // //         },
// // //         { status: 401 },
// // //       );
// // //     }

// // //     const usersCollection = await connect("users");

// // //     const user = await usersCollection.findOne({
// // //       _id: new ObjectId(tokenUser.userId),
// // //     });

// // //     if (!user || user.status !== "active") {
// // //       return NextResponse.json(
// // //         {
// // //           success: false,
// // //           user: null,
// // //         },
// // //         { status: 401 },
// // //       );
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       user: {
// // //         id: user._id.toString(),
// // //         name: user.name,
// // //         email: user.email,
// // //         role: user.role,
// // //         image: user.image || "",
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Me error:", error);

// // //     return NextResponse.json(
// // //       {
// // //         success: false,
// // //         user: null,
// // //       },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // // export async function PUT(request) {
// // //   try {
// // //     const tokenUser = await getCurrentUser();

// // //     if (!tokenUser) {
// // //       return NextResponse.json(
// // //         {
// // //           success: false,
// // //           message: "Unauthorized.",
// // //         },
// // //         { status: 401 },
// // //       );
// // //     }

// // //     const { name } = await request.json();

// // //     if (!name || !name.trim()) {
// // //       return NextResponse.json(
// // //         {
// // //           success: false,
// // //           message: "Name is required.",
// // //         },
// // //         { status: 400 },
// // //       );
// // //     }

// // //     const usersCollection = await connect("users");

// // //     const result = await usersCollection.updateOne(
// // //       {
// // //         _id: new ObjectId(tokenUser.userId),
// // //       },
// // //       {
// // //         $set: {
// // //           name: name.trim(),
// // //         },
// // //       },
// // //     );

// // //     if (result.matchedCount === 0) {
// // //       return NextResponse.json(
// // //         {
// // //           success: false,
// // //           message: "User not found.",
// // //         },
// // //         { status: 404 },
// // //       );
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       message: "Profile updated successfully.",
// // //     });
// // //   } catch (error) {
// // //     console.error("Update profile error:", error);

// // //     return NextResponse.json(
// // //       {
// // //         success: false,
// // //         message: "Unable to update profile.",
// // //       },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // import { NextResponse } from "next/server";
// // import bcrypt from "bcryptjs";
// // import { getCurrentUser } from "@/lib/auth";
// // import { connect } from "@/lib/dbConnect";
// // import { ObjectId } from "mongodb";

// // export async function GET() {
// //   try {
// //     const tokenUser = await getCurrentUser();

// //     if (!tokenUser) {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           user: null,
// //         },
// //         { status: 401 },
// //       );
// //     }

// //     const usersCollection = await connect("users");

// //     const user = await usersCollection.findOne({
// //       _id: new ObjectId(tokenUser.userId),
// //     });

// //     if (!user || user.status !== "active") {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           user: null,
// //         },
// //         { status: 401 },
// //       );
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       user: {
// //         id: user._id.toString(),
// //         name: user.name || "",
// //         email: user.email || "",
// //         role: user.role || "",
// //         image: user.image || "",
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Me GET error:", error);

// //     return NextResponse.json(
// //       {
// //         success: false,
// //         user: null,
// //       },
// //       { status: 500 },
// //     );
// //   }
// // }

// // export async function PUT(request) {
// //   try {
// //     const tokenUser = await getCurrentUser();

// //     if (!tokenUser) {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "Unauthorized.",
// //         },
// //         { status: 401 },
// //       );
// //     }

// //     const body = await request.json();

// //     const { name, image, currentPassword, newPassword } = body;

// //     const usersCollection = await connect("users");

// //     const user = await usersCollection.findOne({
// //       _id: new ObjectId(tokenUser.userId),
// //     });

// //     if (!user || user.status !== "active") {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "User not found.",
// //         },
// //         { status: 404 },
// //       );
// //     }

// //     const updateData = {};

// //     // Name
// //     if (name !== undefined) {
// //       const trimmedName = name.trim();

// //       if (!trimmedName) {
// //         return NextResponse.json(
// //           {
// //             success: false,
// //             message: "Name is required.",
// //           },
// //           { status: 400 },
// //         );
// //       }

// //       updateData.name = trimmedName;
// //     }

// //     // Profile image
// //     if (image !== undefined) {
// //       if (image === "") {
// //         updateData.image = "";
// //       } else {
// //         if (typeof image !== "string" || !image.startsWith("data:image/")) {
// //           return NextResponse.json(
// //             {
// //               success: false,
// //               message: "Invalid profile image.",
// //             },
// //             { status: 400 },
// //           );
// //         }

// //         updateData.image = image;
// //       }
// //     }

// //     // Password
// //     if (newPassword) {
// //       if (!currentPassword) {
// //         return NextResponse.json(
// //           {
// //             success: false,
// //             message: "Current password is required.",
// //           },
// //           { status: 400 },
// //         );
// //       }

// //       if (newPassword.length < 6) {
// //         return NextResponse.json(
// //           {
// //             success: false,
// //             message: "New password must be at least 6 characters.",
// //           },
// //           { status: 400 },
// //         );
// //       }

// //       if (!user.password) {
// //         return NextResponse.json(
// //           {
// //             success: false,
// //             message: "This account does not have a password.",
// //           },
// //           { status: 400 },
// //         );
// //       }

// //       const passwordCorrect = await bcrypt.compare(
// //         currentPassword,
// //         user.password,
// //       );

// //       if (!passwordCorrect) {
// //         return NextResponse.json(
// //           {
// //             success: false,
// //             message: "Current password is incorrect.",
// //           },
// //           { status: 400 },
// //         );
// //       }

// //       updateData.password = await bcrypt.hash(newPassword, 10);
// //     }

// //     if (Object.keys(updateData).length === 0) {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "No changes were made.",
// //         },
// //         { status: 400 },
// //       );
// //     }

// //     await usersCollection.updateOne(
// //       {
// //         _id: new ObjectId(tokenUser.userId),
// //       },
// //       {
// //         $set: updateData,
// //       },
// //     );

// //     return NextResponse.json({
// //       success: true,
// //       message: "Profile updated successfully.",
// //     });
// //   } catch (error) {
// //     console.error("Me PUT error:", error);

// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: "Unable to update profile.",
// //       },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { getCurrentUser } from "@/lib/auth";
// import { connect } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET() {
//   try {
//     const tokenUser = await getCurrentUser();

//     if (!tokenUser || (!tokenUser.userId && !tokenUser._id)) {
//       return NextResponse.json(
//         {
//           success: false,
//           user: null,
//         },
//         { status: 401 },
//       );
//     }

//     const userId = tokenUser.userId || tokenUser._id;
//     const usersCollection = await connect("users");

//     const queryId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

//     const user = await usersCollection.findOne({
//       _id: queryId,
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

//     const userIdString = user._id.toString();

//     return NextResponse.json({
//       success: true,
//       user: {
//         _id: userIdString, // ফ্রন্টএন্ডের সমস্যা সমাধানের জন্য এটি যুক্ত করা হয়েছে
//         id: userIdString,
//         name: user.name || "",
//         email: user.email || "",
//         role: user.role || "",
//         image: user.image || "",
//       },
//     });
//   } catch (error) {
//     console.error("Me GET error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         user: null,
//       },
//       { status: 500 },
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     const tokenUser = await getCurrentUser();

//     if (!tokenUser || (!tokenUser.userId && !tokenUser._id)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Unauthorized.",
//         },
//         { status: 401 },
//       );
//     }

//     const userId = tokenUser.userId || tokenUser._id;
//     const body = await request.json();
//     const { name, image, currentPassword, newPassword } = body;

//     const usersCollection = await connect("users");
//     const queryId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

//     const user = await usersCollection.findOne({
//       _id: queryId,
//     });

//     if (!user || user.status !== "active") {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "User not found.",
//         },
//         { status: 404 },
//       );
//     }

//     const updateData = {};

//     // Name update
//     if (name !== undefined) {
//       const trimmedName = name.trim();

//       if (!trimmedName) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Name is required.",
//           },
//           { status: 400 },
//         );
//       }

//       updateData.name = trimmedName;
//     }

//     // Profile image update
//     if (image !== undefined) {
//       if (image === "") {
//         updateData.image = "";
//       } else {
//         if (typeof image !== "string" || !image.startsWith("data:image/")) {
//           return NextResponse.json(
//             {
//               success: false,
//               message: "Invalid profile image.",
//             },
//             { status: 400 },
//           );
//         }

//         updateData.image = image;
//       }
//     }

//     // Password update
//     if (newPassword) {
//       if (!currentPassword) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Current password is required.",
//           },
//           { status: 400 },
//         );
//       }

//       if (newPassword.length < 6) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "New password must be at least 6 characters.",
//           },
//           { status: 400 },
//         );
//       }

//       if (!user.password) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "This account does not have a password.",
//           },
//           { status: 400 },
//         );
//       }

//       const passwordCorrect = await bcrypt.compare(
//         currentPassword,
//         user.password,
//       );

//       if (!passwordCorrect) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Current password is incorrect.",
//           },
//           { status: 400 },
//         );
//       }

//       updateData.password = await bcrypt.hash(newPassword, 10);
//     }

//     if (Object.keys(updateData).length === 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "No changes were made.",
//         },
//         { status: 400 },
//       );
//     }

//     await usersCollection.updateOne({ _id: queryId }, { $set: updateData });

//     return NextResponse.json({
//       success: true,
//       message: "Profile updated successfully.",
//     });
//   } catch (error) {
//     console.error("Me PUT error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Unable to update profile.",
//       },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";
import { connect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    // Pass the request object if getCurrentUser requires request context
    const tokenUser = await getCurrentUser(request);

    if (!tokenUser || (!tokenUser.userId && !tokenUser._id)) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const userId = tokenUser.userId || tokenUser._id;
    const usersCollection = await connect("users");
    const queryId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

    const user = await usersCollection.findOne({ _id: queryId });

    if (!user || user.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          user: null,
          message: "User inactive or not found",
        },
        { status: 401 },
      );
    }

    const userIdString = user._id.toString();

    return NextResponse.json({
      success: true,
      user: {
        _id: userIdString,
        id: userIdString,
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        image: user.image || "",
      },
    });
  } catch (error) {
    console.error("Me GET error:", error);

    return NextResponse.json(
      {
        success: false,
        user: null,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const tokenUser = await getCurrentUser(request);

    if (!tokenUser || (!tokenUser.userId && !tokenUser._id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 },
      );
    }

    const userId = tokenUser.userId || tokenUser._id;
    const body = await request.json();
    const { name, image, currentPassword, newPassword } = body;

    const usersCollection = await connect("users");
    const queryId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId;

    const user = await usersCollection.findOne({ _id: queryId });

    if (!user || user.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 },
      );
    }

    const updateData = {};

    if (name !== undefined) {
      const trimmedName = name.trim();
      if (!trimmedName) {
        return NextResponse.json(
          {
            success: false,
            message: "Name is required.",
          },
          { status: 400 },
        );
      }
      updateData.name = trimmedName;
    }

    if (image !== undefined) {
      if (image === "") {
        updateData.image = "";
      } else {
        if (typeof image !== "string" || !image.startsWith("data:image/")) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid profile image.",
            },
            { status: 400 },
          );
        }
        updateData.image = image;
      }
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          {
            success: false,
            message: "Current password is required.",
          },
          { status: 400 },
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          {
            success: false,
            message: "New password must be at least 6 characters.",
          },
          { status: 400 },
        );
      }

      if (!user.password) {
        return NextResponse.json(
          {
            success: false,
            message: "This account does not have a password.",
          },
          { status: 400 },
        );
      }

      const passwordCorrect = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!passwordCorrect) {
        return NextResponse.json(
          {
            success: false,
            message: "Current password is incorrect.",
          },
          { status: 400 },
        );
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No changes were made.",
        },
        { status: 400 },
      );
    }

    await usersCollection.updateOne({ _id: queryId }, { $set: updateData });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("Me PUT error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update profile.",
      },
      { status: 500 },
    );
  }
}
