import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
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
          <Button variant="outline">
            <Link href="/login">Login</Link>
          </Button>

          <Button>
            <Link href="/register">Register</Link>
          </Button>

          {/* User Dropdown - পরে authentication হলে ব্যবহার করব */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border shadow bg-gray-100 rounded-2xl p-1.5">
              
                Account
              
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/dashboard/customer">
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/dashboard/customer/profile">
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}