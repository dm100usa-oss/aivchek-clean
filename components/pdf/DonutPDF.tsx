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

  return (
    <View style={styles.container}>
      <Svg width="260" height="260" viewBox="0 0 260 260">
        {/* Белый фон внутри круга */}
        <Circle
          fill="#ffffff"
          r={radius + stroke / 2}
          cx="130"
          cy="130"
        />
        {/* Основное кольцо */}
        <Circle
          stroke={getColor(score)}
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx="130"
          cy="130"
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
    fontSize: 48,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },
});
