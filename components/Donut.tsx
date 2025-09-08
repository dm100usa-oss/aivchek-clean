"use client";

import { useEffect, useState } from "react";

export default function Donut({ score }: { score: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
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
    <svg width="240" height="240" className="drop-shadow-md">
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx="120"
        cy="120"
      />
      <circle
        stroke={getColor()}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx="120"
        cy="120"
        transform="rotate(-90 120 120)"
        style={{
          transition: "stroke-dashoffset 0.3s ease-in-out",
        }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="40"
        fontWeight="700"
        fill="#111827"
        style={{
          filter:
            "drop-shadow(0 0 2px white) drop-shadow(0 0 2px white) drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
        }}
      >
        {progress}%
      </text>
    </svg>
  );
}
