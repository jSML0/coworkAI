import os
from PIL import Image, ImageDraw, ImageFont

FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REG = "C:/Windows/Fonts/segoeui.ttf"
FONT_SEMI = "C:/Windows/Fonts/seguisb.ttf" if os.path.exists("C:/Windows/Fonts/seguisb.ttf") else FONT_BOLD

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

# Load mobile dashboard frames
f_top = Image.open("frames_mobile/dashboard_mobile_top.png")
f_heat = Image.open("frames_mobile/dashboard_mobile_heatmap.png")
f_adv = Image.open("frames_mobile/dashboard_mobile_advisory.png")

# Create framed animated gif of dashboard scrolling through the boxes
device_flow = [
    (f_top, 2400, "Dashboard: Attendance & Live IoT Check-In (100% Pax)"),
    (f_heat, 2400, "Dashboard: Utilization Heatmap (95% Room, 92% Desks)"),
    (f_adv, 2600, "Dashboard: AI Space Advisory & Upgrade Recommendation (Save $640/mo)"),
]

device_frames = []
durations = []

for img, dur, lbl in device_flow:
    w = 520
    h = int(img.height * (w / img.width))
    resized = img.resize((w, h), Image.Resampling.LANCZOS)
    device_frames.append(resized)
    durations.append(dur)

device_frames[0].save(
    "frames/dashboard_mobile_framed_flow.gif",
    save_all=True,
    append_images=device_frames[1:],
    duration=durations,
    loop=0,
    optimize=True
)
print("Saved frames/dashboard_mobile_framed_flow.gif")
