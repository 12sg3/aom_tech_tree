import xml.etree.ElementTree as ET
import json 
from pathlib import Path

# Open file from path
GAME_FILES_PATH = 'game_data/game_files/'
GAME_FILES_PATH = 'game_data/game_files/game/data/gameplay/'

# Save to location path
EXTRACTED_DATA_PATH = 'game_data/extracted_data/'

UNIT = 'unit'
BUILDING = 'building'
UNIT_CLASS = 'UnitClass'
BUILDING_CLASS = 'BuildingClass'

NAME = 'Name'
TYPE = 'Type'
SUB_TYPE = 'Sub_Type'
FACTION = 'Faction'
FOOD_COST = 'Food_Cost'
WOOD_COST = 'Wood_Cost'
GOLD_COST = 'Gold_Cost'
FAVOR_COST = 'Favor_Cost'
POP_COST = 'Pop_Cost'
TRAINING_TIME = 'Training_Time'
BUILD_POINTS = 'Buildpoints'
HITPOINTS = 'Hitpoints'
LINE_OF_SIGHT = 'Line_of_Sight'
ATTACK_TYPE = 'Attack_Type'
RATE_OF_FIRE = 'Rate_of_fire'
BONUS_MULTIPIER = 'Bonus_Multiplier'
MAXIMUM_RANGE = 'Maximum_range' # maybe change to Maximum_Range (would need to change other files first)
HACK_DAMAGE = 'Hack_Damage'
PIERCE_DAMAGE = 'Pierce_Damage'
DIVINE_DAMAGE = 'Divine_Damage'
CRUSH_DAMAGE = 'Crush_Damage'   
HACK_ARMOR = 'Hack_Armor'
PIERCE_ARMOR = 'Pierce_Armor'
CRUSH_ARMOR = 'Crush_Armor'
VELOCITY = 'Velocity'

DISPLAY_NAME = 'Display_Name'
MOVEMENT_TYPE = 'Movement_Type'
WEIGHT_CLASS = 'Weight_Class'


COST_TYPE_MAP = {
    'Food' : FOOD_COST,
    'Gold' : GOLD_COST,
    'Wood' : WOOD_COST,
    'Favor' : FAVOR_COST
}

ARMOR_TYPE_MAP = {
    'Hack': HACK_ARMOR,
    'Pierce': PIERCE_ARMOR,
    'Crush': CRUSH_ARMOR
}

second_damage_action_entered_list = []

def get_protoaction_data(unit_tag):
    global second_damage_action_entered_list
    p_actions = []        
    for p_action in unit_tag.findall('protoaction'):
        p_action_single_dict = {}
        item_instance_counter = 0        
        for item in p_action.iter('*'):
            p_item_dict = {}
            print('item: ', item)
            print('item.tag: ', item.tag)
            # p_item_dict['tag'] = item.tag
            if item.text:
                print('item.text.strip(): ', item.text.strip())
                p_item_dict['text_value'] = item.text.strip()
            print('item.attrib :', item.attrib)
            if any(item.attrib.values()):
                print('any - item.attrib: ', item.attrib)
                p_item_dict['attributes'] = item.attrib
            print('-------')
            if len(p_action.findall(item.tag)) > 1 and f'{item.tag}_tags' in p_action_single_dict:
                second_damage_action_entered_list.append((item_instance_counter))
                p_action_single_dict[f'{item.tag}_tags'][f'{item.tag}_{item_instance_counter}'] = p_item_dict
                item_instance_counter += 1
            elif len(p_action.findall(item.tag)) > 1:
                item_instance_counter = 0
                p_action_single_dict[f'{item.tag}_tags'] = {f'{item.tag}_{item_instance_counter}': p_item_dict}
                item_instance_counter += 1
            else:
                p_action_single_dict[item.tag] = p_item_dict
        p_actions.append(p_action_single_dict)
    return p_actions

# "Name": "eagle warrior",
#         "Type": "unit",
#         "Sub_Type": null,
#         "Faction": null,
#         "Prefixes": null,
#         "Suffixes": null,
#         "Food_Cost": null,
#         "Wood_Cost": 80.0,
#         "Gold_Cost": 45.0,
#         "Favor_Cost": null,
#         "Pop_Cost": 3.0,
#         "Training_Time": "21",
#         "Buildpoints": null,
#         "Hitpoints": 90.0,
#         "Line_of_Sight": 20.0,
#         "Attack_Type": "Ranged Attack",
#         "Rate_of_fire": 1.5,
#         "Bonus_Multiplier": " AbstractArcher:  1.50",
#         "Maximum_range": 18.0,
#         "Hack_Damage": null,
#         "Pierce_Damage": 10.0,
#         "Divine_Damage": null,
#         "Crush_Damage": null,
#         "Hack_Armor": 15.0,
#         "Pierce_Armor": 30.0,
#         "Crush_Armor": 99.0,
#         "Velocity": "4.50 EEE",
#         "Focus": null,
#         "Description": "Elite Ranged soldier. Good against anything it can reach, especially ranged soldiers.",
#         "God_Of": null,
#         "Version_Suffix": null,
#         "Parent_Caret_Name": null,
#         "id": 74
#     },


# tree = ET.parse('../game_files/proto.xml')
tree = ET.parse(f'{GAME_FILES_PATH}proto.xml')

print(tree)

units_dict = {}
buildings_dict = {}
root = tree.getroot()
print(root)
print('root.findall("unit"):', root.findall("unit"))

for unit_tag in root.findall(UNIT):
    print('unit_tag: ', unit_tag)
    new_dict_entry = {TYPE: None, NAME: ''}

    # not using name atrb from unit tag as displaynameid is closer to the existing name schema
    # also need to check if name is already added as their are unit tags with the same name, ex: Hoplite and HopliteSPC
    # name_tag = unit_tag.get('name')
    # new_dict_entry['name_tag'] = name_tag

    if unit_tag.find('displaynameid') is not None:
        name = unit_tag.find('displaynameid').text.replace('STR_UNIT_', '').replace('_NAME', '').replace('STR_BLD_', '').replace('STR_EMB_', '')
        if name in units_dict.keys() or name in buildings_dict.keys():
            continue
        new_dict_entry[NAME] = unit_tag.find('displaynameid').text.replace('STR_UNIT_', '').replace('_NAME', '').replace('STR_BLD_', '').replace('STR_EMB_', '')
        new_dict_entry[DISPLAY_NAME] = new_dict_entry[NAME].replace('_', ' ').lower()

    unit_type_tags = unit_tag.findall('unittype')
    print('unit_type_tags: ', unit_type_tags)
    for tag in unit_type_tags:
        tag_text = tag.text.strip()
        print('tag.text: ', tag.text)
        print('tag_text: ', tag_text)
        if tag_text == UNIT_CLASS:
            new_dict_entry[TYPE] = UNIT
            print('unit found')
            continue
        if tag_text == BUILDING_CLASS:
            new_dict_entry[TYPE] = BUILDING
            print('building found')
            continue
    
    if new_dict_entry[TYPE] == None:
        print('None found')
        continue

     # Unit & Building
    if unit_tag.find('movementtype') is not None:
        new_dict_entry[MOVEMENT_TYPE] = unit_tag.find('movementtype').text

    # if unit_tag

    if unit_tag.find('initialhitpoints') is not None:
        new_dict_entry[HITPOINTS] = unit_tag.find('initialhitpoints').text 

    if unit_tag.find('trainpoints') is not None:
        new_dict_entry[TRAINING_TIME] = unit_tag.find('trainpoints').text

    if unit_tag.find('buildpoints') is not None:
        new_dict_entry[BUILD_POINTS] = unit_tag.find('buildpoints').text

    if unit_tag.find('weightclass') is not None:
        new_dict_entry[WEIGHT_CLASS] = unit_tag.find('weightclass').text

    if unit_tag.find('populationcount') is not None:
        new_dict_entry[POP_COST] = unit_tag.find('populationcount').text

    if unit_tag.find('maxvelocity') is not None:
        new_dict_entry[VELOCITY] = unit_tag.find('maxvelocity').text

    if unit_tag.find('los') is not None:
        new_dict_entry[LINE_OF_SIGHT] = unit_tag.find('los').text

    if unit_tag.find('cost') is not None:
        for cost in unit_tag.findall('cost'):
            cost_type = cost.get('resourcetype')
            cost_amount = cost.text
            new_dict_entry[COST_TYPE_MAP[cost_type]] = cost_amount

    if unit_tag.find('armor') is not None:
        for armor in unit_tag.findall('armor'):
            armor_type = armor.get('type')
            armor_amount = armor.get('value')
            new_dict_entry[ARMOR_TYPE_MAP[armor_type]] = armor_amount
        
    if unit_tag.find('protoaction'): #is not None
        new_dict_entry['protoactions'] = get_protoaction_data(unit_tag)

    # LAST STEP
    if new_dict_entry[TYPE] == UNIT:
        units_dict[new_dict_entry[NAME]] = new_dict_entry
    elif new_dict_entry[TYPE] == BUILDING:
        buildings_dict[new_dict_entry[NAME]] = new_dict_entry

# with open('../extracted_data/ST_units_en_data.json') as file:
with open(f'{EXTRACTED_DATA_PATH}ST_units_en_data.json') as file:
    ST_unit_dict = json.load(file)

# need to standardize name vs NAME
for key in ST_unit_dict.keys():
    if key in units_dict:
        # units_dict[key]
        for key_inner in ST_unit_dict[key]:
            units_dict[key][key_inner] = ST_unit_dict[key][key_inner]

# with open('../extracted_data/ST_buildings_en_data.json') as file:
with open(f'{EXTRACTED_DATA_PATH}ST_buildings_en_data.json') as file:
    ST_building_dict = json.load(file)

for key in ST_building_dict:
    if key in buildings_dict:
        for key_inner in ST_building_dict[key]:
            buildings_dict[key][key_inner] = ST_building_dict[key][key_inner]


print('units_dict: ', units_dict)
print('buildings_dict: ', buildings_dict)
print('-----------------------------')
print(units_dict['SOUL_GUIDE'])
print('------')
print(units_dict['FAFNIR'])
print('--------')

units_dict_json = json.dumps(units_dict, indent=4)

# with open('../extracted_data/units-data-from-xml.json', 'w') as file:
with open(f'{EXTRACTED_DATA_PATH}units-data-from-xml.json', 'w') as file:
    file.write(units_dict_json)

buildings_dict_json = json.dumps(buildings_dict, indent=4)

# with open('../extracted_data/buildings-data-from-xml.json', 'w') as file:
with open(f'{EXTRACTED_DATA_PATH}buildings-data-from-xml.json', 'w') as file:
    file.write(buildings_dict_json)


print('second_damage_action_entered_list: ', second_damage_action_entered_list)
