"use server";

import { cookies } from "next/headers";

export const createPayment = async (rentalId: string) => {
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
      `${process.env.BACKEND_API_URL}/api/payment/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          rentalId,
        }),
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Payment creation failed",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
