import xml.etree.ElementTree as ET
import json 
from pathlib import Path

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

def get_protoaction_data(unit_tag):
    p_actions = []        
    for p_action in unit_tag.findall('protoaction'):
        p_action_single_dict = {}
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


tree = ET.parse('game_data/proto.xml')

print(tree)

units_dict = {}
buildings_dict = {}
root = tree.getroot()
print(root)
print('root.findall("unit"):', root.findall("unit"))

for unit_tag in root.findall(UNIT):
    print('unit_tag: ', unit_tag)
    new_dict_entry = {TYPE: None, NAME: ''}

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

    # name_tag = unit_tag.get('name')
    # new_dict_entry['name_tag'] = name_tag
    
    # if unit_tag.find('displaynameid') is not None:
    #     new_dict_entry[NAME] = unit_tag.find('displaynameid').text.replace('STR_UNIT_', '').replace('_NAME', '').replace('STR_BLD_', '').replace('STR_EMB_', '')
    #     new_dict_entry[DISPLAY_NAME] = new_dict_entry[NAME].replace('_', ' ').lower()


     # Unit & Building
    if unit_tag.find('movementtype') is not None:
        new_dict_entry[MOVEMENT_TYPE] = unit_tag.find('movementtype').text

    # if unit_tag

    if unit_tag.find('initialhitpoints') is not None:
        new_dict_entry[HITPOINTS] = unit_tag.find('initialhitpoints').text 

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

    # if unit_tag.find('protoaction') is not None:
    #     protoactions = []
    #     for protoaction in unit_tag.findall('protoaction'):
    #         action_dict = {}
    #         for child in protoaction:
    #             child_tag_dict = {'tag': child.tag, 'attr': child.attrib, 'text': child.text}
    #             action_dict[protoaction.find('name').text] = child_tag_dict
    #         protoactions.append(action_dict)
    #     new_dict_entry['protoactions'] = protoactions
        
    if unit_tag.find('protoaction'): #is not None
        # protoactions = []
        # for protoaction in unit_tag.findall('protoaction'):
        #     action_dict = {}
        #     for child in protoaction:
        #         child_tag_dict = {'tag': child.tag, 'attr': child.attrib, 'text': child.text}
        #         action_dict[protoaction.find('name').text] = child_tag_dict
        #     protoactions.append(action_dict)
        new_dict_entry['protoactions'] = get_protoaction_data(unit_tag)
    

    # LAST STEP
    if new_dict_entry[TYPE] == UNIT:
        units_dict[new_dict_entry[NAME]] = new_dict_entry
    elif new_dict_entry[TYPE] == BUILDING:
        buildings_dict[new_dict_entry[NAME]] = new_dict_entry


    

print('units_dict: ', units_dict)
print('buildings_dict: ', buildings_dict)
print('-----------------------------')
print(units_dict['SOUL_GUIDE'])
print('------')
print(units_dict['FAFNIR'])
print('--------')

##### Testing
test_tree = ET.parse('game_data/test-proto.xml')

test_root = test_tree.getroot()
# print('test_tree: ', test_tree)
# print('test_root: ', test_root)

unit_SG = test_root.find('unit')
# print('unit_SG: ', unit_SG)

# for unit_type_tag in unit_SG.iter('unittype'):
#     print(unit_type_tag.text)

# for protoaction in unit_SG.iter('protoaction'):
#     print('protoaction: ', protoaction)
#     for child in protoaction:
#         print('child.tag noIter: ', child.tag)

#     for child in protoaction.iter('*'):
#         print('child.tag Iter: ', child.tag)
# protoactions_list = []
# for protoaction in unit_SG.iter('protoaction'):
#     protoaction_dict = {}
#     print('protoaction: ', protoaction)
#     for child in protoaction:

#         child_dict = {} 
        # if any(child.attrib.values()):
        #     child_dict[child.tag] = child.attrib
        # print('child.tag noIter: ', child.tag)
        # print('chid.attrib:', child.attrib)

        # if child.text is not None:
        #     print('child.text.strip(): ', child.text.strip(), 'len(child.text): ', len(child.text.strip()))
        #     child_dict[f'{child.tag}_text'] = child.text.strip()
#         sub_child_list = []
#         sub_child_dict = {}
#         for sub_child in child.iter('*'):
#             sub_child_attr = sub_child.attrib
#             # sub_child_dict = {}
#             if any(sub_child.attrib.values()):
#                 print('sub_child.attrib.values(): ', sub_child.attrib.values())
#                 print('ENTERED!*! sub_child.attrib.values is not None:')
#                 print('!*! sub_child.attrib: ', sub_child.attrib)
#                 sub_child_dict[sub_child.tag] = sub_child.attrib

#             # if sub_child.attrib is not None:
#             #     sub_child_dict = {sub_child.tag: sub_child.attrib}
#             print('sub_child.tag: ', sub_child.tag)
#             print('sub_child.attrib:', sub_child.attrib)
#             if sub_child.text is not None:
#                 sub_child_dict[f'{sub_child.tag}_text'] = sub_child.text.strip()
#         # sub_child_list.append(sub_child_dict)
#         # child_dict[protoaction.find('name').text] = sub_child_dict
#             child_dict[protoaction.find('name').text] = sub_child_dict


#         child_dict[protoaction.find('name').text] = sub_child_list   # child_dict['sub_children'] = sub_child_list
#         protoactions_list.append(child_dict)

# print('protoactions_list: ', protoactions_list)

    # for child in protoaction.iter('*'):
    #     print('child.tag Iter: ', child.tag)

print('***********')
print('***********')
print('***********')
        
# for p_action in unit_SG.findall('protoaction'):
#     for item in p_action.iter('*'):
#         print('item: ', item)
#         print('item.tag: ', item.tag)
#         if item.text:
#             print('item.text.strip(): ', item.text.strip())
#         print('item.attrib :', item.attrib)
#         if any(item.attrib.values()):
#             print('any - item.attrib: ', item.attrib)
#         print('-------')


print('&&&&&&&&&&&')
print('&&&&&&&&&&&')
print('&&&&&&&&&&&')

# p_actions = []        
# for p_action in unit_SG.findall('protoaction'):
#     p_action_single_dict = {}
#     for item in p_action.iter('*'):
#         p_item_dict = {}
#         print('item: ', item)
#         print('item.tag: ', item.tag)
#         p_item_dict['tag'] = item.tag
#         if item.text:
#             print('item.text.strip(): ', item.text.strip())
#             p_item_dict['text_value'] = item.text.strip()
#         print('item.attrib :', item.attrib)
#         if any(item.attrib.values()):
#             print('any - item.attrib: ', item.attrib)
#             p_item_dict['attributes'] = item.attrib
#         print('-------')
#         p_action_single_dict[item.tag] = p_item_dict
#     p_actions.append(p_action_single_dict)

# print('@@@@@@')
# print('p_actions: ', p_actions)

units_dict_json = json.dumps(units_dict, indent=4)

with open('units-data-from-xml.json', 'w') as file:
    file.write(units_dict_json)

buildings_dict_json = json.dumps(buildings_dict, indent=4)

with open('buildings-data-from-xml.json', 'w') as file:
    file.write(buildings_dict_json)