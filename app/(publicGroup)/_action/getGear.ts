"use server";

export type Gear = {
  id: string;
  title: string;
  description: string;
  brand: string;
  pricePerDay: number;
  quantity: number;
  image: string;
  status: "AVAILABLE" | "UNAVAILABLE";
  categoryId: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  provider: {
    id: string;
    name: string;
    email: string;
    role: "PROVIDER";
  };
};

export const getAllGears = async (): Promise<Gear[]> => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to get gears");
  }

  return result.data;
};