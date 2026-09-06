"use server";

import { cookies } from "next/headers";

export type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  transactionId?: string;
  paymentMethod?: string;
  rentalId: string;
  createdAt: string;
  updatedAt: string;
};

type PaymentResponse = {
  success: boolean;
  message: string;
  data: Payment[];
};

export const getMyPayments = async (): Promise<PaymentResponse> => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payment`,
      {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    return {
      success: result.success,
      message: result.message,
      data: result.data ?? [],
    };
  } catch {
    return {
      success: false,
      message: "Failed to get payments",
      data: [],
    };
  }
};