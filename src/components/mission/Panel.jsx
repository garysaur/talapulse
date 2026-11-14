import { cn } from "@/lib/utils";

export default function Panel({ label, title, action, children, className, bodyClassName, id }) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/70 bg-card/60 panel-sheen rise-in",
        className,
      )}
    >
      {(label || title || action) && (
        <header className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3">
          <div className="min-w-0">
            {label && <p className="mono-label">{label}</p>}
            {title && (
              <h2 className="mt-0.5 truncate font-heading text-[13px] font-medium tracking-tight text-foreground">
                {title}
              </h2>
            )}
          </div>
          {action}
        </header>
      )}
      <div className={cn("px-4 py-4", bodyClassName)}>{children}</div>
    </section>
  );
}
