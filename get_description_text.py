# from PIL import Image
# import pytesseract

from PIL import Image
from pytesseract import pytesseract
import cv2
import pandas
import os
import re

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
UNIT = 'unit'
BUILDING = 'building'
GOD_POWER = 'god_power'

DAO_SWORDSMAN_DESCRIPTION = 'Slow but durable Chinese infantry. Decent vs. everything.'
TENGU_BASIC_DESCRIPTION = 'Myth unit. A winged swordsman who leaps into battle, boosting its stats. Good against human soldiers.'
YAZI_DESCRIPTION = 'Fast myth unit that can teleport to enemies. Good against human soldiers.'

DAO_SWORDSMAN = 'dao swordsman'
TENGU = 'tengu'
YAZI = 'yazi' 

custom_descriptions_to_add = [
    {NAME: DAO_SWORDSMAN, DESCRIPTION: DAO_SWORDSMAN_DESCRIPTION}, 
    {NAME: TENGU, DESCRIPTION: TENGU_BASIC_DESCRIPTION}, 
    {NAME: YAZI, DESCRIPTION: YAZI_DESCRIPTION},
]

PREFIXES = 'Prefixes'
SUFFIXES = 'Suffixes'
MEDIUM_INFANTRY_NORSE = 'medium infantry norse'
HEAVY_INFANTRY_NORSE = 'heavy infantry norse'
CHAMPION_INFANTRY_NORSE = 'champion infantry norse'

affixes_to_add = [
    {NAME: MEDIUM_INFANTRY_NORSE, PREFIXES: 'N', SUFFIXES: 'HF, LH'},
    {NAME: HEAVY_INFANTRY_NORSE, PREFIXES: 'N', SUFFIXES: 'HF, LH'},
    {NAME: CHAMPION_INFANTRY_NORSE, PREFIXES: 'N', SUFFIXES: 'HF, LH'},
]

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
tech_costs = []

def get_description_from_img_tech(img_name, file_path):
    global tech_costs
    # global max_len, max_len_str
    print(f'img_name (from desc func): {img_name}')
    print(f'file_path: {file_path}')
    # file_path = f'images/text_pics/old_desc_cost_only/basic-desc/{img_name.replace('_', ' ')}'
    text = extract_text_image(file_path)
    extracted_text_split = text.split('\n')
    
    print(f'img_name: {img_name}, extracted_text_split: {extracted_text_split}')

    # print (f'extracted_text_split[4]: {extracted_text_split[4]}')
    cost_str = ''
    desc_str = ''
    first_blank_line_found = False
    title_found = False
    cost_found = False
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

        if not cost_str and 'Cost' in entry:
            cost_str = entry

    tech_costs.append([img_name, cost_str])     
    print('img_name: ', img_name, 'cost_str: ', cost_str)

                


        
                    
    print(f'img_name: {img_name}')   
    print(f'desc_str: {desc_str}')
    return desc_str

    # extracted_text_split = extract_text_image(f'images/text_pics/old_desc_cost_only/adv-tool-tips/{img_name.replace(' ', '-')}.png').split('\n')

# get_description_from_img('qinglong-si')
# get_description_from_img('tiger-cavalry-si')
# get_description_from_img('taotie-si')
# get_description_from_img('yazi-si')

# get_description_from_img('hydra.png')
# get_description_from_img('tiger-cavalry.png')
# get_description_from_img('taotie.png')
# get_description_from_img('asura.png')

names = data_df[NAME].values

dir_path_units = 'images/text_pics/old_desc_cost_only/basic-desc' # change old_desc_cost_only name later
dir_path_buildings = 'images/text_pics/old_desc_cost_only/basic-desc/buildings/'
dir_path_techs = 'images/text_pics/old_desc_cost_only/basic-desc/techs/'
images_to_text_entries_units = os.listdir(dir_path_units)
images_to_text_entries_buildings = os.listdir(dir_path_buildings)
images_to_text_entries_techs = os.listdir(dir_path_techs)

# print(f'images_to_text_entries: {images_to_text_entries}')

new_df_entries = []
# Main Loop for units
### Uncomment after test
# for img in images_to_text_entries_units:
#     basic_description = get_description_from_img(img, f'images/text_pics/old_desc_cost_only/basic-desc/{img.replace('_', ' ')}')
#     img_name = img.replace('-', ' ').replace('_', '-').replace('.png', '')
#     if img_name in names:
#         data_df.loc[data_df[NAME] == img_name, DESCRIPTION] = basic_description #img to img_name

#     else:
#         new_df_entries.append(pandas.DataFrame([{NAME: img_name, DESCRIPTION: basic_description}]))

# new_df_entries.insert(0, data_df)
# data_df = pandas.concat(new_df_entries, ignore_index=True)

### UNCOMMENT after test
# for img in images_to_text_entries_buildings:
#     # basic_description = get_description_from_img(img, f'images/text_pics/old_desc_cost_only/basic-desc/buildings/{img.replace('_', ' ')}')
#     basic_description = get_description_from_img(img, f'{dir_path_buildings}{img.replace('_', ' ')}')
#     img_name = img.replace('-', ' ').replace('_', '-').replace('.png', '')
#     if img_name in names:
#         data_df.loc[data_df[NAME] == img_name, DESCRIPTION] = basic_description #img to img_name

#     else:
#         new_df_entries.append(pandas.DataFrame([{NAME: img_name, DESCRIPTION: basic_description}]))

# new_df_entries.insert(0, data_df)
# data_df = pandas.concat(new_df_entries, ignore_index=True)

ACCEPTABLE_RES_TYPES = ['f', 'w', 'g', 'z', 't']

RES_Type_MAP = {
    'f' : 'Food_Cost',
    'w' : 'Wood_Cost',
    'g' : 'Gold_Cost',
    'z' : 'Favor_Cost',
    't' : 'Training_Time'
} 


def set_tech_cost_cmd_line(item_name):
    cost_dict = {}
    more_data_to_submit = True
    # print('img_name: ', img_name)
    while (more_data_to_submit):
        res_type_input = ''

        # while (res_type_not_selected):
        res_add_to_cost_dict = False
        res_type_input = input(f"""
item_name: {img_name} cost_dict: {cost_dict}
            
Select the resouce type from option below: OR Press "n" to if resouces have been added.
    f - food
    w - wood
    g - gold
    z - favor
    t - training time(s)
                        """)
            
        res_type_input.strip()
        #r"^([fwgzt]...." : format: f 50 w 50 g 50 z 20 t 45  
        if bool(re.fullmatch(r"^([fwgzt] \d+)(?: ([fwgzt] \d+)){0,4}$", res_type_input)):
            res_inputs = res_type_input.split()
            print('res_inputs: ', res_inputs)
            for i in range(len(res_inputs)):
                if i % 2 == 0:
                    cost_dict[RES_Type_MAP[res_inputs[i]]] = res_inputs[i + 1]

        elif res_type_input == 'n':
            more_data_to_submit = False

        else:
            print('Input must be formated like "f 200 g 100 t 32" !')
        
    print('item_name: ', item_name,'cost_dict: ', cost_dict)

    return cost_dict

### example return (cost_dict)
# item_name: abundance 
# cost_dict: {'Food': '50', 'Gold': '500', 
#            'Wood': '50', 'Favor': '12', 'Training_Time': '45'}

# print('images_to_text_entries_techs: ', images_to_text_entries_techs)

# images_to_text_entries_techs_TEST =  ['abundance.png', 'advanced-defenses.png', 'advanced-fortifications.png', 'adze-of-wepwawet.png', 'aegis-shield.png', 'alluvial-clay.png', 'ambassadors.png', 'anastrophe.png', 'architects.png', 'arctic-winds.png', 'argive-patronage.png', 'argonauts.png', 'ascetic-practices.png', 'asmmetrical-bow.png', 'asper-blood.png', 'atef-crown.png', 'autumn-of-abundance.png', 'avenging-spirit.png', 'axe-of-vengeance.png', 'ballistics.png', 'beast-slayer.png', 'berserkergang.png', 'bite-of-the-shark.png', 'boiling-oil.png', 'bone-bow.png', 'book-of-thoth.png', 'bottomless-stomach.png', 'bow-saw.png', 'bravery.png', 'bronze-armor.png', 'bronze-shield.png', 'bronze-wall-atlantean.png', 'bronze-weapons.png', 'burning-malevolence.png', 'burning-pitch.png']

images_to_text_entries_techs_TEST =  ['abundance.png', 'advanced-defenses.png', 'advanced-fortifications.png', 'adze-of-wepwawet.png', 'aegis-shield.png', 'alluvial-clay.png', 'ambassadors.png', 'anastrophe.png', 'architects.png', 'arctic-winds.png']


# for img in images_to_text_entries_techs:
for img in images_to_text_entries_techs:
    # basic_description = get_description_from_img(img, f'images/text_pics/old_desc_cost_only/basic-desc/buildings/{img.replace('_', ' ')}')
    img_file_name = img.replace(' ', '-').replace('_', '-')
    basic_description = get_description_from_img_tech(img_file_name, f'{dir_path_techs}{img_file_name.replace('_', ' ')}')
    img_name = img.replace('-', ' ').replace('_', '-').replace('.png', '')
    if img_name in names:
        tech_cost_dict = set_tech_cost_cmd_line(img)
        for key in tech_cost_dict.keys():
            data_df.loc[data_df[NAME] == img_name, key] = tech_cost_dict[key]

        data_df.loc[data_df[NAME] == img_name, DESCRIPTION] = basic_description #img to img_name
        data_df.loc[data_df[NAME] == img_name, TYPE] = TECH

    else:
        tech_cost_dict = set_tech_cost_cmd_line(img)
        new_entry_dict = {NAME: img_name, DESCRIPTION: basic_description, TYPE: TECH}
        for key in tech_cost_dict.keys():
            new_entry_dict[key] = tech_cost_dict[key]

        # new_df_entries.append(pandas.DataFrame([{NAME: img_name, DESCRIPTION: basic_description, TYPE: TECH}]))
        new_df_entries.append(pandas.DataFrame([new_entry_dict]))

new_df_entries.insert(0, data_df)
data_df = pandas.concat(new_df_entries, ignore_index=True)

for entry in custom_descriptions_to_add:
    data_df.loc[data_df[NAME] == entry[NAME], DESCRIPTION] = entry[DESCRIPTION]

for entry in affixes_to_add:
    data_df.loc[data_df[NAME] == entry[NAME], PREFIXES] = entry[PREFIXES]
    data_df.loc[data_df[NAME] == entry[NAME], SUFFIXES] = entry[SUFFIXES]

# ONNA_MUSHA_HERO = {id: 395, name: 'ONNA-MUSHA_HERO', type: 'None'};
# RAMMING_GALLEY = {id: 396, name: 'RAMMING-GALLEY', type: 'None'};
# RAMMING_WASEN = {id: 397, name: 'RAMMING-WASEN', type: 'None'};

TYPES_TO_SET = [
    {NAME: 'ONNA-MUSHA_HERO', TYPE: UNIT},
    {NAME: 'RAMMING-GALLEY', TYPE: UNIT},
    {NAME: 'RAMMING-WASEN', TYPE: UNIT},
]

for entry in  TYPES_TO_SET:
    data_df.loc[data_df[NAME] == entry[NAME], TYPE] = entry[TYPE]




### Uncomment
data_df.to_csv('Data_Spreadsheet_v1.csv', index=False) # Uncomment once new loop is written

failed_desc_list = []

print(f'building_error_entries: {building_error_entries}')

print('tech_costs: ' ,tech_costs)

for tech in tech_costs:
    print(tech)

### Extra troubleshooting script

# print('type(data_df.loc[data_df[NAME]]): ', type(data_df.loc[data_df[NAME]]))
# print(f'data_df[[NAME, DESCRIPTION]]: {data_df[[NAME, DESCRIPTION]]}')
# print(f'type(data_df[[NAME, DESCRIPTION]]): {type(data_df[[NAME, DESCRIPTION]])}')

# data_df_ND = data_df[[NAME, DESCRIPTION]]
# data_df_ND_isnan = data_df_ND.isna()

# print(f'data_df_ND_isnan: {data_df_ND_isnan}')

# for index,row in data_df_ND.iterrows():
    # print(f'index: {index}, row: {row}')
    # print(f'row[NAME]: {row[NAME]}, row[DESCRIPTION]: {row[DESCRIPTION]}, {row[DESCRIPTION]}')
    
# for index, row in data_df_ND_isnan.iterrows():
#     print(f'row[NAME]: {data_df_ND.loc[index, NAME]}, row[DESCRIPTION]: {row[DESCRIPTION]}')
#     if row[DESCRIPTION]:
#         failed_desc_list.append(data_df_ND.loc[index, NAME])

# # ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().
# # need to find which imgs to desc failed
# for i, img in enumerate(images_to_text_entries):
#     img_name = img.replace('-', ' ').replace('.png', '')
#     # if data_df.loc[data_df[NAME] == img_name, DESCRIPTION] == '':
#     # if data_df.loc[data_df[NAME] == img_name, DESCRIPTION].empty:
#     try:
#         print(f'data_df.loc[data_df[NAME] == {img_name}, DESCRIPTION]: {data_df.loc[data_df[NAME] == img_name, DESCRIPTION]}, {data_df.loc[data_df[NAME] == img_name, DESCRIPTION][i]}')
#     except KeyError:
#         failed_desc_list.append(img_name)
#     # if data_df.loc[data_df[NAME] == img_name, DESCRIPTION].eq(''):
#     # if data_df.loc[data_df[NAME] == img_name, DESCRIPTION] == '':
#     #     print('if entered')
#     #     failed_desc_list.append(img_name)

# # for img in failed_desc_list:
# #     get_description_from_img(img.replace(' ', '-').strip() + ('.png'))

# multi_line_desc = ['dao swordsman','pharaoh (hero)', 'pharaoh (hero) (new kingdom)', 'priest (hero)', 'sage (hero)', 'tengu', 'wen zhong (hero)', 'yazi', 'yang jian (hero)', 'yinglong', 'zhuque',]
# new_desc_str_list = []

# for img in multi_line_desc:
#     new_desc_str = get_description_from_img(img.replace(' ', '-').strip() + ('.png'))
#     new_desc_str_list.append({'name': img,'desc_str':new_desc_str})

# print(f'failed_desc_list: {failed_desc_list}')
# print(f'len(failed_desc_list): {len(failed_desc_list)}')
# print(f'new_desc_str_list: {new_desc_str_list}')

# for entry in new_desc_str_list:
#     print(f"entry['name']: {entry['name']}")
#     print(f"entry['desc_str']: {entry['desc_str']}")

TENGU_BASIC_DESCRIPTION = 'Myth unit. A winged swordsman who leaps into battle, boosting its stats. Good against human soldiers.'
DAO_SWORDSMAN_DESCRIPTION = 'Slow but durable Chinese infantry. Decent vs. everything.'
YAZI_DESCRIPTION = 'Fast myth unit that can teleport to enemies. Good against human soldiers.'