// components/pdf/DonutPDF.tsx
import { View, Text, Svg, Circle, Path } from "@react-pdf/renderer";

interface DonutPDFProps {
  score: number;
}

export default function DonutPDF({ score }: DonutPDFProps) {
  const radius = 100;
  const stroke = 12;
  const size = 240;
  const center = size / 2;
  const normalized = Math.min(Math.max(score, 0), 100);
  const angle = (normalized / 100) * 360;

  const getColor = (value: number) => {
    if (value >= 80) return "#10b981"; // green
    if (value >= 40) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      r,
      r,
      0,
      largeArc,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  const arcPath =
    normalized > 0 ? describeArc(center, center, radius, 0, angle) : "";

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="white"
        />
        {arcPath && (
          <Path
            d={arcPath}
            stroke={getColor(normalized)}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
          />
        )}
      </Svg>
      <Text
        style={{
          position: "absolute",
          fontSize: 40,
          fontWeight: "bold",
          color: "#111827",
        }}
      >
        {normalized}%
      </Text>
    </View>
  );
}
