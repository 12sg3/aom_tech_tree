# print('uoii')

units_dict = {}

id_index_counter = 0

already_add_names = {}

suffix_list = ['NAME', 'LR', 'SR']

with open ('game_data/string_table_en.txt') as str_tbl_file:
    i = 1
    for line in str_tbl_file:
        # if 'STR_UNIT' in line and ('NAME' in line or 'LR' in line or 'SR' in line):
        if 'STR_UNIT' in line:
            line_split_words = line.split(';')
            line_split_words_str = []
            use_Str_split = False
            if ';' not in line:
                # for i, char in enumerate(line):
                    # if char == '"' and 
                    # pass
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
                right_side_value = line_split_words_str[1].strip().replace('= ', '').replace("'", '')
                print('right_side_value: ', right_side_value)


            # else:
            #     left_side = line_split_words[0].strip('').replace('"', '').replace('ID = STR_UNIT_', '') # .strip('ID = "STR_UNIT') #.rstrip('"')
            #     print('left_side_split(;): ', left_side)
            #     suffix = left_side.split('_')[-1] # [-1]
            #     print('suffix: ', suffix)
            #     name = left_side.replace(f'_{suffix}', '')
            #     print('name: ', name) 
                
            #     print('line_split_words: ', line_split_words)
            #     # if len(line_split_words) == 1:
            #     #     line_split_words[0]
            #     print('line_split_words[1]: ', line_split_words[1], ' ,', type(line_split_words[1]))
            #     right_side = line_split_words[1].strip().replace('"', '').replace('STR = ', '').replace('STR= ', '')
                
                
                
                # print('right_side: ', right_side)
            # if (name in units_dict): 
            #     units_dict[name][suffix] = 'x'

            # if name in units_dict:
            #     units_dict[name][str_type] = str_value
            # else:
            #     units_dict[name] = {str_type: str_value}
            # print(f'name: {name}, units_dict[{name}]: ', units_dict[name])
            # print('------------------')



            # units_dict[id_index_counter] = line
            # id_index_counter += 1

# print('units_dict: ', units_dict)

# for name in units_dict.keys():
#     print(name, ':', units_dict[name])
#     print('------------------')

# print('units_dict: ', units_dict)
    
