import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-[#3d0712] text-white">
      <div className="container-custom grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="text-2xl font-extrabold">
            Medi<span className="text-[#f6a6b4]">Care</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
            An AI-powered health analytics platform designed to organize medical
            information for patients and doctors.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Platform</h3>

          <div className="mt-4 space-y-3 text-sm text-white/60">
            <Link className="block hover:text-white" href="/#services">
              Services
            </Link>

            <Link className="block hover:text-white" href="/#how-it-works">
              How It Works
            </Link>

            <Link className="block hover:text-white" href="/register">
              Register
            </Link>

            <Link className="block hover:text-white" href="/login">
              Login
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Portals</h3>

          <div className="mt-4 space-y-3 text-sm text-white/60">
            <p>Patient Portal</p>
            <p>Doctor Portal</p>
            <p>Admin Portal</p>
            <p>Health Analytics</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Contact</h3>

          <div className="mt-4 space-y-3 text-sm text-white/60">
            <p>📍 Dhaka, Bangladesh</p>
            <p>📞 +880 1234-567890</p>
            <p>✉ support@medicare.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col gap-3 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MediCare Health Analytics. All rights reserved.</p>

          <p>Built for healthcare management.</p>
        </div>
      </div>
    </footer>
  );
}
