// file: app/admin/page.tsx
"use client";

import { useState } from "react";
import { TabsNav } from "./components/TabsNav";
import UsersTab from "./components/UsersTab";
import RolesTab from "./components/RolesTab";

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");

  return (
    <main className="min-h-screen bg-black text-white p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">פאנל ניהול</h1>
        <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          {activeTab === "users" && <UsersTab />}
          {activeTab === "roles" && <RolesTab />}
        </div>
      </div>
    </main>
  );
}
