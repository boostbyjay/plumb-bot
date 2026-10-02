from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import os

NAVY = HexColor("#1e293b")
ACCENT = HexColor("#0ea5e9")
SLATE = HexColor("#64748b")
LIGHT_SLATE = HexColor("#f1f5f9")
WARM_WHITE = HexColor("#f8fafc")

OUTPUT = r"C:\Users\Name\plumb-bot\public\JJJ-Plumbing-Services-v4.pdf"
LOGO_PATH = r"C:\Users\Name\plumb-bot\public\jjj-plumbing-logo-v2.png"

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=letter,
    rightMargin=0.6 * inch,
    leftMargin=0.6 * inch,
    topMargin=0.5 * inch,
    bottomMargin=0.5 * inch,
)

title_style = ParagraphStyle("Title", fontSize=20, leading=24, textColor=WARM_WHITE,
    alignment=TA_CENTER, fontName="Helvetica-Bold")

subtitle_style = ParagraphStyle("Subtitle", fontSize=9, leading=13,
    textColor=ACCENT, alignment=TA_CENTER, fontName="Helvetica-Bold")

section_style = ParagraphStyle("Section", fontSize=11, leading=15, textColor=NAVY,
    alignment=TA_LEFT, fontName="Helvetica-Bold", spaceAfter=3)

body_style = ParagraphStyle("Body", fontSize=9, leading=13, textColor=HexColor("#334155"),
    alignment=TA_LEFT, fontName="Helvetica")

footer_style = ParagraphStyle("Footer", fontSize=9, leading=12, textColor=SLATE,
    alignment=TA_CENTER, fontName="Helvetica")

def draw_header(canvas_obj, doc):
    width, height = letter
    # Navy header band — tall enough for logo + title + tagline
    canvas_obj.setFillColor(NAVY)
    canvas_obj.rect(0, height - 2.4 * inch, width, 2.4 * inch, fill=1, stroke=0)
    # Accent strip at bottom of navy band
    canvas_obj.setFillColor(ACCENT)
    canvas_obj.rect(0, height - 2.45 * inch, width, 0.05 * inch, fill=1, stroke=0)

groups = [
    ("Residential Plumbing", [
        "Faucet repair & installation",
        "Toilet repair & replacement",
        "Garbage disposal repair & installation",
        "Shower & tub repair",
        "Sump pump installation & repair",
        "Water pressure testing & adjustment",
        "Water softener installation",
        "Slab leak detection & repair",
        "Bathroom & kitchen plumbing",
    ]),
    ("Drain & Sewer", [
        "Drain cleaning & hydro jetting",
        "Sewer line camera inspection",
        "Sewer line repair & replacement",
        "Tree root removal",
        "Septic tank pumping",
        "Grease trap cleaning",
    ]),
    ("Water Heaters", [
        "Tankless water heater installation",
        "Traditional tank repair & replacement",
        "Water heater flushing & maintenance",
        "Thermostat & pilot light repair",
    ]),
    ("Gas Line Services", [
        "Gas line repair & installation",
        "Gas leak detection & safety inspection",
        "Gas appliance hookup (stove, dryer, furnace)",
        "Gas line pressure testing",
        "Propane line conversion",
    ]),
    ("Commercial Services", [
        "Grease trap service & compliance",
        "Backflow testing & certification",
        "Multi-unit property maintenance",
        "Preventive maintenance contracts",
        "Emergency commercial response",
    ]),
]

reasons = [
    "25+ years of professional plumbing experience",
    "Licensed & insured (CA LIC #842875)",
    "Upfront pricing — you approve before work begins",
    "Same-day emergency dispatch available",
    "100% satisfaction guarantee on every job",
    "Master technician on every job",
]

story = []

# Header: logo + title + tagline all inside navy band
if os.path.exists(LOGO_PATH):
    from reportlab.platypus import Image as RLImage
    logo = RLImage(LOGO_PATH, width=3.2 * inch, height=1.1 * inch)
    logo.hAlign = "CENTER"
    story.append(Spacer(1, 0.12 * inch))
    story.append(logo)

story.append(Paragraph("JJJ Plumbing Inc.", title_style))
story.append(Paragraph("Licensed · Insured · 25+ Years of Excellence", subtitle_style))
story.append(Spacer(1, 0.2 * inch))

# Two-column grouped services
left_groups = groups[:2]
right_groups = groups[2:]

def build_group(group_list):
    elements = []
    for title, items in group_list:
        elements.append(Paragraph(title, section_style))
        for item in items:
            elements.append(Paragraph(f"• {item}", body_style))
        elements.append(Spacer(1, 0.06 * inch))
    return elements

left_elements = build_group(left_groups)
right_elements = build_group(right_groups)

while len(left_elements) < len(right_elements):
    left_elements.append(Spacer(1, 0.01 * inch))
while len(right_elements) < len(left_elements):
    right_elements.append(Spacer(1, 0.01 * inch))

col_width = 3.35 * inch
rows = []
for le, re_ in zip(left_elements, right_elements):
    rows.append([le, re_])

col_table = Table(rows, colWidths=[col_width, col_width])
col_table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (0, -1), 8),
    ("RIGHTPADDING", (0, 0), (0, -1), 8),
    ("LEFTPADDING", (1, 0), (1, -1), 8),
    ("RIGHTPADDING", (1, 0), (1, -1), 8),
    ("TOPPADDING", (0, 0), (-1, -1), 2),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
]))
story.append(col_table)
story.append(Spacer(1, 0.15 * inch))

# Why choose us
story.append(Paragraph("Why Choose JJJ Plumbing?", section_style))
story.append(Spacer(1, 0.06 * inch))
for reason in reasons:
    story.append(Paragraph(f"• {reason}", body_style))

story.append(Spacer(1, 0.18 * inch))

# CTA box
cta_content = Paragraph(
    "<b>Ready to get started?</b><br/>"
    "Call us today for a free, no-obligation estimate.<br/>"
    "<font size='14'><b>626-506-5050</b></font>",
    ParagraphStyle("CTAInner", parent=body_style, textColor=white,
        alignment=TA_CENTER, fontSize=10, leading=15)
)
cta_table = Table([[cta_content]], colWidths=[6.8 * inch])
cta_table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("LEFTPADDING", (0, 0), (-1, -1), 16),
    ("RIGHTPADDING", (0, 0), (-1, -1), 16),
    ("TOPPADDING", (0, 0), (-1, -1), 14),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
    ("BOX", (0, 0), (-1, -1), 1.5, ACCENT),
]))
story.append(cta_table)
story.append(Spacer(1, 0.12 * inch))

story.append(Paragraph(
    "626-506-5050  ·  Serving Los Angeles, Orange County & the San Gabriel Valley",
    footer_style
))

# Bottom service area line
story.append(Spacer(1, 0.12 * inch))
story.append(Paragraph(
    "Full-service residential and commercial plumbing across Los Angeles, Orange County, and the San Gabriel Valley.",
    ParagraphStyle("BottomLine", parent=body_style, alignment=TA_CENTER, textColor=SLATE)
))

doc.build(story, onFirstPage=draw_header, onLaterPages=draw_header)
print(f"PDF created: {OUTPUT}")