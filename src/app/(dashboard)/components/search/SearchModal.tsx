"use client";

import { useEffect, useState, RefObject } from "react";
import { Search } from "lucide-react";

const items = [
  { label: "techni-management", type: "Project" },
  { label: "Storage", type: "Team" },
  { label: "Enhanced Build Machines", type: "Settings" },
];

export default function SearchModal({
  isOpen,
  onClose,
  anchorRef,
  initialQuery,
  clearInitialQuery,
}: {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLDivElement | null>;
  initialQuery: string;
  clearInitialQuery: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      clearInitialQuery();
    }
  }, [initialQuery, clearInitialQuery]);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(0); // reset on query change
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter" && filtered[activeIndex]) {
        e.preventDefault();
        alert(`Selected: ${filtered[activeIndex].label}`);
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, activeIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24">
      <div
        className="w-full max-w-xl bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg text-white overflow-hidden"
        dir="rtl"
        style={{
          marginTop: anchorRef.current?.getBoundingClientRect().bottom ?? 100,
        }}
      >
        <div className="flex items-center border-b border-neutral-800 px-4 py-2">
          <Search size={16} className="text-neutral-400 ml-2" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש..."
            className="w-full bg-transparent outline-none placeholder-neutral-500 text-sm"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-400">
            Esc
          </kbd>
        </div>

        <ul className="max-h-96 overflow-y-auto divide-y divide-neutral-800">
          {filtered.map((item, i) => (
            <li
              key={i}
              className={`px-4 py-3 cursor-pointer transition text-sm flex justify-between ${
                i === activeIndex
                  ? "bg-neutral-800 text-white"
                  : "hover:bg-neutral-800 text-neutral-300"
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => {
                alert(`Selected: ${item.label}`);
                onClose();
              }}
            >
              <span>{item.label}</span>
              <span className="text-neutral-400">{item.type}</span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-neutral-500 text-sm">
              לא נמצאו תוצאות.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
