"use client";

import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";

type RoleInput = {
  name: string;
  description: string;
  color: string;
};

type Props = {
  role: RoleInput | null;
  onClose: () => void;
  onSave: (data: RoleInput) => void;
};

export function RoleModal({ role, onClose, onSave }: Props) {
  const [name, setName] = useState(role?.name || "");
  const [description, setDescription] = useState(role?.description || "");
  const [color, setColor] = useState(role?.color || "#3b82f6");

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEsc);
    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [onClose]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ name, description, color });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      dir="rtl"
    >
      <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md shadow-lg text-white relative space-y-5">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-neutral-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-semibold">
          {role ? "עריכת תפקיד" : "תפקיד חדש"}
        </h3>

        {/* name */}
        <div>
          <label className="block text-sm mb-1">שם התפקיד</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-800 rounded-xl px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="לדוג׳: טכנאי"
          />
        </div>

        {/* description */}
        <div>
          <label className="block text-sm mb-1">תיאור (אופציונלי)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-neutral-800 rounded-xl px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="מה כולל התפקיד הזה?"
          />
        </div>

        {/* color */}
        <div>
          <label className="block text-sm mb-2">צבע</label>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border border-white"
              style={{ backgroundColor: color }}
            />
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        </div>

        {/* actions */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-sm bg-neutral-700 hover:bg-neutral-600"
          >
            ביטול
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name}
            className="px-4 py-1.5 rounded-xl text-sm bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            שמור
          </button>
        </div>
      </div>
    </div>
  );
}
