import pandas
import json
import copy
import shutil
import os
from pathlib import Path

data = pandas.read_csv('Data_Spreadsheet_v1.csv')

print(type(data))
print(f'data.shape: {data.shape}')

ROW_DIM = data.shape[0]
COL_DIM = data.shape[1]

print(f'Number of rows: {ROW_DIM} \nNumber of Columns: {COL_DIM}')

# names used are "Display_Name"
# do we need to add lumber camp, minning camo or granery
entries_to_copy_GD = {
    "town center" : [
        "town center atlantean", 
        "town center aztec", 
        "town center chinese", 
        "town center egyptian", 
        "town center greek", 
        "town center japanese", 
        "town center norse"
    ],
    # atlantean have manor instead of house
    "house" : [
        "house aztec", 
        "house chinese", 
        "house egyptian", 
        "house greek", 
        "house japanese", 
        "house norse"
    ],
    "farm" : [
        "farm atlantean", 
        "farm aztec", 
        "farm chinese", 
        "farm egyptian", 
        "farm greek", 
        "farm japanese", 
        "farm norse"
    ],
    "granary": [
        "granary egyptian",
        "granary greek"
    ],
    "mining camp": [
        "mining camp egyptian",
        "mining camp japanese"
    ],
    "wooden wall" : [
        "wooden wall atlantean", 
        "wooden wall aztec", 
        "wooden wall chinese", 
        "wooden wall egyptian", 
        "wooden wall greek", 
        "wooden wall japanese", 
        "wooden wall norse"
    ],
    "stone wall" : [
        "stone wall atlantean", 
        "stone wall aztec", 
        "stone wall chinese", 
        "stone wall egyptian", 
        "stone wall greek", 
        "stone wall japanese", 
        "stone wall norse"
    ],
    "fortified wall" : [
        "fortified wall chinese", 
        "fortified wall egyptian", 
        "fortified wall greek", 
        "fortified wall japanese", 
    ],
    "dock" : [
        "dock atlantean", 
        "dock aztec", 
        "dock chinese", 
        "dock egyptian", 
        "dock greek", 
        "dock japanese", 
        "dock norse"
    ],
    "temple" : [
        "temple atlantean", 
        "temple aztec", 
        "temple chinese", 
        "temple egyptian", 
        "temple greek", 
        "temple japanese", 
        "temple norse"
    ],
    "sentry tower" : [
        "sentry tower atlantean", 
        "sentry tower chinese", 
        "sentry tower egyptian", 
        "sentry tower greek", 
        "sentry tower japanese", 
        "sentry tower norse"
    ],
    "armory" : [
        "armory atlantean", 
        "armory aztec", 
        "armory chinese", 
        "armory egyptian", 
        "armory greek", 
        "armory japanese", 
        "armory norse"
    ],
    "market" : [
        "market atlantean", 
        "market aztec", 
        "market chinese", 
        "market egyptian", 
        "market greek", 
        "market japanese", 
        "market norse"
    ],
    "medium cavalry" : [
        "medium cavalry chinese",
        "medium cavalry greek",
        "medium cavalry norse"
    ],
    "heavy cavalry" : [
        "heavy cavalry atlantean",
        "heavy cavalry chinese",
        "heavy cavalry greek",
        "heavy cavalry norse"
    ],
    "champion cavalry" : [
        "champion cavalry atlantean",
        "champion cavalry chinese",
        "champion cavalry greek",
        "champion cavalry norse"
    ],
    "watch tower" : [
        "watch tower atlantean",
        "watch tower chinese",
        "watch tower egyptian",
        "watch tower greek",
        "watch tower japanese",
        "watch tower norse",
    ], 
    "guard tower" : [
        "guard tower atlantean",
        "guard tower chinese",
        "guard tower egyptian",
        "guard tower greek",
        "guard tower japanese",
    ],
    "medium ranged soldiers" : [
        "medium ranged soldiers atlantean",
        "medium ranged soldiers chinese",
        "medium ranged soldiers greek",
    ],
    "heavy ranged soldiers" : [
        "heavy ranged soldiers atlantean",
        "heavy ranged soldiers chinese",
        "heavy ranged soldiers greek",
    ],
    "champion ranged soldiers" : [
        "champion ranged soldiers atlantean",
        "champion ranged soldiers chinese",
        "champion ranged soldiers greek",
    ],
    "medium infantry" : [
        "medium infantry atlantean",
        "medium infantry chinese",
        "medium infantry greek",
        "medium infantry norse"
    ],
    "heavy infantry" : [
        "heavy infantry atlantean",
        "heavy infantry chinese",
        "heavy infantry greek",
        "heavy infantry norse"
    ],
    "champion infantry" : [
        "champion infantry atlantean",
        "champion infantry chinese",
        "champion infantry greek",
        "champion infantry norse"
    ]
}

entries_to_copy_GD_cost_changes = {
    "town center egyptian": {
        "Wood_Cost": None,
        "Gold_Cost": "550"
    },
    "town center norse": {
        "Wood_Cost": "315",
    },
    "house egyptian": {
        "Wood_Cost": None,
    },
    "house norse": {
        "Wood_Cost": "45",
    },
    "farm atlantean": {
        "Wood_Cost": "150",
    },
    "farm egyptian": {
        "Wood_Cost": None,
        "Gold_Cost": "70"
    },
    "granary egyptian": {
        "Wood_Cost": None
    },
    "mining camp japanese": {
        "Wood_Cost": "25"
    },
    "dock atlantean": {
        "Wood_Cost": "125",
    }, 
    "dock egyptian": {
        "Wood_Cost": None,
        "Gold_Cost": "50"
    },
    "dock norse": {
        "Wood_Cost": "90",
    },
    "temple egyptian": {
        "Wood_Cost": None,
    },
    "temple norse": {
        "Wood_Cost": "135",
    },
    "sentry tower egyptian": {
        "Wood_Cost": None,
        "Gold_Cost": "200"
    }, 
    "armory egyptian": {
        "Wood_Cost": None,
    }, 
    "armory norse": {
        "Wood_Cost": "135",
    },
    "market egyptian": {
        "Wood_Cost": None,
    },  
    "market norse": {
        "Wood_Cost": "135",
    },
    "heavy cavalry atlantean": {
        "Food_Cost": "300",
        "Gold_Cost": "150",
    },
    "champion cavalry atlantean": {
        "Food_Cost": "525",
        "Gold_Cost": "150",
    },
    "watch tower egyptian": {
        "Wood_Cost": "45",
        "Gold_Cost": "90",
    },
    "guard tower egyptian": {
        "Wood_Cost": "270",
        "Gold_Cost": "270",
    }, 
}
 

data_dict = {}
data_dict_GD = {}

keys = data.keys()

# global index_master_counter
index_master_counter = 0
suffix_index_list = []
# items_entered_duplicate_prevention_tracker = {}
df_isnan = data.isna()

print('data.isna(): ', data.isna())
print('type(df_isnan): ', type(df_isnan))

with open('src\\caret_duplication_list.json', 'r') as file:
    
    print('caret_duplication_list.json:', file) #placeholder for now
    caret_duplicates_dictXX = json.load(file)
    caret_duplicates_dictXX_keys = list(caret_duplicates_dictXX.keys())

with open('game_data\\extracted_data\\units-data-from-xml.json') as file:
    units_dict_GD = json.load(file)

with open('game_data\\extracted_data\\buildings-data-from-xml.json') as file:
    buildings_dict_GD = json.load(file)

with open('game_data\\extracted_data\\techtree_data_from_xml.json') as file:
    techs_dict_GD = json.load(file)

    
duplciates_found = []
row_list_test = []

def generate_new_dict_item(index, row, keys, version = None):
    new_item_dict = {}
    global index_master_counter
    global suffix_index_list

    global duplciates_found
    global row_list_test
    
    print("row['Name']", row['Name'])
    
    for value, key in zip(row, keys):

        if df_isnan.loc[index, key]:
            new_item_dict[key] = None
        else:
            if isinstance(value, str):
                new_item_dict[key] = value.replace(" '", "")

            else:
                new_item_dict[key] = value
        
            if key == 'Suffixes':
                suffix_index_list.append(index)

    if version:
        new_item_dict["Version_Suffix"] = version["suffix"]
        new_item_dict["Parent_Caret_Name"] = version["parent_caret"]
    else:
        new_item_dict["Version_Suffix"] = None
        new_item_dict["Parent_Caret_Name"] = None
    
    new_item_dict['id'] = index_master_counter
    data_dict[index_master_counter] = new_item_dict
    index_master_counter += 1
#                                                                           # keys of the inner field
# generate_new_dict_item_from_game_data(unit_key, units_dict_GD[unit_key], data_fields_unit_dict, version = version)

# def generate_new_dict_item_from_game_data(index, row, keys, version = None):

version_in_gen_function_list = []
version_info_if_version_inside_list = []


protoaction_entered_tracker = []

attack_list_tracker = []
name_entered_list = []

def generate_new_dict_item_from_game_data(indviual_unit_dict, version = None):
    new_item_dict = {}
    global index_master_counter

    global protoaction_entered_tracker
    global attack_list_tracker    

    if version is not None:
        version_in_gen_function_list.append((version, index_master_counter))
        new_item_dict = copy.deepcopy(indviual_unit_dict)
    else:
        new_item_dict = indviual_unit_dict
    Attack_List = []
    try:
        # if "protoaction" in new_item_dict:
            # new_protoaction_item["Attack_List"] = []
        for protoaction in new_item_dict["protoactions"]:
            new_protoaction_item = {}
            if "name" in protoaction:
                new_protoaction_item["Attack_Type"] = protoaction["name"]
                name_entered_list.append([protoaction["name"], new_protoaction_item])
            # if protoaction["rof"]:
            if "rof" in protoaction:
                new_protoaction_item["Rate_of_fire"] = protoaction["rof"]

            if "maxrange" in  protoaction:
                new_protoaction_item["Range"] = protoaction["maxrange"]

            if "minrange" in protoaction:
                new_protoaction_item["Min_Range"] = protoaction["minrange"]

            if "damage" in protoaction and isinstance(protoaction["damage"], dict):
                damage_entry = protoaction["damage"]
                if damage_entry["@type"] == "Hack":
                        new_protoaction_item["Hack_Damage"] = damage_entry["#text"]
                elif damage_entry["@type"] == "Pierce":
                    new_protoaction_item["Pierce_Damage"] = damage_entry["#text"]
                elif damage_entry["@type"] == "Crush":
                    new_protoaction_item["Crush_Damage"] = damage_entry["#text"]
                elif damage_entry["@type"] == "Divine":
                    new_protoaction_item["Divine_Damage"] = damage_entry["#text"]
                
            if "damage" in protoaction and isinstance(protoaction["damage"], list):
                for damage_entry in protoaction["damage"]:
                    if damage_entry["@type"] == "Hack":
                        new_protoaction_item["Hack_Damage"] = damage_entry["#text"]
                    elif damage_entry["@type"] == "Pierce":
                        new_protoaction_item["Pierce_Damage"] = damage_entry["#text"]
                    elif damage_entry["@type"] == "Crush":
                        new_protoaction_item["Crush_Damage"] = damage_entry["#text"]
                    elif damage_entry["@type"] == "Divine":
                        new_protoaction_item["Divine_Damage"] = damage_entry["#text"]

            if "damagebonus" in protoaction and isinstance(protoaction["damagebonus"], dict):
                new_protoaction_item[f"Bonus_Multiplier_vs_{f"{protoaction["damagebonus"]["@type"]}"}"] = protoaction["damagebonus"]["#text"]
            # does this one key error now?
            if "damagebonus" in protoaction and isinstance(protoaction["damagebonus"], list):
                for bonus_damage_entry in protoaction["damagebonus"]:
                    new_protoaction_item[f"Bonus_Multiplier_vs_{bonus_damage_entry["@type"]}"] = bonus_damage_entry["#text"]
            
            protoaction_entered_tracker.append(new_protoaction_item)
            if new_protoaction_item:
                Attack_List.append(new_protoaction_item)

        new_item_dict["Attack_List"] = Attack_List
        # attack_list_tracker.append(Attack_List)
        

            #     if new_protoaction_item:
    #               Attack_List.append(new_protoaction_item)
    #         new_item_dict['Attack_List'] = Attack_List
            # else:
    except KeyError:
        try:
            # attack_list_tracker.append(protoaction["name"])
            attack_list_tracker.append(new_item_dict["Name"])
        except KeyError:
            print(KeyError)
        print(f'KeyError in protoaction try: {KeyError}')    
    
    if version:
        version_info_if_version_inside_list.append((version["suffix"], version["parent_caret"], index_master_counter))
        new_item_dict["Version_Suffix"] = version["suffix"]
        new_item_dict["Parent_Caret_Name"] = version["parent_caret"]
    else:
        new_item_dict["Version_Suffix"] = None
        new_item_dict["Parent_Caret_Name"] = None

    new_item_dict["Schema_Type"] = 'GD'    
    new_item_dict['id'] = index_master_counter
    data_dict_GD[index_master_counter] = new_item_dict
    
    index_master_counter += 1

    

# print("df_isnan.loc[1,'Wood']: ", df_isnan.loc[1,'Wood']) 
if_entered_test = []

# data_fields_unit_dict = units_dict_GD[list(units_dict_GD.keys())[0]]
print('units_dict_GD.keys(): ', units_dict_GD.keys())

# for unit_key, data_field in zip(units_dict_GD.keys(), data_fields_unit_dict):

# generate_new_dict_item_from_game_data(units_dict_GD["HOPLITE"])

entries_to_copy_print_list = []
entries_to_copy_print_list2 = []

version_add_list = []
for key in units_dict_GD.keys():
    print('key: ', key)
    try:
        display_name = units_dict_GD[key]['Display_Name']
    except KeyError:
        print(f'KeyError: units_dict_GD[{key}] has no key "Display_Name"')
    print('display_name: ', display_name)
    if (display_name in caret_duplicates_dictXX_keys):
        for version in caret_duplicates_dictXX[display_name]["versions"]:
            version_add_list.append(version)
            generate_new_dict_item_from_game_data(units_dict_GD[key], version = version)
    else:
        generate_new_dict_item_from_game_data(units_dict_GD[key])


for key in buildings_dict_GD.keys():
    print('key: ', key)
    try:
        display_name = buildings_dict_GD[key]['Display_Name']
    except KeyError:
        print(f'KeyError: buildings_dict_GD[{key}] has no key "Display_Name"')
    print('display_name: ', display_name)
    if (display_name in caret_duplicates_dictXX_keys):
        for version in caret_duplicates_dictXX[display_name]["versions"]:
            version_add_list.append(version)
            generate_new_dict_item_from_game_data(buildings_dict_GD[key], version = version)
    elif display_name in entries_to_copy_GD.keys():
            for pantheon_specific_name in entries_to_copy_GD[display_name]:
                entries_to_copy_print_list.append(pantheon_specific_name)
                generate_new_dict_item_from_game_data(copy.deepcopy(buildings_dict_GD[key]))
                data_dict_GD[index_master_counter - 1]["Descriptive_Name"] = pantheon_specific_name # this line changes Descriptive_Name2 for all of said display_name

            # for generic_name in entries_to_copy_GD.keys():
            #     entries_to_copy_print_list.append(generic_name)
            #     for pantheon_specfic_name in entries_to_copy_GD[generic_name]:
            #         entries_to_copy_print_list2.append((generic_name, pantheon_specfic_name))
            #         generate_new_dict_item_from_game_data(buildings_dict_GD[key])
            #         data_dict_GD[index_master_counter - 1]["Descriptive_Name2"] = pantheon_specfic_name
    else:
        generate_new_dict_item_from_game_data(buildings_dict_GD[key])

for key in techs_dict_GD.keys():
    print('key: ', key)
    try:
        display_name = techs_dict_GD[key]['Display_Name']
    except KeyError:
        print(f'KeyError: techs_dict_GD[{key}] has no key "Display_Name"')
    print('display_name: ', display_name)
    if (display_name in caret_duplicates_dictXX_keys):
        for version in caret_duplicates_dictXX[display_name]["versions"]:
            version_add_list.append(version)
            generate_new_dict_item_from_game_data(techs_dict_GD[key], version = version)
    elif display_name in entries_to_copy_GD.keys():
        for pantheon_specific_name in entries_to_copy_GD[display_name]:
            entries_to_copy_print_list.append(pantheon_specific_name)
            generate_new_dict_item_from_game_data(copy.deepcopy(techs_dict_GD[key]))
            data_dict_GD[index_master_counter - 1]["Descriptive_Name"] = pantheon_specific_name
    else:
        generate_new_dict_item_from_game_data(techs_dict_GD[key])

    
    
# zip is used for parallel iteration
# for index, row in data.iterrows():
#     if (row['Name'] in caret_duplicates_dictXX_keys):
#         if_entered_test.append(row['Name'])
#         print("*DUP row['Name']: ", row['Name'])
#         for version in caret_duplicates_dictXX[row['Name']]["versions"]:
#             generate_new_dict_item(index, row, keys, version = version)
#     else:
#         generate_new_dict_item(index, row, keys)


# print('suffix_index_list', suffix_index_list)


keys_data_dict = list(data_dict.keys())

print('data_dict_GD: ', data_dict_GD)

for key in keys_data_dict:
    print(f"data_dict[{key}]['Name']: ", data_dict[key]['Name'])

aom_game_data_json = json.dumps(data_dict_GD, indent=4)

with open('src\\data_GD_units.json', 'w') as file:
    file.write(aom_game_data_json)

js_string = ""

test_list = []

index_test_counter = -1

# need to determine if this is code is still useful
protoaction_name_list = []
duplicate_count = 0
# for unit in units_dict_GD.values():
#     try:
#         for p_action in unit["protoactions"]:
#             if p_action["name"]["text_value"] not in protoaction_name_list:
#                 protoaction_name_list.append(p_action["name"]["text_value"])
#             else:
#                 duplicate_count += 1
#     except KeyError:
#         print(KeyError)


carets_to_add_txt_img_type = []

file_path = Path(__file__).parent / "src" / "data.json"
print('file_path: ', file_path)

with open('src\\data_TI.json', 'r') as file:
    units_data_TI = json.load(file)

data_dict_GD_display_name_list = []
data_dict_GD_display_name_type_list =[]
data_dict_GD_display_name_type_dict = {}
data
for entry in data_dict_GD.values():
    try:
        data_dict_GD_display_name_list.append(entry["Display_Name"])
        data_dict_GD_display_name_type_dict[entry["Display_Name"]] = entry["Type"]
    except KeyError:
        print('KeyError: ', KeyError)

minor_god_found_list = []
entries_not_in_GD_version = []
TI_entries_try_entered_list = []
for entry in units_data_TI.values():
    if "Name" in  entry and entry["Name"] == 'of-tagline':
        continue
    # if entry["Type"] != "unit" and entry["Type"] != "building" and entry["Type"] != "tech":
    try:
        if entry['Type'] == 'minor_god' or entry['Type'] == 'god_power' or entry['Type'] == 'bushido_god_blessing' or entry['Name'] == 'oracle unit':
            # minor_god_found_list.append(entry["Name"])
            pass
        elif entry["Name"] not in data_dict_GD_display_name_list:
            TI_entries_try_entered_list.append(entry["Name"])
            entry["Schema_Type"] = "TI"
            entry["id"] = index_master_counter
            data_dict_GD[index_master_counter] = entry
            index_master_counter += 1
            entries_not_in_GD_version.append(entry["Name"])
        # covers the cases where Gaia, Kronos etc already exsists as major_gods in TI data bu then also exists at units (Titans) in GD
        elif entry["Type"] != data_dict_GD_display_name_type_dict[entry["Name"]]:
            TI_entries_try_entered_list.append(entry["Name"])
            entry["Schema_Type"] = "TI"
            entry["id"] = index_master_counter
            data_dict_GD[index_master_counter] = entry
            index_master_counter += 1
            entries_not_in_GD_version.append(entry["Name"])
    except KeyError:
        print('KeyError: ', KeyError)

    # if entry["Display_Name"] in entries_to_copy_GD_cost_changes.keys():

print('data_dict_GD: ', data_dict_GD)

with open('game_data\\extracted_data\\godpowers-data.json', 'r') as file:
    godpowers_dict = json.load(file)

gp_subsitute_name_dict = {
    'monolithoftlaloc': 'pillar of tl\u00e1locan', 
    'plentyvault': 'plenty'
}

test_list3 = []
test_list4 =[]
test_list5 = []
test_list6 = []

for gp_entry in godpowers_dict.values():
    if 'NAME' in gp_entry.keys():
        gp_entry['Name'] = gp_entry['NAME'].lower()
        gp_entry['Display_Name'] = gp_entry['NAME'].lower()
    else:
        gp_entry['Name'] = gp_entry['name'].lower()
        gp_entry['Display_Name'] = gp_entry['name'].lower()
    
    if gp_entry['Name'] in  gp_subsitute_name_dict.keys():
        test_list3.append(gp_entry['Name'])
        gp_entry['Name'] = gp_subsitute_name_dict[gp_entry['Name']]
        gp_entry["Display_Name"] = gp_entry['Name']
        test_list3.append(gp_entry['Name'])
        test_list4.append(gp_entry)

    test_list5.append(gp_entry['Name'])
    gp_entry['Type'] = 'god_power'
    gp_entry['Schema_Type'] = 'GD'
    gp_entry['id'] = index_master_counter
    gp_entry['Version_Suffix'] = None
    data_dict_GD[index_master_counter] = gp_entry
    test_list6.append(data_dict_GD[index_master_counter]['Name'])
    index_master_counter += 1

with open('game_data\\extracted_data\\ST_bushido_en_data.json', 'r') as file:
    bushido_dict = json.load(file)

for b_entry in bushido_dict.values():
    # `<span class="cost gold" title=" Gold"></span> `
    # `<span class="cost favor" title=" Favor"></span> `
    b_entry['LR'] = b_entry['LR'].replace('<icon=\\(24)(in_game/res_gold.png)\\>', '<span class="cost gold" title=" Gold"></span>')
    b_entry['LR'] = b_entry['LR'].replace('<icon=\\(24)(in_game/res_favor.png)\\>', '<span class="cost favor" title=" Favor"></span>')
    #<icon=\\(24)(in_game/vet_tooltip_medium_gh.png)\\>
    b_entry['LR'] = b_entry['LR'].replace('<icon=\\(24)(in_game/vet_tooltip_medium_gh.png)\\>', ' ')
    b_entry['LR'] = b_entry['LR'].replace('<icon=\\(24)(in_game/vet_tooltip_medium.png)\\>', ' ')
    b_entry['LR'] = b_entry['LR'].replace('<icon=\\(24)(in_game/vet_tooltip_medium_sa.png)\\>', ' ')
    b_entry['LR'] = b_entry['LR'].replace('\\n', '<br>')
    
    b_entry["Display_Name"] = b_entry["Name"]
    b_entry['Type'] = 'bushido_god_blessing'
    b_entry['Schema_Type'] = 'GD'
    b_entry['id'] = index_master_counter
    b_entry['Version_Suffix'] = None
    data_dict_GD[index_master_counter] = b_entry
    index_master_counter += 1

with open('game_data\\extracted_data\\ST_god_blessing_en_data.json', 'r') as file:
    god_blessing_dict = json.load(file)

    for gb_entry in god_blessing_dict.values():
        gb_entry["Display_Name"] = gb_entry["Name"]
        gb_entry['Type'] = 'bushido_god_blessing'
        gb_entry['Schema_Type'] = 'GD'
        gb_entry['id'] = index_master_counter
        gb_entry['Version_Suffix'] = None
        data_dict_GD[index_master_counter] = gb_entry
        index_master_counter += 1
    
    # \n
# with open('')

# aom_game_data_json = json.dumps(data_dict_GD, indent=4)

# with open('src\\data_GD_units.json', 'w') as file:
#     file.write(aom_game_data_json)

# with open('src\\data.json', 'w') as file:
#     file.write(aom_game_data_json)

# generate the TI-GD mixed version of units.json

# MINOR_GOD_list = ['PATECATL', 'MALINALXOCHITL', 'COATLICUE', 'ITZPAPALOTL', 'TLALOC', 'Mictlantecuhtli', 'HUEHUECOYOTL', 'COYOLXAUHQUI', 'XOLOTL', 'AME_NO_UZUME', 'MINAKATATOMI', 'HACHIMAN', 'RAIJIN', 'TAKEMIKAZUCHI', 'Okuninushi', 'OKUNINUSHI', 'INARI_OKAMI', 'FUJIN', 'WATATSUMI', 'XUANNU', 'CHIYOU', 'GOUMANG', 'NUBA', 'GONGGONG', 'HUANGDI', 'HOUTU', 'RUSHOU', 'ZHURONG', 'ATHENA', 'HERMES', 'APOLLO', 'DIONYSUS', 'HEPHAESTUS', 'HERA', 'ARES', 'APHRODITE', 'ARTEMIS', 'PAN', 'HESTIA', 'PERSEPHONE', 'BAST', 'PTAH', 'SOBEK', 'SEKHMET', 'OSIRIS', 'HORUS', 'ANUBIS', 'NEPHTHYS', 'THOTH', 'FREYJA', 'FORSETI', 'SKADI', 'BRAGI', 'BALDR', 'TYR', 'HEIMDALL', 'NJORD', 'HEL', 'ULLR', 'AEGIR', 'VIDAR', 'PROMETHEUS', 'LETO', 'HYPERION', 'RHEIA', 'HELIOS', 'Atlas', 'OCEANUS', 'THEIA', 'HEKATE']

# for entry in data_dict_GD.values():
#     if 

js_string

test_list_cost_change = []
test_list_all = []
test_list_mg_2 = []
const_name_type_dicts_seen_already = {}
duplicate_different_types = []
duplicate_same_types = []

### Add Name Display exceptions here
name_display_exceptions = [
    'teixiptla (hero)'
]

#generating list of duplicate carets of different type
Name_not_in_list = []
for key in data_dict_GD.keys():
    # adding "Name" field to GD entries
    try:
        ## setting costs_changes for shared carets here
        # if "Display_Name" in data_dict_GD[key].keys() and data_dict_GD[key]["Display_Name"] in entries_to_copy_GD_cost_changes.keys():
        if "Descriptive_Name" in data_dict_GD[key].keys():
            test_list_all.append(data_dict_GD[key]["Descriptive_Name"])
        if "Descriptive_Name" in data_dict_GD[key].keys() and data_dict_GD[key]["Descriptive_Name"] in entries_to_copy_GD_cost_changes.keys():
            test_list_cost_change.append(key)
            #erroring out here
            for field in entries_to_copy_GD_cost_changes[data_dict_GD[key]["Descriptive_Name"]]:
                # if field in data_dict_GD[key].keys():
                data_dict_GD[key][field] = entries_to_copy_GD_cost_changes[data_dict_GD[key]["Descriptive_Name"]][field]  
                
        ## setting Descriptive name entries not in entries_to_copy_GD and adding Name (the name actually displayed in app/browser) field for entires missiing it
        if "Descriptive_Name" in data_dict_GD[key].keys():
            pass
        # elif "Name" in data_dict_GD[key] and "(hero)" in data_dict_GD[key]["Display_Name"] and data_dict_GD[key]["Display_Name"] not in caret_duplicates_dictXX_keys:
        #     data_dict_GD[key]["Descriptive_Name"] = data_dict_GD[key]["Name"] + '_(HERO)'
        elif data_dict_GD[key]["Display_Name"] in name_display_exceptions:
            data_dict_GD[key]["Descriptive_Name"] = data_dict_GD[key]["Name"] + '_(HERO)'
        # elif "Name" in data_dict_GD[key]:
        #     data_dict_GD[key]["Descriptive_Name"] = data_dict_GD[key]["Name"]
        # else:
        #     data_dict_GD[key]["Descriptive_Name"] = data_dict_GD[key]["Display_Name"]
        data_dict_GD[key]["Name"] = data_dict_GD[key]["Display_Name"] ### this is the line where Teixiptla fails
        
        if "Name" not in data_dict_GD[key]:
            # try:
                # data_dict_GD[key]["Name"] = data_dict_GD[key]["Display_Name"]
                Name_not_in_list.append(data_dict_GD[key]["Display_Name"])
            # except KeyError:
                print('KeyError: ', KeyError)
    except KeyError:
        print('KeyError: ', KeyError)
    # if "Name" not in data_dict_GD[key]:
    #     try:
    #         data_dict_GD[key]["Name"] = data_dict_GD[key]["Display_Name"]
    #         Name_not_in_list.append(data_dict_GD[key]["Display_Name"])
    #     except KeyError:
    #         print('KeyError: ', KeyError)


    print('data_dict_GD[key]: ', data_dict_GD[key])
    try:
        if data_dict_GD[key]["Version_Suffix"]:
            version_suffix_for_duplicates = f'_{data_dict_GD[key]["Version_Suffix"]}'
        else:
            version_suffix_for_duplicates = ''
        
        # if  "Name" in data_dict_GD[key] and data_dict_GD[key]["Name"] in name_display_exceptions:
        #     name = data_dict_GD[key]["Descriptive_Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
        if "Name" in data_dict_GD[key]:
            name = data_dict_GD[key]["Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
        else:
            name = data_dict_GD[key]["NAME"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates

        #const_name will be the variable (const) name in unit.ts
        # do we need to check for "Name"??
        if "Descriptive_Name" in data_dict_GD[key] and "Name" in data_dict_GD[key] and data_dict_GD[key]["Name"] in name_display_exceptions:
            const_name = data_dict_GD[key]["Descriptive_Name"].strip().replace('-', '_').replace("'", "")
        else:
            const_name = name.replace('-', '_').replace("'", "")
        try:
            const_name_type = data_dict_GD[key]["Type"]
        except KeyError:
            print('KeyError: ', KeyError)
        if const_name in const_name_type_dicts_seen_already:
            # if const_name in const_name_type_dicts_seen_already:
            #     duplicate_different_types.append(const_name)
            # print()
            if const_name_type_dicts_seen_already[const_name] != const_name_type:
                duplicate_different_types.append(const_name)
            elif const_name_type_dicts_seen_already[const_name] == const_name_type:
                #do not add dupulicate as the type is the same 
                pass
    except AttributeError as e:
        print('error: ', e)
        print('data_dict_GD[key]: ', data_dict_GD[key])

    # const_name_list.append(const_name)
    try:
        const_name_type_dicts_seen_already[const_name] = data_dict_GD[key]["Type"]
    except KeyError:
        print('KeyError - const_name_type_dicts_seen_already[const_name] = data_dict_GD["Type"]: ', KeyError)

    # if data_dict_GD[key]['Type'] == 'minor_god':
    #     test_list_mg.append(data_dict_GD[key]['Name'])
    #     try:
    #         minor_god_name = data_dict_GD[key]['Name'].lower()
    #         if minor_god_name == 'xuannu':
    #             minor_god_name = 'xuann\u00fc'
    #         for entry in data_dict_GD.values():
    #             test_list_mg_2.append(entry['id'])
    #             # if 'Display_Name' in entry.keys():
    #             if 'Display_Name' in entry.keys() and entry['Display_Name'] == minor_god_name and entry['Type'] == 'tech':
    #                 test_list_mg_2.append(entry['id'])
    #                 data_dict_GD[key] = copy.deepcopy(entry)
    #                 data_dict_GD[key]['Type'] = 'minor_god'
    #                 data_dict_GD[key]['id'] = key
                
    #     except:
    #         print('error tech to minor_god LR data')

aom_game_data_json = json.dumps(data_dict_GD, indent=4)

with open('src\\data_GD_units.json', 'w') as file:
    file.write(aom_game_data_json)

with open('src\\data.json', 'w') as file:
    file.write(aom_game_data_json)


names_added_to_js_string_list = []
for key in data_dict_GD.keys():
    if data_dict_GD[key]["Version_Suffix"]: #tired is not None
        version_suffix_for_duplicates = f'_{data_dict_GD[key]["Version_Suffix"]}'
    else:
        version_suffix_for_duplicates = ''
    
    # test_list.append({key: version_suffix_for_duplicates})
    # print ('key: ', key)
    # if "Descriptive_Name" in data_dict_GD[key] and data_dict_GD[key]["Descriptive_Name"]:
        
    #     pass
    if "Name" in data_dict_GD[key] and data_dict_GD[key]["Name"] is not None and data_dict_GD[key]["Schema_Type"] == 'TI':
        print('data_dict_GD[key]["Name"]: ', data_dict_GD[key]["Name"], 'key: ', key)
        name = data_dict_GD[key]["Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
    # elif "Descriptive_Name" in data_dict_GD[key]:
    #     name = data_dict_GD[key]["Descriptive_Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
    elif "Display_Name" in data_dict_GD[key]:
        name = data_dict_GD[key]["Display_Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
    else:
        continue
    type = data_dict_GD[key]["Type"]
    # if "Name" in data_dict_GD[key] and data_dict_GD[key]["Name"] in name_display_exceptions:
    #     const_name = data_dict_GD[key]["Descriptive_Name"].strip().replace('-', '_').replace("'", "").replace("’", "").replace('(', '').replace(')', '')
    if "Descriptive_Name" in data_dict_GD[key]:
        const_name = data_dict_GD[key]["Descriptive_Name"].strip().replace(' ', '_').replace('-', '_').replace("'", "").replace("’", "").replace('(', '').replace(')', '').upper()
    else:
        const_name = name.replace('-', '_').replace("'", "").replace("’", "")

    if const_name == '':
        test_list.append(f"'' found, key: {key}")
        continue

    # if f' const_name ' in js_string:
        # js_string.replace(const_name, f'')
        # js_string += f"\nexport const {const_name}_{type} = {{id: {key}, name: '{name.replace("'", "")}', type: '{type}'}};"
    # else:
    #     js_string += f"\nexport const {const_name} = {{id: {key}, name: '{name.replace("'", "")}', type: '{type}'}};"

    # js_string += f"\nexport const {name.replace('-', '_').replace("'", "")} = {{id: {key}, name: '{name.replace("'", "")}', type: '{type}'}};"
    if const_name in duplicate_different_types:
        js_string += f"\nexport const {const_name}_{type.upper()} = {{id: {key}, name: '{name.replace("'", "").replace("’", "")}', type: '{type}'}};"
        names_added_to_js_string_list.append(const_name)
    elif const_name not in names_added_to_js_string_list:
        js_string += f"\nexport const {const_name} = {{id: {key}, name: '{name.replace("'", "").replace("’", "")}', type: '{type}'}};"
        names_added_to_js_string_list.append(const_name)
    index_test_counter += 1

with open('src\\ts\\units_GD-TI.ts', 'w', encoding='utf-8') as file:
    file.write(js_string)

with open('src\\ts\\units.ts', 'w', encoding='utf-8') as file:
    file.write(js_string)


# for entry in duplicate_different_types:
#     print("entry - duplicate_different_types: ", entry)

for name in names_added_to_js_string_list:
    print('name - names_added_to_js_string_list: ', name)


print("data_dict_GD_display_name_type_dict: ",  data_dict_GD_display_name_type_dict)

def reformat_item_name(name):
    print('og name: ', name)
    name.replace(" ", "_")
    prohibited_strs = ['_LH', '_HF', 'N_']
    for sub_str in prohibited_strs:
        if sub_str in name:
            name = name.replace(f"{sub_str}", "") # this doesn't work # or does it work, need to test
    name = name.strip().replace(" ", "_").replace("'", '')
    return name

### current paths work in powershell,  *** need to change file paths to run the shutil.copy() on wsl

desc_Name_img_list = []

def update_img(item_dict):
    item_id = item_dict['id']
    # if "Descriptive_Name" in item_dict.keys() and item_dict["Name"] in name_display_exceptions:
    if "Descriptive_Name" in item_dict.keys():
        item_name = reformat_item_name(item_dict['Descriptive_Name']).lower()
        desc_Name_img_list.append(item_name)       
    else:
        item_name = reformat_item_name(item_dict['Name'])
    item_type = item_dict['Type'] ## .strip() removed ## icon images are missing - add them is still TODO
    
    old_file_path_png = '####_####_icon.png'
    new_file_path_png = '###.png'

    if item_type == 'unit' or item_type == 'building' or item_type == 'tech':
        old_file_path = f'src\\img\\{item_name}_icon.webp' 
        new_file_path = f'src\\img\\{item_type}s\\{item_id}.webp' 
    elif item_type == 'major_god': # Major_God
        old_file_path = f'src\\img\\{item_name}_icon.webp'  
        new_file_path = f'src\\img\\{item_type}s\\{item_id}.webp' 
        old_file_path_artwork = f'src\\img\\{item_name}_artwork.webp'
        new_file_path_artwork = f'src\\img\\{item_type}s_artwork\\{item_id}.webp'
    elif item_type == 'minor_god':
        old_file_path = f'src\\img\\{item_name}_icon.webp'  
        old_file_path_png = f'src\\img\\{item_name}_icon.png'  
        new_file_path = f'src\\img\\{item_type}s\\{item_id}.webp' 
        new_file_path_png = f'src\\img\\{item_type}s\\{item_id}.png'
    else: #god_power
        old_file_path = f'src\\img\\{item_name}_icon.webp'  
        new_file_path = f'src\\img\\{item_type}s\\{item_id}.webp'
        if item_type == 'bushido_god_blessing':
            print('else: path used for bushido!!!')
            print('new_file_path: ', new_file_path)
            # old_file_path = 'img\way_of_the_moon_(bushido)_icon.webp'
        
    print(f'before shutil.copy() - old_file_path: {old_file_path} , new_file_path: {new_file_path}')
    try:
        shutil.copy(old_file_path, new_file_path)
        print(f"{old_file_path} copied to {new_file_path}")
    except FileNotFoundError:
        print(f"Error: Source file (WEBP) '{old_file_path}' not found. \nnew_file_path: {new_file_path}")
        try:
            shutil.copy(old_file_path_png, new_file_path_png)
            print(f"{old_file_path_png} copied to {new_file_path_png}")
        except FileNotFoundError:
            print(f"Error: Source file (PNG) '{old_file_path_png}' not found. \nnew_file_path: {new_file_path_png}")
        except Exception as e:
            print(f"An error occured: {e}")
    
    except Exception as e:
        print(f"An error occured: {e}")

    if item_type == 'major_god':
        try:
            shutil.copy(old_file_path_artwork, new_file_path_artwork)
            print(f"{old_file_path_artwork} copied to {new_file_path_artwork}")
        except FileNotFoundError:
            print(f"Error: Source file '{old_file_path_artwork}' not found. \nnew_file_path: {new_file_path_artwork}")
        except Exception as e:
            print(f"An error occured: {e}")

    # try:
    #     os.rename(f'img/test/AoMR_{item_name}_icon.webp', f'img/test/{item_id}.webp')

    # except OSError as e:
    #     print(f"Error renaming file: {e}")

### remane text_image files

# dir_path = 'img/'
# print(os.listdir(dir_path))

# for old_file_name in os.listdir(dir_path):
#     print(f'old_file_name: {old_file_name}')
#     new_file_name = old_file_name.lower()
#     print(f'new_file_name: {new_file_name}')
#     os.rename(f'{dir_path}{old_file_name}', f'{dir_path}{new_file_name}')

# parent-dir-path
dir_path = 'src/img/'
# print(os.listdir(dir_path))

sub_dirs = ['buildings', 'bushido_god_blessings', 'god_powers', 'major_gods', 'major_gods_artwork', 'minor_gods', 'techs', 'units']

# clear old photos
def clear_directory(directory_path):
    for file in os.listdir(directory_path):
        print(f'file: {file}, dir_path: {directory_path}')
        print(f'{directory_path}/{file}')
        if os.path.exists(f'{directory_path}/{file}'):
            os.remove(f'{directory_path}/{file}')

for sub_dir in sub_dirs:
    print('sub_dir: ', sub_dir)
    print("{dir_path}{sub_dir}:", f'{dir_path}{sub_dir}')
    clear_directory(f'{dir_path}{sub_dir}')

for old_file_name in os.listdir(dir_path):
    # print(f'old_file_name: {old_file_name}')
    new_file_name = old_file_name.lower().replace('aomr_', '').replace('_aomr','') 
    # print(f'new_file_name: {new_file_name}')
    os.rename(f'{dir_path}{old_file_name}', f'{dir_path}{new_file_name}')
    

# for key in data_dict:
#     item_dict = data_dict[key]
#     update_img(item_dict)

for key in data_dict_GD:
    print('key', key)
    item_dict = data_dict_GD[key]
    # maybe remove print("item_dict['Name']: ", item_dict['Name']) or add a try, excpet block
    print("item_dict['Name']: ", item_dict['Name'])
    update_img(item_dict)

# print('index_master_counter:', index_master_counter)


img_dir_list = os.listdir(dir_path)

### In progress feature - handle duplicate carets

with open('src\\caret_duplication_list.json', 'r') as file:
    
    # print('caret_duplication_list.json:', file) #placeholder for now
    caret_duplicates_dict = json.load(file)
    # print('caret_duplicates_dict: ', caret_duplicates_dict)
    items = []
    for item in caret_duplicates_dict:
        # print('item', item)
        # print(f'caret_duplicates_dict[{item}]["versions"]: ', caret_duplicates_dict[item]["versions"])
        items.append(item)
    # print('items: ', items)
    data_indices_for_duplication = []

    for data_dict_item in data_dict:
        if data_dict[data_dict_item]['Name'] in items:
            # this adds the whole dict entry to the list
            # data_indices_for_duplication.append({data_dict[data_dict_item]['Name']: data_dict[data_dict_item]})
            data_indices_for_duplication.append({data_dict[data_dict_item]['Name']: data_dict[data_dict_item]['id']})

    # print('data_indices_for_duplication', data_indices_for_duplication)

    # data_dict[index_master_counter] = add duplicate entry here
        

 
# for key in data_dict_GD:
#     print('data_dict_GD[key]["Name"]: ', data_dict_GD[key]["Name"])

# print('test_list5', test_list5)
# print('test_list4', test_list4)
# print('test_list3: ', test_list3)
# print('test_list6: ', test_list6)

for entry in test_list_all:
    print('test_list_all entry: ', entry)

print('test_list_cost_change: ', test_list_cost_change)
