## Didn't Work
# import cv2
# import numpy as np

# icon_names = ['favour', 'food', 'gold', 'population', 'time', 'wood']

# for icon_name in icon_names:
#     img = cv2.imread(f'images/sub_img_icons/{icon_name}_icon.png')

#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#     _, mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)

#     result = img.copy()
#     result = cv2.cvtColor(result, cv2.COLOR_BGR2BGRA)
#     result[:,:,3] = mask

#     cv2.imwrite(f'images/sub_img_icons/{icon_name}_icon_no_bg.png', result)

from rembg import remove
from PIL import Image
import bz2

# input_path = 'path/to/your/input_image.png'  # Replace with your image path
# output_path = 'path/to/your/output_image_no_bg.png' # Desired output path

input_path = 'image/sub_img_icons/population_icon.png'  # Replace with your image path
output_path = 'image/sub_img_icons/population_icon_no-bg2.png' # Desired output path

with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input_image_data = i.read()
        output_image_data = remove(input_image_data)
        o.write(output_image_data)

