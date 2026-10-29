"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Mail, MousePointer2 } from "lucide-react";
import { useCallback, useState } from "react";
import BookModal, { type PageKey } from "@/components/BookModal";

const DeskScene = dynamic(() => import("@/components/DeskScene"), { ssr: false });

const itemLabels: { key: PageKey; label: string; hint: string }[] = [
  { key: "notebook", label: "Field notes", hint: "Projects & background" },
  { key: "laptop", label: "Build station", hint: "Code & systems" },
  { key: "camera", label: "Visual practice", hint: "Photography" },
  { key: "phone", label: "Connected systems", hint: "Ark products" },
  { key: "cup", label: "Pause / reflect", hint: "How I work" },
  { key: "pen", label: "Sketch to system", hint: "Process & experiments" }
];

export default function Home() {
  const [activeItem, setActiveItem] = useState<PageKey | null>(null);
  const openItem = useCallback((key: PageKey) => setActiveItem(key), []);
  const closeBook = useCallback(() => setActiveItem(null), []);

  return <main className="noise relative min-h-screen overflow-hidden bg-[#08090b]">
    <div className="pointer-events-none absolute inset-0 desk-grid opacity-70" />
    <header className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-6 sm:px-10 lg:px-16">
      <a href="#" className="group flex items-center gap-3" aria-label="Solomough home">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm font-semibold tracking-tight transition group-hover:border-[#b5ff65] group-hover:text-[#b5ff65]">S.</span>
        <span><span className="block text-sm font-semibold tracking-wide">SOLOMOUGH</span><span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[.22em] text-white/35">Digital systems / visual stories</span></span>
      </a>
      <a href="mailto:thearknetwork@gmail.com?subject=Let's%20work%20together" className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs transition hover:border-[#b5ff65]/70 hover:bg-[#b5ff65] hover:text-black sm:px-5 sm:text-sm">
        Get in touch <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
      </a>
    </header>

    <section className="relative z-10 mx-auto grid min-h-[calc(100svh-90px)] w-full max-w-[1600px] grid-cols-1 items-center gap-2 px-5 pb-10 sm:px-10 lg:grid-cols-[.72fr_1.28fr] lg:px-16 lg:pb-16">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.2, .7, .2, 1] }} className="relative z-10 max-w-xl pt-8 lg:pt-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-[#b5ff65]" />
          <span className="font-mono text-[10px] uppercase tracking-[.24em] text-[#b5ff65]">Interactive portfolio / 2026</span>
        </div>
        <h1 className="text-[clamp(3.2rem,7.2vw,7.4rem)] font-medium leading-[.86] tracking-[-.085em]">A mind for<br/><span className="text-white/40">systems.</span><br/>An eye for<br/><span className="italic text-[#b5ff65]">stories.</span></h1>
        <p className="mt-7 max-w-md text-sm leading-7 text-white/55 sm:text-base">I’m Solomon Moughkaa Zahemen — software engineering student, digital systems builder, photographer and community creator.</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button onClick={() => openItem("notebook")} className="inline-flex items-center gap-2 rounded-full bg-[#b5ff65] px-5 py-3 text-sm font-medium text-[#10120e] transition hover:bg-white">Open my field notes <ArrowUpRight size={16}/></button>
          <a href="#desk" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/65 transition hover:border-white/30 hover:text-white">Explore the desk <ArrowDownRight size={16}/></a>
        </div>
        <div className="mt-10 flex items-center gap-3 text-xs text-white/35"><MousePointer2 size={15} className="text-[#b5ff65]"/> Click an object to explore · Hover to see it move</div>
      </motion.div>

      <motion.div id="desk" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: .15 }} className="relative -mx-5 h-[390px] sm:-mx-8 sm:h-[520px] lg:mx-0 lg:h-[min(76vh,780px)]">
        <div className="pointer-events-none absolute left-[15%] top-[18%] h-52 w-52 rounded-full bg-[#b5ff65]/[.055] blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[10%] right-[12%] h-52 w-52 rounded-full bg-blue-500/[.07] blur-[90px]" />
        <DeskScene onOpen={openItem}/>
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-[9px] uppercase tracking-[.2em] text-white/40 backdrop-blur-md">A little world of what I do</div>
      </motion.div>
    </section>

    <section className="relative z-10 mx-auto max-w-[1600px] px-5 pb-10 sm:px-10 lg:px-16">
      <div className="flex flex-col justify-between gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/35">Explore by object</p>
        <div className="flex flex-wrap gap-2">{itemLabels.map((item, index) => <button key={item.key} onClick={() => openItem(item.key)} className="group flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-left transition hover:border-[#b5ff65]/60 hover:bg-white/[.035]"><span className="font-mono text-[9px] text-[#b5ff65]/70">0{index + 1}</span><span className="text-xs text-white/75">{item.label}</span><span className="hidden text-[10px] text-white/30 group-hover:inline sm:inline">{item.hint}</span></button>)}</div>
      </div>
      <div className="grid gap-6 border-t border-white/10 py-8 md:grid-cols-[1fr_auto] md:items-end">
        <div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/35">The point of the work</p><p className="mt-3 max-w-2xl text-xl leading-relaxed tracking-tight text-white/75 sm:text-2xl">“Proof over talking.” I’m interested in turning fragmented capability into useful, connected systems — with craft, clarity and people at the center.</p></div>
        <div className="flex gap-3">
          <a aria-label="GitHub" href="https://github.com/Solomough" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/55 transition hover:border-[#b5ff65]/50 hover:text-[#b5ff65]"><Github size={17}/></a>
          <a aria-label="Portfolio" href="https://solomough-system.vercel.app" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/55 transition hover:border-[#b5ff65]/50 hover:text-[#b5ff65]"><ArrowUpRight size={17}/></a>
          <a aria-label="Email" href="mailto:thearknetwork@gmail.com" className="rounded-full border border-white/10 p-3 text-white/55 transition hover:border-[#b5ff65]/50 hover:text-[#b5ff65]"><Mail size={17}/></a>
        </div>
      </div>
      <footer className="flex flex-col justify-between gap-2 border-t border-white/10 py-5 font-mono text-[9px] uppercase tracking-[.18em] text-white/25 sm:flex-row"><span>© 2026 Solomough / Solomon Moughkaa Zahemen</span><span>Designed to be explored, not just scrolled.</span></footer>
    </section>
    <BookModal item={activeItem} onClose={closeBook}/>
  </main>;
}
