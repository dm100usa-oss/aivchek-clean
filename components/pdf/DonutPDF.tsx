import React from "react";
import { Svg, Path, Text } from "@react-pdf/renderer";

interface DonutPDFProps {
  score: number;
}

export default function DonutPDF({ score }: DonutPDFProps) {
  const radius = 90;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;

  const percent = Math.min(Math.max(score, 0), 100);
  const arcLength = (percent / 100) * circumference;

  // цвет как в Donut.tsx
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

  // дуга
  const describeArc = (x: number, y: number, r: number, percent: number) => {
    const endAngle = (percent / 100) * 360;
    const largeArc = endAngle > 180 ? 1 : 0;
    const radians = (Math.PI / 180) * endAngle;
    const xEnd = x + r * Math.cos(radians - Math.PI / 2);
    const yEnd = y + r * Math.sin(radians - Math.PI / 2);
    return `M ${x} ${y - r} A ${r} ${r} 0 ${largeArc} 1 ${xEnd} ${yEnd}`;
  };

  return (
    <Svg width="260" height="260" viewBox="0 0 260 260">
      {/* серый круг */}
      <Path
        d={describeArc(130, 130, radius, 100)}
        stroke="#e5e7eb"
        strokeWidth={stroke.toString()}
        fill="none"
      />

      {/* цветная дуга */}
      <Path
        d={describeArc(130, 130, radius, percent)}
        stroke={getGradientColor(percent)}
        strokeWidth={stroke.toString()}
        strokeLinecap="round"
        fill="none"
      />

      {/* текст в центре */}
      <Text
        x="130"
        y="140"
        textAnchor="middle"
        fontSize={48}
        fontWeight="700"
        fill="#111827"
      >
        {percent}%
      </Text>
    </Svg>
  );
}
