import { AlertTriangle, RefreshCw } from "lucide-react";

export function LoadingPanel({ label = "Loading synthetic health records" }) {
  return (
    <div className="rounded-lg border border-border/70 bg-card/60 p-6">
      <p className="mono-label">{label}</p>
      <div className="mt-4 space-y-2.5">
        <div className="h-3 w-2/3 animate-pulse rounded bg-secondary/70" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-secondary/60" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-secondary/40" />
      </div>
    </div>
  );
}

export function ErrorPanel({ title = "Records unavailable", message, onRetry }) {
  return (
    <div className="rounded-lg border border-alert/30 bg-alert/[0.06] p-5">
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-alert" strokeWidth={1.8} />
        <div className="min-w-0">
          <p className="font-heading text-[14px] font-medium text-foreground">{title}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
            {message || "The operations link did not answer. Check-ins can still be recorded and stored locally."}
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <RefreshCw className="h-3 w-3" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
