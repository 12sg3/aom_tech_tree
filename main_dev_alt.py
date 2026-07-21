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

entries_not_in_GD_version = []
TI_entries_try_entered_list = []
for entry in units_data_TI.values():
    # if entry["Type"] != "unit" and entry["Type"] != "building" and entry["Type"] != "tech":
    try:
        if entry["Name"] not in data_dict_GD_display_name_list:
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

print('data_dict_GD: ', data_dict_GD)

# aom_game_data_json = json.dumps(data_dict_GD, indent=4)

# with open('src\\data_GD_units.json', 'w') as file:
#     file.write(aom_game_data_json)

# with open('src\\data.json', 'w') as file:
#     file.write(aom_game_data_json)

# generate the TI-GD mixed version of units.json

MINOR_GOD_list = ['PATECATL', 'MALINALXOCHITL', 'COATLICUE', 'ITZPAPALOTL', 'TLALOC', 'Mictlantecuhtli', 'HUEHUECOYOTL', 'COYOLXAUHQUI', 'XOLOTL', 'AME_NO_UZUME', 'MINAKATATOMI', 'HACHIMAN', 'RAIJIN', 'TAKEMIKAZUCHI', 'Okuninushi', 'OKUNINUSHI', 'INARI_OKAMI', 'FUJIN', 'WATATSUMI', 'XUANNU', 'CHIYOU', 'GOUMANG', 'NUBA', 'GONGGONG', 'HUANGDI', 'HOUTU', 'RUSHOU', 'ZHURONG', 'ATHENA', 'HERMES', 'APOLLO', 'DIONYSUS', 'HEPHAESTUS', 'HERA', 'ARES', 'APHRODITE', 'ARTEMIS', 'PAN', 'HESTIA', 'PERSEPHONE', 'BAST', 'PTAH', 'SOBEK', 'SEKHMET', 'OSIRIS', 'HORUS', 'ANUBIS', 'NEPHTHYS', 'THOTH', 'FREYJA', 'FORSETI', 'SKADI', 'BRAGI', 'BALDR', 'TYR', 'HEIMDALL', 'NJORD', 'HEL', 'ULLR', 'AEGIR', 'VIDAR', 'PROMETHEUS', 'LETO', 'HYPERION', 'RHEIA', 'HELIOS', 'Atlas', 'OCEANUS', 'THEIA', 'HEKATE']

# for entry in data_dict_GD.values():
#     if 

js_string

test_list_mg = []
test_list_mg_2 = []
const_name_type_dicts_seen_already = {}
duplicate_different_types = []
duplicate_same_types = []
#generating list of duplicate carets of different type
Name_not_in_list = []
for key in data_dict_GD.keys():
    # adding "Name" field to GD entries
    try:
        data_dict_GD[key]["Name"] = data_dict_GD[key]["Display_Name"]
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
        if "Name" in data_dict_GD[key]:
            name = data_dict_GD[key]["Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
        else:
            name = data_dict_GD[key]["NAME"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
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
    if data_dict_GD[key]["Version_Suffix"]:
        version_suffix_for_duplicates = f'_{data_dict_GD[key]["Version_Suffix"]}'
    else:
        version_suffix_for_duplicates = ''
    
    # test_list.append({key: version_suffix_for_duplicates})
    # print ('key: ', key)
    if "Name" in data_dict_GD[key] and data_dict_GD[key]["Name"] is not None and data_dict_GD[key]["Schema_Type"] == 'TI':
        print('data_dict_GD[key]["Name"]: ',data_dict_GD[key]["Name"], 'key: ', key)
        name = data_dict_GD[key]["Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
    elif "Display_Name" in data_dict_GD[key]:
        name = data_dict_GD[key]["Display_Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
    else:
        continue
    type = data_dict_GD[key]["Type"]
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
        js_string += f"\nexport const {const_name}_{type} = {{id: {key}, name: '{name.replace("'", "").replace("’", "")}', type: '{type}'}};"
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

def update_img(item_dict):
    item_id = item_dict['id']
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

print('test_list_mg: ', test_list_mg)
print('test_list_mg_2', test_list_mg_2)