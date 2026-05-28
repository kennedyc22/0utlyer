import Link from "next/link";
import NextImage from "next/image";

export interface WordmarkProps {
  href?: string;
  /** Visual cap height in px; logo lockup scales to this height. */
  height?: number;
}

// /public/logo.avif is the full 0UTLYER ribbon lockup. We pass generous
// intrinsic dimensions so next/image doesn't resample below the rendered
// size, and rely on CSS (height + width: auto + object-fit: contain) to
// preserve the real aspect ratio at the display size.
export function Wordmark({ href = "/", height = 32 }: WordmarkProps) {
  return (
    <Link href={href} aria-label="0UTLYER home" className="ol-wordmark">
      <NextImage
        src="/logo.avif"
        alt="0UTLYER"
        width={600}
        height={240}
        priority
        className="ol-wordmark-img"
        style={{ height: `${height}px` }}
      />
    </Link>
  );
}
