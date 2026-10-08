from PIL import Image
import numpy as np

img = Image.open(r'Imagec\Company Logos\pimg.png').convert('RGBA')
data = np.array(img)

# The checkerboard uses two alternating colors (typically ~white and ~light-gray)
# We detect pixels that match the checkerboard pattern and make them transparent.
# Common checkerboard colors: (204,204,204) and (255,255,255), or similar pairs

r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Detect near-gray and near-white pixels that form the checkerboard
# These are pixels where R≈G≈B (grayscale) and are either light gray or white
is_gray = (np.abs(r.astype(int) - g.astype(int)) < 10) & (np.abs(g.astype(int) - b.astype(int)) < 10)
is_light = (r > 180)  # light gray or white

# Create a checkerboard mask based on pixel position
# Checkerboard squares are typically 8x8 or 16x16
# We check if the pixel's grid position matches the expected checkerboard color
h, w = data.shape[:2]

# Try different block sizes
best_mask = None
for block_size in [8, 10, 16, 4, 12]:
    grid_x = (np.arange(w) // block_size) % 2
    grid_y = (np.arange(h) // block_size) % 2
    checker = grid_x[np.newaxis, :] ^ grid_y[:, np.newaxis]
    
    # On checker=0 squares, expect one color; on checker=1, expect another
    c0_pixels = data[checker == 0]
    c1_pixels = data[checker == 1]
    
    # Check only the light/gray pixels
    mask_light_gray = is_gray & is_light
    
    if mask_light_gray.sum() > 0:
        # For checker pattern pixels that are light gray
        c0_vals = data[mask_light_gray & (checker == 0)]
        c1_vals = data[mask_light_gray & (checker == 1)]
        
        if len(c0_vals) > 100 and len(c1_vals) > 100:
            c0_mean = c0_vals[:, :3].mean(axis=0)
            c1_mean = c1_vals[:, :3].mean(axis=0)
            
            # If the two checker regions have noticeably different brightness, it's a checkerboard
            diff = abs(c0_mean.mean() - c1_mean.mean())
            if diff > 15:
                print(f"Detected checkerboard with block_size={block_size}, color diff={diff:.1f}")
                print(f"  Color 0 mean: {c0_mean}")
                print(f"  Color 1 mean: {c1_mean}")
                best_mask = mask_light_gray
                break

if best_mask is not None:
    # Make all checkerboard pixels transparent
    data[best_mask, 3] = 0
    print(f"Made {best_mask.sum()} pixels transparent")
else:
    # Fallback: just make all light grayish pixels transparent
    # This is less precise but should work for most checkerboard images
    mask = is_gray & is_light
    data[mask, 3] = 0
    print(f"Fallback: made {mask.sum()} light gray pixels transparent")

result = Image.fromarray(data)
result.save(r'public\images\mission-person.png')
print("Saved cleaned image to public/images/mission-person.png")
