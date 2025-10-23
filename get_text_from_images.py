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
LINE_OF_SIGHT = 'Line_of_Sight'
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
UNIT = 'unit'
BUILDING = 'building'
TECH = 'tech'
GOD_POWER = 'god_power'
BUILDPOINTS = 'Buildpoints'


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
    
def set_hitpoints(new_dict, entry_split):
    new_dict[HITPOINTS] = entry_split[1].split('/')[0].strip()
    # print(f'new_dict: ', new_dict)

armor_error_list = []

def set_armors(new_dict, entry_split):
    print(f'Unit: {new_dict[NAME]}')
    for armor_str in entry_split[1:]:
        print(f'armor_str: {armor_str}')
        armor_str_splt = armor_str.split(',') #%
        print(f'armor_str_splt: ', armor_str_splt)

        for ent in armor_str_splt:
            try:
                ent_split = ent.split('%')
                new_dict[(ent_split[1] + '_' + ARMOR).strip()] = ent_split[0].strip() # verify strip worked
            except IndexError as e:
                print(f'error message: {e}')
                armor_error_list.append(new_dict[NAME])

def set_line_of_sight(new_dict, entry_split):
    new_dict[LINE_OF_SIGHT] = entry_split[1].strip()

def set_cost(new_dict, entry_split):
    costs = entry_split[1:]
    # print(f'costs: {costs}')
    for i, cost in enumerate(costs):
        # print(f'i: {i}, cost: {cost}')
        if GOLD in cost or FOOD in cost or WOOD in cost or FAVOR in cost:
            # print('if entered')
            new_dict[cost.strip() + '_' + COST] = costs[i + 1].strip()       

def set_pop_cost(new_dict, entry_split):
    new_dict[POP_COST] = entry_split[1].strip()

def set_training_time(new_dict, entry_split):
    new_dict[TRAINING_TIME] = entry_split[1].strip()

def set_velocity(new_dict, entry_split):
    new_dict[VELOCITY] = entry_split[1].strip()

def set_attack_type(new_dict, entry_split):
    new_dict[ATTACK_TYPE] = entry_split[1].strip()  

def set_rate_of_fire(new_dict, entry_split):
    new_dict[RATE_OF_FIRE] = entry_split[1].strip()

def set_maximum_range(new_dict, entry_split):
    new_dict[MAXIMUM_RANGE] = entry_split[1].strip()

def set_attack_stats(new_dict, entry_split): #reconsider naming
    print(f'entry_split (set_attack_stats): {entry_split}')
    for i, dmg_type in enumerate(entry_split):
        if HACK in dmg_type or PIERCE in dmg_type or CRUSH in dmg_type or WALL_BREACHING in dmg_type or DIVINE in dmg_type:
            new_dict[dmg_type.strip() + '_' + DAMAGE] = entry_split[i + 1]

def set_bonus_multipliers(new_dict, entry_split): # often multiple entires
    if BONUS_MULTIPLIER in new_dict:
        print('Bonus Multiplier Found')
        new_dict[BONUS_MULTIPLIER] = new_dict[BONUS_MULTIPLIER] + f', {entry_split[1]}: {entry_split[2].replace('X', '')}'
    else:
        new_dict[BONUS_MULTIPLIER] = f'{entry_split[1]}: {entry_split[2].replace('X', '')}'

def set_type():
    return UNIT

def set_buildpoints(new_dict, entry_split):
    new_dict[BUILDPOINTS] = entry_split[1].strip()


def get_stats_from_img(img_name, type, file_path): # rename to get_unit_stats
    print(f'**img_name: {img_name}')
    # extracted_text = extract_text_image(f'images/text_pics/{img_name}') # need to start passing in path
    extracted_text = extract_text_image(f'{file_path}{img_name}') # need to start passing in path
    extracted_text_split = extracted_text.split('\n')
    print(f'extracted_text_split: {extracted_text_split}')
    new_dict = {}
    new_dict[NAME] = img_name.replace('-', ' ').replace('.png', '') #removed .title() as in capitlized Png 
    for entry in extracted_text_split:
        if ':' in entry:
            entry = entry.replace(',', ':') #
            entry_split = entry.split(':')
            print(f'entry_split (img_name: {img_name}): {entry_split}')
            key = entry_split[0].replace(' ', '_')

            if key == HITPOINTS:
                set_hitpoints(new_dict, entry_split)

            if key == ARMOR:
                set_armors(new_dict, entry_split)

            if key == LINE_OF_SIGHT:
                set_line_of_sight(new_dict, entry_split)

            if key == COST: 
                set_cost(new_dict, entry_split)

            if key == POP_COST: 
                set_pop_cost(new_dict, entry_split)

            if key == TRAINING_TIME: 
                set_training_time(new_dict, entry_split)

            if key == VELOCITY: 
                set_velocity(new_dict, entry_split)

            if key == ATTACK: 
                set_attack_type(new_dict, entry_split)

            if key == RATE_OF_FIRE: 
                set_rate_of_fire(new_dict, entry_split)

            if key == MAXIMUM_RANGE: 
                set_maximum_range(new_dict, entry_split)

            if HACK in key  or PIERCE in key or CRUSH in key or DIVINE in key: ##### check other units to see if 'Pierce' or 'Crush' works
                set_attack_stats(new_dict, entry_split)

            if key == BONUS_AGAINST: 
                set_bonus_multipliers(new_dict, entry_split)

            if key == BUILDPOINTS:
                set_buildpoints(new_dict, entry_split)

    # new_dict[TYPE] = UNIT 
    new_dict[TYPE]  = type

    print(f'new_dict: ', new_dict)

    return new_dict


dir_path_units = 'images/text_pics/'

images_to_text_entries_units = os.listdir(dir_path_units)
images_to_text_entries_units.remove('old_desc_cost_only')
images_to_text_entries_units.remove('buildings')

print(f'armor_error_list: {armor_error_list}')

names = data_df[NAME].values

# for i, name in enumerate(names):
#     names[i] = name.lower()

# # # print('names: ', names)

new_df_entries = []
# DF_ROW_TEMPLATE = {'Name': '', 'Description': ''} 

print(f'names: {names}')

## main loop for units
for img in images_to_text_entries_units:

    # print(f'img in loop: {img}')
    img_name = img.replace('.png', '').replace('-', ' ') 
    
   
    unit_stats = get_stats_from_img(img, UNIT, 'images/text_pics/')

    # print(f'img: {img}, unit_stats: {unit_stats}')

    if img_name in names:
        unit_stats_keys = unit_stats.keys()
        for key in unit_stats_keys:
            key = key.replace(' ', '_')
            data_df.loc[data_df[NAME]== img_name, key] = unit_stats[key]   
            # print(f'key: {key}, unit_stats[key]: {unit_stats[key]}')   
        
    else:
        # print(f'else entered for img_name: {img_name}')
        new_df_entries.append(pandas.DataFrame([unit_stats]))

        # add new entry to df

dir_path_buildings = 'images/text_pics/buildings/'

images_to_text_entries_buildings = os.listdir(dir_path_buildings)

## main loop for buildings
for img in images_to_text_entries_buildings:

    # print(f'img in loop: {img}')
    img_name = img.replace('.png', '').replace('-', ' ') 
    
   
    building_stats = get_stats_from_img(img, BUILDING, 'images/text_pics/buildings/')

    # print(f'img: {img}, unit_stats: {unit_stats}')

    if img_name in names:
        building_stats_keys = building_stats.keys()
        for key in building_stats_keys:
            data_df.loc[data_df[NAME]== img_name, key] = building_stats[key]   
            # print(f'key: {key}, unit_stats[key]: {unit_stats[key]}')   
        
    else:
        # print(f'else entered for img_name: {img_name}')
        new_df_entries.append(pandas.DataFrame([building_stats]))


new_df_entries.insert(0, data_df)
data_df = pandas.concat(new_df_entries, ignore_index=True)

data_df.to_csv('Data_Spreadsheet_v1.csv', index=False) # Uncomment once new loop is written


# armor_error_list: ['dragon ship', 'fanatic (hero)', 'fenris wolf brood', 'fire giant', 'scylla', 'dragon ship', 'fanatic (hero)', 'fenris wolf brood', 'fire giant', 'scylla']
# armor_error_list_buildings = ['market chinese', 'temple japanese', 'wooden wall short egyptian']

# for img in armor_error_list_buildings:
#     img_file_name = img.replace(' ', '-') + '.png'
#     building_stats = get_stats_from_img(img_file_name, BUILDING, 'images/text_pics/buildings/')
#     print(building_stats)

print(f'armor_error_list: {armor_error_list}')

### remane text_image files

# print(os.listdir(dir_path))

# for old_file_name in os.listdir(dir_path):
#     print(f'old_file_name: {old_file_name}')
#     new_file_name = old_file_name.replace('test_', '')
#     print(f'new_file_name: {new_file_name}')
#     os.rename(f'{dir_path}{old_file_name}', f'{dir_path}{new_file_name}')
    