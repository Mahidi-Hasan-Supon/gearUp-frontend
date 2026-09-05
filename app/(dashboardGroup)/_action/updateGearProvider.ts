"use server";

import { cookies } from "next/headers";

type UpdateGearPayload = {
  title: string;
  description: string;
  brand: string;
  pricePerDay: number;
  image: string;
  quantity: number;
  categoryId: string;
  status: string;
};

export const updateProviderGear = async (
  id: string,
  payload: UpdateGearPayload,
) => {
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
      `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`,
      {
        method: "PUT",

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
        message: result.message || "Failed to update gear",
      };
    }

    return {
      success: true,
      message: result.message || "Gear updated successfully",
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
