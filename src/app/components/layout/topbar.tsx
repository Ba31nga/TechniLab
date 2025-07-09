// src/app/components/topbar.tsx
"use client";

import { RefObject } from "react";
import Image from "next/image";
import { Bell, Search } from "lucide-react";

const navItems = [
  "סקירה",
  "שילובים",
  "בקשות",
  "פעילות",
  "דומיינים",
  "אחסון",
  "דגלים",
  "AI",
  "תמיכה",
  "הגדרות",
];

export default function Topbar({
  onSearch,
  anchorRef,
  toggleNotifications,
  notifRef,
}: {
  onSearch: () => void;
  anchorRef: RefObject<HTMLDivElement | null>; // ✅ updated
  toggleNotifications: () => void;
  notifRef: RefObject<HTMLButtonElement | null>; // ✅ updated
}) {
  return (
    <div
      dir="rtl"
      className="w-full bg-[#0a0a0a] text-white text-sm z-50 relative border-b border-neutral-800"
    >
      <header className="flex items-center justify-between h-12 px-4">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
        </div>

        <div
          ref={anchorRef}
          className="relative w-full max-w-xs mx-4 hidden md:block"
        >
          <button
            type="button"
            onClick={onSearch}
            className="w-full text-right"
          >
            <div className="flex items-center px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md hover:border-white/40 transition">
              <Search size={14} className="text-neutral-400 ml-2" />
              <span className="text-sm text-neutral-500 w-full truncate">
                חיפוש...
              </span>
              <kbd className="text-[10px] px-1.5 py-0.5 ml-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-400">
                F
              </kbd>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            ref={notifRef}
            type="button"
            onClick={toggleNotifications}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-700 hover:bg-neutral-800 transition"
            aria-label="התראות"
          >
            <Bell size={16} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 shadow-md" />
        </div>
      </header>

      <nav className="flex items-center px-4 space-x-3 rtl:space-x-reverse h-9 text-neutral-400 text-sm border-t border-neutral-800">
        {navItems.map((item) => (
          <button
            key={item}
            className="px-2 py-1 hover:text-white transition whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}
