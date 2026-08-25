// import { SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is missing from .env.local");
// }

// const secret = new TextEncoder().encode(JWT_SECRET);

// export async function createToken(user) {
//   return await new SignJWT({
//     userId: user._id.toString(),
//     role: user.role,
//     name: user.name,
//     email: user.email,
//   })
//     .setProtectedHeader({
//       alg: "HS256",
//     })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(secret);
// }

// export async function verifyToken(token) {
//   try {
//     const { payload } = await jwtVerify(token, secret);

//     return payload;
//   } catch (error) {
//     return null;
//   }
// }

// export async function getCurrentUser() {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("auth_token")?.value;

//   if (!token) {
//     return null;
//   }

//   return await verifyToken(token);
// }

// import { SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";

// const secretValue = process.env.JWT_SECRET;

// if (!secretValue) {
//   throw new Error("JWT_SECRET is missing.");
// }

// const secret = new TextEncoder().encode(secretValue);

// export async function createToken(user) {
//   return await new SignJWT({
//     userId: user._id.toString(),
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     image: user.image || "",
//   })
//     .setProtectedHeader({
//       alg: "HS256",
//     })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(secret);
// }

// export async function verifyToken(token) {
//   try {
//     const { payload } = await jwtVerify(token, secret);

//     return payload;
//   } catch {
//     return null;
//   }
// }

// export async function getCurrentUser() {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("auth_token")?.value;

//   if (!token) {
//     return null;
//   }

//   return await verifyToken(token);
// }

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretValue = process.env.JWT_SECRET;

if (!secretValue) {
  throw new Error("JWT_SECRET is missing.");
}

const secret = new TextEncoder().encode(secretValue);

export async function createToken(user) {
  return await new SignJWT({
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  return await verifyToken(token);
}
