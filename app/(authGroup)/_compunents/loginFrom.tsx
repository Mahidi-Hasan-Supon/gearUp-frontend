"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../_action/loginAuth";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await loginUser({
        email,
        password,
      });
      if (result.success) {
        toast.success("Login successful");
      }

      if (result.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else if (result.role === "PROVIDER") {
        router.push("/provider-dashboard");
      } else if (result.role === "CUSTOMER") {
        router.push("/dashboard/customer");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl border p-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <p className="text-sm text-muted-foreground text-center">
            Login to your GearUp account
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Login
        </button>
      </form>
    </div>
  );
}
