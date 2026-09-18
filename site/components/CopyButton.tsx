"use client";
import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked: the text is still selectable */
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1 text-xs text-zinc-300 transition hover:bg-white/10 active:scale-[0.98]"
      aria-label={copied ? "Copied" : "Copy commands"}
    >
      {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
