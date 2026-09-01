import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REG = "C:/Windows/Fonts/segoeui.ttf"
FONT_SEMI = "C:/Windows/Fonts/seguisb.ttf" if os.path.exists("C:/Windows/Fonts/seguisb.ttf") else FONT_BOLD

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

# 1. Load captured dashboard components
c1_att = Image.open("frames_dashboard/card1_attendance.png")
c2_utl = Image.open("frames_dashboard/card2_utilization.png")
c3_cst = Image.open("frames_dashboard/card3_cost.png")
c4_adv = Image.open("frames_dashboard/card4_advisory.png")
db_mobile = Image.open("frames_dashboard/db_mobile_full.png")

# Canvas Dimensions
CANVAS_W = 1920
CANVAS_H = 1080

START_X = 40
COL_GAP = 24
TOTAL_COLS = 4
COL_W = (CANVAS_W - (START_X * 2) - (COL_GAP * (TOTAL_COLS - 1))) // TOTAL_COLS # ~440px
TOP_HEADER_H = 120
CARD_TOP_Y = 135
CARD_H = CANVAS_H - CARD_TOP_Y - 30 # 915px

def draw_rounded_rect(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

# Dashboard Box Definitions (Left to Right)
boxes_meta = [
    {
        "id": 1,
        "num": "01",
        "title": "ATTENDANCE",
        "tag": "Real-Time IoT Gantry Check-In",
        "color": "#21B5FF",
        "img": c1_att,
        "active_footer": "• 100% Attendance (8/8 Pax) • 96.4% Punctuality",
        "dim_footer": "• IoT Turnstile Telemetry & NFC Sync"
    },
    {
        "id": 2,
        "num": "02",
        "title": "UTILIZATION",
        "tag": "Space Heatmap & ESG Energy Savings",
        "color": "#38BDF8",
        "img": c2_utl,
        "active_footer": "• 95% Room • 92% Desks • 14.2 kWh Eco Savings",
        "dim_footer": "• Hourly Density Heat & Zero Idle Waste"
    },
    {
        "id": 3,
        "num": "03",
        "title": "COST & BILLING",
        "tag": "Consolidated Credits & Itemized Ledger",
        "color": "#F59E0B",
        "img": c3_cst,
        "active_footer": "• 38 Corp Credits + $180 F&B • $45 Saved (18% ROI)",
        "dim_footer": "• Auto-Split Corporate Account Deductions"
    },
    {
        "id": 4,
        "num": "04",
        "title": "UPGRADE PLAN",
        "tag": "AI Space Advisory Intelligence",
        "color": "#10B981",
        "img": c4_adv,
        "active_footer": "• Dedicated Flex-Cluster Plan (Save $640/mo)",
        "dim_footer": "• +22% Projected ROI • $7,680 SGD/yr Savings"
    },
]

def render_dashboard_board_frame(active_box_idx=0, is_all_active=False):
    im = Image.new("RGB", (CANVAS_W, CANVAS_H), "#080D18")
    draw = ImageDraw.Draw(im)

    # Ambient Top Glow
    for y in range(TOP_HEADER_H + 60):
        alpha = int(45 * (1.0 - y / (TOP_HEADER_H + 60)))
        draw.line([(0, y), (CANVAS_W, y)], fill=(10 + alpha//2, 28 + alpha, 60 + alpha * 2))

    # Top Brand Bar
    f_brand = get_font(FONT_BOLD, 24)
    f_title = get_font(FONT_SEMI, 21)
    f_sub = get_font(FONT_REG, 14)
    f_badge = get_font(FONT_BOLD, 12)

    # Header Titles
    draw.text((START_X, 24), "JustCo", font=f_brand, fill="#FFFFFF")
    draw.text((START_X + 96, 26), "Workspace Analytics Dashboard", font=f_title, fill="#21B5FF")

    # Subtitle
    draw.text(
        (START_X, 58),
        "Live Post-Booking Intelligence: Real-Time Attendance • Space Heatmap • Cost Clearance • Upgrade Advisory",
        font=f_sub,
        fill="#94A3B8"
    )

    # Top Right Badges
    badge_x = CANVAS_W - START_X - 510
    draw_rounded_rect(draw, (badge_x, 30, badge_x + 220, 62), 10, fill="#0F172A", outline="#10B981", width=1)
    draw.ellipse((badge_x + 14, 43, badge_x + 22, 51), fill="#10B981")
    draw.text((badge_x + 30, 38), "Booking #JC-PAY-2026-8842 Active", font=f_badge, fill="#E2E8F0")

    draw_rounded_rect(draw, (badge_x + 235, 30, badge_x + 510, 62), 10, fill="#0F172A", outline="#334155", width=1)
    draw.text((badge_x + 248, 38), "Dashboard: Cost, Utilization & Upgrade", font=f_badge, fill="#38BDF8")

    # Separator Line
    draw.line([(START_X, TOP_HEADER_H), (CANVAS_W - START_X, TOP_HEADER_H)], fill="#1E293B", width=1)

    # Render 4 Columns (Left to Right)
    for i, box in enumerate(boxes_meta):
        x0 = START_X + i * (COL_W + COL_GAP)
        x1 = x0 + COL_W
        y0 = CARD_TOP_Y
        y1 = y0 + CARD_H

        is_active = (i == active_box_idx) or is_all_active

        # Card Box Outline & Glowing Background
        if is_active:
            # Active glowing outer border
            draw_rounded_rect(draw, (x0 - 2, y0 - 2, x1 + 2, y1 + 2), 22, fill="#0F1F3D", outline=box["color"], width=2)
            draw_rounded_rect(draw, (x0, y0, x1, y1), 20, fill="#0D1629", outline="#253858", width=1)
        else:
            # Inactive dimmed card
            draw_rounded_rect(draw, (x0, y0, x1, y1), 20, fill="#0A101D", outline="#1E293B", width=1)

        # Card Header Inside Box
        badge_bg = box["color"] if is_active else "#1E293B"
        badge_fg = "#000105" if is_active else "#94A3B8"
        draw_rounded_rect(draw, (x0 + 14, y0 + 14, x0 + 46, y0 + 46), 8, fill=badge_bg)
        draw.text((x0 + 20, y0 + 20), box["num"], font=get_font(FONT_BOLD, 15), fill=badge_fg)

        # Box Title & Subtitle
        draw.text((x0 + 56, y0 + 14), f"BOX {box['num']}: {box['title']}", font=get_font(FONT_BOLD, 16), fill="#FFFFFF" if is_active else "#CBD5E1")
        draw.text((x0 + 56, y0 + 36), box["tag"], font=get_font(FONT_REG, 11), fill=box["color"] if is_active else "#64748B")

        # Card Component Image
        # Scale card to fit cleanly within available height and width
        card_max_w = COL_W - 24 # ~416px
        card_orig_w, card_orig_h = box["img"].size
        avail_card_h = y1 - (y0 + 64) - 48 # height between header and footer

        scale_ratio = min(card_max_w / card_orig_w, avail_card_h / card_orig_h)
        target_w = int(card_orig_w * scale_ratio)
        target_h = int(card_orig_h * scale_ratio)

        scaled_card = box["img"].resize((target_w, target_h), Image.Resampling.LANCZOS)

        # Center card image in column
        card_x = x0 + (COL_W - target_w) // 2
        card_y = y0 + 62
        im.paste(scaled_card, (card_x, card_y))

        # Bottom Metric Status Bar
        footer_y0 = y1 - 42
        footer_y1 = y1 - 12
        foot_bg = "#0B223D" if is_active else "#0F172A"
        foot_border = box["color"] if is_active else "#1E293B"
        draw_rounded_rect(draw, (x0 + 12, footer_y0, x1 - 12, footer_y1), 8, fill=foot_bg, outline=foot_border, width=1)
        footer_text = box["active_footer"] if is_active else box["dim_footer"]
        draw.text((x0 + 20, footer_y0 + 8), footer_text, font=get_font(FONT_BOLD, 11), fill="#FFFFFF" if is_active else "#94A3B8")

    return im

# 2. Render Static Dashboard Showcase Storyboard
print("Rendering static Dashboard Showcase image...")
static_dashboard_board = render_dashboard_board_frame(active_box_idx=3, is_all_active=False) # spotlight on upgrade recommendation
if not os.path.exists("frames"):
    os.makedirs("frames", exist_ok=True)

static_dashboard_board.save("frames/dashboard_showcase_storyboard.png", "PNG", quality=95)
print("Saved frames/dashboard_showcase_storyboard.png")

# 3. Generate Animated Dashboard GIF Highlighting Boxes from Left to Right:
# Frame 1: Box 1 (Attendance)
# Frame 2: Box 2 (Utilization Heatmap)
# Frame 3: Box 3 (Cost & Billing Ledger)
# Frame 4: Box 4 (AI Space Advisory & Upgrade Recommendation)
# Frame 5: All 4 Boxes Active Overview
print("Generating Animated Dashboard GIF (Highlighting Boxes from Left to Right)...")

dashboard_animation_sequence = [
    (0, False, 2200, "Box 1: Attendance & IoT Check-In"),
    (1, False, 2200, "Box 2: Space & Desk Utilization Heatmap"),
    (2, False, 2200, "Box 3: Consolidated Cost & Billing Summary"),
    (3, False, 2400, "Box 4: AI Space Advisory & Upgrade Plan Recommendation"),
    (3, True, 2600, "All Boxes Active: Executive Dashboard Overview"),
]

dash_gif_frames = []
dash_durations = []

for idx, (active_idx, all_active, dur, label) in enumerate(dashboard_animation_sequence):
    print(f"Rendering dashboard frame {idx+1}/{len(dashboard_animation_sequence)}: {label}")
    db_img = render_dashboard_board_frame(active_box_idx=active_idx, is_all_active=all_active)
    # Resize to 1440x810 for optimal GIF smoothness and crisp fidelity
    scaled = db_img.resize((1440, 810), Image.Resampling.LANCZOS)
    dash_gif_frames.append(scaled)
    dash_durations.append(dur)

dash_gif_frames[0].save(
    "frames/dashboard_showcase_animated.gif",
    save_all=True,
    append_images=dash_gif_frames[1:],
    duration=dash_durations,
    loop=0,
    optimize=True
)
print("Saved frames/dashboard_showcase_animated.gif")

print("All Dashboard generation completed successfully!")
