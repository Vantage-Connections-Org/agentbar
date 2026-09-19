export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; paragraphs: string[]; code?: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "run-multiple-claude-code-sessions",
    title: "How to Run Multiple Claude Code Sessions on Windows",
    description:
      "Run several Claude Code sessions in parallel on Windows: one worktree each, names with /rename, colours with /color, resuming, and seeing which one is waiting.",
    updated: "2026-09-18",
    sections: [
      // Source: https://code.claude.com/docs/en/worktrees.md
      {
        heading: "Give each session its own worktree",
        paragraphs: [
          "Two sessions editing the same checkout can step on each other's files. Start each one with --worktree (or -w) and a name, and Claude Code creates an isolated git worktree under .claude/worktrees/<name>/ on a new branch called worktree-<name>.",
          "Run the command again with a different name in another terminal to start a second isolated session. If you leave out the name, Claude Code generates one for you.",
          "Add .claude/worktrees/ to your .gitignore so worktree contents do not show up as untracked files in your main checkout. Not in a git repo? Separate folders per task work too.",
        ],
        code: "claude --worktree feature-auth\nclaude --worktree fix-login",
      },
      // Sources: https://code.claude.com/docs/en/sessions.md#name-your-sessions
      //          https://code.claude.com/docs/en/cli-reference.md (--name / -n)
      {
        heading: "Name every session",
        paragraphs: [
          "Names make sessions findable in the /resume picker and resumable by name. Set one at startup with -n, or mid-session with /rename. The name also appears on the prompt bar.",
          "If another live session on this machine already uses the name, Claude Code gives yours a variant with a two-word suffix and tells you. Run /rename again if you want to pick your own.",
        ],
        code: "claude -n auth-refactor\n\n# or, inside a running session:\n/rename auth-refactor",
      },
      // Source: https://code.claude.com/docs/en/commands.md (/color)
      {
        heading: "Colour-code the prompt bar",
        paragraphs: [
          "/color sets the prompt bar colour for the current session. The options are red, blue, green, yellow, purple, orange, pink and cyan. Use default to reset it, or run it with no argument for a random colour.",
          "Keep one colour per task so a glance at any terminal tells you which job it is.",
        ],
        code: "/color purple",
      },
      // Source: https://code.claude.com/docs/en/sessions.md#resume-a-session
      //         https://code.claude.com/docs/en/sessions.md#use-the-session-picker
      {
        heading: "Resume the right session later",
        paragraphs: [
          "claude --continue reopens the most recent conversation in the current directory. claude --resume opens the session picker, and claude --resume <name> resumes a named session directly.",
          "In the picker, Ctrl+W widens the list to all worktrees of the repository and Ctrl+A to every project on this machine. Ctrl+R renames the highlighted session.",
          "Resuming the same session in two terminals without forking interleaves both into one transcript. Add --fork-session to branch it into a new session ID instead.",
        ],
        code: "claude --continue\nclaude --resume\nclaude --resume auth-refactor\nclaude --continue --fork-session",
      },
      // Source: https://code.claude.com/docs/en/sessions.md#where-transcripts-are-stored
      {
        heading: "Know where sessions are stored",
        paragraphs: [
          "Claude Code saves each session as a JSONL transcript at ~/.claude/projects/<project>/<session-id>.jsonl, where <project> is your working directory path with non-alphanumeric characters replaced by -.",
          "Transcripts are kept for 30 days by default. Change that with cleanupPeriodDays in settings.json.",
          "The file format is internal and changes between versions. Use /export when you want a readable copy of a conversation.",
        ],
        code: "~/.claude/projects/<project>/<session-id>.jsonl",
      },
      // Source: AgentBar README (agentbar/README.md)
      {
        heading: "See which session is waiting on you",
        paragraphs: [
          "With several terminals open, the hard part is knowing which one finished. AgentBar is a free, MIT-licensed Windows app that puts one square per running Claude Code or Codex chat in the taskbar: dull orange while working, green when done and waiting on you.",
          "The square's border uses the chat's /color and its hover card shows your /rename name, folder, status and elapsed time. Click a square to bring that chat's window to the front.",
          "It reads the files Claude Code already keeps about its own chats, needs no API keys or network, and finds your chats without any configuration.",
        ],
      },
    ],
  },
  {
    slug: "know-when-claude-code-is-done",
    title: "How to Get Notified When Claude Code Is Done",
    description:
      "Get alerted when Claude Code finishes or needs input: the terminal bell, Notification and Stop hooks, a Windows popup, and a green square in your taskbar.",
    updated: "2026-09-18",
    sections: [
      // Source: https://code.claude.com/docs/en/terminal-config.md#get-a-terminal-bell-or-notification
      {
        heading: "What Claude Code does by default",
        paragraphs: [
          "When Claude finishes a task or pauses for a permission prompt and you appear to be away from the terminal, Claude Code fires a notification event.",
          "By default it only turns that into a desktop notification in Ghostty, Kitty and iTerm2. In Windows Terminal, the VS Code integrated terminal and most others, use one of the options below.",
        ],
      },
      // Source: https://code.claude.com/docs/en/terminal-config.md#get-a-terminal-bell-or-notification
      //         https://code.claude.com/docs/en/terminal-config.md#configure-tmux
      {
        heading: "Turn on the terminal bell",
        paragraphs: [
          "Set preferredNotifChannel to \"terminal_bell\" in ~/.claude/settings.json and Claude Code rings the terminal bell instead.",
          "Running inside tmux? Add set -g allow-passthrough on to ~/.tmux.conf so notifications reach the outer terminal.",
        ],
        code: `{
  "preferredNotifChannel": "terminal_bell"
}`,
      },
      // Source: https://code.claude.com/docs/en/hooks-guide.md#get-notified-when-claude-needs-input
      {
        heading: "Show a Windows popup with a Notification hook",
        paragraphs: [
          "A Notification hook runs a command whenever Claude Code sends a notification. Hooks run alongside the built-in notification rather than replacing it.",
          "This is the Windows example from the official docs. It opens a message box, not a corner toast, so it can appear behind your terminal window. Test the command in PowerShell first.",
        ],
        code: String.raw`{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -Command \"[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); [System.Windows.Forms.MessageBox]::Show('Claude Code needs your attention', 'Claude Code')\""
          }
        ]
      }
    ]
  }
}`,
      },
      // Source: https://code.claude.com/docs/en/hooks-guide.md#get-notified-when-claude-needs-input
      {
        heading: "Choose which events alert you",
        paragraphs: [
          "An empty matcher fires on every notification type. Set it to permission_prompt to fire only when a tool approval has waited about six seconds.",
          "Set it to idle_prompt to fire when Claude finished responding about 60 seconds ago and you have not typed since.",
          "Type /hooks and select Notification to confirm the hook is registered. The /hooks menu is read-only, so make changes in settings.json.",
        ],
      },
      // Source: https://code.claude.com/docs/en/hooks-guide.md (Stop event, limitations)
      //         https://code.claude.com/docs/en/hooks.md (hook config structure)
      {
        heading: "Use a Stop hook for every finished reply",
        paragraphs: [
          "The Stop event fires whenever Claude finishes responding, not only at task completion. It does not fire when you interrupt, and API errors fire StopFailure instead.",
          "Use it when you want an alert the moment a reply ends instead of waiting for idle_prompt.",
        ],
        code: String.raw`{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -Command \"[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); [System.Windows.Forms.MessageBox]::Show('Claude Code finished', 'Claude Code')\""
          }
        ]
      }
    ]
  }
}`,
      },
      // Source: AgentBar README (agentbar/README.md)
      {
        heading: "Or check the taskbar",
        paragraphs: [
          "A bell or popup tells you something finished, but not which chat it was. AgentBar keeps one square per running chat in the Windows taskbar. It turns green when a chat is done and stays green until you click it, which brings that chat's window to the front.",
          "After you look, the square goes dim green and fades to idle after 30 minutes of no activity. It works without hooks, and its optional Notification hook also turns a square blue when a chat is waiting on a permission prompt or a question.",
        ],
      },
    ],
  },
  {
    slug: "track-codex-cli-sessions",
    title: "How to Track Multiple Codex CLI Sessions",
    description:
      "Keep several OpenAI Codex CLI sessions under control: codex resume and --last, naming threads, where ~/.codex/sessions lives, and seeing status in the taskbar.",
    updated: "2026-09-18",
    sections: [
      // Source: https://developers.openai.com/codex/cli/reference (now https://learn.chatgpt.com/docs/developer-commands?surface=cli)
      //         https://learn.chatgpt.com/docs/codex/cli
      {
        heading: "Resume a session",
        paragraphs: [
          "codex resume --last skips the picker and resumes the most recent chat from the current working directory. Add --all to include sessions from other directories.",
          "Plain codex resume opens a picker. You can also pass a session ID or a session name directly.",
          "If your current directory differs from the session's saved one, Codex asks which to use. Set tui.resume_cwd to \"current\" or \"session\" to skip that question.",
        ],
        code: "codex resume --last\ncodex resume --last --all\ncodex resume\ncodex resume <session-id-or-name>",
      },
      // Source: https://github.com/openai/codex/blob/main/codex-rs/tui/src/slash_command.rs (/rename, /fork, /rollout)
      //         https://learn.chatgpt.com/docs/developer-commands?surface=cli (codex fork, session name argument)
      {
        heading: "Name your threads",
        paragraphs: [
          "Inside a session, /rename renames the current thread. Since codex resume accepts a session name, a clear name is the quickest way back to a specific task.",
          "/fork forks the current chat. From the shell, codex fork creates a new chat from a previous session and keeps the original transcript.",
        ],
        code: "/rename auth-refactor\n\n# later, from the shell:\ncodex resume auth-refactor",
      },
      // Source: https://learn.chatgpt.com/docs/config-file/config-advanced (CODEX_HOME default)
      //         https://learn.chatgpt.com/docs/codex/cli (~/.codex/sessions)
      //         https://github.com/openai/codex/blob/main/codex-rs/rollout/src/recorder.rs (sessions/YYYY/MM/DD, rollout-*.jsonl)
      //         https://github.com/openai/codex/blob/main/codex-rs/rollout/src/session_index.rs (session_index.jsonl)
      {
        heading: "Where Codex keeps sessions",
        paragraphs: [
          "Codex stores its local state under CODEX_HOME, which defaults to ~/.codex. Each session is a JSONL rollout file under ~/.codex/sessions/, in year, month and day folders.",
          "Names set with /rename are appended to ~/.codex/session_index.jsonl. Each line holds the thread id, thread_name and updated_at, and the newest entry for an id wins.",
          "Run /rollout inside a session to print its rollout file path.",
        ],
        code: "~/.codex/sessions/YYYY/MM/DD/rollout-<timestamp>-<id>.jsonl\n~/.codex/session_index.jsonl",
      },
      // Source: https://learn.chatgpt.com/docs/config-file/config-reference (tui.notifications, notification_method, notification_condition, notify)
      //         https://learn.chatgpt.com/docs/config-file/config-advanced (event names, notify example)
      //         https://learn.chatgpt.com/docs/config-file/config-basic (~/.codex/config.toml)
      {
        heading: "Get notified when a turn completes",
        paragraphs: [
          "In ~/.codex/config.toml, tui.notifications turns on built-in terminal notifications and can be limited to event types such as agent-turn-complete and approval-requested.",
          "tui.notification_method picks auto, osc9 or bel. tui.notification_condition defaults to unfocused, so alerts only fire when the terminal is not focused.",
          "For your own script, notify runs an external program with a JSON payload. Its only event right now is agent-turn-complete.",
        ],
        code: `notify = ["python3", "/path/to/notify.py"]

[tui]
notifications = ["agent-turn-complete", "approval-requested"]
notification_method = "bel"`,
      },
      // Source: AgentBar README (agentbar/README.md)
      {
        heading: "See every Codex chat in the taskbar",
        paragraphs: [
          "AgentBar shows each live Codex chat as a square in the Windows taskbar, next to your Claude Code chats. It finds running chats from the lock files Codex holds open in ~/.codex/thread-writer-locks, reads working and done from the rollout log, and takes names from session_index.jsonl, so your /rename shows up.",
          "Hover a square for the name, folder, status and elapsed time, and click it to bring that chat's window forward. Adding the optional hook to ~/.codex/hooks.json also shows the current step. Codex asks you to trust new hooks once.",
          "On a Mac, a menu bar version is an early preview in the latest release.",
        ],
        code: String.raw`{
  "hooks": {
    "SessionStart": [{ "hooks": [{ "type": "command", "command": "node \"C:\\Users\\<you>\\AppData\\Local\\AgentBar\\hooks\\agent-status.js\" start codex" }] }],
    "PostToolUse":  [{ "hooks": [{ "type": "command", "command": "node \"C:\\Users\\<you>\\AppData\\Local\\AgentBar\\hooks\\agent-status.js\" tool codex" }] }]
  }
}`,
      },
    ],
  },
];
