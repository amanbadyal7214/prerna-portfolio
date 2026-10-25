import shutil
import os
from PIL import Image, ImageDraw, ImageFilter

def run():
    src1 = 'src/assets/d48c744c348b25ef3bfedcd07eeeeb1ea9010af3.png'
    src2 = 'src/assets/9978d4f1e8158f945aad668151bcd8d92bdb5c39.png'

    shutil.copy(src1, 'public/images/whatscookin_onboarding.png')
    shutil.copy(src2, 'public/images/whatscookin_recipes.png')
    print('Copied Whats Cookin source images!')

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

    onboard_img = Image.open('public/images/whatscookin_onboarding.png').convert('RGBA')
    recipes_img = Image.open('public/images/whatscookin_recipes.png').convert('RGBA')

    # Resize recipes_img height to match onboard_img if slight difference (955 vs 956)
    if recipes_img.size != onboard_img.size:
        recipes_img = recipes_img.resize(onboard_img.size, Image.Resampling.LANCZOS)

    phone_onboard = create_phone_frame(onboard_img)
    phone_recipes = create_phone_frame(recipes_img)

    # In reference design (project_card_2_ref.png):
    # Left phone is Onboarding ("Discover Delicious Recipes"), tilted ~ -12.5 degrees.
    # Right phone is Recipes (Chef with menu), tilted ~ -12.5 degrees, in front and offset right & down.
    angle = -12.5

    shadow_pad = 40
    shadow = Image.new('RGBA', (phone_recipes.width + shadow_pad * 2, phone_recipes.height + shadow_pad * 2), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle(
        [shadow_pad, shadow_pad, shadow_pad + phone_recipes.width, shadow_pad + phone_recipes.height],
        radius=44,
        fill=(0, 0, 0, 160)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=22))

    big_canvas = Image.new('RGBA', (1400, 1300), (0, 0, 0, 0))
    rot_onboard = phone_onboard.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    rot_recipes = phone_recipes.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    rot_shadow = shadow.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)

    pos_back_x = 100
    pos_back_y = 120
    big_canvas.paste(rot_onboard, (pos_back_x, pos_back_y), rot_onboard)

    pos_front_x = 320
    pos_front_y = 210
    big_canvas.paste(rot_shadow, (pos_front_x - shadow_pad + 10, pos_front_y - shadow_pad + 15), rot_shadow)
    big_canvas.paste(rot_recipes, (pos_front_x, pos_front_y), rot_recipes)

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

    final_mockup.save('public/images/whatscookin_phones_transparent.png', 'PNG')
    final_mockup.save('public/images/whatscookin_mockup_clean.png', 'PNG')
    print(f'Saved Whats Cookin transparent mockup: size={final_mockup.size}')

    # 3. Create 16:9 Hero Showcase Banner (1920x1080) for Modal
    W, H = 1920, 1080
    banner = Image.new('RGBA', (W, H), (14, 16, 21, 255))

    # Ambient culinary warm amber / golden glow (#f59e0b, #ea580c)
    bg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    bg_draw.ellipse([800, 100, 1800, 1100], fill=(245, 158, 11, 40))  # golden amber
    bg_draw.ellipse([500, 250, 1500, 1050], fill=(234, 88, 12, 35))   # orange glow
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
    scale_factor = target_ph_h / phone_onboard.height
    target_ph_w = int(phone_onboard.width * scale_factor)

    p1 = phone_onboard.resize((target_ph_w, target_ph_h), Image.Resampling.LANCZOS)
    p2 = phone_recipes.resize((target_ph_w, target_ph_h), Image.Resampling.LANCZOS)

    p_shadow = Image.new('RGBA', (target_ph_w + 60, target_ph_h + 60), (0, 0, 0, 0))
    ps_draw = ImageDraw.Draw(p_shadow)
    ps_draw.rounded_rectangle([30, 30, target_ph_w + 30, target_ph_h + 30], radius=44, fill=(0, 0, 0, 180))
    p_shadow = p_shadow.filter(ImageFilter.GaussianBlur(radius=28))

    banner.paste(p_shadow, (560 - 30 + 15, 160 - 30 + 25), p_shadow)
    banner.paste(p1, (560, 160), p1)

    banner.paste(p_shadow, (980 - 30 + 20, 140 - 30 + 30), p_shadow)
    banner.paste(p2, (980, 140), p2)

    banner_rgb = banner.convert('RGB')
    banner_rgb.save('public/images/whatscookin.jpg', 'JPEG', quality=95)
    banner.save('public/images/whatscookin_hero.png', 'PNG')
    print('Saved whatscookin.jpg and whatscookin_hero.png successfully!')

if __name__ == '__main__':
    run()
