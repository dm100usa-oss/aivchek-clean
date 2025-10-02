// components/pdf/DonutPDF.tsx
import { View, Text, Svg, Circle } from "@react-pdf/renderer";

interface DonutPDFProps {
  score: number;
}

export default function DonutPDF({ score }: DonutPDFProps) {
  const radius = 90; // радиус круга
  const stroke = 14; // толщина линии
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (clampedScore / 100) * circumference;

  // Цвет линии в зависимости от результата
  const getColor = (value: number) => {
    if (value < 40) return "#ef4444"; // красный
    if (value < 80) return "#f59e0b"; // жёлтый
    return "#10b981"; // зелёный
  };

  return (
    <View style={{ alignItems: "center", marginVertical: 20 }}>
      <Svg width="220" height="220">
        {/* серый фон круга */}
        <Circle
          stroke="#e5e7eb"
          fill="white"
          strokeWidth={stroke.toString()}
          r={radius.toString()}
          cx="110"
          cy="110"
        />
        {/* цветная дуга */}
        <Circle
          stroke={getColor(clampedScore)}
          fill="transparent"
          strokeWidth={stroke.toString()}
          strokeLinecap="round"
          strokeDasharray={circumference.toString()}
          strokeDashoffset={offset.toString()}
          r={radius.toString()}
          cx="110"
          cy="110"
          transform="rotate(-90 110 110)"
        />
      </Svg>
      {/* цифра в центре */}
      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Text
          style={{
            fontSize: 42, // ~1/3 от диаметра круга
            fontWeight: 700,
            color: "#111827",
            textAlign: "center",
          }}
        >
          {clampedScore}%
        </Text>
      </View>
    </View>
  );
}
