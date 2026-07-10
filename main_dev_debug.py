import pandas
import json
import copy
import shutil
import os

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

# changed for debug
with open('units-from-xml_debug.json') as file:
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
version_new_dict_item_list = []

version_index_master_counter = []

def generate_new_dict_item_from_game_data(indviual_unit_dict, version = None):
    new_item_dict = {}
    global index_master_counter

    # global version_in_gen_function_list
    # global version_info_if_version_inside_list
    # global version_new_dict_item_list
    # global version_index_master_counter

    if version is not None:
        version_in_gen_function_list.append((version, index_master_counter))
        new_item_dict = copy.deepcopy(indviual_unit_dict)
    else:
        new_item_dict = indviual_unit_dict
    # for key in indviual_unit_dict.keys():
    #     new_item_dict = indviual_unit_dict
        # new_item_dict['id'] = index_master_counter
        # index_master_counter += 1
    # new_item_dict = indviual_unit_dict
    # for value, key in zip(row, keys):

    #     if df_isnan.loc[index, key]:
    #         new_item_dict[key] = None
    #     else:
    #         if isinstance(value, str):
    #             new_item_dict[key] = value.replace(" '", "")

    #         else:
    #             new_item_dict[key] = value
        
    #         if key == 'Suffixes':
    #             suffix_index_list.append(index)

    if version:
        version_info_if_version_inside_list.append((version["suffix"], version["parent_caret"], index_master_counter))
        new_item_dict["Version_Suffix"] = version["suffix"]
        new_item_dict["Parent_Caret_Name"] = version["parent_caret"]
    else:
        new_item_dict["Version_Suffix"] = None
        new_item_dict["Parent_Caret_Name"] = None
        
    new_item_dict['id'] = index_master_counter
    data_dict_GD[index_master_counter] = new_item_dict
    if version is not None:
        # version_new_dict_item_list.append((new_item_dict['id'], new_item_dict['Parent_Caret_Name']))
        # version_index_master_counter.append(index_master_counter)
        # data_dict_GD[index_master_counter]['id'] = index_master_counter
        # version_index_master_counter.append(data_dict_GD[index_master_counter]['id'])
        # data_dict_GD[index_master_counter]['Parent_Caret_Name'] = '**TC_TEST**'
        pass
    index_master_counter += 1

    # if version:
    #     new_item_dict["Version_Suffix"] = version["suffix"]
    #     new_item_dict["Parent_Caret_Name"] = version["parent_caret"]
    # else:
    #     new_item_dict["Version_Suffix"] = None
    #     new_item_dict["Parent_Caret_Name"] = None
    
    # new_item_dict['id'] = index_master_counter
    # data_dict[index_master_counter] = new_item_dict
    # index_master_counter += 1

# print("df_isnan.loc[1,'Wood']: ", df_isnan.loc[1,'Wood']) 
if_entered_test = []

# data_fields_unit_dict = units_dict_GD[list(units_dict_GD.keys())[0]]
print('units_dict_GD.keys(): ', units_dict_GD.keys())

# for unit_key, data_field in zip(units_dict_GD.keys(), data_fields_unit_dict):
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

# need to add display name and name with suffixes in data.json
# need to decide if unit.ts still needs name field
# with open('src\\caret_duplication_list.json', 'r') as file:

# for key in data_dict_GD.keys():
#     if data_dict_GD[key]["Name"] == "BERSERK":
#         # not sure why TypeError int for id is not subscriptable
#         # print(data_dict_GD[key["id"]])
#         print('key: ', key)
    
#     print('caret_duplication_list.json:', file) #placeholder for now

aom_game_data_json = json.dumps(data_dict_GD, indent=4)

with open('src\\data_GD_units.json', 'w') as file:
    file.write(aom_game_data_json)


# aom_data_json = json.dumps(data_dict, indent=4)

# with open('src\\data.json', 'w') as file:

#     file.write(aom_data_json)

js_string = ""

test_list = []

index_test_counter = -1


print('version_in_gen_function_list: ', version_in_gen_function_list)
print('version_info_if_version_inside_list: ', version_info_if_version_inside_list)
print('version_new_dict_item_list: ', version_new_dict_item_list)

print('version_index_master_counter: ', version_index_master_counter)



for key in data_dict_GD.keys():
    
    if data_dict_GD[key]["Name"] == "BERSERK":
        # not sure why TypeError int for id is not subscriptable
        print('key: ', key)
        print('data_dict_GD[key]["id"]', data_dict_GD[key]["id"])

