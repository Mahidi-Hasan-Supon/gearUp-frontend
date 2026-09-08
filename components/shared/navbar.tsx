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
import {  getCurrentUser } from "@/service/getMyProfile";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import Image from "next/image";
import { ChevronDown, CircleUser, House, Info, Phone, TentTree } from "lucide-react";
import ThemeToggle from "./theme-toggle";

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
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
          >
            <House className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/gear"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
          >
            <TentTree className="h-4 w-4" />
            Gear
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
          >
            <Info className="h-4 w-4" />
            About
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle/>
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
              <DropdownMenuTrigger className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-primary hover:shadow-md focus:outline-none  focus:ring-2  focus:ring-primary focus:ring-offset-2 bg-primary text-white">
                <CircleUser className="h-5 w-5 shrink-0" />

                <span className="leading-none">Click me</span>
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {user.photoUrl ? (
                  <Image
                    src={user.photoUrl}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ml-25 "
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {" "}
                    {user.name?.charAt(0).toUpperCase()}{" "}
                  </div>
                )}
                <div className="px-3 py-2 border-t mt-1 border-gray-300">
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
