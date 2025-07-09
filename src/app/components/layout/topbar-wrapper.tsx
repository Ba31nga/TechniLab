"use client";

import { useState, useRef, useEffect } from "react";
import Topbar from "./topbar";
import SearchModal from "../search/SearchModal";
import NotificationModal from "../notifications/NotificationModal";

export default function TopbarWrapper() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");

  const searchAnchorRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const isTyping =
        active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");

      const key = e.key;

      // close notifications on esc
      if (key === "Escape" && showNotifications) {
        setShowNotifications(false);
        return;
      }

      // if notification modal is open, close it and trigger search
      if (showNotifications && !isTyping) {
        e.preventDefault();
        setShowNotifications(false);

        if (key.toLowerCase() === "f") {
          // open search modal with no query
          setInitialQuery("");
          setShowSearch(true);
        } else if (key.length === 1) {
          // open search modal with initial character
          setInitialQuery(key);
          setShowSearch(true);
        }

        return;
      }

      // ctrl+f or cmd+f triggers search modal without writing anything
      if (!isTyping && key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setInitialQuery("");
        setShowSearch(true);
        return;
      }

      // trigger search if user types any character
      if (!isTyping && key.length === 1 && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setInitialQuery(key);
        setShowSearch(true);
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [showNotifications]);

  return (
    <>
      <Topbar
        onSearch={() => {
          setInitialQuery("");
          setShowSearch(true);
          setShowNotifications(false);
        }}
        toggleNotifications={() => {
          setShowNotifications((prev) => {
            if (!prev) setShowSearch(false);
            return !prev;
          });
        }}
        anchorRef={searchAnchorRef}
        notifRef={notifRef}
      />

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        anchorRef={searchAnchorRef}
        initialQuery={initialQuery}
        clearInitialQuery={() => setInitialQuery("")}
      />

      <NotificationModal
        isOpen={showNotifications}
        anchorRef={notifRef}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}
