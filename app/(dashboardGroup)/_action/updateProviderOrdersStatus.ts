"use server";

import { cookies } from "next/headers";

export const updateProviderOrderStatus = async (
  orderId: string,
  status: string,
) => {
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
      `${process.env.BACKEND_API_URL}/api/provider/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update order status",
      };
    }

    return {
      success: true,
      message: result.message || "Order status updated successfully",
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};