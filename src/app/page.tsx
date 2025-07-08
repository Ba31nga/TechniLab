export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold sm:text-6xl mb-6">
          Build Better Products with Technilab
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
          A modern development experience powered by Next.js and Tailwind CSS.
          Scalable, fast, and production-ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Modern Stack</h3>
          <p className="text-zinc-600 dark:text-zinc-300">
            Built with Next.js App Router, TypeScript, and Tailwind CSS 3. Fully
            typed and blazing fast.
          </p>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Scalable UI</h3>
          <p className="text-zinc-600 dark:text-zinc-300">
            Responsive, mobile-first components that adapt seamlessly to all
            screen sizes.
          </p>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Developer Experience</h3>
          <p className="text-zinc-600 dark:text-zinc-300">
            Enjoy autocompletion, custom fonts, dark mode, and fast refresh—all
            preconfigured.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} Technilab. All rights reserved.
      </footer>
    </main>
  );
}
