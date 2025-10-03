import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 15 },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  score: { fontSize: 14, fontWeight: "bold" },
});

interface DonutPDFProps {
  score: number;
}

function DonutPDF({ score }: DonutPDFProps) {
  let color = "#4CAF50"; // green
  if (score < 50) color = "#F44336"; // red
  else if (score < 80) color = "#FF9800"; // orange

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: color }]}>
        <Text style={styles.score}>{score}%</Text>
      </View>
    </View>
  );
}

export default DonutPDF;
