// components/pdf/DonutPDF.tsx
import React from "react";
import { Svg, Circle, Text, View, StyleSheet } from "@react-pdf/renderer";

export default function DonutPDF({ score }: { score: number }) {
  const radius = 60;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  const getColor = (value: number) => {
    if (value < 40) return "#EF4444"; // red
    if (value < 80) return "#F59E0B"; // yellow
    return "#10B981"; // green
  };

  return (
    <View style={styles.container}>
      <Svg width="180" height="180" viewBox="0 0 180 180">
        {/* Серое кольцо */}
        <Circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx="90"
          cy="90"
        />
        {/* Основное цветное кольцо */}
        <Circle
          stroke={getColor(score)}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx="90"
          cy="90"
          transform="rotate(-90 90 90)"
        />
        {/* Текст с процентом */}
        <Text
          x="90"
          y="90"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#111827"
          dy="8"
        >
          {progress}%
        </Text>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});
