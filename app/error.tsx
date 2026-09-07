"use client";
import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl sm:p-10">
          {/* Error Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          {/* Content */}
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
              Error
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Something went wrong!
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
            We couldn't load this page right now. Please try again. If the
              problem continues, please come back later.
            </p>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={() => reset()}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
          <div></div>

          {/* Footer */}
          <div className="mt-7 border-t border-slate-800 pt-5">
            <p className="text-xs text-slate-500">
              Something unexpected happened. Don't worry, you can try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
