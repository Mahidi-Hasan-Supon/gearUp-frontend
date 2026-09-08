
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutUser } from "@/service/logout";

export default function BecomeProviderButton() {
  const router = useRouter();

  const handleBecomeProvider = async () => {
    const result = await logoutUser();

    if (result.success) {
      toast.success("Please create a Provider account");

      router.push("/register?role=PROVIDER");
    //   router.refresh();
    }
  };

  return (
    <button
      onClick={handleBecomeProvider}
      className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition hover:bg-muted"
    >
      Become a Provider
    </button>
  );
}

