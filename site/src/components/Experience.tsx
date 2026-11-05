import { ArrowUpRight, Briefcase } from "lucide-react";
import { experience } from "../data";
import { Reveal, Section, Tag } from "./ui";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="01 · Experience" title="Where I've been building">
      <ol className="relative space-y-10 border-l border-line pl-8 sm:pl-10">
        {experience.map((job, i) => (
          <li key={job.org} className="relative">
            <span className="absolute top-1.5 -left-[41px] flex size-5 items-center justify-center rounded-full border border-accent/60 bg-ink sm:-left-[49px]">
              <span className="size-2 rounded-full bg-accent" />
            </span>
            <Reveal delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                    <p className="mt-1 inline-flex items-center gap-2 text-accent">
                      <Briefcase className="size-4" /> {job.org}
                      {job.place && <span className="text-slate-500">· {job.place}</span>}
                    </p>
                  </div>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-slate-400">{job.period}</span>
                </div>
                <p className="mt-4 text-slate-300">{job.summary}</p>
                <ul className="mt-4 space-y-2.5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-slate-400">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent2" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {job.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                  {job.link && (
                    <a href={job.link.href} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                      {job.link.label} <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
