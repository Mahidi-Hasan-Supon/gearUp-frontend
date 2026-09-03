"use server";

import { cookies } from "next/headers";

export const getRentalById = async (id: string) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
      data: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rental/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    return result;
  } catch {
    return {
      success: false,
      message: "Failed to get rental",
      data: null,
    };
  }
};
