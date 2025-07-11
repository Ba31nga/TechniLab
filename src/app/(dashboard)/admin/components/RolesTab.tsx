"use client";

import { useMemo, useState } from "react";
import { Plus, Pencil, Search } from "lucide-react";
import { RoleModal } from "./RoleModal";
import type { Role } from "../../types";

const mockRoles: Role[] = [
  {
    id: "admin",
    name: "אדמין",
    color: "#3b82f6",
    usersCount: 3,
    description: "גישה מלאה למערכת וניהול משתמשים",
  },
  {
    id: "tech",
    name: "טכנאי",
    color: "#14b8a6",
    usersCount: 5,
    description: "תחזוקת ציוד ותמיכה טכנית",
  },
  {
    id: "viewer",
    name: "צופה",
    color: "#f59e0b",
    usersCount: 8,
    description: "קריאה בלבד, ללא הרשאות עריכה",
  },
  {
    id: "guest",
    name: "אורח",
    color: "#ef4444",
    usersCount: 2,
    description: "גישה זמנית או מוגבלת",
  },
];

export default function RolesTab() {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (role?: Role) => {
    setSelectedRole(role || null);
    setShowModal(true);
  };

  const handleSave = (data: {
    name: string;
    description: string;
    color: string;
  }) => {
    // save logic here (update or add)
    console.log("saving role", data);
    setShowModal(false);
  };

  const filteredRoles = useMemo(() => {
    return mockRoles.filter((role) =>
      role.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-6" dir="rtl">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">ניהול תפקידים</h2>
          <p className="text-sm text-neutral-400 mt-1">
            צפייה ועריכה של תפקידי מערכת
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
        >
          <Plus size={16} className="inline-block ml-1" />
          תפקיד חדש
        </button>
      </div>

      {/* search bar */}
      <div className="relative w-full sm:w-1/2">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          placeholder="חפש לפי שם התפקיד"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white text-sm px-10 py-2.5 rounded-xl transition"
        />
      </div>

      {/* role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-white text-lg font-medium">{role.name}</div>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: role.color }}
              />
            </div>
            <div className="text-sm text-neutral-400">{role.description}</div>
            <div className="text-sm text-neutral-500">
              {role.usersCount} משתמשים
            </div>
            <div>
              <button
                onClick={() => openModal(role)}
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
              >
                <Pencil size={14} />
                ערוך
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* modal */}
      {showModal && (
        <RoleModal
          role={
            selectedRole
              ? {
                  name: selectedRole.name,
                  description: selectedRole.description ?? "",
                  color: selectedRole.color,
                }
              : null
          }
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
