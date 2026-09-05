'use client'
import { Package, Pencil, Trash2 } from "lucide-react";
import { Gear } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProviderGear } from "../_action/deleteProviderGear";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


type ProviderGearCardProps = {
  gear: Gear;
};

export default function ProviderGearCard  ({ gear }: ProviderGearCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
const handleDelete = async () => {
  setLoading(true);

  const result = await deleteProviderGear(gear.id);

  setLoading(false);

  if (!result.success) {
    toast.error(result.message);
    return;
  }

  toast.success(result.message);

  router.refresh();
};
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:shadow-md">
      {/* Gear Image */}
      <div className="h-48 w-full bg-muted">
        {gear.image ? (
          <img
            src={gear.image}
            alt={gear.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Category */}
        <p className="text-sm text-muted-foreground">
          {gear.category?.name || "Uncategorized"}
        </p>

        {/* Title */}
        <h2 className="mt-1 text-xl font-bold">{gear.title}</h2>

        {/* Brand */}
        <p className="text-sm text-muted-foreground">{gear.brand}</p>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
          {gear.description}
        </p>

        {/* Price and Quantity */}
        <div className="mt-4 flex justify-between border-y py-4">
          <div>
            <p className="text-xs text-muted-foreground">Price / Day</p>

            <p className="font-bold">${gear.pricePerDay}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">Quantity</p>

            <p className="font-bold">{gear.quantity}</p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {gear.status}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <Link
            href={`/provider-dashboard/gear/${gear.id}/edit`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 font-medium transition hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          

          {/* dialouge box delete */}
          <AlertDialog>
            <AlertDialogTrigger className="flex flex-1">
              <button
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-destructive py-2.5 font-medium text-destructive-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 w-full"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  You are about to delete `{gear.title}`. This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {loading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
