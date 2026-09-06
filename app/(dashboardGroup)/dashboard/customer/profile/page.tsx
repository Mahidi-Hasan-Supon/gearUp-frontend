import { getMyProfile } from "@/service/getMyProfile";
import { Mail, ShieldCheck, User } from "lucide-react";

export default async function CustomerProfilePage() {
  const user = await getMyProfile();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="mt-2 text-muted-foreground">
          View your account information.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        {/* Header */}
        <div className="bg-muted/40 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>

              <p className="text-sm text-muted-foreground">Customer Account</p>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="divide-y">
          {/* Name */}
          <div className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-muted p-2.5">
              <User className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Full Name</p>

              <p className="mt-1 font-medium">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-muted p-2.5">
              <Mail className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Email Address</p>

              <p className="mt-1 font-medium">{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-muted p-2.5">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Account Role</p>

              <p className="mt-1 font-medium">{user.role}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs text-muted-foreground">Account Status</p>

              <p className="mt-1 font-medium">{user.status}</p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {user.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
