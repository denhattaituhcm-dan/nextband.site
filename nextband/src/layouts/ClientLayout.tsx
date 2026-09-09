import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ClientSidebar } from '@/components/navigation/ClientSidebar';
import { ClientHeader } from '@/components/navigation/ClientHeader';
import { useSeasonalEvent } from '@/features/seasonal/hooks/useSeasonalEvent';
import { SeasonalCornerDecoration } from '@/features/seasonal/presets/SeasonalCornerDecoration';
import { TetFallingPetals } from '@/features/seasonal/presets/tet/TetFallingPetals';
import { SeasonalOpeningModal } from '@/features/seasonal/presets/SeasonalOpeningModal';

export default function ClientLayout() {
  const {
    isEventActive,
    eventType,
    isTet,
    uiConfig,
    activeClaimModal,
    closeClaimModal,
  } = useSeasonalEvent();

  return (
    <SidebarProvider className="h-svh max-h-svh overflow-hidden">
      <div className="h-full flex w-full overflow-hidden relative">
        <ClientSidebar />
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden relative">
          <ClientHeader />
          <main className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 md:p-6 relative">
            <Outlet />
          </main>
        </div>

        {/* Global Seasonal Layer (Nhành hoa tri ân / Cành Mai Vàng trên toàn hệ thống khi Bật) */}
        {isEventActive && uiConfig.showBlossom && (
          <SeasonalCornerDecoration type={eventType} />
        )}
        {isEventActive && isTet && uiConfig.showPetals && <TetFallingPetals />}

        {/* Modal Mở Lì Xì / Thư Tri Ân */}
        {isEventActive && activeClaimModal && (
          <SeasonalOpeningModal
            isOpen={activeClaimModal.isOpen}
            onClose={closeClaimModal}
            type={eventType}
            rewardType={activeClaimModal.rewardType}
            amount={activeClaimModal.amount}
            totalAccumulated={activeClaimModal.totalAccumulated}
            examTitle={activeClaimModal.examTitle}
            isPoolExhausted={activeClaimModal.isPoolExhausted}
          />
        )}
      </div>
    </SidebarProvider>
  );
}
