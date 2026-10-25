import shutil
import os
from PIL import Image, ImageDraw, ImageFilter

def run():
    # 1. Copy files
    src1 = 'src/assets/e98d3535f43fb439c1fc38080f6e7757ea7bbd9d (1).png'
    src2 = 'src/assets/7156bf77ee238bf4871252a908b3268cc0aaa6d3.png'
    
    shutil.copy(src1, 'public/images/rentease_agents.png')
    shutil.copy(src2, 'public/images/rentease_discovery.png')
    print('Copied RentEase images!')

    # Helper: Create phone frame
    def create_phone_frame(screen_img, bezel_width=11, corner_radius=44, border_color=(20, 22, 26, 255), outer_border=(70, 75, 82, 255)):
        sw, sh = screen_img.size
        scale = 2
        sw_s = sw * scale
        sh_s = sh * scale
        bw_s = bezel_width * scale
        cr_s = corner_radius * scale
        
        screen_scaled = screen_img.resize((sw_s, sh_s), Image.Resampling.LANCZOS)
        
        screen_mask = Image.new('L', (sw_s, sh_s), 0)
        mask_draw = ImageDraw.Draw(screen_mask)
        mask_draw.rounded_rectangle([0, 0, sw_s, sh_s], radius=cr_s - (bw_s // 2), fill=255)
        
        screen_rounded = Image.new('RGBA', (sw_s, sh_s), (0, 0, 0, 0))
        screen_rounded.paste(screen_scaled, (0, 0), screen_mask)
        
        pw_s = sw_s + 2 * bw_s
        ph_s = sh_s + 2 * bw_s
        
        phone = Image.new('RGBA', (pw_s, ph_s), (0, 0, 0, 0))
        phone_draw = ImageDraw.Draw(phone)
        phone_draw.rounded_rectangle(
            [0, 0, pw_s, ph_s],
            radius=cr_s,
            fill=border_color,
            outline=outer_border,
            width=int(2 * scale)
        )
        phone.paste(screen_rounded, (bw_s, bw_s), screen_rounded)
        return phone.resize((pw_s // scale, ph_s // scale), Image.Resampling.LANCZOS)

    agents_img = Image.open('public/images/rentease_agents.png').convert('RGBA')
    discovery_img = Image.open('public/images/rentease_discovery.png').convert('RGBA')

    phone_agents = create_phone_frame(agents_img)
    phone_discovery = create_phone_frame(discovery_img)

    # In reference design (project_card_3_ref.png):
    # Left phone is Agents (blue header), tilted ~ -12.5 degrees.
    # Right phone is Discovery (sky header, New York), tilted ~ -12.5 degrees, in front and offset right & down.
    angle = -12.5

    shadow_pad = 40
    shadow = Image.new('RGBA', (phone_discovery.width + shadow_pad * 2, phone_discovery.height + shadow_pad * 2), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle(
        [shadow_pad, shadow_pad, shadow_pad + phone_discovery.width, shadow_pad + phone_discovery.height],
        radius=44,
        fill=(0, 0, 0, 160)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=22))

    big_canvas = Image.new('RGBA', (1400, 1300), (0, 0, 0, 0))
    rot_agents = phone_agents.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    rot_discovery = phone_discovery.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    rot_shadow = shadow.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)

    pos_back_x = 100
    pos_back_y = 120
    big_canvas.paste(rot_agents, (pos_back_x, pos_back_y), rot_agents)

    pos_front_x = 320
    pos_front_y = 210
    big_canvas.paste(rot_shadow, (pos_front_x - shadow_pad + 10, pos_front_y - shadow_pad + 15), rot_shadow)
    big_canvas.paste(rot_discovery, (pos_front_x, pos_front_y), rot_discovery)

    bbox = big_canvas.getbbox()
    margin = 10
    crop_box = (
        max(0, bbox[0] - margin),
        max(0, bbox[1] - margin),
        min(big_canvas.width, bbox[2] + margin),
        min(big_canvas.height, bbox[3] + margin)
    )
    cropped = big_canvas.crop(crop_box)

    target_width = 580
    ratio = target_width / cropped.width
    target_height = int(cropped.height * ratio)
    final_mockup = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)

    final_mockup.save('public/images/rentease_phones_transparent.png', 'PNG')
    final_mockup.save('public/images/rentease_mockup_clean.png', 'PNG')
    print(f'Saved RentEase transparent mockup: size={final_mockup.size}')

    # 3. Create 16:9 Hero Showcase Banner (1920x1080)
    W, H = 1920, 1080
    banner = Image.new('RGBA', (W, H), (14, 16, 21, 255))
    
    # Ambient royal blue / sky glow matching RentEase primary blue (#2563eb)
    bg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    bg_draw.ellipse([800, 100, 1800, 1100], fill=(37, 99, 235, 45))
    bg_draw.ellipse([100, 600, 800, 1300], fill=(255, 87, 34, 25))
    bg = bg.filter(ImageFilter.GaussianBlur(radius=140))
    banner.alpha_composite(bg)

    # Grid dots
    grid_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(grid_layer)
    for x in range(60, W, 60):
        for y in range(60, H, 60):
            g_draw.ellipse([x, y, x + 2, y + 2], fill=(255, 255, 255, 18))
    banner.alpha_composite(grid_layer)

    target_ph_h = 780
    scale_factor = target_ph_h / phone_agents.height
    target_ph_w = int(phone_agents.width * scale_factor)

    p1 = phone_agents.resize((target_ph_w, target_ph_h), Image.Resampling.LANCZOS)
    p2 = phone_discovery.resize((target_ph_w, target_ph_h), Image.Resampling.LANCZOS)

    p_shadow = Image.new('RGBA', (target_ph_w + 60, target_ph_h + 60), (0, 0, 0, 0))
    ps_draw = ImageDraw.Draw(p_shadow)
    ps_draw.rounded_rectangle([30, 30, target_ph_w + 30, target_ph_h + 30], radius=44, fill=(0, 0, 0, 180))
    p_shadow = p_shadow.filter(ImageFilter.GaussianBlur(radius=28))

    banner.paste(p_shadow, (560 - 30 + 15, 160 - 30 + 25), p_shadow)
    banner.paste(p1, (560, 160), p1)

    banner.paste(p_shadow, (980 - 30 + 20, 140 - 30 + 30), p_shadow)
    banner.paste(p2, (980, 140), p2)

    banner_rgb = banner.convert('RGB')
    banner_rgb.save('public/images/rentease.jpg', 'JPEG', quality=95)
    banner.save('public/images/rentease_hero.png', 'PNG')
    print('Saved rentease.jpg & rentease_hero.png successfully!')

if __name__ == '__main__':
    run()
