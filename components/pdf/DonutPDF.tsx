// components/pdf/DonutPDF.tsx
import React from "react";
import { Svg, Circle, Text } from "@react-pdf/renderer";

export default function DonutPDF({ score }: { score: number }) {
  const getColor = (value: number) => {
    if (value < 40) return "#EF4444"; // red
    if (value < 80) return "#F59E0B"; // yellow
    return "#10B981"; // green
  };

  const radius = 90;
  const stroke = 14;

  const progressRadius = radius * (score / 100);

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
        stroke={getColor(score)}
        fill="transparent"
        strokeWidth={stroke}
        r={progressRadius}
        cx="130"
        cy="130"
      />
      <Text
        x="130"
        y="140"
        textAnchor="middle"
        fontSize={48}
        fontWeight="700"
        fill="#111827"
      >
        {score}%
      </Text>
    </Svg>
  );
}
