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

  const radius = 60;  // круг чуть меньше
  const stroke = 10;

  return (
    <View style={styles.container}>
      <Svg width="160" height="160" viewBox="0 0 160 160">
        {/* Серый фон-кольцо */}
        <Circle
          stroke="#E5E7EB"  // light gray
          fill="white"
          strokeWidth={stroke}
          r={radius}
          cx="80"
          cy="80"
        />
        {/* Цветное кольцо сверху */}
        <Circle
          stroke={getColor(score)}
          fill="none"
          strokeWidth={stroke}
          r={radius}
          cx="80"
          cy="80"
        />
      </Svg>
      <Text style={styles.score}>{score}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    position: "absolute",
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827", // dark gray/black
    textAlign: "center",
  },
});
