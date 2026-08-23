const features = [
  {
    icon: "🔐",
    title: "Privacy Focused",
    description:
      "Your prototype records remain within the browser's local storage rather than requiring an external database.",
  },
  {
    icon: "⚡",
    title: "Fast Access",
    description:
      "Doctors can search a patient ID and quickly review historical health information.",
  },
  {
    icon: "🧠",
    title: "AI Assisted",
    description:
      "AI helps convert unstructured medical documents into structured information.",
  },
  {
    icon: "📱",
    title: "Responsive Design",
    description:
      "The interface is designed to work smoothly across desktop, tablet and mobile devices.",
  },
];

export default function Features() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="section-heading">
          <span className="badge">WHY CHOOSE US</span>

          <h2>
            Designed for
            <span className="text-[#a71930]"> Modern Healthcare</span>
          </h2>

          <p>
            A clean and practical healthcare experience focused on organization,
            accessibility and useful information.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-hover flex gap-5 rounded-2xl border border-gray-100 p-7"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fff1f3] text-2xl">
                {feature.icon}
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#5c0b1b]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
