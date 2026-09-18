import Image from "next/image";
import { AppleLogo, ArrowRight, CursorClick, GithubLogo, HardDrives, Plugs, Star, WindowsLogo } from "@phosphor-icons/react/dist/ssr";
import { CopyButton } from "@/components/CopyButton";
import { Reveal } from "@/components/Reveal";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FAQ } from "@/lib/faq";
import { REPO_URL, githubStars } from "@/lib/site";

const INSTALL = `git clone ${REPO_URL}
cd agentbar
.\\install.ps1 -StartWithWindows`;

// The four states, drawn with the same colours the app uses.
const STATES = [
  { name: "Working", note: "Busy. No need to look.", bg: "#4A3514", border: "#FF7A1A" },
  { name: "Done", note: "Finished and waiting on you.", bg: "#38845C", border: "#3B82FF" },
  { name: "Needs an answer", note: "A question or permission prompt.", bg: "#1C4270", border: "#B455FF" },
  { name: "Idle", note: "Shrinks to a thin bar.", bg: "#262626", border: "#F06BB8", idle: true },
];

export default async function Home() {
  const stars = await githubStars();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <Image src="/goat-head.png" alt="" width={30} height={30} priority />
            AgentBar
          </a>
          <div className="flex items-center gap-1 text-sm sm:gap-2">
            <a href="#how" className="hidden rounded-lg px-3 py-2 text-muted transition hover:text-text sm:block">How it works</a>
            <a href="#install" className="hidden rounded-lg px-3 py-2 text-muted transition hover:text-text sm:block">Install</a>
            <a href="#faq" className="hidden rounded-lg px-3 py-2 text-muted transition hover:text-text md:block">FAQ</a>
            <a
              href={REPO_URL}
              className="ml-1 inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 font-medium transition hover:border-muted active:scale-[0.98]"
            >
              <GithubLogo size={18} weight="fill" />
              <span className="hidden sm:inline">GitHub</span>
              {stars !== null && (
                <span className="inline-flex items-center gap-1 text-muted">
                  <Star size={14} weight="fill" />
                  {stars}
                </span>
              )}
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        {/* No fade-in here: the hero is the LCP element and must paint on first render. */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
              Every agent chat, one glance at your taskbar.
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted">
              AgentBar shows each running Claude Code and Codex chat as a square in your Windows taskbar. Click one to jump to it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#install"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-medium text-accent-ink transition hover:brightness-110 active:scale-[0.98]"
              >
                <WindowsLogo size={20} weight="fill" />
                Install for Windows
              </a>
              <a
                href={REPO_URL}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 font-medium transition hover:border-muted active:scale-[0.98]"
              >
                <GithubLogo size={20} weight="fill" />
                View source
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-line bg-[#18181a] p-3 shadow-[0_24px_60px_-24px_rgb(22_24_26/0.45)]">
              <Image
                src="/hover-card.png"
                alt="AgentBar in the Windows taskbar: chat squares left of the system tray, with a hover card showing a chat's name, folder, status and current step"
                width={1140}
                height={410}
                priority
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* States */}
        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <Reveal>
              <h2 className="max-w-[24ch] text-3xl font-semibold tracking-tight md:text-4xl">The background tells you what each agent is doing.</h2>
              <p className="mt-3 max-w-[60ch] text-muted">The border is the chat&apos;s own colour, so you can tell them apart. Hover any square for details.</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {STATES.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.06}>
                  <div className="flex h-16 items-end">
                    <div
                      aria-hidden
                      className="rounded-[9px]"
                      style={{
                        width: s.idle ? 44 : 56,
                        height: s.idle ? 10 : 56,
                        background: s.idle ? s.border : s.bg,
                        opacity: s.idle ? 0.6 : 1,
                        border: s.idle ? "none" : `3px solid ${s.border}`,
                      }}
                    />
                  </div>
                  <h3 className="mt-4 font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted">{s.note}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works: bento */}
        <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
          <Reveal>
            <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight md:text-4xl">Built for running several agents at once.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            <Reveal className="md:col-span-3">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Lives in the taskbar, not another window</h3>
                  <p className="mt-2 max-w-[48ch] text-muted">The squares sit next to the system tray, always visible, even when your editor is hidden.</p>
                </div>
                <div className="mt-auto bg-[#1c1c1c] px-4 pb-4 pt-6">
                  <Image
                    src="/taskbar.png"
                    alt="The Windows 11 taskbar with AgentBar squares next to the system tray"
                    width={804}
                    height={157}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-2">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-accent-soft p-6">
                <HardDrives size={28} className="text-accent" />
                <h3 className="mt-4 text-lg font-semibold">Local files only. No keys, no network.</h3>
                <p className="mt-2 text-muted">AgentBar reads the session files Claude Code and Codex already keep on your machine, and never changes them.</p>
                <code className="mt-5 block rounded-lg bg-surface px-3 py-2 font-mono text-sm leading-relaxed">
                  ~/.claude/sessions
                  <br />
                  ~/.codex/sessions
                </code>
              </div>
            </Reveal>
            <Reveal delay={0.04} className="md:col-span-2">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <CursorClick size={28} className="text-accent" />
                <h3 className="mt-4 text-lg font-semibold">Click a square, land in that chat&apos;s window</h3>
                <p className="mt-2 text-muted">Works with Zed, Windows Terminal, VS Code, Cursor and more. Drag squares to reorder them.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-3">
              <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center">
                <div>
                  <Plugs size={28} className="text-accent" />
                  <h3 className="mt-4 text-lg font-semibold">Claude Code and Codex, found automatically</h3>
                  <p className="mt-2 max-w-[44ch] text-muted">No setup. An optional hook adds the step each agent is on and a blue &quot;needs an answer&quot; state.</p>
                </div>
                <Image src="/goat.png" alt="The AgentBar goat mascot peeking over a taskbar" width={140} height={140} className="shrink-0 self-center" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Install */}
        <section id="install" className="scroll-mt-20 bg-[#101113] text-zinc-100">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Install in a minute.</h2>
              <p className="mt-3 max-w-[48ch] text-zinc-400">
                Needs Windows 10 or 11 and the .NET 8 SDK (<code className="font-mono text-zinc-300">winget install Microsoft.DotNet.SDK.8</code>). Run this in PowerShell:
              </p>
              <p className="mt-6 text-sm text-zinc-400">
                It builds a small AgentBar.exe, adds a Start menu shortcut and starts it with Windows. <code className="font-mono text-zinc-300">uninstall.ps1</code> removes it all.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#18191c]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                  <span className="text-xs text-zinc-400">PowerShell</span>
                  <CopyButton text={INSTALL} />
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-200">{INSTALL}</pre>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Mac waitlist */}
        <section id="mac" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
          <div className="grid items-center gap-10 rounded-3xl border border-line bg-surface p-8 md:grid-cols-[auto_1fr] md:p-12">
            <Image src="/goat-head.png" alt="" width={120} height={120} className="hidden md:block" />
            <Reveal>
              <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl">
                <AppleLogo size={34} weight="fill" className="shrink-0" />
                On a Mac? It&apos;s coming.
              </h2>
              <p className="mb-6 mt-3 max-w-[52ch] text-muted">A menu bar version for macOS is in progress. Leave your email and we&apos;ll tell you the day it ships.</p>
              <WaitlistForm />
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 pb-24 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Questions</h2>
          <div className="mt-8 grid gap-3">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-line bg-surface px-5 py-4 open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {q}
                  <ArrowRight size={16} className="shrink-0 text-muted transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="flex items-center gap-2">
            <Image src="/goat-head.png" alt="" width={22} height={22} />
            AgentBar is free and MIT licensed. Not affiliated with Anthropic or OpenAI.
          </p>
          <div className="flex gap-5">
            <a href={REPO_URL} className="hover:text-text">GitHub</a>
            <a href={`${REPO_URL}/issues`} className="hover:text-text">Report an issue</a>
            <a href="#mac" className="hover:text-text">Mac waitlist</a>
          </div>
        </div>
      </footer>
    </>
  );
}
