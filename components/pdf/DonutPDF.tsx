// components/pdf/DonutPDF.tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

interface DonutPDFProps {
  score: number;
}

const styles = StyleSheet.create({
  wrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 14,
    borderColor: "#e5e7eb", // gray background circle
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },
});

export function DonutPDF({ score }: DonutPDFProps) {
  const clampedScore = Math.min(Math.max(score, 0), 100);

  // вычисляем цвет в зависимости от процента
  const getColor = (value: number) => {
    if (value <= 50) return "#ef4444"; // red
    if (value < 80) return "#f59e0b"; // amber
    return "#10b981"; // green
  };

  return (
    <View
      style={[
        styles.wrapper,
        { borderColor: getColor(clampedScore) },
      ]}
    >
      <Text style={styles.text}>{clampedScore}%</Text>
    </View>
  );
}
