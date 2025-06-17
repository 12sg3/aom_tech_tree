import pandas
import json
import math
import pyperclip

data_aom_df = pandas.read_csv('Data_Spreadsheet_v1.csv')

# print(data_aom_df)

# unit_type = data_aom_df['Type']

# print(unit_type)

# for entry in unit_type:
#     print(entry, ',', type(entry))

# print(f'len(unit_type): {len(unit_type)}')

# unit_type_str_only = []

# for entry in unit_type:
#     if isinstance(entry, str):
#         unit_type_str_only.append(entry)

# for entry in unit_type_str_only:
#     print(f'{entry}, {type(entry)}')

# print(f'len(unit_type_str_only): {len(unit_type_str_only)}')

# attack_speed = data_aom_df['Attack Speed']

# for entry in attack_speed:
#     print(entry, ',', type(entry))

# attack_speed_filtered = []

# for entry in attack_speed:
#     if not math.isnan(entry):
#         attack_speed_filtered.append(entry)

# print(f'len(unit_type_str_only): {len(unit_type_str_only)}')
# print(f'len(attack_speed_filtered): {len(attack_speed_filtered)}')

# print(data_aom_df)

column_titles = list(data_aom_df.columns)
print(column_titles) 

for entry in column_titles:
    print(entry, type(entry))

titles_filtered = []    

for entry in column_titles:
    if 'Unnamed' in entry:
        print('Unnamed found')
    else:
        titles_filtered.append(entry)

print(len(titles_filtered))

for entry in titles_filtered:
    print(entry)

print(len(titles_filtered))

data_aom_dict_by_unit = {}
data_aom_dict_by_index = {}

print(titles_filtered) 

df = pandas.DataFrame({'name': ['Alice', 'Bob'], 'age': [24, 30]})

for index, row in df.iterrows():
    print(f"Index: {index}")
    print(f"Name: {row['name']}, Age: {row['age']}")

for index, row in data_aom_df.iterrows():
    print(f'index: {index}')
    data_aom_dict_by_index[str(index)] = {}
    for field in titles_filtered:
        print(f'index {index}: {field}: {row[field]}')
        data_aom_dict_by_index[str(index)][field] = row[field]

# print(data_aom_dict_by_index)
        
for index, row in data_aom_df.iterrows():
    print(f'index: {index}')
    data_aom_dict_by_unit[row['Unit']] = {}
    for field in titles_filtered:
        print(f'index {index}: {field}: {row[field]}')
        try:
            if math.isnan(row[field]) == True: 
                data_aom_dict_by_unit[row['Unit']][field] = None
        except TypeError:
            data_aom_dict_by_unit[row['Unit']][field] = row[field]

print(data_aom_dict_by_unit)

# json.dumps(data_aom_dict_by_unit, indent=4)

pyperclip.copy(json.dumps(data_aom_dict_by_unit, indent=4))

data_aom_dict_by_unit_json = json.dumps(data_aom_dict_by_unit, indent=4)
print(data_aom_dict_by_unit_json)

with open ('data.json', 'w') as file:
    file.write(data_aom_dict_by_unit_json)