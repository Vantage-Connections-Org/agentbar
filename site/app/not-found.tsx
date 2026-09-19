import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <Image src="/goat-head.png" alt="" width={120} height={120} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">This page wandered off.</h1>
        <p className="mt-3 text-muted">The link may be old or mistyped.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/" className="rounded-xl bg-accent px-5 py-3 font-medium text-accent-ink transition hover:brightness-110 active:scale-[0.98]">Go to the home page</a>
          <a href="/guides" className="rounded-xl border border-line bg-surface px-5 py-3 font-medium transition hover:border-muted active:scale-[0.98]">Browse the guides</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
