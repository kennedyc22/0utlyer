"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrandLockup } from "./BrandLockup";

const SLIDE_COUNT = 3;
const AUTOPLAY_MS = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDE_COUNT);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="ol-hero-carousel"
      aria-roledescription="carousel"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide 1 — Brand */}
      <article
        className="ol-slide ol-slide-brand"
        data-active={index === 0 || undefined}
        aria-hidden={index !== 0}
        aria-label="0UTLYER — A Film and TV production company with a powerful Inclusion Mission"
      >
        <div className="ol-anim-in">
          <BrandLockup priority />
        </div>
        <div className="ol-slide-brand-copy ol-anim-in">
          <h1 className="ol-slide-headline">
            A Film and TV production company with a powerful Inclusion Mission.
          </h1>
          <p className="ol-slide-sub ol-anim-in-2">
            Founded by Coldplays Chris Martin and Emmanuel Kelly.
          </p>
        </div>
      </article>

      {/* Slide 2 — Slippery Beast */}
      <article
        className="ol-slide ol-slide-project"
        data-active={index === 1 || undefined}
        aria-hidden={index !== 1}
        aria-label="Featured project: Slippery Beast"
      >
        <Link
          href="/projects/slippery-beast"
          prefetch={false}
          aria-label="View Slippery Beast project"
          tabIndex={index === 1 ? 0 : -1}
          style={{ position: "absolute", inset: 0, display: "block" }}
        >
          <NextImage
            src="/project-images/slippery-beast.avif"
            alt="Slippery Beast — 0UTLYER feature project"
            fill
            sizes="100vw"
            style={{ objectFit: "contain", objectPosition: "center" }}
            priority
          />
        </Link>
      </article>

      {/* Slide 3 — Chris Martin quote */}
      <article
        className="ol-slide ol-slide-quote"
        data-active={index === 2 || undefined}
        aria-hidden={index !== 2}
        aria-label="Quote from Chris Martin"
      >
        <blockquote className="ol-slide-quote-text ol-anim-in">
          <p>
            <span aria-hidden="true">&ldquo; </span>I feel excited to have the
            opportunity to highlight the incredible talent that the differently
            abled bring to the entertainment industry and proactively work to
            create a more diverse industry for all.
            <span aria-hidden="true">&rdquo;</span>
          </p>
          <footer className="ol-slide-quote-attrib ol-anim-in-2">
            CHRIS MARTIN
          </footer>
        </blockquote>
        <div className="ol-slide-quote-portrait">
          <NextImage
            src="/homepage-carousel/Chris Martin.avif"
            alt="Chris Martin"
            width={900}
            height={1200}
            priority
          />
        </div>
      </article>

      {/* Controls */}
      <button
        type="button"
        className="ol-carousel-arrow ol-carousel-arrow-prev"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
      >
        <ChevronLeft size={48} strokeWidth={1.25} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="ol-carousel-arrow ol-carousel-arrow-next"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
      >
        <ChevronRight size={48} strokeWidth={1.25} aria-hidden="true" />
      </button>

      <div className="ol-carousel-dots" role="tablist" aria-label="Slides">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            className="ol-carousel-dot"
            data-active={i === index || undefined}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
