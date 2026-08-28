"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/service/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { redirectToMyProfile, getCurrentUser } from "@/service/getMyProfile";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      toast.success("Logout Successfully");
    }
    router.push("/login");
    router.refresh();
  };

  useEffect(() => {
    const loadUser = async () => {
      const result = await getCurrentUser();
      setUser(result);
    };

    loadUser();
  }, []);

  const handleProfile = () => {
    if (user?.role === "ADMIN") {
      router.push("/admin-dashboard/profile");
    } else if (user?.role === "PROVIDER") {
      router.push("/provider-dashboard/profile");
    } else if (user?.role === "CUSTOMER") {
      router.push("/dashboard/customer/profile");
    }
  };
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          GearUp
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>

          <Link
            href="/gear"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Gear
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button variant="outline">
                <Link href="/login">Login</Link>
              </Button>

              <Button>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="border shadow text-white bg-green-700 rounded-2xl px-4 py-2">
                 {user?.name || "Account"}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64">
                <div className="px-3 py-2">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <DropdownMenuItem>
                  <Link
                    href={
                      user.role === "ADMIN"
                        ? "/admin-dashboard"
                        : user.role === "PROVIDER"
                          ? "/provider-dashboard"
                          : "/dashboard/customer"
                    }
                    className="w-full"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleProfile}>
                  <form>
                    <button type="submit" className="w-full text-left">
                      Profile
                    </button>
                  </form>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <form action={redirectToMyProfile}>
                    <button type="submit" className="w-full text-left">
                      Profile
                    </button>
                  </form>
                </DropdownMenuItem> */}

                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
