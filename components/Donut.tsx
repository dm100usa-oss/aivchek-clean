"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type DonutProps = {
  value: number;
  mode: "quick" | "pro";
};

export default function Donut({ value, mode }: DonutProps) {
  // Цвета по процентам
  let pathColor = "";
  if (value >= 80) {
    pathColor = "url(#gradientGreen)";
  } else if (value >= 40) {
    pathColor = "url(#gradientYellow)";
  } else {
    pathColor = "url(#gradientRed)";
  }

  return (
    <div style={{ width: 180, height: 180, margin: "0 auto" }}>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="gradientYellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={10}
        styles={buildStyles({
          textColor: "#111827",
          trailColor: "#e5e7eb",
          pathColor,
        })}
      />
    </div>
  );
}
