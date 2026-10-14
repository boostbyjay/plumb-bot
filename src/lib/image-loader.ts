/**
 * Custom next/image loader for static export.
 *
 * `output: "export"` has no server-side image optimizer, so Next would
 * normally need `unoptimized: true` -- which also disables srcSet, meaning
 * phones download desktop-sized files.
 *
 * Instead we pre-generate 640/1024/1920 variants at build time
 * (scripts/build_site_photos.py) and this loader rewrites the requested
 * width to the nearest available variant. next/image then emits a proper
 * srcSet and the browser picks the right file for the device.
 */

const AVAILABLE_WIDTHS = [640, 1024, 1920];

export default function workImageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  // Only our pre-generated /work/<slug>-<width>.jpg set is variant-aware.
  const match = src.match(/^(\/work\/.+)-(\d+)\.jpg$/);
  if (!match) return src;

  const [, base] = match;
  const target =
    AVAILABLE_WIDTHS.find((w) => w >= width) ??
    AVAILABLE_WIDTHS[AVAILABLE_WIDTHS.length - 1];

  return `${base}-${target}.jpg`;
}
