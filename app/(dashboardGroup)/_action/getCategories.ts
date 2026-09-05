"use server";

import { cookies } from "next/headers";

type Category = {
  id: string;
  name: string;
};

type CategoryResponse = {
  success: boolean;
  message: string;
  data: Category[];
};

export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/category`,
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
        message: result.message || "Failed to get categories",
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