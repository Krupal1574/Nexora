from rembg import remove
from PIL import Image

input_path = r'Imagec\Company Logos\pimg.png'
output_path = r'public\images\mission-person.png'

input_img = Image.open(input_path)
output_img = remove(input_img)
output_img.save(output_path)
print("Background removed successfully.")
