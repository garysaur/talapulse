import { useId } from "react";
import { cn } from "@/lib/utils";
import { stateColor } from "./StatusBadge";

export default function Sparkline({ values = [], baseline, state = "stable", className }) {
  const gradientId = useId().replace(/[:]/g, "");

  if (!values || values.length < 2) {
    return <div className={cn("rounded border border-dashed border-border/60", className)} aria-hidden="true" />;
  }

  const width = 100;
  const height = 36;
  const pad = 3;
  const domain = baseline != null ? [...values, baseline] : values;
  const min = Math.min(...domain);
  const max = Math.max(...domain);
  const span = max - min || 1;
  const x = (index) => pad + (index * (width - pad * 2)) / (values.length - 1);
  const y = (value) => height - pad - ((value - min) / span) * (height - pad * 2);
  const points = values.map((value, index) => `${x(index).toFixed(2)},${y(value).toFixed(2)}`);
  const color = stateColor(state);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("overflow-visible", className)}
      role="img"
      aria-label="Recent trend"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {baseline != null && (
        <line
          x1={pad}
          x2={width - pad}
          y1={y(baseline)}
          y2={y(baseline)}
          stroke="hsl(var(--muted-foreground))"
          strokeOpacity="0.45"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        />
      )}
      <polygon points={`${pad},${height - pad} ${points.join(" ")} ${width - pad},${height - pad}`} fill={`url(#${gradientId})`} />
      <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(values.length - 1)} cy={y(values[values.length - 1])} r="1.8" fill={color} />
    </svg>
  );
}
