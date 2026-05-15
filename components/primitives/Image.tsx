import NextImage from "next/image";
import type { CSSProperties } from "react";

export type ImageAspectRatio = "1:1" | "3:4" | "4:3" | "16:9" | "21:9";

export interface ImageProps {
  src: string;
  alt: string;
  aspectRatio: ImageAspectRatio;
  priority?: boolean;
  blurDataURL?: string;
  disableBlur?: boolean;
  className?: string;
  sizes?: string;
}

const ASPECT_VALUE: Record<ImageAspectRatio, string> = {
  "1:1": "1 / 1",
  "3:4": "3 / 4",
  "4:3": "4 / 3",
  "16:9": "16 / 9",
  "21:9": "21 / 9",
};

const DEFAULT_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0IDQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlNWUzZGMiLz48L3N2Zz4=";

export function Image({
  src,
  alt,
  aspectRatio,
  priority = false,
  blurDataURL,
  disableBlur = false,
  className,
  sizes = "100vw",
}: ImageProps) {
  const wrapperStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: ASPECT_VALUE[aspectRatio],
    overflow: "hidden",
    background: "var(--color-surface)",
  };

  const placeholderProps = disableBlur
    ? { placeholder: "empty" as const }
    : {
        placeholder: "blur" as const,
        blurDataURL: blurDataURL ?? DEFAULT_BLUR,
      };

  return (
    <div
      className={className}
      style={wrapperStyle}
      data-aspect-ratio={aspectRatio}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectFit: "cover" }}
        {...placeholderProps}
      />
    </div>
  );
}
