"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
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

import { customerMenu, providerMenu, adminMenu } from "./dashboardSidebar";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

type MobileDashboardSidebarProps = {
  role: UserRole;
};

export default function MobileDashboardSidebar({
  role,
}: MobileDashboardSidebarProps) {
  const pathname = usePathname();

  const menu =
    role === "ADMIN"
      ? adminMenu
      : role === "PROVIDER"
        ? providerMenu
        : customerMenu;

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger >
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open dashboard menu</span>
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>{role} Dashboard</SheetTitle>
          </SheetHeader>

          <nav className="mt-6 space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
