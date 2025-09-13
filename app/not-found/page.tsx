// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <h1 className="mb-3 text-2xl font-semibold text-neutral-900">
          Website not found
        </h1>
        <p className="mb-6 text-sm text-neutral-600">
          We couldn’t complete the scan for this URL. Please check the address and try again.
        </p>
        <Link
          href="/"
          className="inline-block w-full rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-base font-medium text-white transition hover:from-amber-600 hover:to-amber-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
