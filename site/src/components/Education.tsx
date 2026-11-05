import { GraduationCap } from "lucide-react";
import { education } from "../data";
import { Reveal, Section } from "./ui";

export default function Education() {
  return (
    <Section id="education" eyebrow="06 · Education" title="Education">
      <Reveal>
        <div className="glass flex flex-col gap-5 rounded-3xl p-7 sm:flex-row sm:items-center sm:p-9">
          <div className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-violet-500/25">
            <GraduationCap className="size-7 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xl font-semibold text-white">{education.school}</p>
            <p className="mt-1 text-slate-400">{education.degree}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="font-mono text-sm text-slate-400">{education.years}</p>
            <p className="mt-1 font-mono text-lg font-semibold text-accent2">{education.score}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
