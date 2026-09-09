import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { seasonalApi } from "../core/seasonalApi";
import { useAuth } from "@/hooks/useAuth";
import { getSeasonalTheme } from "../core/seasonalThemeAdapter";

export function useSeasonalEvent() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [activeClaimModal, setActiveClaimModal] = useState<{
    isOpen: boolean;
    rewardType: "CASH" | "VOUCHER" | "HONOR_XP";
    amount: number;
    totalAccumulated: number;
    examTitle?: string;
    isPoolExhausted?: boolean;
  } | null>(null);

  // 1. Fetch current active seasonal event
  const { data: activeData, isLoading: isEventLoading } = useQuery({
    queryKey: ["seasonal-active-event"],
    queryFn: () => seasonalApi.getActive(),
    staleTime: 1000 * 60 * 15, // 15 mins cache
  });

  const activeEvent = activeData?.event || null;
  const isEventActive = !!activeData?.isActive && !!activeEvent;
  const isTet = activeEvent?.type === "TET";
  const uiConfig = activeEvent?.uiConfig || {
    showBlossom: true,
    showEnvelopes: true,
    showModal: true,
    showPetals: false,
    playChime: true,
  };

  // 2. Fetch student's progress if authenticated
  const { data: progressData } = useQuery({
    queryKey: ["seasonal-student-progress", user?.id],
    queryFn: () => seasonalApi.getMyProgress(),
    enabled: isEventActive && !!user?.id,
    staleTime: 1000 * 30, // 30s cache
  });

  const progress = progressData?.progress || {
    claimedExamIds: [],
    totalCashEarned: 0,
    totalHonorXp: 0,
    claimsCount: 0,
    history: [],
  };

  // 3. Mutation for claiming reward
  const claimMutation = useMutation({
    mutationFn: async ({ homeworkId, examTitle }: { homeworkId: string; examTitle?: string }) => {
      const result = await seasonalApi.claimReward(homeworkId);
      return { result, examTitle };
    },
    onSuccess: ({ result, examTitle }) => {
      // Invalidate queries so wallet updates immediately
      queryClient.invalidateQueries({ queryKey: ["seasonal-student-progress", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["seasonal-active-event"] });

      // Open celebration modal if modal is enabled
      if (uiConfig.showModal) {
        setActiveClaimModal({
          isOpen: true,
          rewardType: result.rewardType,
          amount: result.amount,
          totalAccumulated: result.totalCashEarned,
          examTitle,
          isPoolExhausted: result.isPoolExhausted,
        });
      }
    },
  });

  const isHomeworkClaimed = (homeworkId: string) => {
    return progress.claimedExamIds.includes(homeworkId);
  };

  const getClaimedAmount = (homeworkId: string) => {
    const item = progress.history.find((h) => h.homeworkId === homeworkId);
    return item?.amount || 0;
  };

  const handleClaim = (homeworkId: string, examTitle?: string) => {
    claimMutation.mutate({ homeworkId, examTitle });
  };

  const closeClaimModal = () => {
    setActiveClaimModal(null);
  };

  const eventType = activeEvent?.type || "TET";
  const theme = getSeasonalTheme(eventType);

  return {
    isEventActive,
    activeEvent,
    eventType,
    theme,
    isTet,
    uiConfig,
    studentProgress: progress,
    isHomeworkClaimed,
    getClaimedAmount,
    handleClaim,
    isClaiming: claimMutation.isPending,
    activeClaimModal,
    closeClaimModal,
    isEventLoading,
  };
}
