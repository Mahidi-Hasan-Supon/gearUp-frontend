"use server";

import { Gear } from "./getGear";


export const getGearById = async (id: string): Promise<Gear> => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear/${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to get gear");
  }

  return result.data;
};