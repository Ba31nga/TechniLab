// src/app/components/notificationModal.tsx
"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { Bell } from "lucide-react";

const notifications = [
  {
    title: "techni-management",
    message: "failed to deploy in the Production environment",
    date: "May 21",
  },
  {
    title: "techni-management",
    message: "failed to deploy in the Production environment",
    date: "May 18",
  },
  {
    title: "techni-management-r9k9",
    message: "failed to deploy in the Production environment",
    date: "May 15",
  },
];

const archived = [
  {
    title: "techni-management",
    message: "was archived successfully",
    date: "April 12",
  },
];

export default function NotificationModal({
  isOpen,
  anchorRef,
  onClose,
}: {
  isOpen: boolean;
  anchorRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"notifications" | "archive">(
    "notifications"
  );
  const modalRef = useRef<HTMLDivElement>(null);

  // close the modal if user clicks outside of it
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, anchorRef, onClose]);

  if (!isOpen) return null;

  const top = anchorRef.current?.getBoundingClientRect().bottom ?? 48;
  const content = activeTab === "notifications" ? notifications : archived;

  return (
    <div
      ref={modalRef}
      className="absolute left-4 mt-2 w-96 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl text-white z-50"
      style={{ top }}
      dir="rtl"
    >
      {/* tab selector */}
      <div className="flex px-4 pt-4 border-b border-neutral-800 gap-6">
        <button
          className={`text-sm pb-2 font-medium ${
            activeTab === "notifications"
              ? "text-white border-b-2 border-white"
              : "text-neutral-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          תיבת התראות
        </button>
        <button
          className={`text-sm pb-2 ${
            activeTab === "archive"
              ? "text-white border-b-2 border-white font-medium"
              : "text-neutral-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("archive")}
        >
          ארכיון
        </button>
      </div>

      {/* notifications list */}
      <ul className="max-h-96 overflow-y-auto divide-y divide-neutral-800">
        {content.map((notif, idx) => (
          <li
            key={idx}
            className="flex px-4 py-3 space-x-4 rtl:space-x-reverse"
          >
            <div className="w-6 h-6 mt-1 text-yellow-400">
              <Bell size={16} />
            </div>
            <div className="text-sm leading-tight">
              <span className="text-white font-medium">{notif.title}</span>{" "}
              <span className="text-neutral-300">{notif.message}</span>
              <div className="text-neutral-500 text-xs mt-1">{notif.date}</div>
            </div>
          </li>
        ))}

        {/* only show "archive all" under the notifications tab */}
        {activeTab === "notifications" && (
          <li className="px-4 py-3 text-center text-sm text-blue-500 hover:underline cursor-pointer">
            ארכב הכל
          </li>
        )}
      </ul>
    </div>
  );
}
