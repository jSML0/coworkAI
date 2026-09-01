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

# 1. Load captured mobile frames
f1_team = Image.open("frames_mobile/mb_s1_team.png")
f1_pods = Image.open("frames_mobile/mb_s1_pods.png")
f1_click = Image.open("frames_mobile/mb_s1_schedule_click.png")

f2_match = Image.open("frames_mobile/mb_s2_match.png")
f2_alt = Image.open("frames_mobile/mb_s2_alt_matches.png")
f2_click = Image.open("frames_mobile/mb_s2_approve_click.png")

f3_split = Image.open("frames_mobile/mb_s3_payment_split.png")
f3_click = Image.open("frames_mobile/mb_s3_pay_click.png")
f3_dash = Image.open("frames_mobile/mb_s3_dashboard.png")

# Load and prepare QR code
qr_source_path = "C:/Users/JerrySML/.gemini/antigravity/brain/2e8431a5-2908-4fc7-8c02-683cffde7eea/.user_uploaded/media_1788250630136.png"
qr_raw = Image.open(qr_source_path).convert("RGBA")

# Master Board Dimensions
CANVAS_W = 1920
CANVAS_H = 1080

START_X = 50
COL_GAP = 35
TOTAL_COLS = 3
COL_W = (CANVAS_W - (START_X * 2) - (COL_GAP * (TOTAL_COLS - 1))) // TOTAL_COLS # ~583px
TOP_HEADER_H = 118
CARD_TOP_Y = 130
CARD_H = CANVAS_H - CARD_TOP_Y - 25 # 925px

def draw_rounded_rect(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

# Static descriptions (3 permanent bullet points for each step)
STEP_INSTRUCTIONS = [
    {
        "step_num": "01",
        "title": "Setup",
        "tag": "Natural Language or Menu Setup",
        "color": "#21B5FF",
        "bullets": [
            "Talk to AI to dictate your requirements",
            "Set additional needs using simple menu",
            "Click \"Schedule\""
        ]
    },
    {
        "step_num": "02",
        "title": "Approve",
        "tag": "Review AI-Matched Floor Cluster",
        "color": "#0099FF",
        "bullets": [
            "Review AI-matched workspace and cluster layout",
            "Explore alternative locations if desired",
            "Click \"Approve\""
        ]
    },
    {
        "step_num": "03",
        "title": "Pay",
        "tag": "Cost Clearance & Auto-Split Pay",
        "color": "#F59E0B",
        "bullets": [
            "Review itemized costs and credit split",
            "Select corporate payment or credit pool",
            "Click \"Pay\""
        ]
    }
]

def render_master_board_frame(
    active_step_idx=0,
    s1_img=f1_pods,
    s2_img=f2_match,
    s3_img=f3_split,
    s1_footer="• Select Privacy Pods Add-On & Schedule",
    s2_footer="• Select Hub Match & Approve Plan",
    s3_footer="• Corporate Credits & Visa Auto-Split Pay"
):
    im = Image.new("RGB", (CANVAS_W, CANVAS_H), "#080D18")
    draw = ImageDraw.Draw(im)

    # Ambient Top Background Glow
    for y in range(TOP_HEADER_H + 60):
        alpha = int(42 * (1.0 - y / (TOP_HEADER_H + 60)))
        draw.line([(0, y), (CANVAS_W, y)], fill=(12 + alpha//2, 26 + alpha, 58 + alpha * 2))

    # Top Brand Bar
    f_brand = get_font(FONT_BOLD, 24)
    f_title = get_font(FONT_SEMI, 21)
    f_sub = get_font(FONT_REG, 15)
    f_badge = get_font(FONT_BOLD, 12)
    f_qr_label = get_font(FONT_BOLD, 10)

    # 1. Brand Title: "JustCo" + "AI Space Orchestrator"
    draw.text((START_X, 22), "JustCo", font=f_brand, fill="#FFFFFF")
    draw.text((START_X + 96, 24), "AI Space Orchestrator", font=f_title, fill="#21B5FF")

    # 2. QR Code placed on the right of "AI Space Orchestrator"
    # Title ends at approx x = START_X + 96 + 235 = ~381px
    qr_box_x0 = START_X + 355
    qr_box_y0 = 16
    qr_size = 76
    qr_card_w = qr_size + 120
    qr_card_h = qr_size + 10

    # Draw sleek container card for QR code
    draw_rounded_rect(draw, (qr_box_x0, qr_box_y0, qr_box_x0 + qr_card_w, qr_box_y0 + qr_card_h), 12, fill="#0F1B30", outline="#21B5FF", width=1)
    
    # Resize and paste QR code on white badge background
    qr_inner_size = qr_size - 4
    qr_resized = qr_raw.resize((qr_inner_size, qr_inner_size), Image.Resampling.LANCZOS)
    
    # White background for QR code
    draw_rounded_rect(draw, (qr_box_x0 + 6, qr_box_y0 + 7, qr_box_x0 + 6 + qr_inner_size + 2, qr_box_y0 + 7 + qr_inner_size + 2), 6, fill="#FFFFFF")
    im.paste(qr_resized, (qr_box_x0 + 7, qr_box_y0 + 8), qr_resized)

    # QR Text Labels next to the QR code inside the card
    text_x = qr_box_x0 + qr_inner_size + 16
    draw.text((text_x, qr_box_y0 + 14), "SCAN TO TEST", font=f_qr_label, fill="#21B5FF")
    draw.text((text_x, qr_box_y0 + 29), "Interactive App", font=get_font(FONT_BOLD, 12), fill="#FFFFFF")
    draw.text((text_x, qr_box_y0 + 47), "Live Prototype", font=get_font(FONT_REG, 11), fill="#94A3B8")

    # 3. Line 2 Subtitle: "3-step booking with zero friction"
    draw.text(
        (START_X, 58),
        "3-step booking with zero friction",
        font=f_sub,
        fill="#94A3B8"
    )

    # Top Right Badges
    badge_x = CANVAS_W - START_X - 480
    draw_rounded_rect(draw, (badge_x, 28, badge_x + 200, 60), 10, fill="#0F172A", outline="#21B5FF", width=1)
    draw.ellipse((badge_x + 14, 41, badge_x + 22, 49), fill="#10B981")
    draw.text((badge_x + 30, 36), "Singapore CBD Hub Active", font=f_badge, fill="#E2E8F0")

    draw_rounded_rect(draw, (badge_x + 215, 28, badge_x + 480, 60), 10, fill="#0F172A", outline="#334155", width=1)
    draw.text((badge_x + 228, 36), "3-Step Flow: Setup • Approve • Pay", font=f_badge, fill="#38BDF8")

    # Separator Line
    draw.line([(START_X, TOP_HEADER_H), (CANVAS_W - START_X, TOP_HEADER_H)], fill="#1E293B", width=1)

    # Steps Images and Footers
    images = [s1_img, s2_img, s3_img]
    footers = [s1_footer, s2_footer, s3_footer]

    # Draw Each Step Column
    for i, step_info in enumerate(STEP_INSTRUCTIONS):
        x0 = START_X + i * (COL_W + COL_GAP)
        x1 = x0 + COL_W
        y0 = CARD_TOP_Y
        y1 = y0 + CARD_H

        is_active = (i == active_step_idx)
        step_color = step_info["color"]

        # Card Border & Background
        if is_active:
            draw_rounded_rect(draw, (x0 - 2, y0 - 2, x1 + 2, y1 + 2), 24, fill="#0F1F3D", outline=step_color, width=2)
            draw_rounded_rect(draw, (x0, y0, x1, y1), 22, fill="#0D1629", outline="#253858", width=1)
        else:
            draw_rounded_rect(draw, (x0, y0, x1, y1), 22, fill="#0A101D", outline="#1E293B", width=1)

        # Step Header Inside Card
        badge_bg = step_color if is_active else "#1E293B"
        badge_fg = "#000105" if is_active else "#CBD5E1"
        draw_rounded_rect(draw, (x0 + 16, y0 + 14, x0 + 48, y0 + 46), 8, fill=badge_bg)
        draw.text((x0 + 22, y0 + 20), step_info["step_num"], font=get_font(FONT_BOLD, 15), fill=badge_fg)

        # Step Title ("SETUP", "APPROVE", "PAY") - Permanent bright white
        draw.text((x0 + 58, y0 + 14), f"STEP {step_info['step_num']}: {step_info['title'].upper()}", font=get_font(FONT_BOLD, 16), fill="#FFFFFF")
        draw.text((x0 + 58, y0 + 34), step_info["tag"], font=get_font(FONT_REG, 11), fill=step_color if is_active else "#94A3B8")

        # ----------------------------------------------------
        # PERMANENT STATIC INSTRUCTIONS (3 BULLET POINTS - NEVER GRAYED OUT)
        # ----------------------------------------------------
        inst_box_y0 = y0 + 56
        inst_box_y1 = inst_box_y0 + 82
        inst_bg = "#0B1930" if is_active else "#0E1729"
        inst_border = "#253F68" if is_active else "#22334D"
        
        draw_rounded_rect(draw, (x0 + 14, inst_box_y0, x1 - 14, inst_box_y1), 12, fill=inst_bg, outline=inst_border, width=1)

        # Draw the 3 bullet points permanent and bright white on all columns
        f_bullet = get_font(FONT_SEMI, 12)

        for b_idx, bullet_text in enumerate(step_info["bullets"]):
            bullet_y = inst_box_y0 + 8 + b_idx * 23
            
            # Bullet dot: vibrant step color
            draw.ellipse((x0 + 26, bullet_y + 4, x0 + 32, bullet_y + 10), fill=step_color)
            # Permanent bright white text across all frames
            draw.text((x0 + 38, bullet_y), bullet_text, font=f_bullet, fill="#FFFFFF")

        # ----------------------------------------------------
        # FULL MOBILE PHONE SCREEN CONTAINER
        # ----------------------------------------------------
        phone_img = images[i]
        phone_max_w = COL_W - 28 # ~555px
        phone_orig_w, phone_orig_h = phone_img.size
        
        # Available vertical space for the phone screen
        phone_top_y = inst_box_y1 + 10
        footer_y0 = y1 - 42
        avail_phone_h = footer_y0 - phone_top_y - 8
        
        scale_ratio = min(phone_max_w / phone_orig_w, avail_phone_h / phone_orig_h)
        target_w = int(phone_orig_w * scale_ratio)
        target_h = int(phone_orig_h * scale_ratio)

        scaled_phone = phone_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

        # Center phone horizontally in column
        phone_x = x0 + (COL_W - target_w) // 2
        phone_y = phone_top_y
        im.paste(scaled_phone, (phone_x, phone_y))

        # Bottom Metric / Status Action Bar (Synced with Animation)
        footer_y1 = y1 - 10
        foot_bg = "#0B223D" if is_active else "#0F172A"
        foot_border = step_color if is_active else "#1E293B"
        draw_rounded_rect(draw, (x0 + 14, footer_y0, x1 - 14, footer_y1), 10, fill=foot_bg, outline=foot_border, width=1)
        draw.text((x0 + 24, footer_y0 + 7), footers[i], font=get_font(FONT_BOLD, 12), fill="#FFFFFF" if is_active else "#94A3B8")

    return im

# 2. Render Static Master Board High-Res Image (_final)
print("Rendering static Master Board image (_final)...")
static_board = render_master_board_frame(
    active_step_idx=0,
    s1_img=f1_pods,
    s2_img=f2_match,
    s3_img=f3_split,
    s1_footer="• Select Privacy Pods Add-On & Schedule",
    s2_footer="• Select Center Match & Approve Plan",
    s3_footer="• Corporate Credits & Visa Auto-Split Pay"
)

if not os.path.exists("frames"):
    os.makedirs("frames", exist_ok=True)

static_board.save("frames/master_board_mobile_3steps_final.png", "PNG", quality=95)
print("Saved frames/master_board_mobile_3steps_final.png")

# 3. Generate Animated Master Board GIF (_final)
# Bullets are permanent; bottom lines and phone screens sync with animation
print("Generating Animated Master Board GIF (_final)...")

animation_sequence = [
    # --- PHASE 1: STEP 1 SETUP ---
    {
        "active_idx": 0,
        "s1": f1_team,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Talk to AI to Dictate Roster & Schedule",
        "f2": "• Step 2: AI Multi-Variable Matching",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2200
    },
    {
        "active_idx": 0,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Set Privacy Pods Add-On via Menu (2 Pods)",
        "f2": "• Step 2: AI Multi-Variable Matching",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2200
    },
    {
        "active_idx": 0,
        "s1": f1_click,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Click 'Schedule' Button ✓",
        "f2": "• Step 2: AI Multi-Variable Matching",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2000
    },

    # --- PHASE 2: STEP 2 APPROVE ---
    {
        "active_idx": 1,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Review AI-Matched Center (98% Match)",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2200
    },
    {
        "active_idx": 1,
        "s1": f1_pods,
        "s2": f2_alt,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Explore Alternative Centers & Trade-Offs",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2200
    },
    {
        "active_idx": 1,
        "s1": f1_pods,
        "s2": f2_click,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Selected Hub Cluster Match & Click 'Approve' ✓",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2000
    },

    # --- PHASE 3: STEP 3 PAY ---
    {
        "active_idx": 2,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Plan Approved",
        "f3": "• Step 3: Review Itemized Costs & Credit Split",
        "duration": 2200
    },
    {
        "active_idx": 2,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Plan Approved",
        "f3": "• Step 3: Corporate Pool JC-CORP-SG-772 & Visa Selected",
        "duration": 2200
    },
    {
        "active_idx": 2,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_click,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Plan Approved",
        "f3": "• Step 3: Click 'Pay' ($180 SGD + 38 Credits) ✓",
        "duration": 2000
    },
    {
        "active_idx": 2,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_dash,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Plan Approved",
        "f3": "• Dashboard: Cost, Utilization & Upgrade Recommendation",
        "duration": 2600
    },
]

gif_frames = []
durations = []

for idx, frame_spec in enumerate(animation_sequence):
    print(f"Rendering board frame {idx+1}/{len(animation_sequence)}: Step {frame_spec['active_idx']+1} active")
    board_img = render_master_board_frame(
        active_step_idx=frame_spec["active_idx"],
        s1_img=frame_spec["s1"],
        s2_img=frame_spec["s2"],
        s3_img=frame_spec["s3"],
        s1_footer=frame_spec["f1"],
        s2_footer=frame_spec["f2"],
        s3_footer=frame_spec["f3"]
    )
    # Downscale smoothly to 1440x810 for optimal GIF performance and crisp resolution
    scaled = board_img.resize((1440, 810), Image.Resampling.LANCZOS)
    gif_frames.append(scaled)
    durations.append(frame_spec["duration"])

gif_frames[0].save(
    "frames/master_board_mobile_3steps_final.gif",
    save_all=True,
    append_images=gif_frames[1:],
    duration=durations,
    loop=0,
    optimize=True
)
print("Saved frames/master_board_mobile_3steps_final.gif")
print("All Master Board _final generation completed successfully!")
