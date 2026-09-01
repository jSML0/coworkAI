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

# 1. Load the captured mobile frames
f1_team = Image.open("frames_mobile/f1_setup_team.png")
f2_hub = Image.open("frames_mobile/f2_setup_hub.png")
f3_res = Image.open("frames_mobile/f3_setup_resources.png")
f4_app = Image.open("frames_mobile/f4_approve_match.png")
f5_map = Image.open("frames_mobile/f5_approve_cluster_map.png")
f6_pay = Image.open("frames_mobile/f6_pay_cost_clearance.png")
f7_dis = Image.open("frames_mobile/f7_pay_passes_dispatch.png")
f8_conf = Image.open("frames_mobile/f8_confirmation_top.png")
f9_adv = Image.open("frames_mobile/f9_confirmation_advisory.png")

# Resize mobile screens to fit nicely on the master board
TARGET_PHONE_W = 420
TARGET_PHONE_H = int(f1_team.height * (TARGET_PHONE_W / f1_team.width))

def prep_frame(im):
    return im.resize((TARGET_PHONE_W, TARGET_PHONE_H), Image.Resampling.LANCZOS)

p_f1 = prep_frame(f1_team)
p_f3 = prep_frame(f3_res)
p_f4 = prep_frame(f4_app)
p_f5 = prep_frame(f5_map)
p_f6 = prep_frame(f6_pay)
p_f7 = prep_frame(f7_dis)
p_f8 = prep_frame(f8_conf)
p_f9 = prep_frame(f9_adv)

# Define Master Board Dimensions
CANVAS_W = 1920
CANVAS_H = 1080

# Calculate column positions
# 4 columns: Setup, Approve, Pay, Confirmation
COL_GAP = 28
COL_W = (CANVAS_W - (40 * 2) - (COL_GAP * 3)) // 4 # ~430px
START_X = 40
TOP_HEADER_H = 130
CARD_TOP_Y = TOP_HEADER_H + 15
CARD_H = CANVAS_H - CARD_TOP_Y - 30

def draw_rounded_rect(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

def render_master_board_frame(active_step_idx=0, sub_variant=0):
    # Base Canvas
    im = Image.new("RGB", (CANVAS_W, CANVAS_H), "#080D18")
    draw = ImageDraw.Draw(im)

    # Ambient Background Accents / Glow
    # Draw soft top gradient
    for y in range(TOP_HEADER_H + 50):
        alpha = int(35 * (1.0 - y / (TOP_HEADER_H + 50)))
        draw.line([(0, y), (CANVAS_W, y)], fill=(15 + alpha//2, 28 + alpha, 55 + alpha * 2))

    # Top Brand Bar
    # Logo / Title
    f_brand = get_font(FONT_BOLD, 22)
    f_sub = get_font(FONT_REG, 13)
    f_badge = get_font(FONT_BOLD, 11)

    # Brand Title
    draw.text((START_X, 26), "JustCo", font=f_brand, fill="#FFFFFF")
    draw.text((START_X + 88, 28), "AI Smart Space Orchestrator", font=get_font(FONT_SEMI, 19), fill="#21B5FF")
    
    # Subtitle
    draw.text(
        (START_X, 58),
        "Autonomous 4-Step Mobile Workspace Pipeline: Real-Time Floor Clustering, Cost Authorization & Space Analytics",
        font=f_sub,
        fill="#94A3B8"
    )

    # Top Right Network Status Badges
    badge_x = CANVAS_W - START_X - 440
    draw_rounded_rect(draw, (badge_x, 32, badge_x + 190, 62), 8, fill="#0F172A", outline="#21B5FF", width=1)
    draw.ellipse((badge_x + 12, 44, badge_x + 20, 52), fill="#10B981")
    draw.text((badge_x + 28, 39), "Singapore CBD Hub Active", font=f_badge, fill="#E2E8F0")

    draw_rounded_rect(draw, (badge_x + 202, 32, badge_x + 440, 62), 8, fill="#0F172A", outline="#334155", width=1)
    draw.text((badge_x + 214, 39), "4-Step Process: Setup • Approve • Pay • Confirm", font=f_badge, fill="#38BDF8")

    # Separator Line
    draw.line([(START_X, TOP_HEADER_H), (CANVAS_W - START_X, TOP_HEADER_H)], fill="#1E293B", width=1)

    # 4 Steps Configuration
    steps_meta = [
        {
            "num": "01",
            "title": "SETUP",
            "tag": "Natural Language or Menu Setup",
            "desc": "Describe needs via voice or intuitive menu • Instant multi-resource bundling",
            "color": "#21B5FF",
            "img": p_f1 if sub_variant == 0 else p_f3,
            "badge_txt": "VOICE / MENU SETUP",
            "footer_metric": "• Voice NLP & Smart Multi-Resource Menu"
        },
        {
            "num": "02",
            "title": "APPROVE",
            "tag": "Approve Recommended Choices",
            "desc": "98% Match Hub • 4.2m Desks-to-Room • 0% Transit Loss",
            "color": "#0099FF",
            "img": p_f4 if sub_variant == 0 else p_f5,
            "badge_txt": "AI CLUSTER MATCH",
            "footer_metric": "• 1-Tap AI Match & Cluster Approval"
        },
        {
            "num": "03",
            "title": "PAY",
            "tag": "Pay via Credits or Flexible Options",
            "desc": "38 Corp Credits • $180 SGD F&B • Instant Auto-Billing & 18% Savings",
            "color": "#F59E0B",
            "img": p_f6 if sub_variant == 0 else p_f7,
            "badge_txt": "COST & PAYMENT CLEAR",
            "footer_metric": "• Corporate Credits Pool or Card Auto-Pay"
        },
        {
            "num": "04",
            "title": "CONFIRMATION",
            "tag": "Display Usage & Recommend Plans",
            "desc": "100% Attendance • 94% Heatmap • Flex-Cluster Upgrade saving $640/mo",
            "color": "#10B981",
            "img": p_f8 if sub_variant == 0 else p_f9,
            "badge_txt": "ANALYTICS & UPGRADE PLAN",
            "footer_metric": "• Live Heatmap & Cost-Saving Plan Upgrade"
        },
    ]

    # Draw Each Step Column
    for i, step in enumerate(steps_meta):
        x0 = START_X + i * (COL_W + COL_GAP)
        x1 = x0 + COL_W
        y0 = CARD_TOP_Y
        y1 = y0 + CARD_H

        is_active = (i == active_step_idx)

        # Card Background & Highlight Border
        if is_active:
            # Active glowing background
            draw_rounded_rect(draw, (x0 - 2, y0 - 2, x1 + 2, y1 + 2), 22, fill="#0F1F3D", outline=step["color"], width=2)
            # Inner card body
            draw_rounded_rect(draw, (x0, y0, x1, y1), 20, fill="#0D1629", outline="#253858", width=1)
        else:
            # Inactive card
            draw_rounded_rect(draw, (x0, y0, x1, y1), 20, fill="#0A101D", outline="#1E293B", width=1)

        # Step Header Inside Card
        # Step Number Badge
        badge_bg = step["color"] if is_active else "#1E293B"
        badge_fg = "#000105" if is_active else "#94A3B8"
        draw_rounded_rect(draw, (x0 + 14, y0 + 14, x0 + 44, y0 + 44), 8, fill=badge_bg)
        draw.text((x0 + 20, y0 + 20), step["num"], font=get_font(FONT_BOLD, 14), fill=badge_fg)

        # Step Title
        draw.text((x0 + 52, y0 + 14), f"STEP {step['num']}: {step['title']}", font=get_font(FONT_BOLD, 15), fill="#FFFFFF" if is_active else "#CBD5E1")
        draw.text((x0 + 52, y0 + 34), step["tag"], font=get_font(FONT_REG, 11), fill=step["color"] if is_active else "#64748B")

        # Mobile Phone Image Container
        # We place the mobile image scaled to fit inside the column
        phone_render_w = COL_W - 24 # ~406px
        phone_render_h = int(TARGET_PHONE_H * (phone_render_w / TARGET_PHONE_W))
        
        # Crop or scale phone so it fits vertically inside the card nicely
        avail_phone_h = y1 - (y0 + 64) - 48 # room for header and footer tag
        
        scaled_phone = step["img"].resize((phone_render_w, phone_render_h), Image.Resampling.LANCZOS)
        
        # If phone height is larger than available space, crop vertically with clean top alignment
        if phone_render_h > avail_phone_h:
            cropped_phone = scaled_phone.crop((0, 0, phone_render_w, avail_phone_h))
        else:
            cropped_phone = scaled_phone

        # Paste phone image
        phone_x = x0 + 12
        phone_y = y0 + 60
        im.paste(cropped_phone, (phone_x, phone_y))

        # Bottom Card Status / Highlight Bar
        footer_y0 = y1 - 42
        footer_y1 = y1 - 12
        foot_bg = "#0B223D" if is_active else "#0F172A"
        foot_border = step["color"] if is_active else "#1E293B"
        draw_rounded_rect(draw, (x0 + 12, footer_y0, x1 - 12, footer_y1), 8, fill=foot_bg, outline=foot_border, width=1)
        draw.text((x0 + 20, footer_y0 + 8), step["footer_metric"], font=get_font(FONT_BOLD, 11), fill="#FFFFFF" if is_active else "#94A3B8")

    return im

# 2. Generate the Static Master Board High-Res Image
print("Generating static Master Board image...")
static_board = render_master_board_frame(active_step_idx=2, sub_variant=0) # spotlight on Pay step
static_board.save("frames/master_board_mobile_storyboard.png", "PNG", quality=95)
print("Saved frames/master_board_mobile_storyboard.png")

# 3. Generate Animated Master Board GIF (cycling spotlight across 4 steps with sub-variants)
print("Generating Animated Master Board GIF...")
frames = []

# Create sequential active states:
# Step 1 (Setup team) -> Step 1 (Setup resources)
# Step 2 (Approve match) -> Step 2 (Approve floor cluster map)
# Step 3 (Pay clearance) -> Step 3 (Pay pass dispatch)
# Step 4 (Confirmation attendance) -> Step 4 (Confirmation upgrade plan)
sequence = [
    (0, 0, "Step 1 Setup: Team & Schedule"),
    (0, 1, "Step 1 Setup: Desks & Catering"),
    (1, 0, "Step 2 Approve: AI Match Score"),
    (1, 1, "Step 2 Approve: Floor Cluster Map"),
    (2, 0, "Step 3 Pay: Cost & Billing Clearance"),
    (2, 1, "Step 3 Pay: Instant Auto-Billing & Passes"),
    (3, 0, "Step 4 Confirmation: Attendance & Heatmap"),
    (3, 1, "Step 4 Confirmation: Recommend Flex-Cluster Plan"),
]

for active_idx, variant, label in sequence:
    print(f"Rendering board frame: {label}")
    board_frame = render_master_board_frame(active_step_idx=active_idx, sub_variant=variant)
    # Downscale slightly for optimal GIF file size and smooth web playback
    gif_frame = board_frame.resize((1440, 810), Image.Resampling.LANCZOS)
    frames.append(gif_frame)

# Save Master Board GIF with duration 2200ms per frame
frames[0].save(
    "frames/master_board_mobile_4steps.gif",
    save_all=True,
    append_images=frames[1:],
    duration=2200,
    loop=0,
    optimize=True
)
print("Saved frames/master_board_mobile_4steps.gif")

# 4. Generate the dedicated Single Mobile App Walkthrough GIF (Step 1 -> Step 2 -> Step 3 -> Step 4)
print("Generating Single Mobile App Walkthrough GIF...")
mobile_seq = [
    (p_f1, "Step 1: Setup - Team & Schedule"),
    (p_f3, "Step 1: Setup - Desks, Pods & F&B"),
    (p_f4, "Step 2: Approve - AI Match Hub"),
    (p_f5, "Step 2: Approve - Floor Cluster Map"),
    (p_f6, "Step 3: Pay - Cost & Payment Clearance"),
    (p_f7, "Step 3: Pay - Automated Dispatch & Passes"),
    (p_f8, "Step 4: Confirmation - Booking Active & Attendance"),
    (p_f9, "Step 4: Confirmation - Space Heatmap & Upgrade Plan"),
]

mobile_frames = []
for p_img, lbl in mobile_seq:
    # Resize mobile frame for standalone walkthrough gif
    m_w = 480
    m_h = int(p_img.height * (m_w / p_img.width))
    m_resized = p_img.resize((m_w, m_h), Image.Resampling.LANCZOS)
    mobile_frames.append(m_resized)

mobile_frames[0].save(
    "frames/mobile_app_4step_flow.gif",
    save_all=True,
    append_images=mobile_frames[1:],
    duration=2400,
    loop=0,
    optimize=True
)
print("Saved frames/mobile_app_4step_flow.gif")

print("All GIF and image generation completed successfully!")
