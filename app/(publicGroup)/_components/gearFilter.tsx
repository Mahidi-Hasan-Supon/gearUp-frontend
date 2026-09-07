
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Filter,
  RotateCcw,
  Tag,
  Layers,
  DollarSign,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";

type GearFilterProps = {
  categories: string[];
  brands: string[];
};

export default function GearFilter({
  categories,
  brands,
}: GearFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "",
  );
  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || "",
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || "",
  );

  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || "",
  );

  const [endDate, setEndDate] = useState(
    searchParams.get("endDate") || "",
  );

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/gear?${params.toString()}`);
  };

  const clearFilters = () => {
    setBrand("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setStartDate("");
    setEndDate("");

    router.push("/gear");
  };

  return (
    <div className="mb-8 rounded-2xl border bg-muted/40 p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Filter className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">Advanced Filters</h2>

            <p className="text-xs text-muted-foreground">
              Find the perfect gear for your adventure
            </p>
          </div>
        </div>

        <button
          onClick={clearFilters}
          className="hidden items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium shadow-sm transition hover:bg-muted sm:flex"
        >
          <RotateCcw className="h-4 w-4" />
          Clear Filters
        </button>
      </div>

      {/* Basic Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Category */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Category
          </label>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              updateFilters("category", e.target.value);
            }}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Tag className="h-4 w-4 text-muted-foreground" />
            Brand
          </label>

          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              updateFilters("brand", e.target.value);
            }}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Brands</option>

            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Min Price
          </label>

          <input
            type="number"
            min="0"
            placeholder="Minimum price"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              updateFilters("minPrice", e.target.value);
            }}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Max Price */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Max Price
          </label>

          <input
            type="number"
            min="0"
            placeholder="Maximum price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              updateFilters("maxPrice", e.target.value);
            }}
            className="h-11 w-full rounded-lg border bg-background px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Availability Section */}
      <div className="mt-6 border-t pt-5">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />

          <div>
            <h3 className="text-sm font-semibold">
              Check Availability
            </h3>

            <p className="text-xs text-muted-foreground">
              Select your rental dates
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                updateFilters("startDate", e.target.value);
              }}
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                updateFilters("endDate", e.target.value);
              }}
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Mobile Clear Button */}
      <button
        onClick={clearFilters}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border bg-background py-2.5 text-sm font-medium shadow-sm transition hover:bg-muted sm:hidden"
      >
        <RotateCcw className="h-4 w-4" />
        Clear Filters
      </button>
    </div>
  );
}

