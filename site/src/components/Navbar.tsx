import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data";
import { GithubIcon } from "./BrandIcons";

const items = [
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Publications", "#publications"],
  ["Extras", "#extras"],
  ["Skills", "#skills"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-line/70 bg-ink/75 backdrop-blur-xl" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-lg font-semibold text-white">
          <span className="gradient-text">SD</span>
          <span className="text-slate-500">.</span>
        </a>
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {items.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="text-slate-400 transition hover:text-white">{label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden text-slate-400 transition hover:text-white sm:block">
            <GithubIcon />
          </a>
          <button className="text-slate-300 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-line bg-ink/95 px-5 backdrop-blur-xl md:hidden"
          >
            {items.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="block py-3 text-slate-300">{label}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
