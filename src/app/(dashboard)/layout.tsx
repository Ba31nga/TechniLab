// File: src/app/(dashboard)/layout.tsx

import TopbarWrapper from "@/components/layout/topbar-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopbarWrapper />
      <main className="p-4">{children}</main>
    </div>
  );
}
