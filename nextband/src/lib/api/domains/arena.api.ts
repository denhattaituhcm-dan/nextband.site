import { API_BASE_URL, getAuthToken, handleApiResponse } from "../client";

export interface PublicArenaRoomSummary {
  id: string;
  pin: string;
  status: string;
  roomTitle: string;
  hostNickname: string;
  topicKey: string;
  gameMode: string;
  hostMode: string;
  playerCount: number;
  maxPlayers: number;
  createdAt: string;
  expiresAt?: string | null;
}

export interface PublicArenaLobbyResponse {
  capacity: {
    activeCommunityRooms: number;
    maxCommunityRooms: number;
    availableCommunitySlots: number;
    maxPlayersPerCommunityRoom: number;
  };
  rooms: PublicArenaRoomSummary[];
}

export const arenaApi = {
  async createRoom(params: { examId?: string; config?: any }): Promise<{
    roomId: string;
    pin: string;
    hostToken: string;
    status: string;
    createdAt: string;
    expiresAt?: string | null;
    config?: Record<string, any>;
  }> {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${API_BASE_URL}/arena/rooms`, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể tạo phòng đấu Arena"
    );
    return json.data;
  },

  async getPublicRooms(): Promise<PublicArenaLobbyResponse> {
    const res = await fetch(`${API_BASE_URL}/arena/rooms/public`);
    const json = await handleApiResponse<{ success: boolean; data: PublicArenaLobbyResponse }>(
      res,
      "Không thể tải danh sách phòng công khai"
    );
    return json.data;
  },

  async closeRoom(params: { pin: string; hostToken: string }): Promise<{
    success: boolean;
    pin: string;
    status: string;
  }> {
    const res = await fetch(`${API_BASE_URL}/arena/rooms/${encodeURIComponent(params.pin)}/close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostToken: params.hostToken }),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể đóng phòng thi đấu"
    );
    return json.data;
  },

  async getRoomByPin(pin: string): Promise<{
    id: string;
    pin: string;
    status: string;
    currentRound: number;
    examId?: string;
    config?: Record<string, any>;
    createdAt: string;
    expiresAt?: string;
    participants?: Array<{
      id: string;
      nickname: string;
      avatarId: number;
      totalScore: number;
      totalGold: number;
      joinedAt: string;
    }>;
  }> {
    const res = await fetch(`${API_BASE_URL}/arena/rooms/${encodeURIComponent(pin)}`);
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể tìm thấy phòng thi đấu"
    );
    return json.data;
  },

  async joinRoom(params: { pin: string; nickname: string; avatarId?: number }): Promise<{
    participantId: string;
    roomId: string;
    pin: string;
    playerSessionToken: string;
    nickname: string;
    avatarId: number;
    roomStatus: string;
  }> {
    const res = await fetch(`${API_BASE_URL}/arena/rooms/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể tham gia phòng thi đấu"
    );
    return json.data;
  },

  async kickParticipant(params: {
    pin: string;
    hostToken: string;
    participantId: string;
  }): Promise<{
    success: boolean;
    kickedParticipantId: string;
    nickname: string;
  }> {
    const res = await fetch(`${API_BASE_URL}/arena/rooms/${encodeURIComponent(params.pin)}/kick`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hostToken: params.hostToken,
        participantId: params.participantId,
      }),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể mời học sinh ra khỏi phòng"
    );
    return json.data;
  },

  async executeHostCommand(params: {
    roomId: string;
    commandId: string;
    action: string;
    pin: string;
    hostToken: string;
    gameMode?: string;
  }): Promise<{
    idempotent: boolean;
    roomId: string;
    pin: string;
    status: string;
    currentRound: number;
    roundDeadlineAt: string | null;
    question?: any;
    totalQuestions?: number;
  }> {
    const res = await fetch(`${API_BASE_URL}/arena/rooms/${encodeURIComponent(params.roomId)}/command`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể thực thi lệnh điều khiển Arena"
    );
    return json.data;
  },

  async submitAnswer(params: {
    roomId: string;
    playerSessionToken: string;
    questionId: string;
    roundIndex: number;
    selectedOptionId: string;
    clientTelemetryTime?: string;
  }): Promise<{
    answerId: string;
    isCorrect: boolean;
    scoreAwarded: number;
    totalScore: number;
    submittedAt: string;
  }> {
    const res = await fetch(`${API_BASE_URL}/arena/rooms/${encodeURIComponent(params.roomId)}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể nộp đáp án"
    );
    return json.data;
  },

  async reclaimHostSnapshot(params: {
    pin: string;
    hostToken: string;
  }): Promise<{
    roomId: string;
    pin: string;
    status: string;
    currentRound: number;
    currentQuestionId: string | null;
    question: any;
    totalQuestions: number;
    roundStartedAt: string | null;
    roundDeadlineAt: string | null;
    config?: Record<string, any>;
    participants: Array<{
      id: string;
      nickname: string;
      avatarId: number;
      totalScore: number;
      totalGold: number;
      joinedAt: string;
    }>;
    currentRoundAnswers: Record<string, any>;
  }> {
    const res = await fetch(`${API_BASE_URL}/arena/rooms/${encodeURIComponent(params.pin)}/reclaim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostToken: params.hostToken }),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể khôi phục trạng thái Host"
    );
    return json.data;
  },

  async getLessonQuestions(params: {
    examId?: string;
    lessonKey?: string;
  }): Promise<{
    lessonKey: string;
    examTitle: string;
    isCustom: boolean;
    questions: any[];
  }> {
    const token = await getAuthToken();
    const query = new URLSearchParams();
    if (params.examId) query.set("examId", params.examId);
    if (params.lessonKey) query.set("lessonKey", params.lessonKey);

    const res = await fetch(`${API_BASE_URL}/arena/questions?${query.toString()}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể tải danh sách câu hỏi Arena"
    );
    return json.data;
  },

  async saveLessonQuestions(params: {
    examId?: string;
    lessonKey?: string;
    questions: any[];
  }): Promise<{
    success: boolean;
    message: string;
  }> {
    const token = await getAuthToken();
    const res = await fetch(`${API_BASE_URL}/arena/questions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(params),
    });
    const json = await handleApiResponse<{ success: boolean; message: string }>(
      res,
      "Không thể lưu bộ câu hỏi Arena"
    );
    return json;
  },

  async resetLessonQuestions(params: {
    examId?: string;
    lessonKey?: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> {
    const token = await getAuthToken();
    const query = new URLSearchParams();
    if (params.examId) query.set("examId", params.examId);
    if (params.lessonKey) query.set("lessonKey", params.lessonKey);

    const res = await fetch(`${API_BASE_URL}/arena/questions?${query.toString()}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const json = await handleApiResponse<{ success: boolean; message: string }>(
      res,
      "Không thể khôi phục bộ câu hỏi Arena"
    );
    return json;
  },

  async saveSoloRun(params: {
    nickname: string;
    avatarId?: number;
    totalScore: number;
    correctCount: number;
    totalQuestions?: number;
    maxStreak?: number;
    avgResponseMs?: number;
    challengeCode?: string;
    questionIds?: string[];
  }): Promise<{
    id: string;
    challengeCode: string;
    totalScore: number;
    createdAt: string;
  }> {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${API_BASE_URL}/arena/solo/runs`, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    });
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể lưu kết quả thi đấu Đấu Trường"
    );
    return json.data;
  },

  async getSoloLeaderboard(params?: {
    timeframe?: "today" | "week" | "all";
    limit?: number;
  }): Promise<
    Array<{
      id: string;
      nickname: string;
      avatarId: number;
      totalScore: number;
      correctCount: number;
      totalQuestions: number;
      maxStreak: number;
      avgResponseMs: number;
      challengeCode: string;
      createdAt: string;
    }>
  > {
    const query = new URLSearchParams();
    if (params?.timeframe) query.set("timeframe", params.timeframe);
    if (params?.limit) query.set("limit", String(params.limit));

    const res = await fetch(`${API_BASE_URL}/arena/solo/leaderboard?${query.toString()}`);
    const json = await handleApiResponse<{ success: boolean; data: any[] }>(
      res,
      "Không thể tải bảng xếp hạng Đấu Trường"
    );
    return json.data;
  },

  async getSoloChallenge(code: string): Promise<{
    id: string;
    nickname: string;
    avatarId: number;
    totalScore: number;
    correctCount: number;
    totalQuestions: number;
    maxStreak: number;
    avgResponseMs: number;
    questionIds: string[];
    createdAt: string;
  }> {
    const res = await fetch(`${API_BASE_URL}/arena/solo/challenge/${encodeURIComponent(code)}`);
    const json = await handleApiResponse<{ success: boolean; data: any }>(
      res,
      "Không thể tải thông tin thách đấu"
    );
    return json.data;
  },
};
