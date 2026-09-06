"use server";

import { cookies } from "next/headers";

type CreateReviewPayload = {
  rentalId: string;
  rating: number;
  comment: string;
};

type CreateReviewResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const createReview = async (
  payload: CreateReviewPayload,
): Promise<CreateReviewResponse> => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    return {
      success: result.success,
      message: result.message,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed to create review",
    };
  }
};