"use server";

import { cookies } from "next/headers";

export const deleteProviderGear = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please login first",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to delete gear",
      };
    }

    return {
      success: true,
      message: result.message || "Gear deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};