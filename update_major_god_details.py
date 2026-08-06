import json

print("TESTING123!!!")

def get_updated_major_god_details(major_god_data_dict):
    mg_Name = major_god_data_dict["Name"]
    with open('game_data\\extracted_data\\major_god_details.json', 'r', encoding='utf-8') as file:
        major_god_details_dict = json.load(file)

    with open('game_data\\extracted_data\\major_god_details_values.json', 'r', encoding='utf-8') as file:
        major_god_details_values_dict = json.load(file)

    print(mg_Name)
    # print(major_god_details_dict.keys())
    # print(major_god_details_dict[mg_Name])

    mg_details = major_god_details_dict[mg_Name]
    mg_details_values = major_god_details_values_dict[mg_Name]
    print(mg_details)
    print(mg_details_values)

    new_desc = ''

    for bonus in mg_details["bonuses"]:
        new_desc += bonus

    for value_entry in mg_details_values["values"]:
        key = list(value_entry.keys())[0]
        value = value_entry[key]
        print('key: ', key)
        print('value: ', value)
        new_desc = new_desc.replace(key, value)

    new_desc = new_desc.replace('$', '').replace('{', '').replace('}', '')
        

    print('new_desc: ', new_desc)
    return new_desc



with open('docs\\data.json') as file:
    data_dict = json.load(file)

    for entry in data_dict.values():
        if entry["Type"] == "major_god":
            get_updated_major_god_details(entry)

