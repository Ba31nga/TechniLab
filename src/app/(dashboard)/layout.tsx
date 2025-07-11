// File: src/app/(dashboard)/layout.tsx

import TopbarWrapper from "@/(dashboard)/components/topbar/topbar-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* topbar container */}
      <div className="w-full">
        <TopbarWrapper />
      </div>

      {/* content area fills the rest of the screen */}
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
