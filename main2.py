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

keys = data.keys()

# global index_master_counter
index_master_counter = 0
suffix_index_list = []
df_isnan = data.isna()

print('data.isna(): ', data.isna())
print('type(df_isnan): ', type(df_isnan))

def generate_new_dict_item(index, row, keys):
    new_item_dict = {}
    global index_master_counter
    global suffix_index_list
 
    for value, key in zip(row, keys):

        if df_isnan.loc[index, key]:
            new_item_dict[key] = None
        else:
            new_item_dict[key] = value
        
            if key == 'Suffixes':
                suffix_index_list.append(index)

    new_item_dict['id'] = index_master_counter
    data_dict[index_master_counter] = new_item_dict
    index_master_counter += 1

# print("df_isnan.loc[1,'Wood']: ", df_isnan.loc[1,'Wood']) 

# zip is used for parallel iteration
for index, row in data.iterrows():
    generate_new_dict_item(index, row, keys)

# print('data_dict:', data_dict) 

print('suffix_index_list', suffix_index_list)

for ref_index in suffix_index_list:
    ref_dict = data_dict[ref_index]
    if ref_dict['Prefixes']:
        ref_dict['Name'] = f'{ref_dict['Prefixes']}_' + ref_dict['Name']

    suffixes = ref_dict['Suffixes'].replace(" ", "").split(',')
    print('suffixes: ', suffixes)

    root_name = ref_dict['Name'].strip() # maybe remove .strip()

    if len(suffixes) == 1:
        ref_dict['Name'] = ref_dict['Name'] + f'_{suffixes[0]}'

    elif len(suffixes) > 1:
        ref_dict['Name'] = ref_dict['Name'] + f'_{suffixes[0]}'
        suffixes = suffixes[1:]
        print('suffixes after 1st: ', suffixes)

        for suffix in suffixes:
            new_item_dict = copy.deepcopy(ref_dict)
            new_item_dict['id'] = index_master_counter
            new_item_dict['Name'] = root_name + f'_{suffix}'
            data_dict[index_master_counter] = new_item_dict
            index_master_counter += 1

keys_data_dict = list(data_dict.keys())

for key in keys_data_dict:
    print(f"data_dict[{key}]['Name']: ", data_dict[key]['Name'])

aom_data_json = json.dumps(data_dict, indent=4)

with open('data.json', 'w') as file:
    file.write(aom_data_json)

js_string = ""


for key in keys_data_dict: 
    name = data_dict[key]["Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "")
    type = data_dict[key]["Type"]
    js_string += f"\n{name.replace('-', '_').replace("'", "")} = {{id: {key}, name: '{name.replace("'", "")}, type: {type}'}};" # space added 

with open('units.js', 'w') as file:
    file.write(js_string)

# def create_image_link(image_path, shortcut_Path):
#     try:
#         os.symlink(image_path, shortcut_Path)
#     except OSError as e:
#         print(f"Error creating shortcut: {e}")

# create_image_link(src, dst)

# make prohibitited strings a const var or its own file 

def reformat_item_name(name):
    print('og name: ', name)
    name.replace(" ", "_")
    prohibited_strs = ['_LH', '_HF', 'N_']
    for sub_str in prohibited_strs:
        if sub_str in name:
            name = name.replace(f"{sub_str}", "") # this doesn't work # or does it work, need to test
    name = name.strip().replace(" ", "_")
    return name

### current paths work in powershell,  *** need to change file paths to run the shutil.copy() on wsl

def update_img(item_dict):
    item_id = item_dict['id']
    item_name = reformat_item_name(item_dict['Name'])
    item_type = item_dict['Type'] ## .strip() removed ## icon images are missing - add them is still TODO

    old_file_path = f'img\\aomr_{item_name}_icon.webp' # used to work
    new_file_path = f'img\\{item_type}s\\{item_id}.webp' # used to work
    # old_file_path = f'img/AoMR_{item_name}_icon.webp'
    # new_file_path = f'img/{item_type}s/{item_id}.webp'
    # new_file_path = f'img\\test\\{item_id}.webp'

    print(f'before shutil.copy() - old_file_path: {old_file_path} , new_file_path: {new_file_path} ')
    
    try:
        shutil.copy(old_file_path, new_file_path)
        print(f"{old_file_path} copied to {new_file_path}")
    except FileNotFoundError:
        print(f"Error: Source file '{old_file_path}' not found. \nnew_file_path: {new_file_path}")
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
    

for key in data_dict:
    item_dict = data_dict[key]
    update_img(item_dict)

print('index_master_counter:', index_master_counter)
