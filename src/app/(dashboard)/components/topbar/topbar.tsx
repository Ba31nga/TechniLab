"use client";

import { RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

// list of nav items with their labels and paths
const navItems = [
  { label: "סקירה", path: "/" },
  { label: "שילובים", path: "/admin" },
  { label: "בקשות", path: "/requests" },
  { label: "פעילות", path: "/activity" },
  { label: "דומיינים", path: "/domains" },
  { label: "אחסון", path: "/storage" },
  { label: "דגלים", path: "/flags" },
  { label: "AI", path: "/ai" },
  { label: "תמיכה", path: "/support" },
  { label: "הגדרות", path: "/settings" },
];

export default function Topbar({
  onSearch,
  anchorRef,
  toggleNotifications,
  notifRef,
}: {
  onSearch: () => void;
  anchorRef: RefObject<HTMLDivElement | null>;
  toggleNotifications: () => void;
  notifRef: RefObject<HTMLButtonElement | null>;
}) {
  const pathname = usePathname();

  return (
    <div
      dir="rtl"
      className="w-full bg-gradient-to-b from-neutral-900 to-neutral-950 text-white text-sm z-50 relative shadow-sm border-b border-neutral-800"
    >
      {/* top section */}
      <header className="flex items-center justify-between h-14 px-6">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={34} height={34} />
        </Link>

        {/* search bar button */}
        <div
          ref={anchorRef}
          className="relative w-full max-w-sm mx-6 hidden md:block"
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

        {/* notifications + avatar */}
        <div className="flex items-center gap-3">
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

      {/* nav section */}
      <nav className="flex items-center px-6 h-10 text-sm space-x-3 rtl:space-x-reverse relative">
        {navItems.map(({ label, path }) => {
          const isActive = pathname === path;

          return (
            <Link href={path} key={label}>
              <span
                className={`relative px-3 py-1.5 rounded-md font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {label}
                {isActive && (
                  <span className="absolute inset-x-1 -bottom-0.5 h-[2px] bg-white rounded-full" />
                )}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
