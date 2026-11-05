import { ArrowUpRight, BookOpen, Clock, FileText, FlaskConical } from "lucide-react";
import { profile, publications, type Publication } from "../data";
import { GithubIcon, ScholarIcon } from "./BrandIcons";
import { Reveal, Section } from "./ui";

const statusStyle: Record<Publication["status"], { cls: string; Icon: typeof BookOpen; label: string }> = {
  Published: { cls: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300", Icon: BookOpen, label: "Published" },
  Accepted: { cls: "border-amber-400/40 bg-amber-400/10 text-amber-300", Icon: Clock, label: "Accepted · publication pending" },
  "In preparation": { cls: "border-violet-400/40 bg-violet-400/10 text-violet-300", Icon: FlaskConical, label: "In preparation" },
};

function PubRow({ p, i }: { p: Publication; i: number }) {
  const s = statusStyle[p.status];
  return (
    <Reveal delay={i * 0.06}>
      <article className="glass flex flex-col gap-4 rounded-2xl p-6 transition hover:border-accent/40 sm:flex-row sm:items-center">
        <div className="hidden rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 p-3 sm:block">
          <FileText className="size-6 text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>
              <s.Icon className="size-3.5" /> {s.label}
            </span>
            <span className="font-mono text-xs text-slate-500">{p.venue}</span>
          </div>
          <h3 className="mt-2 text-lg leading-snug font-semibold text-white">{p.title}</h3>
          {p.note && <p className="mt-1 text-sm text-slate-500">{p.note}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          {p.link && (
            <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-sm text-white hover:border-accent/60">
              Paper <ArrowUpRight className="size-4" />
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-sm text-white hover:border-accent/60">
              <GithubIcon className="size-4" /> Code
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Publications() {
  const published = publications.filter((p) => p.status === "Published").length;
  const pending = publications.length - published;
  return (
    <Section id="publications" eyebrow="03 · Publications" title="Research & publications"
      intro={`${published} published, ${pending} accepted or in preparation. The full list is on my Google Scholar profile.`}>
      <div className="space-y-4">{publications.map((p, i) => <PubRow key={p.title} p={p} i={i} />)}</div>
      <Reveal className="mt-8">
        <a href={profile.links.scholar} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-3 font-semibold text-ink transition hover:scale-[1.03]">
          <ScholarIcon className="size-5" /> Google Scholar profile <ArrowUpRight className="size-4" />
        </a>
      </Reveal>
    </Section>
  );
}
