import shutil
import os
from PIL import Image, ImageDraw, ImageFilter

def process_shehar_ludhiana():
    src = 'src/assets/WhatsApp Image 2026-10-17 at 4.45.47 PM.jpeg'
    shutil.copy(src, 'public/images/shehar_ludhiana_full.jpg')
    print('Copied Shehar Ludhiana full image!')

    img = Image.open(src).convert('RGBA')
    w, h = img.size

    # Background color is (247, 247, 247).
    # We want a clean transparent cutout with anti-aliasing.
    # 1. Floodfill from border to detect background pixels
    visited = set()
    queue = []
    # Seed all border pixels
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))

    for p in queue:
        visited.add(p)

    pixels = img.load()
    mask = Image.new('L', (w, h), 255)
    mask_pixels = mask.load()

    while queue:
        cx, cy = queue.pop(0)
        mask_pixels[cx, cy] = 0
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                r, g, b, _ = pixels[nx, ny]
                # If very close to light background
                if r >= 240 and g >= 240 and b >= 240:
                    visited.add((nx, ny))
                    queue.append((nx, ny))

    # Apply soft anti-aliased edge to mask
    # Feather boundary slightly
    mask_blur = mask.filter(ImageFilter.GaussianBlur(radius=0.75))
    img.putalpha(mask_blur)

    # Add realistic soft shadow underneath the laptop base
    canvas = Image.new('RGBA', (w + 120, h + 80), (0, 0, 0, 0))
    # Draw soft shadow at bottom of laptop
    shadow_layer = Image.new('RGBA', (canvas.width, canvas.height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_layer)
    # The laptop base sits from x=180 to 950, y=520 to 680 (offset by +60, +40)
    s_draw.ellipse([220, 640, 1040, 750], fill=(0, 0, 0, 140))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=30))
    canvas.alpha_composite(shadow_layer)

    # Paste laptop
    canvas.paste(img, (60, 40), img)

    # Crop tight with margin
    bbox = canvas.getbbox()
    if bbox:
        cropped = canvas.crop((max(0, bbox[0] - 20), max(0, bbox[1] - 20), min(canvas.width, bbox[2] + 20), min(canvas.height, bbox[3] + 20)))
    else:
        cropped = canvas

    cropped.save('public/images/shehar_ludhiana_mockup.png', 'PNG')
    print(f'Saved Shehar Ludhiana mockup: size={cropped.size}')

    # 2. Generate 16:9 Hero Showcase Banner (1920x1080) for Modal & Project Hero
    W, H = 1920, 1080
    banner = Image.new('RGBA', (W, H), (14, 16, 21, 255))

    # Ambient warm golden/amber glow matching Ghanta Ghar & Shehar Ludhiana branding
    bg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    bg_draw.ellipse([600, 150, 1700, 1050], fill=(234, 88, 12, 40))   # warm orange/amber
    bg_draw.ellipse([1000, 300, 1900, 1100], fill=(245, 158, 11, 35)) # golden glow
    bg_draw.ellipse([100, 500, 700, 1100], fill=(255, 87, 34, 25))
    bg = bg.filter(ImageFilter.GaussianBlur(radius=150))
    banner.alpha_composite(bg)

    # Grid dots
    grid_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(grid_layer)
    for x in range(60, W, 60):
        for y in range(60, H, 60):
            g_draw.ellipse([x, y, x + 2, y + 2], fill=(255, 255, 255, 18))
    banner.alpha_composite(grid_layer)

    # Scale the transparent laptop mockup to fit nicely in 1080p banner (height ~ 720px)
    target_h = 740
    ratio = target_h / cropped.height
    target_w = int(cropped.width * ratio)
    laptop_scaled = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Center laptop on banner
    pos_x = (W - target_w) // 2
    pos_y = (H - target_h) // 2 + 30
    banner.paste(laptop_scaled, (pos_x, pos_y), laptop_scaled)

    banner_rgb = banner.convert('RGB')
    banner_rgb.save('public/images/shehar_ludhiana.jpg', 'JPEG', quality=95)
    banner.save('public/images/shehar_ludhiana_hero.png', 'PNG')
    print('Saved shehar_ludhiana.jpg and shehar_ludhiana_hero.png successfully!')

if __name__ == '__main__':
    process_shehar_ludhiana()
