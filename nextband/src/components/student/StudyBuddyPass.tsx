import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { User, Users, Tag } from "lucide-react";

interface StudyBuddyPassProps {
  studentName: string;
  className: string;
  referralCode: string;
  targetUrl?: string;
  classNameOverride?: string;
}

export function StudyBuddyPass({
  studentName = "NGUYỄN MINH",
  className = "IELTS Intensive K42",
  referralCode = "ARIS-MINH42",
  targetUrl,
  classNameOverride = "",
}: StudyBuddyPassProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const effectiveTargetUrl =
    targetUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/buddy?ref=${referralCode}&from=${encodeURIComponent(studentName)}`
      : `https://nextband.site/buddy?ref=${referralCode}&from=${encodeURIComponent(studentName)}`);

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(effectiveTargetUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: "#17243A",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error("Failed to generate QR code data URL", err);
      });

    return () => {
      isMounted = false;
    };
  }, [effectiveTargetUrl]);

  return (
    <div
      className={`relative w-full max-w-[580px] aspect-[1.58/1] bg-[#FCFDFE] text-[#17243A] border-2 border-[#CBD5E1] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between select-none overflow-hidden font-sans shadow-xl shadow-slate-900/10 ${classNameOverride}`}
    >
      {/* BACKGROUND DECORATIONS */}
      {/* 1. Soft Sky Blue Curved Wave on bottom-left with boosted saturation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
        <svg
          className="absolute -bottom-6 -left-6 w-[360px] sm:w-[420px] h-[240px] sm:h-[280px] opacity-65"
          viewBox="0 0 400 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-20 280C60 200 140 220 230 170C310 120 360 60 420 70L420 300L-20 300Z"
            fill="url(#skyWaveGradEnhanced)"
          />
          <defs>
            <linearGradient id="skyWaveGradEnhanced" x1="0" y1="80" x2="320" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7DD3FC" stopOpacity="0.75" />
              <stop offset="0.6" stopColor="#BAE6FD" stopOpacity="0.45" />
              <stop offset="1" stopColor="#E0F2FE" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>

        {/* 2. Soft Dot Matrix Pattern on right corner */}
        <div
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-28 h-28 opacity-35 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1687A7 1.2px, transparent 1.2px)",
            backgroundSize: "9px 9px",
          }}
        />
      </div>

      {/* HEADER: ARIS IELTS + STUDY BUDDY PASS BADGE */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <div className="flex items-center text-base sm:text-lg font-black tracking-tight leading-none">
              <span className="text-[#17243A]">ARIS</span>
              <span className="text-[#D6284B] ml-1.5">IELTS</span>
            </div>
            {/* Red Accent Bar under ARIS */}
            <div className="w-10 sm:w-11 h-[3.5px] bg-[#D6284B] rounded-full mt-1.5" />
          </div>

          {/* Badge */}
          <div className="flex items-center gap-1.5 text-[#1687A7]">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider font-mono">
              STUDY BUDDY PASS
            </span>
            <div className="relative flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 text-[9px] leading-none">❤️</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN BODY: Inviter Info + 3D Heart Envelope + Benefit Box */}
      <div className="relative z-10 grid grid-cols-12 items-center gap-2 my-auto py-1">
        {/* Left Col: Inviter Info */}
        <div className="col-span-7 sm:col-span-7 space-y-1 pr-1">
          <div className="flex items-center gap-1.5 text-[#1687A7] text-[9.5px] sm:text-[10.5px] font-extrabold tracking-wider uppercase font-mono">
            <div className="w-4 h-4 rounded-full border-1.5 border-[#1687A7] flex items-center justify-center">
              <User className="w-2.5 h-2.5 stroke-[2.8]" />
            </div>
            <span>BẠN ĐƯỢC MỜI BỞI</span>
          </div>

          <div
            className={`font-black text-[#17243A] tracking-tight leading-tight uppercase ${
              studentName.length > 18 ? "text-base sm:text-lg" : "text-lg sm:text-2xl"
            }`}
          >
            {studentName}
          </div>

          <div className="text-[11px] sm:text-xs text-[#475569] font-bold">
            {className}
          </div>
        </div>

        {/* Center-Floating Cute 3D Heart Envelope Graphic */}
        <div className="hidden sm:block absolute left-[44%] top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Sparkles */}
            <span className="absolute -top-1 right-0 text-amber-500 font-bold text-xs">✨</span>
            <span className="absolute bottom-0 left-0 text-[#1687A7] font-bold text-[11px]">✨</span>
            <span className="absolute top-1 left-2 w-1.5 h-1.5 bg-sky-400 rounded-full" />
            <span className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-amber-400 rounded-full" />

            {/* SVG Envelope with Heart */}
            <svg className="w-14 h-14 drop-shadow-md" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Envelope Body */}
              <rect x="8" y="20" width="48" height="34" rx="7" fill="#60A5FA" />
              <path d="M8 24L32 40L56 24" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 52L26 36M56 52L38 36" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
              {/* Letter Sheet */}
              <rect x="14" y="9" width="36" height="27" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              {/* Heart Badge on Letter */}
              <path
                d="M32 27C32 27 24 22 24 17.5C24 15.0147 26.0147 13 28.5 13C29.9 13 31.1 13.8 32 14.8C32.9 13.8 34.1 13 35.5 13C37.9853 13 40 15.0147 40 17.5C40 22 32 27 32 27Z"
                fill="#D6284B"
              />
            </svg>
          </div>
        </div>

        {/* Right Col: Benefit Box (High Contrast Gold/Amber Accent) */}
        <div className="col-span-5 sm:col-span-5 bg-[#FFFBEB] border-2 border-[#FCD34D] rounded-2xl p-2.5 sm:p-3 space-y-2 shadow-sm ml-auto w-full max-w-[215px]">
          {/* Benefit 1: Discount */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D6284B] text-white flex items-center justify-center shadow-xs shrink-0">
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.8]" />
            </div>
            <div className="min-w-0">
              <div className="text-[11.5px] sm:text-xs font-black text-[#D6284B] leading-none">
                GIẢM 200.000đ
              </div>
              <div className="text-[8.5px] sm:text-[9.5px] text-[#334155] font-semibold leading-tight mt-0.5">
                cho mỗi khóa học
              </div>
            </div>
          </div>

          {/* Benefit 2: Priority Grouping */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E0F2FE] text-[#1687A7] flex items-center justify-center shrink-0 border border-[#BAE6FD]">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.8]" />
            </div>
            <div className="min-w-0">
              <div className="text-[11.5px] sm:text-xs font-black text-[#17243A] leading-none">
                ƯU TIÊN
              </div>
              <div className="text-[8.5px] sm:text-[9.5px] text-[#334155] font-semibold leading-tight mt-0.5">
                học cùng lớp
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEAR-OFF LINE & FOOTER SECTION */}
      <div className="relative z-10">
        {/* Teal Tear-Off Dashed Line with Scissors Icon */}
        <div className="relative flex items-center w-full pb-2.5">
          <div className="absolute -left-1 text-[#1687A7] -top-2.5 text-xs font-bold">
            ✂
          </div>
          <div className="w-full border-t-2 border-dashed border-[#38BDF8] ml-4" />
        </div>

        {/* Bottom Bar: Referral Code + QR Code */}
        <div className="flex items-end justify-between gap-2">
          {/* Left: Referral Code Container & Message */}
          <div className="space-y-1">
            <div className="text-[8.5px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-[#1687A7] font-mono">
              MÃ MỜI
            </div>

            {/* Code Box with Crisp Teal Border */}
            <div className="relative inline-flex items-center">
              <div className="bg-white border-2 border-[#1687A7] rounded-xl px-3 sm:px-4 py-1 sm:py-1.5 shadow-sm">
                <span className="font-mono font-black text-xs sm:text-sm tracking-[0.2em] text-[#17243A]">
                  {referralCode}
                </span>
              </div>
              {/* Shine Rays */}
              <div className="absolute -top-1.5 -right-2 text-[#1687A7] text-[10px] pointer-events-none font-bold">
                \ | /
              </div>
            </div>

            {/* Hint & Social Message */}
            <div className="pt-0.5 space-y-0.5">
              <div className="text-[8.5px] sm:text-[9.5px] font-bold text-[#1687A7] flex items-center gap-1 font-mono">
                <span>🌐 Kích hoạt:</span>
                <span className="underline">nextband.site/buddy</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-[#334155] flex items-center gap-1 font-semibold">
                <span className="text-[#D6284B]">❤️</span>
                <span>Chia sẻ thẻ này với bạn bè để cùng nhau chinh phục IELTS!</span>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Scannable QR Code */}
          <div className="relative flex items-end gap-2 shrink-0">
            {/* Curved Arrow pointer */}
            <div className="block absolute -left-6 sm:-left-7 bottom-5 text-[#1687A7]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 18C4 18 8 10 16 10" />
                <path d="M13 7L17 10L13 13" />
              </svg>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-[#1687A7] font-mono mb-1 flex items-center gap-1">
                <span>SCAN TO JOIN</span>
                <span className="text-[10px]">\ | /</span>
              </div>

              {/* QR Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1 rounded-xl border-2 border-[#CBD5E1] shadow-md flex items-center justify-center">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`QR Code: ${effectiveTargetUrl}`}
                    className="w-full h-full object-contain rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 animate-pulse rounded" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

