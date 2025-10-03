// components/pdf/DonutPDF.tsx
import React from "react";
import { Svg, Circle, Text } from "@react-pdf/renderer";

interface DonutPDFProps {
  score: number; // 0 to 100
  size?: number; // circle size
  strokeWidth?: number; // stroke thickness
}

const DonutPDF: React.FC<DonutPDFProps> = ({ score, size = 140, strokeWidth = 14 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E5E7EB"
        strokeWidth={strokeWidth.toString()}
        fill="white"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#10B981"
        strokeWidth={strokeWidth.toString()}
        strokeLinecap="round"
        strokeDasharray={circumference.toString()}
        strokeDashoffset={(circumference - progress).toString()}
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <Text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="6"
        fontSize={(size / 3).toString()}
        fontWeight="bold"
        fill="#111827"
      >
        {score}%
      </Text>
    </Svg>
  );
};

export default DonutPDF;
