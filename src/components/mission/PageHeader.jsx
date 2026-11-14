import { cn } from "@/lib/utils";

export default function PageHeader({ eyebrow, title, description, children, className }) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="min-w-0">
        {eyebrow && <p className="mono-label">{eyebrow}</p>}
        <h1 className="mt-1 font-heading text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}
