const NBSP = "\u00A0";

/** Keep the brand name on one line wherever it appears in legacy copy. */
function bindKingdomOfO(text: string): string {
  return text
    .replace(/The Kingdom Of O/gi, `The${NBSP}Kingdom${NBSP}Of${NBSP}O`)
    .replace(/Kingdom Of O/gi, `Kingdom${NBSP}Of${NBSP}O`);
}

/** Join the last two words before sentence-ending punctuation (avoids “… Of O.” widows). */
function bindSentenceWidows(text: string): string {
  return text.replace(/([^.!?]+)([.!?]+)/g, (segment, body, punct) => {
    const words = body.trim().split(/ +/).filter(Boolean);
    if (words.length < 2) {
      return segment;
    }
    const last = words.pop()!;
    const prev = words.pop()!;
    const line = [...words, `${prev}${NBSP}${last}`].join(" ");
    return line + punct;
  });
}

/** Typography helpers for centred legacy prose (CSS text-wrap alone is unreliable). */
export function formatLegacyParagraph(text: string): string {
  return bindSentenceWidows(bindKingdomOfO(text));
}
