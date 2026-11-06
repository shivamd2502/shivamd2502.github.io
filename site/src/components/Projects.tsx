import { useState } from "react";
import { ArrowUpRight, Award } from "lucide-react";
import { projects, type Project } from "../data";
import { GithubIcon } from "./BrandIcons";
import { Reveal, Section, Tag } from "./ui";

function ProjectCard({ p, i, total }: { p: Project; i: number; total: number }) {
  // first card is wide; the last one too when it would otherwise sit alone in its row
  const featured = i === 0 || (i === total - 1 && (total - 1) % 2 === 1);
  // cards show the project poster (AI artwork); the real result figure opens on the project page
  const poster = p.poster ?? `${import.meta.env.BASE_URL}posters/${p.slug}.webp`;
  const [usePoster, setUsePoster] = useState(true);
  const contain = !usePoster && p.fit === "contain";
  const page = `#/projects/${p.slug}`;
  return (
    <Reveal delay={(i % 2) * 0.08} className={featured ? "md:col-span-2" : ""}>
      <article className={`glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-2xl hover:shadow-cyan-500/10 ${featured ? "md:flex-row" : ""}`}>
        <a href={page} className={`relative block overflow-hidden ${contain ? "bg-white" : "bg-panel"} ${featured ? "md:w-[55%]" : ""}`} aria-label={`Open ${p.title}`}>
          <img src={usePoster ? poster : p.image} alt={usePoster ? `${p.title}: illustration` : p.imageAlt} loading="lazy"
            onError={() => setUsePoster(false)}
            className={`w-full transition duration-700 group-hover:scale-[1.04] ${contain ? "object-contain p-4" : "object-cover"} ${featured ? "h-64 md:h-full md:min-h-80" : "h-56"}`} />
          {!contain && <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />}
          {p.venue && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-3 py-1 text-xs font-semibold text-ink">
              <Award className="size-3.5" /> {p.venue}
            </span>
          )}
        </a>

        <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-8" : ""}`}>
          <p className="font-mono text-xs tracking-wide text-accent uppercase">{p.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            <a href={page} className="hover:underline">{p.title}</a>
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{p.summary}</p>

          <div className="mt-5 flex items-end gap-3">
            <p className="gradient-text text-4xl font-extrabold">{p.metric.value}</p>
            <p className="pb-1 text-sm text-slate-500">{p.metric.label}</p>
          </div>

          <ul className="mt-4 space-y-1.5">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm text-slate-400">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" /> {h}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            <a href={page}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-4 py-2 text-sm font-semibold text-ink transition hover:scale-[1.03]">
              View project <ArrowUpRight className="size-4" />
            </a>
            <a href={p.repo} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-medium text-white transition hover:border-accent/60 hover:bg-white/5">
              <GithubIcon className="size-4" /> Code
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="02 · Projects" title="Featured work"
      intro="Open the project page for the problem, the workflow, what was built, the figures, and the paper or report.">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} total={projects.length} />)}
      </div>
    </Section>
  );
}
