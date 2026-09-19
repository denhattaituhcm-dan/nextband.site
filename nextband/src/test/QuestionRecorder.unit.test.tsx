import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import React from "react";
import { QuestionRecorder } from "@/components/exam/QuestionRecorder";

// Mock API & Supabase
vi.mock("@/lib/api", () => ({
  API_BASE_URL: "https://api.test",
  getAuthToken: vi.fn().mockResolvedValue("test-token"),
  formatStorageUrl: vi.fn((path: string) => `https://storage.test/${path}`),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({ data: { path: "speaking-recordings/test.webm" }, error: null }),
        getPublicUrl: vi.fn((path: string) => ({ data: { publicUrl: `https://storage.test/${path}` } })),
      })),
    },
  },
}));

describe("QuestionRecorder Component", () => {
  let mockMediaStreamTrack: any;
  let mockMediaStream: any;
  let mockMediaRecorderInstances: any[] = [];

  beforeEach(() => {
    vi.useFakeTimers();
    mockMediaRecorderInstances = [];

    // Mock URL object methods in jsdom
    if (!window.URL.createObjectURL) {
      window.URL.createObjectURL = vi.fn().mockReturnValue("blob:mock-audio-url");
    }
    if (!window.URL.revokeObjectURL) {
      window.URL.revokeObjectURL = vi.fn();
    }

    // Mock Canvas getContext
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      roundRect: vi.fn(),
      createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
      })),
    }) as any;

    mockMediaStreamTrack = {
      stop: vi.fn(),
    };

    mockMediaStream = {
      getTracks: vi.fn(() => [mockMediaStreamTrack]),
    };

    // Mock navigator.mediaDevices.getUserMedia
    Object.defineProperty(navigator, "mediaDevices", {
      writable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue(mockMediaStream),
      },
    });

    // Mock window.AudioContext
    class MockAudioContext {
      state = "running";
      createMediaStreamSource = vi.fn(() => ({
        connect: vi.fn(),
      }));
      createAnalyser = vi.fn(() => ({
        fftSize: 256,
        smoothingTimeConstant: 0.8,
        frequencyBinCount: 128,
        getByteFrequencyData: vi.fn((arr: Uint8Array) => {
          arr.fill(50);
        }),
      }));
      resume = vi.fn().mockResolvedValue(undefined);
      close = vi.fn().mockResolvedValue(undefined);
    }

    (window as any).AudioContext = MockAudioContext;
    (window as any).webkitAudioContext = MockAudioContext;

    // Mock MediaRecorder
    class MockMediaRecorder {
      state = "inactive";
      mimeType = "audio/webm";
      ondataavailable: ((e: any) => void) | null = null;
      onstop: (() => void) | null = null;
      static isTypeSupported = vi.fn(() => true);

      constructor() {
        mockMediaRecorderInstances.push(this);
      }

      start = vi.fn(() => {
        this.state = "recording";
      });

      stop = vi.fn(() => {
        this.state = "inactive";
        if (this.ondataavailable) {
          this.ondataavailable({
            data: new Blob(["test-audio-content"], { type: "audio/webm" }),
          });
        }
        if (this.onstop) {
          this.onstop();
        }
      });

      pause = vi.fn(() => {
        this.state = "paused";
      });

      resume = vi.fn(() => {
        this.state = "recording";
      });
    }

    (window as any).MediaRecorder = MockMediaRecorder;

    // Mock fetch for draft/confirm upload
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    }) as any;
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should render initial Idle state with Start Recording button", () => {
    render(
      <QuestionRecorder
        questionId="q1"
        answer=""
        onAnswerChange={vi.fn()}
      />
    );

    expect(screen.getByText("Bắt đầu ghi âm")).toBeInTheDocument();
  });

  it("should start recording and count down properly without freezing", async () => {
    render(
      <QuestionRecorder
        questionId="q1"
        answer=""
        maxDurationSeconds={120}
        onAnswerChange={vi.fn()}
      />
    );

    const startBtn = screen.getByText("Bắt đầu ghi âm");
    await act(async () => {
      fireEvent.click(startBtn);
    });

    // Recording phase is now active
    expect(screen.getByText("ĐANG GHI ÂM...")).toBeInTheDocument();
    expect(screen.getByText("2:00")).toBeInTheDocument();

    // Advance 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Countdown should have progressed to 1:55
    expect(screen.getByText("1:55")).toBeInTheDocument();
  });

  it("should upload audio and transition to review state when stopped", async () => {
    const onAnswerChange = vi.fn();
    render(
      <QuestionRecorder
        questionId="q1"
        answer=""
        maxDurationSeconds={120}
        onAnswerChange={onAnswerChange}
      />
    );

    // Start recording
    await act(async () => {
      fireEvent.click(screen.getByText("Bắt đầu ghi âm"));
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Stop recording
    const stopBtn = screen.getByText("Dừng ghi & Lưu bài nói");
    await act(async () => {
      fireEvent.click(stopBtn);
    });

    // Switch to real timers for async upload promise resolution
    vi.useRealTimers();

    // Verify onAnswerChange was called with a valid storage path
    await waitFor(() => {
      expect(onAnswerChange).toHaveBeenCalledWith(
        "q1",
        expect.stringMatching(/^speaking-recordings\/.*\.webm$/)
      );
    });
  });
});
