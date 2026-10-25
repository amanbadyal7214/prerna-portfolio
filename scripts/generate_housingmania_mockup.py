import os
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import math

def create_phone_frame(screen_img, bezel_width=10, corner_radius=46, border_color=(28, 28, 30, 255), outer_border=(60, 60, 65, 255)):
    """
    Takes an RGBA screen image and wraps it in a modern sleek smartphone bezel.
    """
    sw, sh = screen_img.size
    
    # Scale up for high-quality anti-aliasing
    scale = 2
    sw_s = sw * scale
    sh_s = sh * scale
    bw_s = bezel_width * scale
    cr_s = corner_radius * scale
    
    screen_scaled = screen_img.resize((sw_s, sh_s), Image.Resampling.LANCZOS)
    
    # Create mask for rounded screen corners
    screen_mask = Image.new('L', (sw_s, sh_s), 0)
    mask_draw = ImageDraw.Draw(screen_mask)
    mask_draw.rounded_rectangle([0, 0, sw_s, sh_s], radius=cr_s - (bw_s // 2), fill=255)
    
    # Apply rounded mask to screen
    screen_rounded = Image.new('RGBA', (sw_s, sh_s), (0, 0, 0, 0))
    screen_rounded.paste(screen_scaled, (0, 0), screen_mask)
    
    # Full phone dimensions
    pw_s = sw_s + 2 * bw_s
    ph_s = sh_s + 2 * bw_s
    
    phone = Image.new('RGBA', (pw_s, ph_s), (0, 0, 0, 0))
    phone_draw = ImageDraw.Draw(phone)
    
    # Outer bezel chassis with rounded rectangle
    phone_draw.rounded_rectangle(
        [0, 0, pw_s, ph_s],
        radius=cr_s,
        fill=border_color,
        outline=outer_border,
        width=int(2 * scale)
    )
    
    # Paste the screen in the center
    phone.paste(screen_rounded, (bw_s, bw_s), screen_rounded)
    
    # Downscale with antialiasing
    phone = phone.resize((pw_s // scale, ph_s // scale), Image.Resampling.LANCZOS)
    return phone

def create_dual_phone_mockup():
    home_img = Image.open('public/images/housingmania_home.png').convert('RGBA')
    reviews_img = Image.open('public/images/housingmania_reviews.png').convert('RGBA')
    
    # Build framed phones
    # HousingMania screens are 393 x 852
    phone_home = create_phone_frame(home_img, bezel_width=11, corner_radius=44, border_color=(20, 22, 26, 255), outer_border=(70, 75, 82, 255))
    phone_reviews = create_phone_frame(reviews_img, bezel_width=11, corner_radius=44, border_color=(20, 22, 26, 255), outer_border=(70, 75, 82, 255))
    
    # In reference design (project_card_1_ref.png):
    # Left phone is reviews, rotated ~ -13 degrees.
    # Right phone is home, rotated ~ -13 degrees, placed in front and offset to the right and down slightly.
    angle = -12.5
    
    # Create soft drop shadow for front phone
    shadow_pad = 40
    shadow = Image.new('RGBA', (phone_home.width + shadow_pad * 2, phone_home.height + shadow_pad * 2), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle(
        [shadow_pad, shadow_pad, shadow_pad + phone_home.width, shadow_pad + phone_home.height],
        radius=44,
        fill=(0, 0, 0, 160)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=22))
    
    # Canvas size for the dual mockup
    canvas_w = 900
    canvas_h = 1000
    
    # Rotate phones and shadows with high-quality resampling
    # We will assemble them on a larger canvas then crop to bounds
    big_canvas = Image.new('RGBA', (1400, 1300), (0, 0, 0, 0))
    
    # Rotate back phone (reviews)
    rot_reviews = phone_reviews.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    
    # Rotate front phone and its shadow
    rot_home = phone_home.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    rot_shadow = shadow.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    
    # Paste back phone (reviews)
    pos_back_x = 100
    pos_back_y = 120
    big_canvas.paste(rot_reviews, (pos_back_x, pos_back_y), rot_reviews)
    
    # Paste shadow for front phone
    pos_front_x = 320
    pos_front_y = 210
    # Shadow offset
    big_canvas.paste(rot_shadow, (pos_front_x - shadow_pad + 10, pos_front_y - shadow_pad + 15), rot_shadow)
    
    # Paste front phone (home)
    big_canvas.paste(rot_home, (pos_front_x, pos_front_y), rot_home)
    
    # Crop to content bounding box
    bbox = big_canvas.getbbox()
    if bbox:
        # Give a small margin
        margin = 10
        crop_box = (
            max(0, bbox[0] - margin),
            max(0, bbox[1] - margin),
            min(big_canvas.width, bbox[2] + margin),
            min(big_canvas.height, bbox[3] + margin)
        )
        cropped = big_canvas.crop(crop_box)
    else:
        cropped = big_canvas
        
    # Resize to standard mockup display size (e.g., width 560 for sharp retina display)
    target_width = 580
    ratio = target_width / cropped.width
    target_height = int(cropped.height * ratio)
    final_mockup = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    final_mockup.save('public/images/housingmania_mockup_clean.png', 'PNG')
    final_mockup.save('public/images/housingmania_phones_transparent.png', 'PNG')
    print(f'Saved mockup transparent: size={final_mockup.size}')

def create_hero_banner():
    # 16:9 banner for project detail modal and showcase: 1920x1080
    W, H = 1920, 1080
    banner = Image.new('RGBA', (W, H), (14, 16, 21, 255))
    
    # Draw subtle modern background gradient / glows matching teal accent
    bg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    
    # Ambient teal / cyan glow on top left
    bg_draw.ellipse([800, 100, 1800, 1100], fill=(0, 131, 143, 45))
    # Ambient warm glow
    bg_draw.ellipse([100, 600, 800, 1300], fill=(255, 87, 34, 25))
    
    bg = bg.filter(ImageFilter.GaussianBlur(radius=140))
    banner.alpha_composite(bg)
    
    # Draw subtle grid dots
    grid_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(grid_layer)
    for x in range(60, W, 60):
        for y in range(60, H, 60):
            g_draw.ellipse([x, y, x + 2, y + 2], fill=(255, 255, 255, 18))
    banner.alpha_composite(grid_layer)
    
    # Load screens and create framed phones
    home_img = Image.open('public/images/housingmania_home.png').convert('RGBA')
    reviews_img = Image.open('public/images/housingmania_reviews.png').convert('RGBA')
    
    # Scale screens up nicely for banner
    phone_home = create_phone_frame(home_img, bezel_width=12, corner_radius=44, border_color=(20, 22, 26, 255), outer_border=(75, 82, 92, 255))
    phone_reviews = create_phone_frame(reviews_img, bezel_width=12, corner_radius=44, border_color=(20, 22, 26, 255), outer_border=(75, 82, 92, 255))
    
    # Rescale phones to fit comfortably in the 1080p banner (height ~ 780px)
    target_ph_h = 780
    scale_factor = target_ph_h / phone_home.height
    target_ph_w = int(phone_home.width * scale_factor)
    
    p1 = phone_reviews.resize((target_ph_w, target_ph_h), Image.Resampling.LANCZOS)
    p2 = phone_home.resize((target_ph_w, target_ph_h), Image.Resampling.LANCZOS)
    
    # Left phone shadow
    p_shadow = Image.new('RGBA', (target_ph_w + 60, target_ph_h + 60), (0, 0, 0, 0))
    ps_draw = ImageDraw.Draw(p_shadow)
    ps_draw.rounded_rectangle([30, 30, target_ph_w + 30, target_ph_h + 30], radius=44, fill=(0, 0, 0, 180))
    p_shadow = p_shadow.filter(ImageFilter.GaussianBlur(radius=28))
    
    # Position both phones side-by-side gracefully tilted or upright
    # Let's position Phone 1 (Reviews) at x=560, y=160
    # Phone 2 (Home) at x=980, y=140 with slight elevation
    banner.paste(p_shadow, (560 - 30 + 15, 160 - 30 + 25), p_shadow)
    banner.paste(p1, (560, 160), p1)
    
    banner.paste(p_shadow, (980 - 30 + 20, 140 - 30 + 30), p_shadow)
    banner.paste(p2, (980, 140), p2)
    
    # Save as high quality JPEG and PNG
    banner_rgb = banner.convert('RGB')
    banner_rgb.save('public/images/housingmania.jpg', 'JPEG', quality=95)
    banner.save('public/images/housingmania_hero.png', 'PNG')
    print('Saved housingmania.jpg & housingmania_hero.png successfully!')

if __name__ == '__main__':
    create_dual_phone_mockup()
    create_hero_banner()
