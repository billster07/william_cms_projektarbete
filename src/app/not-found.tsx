import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! Page not found.</p>
      <Link href="/">
        <button className="border-2 rounded-full border-black text-sm px-4 py-2">
          Back to Home
        </button>
      </Link>
    </main>
  );
}
