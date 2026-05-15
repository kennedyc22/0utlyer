// Phase 4f: Privacy policy content.
// Source-of-truth is content/privacy.mdx. This mirror lets app/privacy/page.tsx
// render without @next/mdx installed. Every fact-specific value is marked
// TODO(legal): for Dan/lawyer review before launch.

export type PrivacyBlock =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

export const privacyFrontmatter = {
  title: "Privacy Policy",
  eyebrow: "Privacy",
  lead: "How Outlyer Entertainment collects, uses and protects your personal data.",
  updated: "2026-05-15",
};

export const privacyBlocks: PrivacyBlock[] = [
  { kind: "h2", text: "Data controller" },
  {
    kind: "p",
    // TODO(legal): confirm registered legal entity name.
    text: "Outlyer Entertainment is the data controller responsible for your personal data.",
  },
  {
    kind: "p",
    // TODO(legal): registered company address.
    text: "Registered address: [address to be confirmed].",
  },
  {
    kind: "p",
    // TODO(legal): company registration number.
    text: "Companies House number: [number to be confirmed].",
  },

  { kind: "h2", text: "What data we collect" },
  {
    kind: "p",
    text: "We collect personal data only when you choose to share it with us.",
  },
  {
    kind: "ul",
    items: [
      "Contact form submissions: name, email address, organisation (if supplied), subject line and message body.",
      "Server logs: IP address, user agent, timestamp and requested URL for each visit. Retained for security and abuse-prevention purposes only.",
    ],
  },
  {
    kind: "p",
    text: "We do not use third-party analytics, advertising trackers or social-media pixels.",
  },

  { kind: "h2", text: "Legal basis" },
  {
    kind: "p",
    text: "We rely on legitimate interest (Article 6(1)(f) UK GDPR) to process contact form submissions in order to respond to enquiries, and to process server logs in order to maintain the security of the site.",
  },

  { kind: "h2", text: "Retention" },
  {
    kind: "ul",
    items: [
      // TODO(legal): confirm retention period for contact form data.
      "Contact form messages: retained for 24 months from the date of submission, then deleted.",
      // TODO(legal): confirm retention period for server logs.
      "Server logs: retained for 30 days, then deleted.",
    ],
  },

  { kind: "h2", text: "Your rights" },
  { kind: "p", text: "Under UK GDPR you have the right to:" },
  {
    kind: "ul",
    items: [
      "Access the personal data we hold about you.",
      "Rectify inaccurate or incomplete data.",
      "Erase your data (right to be forgotten).",
      "Restrict how we process your data.",
      "Object to processing carried out under legitimate interest.",
      "Portability — receive your data in a structured, machine-readable form.",
    ],
  },
  {
    kind: "p",
    // TODO(legal): DPO email address.
    text: "To exercise any of these rights, contact our Data Protection Officer at privacy@0utlyer.com. We will respond within one calendar month.",
  },

  { kind: "h2", text: "Cookies" },
  {
    kind: "p",
    text: "This site does not set cookies and does not require a cookie banner under PECR.",
  },

  { kind: "h2", text: "Sharing" },
  {
    kind: "p",
    text: "We do not sell or share your personal data with third parties for marketing purposes. The contact form is delivered through Netlify Forms; submissions transit Netlify's infrastructure before reaching our inbox. See Netlify's privacy policy for their handling of that data.",
  },

  { kind: "h2", text: "Supervisory authority" },
  {
    kind: "p",
    text: "If you are not satisfied with how we have handled your personal data, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO): web ico.org.uk, telephone 0303 123 1113.",
  },

  { kind: "h2", text: "Changes" },
  {
    kind: "p",
    text: "We may update this policy from time to time. The “last updated” date at the top of the page reflects the most recent change. Material changes will be announced on the home page for 30 days.",
  },
];
