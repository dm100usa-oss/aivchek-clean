import React from "react";
import { Svg, Circle, Text } from "@react-pdf/renderer";

interface DonutPDFProps {
  score: number;
}

export default function DonutPDF({ score }: DonutPDFProps) {
  const radius = 90;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  const getGradientColor = (value: number) => {
    if (value <= 50) {
      const ratio = value / 50;
      return interpolateColor("#ef4444", "#f59e0b", ratio);
    } else {
      const ratio = (value - 50) / 50;
      return interpolateColor("#f59e0b", "#10b981", ratio);
    }
  };

  function interpolateColor(color1: string, color2: string, factor: number) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const result = {
      r: Math.round(c1.r + (c2.r - c1.r) * factor),
      g: Math.round(c1.g + (c2.g - c1.g) * factor),
      b: Math.round(c1.b + (c2.b - c1.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  }

  function hexToRgb(hex: string) {
    const parsed = parseInt(hex.slice(1), 16);
    return {
      r: (parsed >> 16) & 255,
      g: (parsed >> 8) & 255,
      b: parsed & 255,
    };
  }

  return (
    <Svg width="260" height="260" viewBox="0 0 260 260">
      <Circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx="130"
        cy="130"
      />
      <Circle
        stroke={getGradientColor(score)}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference.toString()}
        strokeDashoffset={offset.toString()}
        r={radius}
        cx="130"
        cy="130"
        transform="rotate(-90 130 130)"
      />
      <Text
        x="130"
        y="140"
        textAnchor="middle"
        style={{
          fontSize: 48,
          fontWeight: 700,
          fill: "#111827",
        }}
      >
        {score}%
      </Text>
    </Svg>
  );
}
