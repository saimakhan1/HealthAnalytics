import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
