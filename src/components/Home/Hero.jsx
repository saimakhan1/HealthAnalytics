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
            AI-Powered Healthcare Management
          </div>

          <h1 className="max-w-650 text-4xl font-extrabold leading-[1.1] text-[#5c0b1b] sm:text-5xl lg:text-6xl">
            Your Health History,
            <span className="block text-[#a71930]">Smarter & Safer.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            Organize prescriptions, medical reports and test results in one
            secure place. Our AI-powered platform transforms complex medical
            documents into a clear health timeline for patients and doctors.
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

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-5 top-10 h-24 w-24 rounded-full bg-[#f7c4ce] opacity-60 blur-2xl" />

          <div className="relative overflow-hidden rounded-[30px] border-8 border-white bg-white shadow-2xl">
            <div className="h-[430px] bg-gradient-to-br from-[#7f1025] via-[#a71930] to-[#d92745] p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70">HEALTH ANALYTICS</p>
                  <p className="mt-1 text-lg font-bold text-white">
                    Patient Overview
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl">
                  ❤️
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Patient ID</p>
                    <p className="font-bold text-gray-800">PAT-1001</p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                    Active
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#fff1f3] p-4">
                    <p className="text-xs text-gray-500">Consultations</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#a71930]">
                      08
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#fff1f3] p-4">
                    <p className="text-xs text-gray-500">Reports</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#a71930]">
                      14
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-gray-100 p-4">
                  <p className="text-xs font-semibold text-gray-500">
                    Recent Health Record
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Blood Pressure
                      </p>
                      <p className="text-xs text-gray-400">Aug 23, 2026</p>
                    </div>

                    <p className="font-extrabold text-[#a71930]">120/80</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                <span className="text-xs text-white">AI document analysis</span>

                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#a71930]">
                  ANALYZED
                </span>
              </div>
            </div>
          </div>

          {/* Floating card */}

          <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-4 shadow-xl sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-xl">
                ✓
              </div>

              <div>
                <p className="text-sm font-bold text-gray-800">
                  Health Records
                </p>
                <p className="text-xs text-gray-500">Successfully Organized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
