// const testimonials = [
//   {
//     name: "Dr. Sarah Ahmed",
//     role: "General Physician",
//     text: "Having historical records organized in one place makes it much easier to understand a patient's previous treatment.",
//   },
//   {
//     name: "Nusrat Rahman",
//     role: "Patient",
//     text: "I can finally keep my prescriptions and reports organized instead of searching through old files whenever I visit a doctor.",
//   },
//   {
//     name: "Dr. Mahmud Hasan",
//     role: "Medical Consultant",
//     text: "The timeline view gives a quick picture of previous medicines and diagnostic results before a consultation.",
//   },
// ];

// export default function Testimonials() {
//   return (
//     <section className="section-padding bg-[#fafafa]">
//       <div className="container-custom">
//         <div className="section-heading">
//           <span className="badge">USER EXPERIENCE</span>

//           <h2>
//             Built Around
//             <span className="text-[#a71930]"> Real Healthcare Needs</span>
//           </h2>
//         </div>

//         <div className="grid gap-5 lg:grid-cols-3">
//           {testimonials.map((item) => (
//             <div key={item.name} className="rounded-2xl bg-white p-7 shadow-sm">
//               <div className="text-xl text-[#a71930]">★★★★★</div>

//               <p className="mt-5 text-sm leading-7 text-gray-600">
//                 “{item.text}”
//               </p>

//               <div className="mt-6 border-t border-gray-100 pt-5">
//                 <p className="font-bold text-[#5c0b1b]">{item.name}</p>

//                 <p className="mt-1 text-xs text-gray-500">{item.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

const testimonials = [
  {
    name: "Dr. Saiman Ahmed",
    role: "General Physician",
    image: "/images/doctor-portrait.jpg",
    text: "Having historical records organized in one place makes it much easier to understand a patient's previous treatment.",
  },
  {
    name: "Nusrat Rahman",
    role: "Patient",
    image: "/images/doctor-patient.jpg",
    text: "I can finally keep my prescriptions and reports organized instead of searching through old files whenever I visit a doctor.",
  },
  {
    name: "Dr. Mahmud Hasan",
    role: "Medical Consultant",
    image: "/images/doctor-portrait2.jpg",
    text: "The timeline view gives a quick picture of previous medicines and diagnostic results before a consultation.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#fafafa]">
      <div className="container-custom">
        {/* Heading */}

        <div className="section-heading">
          <span className="badge">USER EXPERIENCE</span>

          <h2>
            Built Around
            <span className="text-[#a71930]"> Real Healthcare Needs</span>
          </h2>

          <p>
            See how patients and healthcare professionals can benefit from a
            more organized approach to medical information.
          </p>
        </div>

        {/* Testimonials */}

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Person Image */}

              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#5c0b1b]/70 via-transparent to-transparent" />

                {/* Role */}

                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#a71930]">
                    {item.role}
                  </span>
                </div>
              </div>

              {/* Content */}

              <div className="p-7">
                <div className="text-lg tracking-wider text-[#a71930]">
                  ★★★★★
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  “{item.text}”
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1f3] text-sm font-bold text-[#a71930]">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-[#5c0b1b]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
