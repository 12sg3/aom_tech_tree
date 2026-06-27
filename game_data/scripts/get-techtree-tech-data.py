import xml.etree.ElementTree as ET
import json
from pathlib import Path

# Open file from path
# GAME_FILES_PATH = 'game_data/game_files/'
GAME_FILES_PATH = 'game_data/game_files/game/data/gameplay/'

# Save to location path
EXTRACTED_DATA_PATH = 'game_data/extracted_data/'

# tree = ET.parse('../game_files/techtree.xml')
tree = ET.parse(f'{GAME_FILES_PATH}techtree.xml')

print(tree)

root = tree.getroot()
print(root)

techs_dict = {}

for tech in root.findall("tech"):
    new_tech_dict_entry = {}
    # print('tech.text: ', tech.text)
    tech_name = tech.get("name")  # name is an attribute of the tech tag
    print('tech_name:', tech_name)
    # try:
    #     displayNameId = tech.find("displaynameid").text # .text give the text within (ie between the opening and closting tag)
    #     print('displaynameid: ', displayNameId)
    #     print(tech.find("displaynameid"))
    # except AttributeError:
    #     print('object has no attribute "text"')

    if tech.find("displaynameid") is not None:
        displayNameId = tech.find("displaynameid").text
        print('displayNameId: ', displayNameId)
        displayNameId_edited = displayNameId.replace('STR_TECH_', '').replace('_NAME', '')
        new_tech_dict_entry['NAME'] = displayNameId_edited
    else:
        new_tech_dict_entry['NAME'] = tech_name
    
    for cost in tech.findall("cost"):
        res_type = cost.get("resourcetype")
        cost_amount = cost.text
        print(cost.get("resourcetype"), cost.text)
        new_tech_dict_entry[f'{res_type}_Cost'] = cost_amount

    if tech.find('researchpoints') is not None:
        training_time = tech.find('researchpoints').text
        print('training_time: ', training_time)
        new_tech_dict_entry['Training_Time'] = training_time

    if tech.find('effects') is not None:
        print("tech.find('effects').text: ", tech.find('effects').text)
        new_effects_list = []
        for effect in tech.find('effects'):
            new_effect = {}
            effect_type = effect.get('type')
            # print('effect_type: ', effect_type)
            new_effect['type'] = effect_type
            effect_amount = effect.get('amount')
            # print('effect_amount: ', effect_amount)
            new_effect['amount'] = effect_amount
            effect_subtype = effect.get('subtype')
            new_effect['subtype'] = effect_subtype
            # print('effect_subtype: ', effect_subtype)
            effect_action =  effect.get('action')
            # print('effect_action: ', effect_action)
            new_effect['action'] = effect_action
            effect_relativity = effect.get('relativity')
            # print('effect_relativity: ', effect_relativity)
            print('new_effect: ', new_effect)
            
            target = effect.find('target')
            if target is not None:
                target_type = target.get('type')
                target_text = target.text
                print('target_type: ', target_type, 'target_type_text: ', target_text)
                new_effect['target_type'] = target_type
                new_effect['target_text'] = target_text
            new_effects_list.append(new_effect)
        print('new_effects_list: ', new_effects_list)
        new_tech_dict_entry['effects'] = new_effects_list
    techs_dict[new_tech_dict_entry['NAME']] = new_tech_dict_entry ###


# effects -> relativity: BasePercentage -> multiply by amount
#                        Absolute -> add amount to add to subtype basevalue
    
    print('new_tech_dict_entry: ', new_tech_dict_entry)

print("techs_dict['TWISTED_LIMBS']: ", techs_dict['TWISTED_LIMBS'])


# techs_dict_json = json.dumps(techs_dict, indent=4)

# with open('techtree_data_from_xml.json', 'w') as file:
#     file.write(techs_dict_json)

# if Path('../extracted_data/ST_techs_en_data.json').is_file():
if Path(f'{EXTRACTED_DATA_PATH}ST_techs_en_data.json').is_file():
    # with open('../extracted_data/ST_techs_en_data.json') as file:
    with open(f'{EXTRACTED_DATA_PATH}ST_techs_en_data.json') as file:
        ST_Tech_data_dict = json.load(file)

        for key in ST_Tech_data_dict.keys():
            if key in techs_dict:
                for key_inner in ST_Tech_data_dict[key].keys():
                    if key_inner == 'NAME':
                        techs_dict[key]['Display_Name'] = ST_Tech_data_dict[key][key_inner]
                    else:
                        techs_dict[key][key_inner] = ST_Tech_data_dict[key][key_inner]
                        
techs_dict_json = json.dumps(techs_dict, indent=4)

# with open('../extracted_data/techtree_data_from_xml.json', 'w') as file:
with open(f'{EXTRACTED_DATA_PATH}techtree_data_from_xml.json', 'w') as file:
    file.write(techs_dict_json)