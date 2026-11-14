import { Activity, ArrowRight, ClipboardCheck, HeartPulse, Moon, Smile } from 'lucide-react';

export function MetricCard({ label, value, unit, state, icon: Icon, deltaText }) {
  return (
    <div className="rounded-lg border border-border/70 bg-background/40 p-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className="mono-label text-[8.5px]">{label}</p>
        {Icon && <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.7} />}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-heading text-[24px] leading-none tabular text-foreground">{value}</span>
        {unit && <span className="font-mono text-[9px] text-muted-foreground">{unit}</span>}
      </div>
      <p className="mt-2 font-mono text-[9.5px] text-muted-foreground">{deltaText}</p>
      <div className="mt-2"><span className="chip" data-state={state ?? 'stable'}>{state ?? 'stable'}</span></div>
    </div>
  );
}

export default function DashboardOverviewCards() {
  const metrics = [
    { label: 'Heart rate', value: '68', unit: 'bpm', state: 'stable', icon: HeartPulse, deltaText: '+2 bpm vs baseline' },
    { label: 'Sleep', value: '7.4', unit: 'h', state: 'stable', icon: Moon, deltaText: '+0.2 h vs baseline' },
    { label: 'Fatigue', value: '4', unit: '/10', state: 'observe', icon: Activity, deltaText: '+1 point vs baseline' },
    { label: 'Mood', value: '4', unit: '/5', state: 'stable', icon: Smile, deltaText: '+1 vs baseline' },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="mono-label text-[9px] text-primary">{eyebrow}</p>
        <h1 className="mt-1 font-heading text-[28px] font-medium leading-tight tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export function Panel({ label, title, action, children, className = '' }) {
  return (
    <section className={`rounded-xl border border-border/70 bg-card/60 p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          {label && <p className="mono-label text-[8.5px]">{label}</p>}
          {title && <h2 className="mt-1 font-heading text-[15px] font-medium text-foreground">{title}</h2>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatusBadge({ state = 'stable' }) {
  const stateMap = {
    stable: 'stable',
    observe: 'observe',
    attention: 'attention',
    calibrating: 'neutral',
  };
  return <span className="chip" data-state={stateMap[state] ?? 'neutral'}>{state}</span>;
}

export function DisclaimerBand({ className = '' }) {
  return (
    <div className={`rounded-lg border border-border/70 bg-card/60 p-3.5 ${className}`}>
      <div className="flex items-start gap-2">
        <ClipboardCheck className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-[11.5px] leading-relaxed text-muted-foreground">
          Educational proof of concept only. Synthetic crew data is not a medical record, not a diagnosis, and not connected to real hardware or live astronaut operations.
        </p>
      </div>
    </div>
  );
}

export function LoadingPanel({ label = 'Loading' }) {
  return <div className="rounded-xl border border-border/70 bg-card/60 p-4 text-sm text-muted-foreground">{label}</div>;
}

export function ErrorPanel({ title = 'Could not load data', message = 'The operations link did not answer.', onRetry }) {
  return (
    <div className="rounded-xl border border-alert/30 bg-alert/[0.06] p-4 text-sm text-alert">
      <div className="font-medium">{title}</div>
      <p className="mt-1 text-[12px]">{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="mt-3 underline">Retry</button>}
    </div>
  );
}

export function PendingBanner({ pending = [], syncing = false, online = true, onSync }) {
  return (
    <div className="rounded-lg border border-border/70 bg-card/60 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="mono-label text-[9px]">Connection</p>
          <p className="text-[12px] text-foreground">{online ? 'Link nominal' : 'Link offline'} · {pending.length} pending</p>
        </div>
        {onSync && (
          <button type="button" onClick={onSync} className="rounded-md bg-primary px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-primary-foreground">
            {syncing ? 'Syncing' : 'Sync now'}
          </button>
        )}
      </div>
    </div>
  );
}

export function ProfileCard({ profile }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-4">
      <p className="mono-label text-[8.5px]">Crew profile</p>
      <h3 className="mt-1 font-heading text-[16px] text-foreground">{profile?.full_name}</h3>
      <p className="mt-1 font-mono text-[10px] text-primary">{profile?.call_sign}</p>
      <p className="mt-2 text-[12px] text-muted-foreground">{profile?.role}</p>
      <div className="mt-3 border-t border-border/60 pt-3">
        <p className="mono-label text-[8.5px]">Mission</p>
        <p className="mt-1 text-[12px] text-foreground">{profile?.mission_name}</p>
      </div>
    </div>
  );
}

export function StatusOverview({ state, headline, lastCheckin, sources = [] }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mono-label text-[8.5px]">Status overview</p>
          <h2 className="mt-1 font-heading text-[18px] text-foreground">{headline}</h2>
        </div>
        <StatusBadge state={state} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        {lastCheckin && <span>Last check-in: {lastCheckin}</span>}
        {sources.map((source) => <span key={source}>{source}</span>)}
      </div>
    </div>
  );
}

export function SyncCard({ online, pendingCount, lastSyncLabel, syncing, onSync }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-4">
      <p className="mono-label text-[8.5px]">Operations link</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-heading text-[16px] text-foreground">{online ? 'Nominal' : 'Offline'}</span>
        <span className="chip" data-state={online ? 'stable' : 'observe'}>{online ? 'online' : 'offline'}</span>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">Pending: {pendingCount}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">Last sync: {lastSyncLabel || 'Not yet'}</p>
      {onSync && <button type="button" onClick={onSync} className="mt-3 rounded-md border border-border/70 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-foreground">{syncing ? 'Syncing' : 'Sync now'}</button>}
    </div>
  );
}

export function SensorSnapshot({ sample }) {
  if (!sample) return <div className="text-sm text-muted-foreground">No sample available.</div>;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-border/70 bg-background/40 p-2">
          <p className="mono-label text-[8.5px]">Heart rate</p>
          <p className="mt-1 font-heading text-[18px] text-foreground">{sample.values?.heart_rate ?? '—'}</p>
        </div>
        <div className="rounded-md border border-border/70 bg-background/40 p-2">
          <p className="mono-label text-[8.5px]">SpO₂</p>
          <p className="mt-1 font-heading text-[18px] text-foreground">{sample.values?.oxygen_percent ?? '—'}</p>
        </div>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">{sample.label}</p>
    </div>
  );
}

export function RecentChanges({ changes = [] }) {
  if (!changes.length) return <p className="text-[12px] text-muted-foreground">No changes outside baseline yet.</p>;
  return <div className="space-y-2">{changes.map((change) => <div key={change.key} className="rounded-md border border-border/70 bg-background/40 p-2.5"><p className="font-mono text-[10px] text-primary">{change.label}</p><p className="mt-1 text-[11px] text-muted-foreground">{change.detail}</p></div>)}</div>;
}

export function Sparkline({ values = [], baseline, state = 'stable', className = '' }) {
  const max = Math.max(...values, baseline || 0, 1);
  const min = Math.min(...values, baseline || 0, 0);
  const width = 100;
  const height = 30;
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width;
    const y = height - ((value - min) / Math.max(max - min, 1)) * height;
    return `${x},${y}`;
  }).join(' ');
  const baselineY = height - ((baseline - min) / Math.max(max - min, 1)) * height;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <line x1="0" x2={width} y1={baselineY} y2={baselineY} stroke="rgba(255,255,255,0.3)" strokeDasharray="4 4" />
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} className={state === 'attention' ? 'text-alert' : state === 'observe' ? 'text-warn' : 'text-primary'} />
    </svg>
  );
}
