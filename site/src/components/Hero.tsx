import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, MapPin, Mail } from "lucide-react";
import { profile, projects, stats } from "../data";
import { GithubIcon, LinkedinIcon, ScholarIcon, XIcon } from "./BrandIcons";

function TypingRole() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = profile.roles[i];
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const t = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (empty) {
          setDeleting(false);
          setI((i + 1) % profile.roles.length);
        } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      },
      done ? 1600 : deleting ? 35 : 70,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <span className="font-mono text-accent">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent align-middle" style={{ height: "1.1em" }} />
    </span>
  );
}

export const socials = [
  { label: "GitHub", href: profile.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedinIcon },
  { label: "Google Scholar", href: profile.links.scholar, Icon: ScholarIcon },
  { label: "X", href: profile.links.x, Icon: XIcon },
];

// collage of four project visuals, each linking to its project page
const collage = ["clip-peft-land-cover", "xray-stitching", "eos04-sar-deep-learning", "rl-active-suspension"]
  .map((s) => projects.find((p) => p.slug === s)!)
  .filter(Boolean);
// square-friendly crops for the collage tiles
const heroImage: Record<string, string> = {
  "xray-stitching": `${import.meta.env.BASE_URL}images/xray_matches.webp`,
};

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 lg:pb-36">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="orb pointer-events-none absolute -top-32 -left-24 size-[28rem] rounded-full bg-cyan-500/25" />
      <div className="orb pointer-events-none absolute top-40 -right-32 size-[30rem] rounded-full bg-violet-500/25" style={{ animationDelay: "-6s" }} />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-slate-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to AI research &amp; computer vision roles
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="gradient-text">Shivam</span>
            <br />Dapkekar.
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-5 text-xl sm:text-2xl">
            <TypingRole />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-7 flex flex-wrap gap-2.5">
            {profile.keywords.map((k) => (
              <span key={k} className="rounded-full border border-accent/30 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-4 py-1.5 text-sm font-medium text-white">
                {k}
              </span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-3 font-semibold text-ink shadow-lg shadow-cyan-500/20 transition hover:scale-[1.03]">
              View my work
            </a>
            <a href={profile.links.email} className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold text-white transition hover:border-accent/60 hover:bg-white/5">
              <Mail className="size-4" /> Get in touch
            </a>
            <div className="ml-1 flex items-center gap-1">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}
                  className="rounded-lg p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white">
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="size-4" /> {profile.location}
          </p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden lg:block">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-cyan-500/20 via-transparent to-violet-500/20 blur-2xl" />
          <div className="glass relative grid grid-cols-2 gap-3 rounded-3xl p-3 pb-9">
            {collage.map((p, i) => (
              <a key={p.slug} href={`#/projects/${p.slug}`} title={p.title}
                className={`group relative aspect-square overflow-hidden rounded-2xl ${p.fit === "contain" ? "bg-white" : "bg-panel"} ${i % 2 === 1 ? "translate-y-6" : ""}`}>
                <img src={heroImage[p.slug] ?? p.image} alt={p.imageAlt} className={`size-full transition duration-700 group-hover:scale-105 ${p.fit === "contain" ? "object-contain p-2" : "object-cover"}`} />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 pt-8 font-mono text-[11px] text-slate-200">
                  {p.category.split(" · ")[0]}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative mt-14 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden border-t border-line/70 bg-line/40 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink/80 px-5 py-5 backdrop-blur">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <a href="#experience" aria-label="Scroll down" className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 animate-bounce text-slate-500 lg:block">
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}
