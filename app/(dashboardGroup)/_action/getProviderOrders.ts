"use server";

import { cookies } from "next/headers";

export type ProviderOrder = {
  id: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: string;

  gear: {
    id: string;
    title: string;
    brand: string;
    pricePerDay: number;
    status: string;
  };

  customer: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
};

type ProviderOrderResponse = {
  success: boolean;
  message: string;
  data: ProviderOrder[];
};

export const getProviderOrders =
  async (): Promise<ProviderOrderResponse> => {
    try {
      const cookieStore = await cookies();

      const accessToken =
        cookieStore.get("accessToken")?.value;

      if (!accessToken) {
        return {
          success: false,
          message: "Please login first",
          data: [],
        };
      }

      const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/provider/orders`,
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
          message:
            result.message || "Failed to get orders",
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