"use server";

import { cookies } from "next/headers";

type CreateGearPayload = {
  title: string;
  description: string;
  brand: string;
  pricePerDay: number;
  image: string;
  quantity: number;
  categoryId: string;
  status: string;
};

type CreateGearResponse = {
  success: boolean;
  message: string;
};

export const createProviderGear = async (
  payload: CreateGearPayload,
): Promise<CreateGearResponse> => {
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
      `${process.env.BACKEND_API_URL}/api/provider/gear`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to create gear",
      };
    }

    return {
      success: true,
      message: result.message || "Gear created successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
