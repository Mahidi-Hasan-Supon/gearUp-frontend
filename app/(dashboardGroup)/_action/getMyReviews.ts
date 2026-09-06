"use server";

import { cookies } from "next/headers";


export const getMyReviews = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews/my-reviews`,
      {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    return result;
  } catch {
    return {
      success: false,
      message: "Failed to get reviews",
      data: [],
    };
  }
};