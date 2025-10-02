// components/pdf/DonutPDF.tsx
import React from "react";
import { Svg, Circle } from "@react-pdf/renderer";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

export default function DonutPDF({ score }: { score: number }) {
  const getColor = (value: number) => {
    if (value < 40) return "#EF4444"; // red
    if (value < 80) return "#F59E0B"; // yellow
    return "#10B981"; // green
  };

  const radius = 90;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width="260" height="260" viewBox="0 0 260 260">
        {/* background circle */}
        <Circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx="130"
          cy="130"
        />
        {/* progress circle */}
        <Circle
          stroke={getColor(score)}
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx="130"
          cy="130"
          // ↓ TS не знает про эти атрибуты, поэтому явно as any
          {...({
            strokeDasharray: circumference.toString(),
            strokeDashoffset: offset.toString(),
            strokeLinecap: "round",
            transform: "rotate(-90 130 130)",
          } as any)}
        />
      </Svg>
      <Text style={styles.score}>{score}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    position: "absolute",
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },
});
