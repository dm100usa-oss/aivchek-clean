// components/pdf/DonutPDF.tsx

interface DonutPDFProps {
  score: number;
}

export default function DonutPDF({ score }: DonutPDFProps) {
  const radius = 90;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (value: number) => {
    if (value < 50) return "#ef4444"; // red
    if (value < 80) return "#f59e0b"; // yellow
    return "#10b981"; // green
  };

  return (
    <svg width="260" height="260">
      {/* background circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={radius}
        cx="130"
        cy="130"
      />
      {/* progress circle */}
      <circle
        stroke={getColor(score)}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx="130"
        cy="130"
        transform="rotate(-90 130 130)"
      />
      {/* percentage text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="40"
        fontWeight="700"
        fill="#111827"
      >
        {score}%
      </text>
    </svg>
  );
}
