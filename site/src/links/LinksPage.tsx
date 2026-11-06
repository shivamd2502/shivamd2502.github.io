import { motion } from "motion/react";
import { ArrowUpRight, Globe } from "lucide-react";
import type { ComponentType } from "react";
import { profile, projects } from "../data";
import { GithubIcon, KaggleIcon, LinkedinIcon, MediumIcon, ScholarIcon, XIcon } from "../components/BrandIcons";

// this page lives at /links/, so site assets and the portfolio are one level up
const up = (path: string) => `../${path}`;

type Link = { title: string; sub: string; href: string; Icon: ComponentType<{ className?: string }>; primary?: boolean };

const links: Link[] = [
  { title: "Portfolio website", sub: "Projects, experience, publications, all in one place", href: up(""), Icon: Globe, primary: true },
  { title: "Google Scholar", sub: "IEEE publications", href: profile.links.scholar, Icon: ScholarIcon },
  { title: "GitHub", sub: "Code & open-source research projects", href: profile.links.github, Icon: GithubIcon },
  { title: "X", sub: "@shivam_d2502 · updates", href: profile.links.x, Icon: XIcon },
  { title: "LinkedIn", sub: "Professional profile & contact", href: profile.links.linkedin, Icon: LinkedinIcon },
  { title: "Kaggle", sub: "Competitions & open datasets", href: "https://www.kaggle.com/shivamdapkekar", Icon: KaggleIcon },
  { title: "Medium", sub: "Articles", href: "https://medium.com/@shivamdapkekar25", Icon: MediumIcon },
];

export default function LinksPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="orb pointer-events-none absolute -top-40 -left-32 size-[30rem] rounded-full bg-cyan-500/20" />
      <div className="orb pointer-events-none absolute top-1/3 -right-40 size-[32rem] rounded-full bg-violet-500/20" style={{ animationDelay: "-6s" }} />

      <main className="relative mx-auto max-w-xl px-5 py-12 sm:py-16">
        {/* header: looping intro animation + name */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-cyan-500/25 via-transparent to-violet-500/25 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-3xl p-1.5">
            <video src={up("intro/intro.mp4")} autoPlay muted loop playsInline preload="auto"
              aria-label="Animated AI lab" className="aspect-[2/1] w-full rounded-[1.25rem] bg-black object-cover" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="mt-7 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="gradient-text">{profile.name}</span>
          </h1>
        </motion.div>

        {/* links */}
        <ul className="mt-8 space-y-3">
          {links.map((l, i) => (
            <motion.li key={l.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.45 }}>
              <a href={l.href} target={l.primary ? undefined : "_blank"} rel="noreferrer"
                className={`group flex items-center gap-4 rounded-2xl p-4 transition duration-300 hover:-translate-y-0.5 ${
                  l.primary
                    ? "bg-gradient-to-r from-cyan-400 to-violet-400 text-ink shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                    : "glass text-white hover:border-accent/50 hover:bg-white/[0.06]"
                }`}>
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${l.primary ? "bg-ink/15" : "bg-gradient-to-br from-cyan-500/20 to-violet-500/20"}`}>
                  <l.Icon className={`size-5 ${l.primary ? "text-ink" : "text-accent"}`} />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{l.title}</span>
                  <span className={`block text-sm ${l.primary ? "text-ink/75" : "text-slate-400"}`}>{l.sub}</span>
                </span>
                <ArrowUpRight className={`size-5 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${l.primary ? "text-ink" : "text-slate-500 group-hover:text-accent"}`} />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* featured work */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.6 }} className="mt-12">
          <div className="flex items-end justify-between">
            <h2 className="font-mono text-xs tracking-widest text-accent uppercase">Featured work</h2>
            <a href={up("#projects")} className="text-xs text-slate-400 hover:text-white">See all →</a>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {projects.map((p) => (
              <a key={p.slug} href={up(`#/projects/${p.slug}`)} className="group glass overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:border-accent/50">
                <div className="aspect-[33/14] overflow-hidden bg-panel">
                  <img src={up(`posters/${p.slug}.webp`)} alt={`${p.title}: illustration`} loading="lazy"
                    className="size-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="text-[13px] leading-snug font-semibold text-white">{p.title}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-wide text-slate-500 uppercase">{p.category.split(" · ")[0]}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        <footer className="mt-12 text-center text-xs text-slate-500">
          <a href={profile.links.email} className="hover:text-white">{profile.links.emailText}</a>
          <p className="mt-2">© {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </main>
    </div>
  );
}
