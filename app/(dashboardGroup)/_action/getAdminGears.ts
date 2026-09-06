"use server";

import { cookies } from "next/headers";

export type AdminGear = {
  id: string;
  title: string;
  description: string;
  brand: string;
  pricePerDay: number;
  quantity: number;
  image: string | null;
  status: string;

  provider: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
};

type AdminGearResponse = {
  success: boolean;
  message: string;
  data: AdminGear[];
};

export const getAdminGears = async (): Promise<AdminGearResponse> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/gear`,
      {
        method: "GET",
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {},
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to get gear",
        data: [],
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
      data: [],
    };
  }
};