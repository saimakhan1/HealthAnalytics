const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Register as a patient, doctor or authorized administrator.",
  },
  {
    number: "02",
    title: "Upload Documents",
    description: "Upload prescription images, PDFs and medical test reports.",
  },
  {
    number: "03",
    title: "Structured Medical Records",
    description:
      "Important medical information is organized clearly for easy understanding.",
  },
  {
    number: "04",
    title: "View Your Health History",
    description: "Review organized records and analytics from your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-[#5c0b1b]">
      <div className="container-custom">
        <div className="section-heading">
          <span className="badge bg-white/10 text-white">HOW IT WORKS</span>

          <h2 className="text-white">
            Healthcare Information,
            <span className="text-[#f6a6b4]"> Simplified</span>
          </h2>

          <p className="text-white/65">
            Four simple steps to turn scattered medical documents into an
            organized health history.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/10 bg-white/5 p-7"
            >
              <span className="text-4xl font-extrabold text-[#f6a6b4]">
                {step.number}
              </span>

              <h3 className="mt-6 text-lg font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
