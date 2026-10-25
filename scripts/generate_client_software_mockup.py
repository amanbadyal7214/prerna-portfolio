import shutil
import os
from PIL import Image, ImageDraw, ImageFilter

def process_client_software():
    src = 'src/assets/WhatsApp Image 2026-10-17 at 4.46.33 PM.jpeg'
    shutil.copy(src, 'public/images/client_software_full.jpg')
    print('Copied Client Software full image!')

    img = Image.open(src).convert('RGBA')
    w, h = img.size

    # Background is (247, 247, 247).
    # Seed all border pixels for floodfill
    visited = set()
    queue = []
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
                if r >= 240 and g >= 240 and b >= 240:
                    visited.add((nx, ny))
                    queue.append((nx, ny))

    # Feather boundary slightly for anti-aliasing
    mask_blur = mask.filter(ImageFilter.GaussianBlur(radius=0.75))
    img.putalpha(mask_blur)

    # Add realistic soft shadow underneath laptop
    canvas = Image.new('RGBA', (w + 160, h + 100), (0, 0, 0, 0))
    shadow_layer = Image.new('RGBA', (canvas.width, canvas.height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_layer)
    # The laptop base sits towards the lower portion
    s_draw.ellipse([300, 950, 1500, 1150], fill=(0, 0, 0, 150))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=40))
    canvas.alpha_composite(shadow_layer)

    canvas.paste(img, (80, 50), img)

    bbox = canvas.getbbox()
    if bbox:
        cropped = canvas.crop((max(0, bbox[0] - 25), max(0, bbox[1] - 25), min(canvas.width, bbox[2] + 25), min(canvas.height, bbox[3] + 25)))
    else:
        cropped = canvas

    # Resize to standard crisp display size (e.g. width 1080)
    target_w = 1080
    ratio = target_w / cropped.width
    target_h = int(cropped.height * ratio)
    final_mockup = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

    final_mockup.save('public/images/client_software_mockup.png', 'PNG')
    print(f'Saved client_software_mockup.png: size={final_mockup.size}')

    # 2. Generate 16:9 Hero Showcase Banner (1920x1080) for Modal & Project Hero
    W, H = 1920, 1080
    banner = Image.new('RGBA', (W, H), (14, 16, 21, 255))

    # Ambient deep crimson / ruby glow matching the software company brand colors
    bg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    bg_draw.ellipse([500, 100, 1700, 1000], fill=(185, 28, 28, 45))   # crimson glow
    bg_draw.ellipse([900, 250, 1900, 1100], fill=(225, 29, 72, 35))   # rose/ruby glow
    bg_draw.ellipse([100, 500, 700, 1100], fill=(255, 87, 34, 20))
    bg = bg.filter(ImageFilter.GaussianBlur(radius=150))
    banner.alpha_composite(bg)

    # Grid dots
    grid_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(grid_layer)
    for x in range(60, W, 60):
        for y in range(60, H, 60):
            g_draw.ellipse([x, y, x + 2, y + 2], fill=(255, 255, 255, 18))
    banner.alpha_composite(grid_layer)

    # Scale the transparent laptop mockup for 1080p banner (height ~ 720px)
    banner_laptop_h = 740
    ratio_b = banner_laptop_h / final_mockup.height
    banner_laptop_w = int(final_mockup.width * ratio_b)
    laptop_scaled = final_mockup.resize((banner_laptop_w, banner_laptop_h), Image.Resampling.LANCZOS)

    pos_x = (W - banner_laptop_w) // 2
    pos_y = (H - banner_laptop_h) // 2 + 30
    banner.paste(laptop_scaled, (pos_x, pos_y), laptop_scaled)

    banner_rgb = banner.convert('RGB')
    banner_rgb.save('public/images/client_software.jpg', 'JPEG', quality=95)
    banner.save('public/images/client_software_hero.png', 'PNG')
    print('Saved client_software.jpg and client_software_hero.png successfully!')

if __name__ == '__main__':
    process_client_software()
