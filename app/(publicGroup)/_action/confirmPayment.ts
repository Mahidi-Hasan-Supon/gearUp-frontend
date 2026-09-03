"use server";

import { cookies } from "next/headers";

export const confirmPayment = async (sessionId: string) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payment/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          session: sessionId,
        }),
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Payment confirmation failed",
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};