"use client";
import { useState } from "react";
import { CheckCircle, CircleNotch } from "@phosphor-icons/react";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

export function WaitlistForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  if (state.kind === "done") {
    return (
      <p role="status" className="flex items-center gap-2 text-base font-medium text-accent">
        <CheckCircle size={22} weight="fill" />
        You're on the list. Check your inbox for a welcome email.
      </p>
    );
  }

  return (
    <form
      className="grid gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setState({ kind: "sending" });
        try {
          const res = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.get("email"), company: data.get("company") }),
          });
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          if (!res.ok) throw new Error(body.error ?? "Something went wrong. Please try again.");
          setState({ kind: "done" });
        } catch (err) {
          setState({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
        }
      }}
    >
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        {/* Honeypot: people never see or fill this; bots do. */}
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={state.kind === "sending"}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-accent px-5 py-3 font-medium text-accent-ink transition hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
        >
          {state.kind === "sending" && <CircleNotch size={18} className="animate-spin" />}
          Join the Mac waitlist
        </button>
      </div>
      <p className="text-sm text-muted">One email when the Mac version ships, plus major releases. Unsubscribe any time.</p>
      {state.kind === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}
    </form>
  );
}
