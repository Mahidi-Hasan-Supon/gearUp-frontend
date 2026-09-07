
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

export type GearQuery = {
  brand?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  startDate?: string;
  endDate?: string;
};

export const getAllGears = async (
  query: GearQuery = {},
): Promise<Gear[]> => {
  const searchParams = new URLSearchParams();

  if (query.brand) {
    searchParams.set("brand", query.brand);
  }

  if (query.category) {
    searchParams.set("category", query.category);
  }

  if (query.minPrice) {
    searchParams.set("minPrice", query.minPrice);
  }

  if (query.maxPrice) {
    searchParams.set("maxPrice", query.maxPrice);
  }

  if (query.startDate) {
    searchParams.set("startDate", query.startDate);
  }

  if (query.endDate) {
    searchParams.set("endDate", query.endDate);
  }

  const url = `${process.env.BACKEND_API_URL}/api/gear${
    searchParams.toString()
      ? `?${searchParams.toString()}`
      : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to get gears");
  }

  return result.data;
};

