# Changelog

## Unreleased

- macOS preview: a notification when a chat finishes (same as Windows). Asks for notification permission on first launch.

## v0.1.2 (2026-09-19)

- Windows: a notification when a chat finishes and is waiting on you. On by default; turn it off with the *Notify when a chat finishes* switch in the right-click menu.

## v0.1.1 (2026-09-19)

- Windows: a one-time notification on first launch explains the squares and the tray goat.
- Install with Scoop: `scoop bucket add agentbar https://github.com/Vantage-Connections-Org/agentbar` then `scoop install agentbar`.

## v0.1.0 (2026-09-18)

First public release.

- Windows 10/11 taskbar bar: one square per running Claude Code or Codex chat, found automatically from the files each tool keeps.
- Background shows status (working, done, needs an answer, idle), border shows the chat's colour (Claude Code's `/color`).
- Hover card with name, folder, status, elapsed time and current step; click to bring the chat's window to the front; drag to reorder; idle chats shrink to a thin bar.
- Tray icon to show or hide the bar, with a menu for Start with Windows.
- Self-contained download: no .NET install needed.
- macOS menu bar version as an early preview (builds and launches in CI; not yet tested on real sessions).
