import os
import math
from PIL import Image, ImageDraw, ImageFont

def create_updated_journey():
    # Load original image
    src_path = 'nextband/public/your-journey.png'
    orig = Image.open(src_path).convert('RGBA')
    W, H = orig.size

    # We will work at 4x supersampling for ultra-crisp vector-quality rendering
    SCALE = 4
    canvas = orig.resize((W * SCALE, H * SCALE), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(canvas)

    # Let's inspect the background below y=730 in original (which is y=730*SCALE in canvas)
    # The background is a clean cream color (252, 248, 243)
    bg_color = (252, 248, 243, 255)

    # Clean the bottom timeline area from y = 738*SCALE downwards, keeping shoe tips intact
    # We create an overlay to cleanly redraw the timeline
    # First, fill the bottom area below y=758*SCALE completely, and carefully clean y=738..758 except around shoes (x=1300..1440)
    
    # We can fill the bounding box of the old circles and old text
    # Old circles: y in [734..790]*SCALE
    # Old text: y in [810..880]*SCALE
    # Fill background for the timeline band:
    for x_orig, y_orig, w_box, h_box in [
        # Circle 1 + text
        (130, 730, 130, 180),
        # Circle 2 + text
        (410, 730, 140, 180),
        # Circle 3 + text
        (730, 730, 140, 180),
        # Circle 4 + text
        (1060, 730, 140, 180),
        # Circle 5 + text (circle starts at x=1440, shoes are at x=1300..1435)
        (1440, 730, 140, 180),
        # Horizontal lines between circles
        (40, 755, 120, 15),
        (230, 755, 200, 15),
        (520, 755, 230, 15),
        (840, 755, 240, 15),
        (1170, 755, 280, 15),
        (1530, 755, 130, 15),
        # Entire bottom strip below y=800
        (0, 800, W, 129)
    ]:
        x1 = x_orig * SCALE
        y1 = y_orig * SCALE
        x2 = (x_orig + w_box) * SCALE
        y2 = (y_orig + h_box) * SCALE
        draw.rectangle([x1, y1, x2, y2], fill=bg_color)

    # System fonts
    font_bold_path = "C:/Windows/Fonts/segoeuib.ttf"
    font_semi_path = "C:/Windows/Fonts/seguisb.ttf"
    font_reg_path = "C:/Windows/Fonts/segoeui.ttf"
    font_arialbd = "C:/Windows/Fonts/arialbd.ttf"

    # Fonts at SCALE=4
    title_font = ImageFont.truetype(font_bold_path, 23 * SCALE)
    band_label_font = ImageFont.truetype(font_bold_path, 15 * SCALE)
    band_num_font = ImageFont.truetype(font_bold_path, 26 * SCALE)
    circle_num_font = ImageFont.truetype(font_bold_path, 25 * SCALE)

    # Stages definition
    # Circle centers in original coordinates:
    # 1: 189.5, 2: 476.5, 3: 794.5, 4: 1126.5, 5: 1485.5
    # Y center: 762
    CY = 762 * SCALE
    RADIUS = 26 * SCALE
    LINE_WIDTH = int(2.5 * SCALE)
    DOT_RADIUS = int(4.5 * SCALE)

    stages = [
        {
            "num": "1",
            "cx": 189.5 * SCALE,
            "title": "Starter",
            "band_num": "3.0",
            # Hồng hơi tím (Pinkish purple / Magenta orchid)
            "color": (214, 55, 140, 255),       # #D6378C
            "text_color": (195, 35, 120, 255),  # deep pink-purple
            "badge_bg": (253, 242, 248, 255),   # light pink-purple tint
            "badge_border": (244, 114, 182, 255)
        },
        {
            "num": "2",
            "cx": 476.5 * SCALE,
            "title": "Dreamer",
            "band_num": "4.0",
            # Blue
            "color": (45, 130, 215, 255),       # #2D82D7
            "text_color": (25, 110, 195, 255),  # deep blue
            "badge_bg": (239, 246, 255, 255),
            "badge_border": (96, 165, 250, 255)
        },
        {
            "num": "3",
            "cx": 794.5 * SCALE,
            "title": "Builder",
            "band_num": "5.0",
            # Emerald Green
            "color": (40, 155, 110, 255),       # #289B6E
            "text_color": (25, 130, 90, 255),   # deep green
            "badge_bg": (236, 253, 245, 255),
            "badge_border": (52, 211, 153, 255)
        },
        {
            "num": "4",
            "cx": 1126.5 * SCALE,
            "title": "Master",
            "band_num": "6.0",
            # Warm Amber / Orange
            "color": (238, 135, 34, 255),       # #EE8722
            "text_color": (215, 105, 15, 255),  # deep amber orange
            "badge_bg": (255, 251, 235, 255),
            "badge_border": (251, 191, 36, 255)
        },
        {
            "num": "5",
            "cx": 1485.5 * SCALE,
            "title": "Leader",
            "band_num": "6.5+",
            # Crimson Red
            "color": (218, 55, 48, 255),        # #DA3730
            "text_color": (195, 38, 30, 255),   # deep red
            "badge_bg": (254, 242, 242, 255),
            "badge_border": (248, 113, 113, 255)
        }
    ]

    # Draw Connecting Lines and Intermediate Dots
    # 1. Line from x=50 to Circle 1
    draw.line([(50 * SCALE, CY), (stages[0]["cx"] - RADIUS, CY)], fill=stages[0]["color"], width=LINE_WIDTH)

    # 2. Lines between circles
    dots_x = [333.0 * SCALE, 635.5 * SCALE, 960.5 * SCALE, 1306.0 * SCALE]
    for i in range(4):
        c1 = stages[i]
        c2 = stages[i+1]
        mid_dot_x = dots_x[i]
        
        # Segment 1: from circle i right edge to mid dot
        draw.line([(c1["cx"] + RADIUS, CY), (mid_dot_x, CY)], fill=c1["color"], width=LINE_WIDTH)
        # Segment 2: from mid dot to circle i+1 left edge
        draw.line([(mid_dot_x, CY), (c2["cx"] - RADIUS, CY)], fill=c2["color"], width=LINE_WIDTH)
        # Intermediate dot
        draw.ellipse([mid_dot_x - DOT_RADIUS, CY - DOT_RADIUS, mid_dot_x + DOT_RADIUS, CY + DOT_RADIUS], fill=c1["color"])

    # 3. Arrow after Circle 5
    arrow_start_x = stages[4]["cx"] + RADIUS
    arrow_end_x = 1640 * SCALE
    draw.line([(arrow_start_x, CY), (arrow_end_x, CY)], fill=stages[4]["color"], width=LINE_WIDTH)
    # Arrow head
    arrow_size = 8 * SCALE
    draw.polygon([
        (arrow_end_x, CY),
        (arrow_end_x - arrow_size, CY - arrow_size * 0.6),
        (arrow_end_x - arrow_size * 0.7, CY),
        (arrow_end_x - arrow_size, CY + arrow_size * 0.6)
    ], fill=stages[4]["color"])

    # Draw Circles & Text for each stage
    for s in stages:
        cx = s["cx"]
        # Outer subtle soft ring or solid circle
        draw.ellipse([cx - RADIUS, CY - RADIUS, cx + RADIUS, CY + RADIUS], fill=s["color"])
        
        # Draw number '1'..'5' in circle
        num_str = s["num"]
        bbox_num = circle_num_font.getbbox(num_str)
        nw = bbox_num[2] - bbox_num[0]
        nh = bbox_num[3] - bbox_num[1]
        # Center text precisely
        draw.text((cx - nw / 2 - bbox_num[0], CY - nh / 2 - bbox_num[1] - 1 * SCALE), num_str, fill=(255, 255, 255, 255), font=circle_num_font)

        # Stage Name: "Starter", "Dreamer", etc.
        title_str = s["title"]
        bbox_title = title_font.getbbox(title_str)
        tw = bbox_title[2] - bbox_title[0]
        title_y = (762 + 48) * SCALE # around y=810 in original
        draw.text((cx - tw / 2 - bbox_title[0], title_y), title_str, fill=(26, 32, 44, 255), font=title_font)

        # "Band" + Number: "Band 3.0"
        # The user requested: "cái số đằng sau mỗi chữ Band nên ghi to hơn và ấn tượng hơn"
        band_word = "Band "
        num_word = s["band_num"]

        bbox_b = band_label_font.getbbox(band_word)
        bw = bbox_b[2] - bbox_b[0]

        bbox_n = band_num_font.getbbox(num_word)
        nw = bbox_n[2] - bbox_n[0]

        gap = 4 * SCALE
        total_w = bw + gap + nw
        start_x = cx - total_w / 2

        band_y = title_y + (28 * SCALE)

        # Baseline alignment for "Band" and "3.0"
        # "3.0" is taller, so align baselines
        # bbox height difference
        b_h = bbox_b[3] - bbox_b[1]
        n_h = bbox_n[3] - bbox_n[1]
        diff = n_h - b_h

        # Draw "Band"
        draw.text((start_x - bbox_b[0], band_y + diff - 1 * SCALE), band_word, fill=s["text_color"], font=band_label_font)
        # Draw "3.0" (prominently larger & bolder)
        draw.text((start_x + bw + gap - bbox_n[0], band_y), num_word, fill=s["text_color"], font=band_num_font)

    # Downsample back to original dimensions with high-quality Lanczos resampling
    final_img = canvas.resize((W, H), Image.Resampling.LANCZOS)
    return final_img

if __name__ == '__main__':
    res = create_updated_journey()
    output_dir = "C:/Users/Admin/.gemini/antigravity/brain/722f517e-f510-46ec-9bf0-2a77c681dad6"
    res.save(os.path.join(output_dir, "preview_journey.png"))
    print("Saved preview_journey.png successfully!")
