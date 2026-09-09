import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/navigation/AdminSidebar';
import { AdminHeader } from '@/components/navigation/AdminHeader';
import { BranchProvider } from '@/contexts/BranchContext';

export default function AdminLayout() {
  return (
    <BranchProvider>
      <SidebarProvider className="h-svh max-h-svh overflow-hidden">
        <div className="h-full flex w-full overflow-hidden">
          <AdminSidebar />
          <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
            <AdminHeader />
            <main className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 md:p-6 bg-muted/30">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </BranchProvider>
  );
}
