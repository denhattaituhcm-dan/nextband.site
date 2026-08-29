import React from "react";
import { QrCode } from "lucide-react";

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
  targetUrl = "https://nextband.site/buddy",
  classNameOverride = "",
}: StudyBuddyPassProps) {
  return (
    <div
      className={`relative w-full max-w-[520px] aspect-[1.91/1] bg-[#FAF9F6] text-[#171717] border border-black/10 rounded-[20px] p-5 sm:p-6 flex flex-col justify-between shadow-xs select-none overflow-hidden font-sans ${classNameOverride}`}
    >
      {/* 1. Header: Logo & Badge */}
      <div>
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-xs sm:text-sm tracking-tight text-[#171717]">
              ARIS IELTS
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#737373] font-mono">
            STUDY BUDDY PASS
          </span>
        </div>
        {/* Brand Red Accent Line */}
        <div className="h-[2px] w-full bg-rose-600" />
      </div>

      {/* 2. Main Body: Inviter Info & Benefit Box */}
      <div className="my-auto py-1.5 space-y-2">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-[#737373] font-bold font-mono">
            BẠN ĐƯỢC MỜI BỞI
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#171717] tracking-tight leading-tight mt-0.5">
            {studentName.toUpperCase()}
          </div>
          <div className="text-[11px] sm:text-xs text-[#737373] font-medium">
            {className}
          </div>
        </div>

        {/* Minimal Benefit Container */}
        <div className="bg-black/[0.03] border border-black/[0.06] rounded-xl px-3 py-1.5 space-y-0.5 w-fit">
          <div className="text-[11px] sm:text-xs font-black text-rose-600 tracking-tight">
            GIẢM 200.000Đ HỌC PHÍ
          </div>
          <div className="text-[10px] sm:text-[11px] font-bold text-[#171717]">
            + ƯU TIÊN HỌC CÙNG LỚP
          </div>
        </div>
      </div>

      {/* 3. Footer: Tear Line + Referral Code + QR Marker */}
      <div>
        {/* Subtle dashed divider */}
        <div className="w-full border-t border-dashed border-black/15 pb-2.5" />

        <div className="flex items-end justify-between">
          <div className="space-y-0.5">
            <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#737373] font-bold font-mono">
              MÃ MỜI KÍCH HOẠT
            </div>
            <div className="text-xs sm:text-sm font-mono font-black text-[#171717] tracking-wider bg-black/[0.04] px-2 py-0.5 rounded border border-black/10 w-fit">
              {referralCode}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[#737373] block leading-none">
                KÍCH HOẠT TẠI
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#171717] font-mono">
                nextband.site/buddy
              </span>
            </div>
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 bg-white border border-black/10 rounded-lg p-1 flex items-center justify-center shrink-0 shadow-2xs text-[#171717]"
              title="Quét để nhận ưu đãi"
            >
              <QrCode className="w-full h-full stroke-[1.5]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
