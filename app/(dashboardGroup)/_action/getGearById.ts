"use server";

import { Gear } from "@/lib/types";

type GearResponse = {
  success: boolean;
  message: string;
  data: Gear | null;
};

export const getGearById = async (
  id: string,
): Promise<GearResponse> => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/gear/${id}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to get gear",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};