"use server";

import { cookies } from "next/headers";

export type AdminRental = {
  id: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: string;

  customer: {
    name: string;
    email: string;
    role: string;
    status: string;
  };

  gear: {
    id: string;
    title: string;
    brand: string;
    image: string | null;

    provider: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
};

type AdminRentalResponse = {
  success: boolean;
  message: string;
  data: AdminRental[];
};

export const getAdminRentals = async (): Promise<AdminRentalResponse> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/rentals`,
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
        message: result.message || "Failed to get rentals",
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