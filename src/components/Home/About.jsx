export default function About() {
  return (
    <section id="about" className="section-padding bg-[#fafafa]">
      <div className="container-custom grid items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-[#7f1025] p-8 text-white">
              <p className="text-4xl font-extrabold">01</p>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Upload your existing health documents.
              </p>
            </div>

            <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">
              <p className="text-4xl font-extrabold text-[#a71930]">02</p>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Let AI organize important medical information.
              </p>
            </div>

            <div className="-mt-4 rounded-3xl bg-white p-8 shadow-lg">
              <p className="text-4xl font-extrabold text-[#a71930]">03</p>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Build a clean medical timeline.
              </p>
            </div>

            <div className="rounded-3xl bg-[#a71930] p-8 text-white">
              <p className="text-4xl font-extrabold">04</p>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Give doctors a clearer health overview.
              </p>
            </div>
          </div>
        </div>

        <div>
          <span className="badge inline-flex items-center rounded-full bg-[#fff1f3] px-4 py-2 text-xs font-bold text-[#a71930]">
            ABOUT OUR PLATFORM
          </span>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#5c0b1b]">
            We Make Medical Information
            <span className="text-[#a71930]"> Easier to Understand</span>
          </h2>

          <p className="mt-6 leading-8 text-gray-500">
            Medical records can become difficult to manage when prescriptions,
            reports and test results are stored in different places. Our
            platform brings those records together into one organized digital
            health history.
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Organized medical history",
              "AI-powered document extraction",
              "Doctor-friendly health analytics",
              "Easy access to historical records",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a71930] text-xs text-white">
                  ✓
                </span>

                <span className="text-sm font-semibold text-gray-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
