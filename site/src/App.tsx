import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Extras from "./components/Extras";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import ProjectPage from "./components/ProjectPage";
import Projects from "./components/Projects";
import Publications from "./components/Publications";
import Skills from "./components/Skills";
import { profile, projects } from "./data";

// Tiny hash router: "#/projects/<slug>" opens a project page; any other hash is a section anchor.
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const match = hash.match(/^#\/projects\/([\w-]+)/);
  const project = match ? projects.find((p) => p.slug === match[1]) : undefined;

  useEffect(() => {
    if (project) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    } else if (hash.length > 1) {
      // returning from a project page: wait for the home page to render, then jump to the section
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    }
  }, [hash, project]);

  return (
    <>
      <Intro />
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-cyan-400 to-violet-400" style={{ scaleX: progress }} />
      <Navbar />
      {project ? (
        <ProjectPage key={project.slug} p={project} />
      ) : (
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Publications />
          <Extras />
          <Skills />
          <Education />
          <Contact />
        </main>
      )}
      <footer className="border-t border-line/70 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
