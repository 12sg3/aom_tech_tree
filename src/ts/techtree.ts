// import {ODIN} from "../js/units.js";
import {FREYR, ODIN, ZEUS} from "./units.js";
import { addConnection } from "./addConnection.js";
import { majorGodLaneMatrices } from "./majorGodLaneMatrices.js";
import { addNewLaneToTree } from "./addNewLaneToTree.js";
import { Caret_SP } from "./addNewLaneToTreeSP.js";

import jsonData from '../data.json' with { type: 'json' };
console.log('jsonData: ', jsonData);

// const TYPES = Object.freeze({
//     'BUILDING': {colour: '#922602', type: 'BUILDING', name: 'Building'},
//     'UNIT': {colour: '#3a6a80', type: 'UNIT', name: 'Unit'},
//     // 'UNIQUEUNIT': {colour: '#af30a3', type: 'UNIQUEUNIT', name: 'Unique Unit'},
//     'TECHNOLOGY': {colour: '#2c5729', type: 'TECHNOLOGY', name: 'Technology'},
//     'MAJOR_GOD': {colour: '#f7dd4aff', type: 'MAJOR_GOD', name: 'Major_God'},
//     'MINOR_GOD': {colour:'#c78823ff', type: 'MINOR_GOD', name: 'Minor_God' },
//     'GOD_POWER': {colour: '#37076eff', type: 'GOD_POWER', name: 'God_Power'},
//     'BUSHIDO_GOD_BLESSING': {colour: '#af30a3', type: 'BUSHIDO_GOD_BLESSING', name: 'Bushido_God_Blessing'},
//     'BLANK': {colour: '#000000', type: 'BLANK', name: 'Blank', opacity: 0},
// });
export type caretConstMetadata ={
    colour: string;
    type: string;
    name: string;
    opacity?: number;
}

// previously named TYPES, renamed to CARET_TYPES to avoid confusion with item types (unit/tech/building)
export const CARET_TYPES: { [key: string]: caretConstMetadata } = 
    {
        'BUILDING': {colour: '#922602', type: 'BUILDING', name: 'Building'},
        'UNIT': {colour: '#3a6a80', type: 'UNIT', name: 'Unit'},
        // 'UNIQUEUNIT': {colour: '#af30a3', type: 'UNIQUEUNIT', name: 'Unique Unit'},
        'TECHNOLOGY': {colour: '#2c5729', type: 'TECHNOLOGY', name: 'Technology'},
        'MAJOR_GOD': {colour: '#f7dd4aff', type: 'MAJOR_GOD', name: 'Major_God'},
        'MINOR_GOD': {colour:'#c78823ff', type: 'MINOR_GOD', name: 'Minor_God' },
        'GOD_POWER': {colour: '#37076eff', type: 'GOD_POWER', name: 'God_Power'},
        'BUSHIDO_GOD_BLESSING': {colour: '#af30a3', type: 'BUSHIDO_GOD_BLESSING', name: 'Bushido_God_Blessing'},
        'BLANK': {colour: '#000000', type: 'BLANK', name: 'Blank', opacity: 0},
    } as const; 

export const PREFIX = Object.freeze({
    'BUILDING': 'building_',
    'UNIT': 'unit_',
    'TECHNOLOGY': 'tech_',       
    'MAJOR_GOD': 'major_god_',
    'MINOR_GOD': 'minor_god_',
    'GOD_POWER': 'god_power_',
    'BUSHIDO_GOD_BLESSING': 'bushido_god_blessing_',
});

export const BONUS_MULTIPLIER_CLASSES = {
    "MythUnit": "bonus_multiplier_myth_unit",
    "Hero": "bonus_multiplier_hero",
    "AbstractInfantry": "bonus_multiplier_infantry",
    "Building": "bonus_multiplier_building",
    "Ship": "bonus_multiplier_ship",
    "AbstractCavalry": "bonus_multiplier_cavalry",
    "AbstractArcher": "bonus_multiplier_archer",
    "AbstractVillager": "bonus_multiplier_villager",
    "AbstractArcherShip": "bonus_multiplier_archer_ship",
    "AbstractTower": "bonus_multiplier_tower",
    "OxCart": "bonus_multiplier_ox_cart",
    "AbstractTitan": "bonus_multiplier_titan", 
} as const;

export const BONUS_MULTIPLIER_DISPLAY_STR = {
    "MythUnit": "x bonus multiplier vs myth units",
    "Hero": "x bonus multiplier vs heroes",
    "AbstractInfantry": "x bonus multiplier vs infantry",
    "Building": "x bonus multiplier vs buildings",
    "Ship": "x bonus multiplier vs ships",
    "AbstractCavalry": "x bonus multiplier vs cavalry",
    "AbstractArcher": "x bonus multiplier vs archers",
    "AbstractVillager": "x bonus multiplier vs villagers",
    "AbstractArcherShip": "x bonus multiplier vs archer ships",
    "AbstractTower": "x bonus multiplier vs towers",
    "OxCart": "x bonus multiplier vs ox carts",
    "AbstractTitan": "x bonus multiplier titans", 
} as const;

// const BLANK = 'blank';

// const AGE_IMAGES = ['archaic_age_icon.webp', 'classical_age_icon.webp', 'heroic_age_icon.webp', 'mythic_age_icon.webp'];

// export let SELECTED_MAJOR_GOD_ID;
// export const SELECTED_MAJOR_GOD_ID: { id: number | undefined } = { id: undefined };
// Need to add intiaze selection highlighting for mg selection side panel
export const SELECTED_MAJOR_GOD_ID: { id: number | undefined } = { id: ZEUS.id };

// if (SELECTED_MAJOR_GOD_ID === undefined) {
//     SELECTED_MAJOR_GOD_ID = ODIN.id;
// }

if (SELECTED_MAJOR_GOD_ID === undefined) {
    SELECTED_MAJOR_GOD_ID.id = ZEUS.id;
}

// console.log('FREYR: ', FREYR);

const WORDS_ALL_LOWERCASE = ['of', 'the', 'and', 'vs', 'vs.', 'with', 'a', 'an', 'in', 'on', 'for', 'to', 'by', 'from'];
// test if it works
export function formatName(originalname) {
    let name = originalname.toString().replace(/<br>/g, '\n').replace(/\n+/g, '\n');
    const words = name.split(' ');
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (!WORDS_ALL_LOWERCASE.includes(word)) {
            words[i] = word.replace(/\b\w/g, word => word.toUpperCase());
        }
    }
    name = words.join(' ');
    const items = name.split('\n');
    for (let i = 0; i < items.length; i++) {
        // console.log('inFormatName -items[i]: ', items[i]);
        const item = items[i];
        if (items[i].length > 10) {
            let space = item.indexOf(' ');
            if (space !== -1) {
                items[i] = item.slice(0, space) + '\n' + item.slice(space + 1);
                let alternativeSpace = space + 1 + item.slice(space + 1).indexOf(' ');
                if (alternativeSpace !== -1) {
                    if (Math.abs((item.length / 2) - alternativeSpace) < Math.abs((item.length / 2) - space)) {
                        items[i] = item.slice(0, alternativeSpace) + '\n' + item.slice(alternativeSpace + 1);
                    }
                }
            } else {
                let hyphen = item.indexOf('-');
                if (hyphen !== -1) {
                    items[i] = item.slice(0, hyphen) + '-\n' + item.slice(hyphen + 1);
                    let alternativeHyphen = hyphen + 1 + item.slice(hyphen + 1).indexOf('-');
                    if (alternativeHyphen !== -1) {
                        if (Math.abs((item.length / 2) - alternativeHyphen) < Math.abs((item.length / 2) - hyphen)) {
                            items[i] = item.slice(0, alternativeHyphen) + '-\n' + item.slice(alternativeHyphen + 1);
                        }
                    }
                }
            }
        }
    }
    return items.join('\n');
}

export class Tree {
    offsets: { [key: string]: number };
    padding_tree: number;
    height: number;
    width: number;
    element_height: number;
    lanes: Lane[];
    offsets_x: number;
    constructor() {
        this.offsets = {
            archaic_1_y: 0,
            archaic_2_y: 0,
            classical_1_y: 0, 
            classical_2_y: 0,
            heroic_1_y: 0, // Norse 4 icons
            heroic_2_y: 0,
            heroic_3_y: 0,
            mythic_1_y: 0,
            mythic_2_y: 0,
        };
        this.padding_tree = 20; //20
        this.height = Math.max(window.innerHeight - 2 * (this.padding_tree), 100); // this.height = Math.max(window.innerHeight - 80, 100);
        this.width = 0;
        this.element_height = 0;
        this.lanes = [];
        this.offsets_x = 150; // 150 is starting offset from the left to accommodate age icons
    }

    // this.element_height is a fraction of height // 8 element_heights and 10 gaps

    // not sure if archaic_1 is correct of if it should be archaic_1_y
    updateOffsets() {
        // this sets caret size
        // this.element_height = (this.height * 0.95) / 4 / 3.25; // this.height / 4 / 3 // *0.95 is to get the bottom row (mythic_2) to fit
        this.element_height = (this.height) / 4 / 3 * 1.04; // this.height / 4 / 3 //
        // let element_offset = this.element_height / 3 /(1 + (0.1 * 2 / 3)); // this.element_height / 2 // vert distance between carets in the same column *1/2 gap is half caret *1/3 gap is 1/3 a caret 
        let element_offset = this.element_height / 3; // * 0.9
        console.log('this.element_height / 3: ', this.element_height / 3);                                            //decreasing element offset does not incease element_height 
        console.log('this.element_height / 3 * 0.6: ', this.element_height / 3 * 0.6);  
        // console.log('in updateOffsets - this.element_height: ', this.element_height, 'element_offset: ', element_offset);
        console.log('@^@ this.height: ', this.height);
        console.log('@^@ this.element_height: ', this.element_height);
        console.log('@^@ element_offset: ', element_offset);
        // element_height = 49.313;
        // element_offset = 16.438;
        // this.heihgt = 569;
        this.offsets.archaic_1 = this.padding_tree - 10; // this.padding = 20, -10 moves top of age row icons down to give them visible border. padding=10 reintroduces verticle scroll bar
        this.offsets.archaic_2 = this.offsets.archaic_1 + this.element_height + element_offset;
        // this.offsets.archaic_2 = this.offsets.archaic_1 + this.element_height + element_offset;
        this.offsets.classical_1 = this.offsets.archaic_2 + this.element_height + element_offset;
        this.offsets.classical_2 = this.offsets.classical_1 + this.element_height + element_offset;
        this.offsets.heroic_1 = this.offsets.classical_2 + this.element_height + element_offset;
        this.offsets.heroic_2 = this.offsets.heroic_1 + this.element_height + element_offset;
        this.offsets.heroic_3 = this.offsets.heroic_2 + this.element_height + element_offset;
        this.offsets.mythic_1 = this.offsets.heroic_3 + this.element_height + element_offset;
        this.offsets.mythic_2 = this.offsets.mythic_1 + this.element_height + element_offset; //added -10
    }

    updatePositions() {
        // console.log('UP top - this.lanes: ', this.lanes);
        for (let lane of this.lanes) {
            lane.updatePositions(this.offsets, this.element_height);
        }

        let x = this.padding_tree + this.offsets_x;
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].x = x;
            x = x + this.lanes[i].width + this.padding_tree;
        }
        this.width = x;

        for (let lane of this.lanes) {
            // console.log('this.height: ', this.height);
            // console.log('this.element_height: ', this.element_height);
            // console.log('this.offsets: ', this.offsets , 'this.element_height: ', this.element_height);
            lane.updatePositions(this.offsets, this.element_height);
        }
        // console.log('UP bottom - this.lanes: ', this.lanes);
    }
}

export class Lane {
    rows: { [key: string]: (Caret | Caret_SP)[] };
    x: number;
    y: number;
    width: number;
    height: number;
    padding_lane: number;
    constructor() {
        this.rows = {
            archaic_1: [],
            archaic_2: [],
            classical_1: [],
            classical_2: [],
            heroic_1: [],
            heroic_2: [],
            heroic_3: [],
            mythic_1: [],
            mythic_2: [],  
        };
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.padding_lane = 10; //10
    }
    // x = 311.021 for Mountain Giant and Jotun 
    updatePositions(offsets, element_length) {
        let lane_width = 0;
        // console.log('Object.keys(this.rows): ', Object.keys(this.rows));
        for (let r of Object.keys(this.rows)) {
            
                // console.log('r: ', r);
                // console.log('offsets[r]: ', offsets[r]);
                // console.log('this.rows[r][i]: ', this.rows[r][i]);
                let x = this.x;
                let row_width = 0;
                // console.log('this.rows[r].length: ', this.rows[r].length);
                // console.log('this.rows[r]: ', this.rows[r]);
                // console.log('r: ', r, 'this.rows: ', this.rows);
                for (let i = 0; i < this.rows[r].length; i++) {
                    try {
                        // console.log('***r: ', r,'i: ', i,'this.rows[r][i]: ',this.rows[r][i], 'x :', x, 'this.rows[r][i].width:', this.rows[r][i].width, 'this.padding: ', this.padding);
                        // console.log('this.rows[r][i] before: ', this.rows[r][i]);
                        console.log('this.rows[r][i].y before: ', this.rows[r][i].y);
                        this.rows[r][i].y = offsets[r]; //maybe caret.y is set here
                        console.log('this.rows[r][i].y after: ', this.rows[r][i].y);
                        this.rows[r][i].x = x;
                        this.rows[r][i].width = element_length;
                        this.rows[r][i].height = element_length;
                        x = x + this.rows[r][i].width + this.padding_lane;
                        row_width = row_width + this.rows[r][i].width + this.padding_lane;
                    } catch (error) {
                        console.error('An error occured: ', error.message);
                        console.log('error, r: ', r);
                        console.log('this.rows[r]: ', this.rows[r]); 
                        console.log('this.rows[r][i]: ', this.rows[r][i]); //
                    }
                }
                lane_width = Math.max(lane_width, row_width);
            
                
        }
        this.width = lane_width;
        console.log('lane_width: ', lane_width, 'this.width: ', this.width);

        for (let r of Object.keys(this.rows)) {
            for (let i = 0; i < this.rows[r].length; i++) {
                if (this.rows[r][i].isBuilding() && String(this.rows[r][i].id).slice(-3) !== '_SP') { // I think this is whats moving DWARVEN ARMORY, added String() type cast to allow for slice
                    this.rows[r][i].x = this.x + ((this.width - this.padding_lane) / 2) - (this.rows[r][i].width / 2); //
                }
            }
        }
        // ToDo - add getConnections

        let connections = getConnections();
        // console.log('connections', connections);
        let carets = this.nonBuidingCarets();
        for (let connection of connections) {
            let from = connection[0];
            let to = connection[1]; // not used??
            // console.log('connection: ', connection,'from connection[0]: ', from, 'to connection[1]: ', to, 'to.x:', to.x);
            let allConnectionsForFrom = connections.filter(c => c[0] === from && carets.has(c[0]) && carets.has(c[1]));
            let allRelevantTos = allConnectionsForFrom.map(c => c[1]);
            let allRelevantTosXval = allRelevantTos.map(to_ => carets.get(to_).x) as number[];
            if (carets.has(from) && carets.get(from).x < Math.min(...allRelevantTosXval)) {
                carets.get(from).x = Math.min(...(allRelevantTos.map(to_ => carets.get(to_).x)));
            }
            if (carets.has(from) && carets.get(from).x > Math.max(...(allRelevantTos.map(to_ => carets.get(to_).x)))) {
                console.assert(allRelevantTos.length === 1, `Overlapping carets: ${allRelevantTos}`)
                allRelevantTos.forEach(to_ => carets.get(to_).x = carets.get(from).x);
            }
            // old version, typescript rejects
            // if (carets.has(from) && carets.get(from).x < Math.min(allRelevantTos.map(to_ => carets.get(to_).x))) {
            //     carets.get(from).x = Math.min(allRelevantTos.map(to_ => carets.get(to_).x));
            // }
            // if (carets.has(from) && carets.get(from).x > Math.max(allRelevantTos.map(to_ => carets.get(to_).x))) {
            //     console.assert(allRelevantTos.length === 1, `Overlapping carets: ${allRelevantTos}`)
            //     allRelevantTos.forEach(to_ => carets.get(to_).x = carets.get(from).x);
            // }
        }
    }

    nonBuidingCarets() {
        let c = new Map();
        for (let r of Object.keys(this.rows)) {
            for (let caret of this.rows[r]) {
                if (!caret.isBuilding()) {
                    c.set(caret.id, caret);
                }
            }
        }
        return c;
    }

    caretIds() {
        const idList = [];
        for (let r of Object.keys(this.rows)) {
            for (let i = 0; i < this.rows[r].length; i++) {
                idList.push(this.rows[r][i].id);
            }
        }
        return idList;
    }
}

export class Caret {
    type: caretConstMetadata;
    name: string;
    id: number;
    width: number;
    height: number;
    x: number;
    y: number;
    constructor(type, name, id) {
        this.type = type;
        this.name = name;
        this.id = PREFIX[type.type] + formatId(id); //
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
    }

    isBuilding() {
        return this.type === CARET_TYPES.BUILDING;
    }
}

export function formatId(string) {
    // return string.toString().replace(/\s/g, '_').replace(/\//g, '_').toLowerCase();
    return string.toString().toLowerCase();
}

// function getName(id, itemType) {
//     //ToDo handle unique stuff properly
//     if(isFinite.toString().startsWith('UNIQUE')) {
//         return id
//     }
//     const languageNameId = data['data'][itemType][id]['LanguageNameId'];
//     return data['string'][languageNameId];
// }
 
// function building(id) {
//     return new Caret(TYPES.BUILDING, getName(id, 'buildings'), id);
// }

//my first version
// function getName(obj_name_id, itemType) { //(id, itemType)
//     return obj_name_id.name;
// }
// console.log('test123 test123 test123 test123 test123 test123 test123 test123 test123 test123');

// Previous working version jan 16
// function getName(obj_name_id) { //(id, itemType)
//     let nameFormatted = obj_name_id.name.toString().replace(/_/g, ' ');
//     if (nameFormatted.length > 9) {
//         let lastSpaceIndex = nameFormatted.lastIndexOf(' ');
//         nameFormatted = `${nameFormatted.slice(0,lastSpaceIndex)}\n${nameFormatted.slice(lastSpaceIndex)}`;
//     }
//     // console.log('nameFormatted: ', nameFormatted);
//     return nameFormatted;
// }


export function getName(obj_name_id) { //(id, itemType)
    // let nameFormatted = obj_name_id.name.toString().replace(/_/g, ' ');
    // if (nameFormatted.length > 9) {
    //     let lastSpaceIndex = nameFormatted.lastIndexOf(' ');
    //     nameFormatted = `${nameFormatted.slice(0,lastSpaceIndex)}\n${nameFormatted.slice(lastSpaceIndex)}`;
    // }
    let nameFormatted =  jsonData[obj_name_id.id]["Name"];

    // console.log('nameFormatted: ', nameFormatted);
    return nameFormatted;
}

export function building(obj_name_id) { //(id)
    const caret = new Caret(CARET_TYPES.BUILDING, getName(obj_name_id), obj_name_id.id);
    // const caret = new Caret(CARET_TYPES.BUILDING, getName(obj_name_id, 'buildings'), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
    // return new Caret(TYPES.BUILDING, getName(obj_name_id, 'buildings'), obj_name_id.id);
}

export function unit(obj_name_id) { //(id)
    // console.log('unit called. obj_name_id: ', obj_name_id)
    // return new Caret(TYPES.UNIT, getName(obj_name_id, 'units'), obj_name_id.id);
    const caret = new Caret(CARET_TYPES.UNIT, getName(obj_name_id), obj_name_id.id);
    // const caret = new Caret(CARET_TYPES.UNIT, getName(obj_name_id, 'units'), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
}

export function tech(obj_name_id) { //(id)
    return new Caret(CARET_TYPES.TECHNOLOGY, getName(obj_name_id), obj_name_id.id);
}

export function major_god(obj_name_id) { //(id)
    // console.log('MG - obj_name_id: ', obj_name_id);
    // console.log('obj_name_id.id: ', obj_name_id.id);
    // console.log("getName(obj_name_id, 'units'): ",getName(obj_name_id, 'units'));
    const caret = new Caret(CARET_TYPES.MAJOR_GOD, getName(obj_name_id), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
}

export function minor_god(obj_name_id) { //(id)
    // console.log('Minor God - obj_name_id: ', obj_name_id);
    // console.log('obj_name_id.id: ', obj_name_id.id);
    // console.log("getName(obj_name_id, 'units'): ",getName(obj_name_id, 'units'));
    const caret = new Caret(CARET_TYPES.MINOR_GOD, getName(obj_name_id), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
}

export function god_power(obj_name_id) { //(id)
    // console.log('God Power - obj_name_id: ', obj_name_id);
    // console.log('obj_name_id.id: ', obj_name_id.id);
    // console.log("getName(obj_name_id, 'units'): ",getName(obj_name_id, 'units'));
    const caret = new Caret(CARET_TYPES.GOD_POWER, getName(obj_name_id), obj_name_id.id);
    console.log('caret GP: ', caret);
    return caret;
}

export function bushido_god_blessing(obj_name_id) { //(id)
    // console.log('God Power - obj_name_id: ', obj_name_id);
    // console.log('obj_name_id.id: ', obj_name_id.id);
    // console.log("getName(obj_name_id, 'units'): ",getName(obj_name_id, 'units'));
    const caret = new Caret(CARET_TYPES.BUSHIDO_GOD_BLESSING, getName(obj_name_id), obj_name_id.id);
    console.log('caret B_GP: ', caret);
    return caret;
}

// to-add-blank-dummy-slot
let blankID_Count = 0;
function get_next_BlankID() {
    blankID_Count++;
    
    return `blankID_${blankID_Count}`;
}

export function blank_caret() {
    // return new Caret(TYPES.BLANK.type, TYPES.BLANK.name, get_next_BlankID());
    const newBlankCaret = new Caret(CARET_TYPES.BLANK, CARET_TYPES.BLANK.name, get_next_BlankID());
    // return new Caret(CARET_TYPES.BLANK, CARET_TYPES.BLANK.name, get_next_BlankID());
    return newBlankCaret;
}

export function getDefaultTree() {
    let tree = new Tree();
    tree.updateOffsets();

    // townCenterLaneMatrix = [
    //     [TOWN_CENTER_NORSE], // archaic_1
    //     [GATHERER, DWARF, BERSERK], // archaic_2
    //     [RIGSTHULA], // classical_1
    //     [MASONS], // classical_2
    //     [ARCHITECTS], // heroic_1
    //     [FORTIFIED_TOWN_CENTER], // heroic_2
    //     [], // heroic_3
    //     [SECRETS_OF_THE_TITANS, ZEUS], // mythic_1
    //     [SECRETS_OF_THE_TITANS], // mythic_2
    // ];

    // addNewLaneToTree(tree, townCenterLaneMatrix);

    // oxCartLaneMatrix = [
    //     [OX_CART], // archaic_1
    //     [HUSBANDRY, BLANK, PICKAXE, HAND_AXE], // archaic_2
    //     [SURVIVAL_EQUIPMENT, PLOW], // classical_1
    //     [], // classical_2
    //     [WINTER_HARVEST, IRRIGATION, SHAFT_MINE, BOW_SAW], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [BLANK, FLOOD_CONTROL, QUARRY, CARPENTERS], // mythic_1
    //     [], // mythic_2
    // ];
    
    // addNewLaneToTree(tree, oxCartLaneMatrix);
 
    // houseLaneMatrix = [
    //     [HOUSE_NORSE], // archaic_1
    //     [FARM_NORSE], // archaic_2
    //     [], // classical_1
    //     [], // classical_2
    //     [], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, houseLaneMatrix);

    // dockLaneMatrix = [
    //     [DOCK_NORSE], // archaic_1
    //     [FISHING_SHIP_NORSE], // archaic_2
    //     [BLANK, LONGBOAT, DREKI, DRAGON_SHIP, TRANSPORT_SHIP_NORSE], // classical_1
    //     [PURSE_SEINE,        HEROIC_FLEET,    BLANK, BLANK,       ENCLOSED_DECK], // classical_2
    //     [SALT_AMPHORA, KRAKEN, HEAVY_WARSHIPS], // heroic_1
    //     [BLANK, WRATH_OF_THE_DEEP], // heroic_2
    //     [], // heroic_3
    //     [JORMUN_ELVER, CONSCRIPT_SAILORS, CHAMPION_WARSHIPS], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, dockLaneMatrix);

    // templeLaneMatrix = [
    //     [TEMPLE_NORSE], // archaic_1
    //     [HERSIR_HERO], // archaic_2
    //     [VALKYRIE, EINHERI, SAFEGUARD], // classical_1
    //     [DISABLOT, GJALLARHORN], // classical_2
    //     [MOUNTAIN_GIANT, FROST_GIANT], // heroic_1
    //     [JOTUNS, RIME], // heroic_2
    //     [], // heroic_3
    //     [OMNISCIENCE, FIRE_GIANT, FENRIS_WOLF_BROOD], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, templeLaneMatrix);

    // sentryTowerLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [SENTRY_TOWER_NORSE], // classical_1
    //     [SIGNAL_FIRES, WATCH_TOWER, CRENELLATIONS], // classical_2
    //     [CARRIER_PIGEONS, BOILING_OIL], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree,sentryTowerLaneMatrix);

    // armoryLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [ARMORY_NORSE], // classical_1
    //     [COPPER_WEAPONS, COPPER_ARMOR, COPPER_SHIELDS], // classical_2
    //     [BRONZE_WEAPONS, BRONZE_ARMOR, BRONZE_SHIELDS, BALLISTICS], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [IRON_WEAPONS, IRON_ARMOR, IRON_SHIELDS, BURNING_PITCH], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, armoryLaneMatrix);
  
    // marketLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [MARKET_NORSE], // classical_1
    //     [], // classical_2
    //     [OX_CARAVAN, TAX_COLLECTORS], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [COINAGE, AMBASSADORS], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, marketLaneMatrix);

    // longhouseLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [LONGHOUSE], // classical_1
    //     [N_MEDIUM_INFANTRY_NORSE_LH, BERSERK, THROWING_AXEMAN, HIRDMAN, HAMASK], // classical_2
    //     [N_HEAVY_INFANTRY_NORSE_LH, LEVY_LONGHOUSE_SOLDIERS, HUNTRESS_AXE], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [N_CHAMPION_INFANTRY_NORSE_LH, CONSCRIPT_LONGHOUSE_SOLDIERS, BERSERKERGANG], // mythic_1
    //     [BERSERKERGANG], // mythic_2
    // ];

    // addNewLaneToTree(tree, longhouseLaneMatrix);

    // greatHallLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [GREAT_HALL], // classical_1
    //     [HERSIR_HERO, RAIDING_CAVALRY, SESSRUMNIR, THUNDERING_HOOVES, MEDIUM_CAVALRY_NORSE], // classical_2
    //     [GODI_HERO, JARL, LEVY_GREAT_HALL_SOLDIERS, BLANK, HEAVY_CAVALRY_NORSE], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [BLANK, BLANK, CONSCRIPT_GREAT_HALL_SOLDIERS,BLANK, CHAMPION_CAVALRY_NORSE], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, greatHallLaneMatrix);

    // hillFortLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [], // classical_1
    //     [], // classical_2
    //     [HILL_FORT], // heroic_1
    //     [N_MEDIUM_INFANTRY_NORSE_HF, HUSKARL, PORTABLE_RAM, DRAFT_HORSES_NORSE, LEVY_HILL_FORT_SOLDIERS], // heroic_2
    //     [N_HEAVY_INFANTRY_NORSE_HF], // heroic_3
    //     [N_CHAMPION_INFANTRY_NORSE_HF, ENGINEERS_NORSE, BALLISTA, CONSCRIPT_HILL_FORT_SOLDIERS], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, hillFortLaneMatrix);

    // tree.updatePositions();

    // const minorGodLaneMatrix = minorGodLaneMatrices[jsonData[SELECTED_MAJOR_GOD_ID].Name];
    const selectedMajorGodLanesMatrices = majorGodLaneMatrices[jsonData[SELECTED_MAJOR_GOD_ID.id].Name];

    console.log('selectedMajorGodLanesMatrices: ', selectedMajorGodLanesMatrices);
    console.log('typeof(selectedMajorGodLanesMatrices): ', typeof(selectedMajorGodLanesMatrices));
    let key, value;
    for ([key, value] of Object.entries(selectedMajorGodLanesMatrices)) {
        console.log('key: ', key);
        console.log('value:', value);
        addNewLaneToTree(tree, value);
    }

    console.log('tree: ', tree);

    tree.updatePositions();

    return tree;
}

// moved to addConnections.ts
// function u(unit) {
//     return 'unit_' + unit;
// }

// function b(building) {
//     return 'building_' + building;
// }

// function t(tech) {
//     return 'tech_' + tech;
// }

export function getConnections() {
    // let connections = [
    //     [b(TOWN_CENTER_NORSE.id), u(GATHERER.id)],
    //     [b(TOWN_CENTER_NORSE.id), u(DWARF.id)],
    //     // [b(TOWN_CENTER_NORSE.id), u(BERSERK.id)], // need to at affixes for tc berserk
    //     // [b(TOWN_CENTER_NORSE.id), t(MASONS.id)],
    //     [t(MASONS.id), t(ARCHITECTS.id)],
    //     // [b(TOWN_CENTER_NORSE.id), t(FORTIFIED_TOWN_CENTER.id)],
    //     // [b(TOWN_CENTER_NORSE.id), t(SECRETS_OF_THE_TITANS.id)],
    //     [u(OX_CART.id), t(HUSBANDRY.id)],
    //     [u(OX_CART.id), t(PICKAXE.id)],
    //     [u(OX_CART.id), t(HAND_AXE.id)],
    //     [t(PICKAXE.id), t(SHAFT_MINE.id)],
    //     [t(SHAFT_MINE.id), t(QUARRY.id)],
    //     [t(PLOW.id), t(IRRIGATION.id)],
    //     [t(IRRIGATION.id), t(FLOOD_CONTROL.id)],
    //     [t(HAND_AXE.id), t(BOW_SAW.id)],
    //     [t(BOW_SAW.id), t(CARPENTERS.id)],
    //     [b(DOCK_NORSE.id), u(FISHING_SHIP_NORSE.id)],
    //     [b(DOCK_NORSE.id), u(LONGBOAT.id)],
    //     [b(DOCK_NORSE.id), u(DREKI.id)],
    //     [b(DOCK_NORSE.id), u(DRAGON_SHIP.id)],
    //     [b(DOCK_NORSE.id), u(TRANSPORT_SHIP_NORSE.id)],
    //     [b(TEMPLE_NORSE.id), u(HERSIR_HERO.id)],
    //     [b(TEMPLE_NORSE.id), u(VALKYRIE.id)],
    //     [b(TEMPLE_NORSE.id), u(EINHERI.id)],
    //     [b(TEMPLE_NORSE.id), t(SAFEGUARD.id)],
    //     [u(VALKYRIE.id), t(DISABLOT.id)],
    //     [u(EINHERI.id), t(GJALLARHORN.id)],
    //     [b(TEMPLE_NORSE.id), u(MOUNTAIN_GIANT.id)],
    //     [b(TEMPLE_NORSE.id), u(FROST_GIANT.id)],
    //     [u(MOUNTAIN_GIANT.id), t(JOTUNS.id)],
    //     [u(FROST_GIANT.id), t(RIME.id)],
    //     [b(TEMPLE_NORSE.id), t(OMNISCIENCE.id)],
    //     [b(TEMPLE_NORSE.id), u(FIRE_GIANT.id)],
    //     [b(TEMPLE_NORSE.id), u(FENRIS_WOLF_BROOD.id)],

    //     [u(FISHING_SHIP_NORSE.id), t(PURSE_SEINE.id)],
    //     [t(PURSE_SEINE.id), t(SALT_AMPHORA.id)],
    //     [b(LONGHOUSE.id), u(BERSERK.id)],
    //     [b(LONGHOUSE.id), u(THROWING_AXEMAN.id)],
    //     [b(LONGHOUSE.id), u(HIRDMAN.id)],
    //     [b(LONGHOUSE.id), t(N_MEDIUM_INFANTRY_NORSE_LH.id)],
    //     // [b(LONGHOUSE.id), t(LEVY_LONGHOUSE_SOLDIERS.id)],
    //     [b(LONGHOUSE.id), t(N_HEAVY_INFANTRY_NORSE_LH.id)],
    //     [t(LEVY_LONGHOUSE_SOLDIERS.id), t(CONSCRIPT_LONGHOUSE_SOLDIERS.id)],
    //     [b(LONGHOUSE.id), t(N_CHAMPION_INFANTRY_NORSE_LH.id)],
    //     [b(GREAT_HALL.id), u(HERSIR_HERO.id)],
    //     [b(GREAT_HALL.id), u(RAIDING_CAVALRY.id)],
    //     [b(GREAT_HALL.id), t(MEDIUM_CAVALRY_NORSE.id)],  // MEDIUM_CAVALRY_NORSE = {id: 11, name: "MEDIUM_CAVALRY_NORSE"};
    //     [b(GREAT_HALL.id), u(GODI_HERO.id)],
    //     [b(GREAT_HALL.id), u(JARL.id)],
    //     [b(GREAT_HALL.id), t(HEAVY_CAVALRY_NORSE.id)],
    //     [b(GREAT_HALL.id), t(LEVY_GREAT_HALL_SOLDIERS.id)],
    //     [t(HEAVY_CAVALRY_NORSE.id), t(CHAMPION_CAVALRY_NORSE.id)],
    //     [t(LEVY_GREAT_HALL_SOLDIERS.id), t(CONSCRIPT_GREAT_HALL_SOLDIERS.id)],
    //     [b(HILL_FORT.id), u(HUSKARL.id)],
    //     [b(HILL_FORT.id), u(PORTABLE_RAM.id)],
    //     [b(HILL_FORT.id), t(N_MEDIUM_INFANTRY_NORSE_HF.id)],
    //     [b(HILL_FORT.id), t(DRAFT_HORSES_NORSE.id)],
    //     [b(HILL_FORT.id), t(LEVY_HILL_FORT_SOLDIERS.id)],
    //     [t(N_MEDIUM_INFANTRY_NORSE_HF.id), t(N_HEAVY_INFANTRY_NORSE_HF.id)],
    //     [t(N_HEAVY_INFANTRY_NORSE_HF.id), t(N_CHAMPION_INFANTRY_NORSE_HF.id)],
    //     [b(HILL_FORT.id), t(ENGINEERS_NORSE.id)],
    //     [t(LEVY_HILL_FORT_SOLDIERS.id), t(CONSCRIPT_HILL_FORT_SOLDIERS.id)],
    //     [b(HILL_FORT.id), u(BALLISTA.id)]

    // ];

        // let connections = [
        //     [b(TOWN_CENTER_NORSE.id), u(GATHERER.id)],
        //     [b(TOWN_CENTER_NORSE.id), u(DWARF.id)],
        //     // [b(TOWN_CENTER_NORSE.id), u(BERSERK.id)], // need to at affixes for tc berserk
        //     // [b(TOWN_CENTER_NORSE.id), t(MASONS.id)],
        //     [t(MASONS.id), t(ARCHITECTS.id)],
        //     [u(OX_CART.id), t(HUSBANDRY.id)],
        //     [u(OX_CART.id), t(PICKAXE.id)],
        //     [u(OX_CART.id), t(HAND_AXE.id)],
        //     [t(PICKAXE.id), t(SHAFT_MINE.id)],
        //     [t(SHAFT_MINE.id), t(QUARRY.id)],
        //     [t(PLOW.id), t(IRRIGATION.id)],
        //     [t(IRRIGATION.id), t(FLOOD_CONTROL.id)],
        //     [t(HAND_AXE.id), t(BOW_SAW.id)],
        //     [t(BOW_SAW.id), t(CARPENTERS.id)],
        // ];

        // let connections = [
        //     [b(TOWN_CENTER_NORSE.id), u(GATHERER.id)],
        //     [b(TOWN_CENTER_NORSE.id), u(DWARF.id)],
        //     // [b(TOWN_CENTER_NORSE.id), u(BERSERK.id)], // need to at affixes for tc berserk
        //     // [b(TOWN_CENTER_NORSE.id), t(MASONS.id)],
        //     [t(MASONS.id), t(ARCHITECTS.id)],
        //     [u(OX_CART.id), t(HUSBANDRY.id)],
        //     [u(OX_CART.id), t(PICKAXE.id)],
        //     [u(OX_CART.id), t(HAND_AXE.id)],
        //     [t(PICKAXE.id), t(SHAFT_MINE.id)],
        //     [t(SHAFT_MINE.id), t(QUARRY.id)],
        //     [u(OX_CART.id), t(PLOW.id)], // added after check OX_CART: 146 PLOW: 654
        //     [t(PLOW.id), t(IRRIGATION.id)],
        //     [t(IRRIGATION.id), t(FLOOD_CONTROL.id)],
        //     [t(HAND_AXE.id), t(BOW_SAW.id)],
        //     [t(BOW_SAW.id), t(CARPENTERS.id)],
        // ];

    let connectionsToAdd = [
        // [TOWN_CENTER_NORSE, GATHERER],
        // [TOWN_CENTER_NORSE, DWARF],
        // // [TOWN_CENTER_NORSE, BERSERK],
        // [MASONS, ARCHITECTS],

        // [OX_CART, HUSBANDRY],
        // [OX_CART, PICKAXE],
        // [OX_CART, HAND_AXE],
        // [PICKAXE, SHAFT_MINE],
        // [SHAFT_MINE, QUARRY],
        // [HAND_AXE, BOW_SAW],
        // [BOW_SAW, CARPENTERS],
        // [OX_CART, PLOW], //
        // [PLOW, IRRIGATION],
        // [IRRIGATION, FLOOD_CONTROL],

        // [DOCK_NORSE, FISHING_SHIP_NORSE],
        // [DOCK_NORSE, LONGBOAT],
        // [DOCK_NORSE, DREKI],
        // [DOCK_NORSE, DRAGON_SHIP],
        // [DOCK_NORSE, TRANSPORT_SHIP_NORSE],
        // [TRANSPORT_SHIP_NORSE, ENCLOSED_DECK],
        // [PURSE_SEINE, SALT_AMPHORA],
        // [HEAVY_WARSHIPS, CHAMPION_WARSHIPS], //need to rename to CHAMPION_WARSHIPS

        // // [TEMPLE_NORSE, HERSIR_HERO],
        // [TEMPLE_NORSE, EINHERI],
        // [TEMPLE_NORSE, SAFEGUARD],
        // [VALKYRIE, DISABLOT],
        // [EINHERI, GJALLARHORN],
        // [MOUNTAIN_GIANT, JOTUNS],
        // [FROST_GIANT, RIME],

        // [SENTRY_TOWER_NORSE, WATCH_TOWER],
        // [SENTRY_TOWER_NORSE, SIGNAL_FIRES],
        // [SENTRY_TOWER_NORSE, CRENELLATIONS],
        // [SIGNAL_FIRES, CARRIER_PIGEONS],

        // [ARMORY_NORSE, COPPER_WEAPONS],
        // [ARMORY_NORSE, COPPER_ARMOR],
        // [ARMORY_NORSE, COPPER_SHIELDS],
        // [COPPER_WEAPONS, BRONZE_WEAPONS],
        // [COPPER_ARMOR, BRONZE_ARMOR],
        // [COPPER_SHIELDS, BRONZE_SHIELDS], // check if shield should be plural
        // [ARMORY_NORSE, BALLISTICS],
        // [BRONZE_WEAPONS, IRON_WEAPONS],
        // [BRONZE_ARMOR, IRON_ARMOR],
        // [BRONZE_SHIELDS, IRON_SHIELDS],

        // [MARKET_NORSE, OX_CARAVAN],
        // [MARKET_NORSE, TAX_COLLECTORS],
        // [TAX_COLLECTORS, AMBASSADORS],

        // [LONGHOUSE, N_MEDIUM_INFANTRY_NORSE_LH],
        // [LONGHOUSE, BERSERK],
        // [LONGHOUSE, THROWING_AXEMAN],
        // [LONGHOUSE, HIRDMAN],
        // [LONGHOUSE, HAMASK],
        // [N_MEDIUM_INFANTRY_NORSE_LH, N_HEAVY_INFANTRY_NORSE_LH],
        // [N_HEAVY_INFANTRY_NORSE_LH, N_CHAMPION_INFANTRY_NORSE_LH],
        // [LEVY_LONGHOUSE_SOLDIERS, CONSCRIPT_LONGHOUSE_SOLDIERS],
        // [THROWING_AXEMAN, HUNTRESS_AXE],

        // [GREAT_HALL, HERSIR_HERO],
        // [GREAT_HALL, RAIDING_CAVALRY],
        // [GREAT_HALL, SESSRUMNIR],
        // [GREAT_HALL, THUNDERING_HOOVES],
        // [GREAT_HALL, MEDIUM_CAVALRY_NORSE],
        // [MEDIUM_CAVALRY_NORSE, HEAVY_CAVALRY_NORSE],
        // [HEAVY_CAVALRY_NORSE, CHAMPION_CAVALRY_NORSE],
        // [LEVY_GREAT_HALL_SOLDIERS, CONSCRIPT_GREAT_HALL_SOLDIERS],

        // [HILL_FORT, N_MEDIUM_INFANTRY_NORSE_HF],
        // [HILL_FORT, HUSKARL],
        // [HILL_FORT, PORTABLE_RAM],
        // [HILL_FORT, DRAFT_HORSES_NORSE],
        // [HILL_FORT, LEVY_HILL_FORT_SOLDIERS],
        // [LEVY_HILL_FORT_SOLDIERS, CONSCRIPT_HILL_FORT_SOLDIERS],
        // [N_MEDIUM_INFANTRY_NORSE_HF, N_HEAVY_INFANTRY_NORSE_HF],
        // [N_HEAVY_INFANTRY_NORSE_HF, N_CHAMPION_INFANTRY_NORSE_HF],
    ];

    let connections = [];

    for (let i = 0; i < connectionsToAdd.length; i++) {
        addConnection(connectionsToAdd[i][0], connectionsToAdd[i][1], connections);
        // console.log('connectionsToAdd[i][0]: ', connectionsToAdd[i][0], 'connectionsToAdd[i][0].type: ', connectionsToAdd[i][0].type);
        // console.log('connectionsToAdd[i][1]: ', connectionsToAdd[i][1], 'connectionsToAdd[i][1].type: ', connectionsToAdd[i][1].type);    
    }

    let connections_ids = [];
    for (let c of connections) {
        connections_ids.push([formatId(c[0]), formatId(c[1])]);
    }
    return connections_ids;
}


// remove 
function testCrossFileSharing(){
    console.log('cross file sharing successful');
}

export function getConnectionPoints(tree) {
    let points = new Map();
    for (let lane of tree.lanes) {
        for (let r of Object.keys(lane.rows)) {
            for (let caret of lane.rows[r]) {
                // console.log('caret: ', caret);
                points.set(caret.id, {
                    x: caret.x + (caret.width / 2),
                    y: caret.y + (caret.height / 2)
                });
            }
        }
    }
    return points;
}

// console.log('RAMMING_WASEN: ', RAMMING_WASEN);