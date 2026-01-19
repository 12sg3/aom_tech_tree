# from PIL import Image
# import pytesseract

from PIL import Image
from pytesseract import pytesseract
import cv2
import pandas
import os

DESCRIPTION = 'Description'
NAME = 'Name'
HITPOINTS = 'Hitpoints'
ARMOR = 'Armor'
HACK = 'Hack'
PIERCE = 'Pierce'
CRUSH = 'Crush'
DIVINE = 'Divine'
LINE_OF_SIGHT = 'Line of Sight'
COST = 'Cost'
GOLD = 'Gold'
FOOD = 'Food'
WOOD = 'Wood'
FAVOR = 'Favor'
POP_COST = 'Pop_Cost'
TRAINING_TIME = 'Training_Time'
VELOCITY = 'Velocity'
ATTACK = 'Attack'
ATTACK_TYPE = 'Attack_Type'
RATE_OF_FIRE = 'Rate_of_fire'
MAXIMUM_RANGE = 'Maximum_range'
DAMAGE = 'Damage'
WALL_BREACHING = 'Wall_Breaching'
DIVINE = 'Divine'
BONUS_AGAINST = 'Bonus_against'
BONUS_MULTIPLIER = 'Bonus_Multiplier'

TYPE = 'Type'
TECH = 'tech'
MAJOR_GOD = 'major_god'
MINOR_GOD = 'minor_god'
GOD_POWER = 'god_power'
BUSHIDO_GOD_BLESSING = 'bushido_god_blessing'

# Path to the Tesseract... 
path_to_tesseract = '/home/seb/.pyenv/versions/aom_tech_tree_env/lib/python3.12/site-packages'
# pytesseract....

data_df = pandas.read_csv('Data_Spreadsheet_v1.csv')

keys = data_df.keys()

def extract_text_image(image_path):
    try:
        img = Image.open(image_path)
    
        text = pytesseract.image_to_string(img)
        print(f'text before split: {text}')
        return text

    except FileNotFoundError:
        return "Error: image file not found"
    
    except pytesseract.TesseractNotFoundError:
        return "Error: Tesseract OCR not found please install it"
    except Exception as e:
        return f"An error occured: {e}"
    

dir_path = 'images/text_pics/'
images_to_text_entries = os.listdir(dir_path)
images_to_text_entries.remove('old_desc_cost_only')


max_len = 0
max_len_str = ''
building_error_entries = []

def get_description_from_img(img_name, file_path):
    # global max_len, max_len_str
    print(f'img_name (from desc func): {img_name}')
    # file_path = f'images/text_pics/old_desc_cost_only/basic-desc/{img_name.replace('_', ' ')}'
    text = extract_text_image(file_path)
    extracted_text_split = text.split('\n')
    
    print(f'img_name: {img_name}, extracted_text_split: {extracted_text_split}')

    # print (f'extracted_text_split[4]: {extracted_text_split[4]}')
    desc_str = ''
    for i, entry in enumerate(extracted_text_split):
        print(f'i: {i}, entry: {entry}')
        if len(entry) == 0:
            continue
        if entry[-1] == '.':
            desc_str = entry
            try:
                if entry[0].isupper() and entry != 'Relics.':
                    break
                elif len(extracted_text_split[i - 1]) == 0:
                    if extracted_text_split[i - 2][0].isupper():
                        desc_str = extracted_text_split[i - 2] + extracted_text_split[i - 1] + ' ' + desc_str
                        break
                elif extracted_text_split[i - 1][0].isupper(): ## '' has no char 0
                    desc_str = extracted_text_split[i - 1] + ' ' + desc_str
                    break
                elif extracted_text_split[i - 2][0].isupper():
                    desc_str = extracted_text_split[i - 2] + ' ' + extracted_text_split[i - 1] + ' ' + desc_str
                    break
            except IndexError as e:
                print(f'index error in multi-line desc loop, e: {e}')
                    
    print(f'img_name: {img_name}')   
    print(f'desc_str: {desc_str}')
    if desc_str == '':
        building_error_entries.append(img_name)
    return desc_str

def get_description_from_img_tech(img_name, file_path):
    # global max_len, max_len_str
    print(f'img_name (from desc func): {img_name}')
    print(f'file_path: {file_path}')
    # file_path = f'images/text_pics/old_desc_cost_only/basic-desc/{img_name.replace('_', ' ')}'
    text = extract_text_image(file_path)
    extracted_text_split = text.split('\n')
    
    print(f'img_name: {img_name}, extracted_text_split: {extracted_text_split}')

    # print (f'extracted_text_split[4]: {extracted_text_split[4]}')
    desc_str = ''
    first_blank_line_found = False
    title_found = False
    for i, entry in enumerate(extracted_text_split):
        print(f'i: {i}, entry: {entry}')

        if title_found == False and img_name.replace('-', ' ').replace('.png', '') in entry.lower():
            title_found = True
        elif first_blank_line_found == True and len(entry) > 0 and 'Cost:' not in entry:
            try:
                if entry.strip()[0] == '+':
                    entry = entry.replace('+', '•')
            except IndexError as e:
                print(e)
            desc_str += entry.replace('¢', '•') + '\n'
        elif entry == '':
            first_blank_line_found = True
                    
    print(f'img_name: {img_name}')   
    print(f'desc_str: {desc_str}')
    return desc_str

names = data_df[NAME].values

dir_path_bushido_god_blessing = 'images/text_pics/old_desc_cost_only/basic-desc/bushido-and-god-blessings/'
images_to_text_entries_bushido_god_blessings = os.listdir(dir_path_bushido_god_blessing)


# print(f'images_to_text_entries: {images_to_text_entries}')

new_df_entries = []

for img in images_to_text_entries_bushido_god_blessings:
    # basic_description = get_description_from_img(img, f'images/text_pics/old_desc_cost_only/basic-desc/buildings/{img.replace('_', ' ')}')
    img_file_name = img.replace(' ', '-').replace('_', '-')
    basic_description = get_description_from_img_tech(img_file_name, f'{dir_path_bushido_god_blessing}{img_file_name.replace('_', ' ')}')
    img_name = img.replace('-', ' ').replace('_', '-').replace('.png', '')
    if img_name in names:
        data_df.loc[data_df[NAME] == img_name, DESCRIPTION] = basic_description #img to img_name
        data_df.loc[data_df[NAME] == img_name, TYPE] = BUSHIDO_GOD_BLESSING

    else:
        new_df_entries.append(pandas.DataFrame([{NAME: img_name, DESCRIPTION: basic_description, TYPE: BUSHIDO_GOD_BLESSING}]))

new_df_entries.insert(0, data_df)
data_df = pandas.concat(new_df_entries, ignore_index=True)
    
data_df.to_csv('Data_Spreadsheet_v1.csv', index=False) # Uncomment once new loop is written

failed_desc_list = []

print(f'building_error_entries: {building_error_entries}')
