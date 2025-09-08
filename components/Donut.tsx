"use client";

import { useEffect, useState } from "react";

interface DonutProps {
  score: number; // 0–100
}

export default function Donut({ score }: DonutProps) {
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

  // Цвет в зависимости от процента
  const color =
    score >= 80 ? "#16a34a" : score >= 40 ? "#eab308" : "#dc2626"; 
  // зелёный / жёлтый / красный (чистые цвета tailwind palette)

  const size = 240; // размер круга (увеличенный)
  const stroke = 20; // толщина кольца
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 drop-shadow-sm"
      >
        {/* Серый фон кольца */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // neutral-300
          strokeWidth={stroke}
          fill="transparent"
        />
        {/* Цветное кольцо */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {/* Цифра процентов */}
      <div className="absolute text-5xl font-bold text-gray-800">
        {progress}%
      </div>
    </div>
  );
}
