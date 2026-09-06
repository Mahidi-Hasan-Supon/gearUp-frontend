"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Mail, Shield, User } from "lucide-react";

import type { AdminUser } from "@/app/(dashboardGroup)/_action/getAdminUsers";
import { updateUserStatus } from "../_action/updateUsersStatus";

type AdminUserCardProps = {
  user: AdminUser;
};

export default function AdminUserCard({
  user,
}: AdminUserCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async () => {
    const newStatus =
      user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    setLoading(true);

    const result = await updateUserStatus(
      user.id,
      newStatus,
    );

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <div className="rounded-xl border bg-background p-5 shadow-sm">
      {/* User Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">{user.name}</h2>

            <p className="text-sm text-muted-foreground">
              User ID: {user.id.slice(0, 8)}...
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            user.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* User Information */}
      <div className="mt-5 space-y-3 border-t pt-4">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />

          <span className="text-sm">{user.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Shield className="h-4 w-4 text-muted-foreground" />

          <span className="text-sm font-medium">
            {user.role}
          </span>
        </div>
      </div>

      {/* Action */}
      <button
        disabled={loading}
        onClick={handleStatusChange}
        className={`mt-5 w-full rounded-lg py-2.5 font-medium text-white transition disabled:opacity-50 ${
          user.status === "ACTIVE"
            ? "bg-destructive hover:opacity-90"
            : "bg-primary hover:opacity-90"
        }`}
      >
        {loading
          ? "Updating..."
          : user.status === "ACTIVE"
            ? "Block User"
            : "Activate User"}
      </button>
    </div>
  );
}