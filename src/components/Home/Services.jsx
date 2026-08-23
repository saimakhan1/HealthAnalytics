const services = [
  {
    icon: "📄",
    title: "Smart Document Upload",
    description:
      "Upload prescriptions, medical reports and test documents in PDF, PNG or JPEG format.",
  },
  {
    icon: "🤖",
    title: "AI Health Extraction",
    description:
      "AI reads your documents and extracts medicines, symptoms, vital signs and test results.",
  },
  {
    icon: "📊",
    title: "Health Analytics",
    description:
      "Transform historical medical information into meaningful charts and health insights.",
  },
  {
    icon: "🩺",
    title: "Doctor Dashboard",
    description:
      "Doctors can quickly review a patient's historical records before a consultation.",
  },
  {
    icon: "💊",
    title: "Medicine Tracking",
    description:
      "Track antibiotics, vitamins, calcium and gastric medicines across consultations.",
  },
  {
    icon: "🧪",
    title: "Test History",
    description:
      "Keep diagnostic test values organized chronologically for easier comparison.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <div className="section-heading">
          <span className="badge">OUR SERVICES</span>

          <h2>
            Everything You Need to
            <span className="text-[#a71930]"> Understand Your Health</span>
          </h2>

          <p>
            A simple digital platform designed to organize medical information
            and make healthcare decisions easier.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="card-hover rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1f3] text-2xl">
                {service.icon}
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-[#5c0b1b]">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
