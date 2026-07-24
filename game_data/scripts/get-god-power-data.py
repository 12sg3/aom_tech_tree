import xml.etree.ElementTree as ET
import json 
from pathlib import Path
import copy

# Open file from path
# GAME_FILES_PATH = 'game_data/game_files/'
GAME_FILES_PATH = 'game_data/game_files/game/data/gameplay/'

GAME_FILES_GP_XML_PATH = 'game_data/game_files/game/data/gameplay/god_powers/'

# Save to location path
EXTRACTED_DATA_PATH = 'game_data/extracted_data/'

god_powers_dict = {}

def xml_to_dict_effect(element):
    # Base Case
    if len(element) == 0 and not element.attrib:
        return element.text.strip() if element.text else ""
    
    result = {}

    if element.attrib:
        for attr_name, attr_value in element.attrib.items():
            result[f'{attr_name}'] = attr_value

    for child in element:
        child_data = xml_to_dict_effect(child)

        if child.tag in result:
            if not isinstance(result[child.tag], list):
                result[child.tag].append(child_data)
            result[child.tag].append(child_data)
        elif len(element.findall(child.tag)) > 1:
            result[child.tag] = [child_data]
        else:
            result[child.tag] = child_data

    if element.text and element.text.strip():
        result['text'] = element.text.strip()

    return result

def get_god_power_data_from_xml(gp_xml_file_path):

    # with open(f'{GAME_FILES_GP_XML_PATH}gp_xml_file'):

    tree = ET.parse(f'{gp_xml_file_path}')
    root = tree.getroot()
    # print('root: ', root)
    for godpower in root.findall('power'):
        gp_name = godpower.get("name")
        god_powers_dict[gp_name] = xml_to_dict_effect(godpower)

# for 
# get_god_power_data_from_xml('aztec.godpowers.xml')   



for file in Path(GAME_FILES_GP_XML_PATH).iterdir():
    # print('file: ', file)
    get_god_power_data_from_xml(file)   


# with open(f'{GAME_FILES_PATH}techtree.xml') as techtree_file:
treeTT = ET.parse(f'{GAME_FILES_PATH}techtree.xml')
root = treeTT.getroot()
print('root.tag: ', root.tag)

for tech_tag in root.findall('tech'):
    tech_tag_name = tech_tag.get("name")
    if "Archaic" in tech_tag_name or "Classical" in tech_tag_name or "Heroic" in tech_tag_name or "Mythic" in tech_tag_name:
        effects = tech_tag.find('effects')
        if effects is not None:
            for effect in effects:
                if effect.get('subtype') == 'GodPower':
                    gp_name = effect.get('power')
                    cooldown_time = effect.get('cooldown')
                    print(gp_name, cooldown_time)
                    god_powers_dict[gp_name]['cooldown_time'] = cooldown_time

# Names changes to stardadize the name for gps where the name is different from file to file
#           dict = {'old_name': new name}
name_change_dict = {
    'MonolithOfTlaloc': 'Pillar of Tl\u00e1locan', 
    'PlentyVault': 'Plenty'
}
keys_to_change = []
for key in god_powers_dict.keys():
    if key in name_change_dict.keys():
        god_powers_dict[key]['name'] = name_change_dict[key]
        keys_to_change.append(key)
        # god_powers_dict[name_change_dict[key]] = copy.deepcopy(god_powers_dict[key])

for key in keys_to_change:
    god_powers_dict[name_change_dict[key]] = copy.deepcopy(god_powers_dict[key])
    god_powers_dict.pop(key)



with open(f'{EXTRACTED_DATA_PATH}ST_god_powers_en_data.json') as file:
    ST_gp_dict = json.load(file)
    for key_st in ST_gp_dict.keys():
        for key_gp_data in god_powers_dict.keys():
            print('key_st.replace: ', key_st.replace('_', ''), '// key_gp_data.upper(): ', key_gp_data.upper())
            if key_st.replace('_', '') == key_gp_data.upper():
                for sub_key, sub_value in zip(ST_gp_dict[key_st].keys(), ST_gp_dict[key_st].values()):
                    god_powers_dict[key_gp_data][sub_key] = sub_value

        if key_st == 'SON_OSIRIS':
            for sub_key, sub_value in zip(ST_gp_dict[key_st].keys(), ST_gp_dict[key_st].values()):
                    god_powers_dict["SonOfOsiris"][sub_key] = sub_value
    god_powers_dict['Pillar of Tl\u00e1locan']['LR'] = ST_gp_dict['PILLAR_OF_TLALOCAN']['LR'] ##PILLAR_OF_TLALOCAN
    







god_power_data_json = json.dumps(god_powers_dict, indent=4)

with open(f'{EXTRACTED_DATA_PATH}godpowers-data.json', 'w') as file:
    file.write(god_power_data_json)



# print('god_powers_dict', god_powers_dict)

# for gp_dict in god_powers_dict.values():
#     print('gp_dict: ', gp_dict)
#     for key, value in zip(gp_dict.keys(), gp_dict.values()):
#         print('key: ', key)
#         print('value: ', value)