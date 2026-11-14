import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ClipboardCheck, Gauge, Globe2, History, Menu, Radio, Satellite, ShieldAlert, TrendingUp, Wifi, WifiOff, X } from 'lucide-react';
import { useHealthData } from '@/lib/HealthDataContext';
import { cn } from '@/lib/utils';
import MissionClock from '@/components/mission/MissionClock';

export const NAV = [
  { to: '/', label: 'Mission dashboard', short: 'Dashboard', icon: Gauge },
  { to: '/check-in', label: 'Daily check-in', short: 'Check-in', icon: ClipboardCheck },
  { to: '/sensor', label: 'PUMA sensor sim', short: 'Sensor', icon: Radio },
  { to: '/environment', label: 'Space environment', short: 'Environment', icon: Globe2 },
  { to: '/trends', label: 'Personal trends', short: 'Trends', icon: TrendingUp },
  { to: '/history', label: 'Health history', short: 'History', icon: History },
  { to: '/guidance', label: 'Guidance library', short: 'Guidance', icon: BookOpen },
];

function isActive(pathname, to) {
  return to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="relative grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-primary/10">
        <Satellite className="h-4 w-4 text-primary" strokeWidth={1.7} />
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      <span className="leading-tight">
        <span className="block font-heading text-[13px] font-semibold tracking-[0.18em] text-foreground">ASTROHEALTH</span>
        <span className="mono-label block text-[9px] tracking-[0.3em]">MONITOR</span>
      </span>
    </Link>
  );
}

function NavItems({ pathname, onNavigate }) {
  return (
    <nav className="space-y-1">
      {NAV.map((item, index) => {
        const active = isActive(pathname, item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              'group flex items-center gap-3 rounded-md border px-3 py-2 text-[13px] transition-colors',
              active ? 'border-primary/30 bg-primary/10 text-foreground' : 'border-transparent text-muted-foreground hover:border-border/70 hover:bg-secondary/40 hover:text-foreground',
            )}
          >
            <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} strokeWidth={1.6} />
            <span className="flex-1 truncate">{item.label}</span>
            <span className="font-mono text-[10px] text-muted-foreground/70">0{index + 1}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function LinkStatus() {
  const { online, pending } = useHealthData();
  const queued = pending.length;
  const state = !online ? 'observe' : queued ? 'pending' : 'stable';
  const label = !online ? 'Link offline' : queued ? `${queued} queued` : 'Link nominal';

  return (
    <span className="chip hidden sm:inline-flex" data-state={state}>
      {online ? <Wifi className="h-2.5 w-2.5" strokeWidth={2} /> : <WifiOff className="h-2.5 w-2.5" strokeWidth={2} />}
      {label}
    </span>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const current = NAV.find((item) => isActive(location.pathname, item.to)) ?? NAV[0];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 grid-backdrop opacity-[0.28]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,hsl(var(--primary)/0.08),transparent)]" aria-hidden="true" />
      <div className="relative flex min-h-screen">
        <aside className="hidden w-[268px] shrink-0 flex-col border-r border-border/60 bg-card/50 px-4 py-5 backdrop-blur lg:flex">
          <Brand />
          <div className="mt-7">
            <p className="mono-label mb-2 px-3 text-[9px]">Operations</p>
            <NavItems pathname={location.pathname} />
          </div>
          <div className="mt-auto space-y-3 pt-6">
            <div className="rounded-md border border-border/70 bg-background/50 p-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-warn" strokeWidth={1.7} />
                <p className="mono-label text-[9px] text-warn">Proof of concept</p>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                Synthetic measurements only. Not a clinically validated medical system, and not connected to NASA hardware.
              </p>
            </div>
            <p className="mono-label px-1 text-[9px]">Build 2026.11 · Ops console</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
            <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
              <button type="button" onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:text-foreground lg:hidden" aria-label="Open navigation">
                <Menu className="h-4 w-4" />
              </button>
              <div className="hidden min-w-0 items-baseline gap-2 sm:flex">
                <span className="mono-label text-[9px]">OPS</span>
                <span className="text-muted-foreground/50">/</span>
                <span className="truncate font-heading text-[13px] font-medium tracking-tight text-foreground">{current.label}</span>
              </div>
              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <MissionClock />
                <LinkStatus />
                <span className="hidden h-6 w-px bg-border/70 sm:block" />
                <span className="chip" data-state="neutral">Public demo</span>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>

          <footer className="border-t border-border/60 px-4 py-4 sm:px-6 lg:px-8">
            <p className="mono-label text-[9px] leading-relaxed">AstroHealth Monitor · Educational proof of concept · Synthetic crew data · Not for operational or clinical use</p>
          </footer>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close navigation" className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative max-h-full w-[86%] max-w-[300px] overflow-y-auto border-r border-border bg-card px-4 py-5">
            <div className="flex items-center justify-between">
              <Brand />
              <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-md border border-border/70 text-muted-foreground" aria-label="Close navigation">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6">
              <NavItems pathname={location.pathname} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
