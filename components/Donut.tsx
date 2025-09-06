"use client";

import { useEffect, useState } from "react";

export default function Donut({ score }: { score: number }) {
  const [progress, setProgress] = useState(0);
  const radius = 70;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5s
    const stepTime = 10;
    const totalSteps = duration / stepTime;

    const interval = setInterval(() => {
      start += 100 / totalSteps;
      if (start >= score) {
        start = score;
        clearInterval(interval);
      }
      setProgress(start);
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);

  // Цвет круга по процентам
  function getColor(value: number) {
    if (value < 40) return "#ef4444"; // red
    if (value < 80) return "#f59e0b"; // yellow
    return "#10b981"; // green
  }

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={getColor(progress)}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.05s linear, stroke 0.3s ease-in-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-semibold text-gray-700">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
