import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REG = "C:/Windows/Fonts/segoeui.ttf"
FONT_SEMI = "C:/Windows/Fonts/seguisb.ttf" if os.path.exists("C:/Windows/Fonts/seguisb.ttf") else FONT_BOLD
FONT_MONO = "C:/Windows/Fonts/consolab.ttf" if os.path.exists("C:/Windows/Fonts/consolab.ttf") else FONT_BOLD

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

# 1. Load captured screenshots
img_s1_team = Image.open("frames_mobile/step1_team.png")
img_s1_res = Image.open("frames_mobile/step1_resources.png")
img_s2_match = Image.open("frames_mobile/step2_match.png")
img_s2_map = Image.open("frames_mobile/step2_floor_map.png")
img_s3_cost = Image.open("frames_mobile/step3_pay_checkout.png")
img_s3_pay = Image.open("frames_mobile/step3_pay_button.png")

img_db_top = Image.open("frames_mobile/dashboard_mobile_top.png")
img_db_tablet = Image.open("frames_mobile/dashboard_tablet.png")

# Canvas Dimensions
CANVAS_W = 1920
CANVAS_H = 1420

START_X = 40
COL_GAP = 28
COL_W = (CANVAS_W - (START_X * 2) - (COL_GAP * 2)) // 3 # 594px

HEADER_H = 100
STEP_CARD_TOP = HEADER_H + 28
STEP_CARD_H = 710

DASHBOARD_TOP = STEP_CARD_TOP + STEP_CARD_H + 28
DASHBOARD_H = CANVAS_H - DASHBOARD_TOP - 28

def draw_rounded_rect(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

def draw_check_icon(draw, cx, cy, size=12, color="#10B981"):
    p1 = (cx - size * 0.4, cy)
    p2 = (cx - size * 0.1, cy + size * 0.35)
    p3 = (cx + size * 0.45, cy - size * 0.35)
    draw.line([p1, p2, p3], fill=color, width=2)

def draw_bullet_dot(draw, cx, cy, r=3, color="#21B5FF"):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color)

def prep_phone_img(im, target_w=510, target_h=550):
    scale = target_w / im.width
    scaled_h = int(im.height * scale)
    scaled_im = im.resize((target_w, scaled_h), Image.Resampling.LANCZOS)
    if scaled_h > target_h:
        cropped = scaled_im.crop((0, 0, target_w, target_h))
    else:
        cropped = Image.new("RGBA", (target_w, target_h), (15, 23, 42, 255))
        cropped.paste(scaled_im, (0, 0))
    
    mask = Image.new("L", (target_w, target_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, target_w, target_h), radius=28, fill=255)
    
    phone_framed = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    phone_framed.paste(cropped, (0, 0), mask)
    return phone_framed

p_s1_team = prep_phone_img(img_s1_team)
p_s1_res = prep_phone_img(img_s1_res)
p_s2_match = prep_phone_img(img_s2_match)
p_s2_map = prep_phone_img(img_s2_map)
p_s3_cost = prep_phone_img(img_s3_cost)
p_s3_pay = prep_phone_img(img_s3_pay)

def render_master_board_frame(active_focus='step1', sub_var=0):
    im = Image.new("RGB", (CANVAS_W, CANVAS_H), "#070B14")
    draw = ImageDraw.Draw(im)

    # Ambient Top Background Glow
    for y in range(HEADER_H + 80):
        alpha = int(45 * (1.0 - y / (HEADER_H + 80)))
        draw.line([(0, y), (CANVAS_W, y)], fill=(12 + alpha//2, 25 + alpha, 55 + alpha * 2))

    # Top Brand Header
    f_brand = get_font(FONT_BOLD, 22)
    f_title = get_font(FONT_SEMI, 19)
    f_sub = get_font(FONT_REG, 13)
    f_badge = get_font(FONT_BOLD, 11)

    # Brand Title
    draw.text((START_X, 22), "JustCo", font=f_brand, fill="#FFFFFF")
    draw.text((START_X + 88, 24), "AI Smart Space Orchestrator", font=f_title, fill="#21B5FF")
    
    # Subtitle
    draw.text(
        (START_X, 54),
        "Autonomous 3-Step Workspace Booking Pipeline (Schedule • Approve • Pay) with Post-Booking Telemetry Dashboard",
        font=f_sub,
        fill="#94A3B8"
    )

    # Status Badges
    badge_x = CANVAS_W - START_X - 480
    draw_rounded_rect(draw, (badge_x, 26, badge_x + 195, 56), 8, fill="#0F172A", outline="#21B5FF", width=1)
    draw_bullet_dot(draw, badge_x + 16, 41, r=4, color="#10B981")
    draw.text((badge_x + 28, 33), "Singapore CBD Hub Active", font=f_badge, fill="#E2E8F0")

    draw_rounded_rect(draw, (badge_x + 208, 26, badge_x + 480, 56), 8, fill="#0F172A", outline="#334155", width=1)
    draw.text((badge_x + 220, 33), "3 Steps Pipeline • Live Dashboard", font=f_badge, fill="#38BDF8")

    # Header Divider
    draw.line([(START_X, HEADER_H), (CANVAS_W - START_X, HEADER_H)], fill="#1E293B", width=1)

    # Section 1 Header: 3-Step Booking Process
    draw.text((START_X, HEADER_H + 8), "SECTION 1: 3-STEP AUTONOMOUS BOOKING PROCESS (3 FRAMES HORIZONTAL ACROSS)", font=get_font(FONT_BOLD, 12), fill="#64748B")

    # 3 Steps Configuration
    steps_data = [
        {
            "id": "step1",
            "num": "01",
            "title": "SCHEDULE & SETUP",
            "tag": "Team, Hub & Multi-Resource Menu",
            "desc": "Natural language or menu selection • Dynamic attendee list • Desks, Pods & F&B bundling",
            "color": "#21B5FF",
            "img": p_s1_team if sub_var == 0 else p_s1_res,
            "footer_tag": "• Voice NLP & Smart Multi-Resource Bundling"
        },
        {
            "id": "step2",
            "num": "02",
            "title": "APPROVE & MATCH",
            "tag": "AI Floor Clustering & Match Score",
            "desc": "98% Match Hub • Zone B Co-Location • 4.2m Room-to-Desks Distance • Zero Transit Loss",
            "color": "#0099FF",
            "img": p_s2_match if sub_var == 0 else p_s2_map,
            "footer_tag": "• 1-Tap AI Match & Floor Cluster Approval"
        },
        {
            "id": "step3",
            "num": "03",
            "title": "PAY & AUTHORIZE",
            "tag": "Corporate Credits & Split Billing",
            "desc": "38 Corp Credits + $180 SGD F&B • Instant Auto-Billing Clearance • NFC Fast-Passes Dispatched",
            "color": "#F59E0B",
            "img": p_s3_cost if sub_var == 0 else p_s3_pay,
            "footer_tag": "• Corporate Credits Pool & 1-Click Pay Authorization"
        },
    ]

    # Draw Step Cards (3 Horizontal Frames)
    for i, step in enumerate(steps_data):
        x0 = START_X + i * (COL_W + COL_GAP)
        x1 = x0 + COL_W
        y0 = STEP_CARD_TOP
        y1 = y0 + STEP_CARD_H

        is_active = (active_focus == step["id"])
        is_completed = (active_focus == 'dashboard' or (active_focus == 'step2' and i == 0) or (active_focus == 'step3' and i < 2))

        # Card Background & Highlight Border
        if is_active:
            draw_rounded_rect(draw, (x0 - 2, y0 - 2, x1 + 2, y1 + 2), 22, fill="#0F1F3D", outline=step["color"], width=2)
            draw_rounded_rect(draw, (x0, y0, x1, y1), 20, fill="#0D1629", outline="#253858", width=1)
        else:
            draw_rounded_rect(draw, (x0, y0, x1, y1), 20, fill="#0A101D", outline="#1E293B", width=1)

        # Step Badge
        badge_bg = step["color"] if is_active else ("#10B981" if is_completed else "#1E293B")
        badge_fg = "#000105" if (is_active or is_completed) else "#94A3B8"
        
        draw_rounded_rect(draw, (x0 + 16, y0 + 16, x0 + 48, y0 + 48), 10, fill=badge_bg)
        if is_completed and not is_active:
            draw_check_icon(draw, x0 + 32, y0 + 32, size=14, color="#000105")
        else:
            draw.text((x0 + 24, y0 + 22), step["num"], font=get_font(FONT_BOLD, 15), fill=badge_fg)

        # Step Title & Subtitle
        draw.text((x0 + 58, y0 + 15), f"STEP {step['num']}: {step['title']}", font=get_font(FONT_BOLD, 15), fill="#FFFFFF" if (is_active or is_completed) else "#CBD5E1")
        draw.text((x0 + 58, y0 + 36), step["tag"], font=get_font(FONT_REG, 11), fill=step["color"] if is_active else "#64748B")

        # Step Phone Screenshot Container
        phone_w = 510
        phone_h = 550
        phone_x = x0 + (COL_W - phone_w) // 2
        phone_y = y0 + 64

        # Paste phone image with rounded mask
        im.paste(step["img"], (phone_x, phone_y), step["img"])

        # Bottom Card Status / Highlight Bar
        footer_y0 = y1 - 42
        footer_y1 = y1 - 12
        foot_bg = "#0B223D" if is_active else "#0F172A"
        foot_border = step["color"] if is_active else "#1E293B"
        draw_rounded_rect(draw, (x0 + 14, footer_y0, x1 - 14, footer_y1), 10, fill=foot_bg, outline=foot_border, width=1)
        draw.text((x0 + 24, footer_y0 + 8), step["footer_tag"], font=get_font(FONT_BOLD, 11), fill="#FFFFFF" if is_active else "#94A3B8")

    # ==========================================
    # SECTION 2: SHOWCASE THE DASHBOARD (BELOW)
    # ==========================================
    dash_is_active = (active_focus == 'dashboard')

    # Dashboard Section Header Bar
    dash_header_y = DASHBOARD_TOP - 20
    draw.line([(START_X, dash_header_y), (CANVAS_W - START_X, dash_header_y)], fill="#1E293B", width=1)

    dash_title_col = "#10B981" if dash_is_active else "#38BDF8"
    draw.text(
        (START_X, dash_header_y + 6),
        "SECTION 2: WORKSPACE ANALYTICS & SPACE INTELLIGENCE DASHBOARD (POST-BOOKING RECONCILIATION)",
        font=get_font(FONT_BOLD, 12),
        fill=dash_title_col
    )

    # Right side active status indicator for Dashboard
    draw_rounded_rect(draw, (CANVAS_W - START_X - 250, dash_header_y + 2, CANVAS_W - START_X, dash_header_y + 24), 6, fill="#064E3B" if dash_is_active else "#0F172A", outline="#10B981" if dash_is_active else "#334155", width=1)
    draw_bullet_dot(draw, CANVAS_W - START_X - 238, dash_header_y + 13, r=3, color="#10B981" if dash_is_active else "#64748B")
    draw.text((CANVAS_W - START_X - 226, dash_header_y + 6), "CONFIRMED & LIVE ACTIVE", font=get_font(FONT_BOLD, 10), fill="#34D399" if dash_is_active else "#94A3B8")

    # Dashboard Outer Frame
    d_x0 = START_X
    d_x1 = CANVAS_W - START_X
    d_y0 = DASHBOARD_TOP + 10
    d_y1 = d_y0 + DASHBOARD_H - 10

    if dash_is_active:
        draw_rounded_rect(draw, (d_x0 - 2, d_y0 - 2, d_x1 + 2, d_y1 + 2), 22, fill="#081E1E", outline="#10B981", width=2)
        draw_rounded_rect(draw, (d_x0, d_y0, d_x1, d_y1), 20, fill="#0B1624", outline="#1E3A3A", width=1)
    else:
        draw_rounded_rect(draw, (d_x0, d_y0, d_x1, d_y1), 20, fill="#0A101D", outline="#1E293B", width=1)

    # Dashboard 3 Columns / Cards Inside
    CARD_GAP = 20
    D_COL_W = (d_x1 - d_x0 - 32 - (CARD_GAP * 2)) // 3 # ~580px
    D_CARD_Y0 = d_y0 + 16
    D_CARD_Y1 = d_y1 - 16

    # ----------------------------------------------------
    # Dashboard Card 1 (Left): Attendance & IoT Telemetry
    # ----------------------------------------------------
    c1_x0 = d_x0 + 16
    c1_x1 = c1_x0 + D_COL_W
    c1_focus = (dash_is_active and sub_var == 0)
    c1_border = "#10B981" if c1_focus else "#1E293B"
    draw_rounded_rect(draw, (c1_x0, D_CARD_Y0, c1_x1, D_CARD_Y1), 16, fill="#0D1629", outline=c1_border, width=2 if c1_focus else 1)

    # Header
    draw_rounded_rect(draw, (c1_x0 + 14, D_CARD_Y0 + 14, c1_x0 + 42, D_CARD_Y0 + 42), 8, fill="#064E3B")
    draw_check_icon(draw, c1_x0 + 28, D_CARD_Y0 + 28, size=12, color="#34D399")
    draw.text((c1_x0 + 50, D_CARD_Y0 + 14), "REAL-TIME ATTENDANCE & CHECK-IN", font=get_font(FONT_BOLD, 13), fill="#FFFFFF")
    draw.text((c1_x0 + 50, D_CARD_Y0 + 32), "Live IoT gantry & room sensor telemetry", font=get_font(FONT_REG, 11), fill="#64748B")
    
    draw_rounded_rect(draw, (c1_x1 - 120, D_CARD_Y0 + 14, c1_x1 - 14, D_CARD_Y0 + 38), 6, fill="#064E3B", outline="#10B981", width=1)
    draw_bullet_dot(draw, c1_x1 - 110, D_CARD_Y0 + 26, r=3, color="#34D399")
    draw.text((c1_x1 - 100, D_CARD_Y0 + 20), "Live Telemetry", font=get_font(FONT_BOLD, 10), fill="#34D399")

    # Gauge Box
    draw_rounded_rect(draw, (c1_x0 + 14, D_CARD_Y0 + 52, c1_x1 - 14, D_CARD_Y0 + 130), 12, fill="#091E36", outline="#21B5FF", width=1)
    draw.text((c1_x0 + 26, D_CARD_Y0 + 64), "6 / 6 Checked-In", font=get_font(FONT_BOLD, 20), fill="#FFFFFF")
    draw_rounded_rect(draw, (c1_x0 + 210, D_CARD_Y0 + 66, c1_x0 + 325, D_CARD_Y0 + 92), 6, fill="#0B3C68")
    draw.text((c1_x0 + 220, D_CARD_Y0 + 72), "100% Complete", font=get_font(FONT_BOLD, 11), fill="#38BDF8")
    draw.text((c1_x0 + 26, D_CARD_Y0 + 98), "Full team & visitor attendance verified at Orion Suite", font=get_font(FONT_REG, 11), fill="#94A3B8")

    draw.text((c1_x1 - 160, D_CARD_Y0 + 64), "Punctuality Score", font=get_font(FONT_REG, 10), fill="#94A3B8")
    draw.text((c1_x1 - 160, D_CARD_Y0 + 80), "96.4% on-time", font=get_font(FONT_BOLD, 14), fill="#10B981")
    draw.text((c1_x1 - 160, D_CARD_Y0 + 102), "+4.2m avg lead time", font=get_font(FONT_MONO, 10), fill="#64748B")

    # Attendee Chips Grid
    attendees = [
        ("Sarah Chen", "Lead PM", "In Hub", "#065F46", "#34D399"),
        ("Alex Wong", "Staff Eng", "In Hub", "#065F46", "#34D399"),
        ("Elena Rostova", "Design Dir", "In Hub", "#065F46", "#34D399"),
        ("David Tan (VIP)", "Google SG", "Gantry In", "#78350F", "#FCD34D"),
        ("Marcus Lim (VIP)", "Vertex Cap", "Gantry In", "#78350F", "#FCD34D"),
        ("Rachel Koh", "BizOps Lead", "In Hub", "#065F46", "#34D399"),
    ]
    for idx, (name, role, status, bg, fg) in enumerate(attendees):
        ax = c1_x0 + 14 + (idx % 2) * ((D_COL_W - 36) // 2 + 8)
        ay = D_CARD_Y0 + 142 + (idx // 2) * 54
        aw = (D_COL_W - 36) // 2
        draw_rounded_rect(draw, (ax, ay, ax + aw, ay + 46), 8, fill="#0F172A", outline="#1E293B", width=1)
        draw.ellipse((ax + 8, ay + 14, ax + 26, ay + 32), fill=bg)
        draw.text((ax + 13, ay + 16), name[0], font=get_font(FONT_BOLD, 11), fill=fg)
        draw.text((ax + 32, ay + 8), name, font=get_font(FONT_BOLD, 11), fill="#FFFFFF")
        draw.text((ax + 32, ay + 24), f"{role} • {status}", font=get_font(FONT_REG, 10), fill=fg)
        draw_check_icon(draw, ax + aw - 16, ay + 23, size=10, color=fg)

    # NFC Pass Footer Pill
    draw_rounded_rect(draw, (c1_x0 + 14, D_CARD_Y1 - 42, c1_x1 - 14, D_CARD_Y1 - 12), 8, fill="#0A1C30", outline="#21B5FF", width=1)
    draw_bullet_dot(draw, c1_x0 + 24, D_CARD_Y1 - 27, r=3, color="#38BDF8")
    draw.text((c1_x0 + 34, D_CARD_Y1 - 32), "IoT NFC Gantry Bypass & Bluetooth Room Sync Active", font=get_font(FONT_BOLD, 10), fill="#38BDF8")

    # ----------------------------------------------------
    # Dashboard Card 2 (Middle): Space & Desk Utilization Heatmap
    # ----------------------------------------------------
    c2_x0 = c1_x1 + CARD_GAP
    c2_x1 = c2_x0 + D_COL_W
    c2_focus = (dash_is_active and sub_var == 1)
    c2_border = "#0099FF" if c2_focus else "#1E293B"
    draw_rounded_rect(draw, (c2_x0, D_CARD_Y0, c2_x1, D_CARD_Y1), 16, fill="#0D1629", outline=c2_border, width=2 if c2_focus else 1)

    # Header
    draw_rounded_rect(draw, (c2_x0 + 14, D_CARD_Y0 + 14, c2_x0 + 42, D_CARD_Y0 + 42), 8, fill="#0B3C68")
    draw_bullet_dot(draw, c2_x0 + 28, D_CARD_Y0 + 28, r=5, color="#38BDF8")
    draw.text((c2_x0 + 50, D_CARD_Y0 + 14), "SPACE & DESK UTILIZATION HEATMAP", font=get_font(FONT_BOLD, 13), fill="#FFFFFF")
    draw.text((c2_x0 + 50, D_CARD_Y0 + 32), "Co-located cluster efficiency metrics", font=get_font(FONT_REG, 11), fill="#64748B")
    
    draw_rounded_rect(draw, (c2_x1 - 130, D_CARD_Y0 + 14, c2_x1 - 14, D_CARD_Y0 + 38), 6, fill="#0B3C68", outline="#21B5FF", width=1)
    draw.text((c2_x1 - 120, D_CARD_Y0 + 20), "89% Avg Efficiency", font=get_font(FONT_BOLD, 10), fill="#38BDF8")

    # 3 Metrics Box
    metric_w = (D_COL_W - 40) // 3
    metrics = [
        ("Room Peak", "95%", "Orion 1 Suite", "#21B5FF"),
        ("Hot Desks Peak", "92%", "Zone B Cluster", "#06B6D4"),
        ("Unused Waste", "0.0%", "Optimal Booking", "#10B981"),
    ]
    for mi, (lbl, val, sub, col) in enumerate(metrics):
        mx = c2_x0 + 14 + mi * (metric_w + 6)
        draw_rounded_rect(draw, (mx, D_CARD_Y0 + 52, mx + metric_w, D_CARD_Y0 + 120), 10, fill="#0A1424", outline="#1E293B", width=1)
        draw.text((mx + 10, D_CARD_Y0 + 60), lbl, font=get_font(FONT_REG, 10), fill="#94A3B8")
        draw.text((mx + 10, D_CARD_Y0 + 74), val, font=get_font(FONT_BOLD, 17), fill=col)
        draw.text((mx + 10, D_CARD_Y0 + 98), sub, font=get_font(FONT_REG, 9), fill="#64748B")

    # Hourly Heat Bars
    heat_slots = [
        ("09:00", "Arrival & Coffee", 85, 60),
        ("10:00", "Plenary Strategy", 95, 75),
        ("11:30", "Breakout Sprints", 90, 90),
        ("13:00", "Bento Lunch & Flex", 30, 85),
        ("14:30", "Design Reviews", 95, 80),
        ("16:00", "Wrap-up & Code", 80, 95),
    ]
    bar_start_y = D_CARD_Y0 + 134
    draw_rounded_rect(draw, (c2_x0 + 14, bar_start_y, c2_x1 - 14, bar_start_y + 126), 10, fill="#0A1424", outline="#1E293B", width=1)
    
    for hi, (time_str, act_name, r_val, d_val) in enumerate(heat_slots):
        hy = bar_start_y + 8 + hi * 19
        draw.text((c2_x0 + 22, hy), time_str, font=get_font(FONT_MONO, 9), fill="#94A3B8")
        draw.text((c2_x0 + 64, hy), act_name, font=get_font(FONT_REG, 9), fill="#64748B")
        draw.text((c2_x1 - 65, hy), f"{max(r_val, d_val)}%", font=get_font(FONT_BOLD, 9), fill="#38BDF8")
        
        # Bar track
        track_x = c2_x0 + 190
        track_w = c2_x1 - c2_x0 - 270
        draw_rounded_rect(draw, (track_x, hy + 3, track_x + track_w, hy + 9), 3, fill="#1E293B")
        draw_rounded_rect(draw, (track_x, hy + 3, track_x + int(track_w * (r_val / 100)), hy + 9), 3, fill="#21B5FF")

    # ESG Sustainability Footer
    draw_rounded_rect(draw, (c2_x0 + 14, D_CARD_Y1 - 42, c2_x1 - 14, D_CARD_Y1 - 12), 8, fill="#064E3B", outline="#10B981", width=1)
    draw_bullet_dot(draw, c2_x0 + 24, D_CARD_Y1 - 27, r=3, color="#34D399")
    draw.text((c2_x0 + 34, D_CARD_Y1 - 32), "Smart HVAC & Lighting motion sensing saved 14.2 kWh (ESG Certified)", font=get_font(FONT_BOLD, 10), fill="#34D399")

    # ----------------------------------------------------
    # Dashboard Card 3 (Right): Cost Ledger & AI Space Advisory
    # ----------------------------------------------------
    c3_x0 = c2_x1 + CARD_GAP
    c3_x1 = c3_x0 + D_COL_W
    c3_focus = (dash_is_active and sub_var == 2)
    c3_border = "#F59E0B" if c3_focus else "#1E293B"
    draw_rounded_rect(draw, (c3_x0, D_CARD_Y0, c3_x1, D_CARD_Y1), 16, fill="#0D1629", outline=c3_border, width=2 if c3_focus else 1)

    # Header
    draw_rounded_rect(draw, (c3_x0 + 14, D_CARD_Y0 + 14, c3_x0 + 42, D_CARD_Y0 + 42), 8, fill="#78350F")
    draw_bullet_dot(draw, c3_x0 + 28, D_CARD_Y0 + 28, r=5, color="#FCD34D")
    draw.text((c3_x0 + 50, D_CARD_Y0 + 14), "COST LEDGER & AI SPACE ADVISORY", font=get_font(FONT_BOLD, 13), fill="#FFFFFF")
    draw.text((c3_x0 + 50, D_CARD_Y0 + 32), "Itemized billing ledger & plan advisory", font=get_font(FONT_REG, 11), fill="#64748B")
    
    draw_rounded_rect(draw, (c3_x1 - 110, D_CARD_Y0 + 14, c3_x1 - 14, D_CARD_Y0 + 38), 6, fill="#78350F", outline="#F59E0B", width=1)
    draw.text((c3_x1 - 100, D_CARD_Y0 + 20), "18% ROI Saved", font=get_font(FONT_BOLD, 10), fill="#FCD34D")

    # Split Cost Hero Boxes
    cost_w = (D_COL_W - 36) // 2
    # Credits box
    draw_rounded_rect(draw, (c3_x0 + 14, D_CARD_Y0 + 52, c3_x0 + 14 + cost_w, D_CARD_Y0 + 115), 10, fill="#0A1C30", outline="#21B5FF", width=1)
    draw.text((c3_x0 + 24, D_CARD_Y0 + 58), "MEMBERSHIP CREDITS", font=get_font(FONT_BOLD, 9), fill="#94A3B8")
    draw.text((c3_x0 + 24, D_CARD_Y0 + 72), "38 Credits", font=get_font(FONT_BOLD, 18), fill="#38BDF8")
    draw.text((c3_x0 + 24, D_CARD_Y0 + 96), "JustCo Corp Pool (194 Cr bal)", font=get_font(FONT_REG, 9), fill="#64748B")

    # Cash F&B box
    draw_rounded_rect(draw, (c3_x0 + 22 + cost_w, D_CARD_Y0 + 52, c3_x1 - 14, D_CARD_Y0 + 115), 10, fill="#241408", outline="#F59E0B", width=1)
    draw.text((c3_x0 + 32 + cost_w, D_CARD_Y0 + 58), "F&B & CASH ADD-ONS", font=get_font(FONT_BOLD, 9), fill="#FCD34D")
    draw.text((c3_x0 + 32 + cost_w, D_CARD_Y0 + 72), "$180 SGD", font=get_font(FONT_BOLD, 18), fill="#FBBF24")
    draw.text((c3_x0 + 32 + cost_w, D_CARD_Y0 + 96), "Artisan Catering & Drinks", font=get_font(FONT_REG, 9), fill="#94A3B8")

    # Itemized Breakdown Lines Box
    item_y0 = D_CARD_Y0 + 124
    item_y1 = item_y0 + 76
    draw_rounded_rect(draw, (c3_x0 + 14, item_y0, c3_x1 - 14, item_y1), 10, fill="#0A1424", outline="#1E293B", width=1)
    
    line_items = [
        ("Orion Suite Boardroom (4h Session)", "16 Credits", "#FFFFFF"),
        ("6 Co-Located Hot Desks (Zone B)", "12 Credits", "#FFFFFF"),
        ("2 Soundproof Privacy Pods", "2 Credits", "#FFFFFF"),
        ("Artisan Catering (6 Pax) & Air-Con Ext", "$180 SGD", "#FCD34D"),
    ]
    for li, (item_name, item_cost, cost_col) in enumerate(line_items):
        ly = item_y0 + 5 + li * 17
        draw.text((c3_x0 + 24, ly), item_name, font=get_font(FONT_REG, 9), fill="#94A3B8")
        draw.text((c3_x1 - 95, ly), item_cost, font=get_font(FONT_BOLD, 9), fill=cost_col)

    # AI Space Advisory Banner Box (Expanded and perfectly filling the card height)
    adv_y0 = item_y1 + 8
    adv_y1 = D_CARD_Y1 - 12
    draw_rounded_rect(draw, (c3_x0 + 14, adv_y0, c3_x1 - 14, adv_y1), 10, fill="#09182C", outline="#21B5FF", width=1)

    draw_bullet_dot(draw, c3_x0 + 26, adv_y0 + 16, r=3, color="#38BDF8")
    draw.text((c3_x0 + 34, adv_y0 + 10), "AI SPACE ADVISORY: RECOMMENDED UPGRADE PLAN", font=get_font(FONT_BOLD, 10), fill="#38BDF8")
    draw_rounded_rect(draw, (c3_x1 - 120, adv_y0 + 6, c3_x1 - 24, adv_y0 + 24), 4, fill="#0B3C68")
    draw.text((c3_x1 - 112, adv_y0 + 9), "+22% Projected ROI", font=get_font(FONT_BOLD, 9), fill="#38BDF8")

    # Recommended plan card details
    draw_rounded_rect(draw, (c3_x0 + 22, adv_y0 + 28, c3_x1 - 22, adv_y1 - 8), 8, fill="#0B203B", outline="#21B5FF", width=1)
    draw.text((c3_x0 + 32, adv_y0 + 35), "Dedicated Flex-Cluster Plan (10-Desk Pod Package)", font=get_font(FONT_BOLD, 11), fill="#FFFFFF")
    draw.text((c3_x0 + 32, adv_y0 + 51), "• Saves $640 SGD/month ($7,680 SGD/yr) vs ad-hoc booking", font=get_font(FONT_REG, 10), fill="#34D399")
    draw.text((c3_x0 + 32, adv_y0 + 67), "• Includes 40 Meeting Room Credits/mo + VIP Room Priority", font=get_font(FONT_REG, 10), fill="#94A3B8")
    draw.text((c3_x0 + 32, adv_y0 + 83), "• Seamless instant rollover with zero setup fees & no downtime", font=get_font(FONT_REG, 9), fill="#64748B")

    # CTA Button inside Advisory card
    draw_rounded_rect(draw, (c3_x1 - 130, adv_y0 + 44, c3_x1 - 32, adv_y0 + 78), 6, fill="#21B5FF")
    draw.text((c3_x1 - 120, adv_y0 + 54), "Upgrade Plan →", font=get_font(FONT_BOLD, 10), fill="#000105")

    return im

# 2. Render and save Static Master Board Image
print("Rendering static master board poster...")
static_board = render_master_board_frame(active_focus='dashboard', sub_var=0)
static_board.save("frames/master_board_3steps_dashboard.png", "PNG", quality=95)
print("Saved frames/master_board_3steps_dashboard.png")

# 3. Render Animated GIF Sequence
print("Rendering Animated GIF Sequence (3 Frames Across + Dashboard Below)...")
frames = []

sequence = [
    ("step1", 0, "Step 1 Setup: Team & Schedule"),
    ("step1", 1, "Step 1 Setup: Resources, Desks & Catering"),
    ("step2", 0, "Step 2 Approve: AI Match Hub Score (98%)"),
    ("step2", 1, "Step 2 Approve: Floor Cluster Map (Zone B)"),
    ("step3", 0, "Step 3 Pay: Cost Breakdown & Billing"),
    ("step3", 1, "Step 3 Pay: Corporate Split Pay Authorization"),
    ("dashboard", 0, "Dashboard: Real-Time Attendance & IoT Check-In"),
    ("dashboard", 1, "Dashboard: Space & Desk Utilization Heatmap"),
    ("dashboard", 2, "Dashboard: Cost Ledger & AI Space Advisory Upgrade Plan"),
]

for focus, variant, label in sequence:
    print(f"Rendering frame: {label}")
    board_frame = render_master_board_frame(active_focus=focus, sub_var=variant)
    gif_frame = board_frame.resize((1536, 1136), Image.Resampling.LANCZOS)
    frames.append(gif_frame)

print("Saving animated GIF...")
frames[0].save(
    "frames/master_board_3steps_dashboard.gif",
    save_all=True,
    append_images=frames[1:],
    duration=2200,
    loop=0,
    optimize=True
)
print("Saved frames/master_board_3steps_dashboard.gif")

# 4. Generate Single Mobile Flow GIF (Walkthrough of all screens)
print("Generating Single Mobile Flow GIF...")
mobile_flow = [
    (p_s1_team, "Step 1: Setup Team"),
    (p_s1_res, "Step 1: Setup Resources & Catering"),
    (p_s2_match, "Step 2: AI Match Score 98%"),
    (p_s2_map, "Step 2: Floor Cluster Map"),
    (p_s3_cost, "Step 3: Cost Authorization"),
    (p_s3_pay, "Step 3: Split Billing & Pay"),
]
m_frames = []
for p_im, lbl in mobile_flow:
    m_w = 480
    m_h = int(p_im.height * (m_w / p_im.width))
    m_resized = p_im.resize((m_w, m_h), Image.Resampling.LANCZOS)
    m_frames.append(m_resized)

m_frames[0].save(
    "frames/booking_3steps_flow.gif",
    save_all=True,
    append_images=m_frames[1:],
    duration=2200,
    loop=0,
    optimize=True
)
print("Saved frames/booking_3steps_flow.gif")

print("All GIF and image generation completed successfully!")
