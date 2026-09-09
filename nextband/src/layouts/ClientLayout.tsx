import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ClientSidebar } from '@/components/navigation/ClientSidebar';
import { ClientHeader } from '@/components/navigation/ClientHeader';

export default function ClientLayout() {
  return (
    <SidebarProvider className="h-svh max-h-svh overflow-hidden">
      <div className="h-full flex w-full overflow-hidden">
        <ClientSidebar />
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          <ClientHeader />
          <main className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
