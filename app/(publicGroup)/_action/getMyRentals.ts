"use server";

import { cookies } from "next/headers";

export const getMyRentals = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
      data: [],
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rental`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to get rentals",
        data: [],
      };
    }

    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};