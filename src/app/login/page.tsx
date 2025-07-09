/* eslint-disable @next/next/no-img-element */
// File: app/login/page.tsx

"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login logic here
    console.log({ email, password });
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-screen flex items-center justify-center px-4 text-white overflow-hidden"
    >
      {/* background image */}
      <div
        className="absolute inset-0 z-[-2] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.png')" }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 z-[-1] bg-black/97" />

      {/* top-left logo */}
      <div className="absolute top-6 left-6 z-10">
        <img
          src="/images/logo.png"
          alt="TechniLab Logo"
          className="h-12 w-auto"
          draggable={false}
        />
      </div>

      {/* login card */}
      <div className="w-full max-w-md px-6 py-10 border border-neutral-800 rounded-2xl bg-gradient-to-b from-neutral-900 to-black shadow-2xl z-10">
        <h1 className="text-3xl font-semibold text-center mb-2 text-white">
          TechniLab
        </h1>
        <p className="text-sm text-neutral-400 text-center mb-8">
          מערכת צוות בית הספר
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-1 text-neutral-300"
            >
              אימייל
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-1 text-neutral-300"
            >
              סיסמה
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-neutral-200 transition"
          >
            התחבר
          </button>
        </form>

        <p className="text-xs text-center text-neutral-500 mt-6">
          לא ניתן ליצור חשבון בעצמך – רק מנהל המערכת יוצר משתמשים.
        </p>
      </div>
    </div>
  );
}
