import React, { useMemo } from 'react';

interface AcademicPhraseProps {
  text?: string;
  className?: string;
}

/**
 * AcademicPhrase
 * Hiển thị cụm từ với gradient sắc nét, đồng nhất và hiệu ứng nhịp thở học thuật (Cognitive Focus).
 * Đảm bảo tính sang trọng, điềm tĩnh, không nhảy nhót nhí nhảnh.
 */
export default function AcademicPhrase({
  text = "từ bản chất!",
  className = "",
}: AcademicPhraseProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  const totalChars = chars.length;

  return (
    <span
      className={`inline-flex whitespace-nowrap select-none ${className}`}
      style={{ '--total-chars': totalChars } as React.CSSProperties}
    >
      {chars.map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className="inline-block w-[0.25em]">
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={index}
            className="academic-char-living"
            style={{ '--char-index': index } as React.CSSProperties}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
