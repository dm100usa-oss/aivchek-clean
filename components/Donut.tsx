"use client";
import { useEffect, useState } from "react";

interface DonutProps {
  score: number;
}

export default function Donut({ score }: DonutProps) {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

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

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (progress >= 80) return "#10b981"; // green
    if (progress >= 40) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={getColor()}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease",
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill={getColor()}
      >
        {progress}%
      </text>
    </svg>
  );
}
