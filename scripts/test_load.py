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

# 1. Load captured frames
img_s1_team = Image.open("frames_mobile/step1_team.png")
img_s1_res = Image.open("frames_mobile/step1_resources.png")
img_s2_match = Image.open("frames_mobile/step2_match.png")
img_s2_map = Image.open("frames_mobile/step2_floor_map.png")
img_s3_cost = Image.open("frames_mobile/step3_pay_checkout.png")
img_s3_pay = Image.open("frames_mobile/step3_pay_button.png")

img_db_top = Image.open("frames_mobile/dashboard_mobile_top.png")
img_db_heat = Image.open("frames_mobile/dashboard_mobile_heatmap.png")
img_db_adv = Image.open("frames_mobile/dashboard_mobile_advisory.png")
img_db_tablet = Image.open("frames_mobile/dashboard_tablet.png")

print("Images loaded successfully!")
