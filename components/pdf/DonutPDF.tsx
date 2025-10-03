// /components/pdf/DonutPDF.tsx
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
  green: { borderColor: "#4CAF50" },
  orange: { borderColor: "#FF9800" },
  red: { borderColor: "#F44336" },
});

interface DonutPDFProps {
  score: number;
}

function DonutPDF({ score }: DonutPDFProps) {
  let colorStyle = styles.green;
  if (score < 50) colorStyle = styles.red;
  else if (score < 80) colorStyle = styles.orange;

  return (
    <View style={styles.container}>
      <View style={[styles.circle, colorStyle]}>
        <Text style={styles.score}>{score}%</Text>
      </View>
    </View>
  );
}

export default DonutPDF;
