"use client";

import { useEffect, useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type DonutProps = {
  score: number; // итоговый процент
};

export default function Donut({ score }: DonutProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Анимация числа
  useEffect(() => {
    let start = 0;
    const duration = 1200; // 1.2 сек
    const step = 20; // интервал в мс
    const increment = score / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        start = score;
        clearInterval(timer);
      }
      setAnimatedValue(Math.floor(start));
    }, step);

    return () => clearInterval(timer);
  }, [score]);

  // Динамический цвет
  const getColor = (value: number) => {
    if (value < 40) return "#ef4444"; // красный
    if (value < 80) return "#eab308"; // жёлтый
    return "#22c55e"; // зелёный
  };

  return (
    <div style={{ width: 180, height: 180, margin: "0 auto" }}>
      <CircularProgressbar
        value={animatedValue}
        text={`${animatedValue}%`}
        strokeWidth={10}
        styles={buildStyles({
          textColor: "#111827",
          trailColor: "#e5e7eb",
          pathColor: getColor(animatedValue),
          pathTransitionDuration: 1.2, // плавное заполнение
        })}
      />
    </div>
  );
}
