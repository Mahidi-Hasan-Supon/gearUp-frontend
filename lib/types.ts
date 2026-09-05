export type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PROVIDER" | "CUSTOMER";
};

export type Gear = {
  id: string;
  title: string;
  description: string;
  brand: string;
  pricePerDay: number;
  quantity: number;
  image?: string | null;
  status: string;
  category?: {
    id: string;
    name: string;
  } | null;
};

 type Payment = {
  id: string;
  status: string;
  amount: number;
  currency: string;
};

export type CustomerRental = {
  id: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: string;

  payment: Payment[];

  gear: {
    id?: string;
    title: string;
    brand: string;
  };
};
