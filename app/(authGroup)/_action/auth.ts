"use server";

import { redirect } from "next/navigation";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
};

export async function registerAction(payload: RegisterPayload) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Registration failed",
    };
  }

  redirect("/login");
}