import {ZEUS} from "./units.js";
import { addConnection } from "./addConnection.js";
import { majorGodLaneMatrices } from "./majorGodLaneMatrices.js";
import { addNewLaneToTree } from "./addNewLaneToTree.js";
import { Caret_SP } from "./addNewLaneToTreeSP.js";
import { connectionsToAddMatrices } from "./connectionsToAdd.js";
import { buildingCaretsToSkipCenteringForId } from "./buildingCaretsToSkipCentering.js";

import jsonData from '../data.json' with { type: 'json' };

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

export const SELECTED_MAJOR_GOD_ID: { id: number | undefined } = localStorage.getItem("SELECTED_MAJOR_GOD_ID") ? {id: JSON.parse(localStorage.getItem("SELECTED_MAJOR_GOD_ID"))} : { id: ZEUS.id };

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
    name = words.join(' ').replace("'S", "'s");
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
    offsets_y: { [key: string]: number };
    padding_tree: number;
    height: number;
    width: number;
    element_height: number;
    lanes: Lane[];
    offset_x: number;
    extra_y_offset: number;
    extra_y_offset_2: number;
    extra_y_offset_3_archaic_1_top_padding: number;
    element_offset: number;
    element_offset_size_factor: number;
    constructor() {
        this.offsets_y = {
            // I think age_row#_y offsets are never used and I am just adding this.offsets_y.archaic_1 
            // offsets w/o _y suffix are then used to calculate row y-postion
            archaic_1: 0,
            archaic_2: 0,
            classical_1: 0, 
            classical_2: 0,
            heroic_1: 0, // Norse 4 icons
            heroic_2: 0,
            heroic_3: 0,
            mythic_1: 0,
            mythic_2: 0,
        };
        this.padding_tree = 20; //20 // between lanes-(lie left padding), appears at the front/left of the lane, and at left hand side/start of tree adds
        // this.height = Math.max(window.innerHeight - 2 * (this.padding_tree), 100); // this.height = Math.max(window.innerHeight - 80, 100);
        this.height = Math.max(window.innerHeight - 2 * (window.innerHeight * 0.03367), 100);
        // this.height = Math.max(window.innerHeight - (window.innerHeight * 0.2), 100); // this.height = Math.max(window.innerHeight - 80, 100); 20 / 609 = 0.0328, 3.28% - 20 /594px = 0.03367 // *0.2 works well for the three samlple sizes
        this.width = 0;
        this.element_height = 0;
        this.lanes = [];
        this.offset_x = 150; // 150 is starting offset from the left to accommodate age icons
        this.extra_y_offset = 0;
        this.extra_y_offset_2 = 0;
        this.extra_y_offset_3_archaic_1_top_padding = 0
        this.element_offset = 0;
        this.element_offset_size_factor = 1;
    }

    // this.element_height is a fraction of height // 8 element_heights and 10 gaps

    // 34.255

    // not sure if archaic_1 is correct of if it should be archaic_1_y
    updateOffsets() {
        // this sets caret size
        // this.element_height = (this.height * 0.95) / 4 / 3.25; // this.height / 4 / 3 // *0.95 is to get the bottom row (mythic_2) to fit
        this.element_height = (this.height) / 4 / 3 * 1.04; // this.height / 4 / 3 //
        // let element_offset = this.element_height / 3 /(1 + (0.1 * 2 / 3)); // this.element_height / 2 // vert distance between carets in the same column *1/2 gap is half caret *1/3 gap is 1/3 a caret 
        this.element_offset = this.element_height / 3; // * 0.9 // space between lanes/rows
        // let element_offset = 0;
        console.log('this.element_height / 3: ', this.element_height / 3);                                            //decreasing element offset does not incease element_height 
        console.log('this.element_height / 3 * 0.6: ', this.element_height / 3 * 0.6);  
        // console.log('in updateOffsets - this.element_height: ', this.element_height, 'element_offset: ', element_offset);
        console.log('@^@ this.height: ', this.height);
        console.log('@^@ this.element_height: ', this.element_height);
        console.log('@^@ this.element_offset: ', this.element_offset);
        // element_height = 49.313;
        // element_offset = 16.438;
        // this.heihgt = 569;
        this.offsets_y.archaic_1 = this.padding_tree - 10 + this.extra_y_offset; // this.padding = 20, -10 moves top of age row icons down to give them visible border. padding=10 reintroduces verticle scroll bar
        this.offsets_y.archaic_2 = this.offsets_y.archaic_1 + this.element_height + this.element_offset + this.extra_y_offset;
        // this.offsets_y.archaic_2 = this.offsets_y.archaic_1 + this.element_height + element_offset;
        this.offsets_y.classical_1 = this.offsets_y.archaic_2 + this.element_height + this.element_offset + this.extra_y_offset + this.extra_y_offset_2;
        this.offsets_y.classical_2 = this.offsets_y.classical_1 + this.element_height + this.element_offset + this.extra_y_offset;
        this.offsets_y.heroic_1 = this.offsets_y.classical_2 + this.element_height + this.element_offset + this.extra_y_offset + this.extra_y_offset_2;
        this.offsets_y.heroic_2 = this.offsets_y.heroic_1 + this.element_height + this.element_offset + this.extra_y_offset;
        this.offsets_y.heroic_3 = this.offsets_y.heroic_2 + this.element_height + this.element_offset + this.extra_y_offset + this.extra_y_offset_2;
        this.offsets_y.mythic_1 = this.offsets_y.heroic_3 + this.element_height + this.element_offset + this.extra_y_offset;
        this.offsets_y.mythic_2 = this.offsets_y.mythic_1 + this.element_height + this.element_offset + this.extra_y_offset; //added -10
    }

    updatePositions() {
        // console.log('UP top - this.lanes: ', this.lanes);
        for (let lane of this.lanes) {
            lane.updatePositions(this.offsets_y, this.element_height);
        }

        let x = this.padding_tree + this.offset_x;  
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].x = x;
            x = x + this.lanes[i].width + this.padding_tree;
        }
        this.width = x;

        for (let lane of this.lanes) {
            // console.log('this.height: ', this.height);
            // console.log('this.element_height: ', this.element_height);
            // console.log('this.offsets_y: ', this.offsets_y , 'this.element_height: ', this.element_height);
            lane.updatePositions(this.offsets_y, this.element_height);
        }
        // console.log('UP bottom - this.lanes: ', this.lanes);
    }

    getDefaultCaretHeight(): number {
        console.log('vBv this.lanes.length: ', this.lanes.length);
        for (let i = 0; i < this.lanes.length; i++) {
            for (const row of Object.values(this.lanes[i].rows)) {
                for (const caret of row) {
                    if (caret.height) {
                        console.log('vBv if entered: ', 'caret.height: ', caret.height);
                        return caret.height;
                    }
                }
            }
        }
        console.log('vBv no carets in tree or caret height set to  or null');
        return 0; 
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
        this.padding_lane = 10; //10 // add space between carets in the same row
    }
    
    getPaddingLane() {
        return this.padding_lane;
    }

    updatePositions(offsets_y, element_length) {
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
                        console.log('UP! r:', r, 'offsets_y[r]:', offsets_y[r]);
                        console.log('UP! this.rows[r][i].y before: ', this.rows[r][i].y);
                        this.rows[r][i].y = offsets_y[r]; //maybe caret.y is set here
                        console.log('UP! this.rows[r][i].y after: ', this.rows[r][i].y);
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
                if (this.rows[r][i].isBuilding() && String(this.rows[r][i].id).slice(-3) !== '_SP' && !buildingCaretsToSkipCenteringForId.includes(String(this.rows[r][i].id))) { // I think this is whats moving DWARVEN ARMORY, added String() type cast to allow for slice
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
                if (allRelevantTos.length === 1) {
                    console.log('allRelevantTos length === 1: ', allRelevantTos);
                } else {
                    console.log('allRelevantTos .length !== 1: ', allRelevantTos);
                }
                
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
    const windowHeight = window.innerHeight;
    console.log('MTS windowHeight: ', windowHeight);

    let MAIN_TREE_HEIGHT_SZIE_FACTOR = 1;
    // add more size_factor cases as need or to get more consistent margins

    switch(true) {
        case windowHeight < 450:
            MAIN_TREE_HEIGHT_SZIE_FACTOR = 0.95;
            break;
        default:
            MAIN_TREE_HEIGHT_SZIE_FACTOR = 1; 
    }


    console.log('MTS MAIN_TREE_HEIGHT_SZIE_FACTOR: ', MAIN_TREE_HEIGHT_SZIE_FACTOR);

    let tree = new Tree();
    console.log('MTS tree.height Before: ', tree.height);
    // tree.height = Math.max(window.innerHeight * MAIN_TREE_HEIGHT_SZIE_FACTOR, 100);
    tree.height = Math.max((window.innerHeight - 2 * (window.innerHeight * 0.03367)) * MAIN_TREE_HEIGHT_SZIE_FACTOR, 100);
    tree.updateOffsets();
    console.log('MTS tree.height After: ', tree.height);

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

export function getConnections() {
   
    let connectionsToAdd = [];

    let connections = [];

    //    const selectedMajorGodLanesMatrices = majorGodLaneMatrices[jsonData[SELECTED_MAJOR_GOD_ID.id].Name];

    console.log('*!* SELECTED_MAJOR_GOD_ID: ', SELECTED_MAJOR_GOD_ID)
    console.log('*!* connectionsToAddMatrices[jsonData[SELECTED_MAJOR_GOD_ID.id].NAME]: ', connectionsToAddMatrices[jsonData[SELECTED_MAJOR_GOD_ID.id].NAME]);
    console.log('*!* jsonData[SELECTED_MAJOR_GOD_ID.id]: ', jsonData[SELECTED_MAJOR_GOD_ID.id]);
    console.log('*!* jsonData[SELECTED_MAJOR_GOD_ID.id].Name: ', jsonData[SELECTED_MAJOR_GOD_ID.id].Name);

    if (connectionsToAddMatrices[jsonData[SELECTED_MAJOR_GOD_ID.id].Name]) {
        connectionsToAdd = connectionsToAddMatrices[jsonData[SELECTED_MAJOR_GOD_ID.id].Name]
    } else {
        connectionsToAdd = [];
    }
    console.log('connectionsToAdd: ', connectionsToAdd, SELECTED_MAJOR_GOD_ID);
    // connectionsToAdd = connectionsToAddMatrices.odin; // change to be dynamic

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
