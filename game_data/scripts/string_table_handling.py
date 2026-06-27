import json
from pathlib import Path

# tech costs and effects --> in techtree.xlm
# unit, building, tech descritpion --> str table
# unit and building costs and stats --> proto.xml

# godpowers --> find godpower file (I think it's one for each pathneon, I saw the Aztec one)

units_dict = {}
buildings_dict = {}
techs_dict = {}

id_index_counter = 0

already_add_names = {}

suffix_list = ['NAME', 'LR', 'SR']

# Open file from path
# GAME_FILES_PATH = 'game_data/game_files/'
GAME_FILES_PATH = 'game_data/game_files/game/data/strings/English/'

# Save to location path
EXTRACTED_DATA_PATH = 'game_data/extracted_data/'

# with open ('../game_files/string_table_en.txt') as str_tbl_file:
# with open ('game_data/game_files/string_table_en.txt') as str_tbl_file:
with open (f'{GAME_FILES_PATH}string_table.txt') as str_tbl_file:

    for line in str_tbl_file:
        # if 'STR_UNIT' in line and ('NAME' in line or 'LR' in line or 'SR' in line):
        if 'STR_UNIT' in line:
            line_split_words = line.split(';')
            line_split_words_str = []
            use_Str_split = False
            if ';' not in line:
                line_split_words_str = line.split('Str')
                use_Str_split = True
                print('** inside line_split_words_str: ', line_split_words_str)
            
            # print('** outside line_split_words_str: ', line_split_words_str)
            if use_Str_split == True:
                print('*** inside line split str: ', line_split_words_str)
                left_side = line_split_words_str[0].strip()
                suffix = left_side.split('_')[-1].replace('"', '')
                print('suffix: ', suffix)
                name = left_side.replace('ID = "STR_UNIT_', '').replace(f'_{suffix}', '').replace('"', '')
                print('name: ', name)
                right_side_value = line_split_words_str[1].strip().replace('= ', '').replace('"', '')
                print('right_side_value: ', right_side_value)

                if name in units_dict:
                    units_dict[name][suffix] = right_side_value 
                else:
                    units_dict[name] = {suffix: right_side_value}


            else:
                left_side = line_split_words[0].strip('').replace('"', '').replace('ID = STR_UNIT_', '') # .strip('ID = "STR_UNIT') #.rstrip('"')
                print('left_side_split(;): ', left_side)
                suffix = left_side.split('_')[-1].strip() # [-1]
                print('suffix: ', suffix)
                name = left_side.replace(f'_{suffix}', '').strip()
                print('name: ', name) 
                
                print('line_split_words: ', line_split_words)
                # if len(line_split_words) == 1:
                #     line_split_words[0]
                print('line_split_words[1]: ', line_split_words[1], ' ,', type(line_split_words[1]))
                right_side_value = line_split_words[1].strip().replace('"', '').replace('Str = ', '').replace('Str= ', '')
                
                print('suffix: ', suffix, ', right_side_value: ', right_side_value)

                if (name in units_dict): 
                    units_dict[name][suffix] = right_side_value
                else:
                    units_dict[name] = {'NAME': '', 'SR': '', 'LR': ''}
                    units_dict[name][suffix] = right_side_value


for name in units_dict.keys():
    for key in units_dict[name].keys():
        print(f'key: {key}, units_dict[{name}][{key}]: {units_dict[name][key]}')


ST_units_en_data = json.dumps(units_dict, indent=4)


# file_path = Path('../extracted_data/ST_units_en_data.json')
file_path = Path(f'{EXTRACTED_DATA_PATH}ST_units_en_data.json')
print(file_path.is_file())

# if file_path.is_file():
# with open('../extracted_data/ST_units_en_data.json', 'w') as file:
with open(f'{EXTRACTED_DATA_PATH}ST_units_en_data.json', 'w') as file:
    file.write(ST_units_en_data) 



# with open ('../game_files/string_table_en.txt') as str_tbl_file:
with open (f'{GAME_FILES_PATH}string_table.txt') as str_tbl_file:
    for line in str_tbl_file:
        # if 'STR_UNIT' in line and ('NAME' in line or 'LR' in line or 'SR' in line):
        if 'STR_BLD' in line:
            line_split_words = line.split(';')
            line_split_words_str = []
            use_Str_split = False
            if ';' not in line:
                line_split_words_str = line.split('Str')
                use_Str_split = True
                print('** inside line_split_words_str: ', line_split_words_str)
            
            # print('** outside line_split_words_str: ', line_split_words_str)
            if use_Str_split == True:
                print('*** inside line split str: ', line_split_words_str)
                left_side = line_split_words_str[0].strip()
                suffix = left_side.split('_')[-1].replace('"', '')
                print('suffix: ', suffix)
                name = left_side.replace('ID = "STR_BLD_', '').replace(f'_{suffix}', '').replace('"', '')
                print('name: ', name)
                right_side_value = line_split_words_str[1].strip().replace('= ', '').replace('"', '')
                print('right_side_value: ', right_side_value)

                if name in units_dict:
                    units_dict[name][suffix] = right_side_value 
                else:
                    units_dict[name] = {suffix: right_side_value}


            else:
                left_side = line_split_words[0].strip('').replace('"', '').replace('ID = STR_BLD_', '') # .strip('ID = "STR_UNIT') #.rstrip('"')
                print('left_side_split(;): ', left_side)
                suffix = left_side.split('_')[-1].strip() # [-1]
                print('suffix: ', suffix)
                name = left_side.replace(f'_{suffix}', '').strip()
                print('name: ', name) 
                
                print('line_split_words: ', line_split_words)
                # if len(line_split_words) == 1:
                #     line_split_words[0]
                print('line_split_words[1]: ', line_split_words[1], ' ,', type(line_split_words[1]))
                right_side_value = line_split_words[1].strip().replace('"', '').replace('Str = ', '').replace('Str= ', '')
                
                print('suffix: ', suffix, ', right_side_value: ', right_side_value)
                print('buildings_dict: ', buildings_dict)

                if (name in buildings_dict): 
                    buildings_dict[name][suffix] = right_side_value
                else:
                    buildings_dict[name] = {'NAME': '', 'SR': '', 'LR': ''}
                    buildings_dict[name][suffix] = right_side_value

    

ST_buildings_en_data = json.dumps(buildings_dict, indent=4)


# file_path = Path('ST_units_en_data.json')
# print(file_path.is_file())

# if file_path.is_file():
# with open('../extracted_data/ST_buildings_en_data.json', 'w') as file:
with open(f'{EXTRACTED_DATA_PATH}ST_buildings_en_data.json', 'w') as file:
    file.write(ST_buildings_en_data) 
    
# with open ('../game_files/string_table_en.txt') as str_tbl_file:
with open (f'{GAME_FILES_PATH}string_table.txt') as str_tbl_file:
    for line in str_tbl_file:
        # if 'STR_UNIT' in line and ('NAME' in line or 'LR' in line or 'SR' in line):
        if 'STR_TECH' in line:
            line_split_words = line.split(';')
            line_split_words_str = []
            use_Str_split = False
            if ';' not in line:
                line_split_words_str = line.split('Str')
                use_Str_split = True
                print('** inside line_split_words_str: ', line_split_words_str)
            
            # print('** outside line_split_words_str: ', line_split_words_str)
            if use_Str_split == True:
                print('*** inside line split str: ', line_split_words_str)
                left_side = line_split_words_str[0].strip()
                suffix = left_side.split('_')[-1].replace('"', '')
                print('suffix: ', suffix)
                name = left_side.replace('ID = "STR_TECH_', '').replace(f'_{suffix}', '').replace('"', '')
                print('name: ', name)
                right_side_value = line_split_words_str[1].strip().replace('= ', '').replace('"', '')
                print('right_side_value: ', right_side_value)

                if name in units_dict:
                    units_dict[name][suffix] = right_side_value 
                else:
                    units_dict[name] = {suffix: right_side_value}


            else:
                left_side = line_split_words[0].strip('').replace('"', '').replace('ID = STR_TECH_', '') # .strip('ID = "STR_UNIT') #.rstrip('"')
                print('left_side_split(;): ', left_side)
                suffix = left_side.split('_')[-1].strip() # [-1]
                print('suffix: ', suffix)
                name = left_side.replace(f'_{suffix}', '').strip()
                print('name: ', name) 
                
                print('line_split_words: ', line_split_words)
                # if len(line_split_words) == 1:
                #     line_split_words[0]
                print('line_split_words[1]: ', line_split_words[1], ' ,', type(line_split_words[1]))
                right_side_value = line_split_words[1].strip().replace('"', '').replace('Str = ', '').replace('Str= ', '')
                
                print('suffix: ', suffix, ', right_side_value: ', right_side_value)
                print('techs_dict: ', techs_dict)

                if (name in techs_dict): 
                    techs_dict[name][suffix] = right_side_value
                else:
                    techs_dict[name] = {'NAME': '', 'SR': '', 'LR': ''}
                    techs_dict[name][suffix] = right_side_value

ST_techs_en_data = json.dumps(techs_dict, indent=4)


# file_path = Path('ST_units_en_data.json')
# print(file_path.is_file())

# if file_path.is_file():
# with open('../extracted_data/ST_techs_en_data.json', 'w') as file:
with open(f'{EXTRACTED_DATA_PATH}ST_techs_en_data.json', 'w') as file:
    file.write(ST_techs_en_data) 



