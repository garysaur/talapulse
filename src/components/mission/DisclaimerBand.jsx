import { cn } from "@/lib/utils";

export default function DisclaimerBand({ className }) {
  return (
    <div className={cn("rounded-lg border border-warn/25 bg-warn/[0.06] px-4 py-3", className)}>
      <div className="flex items-start gap-2.5">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warn" />
        <p className="text-[11.5px] leading-relaxed text-muted-foreground">
          AstroHealth Monitor is an educational proof of concept using synthetic astronaut health measurements. It is not
          a clinically validated medical system and is not intended to replace flight surgeons, medical assessment, or
          established crew medical procedures.
        </p>
      </div>
    </div>
  );
}
