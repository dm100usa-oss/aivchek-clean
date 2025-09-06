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
    const stepTime = 15;
    const totalSteps = duration / stepTime;

    const interval = setInterval(() => {
      start += score / totalSteps;
      if (start >= score) {
        start = score;
        clearInterval(interval);
      }
      setProgress(start);
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);

  // Градиент по процентам
  function getGradient(value: number) {
    if (value < 40) {
      return "url(#redGradient)";
    } else if (value < 80) {
      return "url(#amberGradient)";
    }
    return "url(#greenGradient)";
  }

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full rotate-[-90deg]">
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

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
          stroke={getGradient(progress)}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          strokeLinecap="round"
          style={{
            transition:
              "stroke-dashoffset 0.2s ease-in-out, stroke 0.3s ease-in-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-semibold text-gray-800">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
