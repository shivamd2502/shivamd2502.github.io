import { useState } from "react";
import { Award, Target } from "lucide-react";
import type { Project } from "../data";

function PosterText({ p }: { p: Project }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div>
        <p className="font-mono text-xs tracking-widest text-accent uppercase">{p.category}</p>
        <h1 className="mt-3 text-3xl leading-tight font-extrabold text-white sm:text-5xl">{p.title}</h1>
        <div className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <Target className="mt-0.5 size-5 shrink-0 text-accent2" />
          <div>
            <p className="text-xs font-semibold tracking-wide text-accent2 uppercase">The problem</p>
            <p className="mt-1 text-[15px] leading-relaxed text-slate-300">{p.problem}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
        <div className="lg:text-right">
          <p className="gradient-text text-4xl font-extrabold">{p.metric.value}</p>
          <p className="text-sm text-slate-400">{p.metric.label}</p>
        </div>
        {p.venue && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-3 py-1 text-xs font-semibold text-ink">
            <Award className="size-3.5" /> {p.venue}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Project poster at the top of each project page.
 * Uses public/posters/<slug>.webp (AI-generated artwork) when it exists, with the title,
 * problem and key outcome underneath. Without it, a designed poster from the project figure is shown.
 */
export default function Poster({ p }: { p: Project }) {
  const custom = p.poster ?? `${import.meta.env.BASE_URL}posters/${p.slug}.webp`;
  const [hasCustom, setHasCustom] = useState(true);

  if (hasCustom) {
    return (
      <div className="overflow-hidden rounded-3xl border border-line bg-panel">
        <div className="relative">
          <img src={custom} alt={`${p.title}: illustration`} className="aspect-[33/14] w-full object-cover" onError={() => setHasCustom(false)} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-panel to-transparent" />
        </div>
        <div className="relative px-6 pt-2 pb-8 sm:px-10">
          <PosterText p={p} />
        </div>
      </div>
    );
  }

  const contain = p.fit === "contain";
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-panel">
      <img src={p.image} alt="" aria-hidden="true" className="absolute inset-0 size-full scale-110 object-cover opacity-30 blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative grid min-h-[22rem] items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
        <PosterText p={p} />
        <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl ${contain ? "bg-white p-3" : "bg-black/40"}`}>
          <img src={p.image} alt={p.imageAlt} className="max-h-80 w-full object-contain" />
        </div>
      </div>
    </div>
  );
}
