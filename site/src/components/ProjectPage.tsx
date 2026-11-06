import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CircleCheck, FileText, Presentation, ScrollText, X } from "lucide-react";
import { projects, type Doc, type Project } from "../data";
import { GithubIcon } from "./BrandIcons";
import Poster from "./Poster";
import { Reveal, Tag } from "./ui";

const docIcon = (k: Doc["kind"]) => (k === "paper" ? ScrollText : k === "slides" ? Presentation : k === "report" ? FileText : BookOpen);

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button aria-label="Close" className="absolute top-5 right-5 rounded-full bg-panel p-2 text-slate-300 hover:text-white"><X className="size-5" /></button>
      <motion.figure initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="max-h-[80vh] rounded-xl bg-white object-contain" />
        <figcaption className="mt-3 text-center text-sm text-slate-400">{alt}</figcaption>
      </motion.figure>
    </motion.div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="mt-6">{children}</div>
      </section>
    </Reveal>
  );
}

export default function ProjectPage({ p }: { p: Project }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const images = p.gallery ?? [];

  useEffect(() => {
    document.title = `${p.title} · Shivam Dapkekar`;
    return () => { document.title = "Shivam Dapkekar | Applied AI & Computer Vision"; };
  }, [p.title]);

  return (
    <main className="mx-auto max-w-6xl px-5 pt-24 pb-20 sm:px-8">
      <a href="#projects" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
        <ArrowLeft className="size-4" /> All projects
      </a>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Poster p={p} />
      </motion.div>

      {/* quick links */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href={p.repo} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-3 font-semibold text-ink transition hover:scale-[1.03]">
          <GithubIcon className="size-5" /> GitHub repository <ArrowUpRight className="size-4" />
        </a>
        {p.docs.filter((d) => d.kind !== "docs").map((d) => {
          const Icon = docIcon(d.kind);
          return (
            <a key={d.href} href={d.href} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-medium text-white transition hover:border-accent/60 hover:bg-white/5">
              <Icon className="size-4" /> {d.label}
            </a>
          );
        })}
        <div className="ml-auto flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      </div>

      <Block title="Overview">
        <p className="max-w-3xl text-lg leading-relaxed text-slate-400">{p.summary}</p>
      </Block>

      <Block title="Key result">
        <button onClick={() => setZoom({ src: p.image, alt: p.imageAlt })} className="glass group block w-full overflow-hidden rounded-3xl text-left">
          <div className={`flex items-center justify-center overflow-hidden ${p.fit === "contain" ? "bg-white p-4" : "bg-black/40"}`}>
            <img src={p.image} alt={p.imageAlt} className="max-h-[32rem] w-full object-contain transition duration-500 group-hover:scale-[1.02]" />
          </div>
          <p className="p-4 text-sm text-slate-400">{p.imageAlt} · click to enlarge</p>
        </button>
      </Block>

      <Block title="Workflow">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {p.workflow.map((w, i) => (
            <li key={w.step} className="glass relative rounded-2xl p-5">
              <span className="font-mono text-xs text-accent">STEP {String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-semibold text-white">{w.step}</p>
              <p className="mt-1 text-sm text-slate-400">{w.detail}</p>
              {i < p.workflow.length - 1 && (i + 1) % 3 !== 0 && (
                <ArrowRight className="absolute top-1/2 -right-2.5 hidden size-5 -translate-y-1/2 rounded-full bg-ink text-accent lg:block" />
              )}
            </li>
          ))}
        </ol>
      </Block>

      <Block title="What we did">
        <ul className="grid gap-3 md:grid-cols-2">
          {p.whatWeDid.map((w) => (
            <li key={w} className="glass flex gap-3 rounded-2xl p-5 text-[15px] leading-relaxed text-slate-300">
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent" /> {w}
            </li>
          ))}
        </ul>
      </Block>

      {images.length > 0 && <Block title="More figures">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((im) => (
            <button key={im.src} onClick={() => setZoom(im)} className="glass group overflow-hidden rounded-2xl text-left">
              <div className="flex h-52 items-center justify-center overflow-hidden bg-white">
                <img src={im.src} alt={im.alt} loading="lazy" className="max-h-full w-full object-contain transition duration-500 group-hover:scale-105" />
              </div>
              <p className="p-3 text-sm text-slate-400">{im.alt}</p>
            </button>
          ))}
        </div>
      </Block>}

      <Block title="Research paper & documents">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-wide text-accent2 uppercase">Research paper</p>
            <p className="mt-2 text-white">{p.paperStatus ?? "Project write-up below"}</p>
            {p.docs.filter((d) => d.kind === "paper").map((d) => (
              <a key={d.href} href={d.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                Read the paper (PDF) <ArrowUpRight className="size-4" />
              </a>
            ))}
            {!p.docs.some((d) => d.kind === "paper") && p.paperStatus && (
              <p className="mt-2 text-sm text-slate-500">The paper link will be added here once it is available on IEEE Xplore.</p>
            )}
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-wide text-accent2 uppercase">Project documents</p>
            <ul className="mt-3 space-y-2">
              {p.docs.map((d) => {
                const Icon = docIcon(d.kind);
                return (
                  <li key={d.href}>
                    <a href={d.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                      <Icon className="size-4 text-accent" /> {d.label} <ArrowUpRight className="size-3.5 text-slate-500" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Block>

      <a href={`#/projects/${next.slug}`} className="glass group mt-16 flex items-center justify-between rounded-2xl p-6 transition hover:border-accent/40">
        <div>
          <p className="text-xs tracking-wide text-slate-500 uppercase">Next project</p>
          <p className="mt-1 text-lg font-semibold text-white">{next.title}</p>
        </div>
        <ArrowRight className="size-6 text-accent transition group-hover:translate-x-1" />
      </a>

      <AnimatePresence>{zoom && <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}</AnimatePresence>
    </main>
  );
}
