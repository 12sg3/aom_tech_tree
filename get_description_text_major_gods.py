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
FOCUS = 'Focus'
GOD_OF = 'God_Of'

TYPE = 'Type'
TECH = 'tech'
MAJOR_GOD = 'major_god'


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


def get_description_from_img_major_god(img_name, file_path):
    print(f'img_name (from desc func): {img_name}')
    print(f'file_path: {file_path}')
    text = extract_text_image(file_path)
    extracted_text_split = text.split('\n')
    
    print(f'img_name: {img_name}, extracted_text_split: {extracted_text_split}')

    desc_str = ''
    focus_str = ''
    first_blank_line_found = False
    title_found = False
    focus_found = False
    for i, entry in enumerate(extracted_text_split):
        print(f'i: {i}, entry: {entry}')

        if focus_found == False and 'Focus' in entry:
            focus_found = True
            focus_str = entry
        elif first_blank_line_found == True and len(entry) > 0 and 'Cost:' not in entry:
            try:
                if entry.strip()[0] == '+':
                    entry = entry.replace('+', '•')
            except IndexError as e:
                print(e)
            if entry[0] == 'e':
                entry = '•' + entry[1:]
            desc_str += entry.replace('¢', '•').replace('«', '•').replace(' e ', ' • ') + '\n'
        elif entry == '':
            first_blank_line_found = True
                    
    print(f'img_name: {img_name}')   
    print(f'focus_str: {focus_str}')
    print(f'desc_str: {desc_str}')
    return [focus_str, desc_str]

names = data_df[NAME].values

dir_path_units = 'images/text_pics/old_desc_cost_only/basic-desc' # change old_desc_cost_only name later
dir_path_buildings = 'images/text_pics/old_desc_cost_only/basic-desc/buildings/'
dir_path_techs = 'images/text_pics/old_desc_cost_only/basic-desc/techs/'
images_to_text_entries_units = os.listdir(dir_path_units)
images_to_text_entries_buildings = os.listdir(dir_path_buildings)
images_to_text_entries_techs = os.listdir(dir_path_techs)

dir_path_major_gods = 'images/text_pics/old_desc_cost_only/basic-desc/major-gods/'
images_to_text_entries_major_gods = os.listdir(dir_path_major_gods)

dir_path_major_gods_of_tagline = 'images/text_pics/old_desc_cost_only/basic-desc/major-gods/of_tagline/'
images_to_text_entries_major_gods_of_tagline = os.listdir(dir_path_major_gods_of_tagline)

print('images_to_text_entries_major_gods_of_tagline: ', images_to_text_entries_major_gods_of_tagline)

new_df_entries = []

for img in images_to_text_entries_major_gods:
    img_file_name = img.replace(' ', '-').replace('_', '-')
    description_and_focus_text_list = get_description_from_img_major_god(img_file_name, f'{dir_path_major_gods}{img_file_name.replace('_', ' ')}')
    focus_text = description_and_focus_text_list[0]
    description_text = description_and_focus_text_list[1]
    img_name = img.replace('-', ' ').replace('_', '-').replace('.png', '')
    if img_name in names:
        data_df.loc[data_df[NAME] == img_name, DESCRIPTION] = description_text #img to img_name
        data_df.loc[data_df[NAME] == img_name, TYPE] = MAJOR_GOD
        data_df.loc[data_df[NAME] == img_name, FOCUS] = focus_text

    else:
        new_df_entries.append(pandas.DataFrame([{NAME: img_name, DESCRIPTION: description_text, FOCUS: focus_text, TYPE: MAJOR_GOD}]))

new_df_entries.insert(0, data_df)
data_df = pandas.concat(new_df_entries, ignore_index=True)

for img in images_to_text_entries_major_gods_of_tagline:
    img_file_name = img.replace(' ', '-').replace('_', '-')
    of_tagline = get_description_from_img_major_god(img_file_name, f'{dir_path_major_gods_of_tagline}{img_file_name.replace('_', ' ')}')
    print('of_tagline BEFORE: ', of_tagline)
    if of_tagline[1]:
        of_tagline = of_tagline[1].strip()
    else:
        of_tagline = of_tagline[0]

    if img == 'gaia.png':
        of_tagline = 'GODDESS OF THE EARTH'

    print('of_tagline After: ', of_tagline)
    img_name = img.replace('-', ' ').replace('_', '-').replace('.png', '')
    print('img_name: ', img_name)
    if img_name in names:
        data_df.loc[data_df[NAME] == img_name, GOD_OF] = of_tagline
    else:
        new_df_entries.append(pandas.DataFrame([{NAME: img_name, GOD_OF: of_tagline}]))


# new_df_entries.insert(0, data_df)
# data_df = pandas.concat(new_df_entries, ignore_index=True)
    
data_df.to_csv('Data_Spreadsheet_v1.csv', index=False) # Uncomment once new loop is written

failed_desc_list = []

# print(f'building_error_entries: {building_error_entries}')
# print('names: ', names)

