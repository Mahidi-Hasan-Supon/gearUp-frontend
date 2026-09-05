"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProviderGear } from "../_action/updateGearProvider";


type Category = {
  id: string;
  name: string;
};

type GearData = {
  id: string;
  title: string;
  description: string;
  brand: string;
  pricePerDay: number;
  quantity: number;
  image?: string | null;
  status: string;
  categoryId: string;
};

type EditGearFormProps = {
  gear: GearData;
  categories: Category[];
};

export default function EditGearForm({
  gear,
  categories,
}: EditGearFormProps) {
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

    const result = await updateProviderGear(
      gear.id,
      payload,
    );

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(
      result.message || "Gear updated successfully",
    );

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
          defaultValue={gear.title}
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
          defaultValue={gear.description}
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
          defaultValue={gear.brand}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Price & Quantity */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Price Per Day
          </label>

          <input
            type="number"
            name="pricePerDay"
            required
            min="1"
            defaultValue={gear.pricePerDay}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            required
            min="1"
            defaultValue={gear.quantity}
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
          defaultValue={gear.image || ""}
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
          defaultValue={gear.categoryId}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        >
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
          defaultValue={gear.status}
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
        {loading ? "Updating Gear..." : "Update Gear"}
      </button>
    </form>
  );
}