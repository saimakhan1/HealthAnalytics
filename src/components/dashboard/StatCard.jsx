"use client";

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "primary",
}) {
  const styles = {
    primary: {
      icon: "bg-[#fff1f3] text-[#a71930]",
      value: "text-[#681225]",
    },
    green: {
      icon: "bg-emerald-50 text-emerald-600",
      value: "text-emerald-700",
    },
    orange: {
      icon: "bg-orange-50 text-orange-600",
      value: "text-orange-700",
    },
    purple: {
      icon: "bg-purple-50 text-purple-600",
      value: "text-purple-700",
    },
  };

  const current = styles[variant] || styles.primary;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h3 className={`mt-2 text-3xl font-extrabold ${current.value}`}>
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${current.icon}`}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {description && (
        <p className="mt-3 text-xs text-gray-400">{description}</p>
      )}
    </div>
  );
}
