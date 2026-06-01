import os
# def get_desc_debug(extracted_text_split):    
#     for i, entry in enumerate(extracted_text_split):
#         print(f'i: {i}, entry: {entry}')
#         if len(entry) == 0:
#             continue
#         if entry[-1] == '.':
#             desc_str = entry
#             try:
#                 if entry[0].isupper() and entry != 'Relics.':
#                     break
#                 elif len(extracted_text_split[i - 1]) == 0:
#                     if extracted_text_split[i - 2][0].isupper():
#                         desc_str = extracted_text_split[i - 2] + extracted_text_split[i - 1] + ' ' + desc_str
#                         break
#                 elif extracted_text_split[i - 1][0].isupper(): ## '' has no char 0
#                     desc_str = extracted_text_split[i - 1] + ' ' + desc_str
#                     break
#                 elif extracted_text_split[i - 2][0].isupper():
#                     desc_str = extracted_text_split[i - 2] + ' ' + extracted_text_split[i - 1] + ' ' + desc_str
#                     break
#             except IndexError as e:
#                 print(f'index error in multi-line desc loop, e: {e}')
                    
#     # print(f'img_name: {img_name}')   
#     print(f'desc_str: {desc_str}')
#     return desc_str

# pharaoh_text_split = ['PHARAOH (HERO) (PLAYER 1)', '', 'Hero who empowers buildings, heals units, collects Relics, and has a ranged attack that is strong against myth units. A successor will replace him if', 'he dies.', '', 'w Hitpoints 100 & Crush Armor 99 % ¥ Hack Armor 15 % a Pierce Armor 30 %', 'ae 4 ral,', 'aC Speed 4.0 ie Pierce Damage 1 (80 %) > Attack Interval 1.0 | Number of Projectiles 1', '', 'A Pharaoh empowering a foundation or building makes the Laborers working there build and gather faster. A Pharaoh may also coax more Favor from the gods by', 'empowering a Monument. The Pharaoh is a decent fighter, but it is his ability to heal units as well as his high damage against myth units that make him a good', "addition to an attacking army. When a Pharaoh dies, he is reborn amongst his people at a Town Center. Set's Pharaohs can summon animals.", '', 'The material wealth and relative isolation of the Nile Valley allowed a monarchical government to arise in Egypt at a very early date. There was little need fora', 'strong man to hold sway by might for the defense of the realm and the control of food production. Instead, the pharaoh came to be accepted as the living god of', 'the world who was responsible for the daily passage of the sun and the annual flooding of the river, the two events upon which food production depended. The', "greatest of the pharaohs also commanded their armies and built Egypt's greatest monuments.", '', "Egypt is separated into Lower Egypt and Upper Egypt. At times during Egypt's history - such as before King Menes; and during the Hyksos invasion - the unified", 'nation had more than one ruler.', '']

# sage_text_split = ['SAGE (HERO) (PLAYER 1)', '', '10 & 10 M5A3¢', '', 'Intelligent ranged hero who specifically targets myth units by itself. Can heal allied units and summon mirror images of enemy myth units. Collects', '', 'Relics.', 'w Hitpoints 110 & Crush Armor 99 % ¥ Hack Armor 5 % a Pierce Armor 25 %', 'aC Speed 3.6 ie Pierce Damage 3 Né Divine Damage 2 » Attack Interval 1.0', 'i Number of Projectiles 1', '', 'In Chinese belief systems, the sage was one of the most respected figures: regarded as a beacon of wisdom and nobility, and venerated for their virtue and scholarly', 'ability. There are many notable sages throughout Chinese history, such as the Four Sages of the Confucian Tradition (Yan Hui, Mengzi, Zisi, and Mencius) and the', 'Five Sage Emperors.', '', 'With their persuasive eloquence, sages can charm enemy creatures. Additionally, they often rely on their esteemed reputation to bolster troop morale and heal', 'comrades, making them the most respected individuals in the camp.', '']

# get_desc_debug(sage_text_split)

ACCEPTABLE_RES_TYPES = ['f', 'w', 'g', 'z', 't']

RES_Type_MAP = {
    'f' : 'Food_Cost',
    'w' : 'Wood_Cost',
    'g' : 'Gold_Cost',
    'z' : 'Favor_Cost',
    't' : 'Training_Time'
} 

F = 'f'
W = 'w'
G = 'g'
Z = 'z'
T = 't'

def get_tech_cost_from_file_name(file_name):
    print('file_name: ', file_name)
    if '_c_' not in file_name:
        return None
    cost_substr = file_name.rstrip('.png').split('_c_')
    print('cost_substr: ', cost_substr)
    costs = cost_substr[1].split('_')
    print('costs: ', costs)
    cost_dict = {}
    for cost in costs:
        print('cost: ', cost)
        next_res = cost.split('-')
        print('next_res: ', next_res)
        if 'f' in next_res or W in next_res or G in next_res or Z in next_res or T in next_res:
            if next_res[1] == F or next_res[1] == W or next_res[1] == G or next_res[1] == Z or next_res[1] == T: 
                cost_dict[RES_Type_MAP[next_res[1]]] = next_res[0]
            elif next_res[0] == F or next_res[0] == W or next_res[0] == G or next_res[0] == Z or next_res[0] == T:
                cost_dict[RES_Type_MAP[next_res[0]]] = next_res[1]         
        
    print('cost_dict: ', cost_dict)

    return cost_dict    
    


get_tech_cost_from_file_name('advanced-traps_c_200-w_200-g_30-t.png')
get_tech_cost_from_file_name('argive-patronage-demeter_c_200-f_300-g_30-z_40-t.png')
get_tech_cost_from_file_name('arctic-winds.png')

img = 'argive-patronage-demeter_c_200-f_300-g_30-z_40-t.png'
if ('_c_' in img):
    img_name = img[0:img.index('_c_')]

img_name = img_name.replace('-', ' ').replace('_', '-').replace('.png', '')


print('img_name: ', img_name)

dir_path_techs = 'images/text_pics/old_desc_cost_only/basic-desc/techs/'

images_to_text_entries_techs = os.listdir(dir_path_techs)

for img in images_to_text_entries_techs:
    print('img', img)