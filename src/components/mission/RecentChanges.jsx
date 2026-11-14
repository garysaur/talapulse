import { stateColor } from "./StatusBadge";

export default function RecentChanges({ changes = [], emptyText = "No changes beyond your personal baseline at the last check-in." }) {
  return (
    <div className="space-y-2.5">
      {changes.length === 0 && <p className="text-[12px] leading-relaxed text-muted-foreground">{emptyText}</p>}
      {changes.map((change) => (
        <div key={change.label} className="flex items-start gap-3 border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: stateColor(change.state) }} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-[12.5px] text-foreground">{change.label}</p>
              <p className="font-mono text-[10.5px] tabular text-muted-foreground">{change.detail}</p>
            </div>
            {change.note && <p className="mt-0.5 font-mono text-[10px] leading-relaxed text-muted-foreground">{change.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
