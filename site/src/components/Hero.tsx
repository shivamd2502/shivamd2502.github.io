import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { profile, stats } from "../data";
import { GithubIcon, LinkedinIcon, ScholarIcon, XIcon } from "./BrandIcons";

export const socials = [
  { label: "GitHub", href: profile.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedinIcon },
  { label: "Google Scholar", href: profile.links.scholar, Icon: ScholarIcon },
  { label: "X", href: profile.links.x, Icon: XIcon },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 lg:pb-32">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="orb pointer-events-none absolute -top-32 -left-24 size-[28rem] rounded-full bg-cyan-500/25" />
      <div className="orb pointer-events-none absolute top-40 -right-32 size-[30rem] rounded-full bg-violet-500/25" style={{ animationDelay: "-6s" }} />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
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
            className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Hi, I'm <span className="gradient-text">Shivam Dapkekar</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 flex flex-wrap gap-2.5">
            {profile.keywords.map((k) => (
              <span key={k} className="rounded-full border border-accent/30 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-4 py-1.5 text-sm font-medium text-white">
                {k}
              </span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-8 flex flex-wrap items-center gap-3">
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
        </div>

        {/* intro animation, looping continuously */}
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-cyan-500/25 via-transparent to-violet-500/25 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-3xl p-2">
            <video
              src={`${import.meta.env.BASE_URL}intro/intro.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Animated AI lab: vision-language models, neural networks and robotics"
              className="aspect-[2/1] w-full rounded-2xl bg-black object-cover"
            />
          </div>
        </motion.div>
      </div>

      <div className="relative mt-14 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-px overflow-hidden border-t border-line/70 bg-line/40">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink/80 px-5 py-5 backdrop-blur">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <a href="#experience" aria-label="Scroll down" className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 animate-bounce text-slate-500 lg:block">
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}
