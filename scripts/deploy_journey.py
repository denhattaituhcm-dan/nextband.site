import os
from PIL import Image

def deploy_journey_images():
    # We will use the perfected option_purple_pink / fuchsia pink-purple
    chosen_preview = "C:/Users/Admin/.gemini/antigravity/brain/722f517e-f510-46ec-9bf0-2a77c681dad6/option_purple_pink.png"
    img = Image.open(chosen_preview).convert('RGB')

    targets = [
        ("nextband/public/your-journey.png", "PNG", {}),
        ("nextband/public/your-journey.webp", "WEBP", {"quality": 95, "method": 6}),
        ("nextband/dist/your-journey.png", "PNG", {}),
        ("nextband/dist/your-journey.webp", "WEBP", {"quality": 95, "method": 6}),
        ("nextband/public/tinified/your-journey.png", "PNG", {}),
        ("nextband/dist/tinified/your-journey.png", "PNG", {}),
    ]

    for target_path, fmt, kwargs in targets:
        os.makedirs(os.path.dirname(target_path), exist_ok=True)
        img.save(target_path, fmt, **kwargs)
        print(f"Updated: {target_path} ({fmt})")

if __name__ == '__main__':
    deploy_journey_images()
