import { cn } from "@/lib/utils";

export const STATE_META = {
  stable: { label: "Stable", token: "--ok" },
  observe: { label: "Observe", token: "--warn" },
  attention: { label: "Attention", token: "--alert" },
  calibrating: { label: "Calibrating", token: "--muted-foreground" },
  pending: { label: "Pending sync", token: "--accent" },
};

export function stateColor(state) {
  return `hsl(var(${STATE_META[state]?.token ?? "--muted-foreground"}))`;
}

export default function StatusBadge({ state = "stable", label, pulse = false, className }) {
  const meta = STATE_META[state] ?? STATE_META.calibrating;
  return (
    <span className={cn("chip", className)} data-state={STATE_META[state] ? state : "calibrating"}>
      <span className="dot" data-pulse={pulse ? "true" : undefined} />
      {label ?? meta.label}
    </span>
  );
}
