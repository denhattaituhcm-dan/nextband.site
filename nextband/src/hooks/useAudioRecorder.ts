import { useState, useRef, useCallback, useEffect } from 'react';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  isPaused: boolean;
  audioUrl: string | null;
  audioBlob: Blob | null;
  duration: number;
  analyserData: Uint8Array | null;
  startRecording: () => Promise<boolean>;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  resetRecording: () => void;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'checking';
  requestPermission: () => Promise<boolean>;
}

const getSupportedMimeType = (): string => {
  if (typeof MediaRecorder === 'undefined') return '';
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
    'audio/wav',
  ];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return '';
};

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const [analyserData, setAnalyserData] = useState<Uint8Array | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'checking'>('checking');

  const isRecordingRef = useRef(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check permission on mount
  useEffect(() => {
    checkPermission();
    return () => {
      cleanup();
    };
  }, []);

  const checkPermission = async () => {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      setPermissionStatus('prompt');
      return;
    }
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setPermissionStatus(result.state as 'prompt' | 'granted' | 'denied');
      result.onchange = () => {
        setPermissionStatus(result.state as 'prompt' | 'granted' | 'denied');
      };
    } catch {
      setPermissionStatus('prompt');
    }
  };

  const cleanup = () => {
    isRecordingRef.current = false;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try { track.stop(); } catch {}
      });
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try { audioContextRef.current.close(); } catch {}
      audioContextRef.current = null;
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionStatus('granted');
      return true;
    } catch (err) {
      console.warn('[useAudioRecorder] Permission request denied or failed:', err);
      setPermissionStatus('denied');
      return false;
    }
  };

  const updateAnalyser = useCallback(() => {
    if (analyserRef.current && isRecordingRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      setAnalyserData(new Uint8Array(dataArray));
      animationRef.current = requestAnimationFrame(updateAnalyser);
    }
  }, []);

  const startRecording = async (): Promise<boolean> => {
    try {
      cleanup();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;
      setPermissionStatus('granted');

      // Setup audio analyser
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;

      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mimeType = getSupportedMimeType();
      const options: MediaRecorderOptions = mimeType ? { mimeType } : {};
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const actualMime = mediaRecorder.mimeType || mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: actualMime });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        cleanup();
      };

      mediaRecorder.start(100);
      isRecordingRef.current = true;
      setIsRecording(true);
      setIsPaused(false);
      startTimeRef.current = Date.now();
      setDuration(0);

      // Start duration counter
      durationIntervalRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);

      // Start analyser animation loop
      animationRef.current = requestAnimationFrame(updateAnalyser);
      return true;
    } catch (error) {
      console.error('[useAudioRecorder] Error starting recording:', error);
      setPermissionStatus('denied');
      cleanup();
      setIsRecording(false);
      return false;
    }
  };

  const stopRecording = () => {
    isRecordingRef.current = false;
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.warn('[useAudioRecorder] mediaRecorder stop error:', err);
      }
    }
    setIsRecording(false);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.pause();
        isRecordingRef.current = false;
        setIsPaused(true);
        if (durationIntervalRef.current) {
          clearInterval(durationIntervalRef.current);
          durationIntervalRef.current = null;
        }
      } catch (err) {
        console.warn('[useAudioRecorder] pause error:', err);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      try {
        mediaRecorderRef.current.resume();
        isRecordingRef.current = true;
        setIsPaused(false);
        durationIntervalRef.current = setInterval(() => {
          setDuration(prev => prev + 1);
        }, 1000);
        animationRef.current = requestAnimationFrame(updateAnalyser);
      } catch (err) {
        console.warn('[useAudioRecorder] resume error:', err);
      }
    }
  };

  const resetRecording = () => {
    cleanup();
    if (audioUrl) {
      try { URL.revokeObjectURL(audioUrl); } catch {}
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setDuration(0);
    setAnalyserData(null);
    chunksRef.current = [];
    setIsRecording(false);
    setIsPaused(false);
  };

  return {
    isRecording,
    isPaused,
    audioUrl,
    audioBlob,
    duration,
    analyserData,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    permissionStatus,
    requestPermission,
  };
}
