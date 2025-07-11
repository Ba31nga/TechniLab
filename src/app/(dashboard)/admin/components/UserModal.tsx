"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import type { User, Role } from "../../types";

type Props = {
  user: User | null;
  allRoles: Role[];
  onClose: () => void;
  onSave: (user: User & { password?: string }) => void;
};

export default function UserModal({ user, allRoles, onClose, onSave }: Props) {
  const isNew = !user;
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [roles, setRoles] = useState<Role[]>(user?.roles || []);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (!isNew) {
      setChangePassword(false);
      setPassword("");
    }
  }, [isNew]);

  const toggleRole = (role: Role) => {
    setRoles((prev) =>
      prev.some((r) => r.id === role.id)
        ? prev.filter((r) => r.id !== role.id)
        : [...prev, role]
    );
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;

    const updatedUser: User & { password?: string } = {
      ...user,
      id: user?.id || undefined,
      name,
      email,
      roles,
    };

    if (isNew) updatedUser.password = password;
    else if (changePassword && password) updatedUser.password = password;

    onSave(updatedUser);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      dir="rtl"
    >
      <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md shadow-lg space-y-5 text-white relative">
        <button
          className="absolute left-4 top-4 text-neutral-400 hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold">
          {isNew ? "משתמש חדש" : "עריכת משתמש"}
        </h2>

        {/* name */}
        <div>
          <label className="block text-sm mb-1">שם מלא</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-800 rounded-xl px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* email */}
        <div>
          <label className="block text-sm mb-1">אימייל</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-neutral-800 rounded-xl px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* password */}
        {isNew || (!isNew && changePassword) ? (
          <div>
            <label className="block text-sm mb-1">
              סיסמה {isNew ? "(חובה)" : "(אופציונלי)"}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-800 rounded-xl px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute left-3 top-2.5 text-neutral-400 hover:text-white"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        ) : null}

        {!isNew && (
          <button
            type="button"
            onClick={() => setChangePassword((prev) => !prev)}
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            {changePassword ? "בטל שינוי סיסמה" : "שנה סיסמה"}
          </button>
        )}

        {/* roles (moved below password) */}
        <div>
          <label className="block text-sm mb-2 pt-2">תפקידים</label>
          <div className="flex flex-wrap gap-2">
            {allRoles.map((role) => {
              const selected = roles.some((r) => r.id === role.id);
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1 text-xs rounded-full border transition ${
                    selected
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: selected ? role.color : "transparent",
                    borderColor: role.color,
                  }}
                >
                  {role.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm rounded-xl bg-neutral-700 hover:bg-neutral-600"
          >
            ביטול
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name || !email || (isNew && !password)}
            className="px-4 py-1.5 text-sm rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            שמור
          </button>
        </div>
      </div>
    </div>
  );
}
