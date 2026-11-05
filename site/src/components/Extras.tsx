import { ArrowUpRight, CodeXml, Database, Heart, Sparkles, Trophy, Wrench } from "lucide-react";
import { extras } from "../data";
import { Reveal, Section } from "./ui";

const iconFor = (kind: string) => {
  if (kind.startsWith("Competition")) return Trophy;
  if (kind.startsWith("Deep")) return Sparkles;
  if (kind.startsWith("Research")) return CodeXml;
  if (kind.startsWith("Open dataset")) return Database;
  if (kind.startsWith("Volunteer")) return Heart;
  return Wrench;
};

export default function Extras() {
  return (
    <Section id="extras" eyebrow="04 · Beyond the main projects" title="Competitions, deep dives & more">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {extras.map((x, i) => {
          const Icon = iconFor(x.kind);
          const featured = i === 0;
          const body = (
            <div className={`glass group relative h-full overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 hover:border-accent/40 ${featured ? "ring-1 ring-amber-300/30" : ""}`}>
              {featured && <div className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-amber-400/20 blur-3xl" />}
              <div className="flex items-center justify-between">
                <div className={`inline-flex rounded-xl p-2.5 ${featured ? "bg-amber-400/15" : "bg-gradient-to-br from-cyan-500/20 to-violet-500/20"}`}>
                  <Icon className={`size-5 ${featured ? "text-amber-300" : "text-accent"}`} />
                </div>
                {x.badge && <span className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${featured ? "bg-amber-400/15 text-amber-200" : "bg-white/5 text-slate-300"}`}>{x.badge}</span>}
              </div>
              <p className="mt-4 font-mono text-[11px] tracking-wide text-slate-500 uppercase">{x.kind}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{x.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{x.text}</p>
              {x.href && (
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  View on GitHub <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              )}
            </div>
          );
          return (
            <Reveal key={x.title} delay={(i % 3) * 0.07}>
              {x.href ? <a href={x.href} target="_blank" rel="noreferrer" className="block h-full">{body}</a> : body}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
