const testimonials = [
  {
    name: "Dr. Sarah Ahmed",
    role: "General Physician",
    text: "Having historical records organized in one place makes it much easier to understand a patient's previous treatment.",
  },
  {
    name: "Nusrat Rahman",
    role: "Patient",
    text: "I can finally keep my prescriptions and reports organized instead of searching through old files whenever I visit a doctor.",
  },
  {
    name: "Dr. Mahmud Hasan",
    role: "Medical Consultant",
    text: "The timeline view gives a quick picture of previous medicines and diagnostic results before a consultation.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#fafafa]">
      <div className="container-custom">
        <div className="section-heading">
          <span className="badge">USER EXPERIENCE</span>

          <h2>
            Built Around
            <span className="text-[#a71930]"> Real Healthcare Needs</span>
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="text-xl text-[#a71930]">★★★★★</div>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                “{item.text}”
              </p>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <p className="font-bold text-[#5c0b1b]">{item.name}</p>

                <p className="mt-1 text-xs text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
