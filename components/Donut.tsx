"use client";
import { useEffect, useState } from "react";

export default function Donut({ score }: { score: number }) {
  const [progress, setProgress] = useState(0);

  // Анимация от 0 к score
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

  // Цвет от красного к зелёному
  const getColor = (value: number) => {
    if (value < 40) return "#ef4444"; // красный
    if (value < 80) return "#f59e0b"; // жёлтый
    return "#22c55e"; // зелёный
  };

  const radius = 60;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg
        width="160"
        height="160"
        className="-rotate-90"
      >
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#e5e7eb" // серый фон
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={getColor(progress)}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke 0.3s" }}
        />
      </svg>
      <p className="text-3xl font-bold text-gray-800 -mt-24">
        {progress}%
      </p>
    </div>
  );
}
