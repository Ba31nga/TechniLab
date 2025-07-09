// File: src/app/page.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 font-sans">
      {/* hero section */}
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          Welcome to Technilab
        </h1>
        <p className="text-lg sm:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
          A unified platform for managing school operations, powered by Next.js
          and Tailwind CSS.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-xl border border-white text-white hover:bg-white hover:text-black transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* features section */}
      <section className="mt-28 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Modular Layout</h3>
          <p className="text-neutral-400 text-sm">
            Role-based interface with flexible modules: permissions, schedules,
            requests, AI.
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Dark Mode Native</h3>
          <p className="text-neutral-400 text-sm">
            Built from the ground up for a dark environment — clean, elegant,
            focused.
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Realtime Ready</h3>
          <p className="text-neutral-400 text-sm">
            Firebase-backed updates with Firestore and authentication out of the
            box.
          </p>
        </div>
      </section>

      {/* footer */}
      <footer className="mt-28 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Technilab. Crafted with Next.js and
        Tailwind CSS.
      </footer>
    </main>
  );
}
