"use client";

import { useEffect } from "react";

export default function ErrorTestPage() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      throw new Error("This is a test error raised after two seconds!");
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold">Error Test Page</h1>
      <p className="mb-4">
        A client-side error will be thrown after 2 seconds.
      </p>
    </main>
  );
}
