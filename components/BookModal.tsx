"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

export type PageKey = "notebook" | "laptop" | "camera" | "phone" | "cup" | "pen";

const pages = [
  {
    eyebrow: "00 / INTRODUCTION", title: "Ideas should become things.",
    body: "I’m Solomon Moughkaa Zahemen — known as Solomough. A Software Engineering student, digital systems builder, photographer and community creator interested in how technology can shape human behavior, culture and opportunity.",
    tags: ["Software Engineering", "Digital Systems", "Visual Storytelling"],
    note: "Current chapter: learning by building."
  },
  {
    eyebrow: "01 / FEATURED PROJECT", title: "The Ark Network",
    body: "An early-stage initiative working toward a connected digital ecosystem. The first challenge is fragmentation: helping people, capability and useful digital products meet in an enabling environment.",
    tags: ["Next.js", "React", "TypeScript", "Three.js", "Product Strategy"],
    note: "Live exploration: thearknetwork.vercel.app",
    link: "https://thearknetwork.vercel.app"
  },
  {
    eyebrow: "02 / PRODUCT BUILD", title: "Ark Profile + Ark Portal",
    body: "A connected identity and community product in progress. Ark Profile is being developed as a consistent entry point, while Ark Portal brings member discovery, spaces, work, alerts and messaging into one experience.",
    tags: ["Full-stack foundations", "Auth flows", "Neon", "PostgreSQL", "UX systems"],
    note: "Focus: reliable foundations before scale.",
    link: "https://ark-profile1.vercel.app"
  },
  {
    eyebrow: "03 / EXPERIMENT", title: "Interactive 3D web",
    body: "Exploring Three.js as a way to make digital experiences feel spatial and tactile — not as decoration, but as a useful interaction model. This portfolio is a first proof of concept.",
    tags: ["Three.js", "React Three Fiber", "Drei", "Framer Motion", "Motion design"],
    note: "This desk is a live interface, not a background image."
  },
  {
    eyebrow: "04 / VISUAL PRACTICE", title: "Solomough Visuals",
    body: "Photography and visual storytelling sit alongside engineering. The camera on this desk represents a practice of noticing, framing and communicating with intention.",
    tags: ["Photography", "Creative direction", "Visual identity", "Storytelling"],
    note: "A second lens on the same world."
  },
  {
    eyebrow: "05 / HOW I WORK", title: "Build. Test. Improve.",
    body: "I care about proof over talking: working prototypes, understandable architecture, thoughtful interface details and honest claims. I’m interested in collaboration with people solving real problems.",
    tags: ["Product thinking", "Documentation", "Community building", "Iteration"],
    note: "Based in Nigeria · Open to thoughtful collaborations."
  }
];

const itemContent: Record<PageKey, { title: string; description: string; target: number }> = {
  notebook: { title: "Field notes", description: "Background, projects and the thinking behind the work.", target: 0 },
  laptop: { title: "Build station", description: "Engineering projects and the tools behind them.", target: 1 },
  camera: { title: "Visual practice", description: "Photography, framing and visual storytelling.", target: 4 },
  phone: { title: "Connected systems", description: "Community products, profiles and digital spaces.", target: 2 },
  cup: { title: "A small pause", description: "A reminder that good work needs room to think.", target: 5 },
  pen: { title: "Sketch to system", description: "The process: ideas, experiments and iteration.", target: 3 }
};

export default function BookModal({ item, onClose }: { item: PageKey | null; onClose: () => void }) {
  const [page, setPage] = useState(0);
  useEffect(() => { if (item) setPage(itemContent[item].target); }, [item]);
  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPage(p => Math.min(pages.length - 1, p + 1));
      if (e.key === "ArrowLeft") setPage(p => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [item, onClose]);

  return <AnimatePresence>
    {item && <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.section role="dialog" aria-modal="true" aria-label="Portfolio field notes"
        className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#111312] shadow-2xl md:grid-cols-[.8fr_1.2fr]"
        initial={{ y: 28, scale: .97, rotateX: 3 }} animate={{ y: 0, scale: 1, rotateX: 0 }} exit={{ y: 20, scale: .98 }}
        transition={{ type: "spring", stiffness: 240, damping: 25 }}>
        <div className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden border-r border-white/10 bg-[#dcd6c9] p-8 text-[#171a17] md:flex">
          <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full border border-black/10" />
          <div className="absolute -right-12 -top-8 h-56 w-56 rounded-full border border-black/10" />
          <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[.24em]"><span>Solomough / archive</span><span>2026</span></div>
          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[.2em]">A living portfolio</p>
            <h2 className="max-w-sm text-5xl font-semibold leading-[.95] tracking-[-.07em]">Notes from the workbench.</h2>
            <p className="mt-6 max-w-xs text-sm leading-6 text-black/60">Software, systems, community and the visual world around them.</p>
          </div>
          <div className="relative flex items-end justify-between font-mono text-[10px] uppercase tracking-widest"><span>Field notes<br/>Vol. 01</span><span className="text-3xl">↗</span></div>
        </div>
        <div className="book-scroll flex min-h-[480px] flex-col overflow-y-auto p-6 sm:p-10 md:min-h-[560px]">
          <div className="mb-12 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#b5ff65]">{pages[page].eyebrow}</span>
            <button onClick={onClose} aria-label="Close portfolio book" className="rounded-full border border-white/10 p-2 text-white/60 transition hover:border-white/30 hover:text-white"><X size={18}/></button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, x: 18, rotateY: -4 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .25 }}>
              <h3 className="max-w-lg text-4xl font-semibold leading-[1.02] tracking-[-.06em] sm:text-5xl">{pages[page].title}</h3>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">{pages[page].body}</p>
              <div className="mt-8 flex flex-wrap gap-2">{pages[page].tags.map(tag => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/75">{tag}</span>)}</div>
              <div className="mt-8 border-l border-[#b5ff65]/50 pl-4 text-sm text-white/45">{pages[page].note}</div>
              {pages[page].link && <a href={pages[page].link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-[#b5ff65] hover:underline">Explore project <ArrowUpRight size={15}/></a>}
            </motion.div>
          </AnimatePresence>
          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-8">
            <span className="font-mono text-xs text-white/35">PAGE {String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span>
            <div className="flex gap-2">
              <button aria-label="Previous page" disabled={page === 0} onClick={() => setPage(p => p - 1)} className="rounded-full border border-white/10 p-3 transition hover:border-white/40 disabled:opacity-25"><ArrowLeft size={16}/></button>
              <button aria-label="Next page" disabled={page === pages.length - 1} onClick={() => setPage(p => p + 1)} className="rounded-full bg-[#b5ff65] p-3 text-black transition hover:bg-white disabled:opacity-25"><ArrowRight size={16}/></button>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>}
  </AnimatePresence>;
}
