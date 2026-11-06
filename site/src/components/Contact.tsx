import { Mail, Send } from "lucide-react";
import { profile } from "../data";
import { socials } from "./Hero";
import { Reveal, Section } from "./ui";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="07 · Contact">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="orb pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-violet-500/25" />
          <div className="orb pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-cyan-500/20" style={{ animationDelay: "-4s" }} />
          <div className="relative">
            <h3 className="max-w-2xl text-2xl font-bold text-white sm:text-3xl">
              Research as a service: <span className="gradient-text">math, algorithms, AI.</span>
            </h3>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={profile.links.email} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-3 font-semibold text-ink transition hover:scale-[1.03]">
                <Send className="size-4" /> Email me
              </a>
              <span className="inline-flex items-center gap-2 font-mono text-sm text-slate-400">
                <Mail className="size-4" /> {profile.links.emailText}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm text-slate-200 transition hover:border-accent/60 hover:bg-white/5">
                  <Icon className="size-4" /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
