import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import Sparkline from "./Sparkline";

export default function MetricCard({ label, value, unit, state = "calibrating", deltaText, baseline, series, icon: Icon, className }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/70 bg-card/60 px-4 py-3.5 transition-colors hover:border-border",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.6} />}
          <p className="mono-label whitespace-nowrap text-[9.5px] tracking-[0.14em]">{label}</p>
        </div>
        <StatusBadge state={state} />
      </div>
      <div className="mt-2.5 flex items-baseline gap-1.5">
        <span className="font-heading text-[26px] font-medium leading-none tabular text-foreground">{value}</span>
        <span className="font-mono text-[11px] text-muted-foreground">{unit}</span>
      </div>
      <Sparkline values={series} baseline={baseline} state={state} className="mt-3 h-9 w-full" />
      <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-muted-foreground">{deltaText}</p>
    </div>
  );
}
