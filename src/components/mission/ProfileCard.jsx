function initialsOf(name = "") {
  return name
    .replace(/^(cmdr\.?|dr\.?|lt\.?|capt\.?)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 py-1.5 last:border-0">
      <span className="mono-label text-[9px]">{label}</span>
      <span className="truncate text-right text-[12px] text-foreground">{value}</span>
    </div>
  );
}

export default function ProfileCard({ profile }) {
  if (!profile) return null;
  return (
    <div className="rounded-lg border border-border/70 bg-card/60 p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-md border border-primary/30 bg-primary/10 font-heading text-sm font-medium text-primary">
          {initialsOf(profile.full_name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-heading text-[15px] font-medium tracking-tight text-foreground">{profile.full_name}</p>
          <p className="mono-label text-[9px]">Call sign · {profile.call_sign}</p>
        </div>
      </div>
      <div className="mt-3">
        <Row label="Role" value={profile.role} />
        <Row label="Mission" value={profile.mission_name} />
        <Row label="Flight day" value={`FD ${profile.mission_day}`} />
        <Row label="Profile" value={profile.agency || "Fictional astronaut"} />
      </div>
      <p className="mt-3 rounded border border-border/60 bg-background/40 px-2.5 py-2 font-mono text-[9.5px] leading-relaxed text-muted-foreground">
        Fictional crew profile. No real astronaut records are used.
      </p>
    </div>
  );
}
