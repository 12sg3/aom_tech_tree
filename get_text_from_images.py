# from PIL import Image
# import pytesseract

from PIL import Image
from pytesseract import pytesseract
import cv2
import pandas
import os

DESCRIPTION = 'Description'
NAME = 'Name'

# Path to the Tesseract... 
path_to_tesseract = '/home/seb/.pyenv/versions/aom_tech_tree_env/lib/python3.12/site-packages'
# pytesseract....

data_df = pandas.read_csv('Data_Spreadsheet_v1.csv')

keys = data_df.keys()

def extract_text_image(image_path):
    try:
        img = Image.open(image_path)
    
        text = pytesseract.image_to_string(img)
        return text

    except FileNotFoundError:
        return "Error: image file not found"
    
    except pytesseract.TesseractNotFoundError:
        return "Error: Tesseract OCR not found please install it"
    except Exception as e:
        return f"An error occured: {e}"
    
def get_description_from_img(img_name):
    extracted_text_split = extract_text_image(f'images/text_pics/{img_name.replace(' ', '-')}.png').split('\n')
    print(f'extracted_text_split: {extracted_text_split}')
    cost_found = False
    desc_str = ''
    cost_str = ''
    for substr in extracted_text_split:
        if cost_found == True:
            desc_str += substr.replace('¢', '•').replace('«', '•').replace('+', '•') + ' '
        
        elif 'Cost:' in substr:
            cost_found = True
            cost_str = substr
    
    desc_str = desc_str[1:]
    print(f'{img_name} cost_str: ', cost_str)
    print(f'{img_name} description: ', desc_str)
    
    if not desc_str:
        print('desc_str empty')

    return desc_str


# file_path_list = ['burning-pitch', 'call-of-valhalla', 'dragon-ship', 'fire-giant', 'hirdman', 'huskarl', 'mountain-giant', 'sentry-tower', 'vikings'] 
# icon_items = ['favour', 'food', 'gold', 'population', 'time', 'wood']

dir_path = 'images/text_pics/'

images_to_text_entries = os.listdir(dir_path)
# print('images_to_text_entries: ', images_to_text_entries)

names = data_df[NAME].values

for i, name in enumerate(names):
    names[i] = name.lower()

# print('names: ', names)

new_df_entries = []
DF_ROW_TEMPLATE = {'Name': '', 'Description': ''} 


for img in images_to_text_entries:

    img_name = img.replace('test_', '').replace('.png', '').replace('-', ' ')
    # if img_name in data_df[NAME].values: 
    desc_str = get_description_from_img(img_name)
    print(f'type(desc_str): {type(desc_str)}')
    print(f'DESCRIPTION - img_name: {img_name}, desc_str: {desc_str}')

    if img_name in names:      
        print(f'{img_name} found')
        # extracted_text_split = extract_text_image(f'images/text_pics/test_{img_name.replace(' ', '-')}.png').split('\n')
        # print(f'extracted_text_split - {img_name.replace(' ', '-')}: ', extracted_text_split)
        
        # data = {'Name': ['Alice', 'Bob', 'Charlie'], 
        # 'Age': [25, 30, 35], 
        # 'City': ['NY', 'LA', 'SF']}
        # df = pandas.DataFrame(data)

        # # Find rows where 'City' is 'NY'
        # specific_city_rows = df.loc[df['City'] == 'NY']
        # print('specific_city_rows: ', specific_city_rows)
        # print("specific_city_rows['Name'].values: ", specific_city_rows['Name'].values)
        #         data_df.at[index, DESCRIPTION] = desc_str
        # index = data_df.loc[data_df['Name'] == img_name.title()]
        # index = data_df.loc[data_df['Description'] == ' Elite heavy cavalry. Good against human soldiers.   ']
        # index = data_df.loc[data_df['Faction'] == 'Norse'] # works
        # index = data_df.loc[data_df['Name'] == 'jarl'] # works
        index = data_df.loc[data_df['Name'] == f'{img_name}'] 
        # index = data_df[data_df['Name'] == 'Mountain Giant']
        # index = data_df.query(f"Name == '{img_name.title()}'")

        print(f'*** {img_name}: {index}')
        # print(f'*** {img_name.title()}: {index['Description']}')
        print(f'** {img_name}: {index['Name'].values}')
        print(f'** {img_name}: {index[DESCRIPTION].values}')
        # data_df.loc[data_df['Name'] == f'{img_name}'][DESCRIPTION] = 'test descption!!!'
        data_df.loc[data_df['Name'] == f'{img_name}', DESCRIPTION] = desc_str
        print(f'** {data_df.loc[data_df['Name'] == f'{img_name}', DESCRIPTION]}')
        index = data_df.loc[data_df['Name'] == f'{img_name}'] 
        print(f'** after {img_name}: {index[DESCRIPTION].values}') 
        # print(f'* {img_name.title()}: {index.values}')
        print(f'* type(index): {type(index)},  {img_name}: {index}')
        # print(f"* type(index['Description']): {type(index['Description'])}, {img_name.title()}: {index}")
        # data_df.at[index, DESCRIPTION] = desc_str
        print(f'data_df.index: {data_df.index}')

    else:
        print(f'{img_name} NOT found')
        # desc_str = get_description_from_img(img_name)
        
        new_df_entries.append(pandas.DataFrame([{'Name': img_name, 'Description': desc_str}]))
        # add new entry to df

# print('new_df_entries: ', new_df_entries)

# print('data_df before: ', data_df)

new_df_entries.insert(0, data_df)

data_df = pandas.concat(new_df_entries, ignore_index=True)

# data_df = pandas.concat([data_df, new_df_entries])

# print('data_df after: ', data_df)

# print(data_df.at[188,'Name']) 
# print(data_df.at[188,'Description'])


# data = {'Name': ['Alice', 'Bob', 'Charlie', 'David'],'Age': [24, 27, 22, 32],'City': ['New York', 'Los Angeles', 'Chicago', 'Houston']}
# df = pandas.DataFrame(data)

# Select rows where Age is greater than 25
# selected_rows = df[df['Age'] > 25]
# david_row = df[df['Name'] == 'David']
# print('selected_rows: ', selected_rows)
# print('david_row: ', david_row) 




# data = {'Name': ['Alice', 'Bob', 'Charlie'], 
#         'Age': [25, 30, 35], 
#         'City': ['NY', 'LA', 'SF']}
# df = pandas.DataFrame(data)

# # Find rows where 'City' is 'NY'
# specific_city_rows = df.loc[df['City'] == 'NY']
# print('specific_city_rows: ', specific_city_rows)
# print("specific_city_rows['Name'].values: ", specific_city_rows['Name'].values)
        

data_df.to_csv('Data_Spreadsheet_v1.csv') # Uncomment once new loop is written


# testing OpenCV to identify icons

# source_image = cv2.imread('images/text_pics/test_fire-giant.png')
# template_image = cv2.imread('images/sub_img_icons/food_icon_no-bg.png')


# result = cv2.matchTemplate(source_image, template_image, cv2.TM_CCOEFF_NORMED)
# print('result: ', result)

# min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

# print('min_val: ', min_val)
# print('max_val: ', max_val)
# print('min_loc: ', min_loc)
# print('max_loc', max_loc)

# icon_names = ['favour', 'food', 'gold', 'population', 'time', 'wood']
# icon_loc_dict = {}

# for icon_name in icon_names:
#     # icon_image = cv2.imread(f'images/sub_img_icons/{icon_name}_icon.png')
#     icon_image = cv2.imread(f'images/sub_img_icons/{icon_name}_icon_no-bg.png')

#     source_image = cv2.imread('images/text_pics/test_fire-giant.png')

#     # result = cv2.matchTemplate(source_image, icon_image, cv2.TM_CCOEFF_NORMED)
#     result = cv2.matchTemplate(source_image, icon_image, cv2.TM_CCORR_NORMED)

    # print('result: ', result)

#     min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
#     icon_loc_dict[icon_name] = {'max_val': max_val,'max_loc': max_loc}
#     # print('icon_loc_dict: ', icon_loc_dict)

# print('min_val: ', min_val)
# print('max_val: ', max_val)
# print('min_loc: ', min_loc)
# print('max_loc', max_loc)

# print('icon_loc_dict: ', icon_loc_dict)



## old code remove eventually 
# example:

# image_file = 'images/test_image.png'

# extracted_text = extract_text_image(image_file)
# print(f'extracted_text: {extracted_text}')

# buring_pitch_file_path = 'images/test_burning-pitch.png'
# call_of_valhalla_file_path = 'images/test_call-of-valhalla.png'
# dragon_ship_file_path = 'images/test_dragon-ship.png'
# fire_giant_file_path = 'images/test_fire-giant.png'
# hirdman_file_path = 'images/test_hirdman.png'
# huskarl_file_path = 'images/test_huskarl.png'
# jarl_file_path = 'images/test_jarl.png'
# mountain_giant_file_path = 'images/test_mountain-giant.png'
# sentry_tower_file_path = 'images/test_sentry-tower.png'
# vikings_file_path = 'images/test_vikings.png'


# df = pandas.DataFrame({'name': ['Raphael', 'Donatello', 'Bilai'],
#                        'mask': ['red', 'purple', 'grey floof'],
#                        'weapon': ['sia', 'bo staff', 'boro teeth'],    
# })

# df.to_csv('out.csv', index=False)

### remane text_image files

# print(os.listdir(dir_path))

# for old_file_name in os.listdir(dir_path):
#     print(f'old_file_name: {old_file_name}')
#     new_file_name = old_file_name.replace('test_', '')
#     print(f'new_file_name: {new_file_name}')
#     os.rename(f'{dir_path}{old_file_name}', f'{dir_path}{new_file_name}')
    