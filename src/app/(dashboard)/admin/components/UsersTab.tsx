// file: app/(dashboard)/admin/components/UsersTab.tsx
"use client";

import { useState, useMemo } from "react";
import { Plus, Pencil, Search } from "lucide-react";
import type { User, Role } from "../../types";
import UserModal from "./UserModal";

const mockRoles: Role[] = [
  { id: "admin", name: "אדמין", color: "#3b82f6" },
  { id: "tech", name: "טכנאי", color: "#14b8a6" },
  { id: "viewer", name: "צופה", color: "#f59e0b" },
];

const mockUsers: User[] = [
  {
    id: "1",
    name: "דניאל רוזנברג",
    email: "daniel@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    roles: [mockRoles[0], mockRoles[1]],
  },
  {
    id: "2",
    name: "שירה כהן",
    email: "shira@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    roles: [mockRoles[2]],
  },
];

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openModal = (user?: User) => {
    setSelectedUser(user || null);
    setShowModal(true);
  };

  const handleSave = (user: User) => {
    if (user.id) {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers((prev) => [...prev, { ...user, id: String(Date.now()) }]);
    }
    setShowModal(false);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div className="space-y-6" dir="rtl">
      {/* top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">ניהול משתמשים</h2>
          <p className="text-sm text-neutral-500">
            הקצאת תפקידים למשתמשים במערכת
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
        >
          <Plus size={16} className="inline-block ml-1" />
          משתמש חדש
        </button>
      </div>

      {/* search input */}
      <div className="w-full sm:w-1/2 relative">
        <Search className="absolute right-3 top-3 h-4 w-4 text-neutral-500" />
        <input
          type="text"
          placeholder="חפש משתמש..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white text-sm px-10 py-2.5 rounded-xl transition"
        />
      </div>

      {/* user cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-xl p-5 space-y-4 transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  user.avatarUrl ||
                  "https://api.dicebear.com/7.x/initials/svg?seed=" + user.name
                }
                alt={user.name}
                className="w-10 h-10 rounded-full border border-neutral-700 object-cover"
              />
              <div>
                <div className="text-white font-medium text-base">
                  {user.name}
                </div>
                <div className="text-sm text-neutral-500">{user.email}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {user.roles.map((role) => (
                <span
                  key={role.id}
                  className="px-2.5 py-1 text-xs font-medium rounded-full text-white"
                  style={{ backgroundColor: role.color }}
                >
                  {role.name}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => openModal(user)}
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
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
        <UserModal
          user={selectedUser}
          allRoles={mockRoles}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
