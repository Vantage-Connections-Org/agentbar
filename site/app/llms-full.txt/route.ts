import { GUIDES } from "@/content/guides";
import { FAQ } from "@/lib/faq";
import { LLMS_INTRO } from "@/lib/llms-intro";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// llms-full.txt: the summary, the FAQ and every guide in full, as plain text.
export function GET() {
  const faq = FAQ.map(({ q, a }) => `### ${q}\n${a}`).join("\n\n");
  const guides = GUIDES.map(
    (g) =>
      `## ${g.title}\nURL: ${SITE_URL}/guides/${g.slug}\nUpdated: ${g.updated}\n\n${g.description}\n\n` +
      g.sections.map((s) => `### ${s.heading}\n${s.paragraphs.join("\n\n")}${s.code ? `\n\n\`\`\`\n${s.code}\n\`\`\`` : ""}`).join("\n\n"),
  ).join("\n\n");
  const text = `${LLMS_INTRO}\n## FAQ\n\n${faq}\n\n# Guides\n\n${guides}\n`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
