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

with open('src\\caret_duplication_list.json', 'r') as file:
    
    print('caret_duplication_list.json:', file) #placeholder for now
    caret_duplicates_dictXX = json.load(file)
    caret_duplicates_dictXX_keys = list(caret_duplicates_dictXX.keys())

def generate_new_dict_item(index, row, keys, version = None):
    new_item_dict = {}
    global index_master_counter
    global suffix_index_list
 
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


# print("df_isnan.loc[1,'Wood']: ", df_isnan.loc[1,'Wood']) 
if_entered_test = []
# zip is used for parallel iteration
for index, row in data.iterrows():
    if (row['Name'] in caret_duplicates_dictXX_keys):
        if_entered_test.append(row['Name'])
        for version in caret_duplicates_dictXX[row['Name']]["versions"]:
            generate_new_dict_item(index, row, keys, version = version)
    else:
        generate_new_dict_item(index, row, keys)


print('suffix_index_list', suffix_index_list)


keys_data_dict = list(data_dict.keys())

for key in keys_data_dict:
    print(f"data_dict[{key}]['Name']: ", data_dict[key]['Name'])

# need to add display name and name with suffixes in data.json
# need to decide if unit.ts still needs name field
with open('src\\caret_duplication_list.json', 'r') as file:
    
    print('caret_duplication_list.json:', file) #placeholder for now


aom_data_json = json.dumps(data_dict, indent=4)

with open('src\\data.json', 'w') as file:

    file.write(aom_data_json)

js_string = ""

test_list = []

index_test_counter = -1

for key in keys_data_dict:
    print('data_dict[key]: ', data_dict[key])
    if data_dict[key]["Version_Suffix"]:
        version_suffix_for_duplicates = f'_{data_dict[key]["Version_Suffix"]}'
    else:
        version_suffix_for_duplicates = ''
    # print('key: ', key, 'version_suffix_for_duplicates: ', version_suffix_for_duplicates)
    test_list.append({key: version_suffix_for_duplicates})
    name = data_dict[key]["Name"].strip().upper().replace(" ", "_").replace("(", "").replace(")", "") + version_suffix_for_duplicates
    type = data_dict[key]["Type"]
    js_string += f"\nexport const {name.replace('-', '_').replace("'", "")} = {{id: {key}, name: '{name.replace("'", "")}', type: '{type}'}};" # space added 
    index_test_counter += 1
# with open('units.js', 'w') as file:
with open('src\\ts\\units.ts', 'w') as file: #with open('js\\units.js', 'w') as file:
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


dir_path = 'src/img/'
# print(os.listdir(dir_path))

for old_file_name in os.listdir(dir_path):
    print(f'old_file_name: {old_file_name}')
    new_file_name = old_file_name.lower().replace('aomr_', '').replace('_aomr','') 
    print(f'new_file_name: {new_file_name}')
    os.rename(f'{dir_path}{old_file_name}', f'{dir_path}{new_file_name}')
    

# for key in data_dict:
#     item_dict = data_dict[key]
#     update_img(item_dict)

for key in data_dict:
    print('key', key)
    item_dict = data_dict[key]
    print("item_dict['Name']: ", item_dict['Name'])
    update_img(item_dict)

print('index_master_counter:', index_master_counter)

# print("data_dict[543]['Name']: ", data_dict[543]['Name'])
# print("data_dict[896]['Name']: ", data_dict[896]['Name'])
# print("data_dict[896]: ", data_dict[896])

# update_img(data_dict[973])
# update_img(data_dict[200])

# update_img(data_dict[970])
# update_img(data_dict[800])


# update_img(data_dict[968])


# print('data_dict[973]:', data_dict[973])
# print('data_dict[970]: ', data_dict[970])

img_dir_list = os.listdir(dir_path)

### In progress feature - handle duplicate carets

with open('src\\caret_duplication_list.json', 'r') as file:
    
    print('caret_duplication_list.json:', file) #placeholder for now
    caret_duplicates_dict = json.load(file)
    print('caret_duplicates_dict: ', caret_duplicates_dict)
    items = []
    for item in caret_duplicates_dict:
        print('item', item)
        print(f'caret_duplicates_dict[{item}]["versions"]: ', caret_duplicates_dict[item]["versions"])
        items.append(item)
    print('items: ', items)
    data_indices_for_duplication = []

    for data_dict_item in data_dict:
        if data_dict[data_dict_item]['Name'] in items:
            # this adds the whole dict entry to the list
            # data_indices_for_duplication.append({data_dict[data_dict_item]['Name']: data_dict[data_dict_item]})
            data_indices_for_duplication.append({data_dict[data_dict_item]['Name']: data_dict[data_dict_item]['id']})

    # print('data_indices_for_duplication', data_indices_for_duplication)

    # data_dict[index_master_counter] = add duplicate entry here
        

        

        
        # for version in caret_duplicates_dict[item]["versions"]:
        #     #  create the duplicate dict item here


# print('caret_duplicates_dictXX:' , caret_duplicates_dictXX)      
# print('caret_duplicates_dictXX_keys: ', caret_duplicates_dictXX_keys)    
# print('if_entered_test: ', if_entered_test)
            
# print('test_list: ', test_list)
# print('index_test_counter: ', index_test_counter)
