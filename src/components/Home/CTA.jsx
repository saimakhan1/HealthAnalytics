import Link from "next/link";

export default function CTA() {
  return (
    <section id="contact" className="px-0 py-10">
      <div className="container-custom">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#7f1025] to-[#a71930] px-7 py-14 text-center sm:px-14">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Take Control of Your Health History
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Start organizing your medical records and experience a simpler way
            to understand your healthcare history.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex min-h-[48px] items-center rounded-lg bg-white px-7 text-sm font-bold text-[#7f1025] transition hover:bg-[#fff1f3]"
          >
            Create Your Account →
          </Link>
        </div>
      </div>
    </section>
  );
}
