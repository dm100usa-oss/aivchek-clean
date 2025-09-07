"use client";

interface DonutProps {
  score: number;
}

export default function Donut({ score }: DonutProps) {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 40) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={getColor()}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{
          strokeDashoffset,
          transition: "stroke-dashoffset 1s ease, stroke 0.5s ease",
        }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill={getColor()}
      >
        {score}%
      </text>
    </svg>
  );
}
