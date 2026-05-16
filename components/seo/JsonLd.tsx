// Phase 6: render a JSON-LD <script> block. Renders one node per call; pages
// emit multiple <JsonLd /> blocks to compose an entity graph (Organization +
// WebSite on the home page, Movie + BreadcrumbList on detail pages, etc.).

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
