"use server";

import { cookies } from "next/headers";

type CreateRentalPayload = {
  gearId: string;
  startDate: string;
  endDate: string;
};

export const createRental = async (payload: CreateRentalPayload) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

//   console.log("RENTAL PAYLOAD:", payload);
//   console.log("ACCESS TOKEN EXISTS:", !!accessToken);

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rental`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
//   console.log("res" , res.status);

  const result = await res.json();

//   console.log("result" , result);

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Rental failed",
    };
  }

  return result;
};
