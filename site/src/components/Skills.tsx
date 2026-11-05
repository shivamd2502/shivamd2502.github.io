import { interests, skills } from "../data";
import { Reveal, Section } from "./ui";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="05 · Skills" title="Interests & toolkit">
      <Reveal>
        <p className="font-mono text-xs tracking-widest text-slate-500 uppercase">Research interests</p>
        <div className="mt-4 mb-12 flex flex-wrap gap-3">
          {interests.map((it) => (
            <span key={it} className="rounded-full border border-accent/30 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-4 py-2 text-sm font-medium text-white">
              {it}
            </span>
          ))}
        </div>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 2) * 0.07}>
            <div className="glass h-full rounded-2xl p-6">
              <p className="font-mono text-xs tracking-widest text-accent uppercase">{g.group}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-sm text-slate-200 transition hover:border-accent/50 hover:text-white">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
