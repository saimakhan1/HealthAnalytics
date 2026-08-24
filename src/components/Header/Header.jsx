// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Header() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "#about" },
//     { name: "Services", href: "#services" },
//     { name: "How It Works", href: "#how-it-works" },
//     { name: "Contact", href: "#contact" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-sm">
//       {/* Top bar */}

//       <div className="hidden bg-[#5c0b1b] text-white md:block">
//         <div className="container-custom flex h-9 items-center justify-between text-xs">
//           <p>24/7 Smart Healthcare Support</p>

//           <div className="flex items-center gap-5">
//             <span>Emergency: +880 1234-567890</span>
//             <span>support@healthcare.com</span>
//           </div>
//         </div>
//       </div>

//       {/* Main navbar */}

//       <div className="container-custom flex h-[74px] items-center justify-between">
//         <Link href="/" className="flex items-center gap-2">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1f3] text-2xl">
//             ❤️
//           </div>

//           <div>
//             <h1 className="text-xl font-extrabold leading-none text-[#7f1025]">
//               Medi<span className="text-[#a71930]">Care</span>
//             </h1>

//             <p className="mt-1 text-[10px] font-medium tracking-wider text-gray-500">
//               SMART HEALTH ANALYTICS
//             </p>
//           </div>
//         </Link>

//         {/* Desktop navigation */}

//         <nav className="hidden items-center gap-7 lg:flex">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="text-sm font-semibold text-gray-700 transition hover:text-[#a71930]"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Desktop buttons */}

//         <div className="hidden items-center gap-2 lg:flex">
//           <Link
//             href="/login"
//             className="rounded-lg px-4 py-2 text-sm font-bold text-[#a71930] transition hover:bg-[#fff1f3]"
//           >
//             Login
//           </Link>

//           <Link href="/register" className="primary-btn min-h-[42px] px-5">
//             Get Started
//           </Link>
//         </div>

//         {/* Mobile button */}

//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-xl lg:hidden"
//           aria-label="Toggle navigation"
//         >
//           {mobileOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile menu */}

//       {mobileOpen && (
//         <div className="border-t border-gray-100 bg-white px-5 py-5 lg:hidden">
//           <nav className="flex flex-col gap-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setMobileOpen(false)}
//                 className="text-sm font-semibold text-gray-700"
//               >
//                 {item.name}
//               </Link>
//             ))}

//             <div className="mt-2 flex gap-3 border-t pt-4">
//               <Link href="/login" className="secondary-btn flex-1">
//                 Login
//               </Link>

//               <Link href="/register" className="primary-btn flex-1">
//                 Register
//               </Link>
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "#contact" },
  ];

  // Determine dashboard based on logged-in user's role
  const dashboardPath =
    user?.role?.toLowerCase() === "doctor"
      ? "/dashboard/doctor"
      : user?.role?.toLowerCase() === "admin"
        ? "/dashboard/admin"
        : "/dashboard/patient";

  // User's first letter for avatar fallback
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}

      <div className="hidden bg-[#5c0b1b] text-white md:block">
        <div className="container-custom flex h-9 items-center justify-between text-xs">
          <p>24/7 Smart Healthcare Support</p>

          <div className="flex items-center gap-5">
            <span>Emergency: +880 1234-567890</span>
            <span>support@healthcare.com</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}

      <div className="container-custom flex h-[74px] items-center justify-between">
        {/* Logo */}

        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1f3] text-2xl">
            ❤️
          </div>

          <div>
            <h1 className="text-xl font-extrabold leading-none text-[#7f1025]">
              Medi<span className="text-[#a71930]">Care</span>
            </h1>

            <p className="mt-1 text-[10px] font-medium tracking-wider text-gray-500">
              SMART HEALTH ANALYTICS
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-gray-700 transition hover:text-[#a71930]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop buttons */}

        <div className="hidden items-center gap-2 lg:flex">
          {!loading && user ? (
            <>
              {/* Dashboard button */}

              <Link
                href={dashboardPath}
                className="rounded-lg px-4 py-2 text-sm font-bold text-[#a71930] transition hover:bg-[#fff1f3]"
              >
                Dashboard
              </Link>

              {/* User information */}

              <Link
                href={`${dashboardPath}/profile`}
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-[#fff1f3]"
              >
                {/* User image */}

                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-[#f7dce1]"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff1f3] text-sm font-bold text-[#a71930] ring-2 ring-[#f7dce1]">
                    {userInitial}
                  </div>
                )}

                {/* User name */}

                <div className="hidden xl:block">
                  <p className="max-w-[120px] truncate text-sm font-bold text-gray-800">
                    {user.name}
                  </p>

                  <p className="text-[11px] capitalize text-gray-400">
                    {user.role}
                  </p>
                </div>
              </Link>

              {/* Logout */}

              <button
                onClick={logout}
                className="rounded-lg px-3 py-2 text-sm font-bold text-gray-600 transition hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Logged-out buttons */}

              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-bold text-[#a71930] transition hover:bg-[#fff1f3]"
              >
                Login
              </Link>

              <Link href="/register" className="primary-btn min-h-[42px] px-5">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile button */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-xl lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-gray-700"
              >
                {item.name}
              </Link>
            ))}

            {!loading && user ? (
              <>
                {/* Mobile user information */}

                <div className="mt-2 flex items-center gap-3 border-t border-gray-100 pt-4">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-[#f7dce1]"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1f3] font-bold text-[#a71930] ring-2 ring-[#f7dce1]">
                      {userInitial}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {user.name}
                    </p>

                    <p className="text-xs capitalize text-gray-400">
                      {user.role}
                    </p>
                  </div>
                </div>

                {/* Mobile dashboard/logout */}

                <div className="flex gap-3">
                  <Link
                    href={dashboardPath}
                    onClick={() => setMobileOpen(false)}
                    className="primary-btn flex-1"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={async () => {
                      setMobileOpen(false);
                      await logout();
                    }}
                    className="secondary-btn flex-1 text-red-600 hover:border-red-300 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              /* Logged-out mobile buttons */

              <div className="mt-2 flex gap-3 border-t pt-4">
                <Link
                  href="/login"
                  className="secondary-btn flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="primary-btn flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
