import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import { requireAuth } from "@/lib/auth-utils";

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Suspense fallback={
              <div className="flex items-center justify-center w-full h-32">
                <Spinner />
              </div>
            }>
              {children}
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
