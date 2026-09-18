// Plain, quotable answers. Used by the FAQ section and its FAQPage structured data,
// so search engines and AI assistants get the same facts people see.
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is AgentBar?",
    a: "AgentBar is a free, open-source Windows app that shows every Claude Code and Codex chat you have running as a small square in your taskbar. Each square's background shows its status: working, done and waiting on you, needs an answer, or idle.",
  },
  {
    q: "Does AgentBar need an API key or send my data anywhere?",
    a: "No. AgentBar only reads files that Claude Code and Codex already keep on your own computer, such as ~/.claude/sessions and ~/.codex. It makes no network requests and never changes those files.",
  },
  {
    q: "Which tools does it support?",
    a: "Claude Code and OpenAI Codex CLI. It finds their running chats on its own, with no configuration. An optional hook adds the current step and a blue 'needs an answer' state.",
  },
  {
    q: "What happens when I click a square?",
    a: "AgentBar brings that chat's window to the front: Zed, Windows Terminal, VS Code, Cursor and similar apps. If several chats share one editor window, it opens that window and you pick the tab.",
  },
  {
    q: "Is there a Mac or Linux version?",
    a: "Not yet. AgentBar is Windows 10 and 11 only today. A macOS menu bar version is in progress; join the waitlist on this page to get an email when it ships.",
  },
  {
    q: "How do I install it?",
    a: "Clone the GitHub repository and run install.ps1. It builds a single small AgentBar.exe with the .NET 8 SDK, adds a Start menu shortcut, and can start it with Windows. uninstall.ps1 removes everything.",
  },
  {
    q: "Is AgentBar free?",
    a: "Yes. It is MIT licensed and the full source code is on GitHub.",
  },
];
