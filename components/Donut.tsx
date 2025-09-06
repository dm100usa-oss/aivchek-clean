"use client";

import { useEffect, useRef } from "react";

export default function Donut({ score }: { score: number }) {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;

      const offset = circumference - (score / 100) * circumference;
      circleRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [score]);

  // Dynamic gradient color depending on score
  const gradientId = "donut-gradient";
  let gradientStops;
  if (score < 40) {
    gradientStops = (
      <>
        <stop offset="0%" stopColor="#dc2626" /> {/* red */}
        <stop offset="100%" stopColor="#f87171" /> {/* light red */}
      </>
    );
  } else if (score < 80) {
    gradientStops = (
      <>
        <stop offset="0%" stopColor="#f59e0b" /> {/* amber */}
        <stop offset="100%" stopColor="#fde68a" /> {/* light yellow */}
      </>
    );
  } else {
    gradientStops = (
      <>
        <stop offset="0%" stopColor="#16a34a" /> {/* green */}
        <stop offset="100%" stopColor="#86efac" /> {/* light green */}
      </>
    );
  }

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {gradientStops}
          </linearGradient>
        </defs>
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          r="70"
          cx="80"
          cy="80"
        />
        <circle
          ref={circleRef}
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          r="70"
          cx="80"
          cy="80"
          style={{
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
        {score}%
      </div>
    </div>
  );
}
