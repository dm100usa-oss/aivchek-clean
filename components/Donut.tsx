"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type DonutProps = {
  score: number;
  mode: "quick" | "pro";
};

export default function Donut({ score, mode }: DonutProps) {
  // Основной цвет по режиму
  const mainColor = mode === "quick" ? "#2563eb" : "#16a34a"; // синий или зелёный

  // Цвет в зависимости от процентов
  let gradientColor = "#ef4444"; // красный
  if (score >= 80) {
    gradientColor = "#22c55e"; // зелёный
  } else if (score >= 40) {
    gradientColor = "#eab308"; // жёлтый
  }

  return (
    <div style={{ width: 180, height: 180, margin: "0 auto" }}>
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: gradientColor,
          trailColor: "#e5e7eb", // серый фон
          textColor: "#111827", // чёрный текст
          textSize: "16px",
        })}
      />
    </div>
  );
}
