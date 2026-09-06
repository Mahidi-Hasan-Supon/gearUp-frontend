"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  Star,
  User,
  Users,
  ClipboardList,
  PlusCircle,
} from "lucide-react";

type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export const customerMenu = [
  {
    title: "Dashboard",
    href: "/dashboard/customer",
    icon: LayoutDashboard,
  },
  {
    title: "Rentals",
    href: "/dashboard/customer/rentals",
    icon: ShoppingCart,
  },
  {
    title: "Payments",
    href: "/dashboard/customer/payments",
    icon: CreditCard,
  },
  {
    title: "Reviews",
    href: "/dashboard/customer/reviews",
    icon: Star,
  },
  {
    title: "Profile",
    href: "/dashboard/customer/profile",
    icon: User,
  },
];

export const providerMenu = [
  {
    title: "Dashboard",
    href: "/provider-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Gear",
    href: "/provider-dashboard/gear",
    icon: Package,
  },
  {
    title: "Add Gear",
    href: "/provider-dashboard/gear/new",
    icon: PlusCircle,
  },
  {
    title: "Orders",
    href: "/provider-dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Profile",
    href: "/provider-dashboard/profile",
    icon: User,
  },
];

export const adminMenu = [
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Gear",
    href: "/admin-dashboard/gear",
    icon: Package,
  },
  {
    title: "Rentals",
    href: "/admin-dashboard/rentals",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    href: "/admin-dashboard/profile",
    icon: User,
  },
];

type DashboardSidebarProps = {
  role: UserRole;
};

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const menu =
    role === "ADMIN"
      ? adminMenu
      : role === "PROVIDER"
        ? providerMenu
        : customerMenu;

  const dashboardPath =
    role === "CUSTOMER"
      ? "/dashboard/customer"
      : role === "PROVIDER"
        ? "/provider-dashboard"
        : "/admin-dashboard";

  return (
    <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r bg-background md:block">
      <div className="sticky top-0 p-4">
        <div className="mb-6 px-3">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <p className="text-xs text-muted-foreground">{role} Panel</p>
        </div>

        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== dashboardPath && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
