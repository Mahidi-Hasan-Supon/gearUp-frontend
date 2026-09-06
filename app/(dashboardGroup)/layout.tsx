import Navbar from "@/components/shared/navbar";
import DashboardSidebar from "@/app/(dashboardGroup)/_compunents/dashboardSidebar";
import MobileDashboardSidebar from "@/app/(dashboardGroup)/_compunents/mobileDashboardSidebar";
import { getCurrentUser } from "@/service/getMyProfile";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar />

      <div className="flex">
        <DashboardSidebar role={user.role} />

        <main className="min-w-0 flex-1">
          {/* Mobile menu */}
          <div className="border-b p-3 md:hidden">
            <MobileDashboardSidebar role={user.role} />
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
