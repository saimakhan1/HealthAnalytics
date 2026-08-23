"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "#contact" },
  ];

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
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-bold text-[#a71930] transition hover:bg-[#fff1f3]"
          >
            Login
          </Link>

          <Link href="/register" className="primary-btn min-h-[42px] px-5">
            Get Started
          </Link>
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

            <div className="mt-2 flex gap-3 border-t pt-4">
              <Link href="/login" className="secondary-btn flex-1">
                Login
              </Link>

              <Link href="/register" className="primary-btn flex-1">
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
