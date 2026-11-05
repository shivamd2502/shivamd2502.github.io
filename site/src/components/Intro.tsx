import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data";

const KEY = "sd-intro-seen";
const MAX_MS = 8000; // safety cap if the video cannot play

/** Full-screen intro video shown on the first view of a browser session. Plays once; click / key / "Skip" closes it. */
export default function Intro() {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem(KEY); } catch { return true; }
  });
  const [progress, setProgress] = useState(0);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!show) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const close = () => setShow(false);
    const t = setTimeout(close, reduce ? 1200 : MAX_MS);
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
      try { sessionStorage.setItem(KEY, "1"); } catch { /* private mode */ }
    };
  }, [show]);

  const onTime = () => {
    const v = video.current;
    if (v && v.duration) setProgress(Math.min(1, v.currentTime / v.duration));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-ink px-6"
          onClick={() => setShow(false)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="orb pointer-events-none absolute top-1/4 left-1/4 size-96 rounded-full bg-cyan-500/20" />
          <div className="orb pointer-events-none absolute right-1/4 bottom-1/4 size-96 rounded-full bg-violet-500/20" style={{ animationDelay: "-4s" }} />

          <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
            className="relative w-full max-w-3xl">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-cyan-500/30 via-transparent to-violet-500/30 blur-2xl" />
            <video
              ref={video}
              src={`${import.meta.env.BASE_URL}intro/intro.mp4`}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={onTime}
              onEnded={() => setShow(false)}
              onError={() => setShow(false)}
              className="relative aspect-[2/1] w-full rounded-3xl border border-white/10 bg-black object-cover shadow-2xl"
            />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="gradient-text">{profile.name}</span>
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-2 text-center font-mono text-sm text-slate-400">
            {profile.keywords.join("  ·  ")}
          </motion.p>

          <div className="mt-8 h-0.5 w-56 overflow-hidden rounded-full bg-line">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
          </div>
          <button onClick={(e) => { e.stopPropagation(); setShow(false); }}
            className="mt-5 rounded-full border border-line px-4 py-1.5 text-xs text-slate-400 transition hover:border-accent/60 hover:text-white">
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
