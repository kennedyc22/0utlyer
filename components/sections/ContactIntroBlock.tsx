"use client";

import { useLayoutEffect, useRef, useState } from "react";

type ContactIntroBlockProps = {
  heading: string;
  body: string;
};

/**
 * Intro copy where paragraph width matches the rendered heading width.
 * (Pure CSS shrink-to-fit fails here because long body text expands the box.)
 */
export function ContactIntroBlock({ heading, body }: ContactIntroBlockProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copyWidth, setCopyWidth] = useState<number | undefined>();

  useLayoutEffect(() => {
    const headingEl = headingRef.current;
    if (!headingEl) return;

    const syncWidth = () => {
      setCopyWidth(headingEl.offsetWidth);
    };

    syncWidth();

    const observer = new ResizeObserver(syncWidth);
    observer.observe(headingEl);

    return () => observer.disconnect();
  }, [heading]);

  return (
    <div className="ol-contact-intro-block">
      <div
        className="ol-contact-intro-copy"
        style={copyWidth ? { width: copyWidth } : undefined}
      >
        <h2 ref={headingRef}>{heading}</h2>
        <p className="ol-contact-intro">{body}</p>
      </div>
    </div>
  );
}
