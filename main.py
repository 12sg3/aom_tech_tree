#  N_Champion Infantry HF
# Error: Source file 'img\AoMR_N_Champion Infantry HF_icon.webp'


def reformat_item_name(name):
    print('og name: ', name)
    name.replace(" ", "_")
    prohibited_strs = [' LH', ' HF', 'N_']
    for sub_str in prohibited_strs:
        if sub_str in name:
            print(f'in entered: {name}, sub_str: {sub_str}')
            name = name.replace(f"{sub_str}", "") # this doesn't work
            # name.replace("N_", "") # this doesn't work
            print(f'after replace entered: {name}')
    print('refomatted_name: ', name)
    return name

testStr1 = 'N_Champion Infantry HF'
testStr2 = 'N_Champion Infantry_LH'

reformat_item_name(testStr2)