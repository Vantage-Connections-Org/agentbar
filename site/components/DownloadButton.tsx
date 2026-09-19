"use client";
import { useEffect, useState } from "react";
import { AppleLogo, WindowsLogo } from "@phosphor-icons/react";
import { DOWNLOAD_URL, MAC_DOWNLOAD_URL } from "@/lib/site";

/** Primary CTA. Renders the Windows download (the main product) and switches to the
 *  Mac preview after hydration if the visitor is on a Mac. */
export function DownloadButton({ className }: { className?: string }) {
  const [mac, setMac] = useState(false);
  useEffect(() => {
    setMac(/Macintosh|Mac OS X/.test(navigator.userAgent) && !/iPhone|iPad/.test(navigator.userAgent));
  }, []);
  return (
    <a href={mac ? MAC_DOWNLOAD_URL : DOWNLOAD_URL} className={className}>
      {mac ? <AppleLogo size={20} weight="fill" /> : <WindowsLogo size={20} weight="fill" />}
      {mac ? "Download Mac preview" : "Download for Windows"}
    </a>
  );
}
