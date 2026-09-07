export type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string | null;
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

export type Review = {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  gearId: string;
  rentalId: string;
  createdAt: string;

  gear: {
    id: string;
    title: string;
    brand: string;
    image?: string;
  };

  rental: {
    id: string;
    status: string;
    startDate: string;
    endDate: string;
  };
};
