"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "../_action/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as "CUSTOMER" | "PROVIDER",
    };

    const result = await registerAction(payload);
    if (result.success) {
      toast.success(result.message);
      router.push("/login");
      return;
    }

    if (result.success === false) {
      toast.error(result.message);
      setError(result.message);
      setLoading(false);
    }

    if (result?.success === false) {
      setError(result.message);
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-md space-y-5 border p-5 shadow rounded-2xl"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input id="name" name="name" placeholder="Enter your name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>

        <select
          id="role"
          name="role"
          defaultValue="CUSTOMER"
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="CUSTOMER">Customer</option>
          <option value="PROVIDER">Provider</option>
        </select>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
