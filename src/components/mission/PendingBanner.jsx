import { CloudOff, RefreshCw } from "lucide-react";

export default function PendingBanner({ pending = [], syncing = false, online = true, onSync }) {
  if (!pending.length) return null;
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-accent/30 bg-accent/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-2.5">
        <CloudOff className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.7} />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {pending.length} check-in{pending.length > 1 ? "s" : ""} pending synchronisation
          </p>
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted-foreground">
            Saved in this browser. Queued records sync automatically when the operations link returns.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onSync}
        disabled={!online || syncing}
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-accent/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCw className={syncing ? "h-3 w-3 animate-spin" : "h-3 w-3"} />
        {syncing ? "Synchronising" : "Synchronise"}
      </button>
    </div>
  );
}
