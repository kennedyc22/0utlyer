import type { CSSProperties } from "react";
import type { Metadata } from "next";
import {
  Button,
  Container,
  Divider,
  Eyebrow,
  Heading,
  Image,
  Link,
  Section,
  Text,
} from "@/components/primitives";
import type {
  ButtonSize,
  ButtonVariant,
  HeadingSize,
  HeadingTag,
  ImageAspectRatio,
  SectionBg,
  SectionPadding,
  TextVariant,
} from "@/components/primitives";

export const metadata: Metadata = {
  title: "Design System — 0UTLYER",
  description: "Internal review surface for Phase 2 primitives.",
  robots: { index: false, follow: false },
};

interface Swatch {
  name: string;
  role: string;
  varName: string;
  contrastOnPaper: string;
}

const SWATCHES: Swatch[] = [
  {
    name: "0UTLYER Red",
    role: "Accent — punctuation, links, focus",
    varName: "--color-0UTLYER-red",
    contrastOnPaper: "~5.2:1 (AA body, AAA large)",
  },
  {
    name: "Red Dark",
    role: "Accent hover, pressed",
    varName: "--color-0UTLYER-red-dark",
    contrastOnPaper: "~9.6:1",
  },
  {
    name: "Red Soft",
    role: "Sparingly — quiet accents on dark",
    varName: "--color-0UTLYER-red-soft",
    contrastOnPaper: "~3.0:1 (large only)",
  },
  {
    name: "Ink",
    role: "Primary fg — body, headings",
    varName: "--color-ink",
    contrastOnPaper: "~19:1",
  },
  {
    name: "Ink Muted",
    role: "Secondary fg — meta",
    varName: "--color-ink-muted",
    contrastOnPaper: "~8.2:1",
  },
  {
    name: "Paper",
    role: "Default bg",
    varName: "--color-paper",
    contrastOnPaper: "—",
  },
  {
    name: "Paper Warm",
    role: "Surface — cards, differentiated blocks",
    varName: "--color-paper-warm",
    contrastOnPaper: "—",
  },
  {
    name: "Line",
    role: "Hairline on dark (rare)",
    varName: "--color-line",
    contrastOnPaper: "~16:1",
  },
  {
    name: "Line Soft",
    role: "Hairline on light — dividers",
    varName: "--color-line-soft",
    contrastOnPaper: "~1.1:1",
  },
];

const HEADING_SIZES: HeadingSize[] = ["display-1", "display-2", "display-3"];
const TEXT_VARIANTS: TextVariant[] = ["lead", "body", "small", "meta"];
const HEADING_TAGS: HeadingTag[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
const SECTION_PADDINGS: SectionPadding[] = ["sm", "md", "lg", "xl"];
const SECTION_BGS: SectionBg[] = ["paper", "paper-warm", "ink"];
const BUTTON_VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost"];
const BUTTON_SIZES: ButtonSize[] = ["sm", "md", "lg"];
const ASPECT_RATIOS: ImageAspectRatio[] = ["1:1", "3:4", "4:3", "16:9", "21:9"];

const SPACING_TOKENS: { name: string; varName: string }[] = [
  { name: "0", varName: "--space-0" },
  { name: "1 (4)", varName: "--space-1" },
  { name: "2 (8)", varName: "--space-2" },
  { name: "3 (12)", varName: "--space-3" },
  { name: "4 (16)", varName: "--space-4" },
  { name: "6 (24)", varName: "--space-6" },
  { name: "8 (32)", varName: "--space-8" },
  { name: "12 (48)", varName: "--space-12" },
  { name: "16 (64)", varName: "--space-16" },
  { name: "24 (96)", varName: "--space-24" },
  { name: "32 (128)", varName: "--space-32" },
  { name: "40 (160)", varName: "--space-40" },
];

const block: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
};

const card: CSSProperties = {
  border: "var(--border-hairline)",
  borderRadius: "var(--radius-md)",
  padding: "var(--space-4)",
  background: "var(--color-paper)",
};

const grid3: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "var(--space-4)",
};

const row: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "var(--space-4)",
  alignItems: "center",
};

export default function DesignSystemPage() {
  return (
    <div>
      <Section bg="paper" padding="lg">
        <Container>
          <div style={block}>
            <Eyebrow withDot>Internal · Phase 2</Eyebrow>
            <Heading as="h1">Design System</Heading>
            <Text variant="lead" muted>
              Every primitive, every variant — rendered against live tokens for
              visual review and axe testing.
            </Text>
          </div>
        </Container>
      </Section>

      <Section bg="paper-warm" padding="md" accentRail>
        <Container>
          <div style={block}>
            <Eyebrow>01 — Colour</Eyebrow>
            <Heading as="h2">Palette</Heading>
            <div style={grid3}>
              {SWATCHES.map((s) => (
                <div key={s.varName} style={card}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: "100%",
                      height: "var(--space-16)",
                      background: `var(${s.varName})`,
                      borderRadius: "var(--radius-sm)",
                      border: "var(--border-hairline)",
                      marginBottom: "var(--space-3)",
                    }}
                  />
                  <Text variant="meta">{s.name}</Text>
                  <Text variant="small" muted>
                    {s.role}
                  </Text>
                  <Text variant="small">{s.varName}</Text>
                  <Text variant="small" muted>
                    {s.contrastOnPaper}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="paper" padding="md">
        <Container>
          <div style={block}>
            <Eyebrow>02 — Type scale</Eyebrow>
            <Heading as="h2">Typography</Heading>

            <div style={block}>
              {HEADING_SIZES.map((size) => (
                <div key={size} style={card}>
                  <Text variant="meta" muted>
                    {size} · var(--text-{size})
                  </Text>
                  <Heading as="h3" size={size}>
                    The work is the work
                  </Heading>
                </div>
              ))}
              {TEXT_VARIANTS.map((variant) => (
                <div key={variant} style={card}>
                  <Text variant="meta" muted>
                    text · {variant}
                  </Text>
                  <Text variant={variant}>
                    Restraint over expression — editorial rhythm, not template
                    grid.
                  </Text>
                </div>
              ))}
            </div>

            <Divider withDot />

            <div style={block}>
              <Text variant="meta" muted>
                Every heading tag (h1–h6) rendered at its default visual size
              </Text>
              {HEADING_TAGS.map((tag) => (
                <Heading key={tag} as={tag}>
                  {tag.toUpperCase()} — 0UTLYER
                </Heading>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="paper-warm" padding="md">
        <Container>
          <div style={block}>
            <Eyebrow>03 — Spacing</Eyebrow>
            <Heading as="h2">8pt scale</Heading>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
              }}
            >
              {SPACING_TOKENS.map((t) => (
                <div
                  key={t.varName}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-4)",
                  }}
                >
                  <Text variant="meta" muted>
                    {t.name}
                  </Text>
                  <div
                    aria-hidden="true"
                    style={{
                      width: `var(${t.varName})`,
                      height: "var(--space-4)",
                      background: "var(--color-accent)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="paper" padding="md">
        <Container>
          <div style={block}>
            <Eyebrow>04 — Primitives</Eyebrow>
            <Heading as="h2">Components</Heading>

            <div style={card}>
              <Heading as="h3" size="display-3">
                Container
              </Heading>
              <Text variant="small" muted>
                Three variants. Each renders its own bounding box below.
              </Text>
              <div
                style={{
                  marginTop: "var(--space-4)",
                  background: "var(--color-paper-warm)",
                  padding: "var(--space-4)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <Container variant="default">
                  <Text variant="meta">default · max 1440px</Text>
                </Container>
                <Container variant="narrow">
                  <Text variant="meta">narrow · 65ch</Text>
                </Container>
                <Container variant="wide">
                  <Text variant="meta">wide · full bleed</Text>
                </Container>
              </div>
            </div>

            <div style={card}>
              <Heading as="h3" size="display-3">
                Eyebrow
              </Heading>
              <div style={row}>
                <Eyebrow>Plain eyebrow</Eyebrow>
                <Eyebrow withDot>With red dot</Eyebrow>
              </div>
            </div>

            <div style={card}>
              <Heading as="h3" size="display-3">
                Link
              </Heading>
              <div style={row}>
                <Link href="/design-system">Internal link</Link>
                <Link href="https://example.com" external>
                  External link
                </Link>
              </div>
            </div>

            <div style={card}>
              <Heading as="h3" size="display-3">
                Button
              </Heading>
              {BUTTON_VARIANTS.map((variant) => (
                <div key={variant} style={{ marginTop: "var(--space-4)" }}>
                  <Text variant="meta" muted>
                    {variant}
                  </Text>
                  <div style={row}>
                    {BUTTON_SIZES.map((size) => (
                      <Button
                        key={`${variant}-${size}`}
                        variant={variant}
                        size={size}
                      >
                        {variant} · {size}
                      </Button>
                    ))}
                    <Button as="a" href="#" variant={variant} size="md">
                      anchor · {variant}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div style={card}>
              <Heading as="h3" size="display-3">
                Image
              </Heading>
              <div style={grid3}>
                {ASPECT_RATIOS.map((ar) => (
                  <div key={ar}>
                    <Text variant="meta" muted>
                      {ar}
                    </Text>
                    <Image
                      src="/logo.avif"
                      alt={`0UTLYER mark at ${ar} aspect ratio`}
                      aspectRatio={ar}
                      sizes="(min-width: 1024px) 220px, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={card}>
              <Heading as="h3" size="display-3">
                Divider
              </Heading>
              <Text variant="meta" muted>
                Plain
              </Text>
              <Divider />
              <div style={{ height: "var(--space-4)" }} />
              <Text variant="meta" muted>
                With dot
              </Text>
              <Divider withDot />
            </div>

            <div style={card}>
              <Heading as="h3" size="display-3">
                Section variants
              </Heading>
              <Text variant="small" muted>
                Each background × padding combination, rendered inline.
              </Text>
            </div>

            {SECTION_BGS.map((bg) =>
              SECTION_PADDINGS.map((padding) => (
                <Section
                  key={`${bg}-${padding}`}
                  bg={bg}
                  padding={padding}
                  accentRail={bg === "paper"}
                >
                  <Container>
                    <Text variant="meta">
                      bg={bg} · padding={padding}
                      {bg === "paper" ? " · accentRail" : ""}
                    </Text>
                  </Container>
                </Section>
              )),
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
