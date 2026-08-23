import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def render_timeline(starter_color, band_style, filename):
    src_path = 'nextband/public/your-journey.png'
    orig = Image.open(src_path).convert('RGBA')
    W, H = orig.size
    SCALE = 4

    font_bold_path = "C:/Windows/Fonts/segoeuib.ttf"
    font_semi_path = "C:/Windows/Fonts/seguisb.ttf"
    font_reg_path = "C:/Windows/Fonts/segoeui.ttf"
    font_arialbd = "C:/Windows/Fonts/arialbd.ttf"

    bg_color = (252, 248, 243, 255)

    stages = [
        {
            "num": "1",
            "cx": 189.5 * SCALE,
            "title": "Starter",
            "band_num": "3.0",
            # Hồng hơi tím
            "color": starter_color["circle"],
            "text_color": starter_color["text"],
        },
        {
            "num": "2",
            "cx": 476.5 * SCALE,
            "title": "Dreamer",
            "band_num": "4.0",
            # Blue
            "color": (37, 130, 215, 255),       # #2582D7
            "text_color": (20, 110, 195, 255),  # deep blue
        },
        {
            "num": "3",
            "cx": 794.5 * SCALE,
            "title": "Builder",
            "band_num": "5.0",
            # Green
            "color": (40, 155, 110, 255),       # #289B6E
            "text_color": (22, 135, 90, 255),   # deep emerald
        },
        {
            "num": "4",
            "cx": 1126.5 * SCALE,
            "title": "Master",
            "band_num": "6.0",
            # Orange
            "color": (238, 135, 34, 255),       # #EE8722
            "text_color": (215, 100, 10, 255),  # deep orange
        },
        {
            "num": "5",
            "cx": 1485.5 * SCALE,
            "title": "Leader",
            "band_num": "6.5+",
            # Red
            "color": (220, 52, 45, 255),        # #DC342D
            "text_color": (195, 32, 25, 255),   # deep red
        }
    ]

    CY = 762 * SCALE
    RADIUS = 26 * SCALE
    LINE_WIDTH = int(2.5 * SCALE)
    DOT_RADIUS = int(4.5 * SCALE)

    canvas = orig.resize((W * SCALE, H * SCALE), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(canvas)

    # 1. Pixel-perfect clearing of previous timeline:
    # For x < 1320 or x > 1445: clear from y = 730 down to H
    draw.rectangle([0, int(730 * SCALE), int(1320 * SCALE), H * SCALE], fill=bg_color)
    draw.rectangle([int(1445 * SCALE), int(730 * SCALE), W * SCALE, H * SCALE], fill=bg_color)
    # Under shoes (x in 1320..1445): clear from y = 757 down to H
    draw.rectangle([int(1320 * SCALE), int(757 * SCALE), int(1445 * SCALE), H * SCALE], fill=bg_color)

    # 2. Draw connecting lines
    # From x=50 to Circle 1
    draw.line([(50 * SCALE, CY), (stages[0]["cx"] - RADIUS, CY)], fill=stages[0]["color"], width=LINE_WIDTH)

    # Lines between circles
    dots_x = [333.0 * SCALE, 635.5 * SCALE, 960.5 * SCALE, 1306.0 * SCALE]
    for i in range(4):
        c1 = stages[i]
        c2 = stages[i+1]
        mid_dot_x = dots_x[i]
        draw.line([(c1["cx"] + RADIUS, CY), (mid_dot_x, CY)], fill=c1["color"], width=LINE_WIDTH)
        draw.line([(mid_dot_x, CY), (c2["cx"] - RADIUS, CY)], fill=c2["color"], width=LINE_WIDTH)
        draw.ellipse([mid_dot_x - DOT_RADIUS, CY - DOT_RADIUS, mid_dot_x + DOT_RADIUS, CY + DOT_RADIUS], fill=c1["color"])

    # Arrow after Circle 5
    arrow_start_x = stages[4]["cx"] + RADIUS
    arrow_end_x = 1640 * SCALE
    draw.line([(arrow_start_x, CY), (arrow_end_x, CY)], fill=stages[4]["color"], width=LINE_WIDTH)
    arrow_size = 9 * SCALE
    draw.polygon([
        (arrow_end_x, CY),
        (arrow_end_x - arrow_size, CY - arrow_size * 0.55),
        (arrow_end_x - arrow_size * 0.65, CY),
        (arrow_end_x - arrow_size, CY + arrow_size * 0.55)
    ], fill=stages[4]["color"])

    # 3. Fonts
    title_font = ImageFont.truetype(font_bold_path, 23 * SCALE)
    circle_num_font = ImageFont.truetype(font_bold_path, 25 * SCALE)

    band_label_font = ImageFont.truetype(font_bold_path, 15 * SCALE)
    band_num_font = ImageFont.truetype(font_bold_path, 30 * SCALE)

    # 4. Draw each stage
    for s in stages:
        cx = s["cx"]
        # Circle badge
        draw.ellipse([cx - RADIUS, CY - RADIUS, cx + RADIUS, CY + RADIUS], fill=s["color"])
        
        # Circle number '1'..'5'
        num_str = s["num"]
        bbox_num = circle_num_font.getbbox(num_str)
        nw = bbox_num[2] - bbox_num[0]
        nh = bbox_num[3] - bbox_num[1]
        draw.text((cx - nw / 2 - bbox_num[0], CY - nh / 2 - bbox_num[1] - 1 * SCALE), num_str, fill=(255, 255, 255, 255), font=circle_num_font)

        # Stage Name: "Starter", "Dreamer", "Builder", "Master", "Leader"
        title_str = s["title"]
        bbox_title = title_font.getbbox(title_str)
        tw = bbox_title[2] - bbox_title[0]
        title_y = (762 + 48) * SCALE
        draw.text((cx - tw / 2 - bbox_title[0], title_y), title_str, fill=(15, 23, 42, 255), font=title_font)

        # Band label + Large prominent number
        band_word = "Band "
        num_word = s["band_num"]

        bbox_b = band_label_font.getbbox(band_word)
        bw = bbox_b[2] - bbox_b[0]
        bh = bbox_b[3] - bbox_b[1]

        bbox_n = band_num_font.getbbox(num_word)
        nw = bbox_n[2] - bbox_n[0]
        nh = bbox_n[3] - bbox_n[1]

        gap = 5 * SCALE
        total_w = bw + gap + nw
        start_x = cx - total_w / 2
        band_y = title_y + (30 * SCALE)
        diff = nh - bh

        # "Band" label
        draw.text((start_x - bbox_b[0], band_y + diff - 1 * SCALE), band_word, fill=s["text_color"], font=band_label_font)
        # Bold impressive number
        draw.text((start_x + bw + gap - bbox_n[0], band_y), num_word, fill=s["text_color"], font=band_num_font)

    final_img = canvas.resize((W, H), Image.Resampling.LANCZOS)
    final_img.save(filename)
    print(f"Saved {filename}")

if __name__ == '__main__':
    out_dir = "C:/Users/Admin/.gemini/antigravity/brain/722f517e-f510-46ec-9bf0-2a77c681dad6"
    # Option A: Fuchsia/Pink-purple (#D946EF / #C026D3)
    render_timeline(
        {"circle": (205, 50, 160, 255), "text": (180, 25, 135, 255)},
        "clean_large",
        os.path.join(out_dir, "option_fuchsia.png")
    )
    # Option B: Magenta-rose/Hồng ánh tím (#D43A94 / #BC1E78)
    render_timeline(
        {"circle": (216, 58, 148, 255), "text": (190, 30, 120, 255)},
        "clean_large",
        os.path.join(out_dir, "option_magenta_rose.png")
    )
    # Option C: Purple-pink / Hồng tím quý phái (#B83280 / #9D174D)
    render_timeline(
        {"circle": (195, 45, 145, 255), "text": (170, 20, 120, 255)},
        "clean_large",
        os.path.join(out_dir, "option_purple_pink.png")
    )
