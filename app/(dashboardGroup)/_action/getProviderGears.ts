"use server";

import { cookies } from "next/headers";
import { Gear } from "@/lib/types";

type ProviderGearsResponse = {
  success: boolean;
  message: string;
  data: Gear[];
};

export const getProviderGears = async (): Promise<ProviderGearsResponse> => {
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
      `${process.env.BACKEND_API_URL}/api/provider/gear`,
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
        message: result.message || "Failed to get provider gears",
        data: [],
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data as Gear[],
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};