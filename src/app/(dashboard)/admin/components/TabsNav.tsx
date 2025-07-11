// file: app/admin/components/TabsNav.tsx
"use client";

import clsx from "clsx";

type TabsNavProps = {
  activeTab: "users" | "roles";
  setActiveTab: (tab: "users" | "roles") => void;
};

export function TabsNav({ activeTab, setActiveTab }: TabsNavProps) {
  const tabs = [
    { id: "users", label: "משתמשים" },
    { id: "roles", label: "תפקידים" },
  ];

  return (
    <nav className="flex border-b border-neutral-800 w-full overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as "users" | "roles")}
          className={clsx(
            "px-4 py-2 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "text-white border-b-2 border-blue-500"
              : "text-neutral-400 hover:text-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
