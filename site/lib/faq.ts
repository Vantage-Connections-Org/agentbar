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
    q: "Can AgentBar notify me when a chat finishes?",
    a: "Yes. On Windows, AgentBar shows a notification naming the chat when it goes from working to done and is waiting on you. It is on by default; turn it off with the 'Notify when a chat finishes' switch in the right-click menu.",
  },
  {
    q: "Is there a Mac or Linux version?",
    a: "Windows 10 and 11 are fully supported. A macOS menu bar version is available as an early, lightly tested preview in the latest GitHub release; join the waitlist on this page to get an email when the stable version ships. There is no Linux version.",
  },
  {
    q: "How do I install it?",
    a: "Download AgentBar-windows-x64.zip from the latest GitHub release, unzip it anywhere and run AgentBar.exe. Nothing else needs installing. You can also build it from source: clone the repository and run install.ps1, which needs the .NET 8 SDK.",
  },
  {
    q: "Is AgentBar free?",
    a: "Yes. It is MIT licensed and the full source code is on GitHub.",
  },
];
