// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function RegisterForm() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "patient",
//     adminKey: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//           adminKey: formData.adminKey,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Registration failed.");
//         return;
//       }

//       // Redirect according to role

//       if (data.user.role === "patient") {
//         router.push("/dashboard/patient");
//       } else if (data.user.role === "doctor") {
//         router.push("/dashboard/doctor");
//       } else if (data.user.role === "admin") {
//         router.push("/dashboard/admin");
//       }
//     } catch (error) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fff8f9] px-4 py-12">
//       <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-xl">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-[#681225]">
//             Create Your Account
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Join our smart healthcare platform
//           </p>
//         </div>

//         {error && (
//           <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}

//           <div>
//             <label className="mb-2 block text-sm font-semibold">
//               Full Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#a71930]"
//               placeholder="Enter your full name"
//             />
//           </div>

//           {/* Email */}

//           <div>
//             <label className="mb-2 block text-sm font-semibold">
//               Email Address
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#a71930]"
//               placeholder="you@example.com"
//             />
//           </div>

//           {/* Password */}

//           <div>
//             <label className="mb-2 block text-sm font-semibold">Password</label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               minLength={6}
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#a71930]"
//               placeholder="Minimum 6 characters"
//             />
//           </div>

//           {/* Confirm Password */}

//           <div>
//             <label className="mb-2 block text-sm font-semibold">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#a71930]"
//               placeholder="Confirm your password"
//             />
//           </div>

//           {/* Role */}

//           <div>
//             <label className="mb-3 block text-sm font-semibold">
//               Register As
//             </label>

//             <div className="grid grid-cols-3 gap-3">
//               {["patient", "doctor", "admin"].map((role) => (
//                 <label
//                   key={role}
//                   className={`cursor-pointer rounded-xl border p-3 text-center text-sm capitalize ${
//                     formData.role === role
//                       ? "border-[#a71930] bg-[#fff1f3] text-[#a71930]"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="role"
//                     value={role}
//                     checked={formData.role === role}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />

//                   {role}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Admin Key */}

//           {formData.role === "admin" && (
//             <div>
//               <label className="mb-2 block text-sm font-semibold">
//                 Admin Registration Key
//               </label>

//               <input
//                 type="password"
//                 name="adminKey"
//                 value={formData.adminKey}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#a71930]"
//                 placeholder="Enter admin key"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-xl bg-[#8f1730] py-3.5 font-bold text-white transition hover:bg-[#6f1024] disabled:opacity-60"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-500">
//           Already have an account?{" "}
//           <Link href="/login" className="font-bold text-[#a71930]">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      await refreshUser();

      if (data.user.role === "patient") {
        router.push("/dashboard/patient");
      } else if (data.user.role === "doctor") {
        router.push("/dashboard/doctor");
      } else if (data.user.role === "admin") {
        router.push("/dashboard/admin");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f9] px-4 py-12">
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#681225]">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-500">Join HealthAnalytics</p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-[#8f1730] focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-[#8f1730] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-[#8f1730] focus:outline-none"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-[#8f1730] focus:outline-none"
              placeholder="Confirm password"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold">
              Register As
            </label>

            <div className="grid grid-cols-3 gap-3">
              {["patient", "doctor", "admin"].map((role) => (
                <label
                  key={role}
                  className={`cursor-pointer rounded-xl border p-3 text-center capitalize transition ${
                    formData.role === role
                      ? "border-[#8f1730] bg-[#fff1f3] text-[#8f1730]"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="sr-only"
                  />

                  {role}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#8f1730] py-3.5 font-bold text-white hover:bg-[#6f1024] disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google button will be connected in Step 13 */}

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 font-semibold transition hover:bg-gray-50"
        >
          <span className="text-lg">G</span>
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#8f1730]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
