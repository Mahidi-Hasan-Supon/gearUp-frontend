"use server";

type GoogleAuthPayload = {
  credential: string;
  role: "CUSTOMER" | "PROVIDER";
};

export async function googleAuthAction(payload: GoogleAuthPayload) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/google`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Google authentication failed",
    };
  }

  return {
    success: true,
    message: result.message || "Google login successful",
    user: result.data.user,
  };
}