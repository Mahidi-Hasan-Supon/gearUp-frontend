

"use client"; // <--- Ei line-ta shobcheye upore thakote hobe

import { useEffect } from "react";

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
    <div>
      <h2>Kichu ekta bhool hoyeche!</h2>
      <button onClick={() => reset()}>Abar chesta korun</button>
    </div>
  );
}