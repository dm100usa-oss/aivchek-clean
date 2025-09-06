"use client";

import { useEffect, useState } from "react";

export default function Donut({ score }: { score: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 1;
      if (start <= score) {
        setProgress(start);
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [score]);

  // Определяем цвет по проценту
  const getColor = (value: number) => {
    if (value < 40) return "red";
    if (value < 80) return "orange";
    return "green";
  };

  const color = getColor(progress);

  // Настройка окружности
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox="0 0 200 200"
      >
        {/* Серый фон кольца */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="16"
          fill="none"
        />
        {/* Цветное кольцо */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke={`url(#grad-${color})`}
          strokeWidth="16"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.3s linear" }}
        />
        <defs>
          <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
          <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      {/* Цифра в центре */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{progress}%</span>
      </div>
    </div>
  );
}
