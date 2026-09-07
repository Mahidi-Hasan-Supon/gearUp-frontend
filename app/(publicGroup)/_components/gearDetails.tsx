"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  User,
  Tag,
  DollarSign,
  Package,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Gear } from "../_action/getGear";
import { toast } from "sonner";

type GearDetailsProps = {
  gear: Gear;
};

export default function GearDetails({ gear }: GearDetailsProps) {
  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleRent = () => {
    if (!startDate || !endDate) {
      toast.error("Please select start and end date");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End date cannot be before start date");
      return;
    }

    router.push(
      `/gear/rental/${gear.id}?startDate=${startDate}&endDate=${endDate}`,
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Main Content */}
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-10">
          {/* Image */}
          <div className="relative mx-auto h-[460px] w-full max-w-lg overflow-hidden rounded-2xl border bg-muted">
            {gear.image ? (
              <Image
                src={gear.image}
                alt={gear.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package className="h-20 w-20 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border bg-background p-4">
              <p className="text-xs text-muted-foreground">Brand</p>

              <p className="mt-1 font-semibold">{gear.brand}</p>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <p className="text-xs text-muted-foreground">Category</p>

              <p className="mt-1 font-semibold">
                {gear.category?.name || "Uncategorized"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border bg-background p-5">
            <h2 className="mb-3 text-lg font-bold">Description</h2>

            <p className="text-sm leading-7 text-muted-foreground">
              {gear.description}
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="space-y-2">
          {/* Title */}
          <div>
            <div className="mb-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  gear.status === "AVAILABLE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {gear.status}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {gear.title}
            </h1>

            <p className="mt-2 text-muted-foreground">
              Rent this equipment for your next adventure.
            </p>
          </div>

          {/* Price Card */}
          <div className="rounded-2xl border bg-muted/30 p-5">
            <p className="text-sm text-muted-foreground">Rental Price</p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold">${gear.pricePerDay}</span>

              <span className="text-sm text-muted-foreground">/ day</span>
            </div>
          </div>

          {/* ================= INFORMATION BOX ================= */}
          <div className="rounded-2xl border bg-background p-5">
            <h2 className="mb-5 text-lg font-bold">Gear Information</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Tag className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Category</p>

                  <p className="font-medium">
                    {gear.category?.name || "Uncategorized"}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Package className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Available Quantity
                  </p>

                  <p className="font-medium">{gear.quantity}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <DollarSign className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Price Per Day</p>

                  <p className="font-medium">${gear.pricePerDay}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Package className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Status</p>

                  <p
                    className={`font-medium ${
                      gear.status === "AVAILABLE"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {gear.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t" />

            {/* Provider Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">
                Provider Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Provider Name */}
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <User className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Provider</p>

                    <p className="font-medium">{gear.provider.name}</p>
                  </div>
                </div>

                {/* Provider Email */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 rounded-lg bg-muted p-2">
                    <Mail className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>

                    <p className="break-all text-sm font-medium">
                      {gear.provider.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RENT SECTION ================= */}
          {gear.status === "AVAILABLE" ? (
            <div className="rounded-2xl border bg-muted/20 p-5">
              <div className="mb-5">
                <h2 className="text-lg font-bold">Rent This Gear</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Select your rental period.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Start Date */}
                <div className="space-y-2">
                  <label htmlFor="startDate" className="text-sm font-medium">
                    Start Date
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      min={today}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-lg border bg-background px-10 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <label htmlFor="endDate" className="text-sm font-medium">
                    End Date
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      min={startDate || today}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded-lg border bg-background px-10 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRent}
                className="mt-5 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Rent Now
              </button>
            </div>
          ) : (
            <button
              disabled
              className="w-full rounded-xl border px-5 py-3 font-semibold opacity-50"
            >
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
