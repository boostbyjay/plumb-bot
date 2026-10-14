"""Make small review copies of every JOBSITE photo (for vision) plus web-ready masters.

review/  -> max 1100px long edge, q70  (small enough for vision_analyze)
web/     -> max 1920px long edge, q82  (what actually ships to the site)
"""

import json
import os
from pathlib import Path

from PIL import Image, ImageOps

SRC = Path(r"C:\Users\Name\Desktop\JOBSITE")
OUT = Path(r"C:\Users\Name\plumb-bot\scripts\photo-work")
REVIEW = OUT / "review"
WEB = OUT / "web"

EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def slugify(name: str) -> str:
    stem = Path(name).stem.lower()
    keep = []
    for ch in stem:
        if ch.isalnum():
            keep.append(ch)
        elif ch in " -_,":
            keep.append("-")
    slug = "".join(keep)
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")


def save_variant(img: Image.Image, dest: Path, max_edge: int, quality: int) -> dict:
    work = img.copy()
    work.thumbnail((max_edge, max_edge), Image.LANCZOS)
    if work.mode not in ("RGB", "L"):
        work = work.convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    work.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    return {"path": str(dest), "w": work.width, "h": work.height, "bytes": dest.stat().st_size}


def main() -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    WEB.mkdir(parents=True, exist_ok=True)

    manifest = []
    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in EXTS)

    for src in files:
        slug = slugify(src.name)
        with Image.open(src) as raw:
            img = ImageOps.exif_transpose(raw)  # honor phone rotation
            orig_w, orig_h = img.width, img.height
            review = save_variant(img, REVIEW / f"{slug}.jpg", 1100, 70)
            web = save_variant(img, WEB / f"{slug}.jpg", 1920, 82)

        orientation = "landscape" if orig_w > orig_h else ("portrait" if orig_h > orig_w else "square")
        manifest.append(
            {
                "source": src.name,
                "slug": slug,
                "orig": {"w": orig_w, "h": orig_h, "mb": round(src.stat().st_size / 1_048_576, 2)},
                "orientation": orientation,
                "review": review,
                "web": web,
            }
        )
        print(f"{slug:<48} {orig_w}x{orig_h} {orientation:<9} review={review['bytes']//1024}KB web={web['bytes']//1024}KB")

    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\n{len(manifest)} photos processed -> {OUT}")
    land = sum(1 for m in manifest if m["orientation"] == "landscape")
    print(f"landscape: {land}   portrait: {len(manifest) - land}")


if __name__ == "__main__":
    main()
