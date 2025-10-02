// components/pdf/DonutPDF.tsx
import React from "react";
import { Svg, Circle, Text } from "@react-pdf/renderer";
import { View, StyleSheet } from "@react-pdf/renderer";

export default function DonutPDF({ score }: { score: number }) {
  const radius = 90;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;

  const getGradientColor = (value: number) => {
    if (value <= 50) {
      const ratio = value / 50;
      return interpolateColor("#ef4444", "#f59e0b", ratio); // red → yellow
    } else {
      const ratio = (value - 50) / 50;
      return interpolateColor("#f59e0b", "#10b981", ratio); // yellow → green
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
    <View style={styles.container}>
      <Svg width="260" height="260" viewBox="0 0 260 260">
        {/* Background circle */}
        <Circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx="130"
          cy="130"
        />
        {/* Progress circle */}
        <Circle
          stroke={getGradientColor(clamped)}
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
        {/* Center text */}
        <Text
          x="130"
          y="140"
          textAnchor="middle"
          fontSize="48"
          fontWeight="700"
          fill="#111827"
        >
          {clamped}%
        </Text>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
});
