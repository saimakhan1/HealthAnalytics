import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fff1f3]">
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#fbd5dc] opacity-60 blur-3xl" />

      <div className="container-custom relative grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
        {/* Content */}

        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f1bdc7] bg-white px-4 py-2 text-xs font-bold text-[#a71930]">
            <span className="h-2 w-2 rounded-full bg-[#a71930]" />
            Healthcare Management
          </div>

          <h1 className="max-w-650 text-4xl font-extrabold leading-[1.1] text-[#5c0b1b] sm:text-5xl lg:text-6xl">
            Your Health History,
            <span className="block text-[#a71930]">Smarter & Safer.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            Organize prescriptions, medical reports and test results in one
            secure place. Our platform transforms complex medical documents into
            a clear health timeline for patients and doctors.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="primary-btn">
              Get Started
              <span>→</span>
            </Link>

            <Link href="#how-it-works" className="secondary-btn">
              See How It Works
            </Link>
          </div>

          {/* Trust indicators */}

          <div className="mt-10 flex flex-wrap gap-7">
            <div>
              <p className="text-2xl font-extrabold text-[#7f1025]">24/7</p>
              <p className="text-xs text-gray-500">Healthcare Access</p>
            </div>

            <div className="h-10 w-px bg-gray-300" />

            <div>
              <p className="text-2xl font-extrabold text-[#7f1025]">AI</p>
              <p className="text-xs text-gray-500">Document Analysis</p>
            </div>

            <div className="h-10 w-px bg-gray-300" />

            <div>
              <p className="text-2xl font-extrabold text-[#7f1025]">100%</p>
              <p className="text-xs text-gray-500">Organized Records</p>
            </div>
          </div>
        </div>

        {/* Hero visual */}

        {/* Hero Image */}

        <div className="relative mx-auto w-full max-w-[520px]">
          {/* Decorative background */}

          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[#f7c4ce] opacity-60 blur-3xl" />

          <div className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-[#e8a0ad] opacity-30 blur-3xl" />

          {/* Image container */}

          <div className="relative w-[120%] overflow-hidden rounded-[35px] border-8 border-white shadow-2xl">
            <img
              src="/images/hero-doctor.jpg"
              alt="Professional healthcare doctor"
              className="h-[560px] w-full object-cover object-center"
            />

            {/* Image overlay */}

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/30 bg-white/95 p-4 shadow-xl backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f3] text-xl">
                  🩺
                </div>

                <div>
                  <p className="text-sm font-extrabold text-[#5c0b1b]">
                    Smarter Healthcare
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Organized records for better decisions
                  </p>
                </div>

                <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-sm text-green-600">
                  ✓
                </div>
              </div>
            </div>
          </div>

          {/* Floating statistics card */}

          <div className="absolute -left-6 top-16 rounded-2xl bg-white p-4 shadow-xl sm:-left-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1f3] text-lg">
                ❤️
              </div>

              <div>
                <p className="text-lg font-extrabold text-[#7f1025]">24/7</p>

                <p className="text-[11px] text-gray-500">Health Support</p>
              </div>
            </div>
          </div>

          {/* Floating AI card */}

          <div className="absolute -right-4 top-1/2 rounded-2xl bg-[#7f1025] px-5 py-4 text-white shadow-xl sm:-right-8">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/60">
              Medical Insights
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

              <span className="text-sm font-bold">Medical Record Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
