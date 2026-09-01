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

# Master Board Dimensions
CANVAS_W = 1920
CANVAS_H = 1080

START_X = 50
COL_GAP = 35
TOTAL_COLS = 3
COL_W = (CANVAS_W - (START_X * 2) - (COL_GAP * (TOTAL_COLS - 1))) // TOTAL_COLS # ~583px
TOP_HEADER_H = 115
CARD_TOP_Y = 130
CARD_H = CANVAS_H - CARD_TOP_Y - 25 # 925px

def draw_rounded_rect(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

# Static descriptions (3 bullet points for each step)
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
    active_bullet_idx=None,
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
        alpha = int(40 * (1.0 - y / (TOP_HEADER_H + 60)))
        draw.line([(0, y), (CANVAS_W, y)], fill=(12 + alpha//2, 25 + alpha, 55 + alpha * 2))

    # Top Brand Bar
    f_brand = get_font(FONT_BOLD, 24)
    f_title = get_font(FONT_SEMI, 21)
    f_sub = get_font(FONT_REG, 15)
    f_badge = get_font(FONT_BOLD, 12)

    # 1. Brand Title: "JustCo" + "AI Space Orchestrator"
    draw.text((START_X, 22), "JustCo", font=f_brand, fill="#FFFFFF")
    draw.text((START_X + 96, 24), "AI Space Orchestrator", font=f_title, fill="#21B5FF")

    # 2. Line 2 Subtitle: "3-step booking with zero friction"
    draw.text(
        (START_X, 56),
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
        badge_fg = "#000105" if is_active else "#94A3B8"
        draw_rounded_rect(draw, (x0 + 16, y0 + 14, x0 + 48, y0 + 46), 8, fill=badge_bg)
        draw.text((x0 + 22, y0 + 20), step_info["step_num"], font=get_font(FONT_BOLD, 15), fill=badge_fg)

        # Step Title ("SETUP", "APPROVE", "PAY")
        draw.text((x0 + 58, y0 + 14), f"STEP {step_info['step_num']}: {step_info['title'].upper()}", font=get_font(FONT_BOLD, 16), fill="#FFFFFF" if is_active else "#CBD5E1")
        draw.text((x0 + 58, y0 + 34), step_info["tag"], font=get_font(FONT_REG, 11), fill=step_color if is_active else "#64748B")

        # ----------------------------------------------------
        # STATIC DESCRIPTION INSTRUCTIONS BOX (3 BULLET POINTS)
        # ----------------------------------------------------
        inst_box_y0 = y0 + 56
        inst_box_y1 = inst_box_y0 + 82
        inst_bg = "#0B1930" if is_active else "#0D1424"
        inst_border = "#253F68" if is_active else "#1E293B"
        
        draw_rounded_rect(draw, (x0 + 14, inst_box_y0, x1 - 14, inst_box_y1), 12, fill=inst_bg, outline=inst_border, width=1)

        # Draw the 3 bullet points inside the instruction box
        f_bullet = get_font(FONT_SEMI, 12)
        f_bullet_dim = get_font(FONT_REG, 12)

        for b_idx, bullet_text in enumerate(step_info["bullets"]):
            bullet_y = inst_box_y0 + 8 + b_idx * 23
            
            # Check if this specific bullet is highlighted in active step
            is_bullet_highlighted = is_active and (active_bullet_idx is None or active_bullet_idx == b_idx or active_bullet_idx == 'all')
            
            bullet_dot_color = step_color if is_bullet_highlighted else ("#94A3B8" if is_active else "#475569")
            bullet_txt_color = "#FFFFFF" if is_bullet_highlighted else ("#CBD5E1" if is_active else "#64748B")
            bullet_font = f_bullet if is_bullet_highlighted else f_bullet_dim

            # Bullet dot
            draw.ellipse((x0 + 26, bullet_y + 4, x0 + 32, bullet_y + 10), fill=bullet_dot_color)
            # Bullet text
            draw.text((x0 + 38, bullet_y), bullet_text, font=bullet_font, fill=bullet_txt_color)

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

        # Bottom Metric / Status Action Bar
        footer_y1 = y1 - 10
        foot_bg = "#0B223D" if is_active else "#0F172A"
        foot_border = step_color if is_active else "#1E293B"
        draw_rounded_rect(draw, (x0 + 14, footer_y0, x1 - 14, footer_y1), 10, fill=foot_bg, outline=foot_border, width=1)
        draw.text((x0 + 24, footer_y0 + 7), footers[i], font=get_font(FONT_BOLD, 12), fill="#FFFFFF" if is_active else "#94A3B8")

    return im

# 2. Render Static Master Board High-Res Image
print("Rendering static Master Board image with 3-bullet instructions...")
static_board = render_master_board_frame(
    active_step_idx=0,
    active_bullet_idx='all',
    s1_img=f1_pods,
    s2_img=f2_match,
    s3_img=f3_split,
    s1_footer="• Select Privacy Pods Add-On & Schedule",
    s2_footer="• Select Center Match & Approve Plan",
    s3_footer="• Corporate Credits & Visa Auto-Split Pay"
)

if not os.path.exists("frames"):
    os.makedirs("frames", exist_ok=True)

static_board.save("frames/master_board_mobile_storyboard.png", "PNG", quality=95)
static_board.save("frames/justco_static_frames_storyboard.png", "PNG", quality=95)
print("Saved frames/master_board_mobile_storyboard.png")

# 3. Generate Animated Master Board GIF showing the exact requested actions with bullet point guidance:
print("Generating Animated Master Board GIF with static descriptions...")

animation_sequence = [
    # --- PHASE 1: STEP 1 SETUP ---
    # Bullet 1: Talk to AI to dictate requirements
    {
        "active_idx": 0,
        "bullet_idx": 0,
        "s1": f1_team,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Talk to AI to Dictate Roster & Schedule",
        "f2": "• Step 2: AI Multi-Variable Matching",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2200
    },
    # Bullet 2: Set additional needs using simple menu (Privacy Pods add-on)
    {
        "active_idx": 0,
        "bullet_idx": 1,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Set Privacy Pods Add-On via Menu (2 Pods)",
        "f2": "• Step 2: AI Multi-Variable Matching",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2200
    },
    # Bullet 3: Click "Schedule"
    {
        "active_idx": 0,
        "bullet_idx": 2,
        "s1": f1_click,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Click 'Schedule' Button ✓",
        "f2": "• Step 2: AI Multi-Variable Matching",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2000
    },

    # --- PHASE 2: STEP 2 APPROVE ---
    # Bullet 1: Review AI-matched workspace and cluster layout
    {
        "active_idx": 1,
        "bullet_idx": 0,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Review AI-Matched Center (98% Match)",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2200
    },
    # Bullet 2: Explore alternative locations if desired
    {
        "active_idx": 1,
        "bullet_idx": 1,
        "s1": f1_pods,
        "s2": f2_alt,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Explore Alternative Centers & Trade-Offs",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2200
    },
    # Bullet 3: Click "Approve"
    {
        "active_idx": 1,
        "bullet_idx": 2,
        "s1": f1_pods,
        "s2": f2_click,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Selected Hub Cluster Match & Click 'Approve' ✓",
        "f3": "• Step 3: Cost Authorization & Payment",
        "duration": 2000
    },

    # --- PHASE 3: STEP 3 PAY ---
    # Bullet 1: Review itemized costs and credit split
    {
        "active_idx": 2,
        "bullet_idx": 0,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Plan Approved",
        "f3": "• Step 3: Review Itemized Costs & Credit Split",
        "duration": 2200
    },
    # Bullet 2: Select corporate payment or credit pool
    {
        "active_idx": 2,
        "bullet_idx": 1,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_split,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Plan Approved",
        "f3": "• Step 3: Corporate Pool JC-CORP-SG-772 & Visa Selected",
        "duration": 2200
    },
    # Bullet 3: Click "Pay"
    {
        "active_idx": 2,
        "bullet_idx": 2,
        "s1": f1_pods,
        "s2": f2_match,
        "s3": f3_click,
        "f1": "• Step 1: Workspace Scheduled",
        "f2": "• Step 2: Plan Approved",
        "f3": "• Step 3: Click 'Pay' ($180 SGD + 38 Credits) ✓",
        "duration": 2000
    },
    # Post-Pay Dashboard Overview Frame
    {
        "active_idx": 2,
        "bullet_idx": 'all',
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
    print(f"Rendering board frame {idx+1}/{len(animation_sequence)}: Step {frame_spec['active_idx']+1} active (Bullet {frame_spec['bullet_idx']})")
    board_img = render_master_board_frame(
        active_step_idx=frame_spec["active_idx"],
        active_bullet_idx=frame_spec["bullet_idx"],
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
    "frames/master_board_mobile_3steps.gif",
    save_all=True,
    append_images=gif_frames[1:],
    duration=durations,
    loop=0,
    optimize=True
)
gif_frames[0].save(
    "frames/master_board_mobile_4steps.gif",
    save_all=True,
    append_images=gif_frames[1:],
    duration=durations,
    loop=0,
    optimize=True
)
print("Saved frames/master_board_mobile_3steps.gif")
print("All Master Board generation with static descriptions completed successfully!")
