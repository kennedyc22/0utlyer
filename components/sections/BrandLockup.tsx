import NextImage from "next/image";

type BrandLockupProps = {
  priority?: boolean;
  /** Larger sizing for the home contact split (overrides carousel scale). */
  variant?: "hero" | "contact";
};

/** Ø mark + OUTLYER wordmark — matches hero carousel slide 1. */
export function BrandLockup({
  priority = false,
  variant = "hero",
}: BrandLockupProps) {
  const stackClass =
    variant === "contact"
      ? "ol-slide-brand-stack ol-brand-lockup--contact"
      : "ol-slide-brand-stack";

  return (
    <div className={stackClass}>
      <div className="ol-slide-brand-mark">
        <NextImage
          src="/icon.avif"
          alt=""
          width={360}
          height={360}
          priority={priority}
          unoptimized
        />
      </div>
      <div className="ol-slide-brand-lockup">
        <NextImage
          src="/logo.avif"
          alt="0UTLYER"
          width={900}
          height={380}
          priority={priority}
        />
        <span className="ol-slide-brand-tag">ZERO BARRIERS CONNECTING WORLDS</span>
      </div>
    </div>
  );
}
