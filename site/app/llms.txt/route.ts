import { GUIDES } from "@/content/guides";
import { LLMS_INTRO } from "@/lib/llms-intro";
import { REPO_URL, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt: short summary plus links, generated from the same data as the pages.
export function GET() {
  const text = `${LLMS_INTRO}
## Guides
${GUIDES.map((g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`).join("\n")}

## Links
- [Full text for LLMs](${SITE_URL}/llms-full.txt)
- [Source code and README](${REPO_URL})
- [Latest release](${REPO_URL}/releases/latest)
- [Report an issue](${REPO_URL}/issues)
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
