"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProviderGear } from "../_action/createProviderGear";
import { toast } from "sonner";


type Category = {
  id: string;
  name: string;
};

type AddGearFormProps = {
  categories: Category[];
};

export default function AddGearForm({
  categories,
}: AddGearFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      brand: formData.get("brand") as string,
      pricePerDay: Number(formData.get("pricePerDay")),
      image: formData.get("image") as string,
      quantity: Number(formData.get("quantity")),
      categoryId: formData.get("categoryId") as string,
      status: formData.get("status") as string,
    };

    const result = await createProviderGear(payload);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Gear created successfully");

    router.push("/provider-dashboard/gear");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-background p-6"
    >
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Gear Title
        </label>

        <input
          name="title"
          required
          placeholder="Enter gear title"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          required
          placeholder="Enter gear description"
          className="min-h-28 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Brand */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Brand
        </label>

        <input
          name="brand"
          required
          placeholder="Enter brand name"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Price Per Day
          </label>

          <input
            type="number"
            name="pricePerDay"
            required
            min="1"
            placeholder="Enter price"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            required
            min="1"
            placeholder="Enter quantity"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Image URL
        </label>

        <input
          type="url"
          name="image"
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          name="categoryId"
          required
          defaultValue=""
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="" disabled>
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          defaultValue="AVAILABLE"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="AVAILABLE">
            Available
          </option>

          <option value="UNAVAILABLE">
            Unavailable
          </option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creating Gear..." : "Create Gear"}
      </button>
    </form>
  );
}