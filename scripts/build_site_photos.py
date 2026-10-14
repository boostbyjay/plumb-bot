"""Build the final web image set for the JJJ Plumbing site.

For every photo we ship:
  * honor EXIF rotation, then STRIP all metadata (removes GPS of customer homes)
  * optional privacy blur regions (license plates)
  * optional crop to remove clutter
  * optional tone fix (lift crushed shadows / tame blown highlights)
  * emit 640 / 1024 / 1920 wide JPEGs for responsive srcSet
  * emit a 16px blurDataURL for the blur-up placeholder

Outputs -> public/work/<slug>-{640,1024,1920}.jpg
           src/lib/photo-blur.ts   (slug -> base64 blur placeholder)
"""

import base64
import io
import json
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SRC = Path(r"C:\Users\Name\Desktop\JOBSITE")
PUBLIC = Path(r"C:\Users\Name\plumb-bot\public\work")
BLUR_TS = Path(r"C:\Users\Name\plumb-bot\src\lib\photo-blur.ts")

WIDTHS = [640, 1024, 1920]

# box values are fractions of (width, height): (left, top, right, bottom)
PHOTOS = {
    "hydrojetting-truck-hero": {
        "src": "hydrojetting truck-2.jpeg",
        "blur_regions": [(0.38, 0.63, 0.60, 0.78)],   # CA plate + dealer frame
        "shadows": 1.12,
    },
    "hydrojetting-truck-rig": {
        "src": "hydrojetting truck.jpg",
        "blur_regions": [(0.43, 0.61, 0.70, 0.78)],
        "shadows": 1.10,
    },
    "tech-descaling-drain": {
        "src": "descaler used by technician.jpg",
        "shadows": 1.18,
    },
    "root-removal-drain-machine": {
        "src": "big machine used for clearing waste line.jpeg",
        # crop away the brooms/pail along the top and the blown concrete at base
        "crop": (0.0, 0.06, 1.0, 0.88),
        "highlights": 0.94,
    },
    "tankless-exterior-noritz": {
        "src": "tankless  water heater install-5.jpeg",
        "shadows": 1.08,
    },
    "sewer-cast-iron-wye": {
        "src": "hospital main waste line being replaced.jpeg",
        "shadows": 1.30,          # trench is very dark
        "highlights": 0.97,
    },
    "commercial-mechanical-room": {
        "src": "water heater install- tank.jpeg",
        "shadows": 1.10,
    },
    "moen-smart-shutoff": {
        "src": "moen smart shut off valve installed.jpeg",
        # tighten onto the valve + new copper, drop the cracked slab
        "crop": (0.02, 0.04, 0.98, 0.82),
        "shadows": 1.08,
    },
    "pressure-regulator-install": {
        "src": "hose bib install.JPG",
        "crop": (0.0, 0.0, 1.0, 0.90),   # trim the torn-up soil
        "highlights": 0.95,
    },
    "shower-valve-rough-in": {
        "src": "shower valve install.JPG",
        "shadows": 1.28,          # inside a dark wall cavity
    },
    "custom-faucet": {
        "src": "custom faucet installation.jpeg",
        # hard crop kills the perfume bottles + floral china behind
        "crop": (0.06, 0.26, 0.94, 0.90),
    },
    "water-heater-old-new": {
        "src": "old water heater next to new water heater.JPG",
        "shadows": 1.12,
    },
    "tankless-indoor-noritz": {
        "src": "tankless water heater install-3.jpeg",
        "crop": (0.10, 0.02, 0.90, 0.92),
        "shadows": 1.10,
    },
    "sewer-camera-inspection": {
        "src": "setup equipment for maint3enance.jpeg",
        "crop": (0.0, 0.10, 1.0, 0.80),
        "highlights": 0.92,
    },
}


def lift_shadows(img: Image.Image, amount: float) -> Image.Image:
    """Brighten dark areas without blowing out the highlights."""
    if amount == 1.0:
        return img
    shadow_mask = img.convert("L").point(lambda p: 255 - p)
    brightened = ImageEnhance.Brightness(img).enhance(amount)
    return Image.composite(brightened, img, shadow_mask)


def tame_highlights(img: Image.Image, amount: float) -> Image.Image:
    if amount == 1.0:
        return img
    highlight_mask = img.convert("L").point(lambda p: 255 if p > 205 else int(p * 0.65))
    darkened = ImageEnhance.Brightness(img).enhance(amount)
    return Image.composite(darkened, img, highlight_mask)


def blur_region(img: Image.Image, box_frac: tuple) -> Image.Image:
    w, h = img.size
    left, top, right, bottom = box_frac
    box = (int(left * w), int(top * h), int(right * w), int(bottom * h))
    patch = img.crop(box)
    # radius scales with region size so it stays unreadable at every output width
    radius = max(12, int(min(patch.size) * 0.38))
    patch = patch.filter(ImageFilter.GaussianBlur(radius))
    out = img.copy()
    out.paste(patch, box)
    return out


def blur_placeholder(img: Image.Image) -> str:
    tiny = img.copy()
    tiny.thumbnail((16, 16), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.convert("RGB").save(buf, "JPEG", quality=40)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def process(slug: str, cfg: dict) -> dict:
    src_path = SRC / cfg["src"]
    if not src_path.exists():
        raise FileNotFoundError(src_path)

    with Image.open(src_path) as raw:
        img = ImageOps.exif_transpose(raw)       # fix phone rotation
        img = img.convert("RGB")                 # also drops EXIF/GPS

        for region in cfg.get("blur_regions", []):
            img = blur_region(img, region)

        if "crop" in cfg:
            w, h = img.size
            l, t, r, b = cfg["crop"]
            img = img.crop((int(l * w), int(t * h), int(r * w), int(b * h)))

        img = lift_shadows(img, cfg.get("shadows", 1.0))
        img = tame_highlights(img, cfg.get("highlights", 1.0))

        placeholder = blur_placeholder(img)

        emitted = []
        for width in WIDTHS:
            variant = img.copy()
            if variant.width > width:
                ratio = width / variant.width
                variant = variant.resize(
                    (width, int(variant.height * ratio)), Image.LANCZOS
                )
            dest = PUBLIC / f"{slug}-{width}.jpg"
            # no exif= argument -> metadata is not written
            variant.save(dest, "JPEG", quality=84, optimize=True, progressive=True)
            emitted.append((width, variant.height, dest.stat().st_size))

        return {
            "slug": slug,
            "width": img.width,
            "height": img.height,
            "blur": placeholder,
            "variants": emitted,
        }


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    results = []

    for slug, cfg in PHOTOS.items():
        info = process(slug, cfg)
        results.append(info)
        sizes = "  ".join(f"{w}px:{b // 1024}KB" for w, _h, b in info["variants"])
        flags = []
        if cfg.get("blur_regions"):
            flags.append("plate-blurred")
        if cfg.get("crop"):
            flags.append("cropped")
        tag = f" [{', '.join(flags)}]" if flags else ""
        print(f"{slug:<32} {info['width']}x{info['height']}  {sizes}{tag}")

    lines = [
        "// AUTO-GENERATED by scripts/build_site_photos.py -- do not edit by hand.",
        "// Tiny base64 JPEGs used as blur-up placeholders for job photos.",
        "",
        "export const photoBlur: Record<string, string> = {",
    ]
    for r in results:
        lines.append(f'  "{r["slug"]}": "{r["blur"]}",')
    lines.append("};")
    lines.append("")
    lines.append("export const photoDims: Record<string, { w: number; h: number }> = {")
    for r in results:
        lines.append(f'  "{r["slug"]}": {{ w: {r["width"]}, h: {r["height"]} }},')
    lines.append("};")
    lines.append("")
    BLUR_TS.write_text("\n".join(lines), encoding="utf-8")

    total = sum(b for r in results for _w, _h, b in r["variants"])
    print(f"\n{len(results)} photos -> {len(results) * len(WIDTHS)} files, {total // 1024}KB total")
    print(f"blur placeholders -> {BLUR_TS}")


if __name__ == "__main__":
    main()
