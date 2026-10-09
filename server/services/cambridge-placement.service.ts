import { PrismaClient } from "@prisma/client";
import * as S from "./cambridge-scoring.js";
import itemsJson from "../data/cambridge/items.json" assert { type: "json" };
import answersJson from "../data/cambridge/answers.json" assert { type: "json" };
import rulesJson from "../data/cambridge/rules.json" assert { type: "json" };
import writingSpeakingJson from "../data/cambridge/writing_speaking.json" assert { type: "json" };

function loadCambridgeData() {
  return {
    itemsData: itemsJson,
    answers: answersJson,
    rules: rulesJson,
    writingSpeaking: writingSpeakingJson,
  };
}

export class CambridgePlacementService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Cung cấp metadata và đề thi sạch (chỉ chứa đề, passages, không có đáp án đúng)
   */
  getSanitizedExamData(stage: "core" | "extension" | "all" = "all") {
    const { itemsData, writingSpeaking } = loadCambridgeData();
    const items = itemsData.items
      .filter((i: any) => (stage === "all" ? true : i.stage === stage))
      .map((i: any) => ({
        id: i.id,
        skill: i.skill,
        band: i.band,
        stage: i.stage,
        type: i.type,
        task: i.task,
        prompt: i.prompt,
        options: i.options,
        matchingKey: i.matchingKey,
        audioFile: i.audioFile,
      }));

    return {
      meta: itemsData.meta,
      passages: itemsData.passages,
      audio: itemsData.audio,
      items,
      writingSpeaking: {
        writing: writingSpeaking.writing,
        speaking: {
          parts: writingSpeaking.speaking.parts,
          cards: writingSpeaking.speaking.cards,
        },
      },
    };
  }

  /**
   * Tạo phòng thi mới (Dành cho Giáo viên)
   */
  async createRoom(params: {
    title: string;
    groupName?: string;
    teacherName?: string;
    durationMinutes?: number | null;
    createdById?: string;
  }) {
    if (!params.title || !params.title.trim()) {
      throw new Error("Vui lòng nhập tên phòng thi.");
    }

    let validUserId: string | null = null;
    if (params.createdById) {
      const userExists = await this.prisma.user.findFirst({
        where: {
          OR: [
            { userId: params.createdById },
            { id: params.createdById },
          ],
        },
        select: { userId: true },
      });
      validUserId = userExists?.userId || null;
    }

    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const roomCode = `ROOM-${randomSuffix}`;

    return await this.prisma.cambridgeRoom.create({
      data: {
        roomCode,
        title: params.title.trim(),
        groupName: params.groupName?.trim() || null,
        teacherName: params.teacherName?.trim() || null,
        durationMinutes: params.durationMinutes || null,
        createdById: validUserId,
        status: "OPEN",
      },
    });
  }

  /**
   * Lấy thông tin phòng thi (Public - Học sinh mở link tham gia)
   */
  async getRoomInfo(roomCode: string) {
    const room = await this.prisma.cambridgeRoom.findUnique({
      where: { roomCode },
      select: {
        id: true,
        roomCode: true,
        title: true,
        groupName: true,
        teacherName: true,
        status: true,
        durationMinutes: true,
        createdAt: true,
      },
    });

    if (!room) {
      throw new Error("Phòng thi không tồn tại hoặc đường dẫn không đúng.");
    }

    // Kiểm tra thời hạn vào phòng nếu có cấu hình durationMinutes
    if (room.status === "OPEN" && room.durationMinutes) {
      const expirationTime = new Date(room.createdAt.getTime() + room.durationMinutes * 60 * 1000);
      if (new Date() > expirationTime) {
        await this.prisma.cambridgeRoom.update({
          where: { roomCode },
          data: { status: "CLOSED", closedAt: expirationTime },
        });
        room.status = "CLOSED";
      }
    }

    return room;
  }

  /**
   * Học sinh vào phòng thi và bắt đầu làm bài (Không tạo trùng bài khi F5)
   */
  async joinRoom(params: {
    roomCode: string;
    candidateName: string;
    candidateGrade?: string;
    existingTestCode?: string;
  }) {
    const room = await this.getRoomInfo(params.roomCode);
    if (room.status === "CLOSED") {
      throw new Error("Phòng thi này đã đóng, không nhận thêm học sinh mới.");
    }

    const cleanName = params.candidateName.trim();
    if (!cleanName) {
      throw new Error("Vui lòng nhập họ và tên của bạn.");
    }

    // Nếu học sinh đã có testCode đang làm trong localStorage -> khôi phục phiên cũ
    if (params.existingTestCode) {
      const existingSession = await this.prisma.cambridgeSession.findFirst({
        where: {
          testCode: params.existingTestCode,
          roomId: room.id,
        },
      });
      if (existingSession && existingSession.status === "ACTIVE") {
        return existingSession;
      }
    }

    // Kiểm tra xem học sinh này đã có bài làm đang ACTIVE trong phòng chưa
    const activeSession = await this.prisma.cambridgeSession.findFirst({
      where: {
        roomId: room.id,
        candidateName: cleanName,
        status: "ACTIVE",
      },
    });

    if (activeSession) {
      return activeSession;
    }

    // Tạo phiên thi gắn liền với phòng
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const testCode = `CAM-${room.roomCode.replace("ROOM-", "")}-${randomSuffix}`;
    const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 giờ

    return await this.prisma.cambridgeSession.create({
      data: {
        testCode,
        roomId: room.id,
        candidateName: cleanName,
        candidateGrade: params.candidateGrade?.trim() || room.groupName || null,
        status: "ACTIVE",
        stage: "core",
        answers: {},
        expiresAt,
      },
    });
  }

  /**
   * Đóng phòng thi (Giáo viên kết thúc nhận bài)
   */
  async closeRoom(roomId: string) {
    return await this.prisma.cambridgeRoom.update({
      where: { id: roomId },
      data: {
        status: "CLOSED",
        closedAt: new Date(),
      },
    });
  }

  /**
   * Danh sách phòng thi của giáo viên
   */
  async listRooms(createdById?: string) {
    const where: any = {};
    if (createdById) where.createdById = createdById;

    return await this.prisma.cambridgeRoom.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { sessions: true },
        },
        sessions: {
          select: {
            id: true,
            status: true,
            gradingStatus: true,
          },
        },
      },
    });
  }

  /**
   * Chi tiết phòng thi và danh sách học sinh trong phòng
   */
  async getRoomDetail(roomId: string) {
    const room = await this.prisma.cambridgeRoom.findUnique({
      where: { id: roomId },
      include: {
        sessions: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            testCode: true,
            candidateName: true,
            candidateGrade: true,
            status: true,
            stage: true,
            gatePassed: true,
            extensionAllowed: true,
            gradingStatus: true,
            finalLevel: true,
            isAdjusted: true,
            objectiveScore: true,
            computedPlacement: true,
            createdAt: true,
            submittedAt: true,
            gradedAt: true,
          },
        },
      },
    });

    if (!room) throw new Error("Phòng thi không tồn tại.");
    return room;
  }

  /**
   * Tạo phiên thi mới cho học sinh (Trường hợp tạo mã lẻ truyền thống)
   */
  async createSession(params: {
    candidateName: string;
    candidateGrade?: string;
    candidatePhone?: string;
    targetLevel?: string;
    createdById?: string;
  }) {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const testCode = `CAM-${Date.now().toString().slice(-4)}-${randomSuffix}`;
    const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 giờ

    const session = await this.prisma.cambridgeSession.create({
      data: {
        testCode,
        candidateName: params.candidateName.trim(),
        candidateGrade: params.candidateGrade?.trim() || null,
        candidatePhone: params.candidatePhone?.trim() || null,
        targetLevel: params.targetLevel || null,
        createdById: params.createdById || null,
        expiresAt,
        status: "ACTIVE",
        stage: "core",
        answers: {},
      },
    });

    return session;
  }

  /**
   * Lấy chi tiết phiên thi (Dành cho học sinh làm bài - TUYỆT ĐỐI không trả answers.json)
   */
  async getStudentSession(testCode: string) {
    const session = await this.prisma.cambridgeSession.findUnique({
      where: { testCode },
    });

    if (!session) {
      throw new Error("Không tìm thấy mã bài thi Cambridge.");
    }

    if (session.status === "EXPIRED" || new Date() > new Date(session.expiresAt)) {
      throw new Error("Mã bài thi đã hết hạn sử dụng.");
    }

    const { itemsData, writingSpeaking } = loadCambridgeData();

    // Lọc items theo giai đoạn cho phép của học sinh
    const allowedStage = session.extensionAllowed ? "all" : "core";
    const availableItems = itemsData.items
      .filter((i: any) => (allowedStage === "all" ? true : i.stage === "core"))
      .map((i: any) => ({
        id: i.id,
        skill: i.skill,
        band: i.band,
        stage: i.stage,
        type: i.type,
        task: i.task,
        prompt: i.prompt,
        options: i.options,
        matchingKey: i.matchingKey,
        audioId: i.audioId,
        audioFile: i.audioFile,
        passageKey: i.passageKey,
        passageId: i.passageId || i.passageKey,
        gapNumber: i.gapNumber || i.gap,
        gap: i.gap,
      }));

    return {
      session: {
        id: session.id,
        testCode: session.testCode,
        candidateName: session.candidateName,
        candidateGrade: session.candidateGrade,
        status: session.status,
        stage: session.stage,
        gatePassed: session.gatePassed,
        extensionAllowed: session.extensionAllowed,
        expiresAt: session.expiresAt,
        answers: session.answers,
      },
      content: {
        meta: itemsData.meta,
        passages: itemsData.passages,
        audio: itemsData.audio,
        items: availableItems,
        writing: writingSpeaking.writing,
      },
    };
  }

  /**
   * Lưu nháp câu trả lời học sinh
   */
  async saveAnswers(testCode: string, answers: Record<string, any>) {
    const session = await this.prisma.cambridgeSession.findUnique({
      where: { testCode },
    });
    if (!session) throw new Error("Phiên thi không tồn tại.");
    if (session.status === "SUBMITTED") throw new Error("Bài thi đã được nộp.");

    const mergedAnswers = {
      ...((session.answers as Record<string, any>) || {}),
      ...answers,
    };

    return await this.prisma.cambridgeSession.update({
      where: { testCode },
      data: {
        answers: mergedAnswers,
      },
    });
  }

  /**
   * Chấm điểm phần khách quan Core & Đánh giá Gate
   */
  async evaluateCoreGate(testCode: string) {
    const session = await this.prisma.cambridgeSession.findUnique({
      where: { testCode },
    });
    if (!session) throw new Error("Phiên thi không tồn tại.");

    const { itemsData, answers, rules } = loadCambridgeData();
    const studentAnswers = (session.answers as Record<string, any>) || {};

    let coreK = 0;
    let coreKplus = 0;
    const itemMarks: Record<string, number> = {};

    for (const item of itemsData.items) {
      if (item.stage === "core") {
        const mark = S.markItem(item, answers[item.id], studentAnswers[item.id]);
        itemMarks[item.id] = mark;
        if (mark === 1) {
          if (item.band === "K") coreK++;
          if (item.band === "K+") coreKplus++;
        }
      }
    }

    const passed = S.gate(coreK, coreKplus, rules.gate);

    const updated = await this.prisma.cambridgeSession.update({
      where: { testCode },
      data: {
        gatePassed: passed,
        extensionAllowed: passed || session.extensionAllowed,
        stage: passed || session.extensionAllowed ? "extension" : "completed",
        objectiveScore: {
          ...((session.objectiveScore as any) || {}),
          coreK,
          coreKplus,
          gatePassed: passed,
          itemMarks,
        },
      },
    });

    return {
      gatePassed: passed,
      coreK,
      coreKplus,
      minK: rules.gate.minK,
      minKplus: rules.gate.minKplus,
      extensionAllowed: updated.extensionAllowed,
    };
  }

  /**
   * Giáo viên Override Gate cho học sinh vào Extension
   */
  async teacherOverrideGate(sessionId: string, teacherId: string, reason: string) {
    if (!reason || reason.trim().length < 5) {
      throw new Error("Vui lòng ghi rõ lý do mở quyền thi Extension cho học sinh.");
    }

    return await this.prisma.cambridgeSession.update({
      where: { id: sessionId },
      data: {
        extensionAllowed: true,
        extensionOverrideReason: reason.trim(),
        stage: "extension",
      },
    });
  }

  /**
   * Nộp bài hoàn tất từ học sinh
   */
  async submitSession(testCode: string, finalAnswers?: Record<string, any>) {
    const session = await this.prisma.cambridgeSession.findUnique({
      where: { testCode },
    });
    if (!session) throw new Error("Phiên thi không tồn tại.");

    const studentAnswers = {
      ...((session.answers as Record<string, any>) || {}),
      ...(finalAnswers || {}),
    };

    const { itemsData, answers } = loadCambridgeData();

    // Chấm toàn bộ trắc nghiệm
    const itemMarks: Record<string, number> = {};
    const skillCounts: Record<string, Record<string, { correct: number; n: number }>> = {
      use_of_english: { F: { correct: 0, n: 0 }, K: { correct: 0, n: 0 }, "K+": { correct: 0, n: 0 }, "P-": { correct: 0, n: 0 }, P: { correct: 0, n: 0 } },
      reading: { F: { correct: 0, n: 0 }, K: { correct: 0, n: 0 }, "K+": { correct: 0, n: 0 }, "P-": { correct: 0, n: 0 }, P: { correct: 0, n: 0 } },
      listening: { F: { correct: 0, n: 0 }, K: { correct: 0, n: 0 }, "K+": { correct: 0, n: 0 }, "P-": { correct: 0, n: 0 }, P: { correct: 0, n: 0 } },
    };

    let totalCorrect = 0;
    let totalItems = 0;

    for (const item of itemsData.items) {
      const isTaken = item.stage === "core" || session.extensionAllowed;
      if (!isTaken) continue;

      totalItems++;
      const mark = S.markItem(item, answers[item.id], studentAnswers[item.id]);
      itemMarks[item.id] = mark;
      if (mark === 1) totalCorrect++;

      if (skillCounts[item.skill] && skillCounts[item.skill][item.band]) {
        skillCounts[item.skill][item.band].n++;
        if (mark === 1) {
          skillCounts[item.skill][item.band].correct++;
        }
      }
    }

    return await this.prisma.cambridgeSession.update({
      where: { testCode },
      data: {
        answers: studentAnswers,
        status: "SUBMITTED",
        submittedAt: new Date(),
        objectiveScore: {
          itemMarks,
          totalCorrect,
          totalItems,
          skillCounts,
        },
      },
    });
  }

  /**
   * Tính toán toàn bộ Placement Sheet dựa trên điểm khách quan và điểm chấm của giáo viên
   */
  calculateFullPlacement(
    session: any,
    writingScores: S.WritingScores | null,
    speakingScores: { parts: S.SpeakingPartScores; criteria?: S.SpeakingCriteriaScores } | null
  ) {
    const objectiveScore = session.objectiveScore as any;
    if (!objectiveScore || !objectiveScore.skillCounts) {
      return null;
    }

    const extensionDone = Boolean(session.extensionAllowed);
    const skillCounts = objectiveScore.skillCounts;

    // Receptive Codes
    const uoeBands = S.bandResults(skillCounts.use_of_english);
    const readingBands = S.bandResults(skillCounts.reading);
    const listeningBands = S.bandResults(skillCounts.listening);

    const uoeCode = S.receptiveCode(uoeBands, extensionDone);
    const readingCode = S.receptiveCode(readingBands, extensionDone);
    const listeningCode = S.receptiveCode(listeningBands, extensionDone);

    const inversionUoe = S.hasInversion(uoeBands, extensionDone);
    const inversionReading = S.hasInversion(readingBands, extensionDone);
    const inversionListening = S.hasInversion(listeningBands, extensionDone);
    const hasAnyInversion = inversionUoe || inversionReading || inversionListening;

    // Writing Code (nếu đã chấm)
    let wCode: number | null = null;
    if (writingScores && writingScores.w1 && writingScores.w2) {
      wCode = S.writingCode(writingScores.w1, writingScores.w2, extensionDone ? writingScores.w3 : null);
    }

    // Speaking Code (nếu đã chấm)
    let sCode: number | null = null;
    if (speakingScores && speakingScores.parts) {
      sCode = S.speakingCode(speakingScores.parts);
    }

    // Nếu chưa chấm đủ 5 kĩ năng -> trả kết quả từng phần, không tự động coi là 0
    const isGradingComplete = wCode !== null && sCode !== null;

    let placementDetails: S.PlacementResult | null = null;
    if (isGradingComplete) {
      placementDetails = S.placement(
        {
          use_of_english: uoeCode,
          reading: readingCode,
          listening: listeningCode,
          writing: wCode!,
          speaking: sCode!,
        },
        {
          inversion: hasAnyInversion,
        }
      );
    }

    return {
      receptive: {
        use_of_english: { code: uoeCode, bands: uoeBands, inversion: inversionUoe },
        reading: { code: readingCode, bands: readingBands, inversion: inversionReading },
        listening: { code: listeningCode, bands: listeningBands, inversion: inversionListening },
      },
      writing: {
        code: wCode,
        scores: writingScores,
      },
      speaking: {
        code: sCode,
        scores: speakingScores,
      },
      isGradingComplete,
      placement: placementDetails,
    };
  }

  /**
   * Giáo viên chấm Speaking, Writing & Lưu kết quả xếp lớp
   */
  async gradeSession(params: {
    sessionId: string;
    teacherId: string;
    writingScores?: S.WritingScores;
    speakingScores?: { parts: S.SpeakingPartScores; criteria?: S.SpeakingCriteriaScores };
    teacherNotes?: string;
    finalLevel?: "Flyers" | "KET" | "PET";
    adjustmentReason?: string;
  }) {
    const session = await this.prisma.cambridgeSession.findUnique({
      where: { id: params.sessionId },
    });
    if (!session) throw new Error("Phiên thi không tồn tại.");

    const mergedWriting = params.writingScores ?? (session.writingScores as any);
    const mergedSpeaking = params.speakingScores ?? (session.speakingScores as any);

    const calculation = this.calculateFullPlacement(session, mergedWriting, mergedSpeaking);

    let finalLevel = session.finalLevel;
    let isAdjusted = session.isAdjusted;
    let adjustmentReason = session.adjustmentReason;

    if (calculation && calculation.placement) {
      const computedLevel = calculation.placement.level;

      // Nếu giáo viên chỉ định điều chỉnh level
      if (params.finalLevel && params.finalLevel !== computedLevel) {
        // Kiểm tra nguyên tắc: điều chỉnh tối đa 1 bậc (Flyers <-> KET <-> PET)
        const levelsOrder = ["Flyers", "KET", "PET"];
        const computedIdx = levelsOrder.indexOf(computedLevel);
        const proposedIdx = levelsOrder.indexOf(params.finalLevel);

        if (Math.abs(computedIdx - proposedIdx) > 1) {
          throw new Error("Chỉ được điều chỉnh tối đa 1 bậc so với kết quả thuật toán.");
        }
        if (!params.adjustmentReason || params.adjustmentReason.trim().length < 5) {
          throw new Error("Bắt buộc ghi rõ lý do khi điều chỉnh cấp độ xếp lớp.");
        }

        finalLevel = params.finalLevel;
        isAdjusted = true;
        adjustmentReason = params.adjustmentReason.trim();
      } else {
        finalLevel = computedLevel;
      }
    }

    const gradingStatus =
      calculation?.isGradingComplete
        ? "GRADED"
        : mergedWriting || mergedSpeaking
        ? "PARTIAL"
        : "PENDING";

    return await this.prisma.cambridgeSession.update({
      where: { id: params.sessionId },
      data: {
        writingScores: mergedWriting || undefined,
        speakingScores: mergedSpeaking || undefined,
        computedPlacement: (calculation?.placement as any) || undefined,
        finalLevel: finalLevel || undefined,
        isAdjusted,
        adjustmentReason,
        teacherNotes: params.teacherNotes !== undefined ? params.teacherNotes : session.teacherNotes,
        gradingStatus,
        gradedById: params.teacherId,
        gradedAt: new Date(),
      },
    });
  }

  /**
   * Danh sách các phiên thi cho Admin & Giáo viên
   */
  async listSessions(params: {
    status?: string;
    gradingStatus?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: any = {};
    if (params.status) where.status = params.status;
    if (params.gradingStatus) where.gradingStatus = params.gradingStatus;
    if (params.search) {
      where.OR = [
        { candidateName: { contains: params.search, mode: "insensitive" } },
        { testCode: { contains: params.search, mode: "insensitive" } },
        { candidatePhone: { contains: params.search } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.cambridgeSession.count({ where }),
      this.prisma.cambridgeSession.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: params.limit || 50,
        skip: params.offset || 0,
        include: {
          creator: {
            select: { fullName: true, email: true },
          },
          grader: {
            select: { fullName: true, email: true },
          },
        },
      }),
    ]);

    return { total, items };
  }

  /**
   * Xem chi tiết phiên thi (Dành cho Admin/Giáo viên chấm bài)
   */
  async getAdminSessionDetail(sessionId: string) {
    const session = await this.prisma.cambridgeSession.findUnique({
      where: { id: sessionId },
      include: {
        creator: { select: { fullName: true, email: true } },
        grader: { select: { fullName: true, email: true } },
      },
    });
    if (!session) throw new Error("Không tìm thấy phiên thi.");

    const { itemsData, writingSpeaking } = loadCambridgeData();
    const calculation = this.calculateFullPlacement(
      session,
      session.writingScores as any,
      session.speakingScores as any
    );

    return {
      session,
      calculation,
      contentRef: {
        items: itemsData.items,
        writing: writingSpeaking.writing,
        speaking: writingSpeaking.speaking,
      },
    };
  }
}
