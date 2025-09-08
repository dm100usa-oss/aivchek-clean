"use client";

import { useEffect, useState } from "react";

export default function Donut({ score }: { score: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 16;
    const increment = score / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        start = score;
        clearInterval(timer);
      }
      setProgress(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const radius = 90;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (progress >= 80) return "#10b981"; // green
    if (progress >= 40) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <svg width="260" height="260" className="drop-shadow-lg">
      {/* Background circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx="130"
        cy="130"
      />
      {/* Progress circle */}
      <circle
        stroke={getColor()}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx="130"
        cy="130"
        transform="rotate(-90 130 130)"
        style={{
          filter:
            "drop-shadow(0 2px 4px rgba(0,0,0,0.25)) drop-shadow(0 0 6px rgba(0,0,0,0.15))",
        }}
      />
      {/* Percentage text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="48"
        fontWeight="700"
        fill="#111827"
        style={{
          filter:
            "drop-shadow(0 0 3px white) drop-shadow(0 0 4px rgba(0,0,0,0.25))",
        }}
      >
        {progress}%
      </text>
    </svg>
  );
}
