// const UNIT = 'unit';
// const BUILDING = 'building';
// const TECH = 'tech'; 
// const BLANK = 'blank';
// const MAJOR_GOD = 'major_god';
// const MINOR_GOD = 'minor_god';
// const GOD_POWER = 'god_power';
// const ROWS = {
//     ARCHAIC_1: 0,
//     ARCHAIC_2 : 1,
//     CLASSICAL_1: 2,
//     CLASSICAL_2: 3,
//     HEROIC_1: 4,
//     HEROIC_2: 5,
//     HEROIC_3: 6,
//     MYTHIC_1: 7,
//     MYTHIC_2: 8,
// }
import { blank_caret, PREFIX, formatId, CARET_TYPES, getName, building, bushido_god_blessing, god_power, Lane, major_god, minor_god, tech, unit } from "./techtree.js";
import { UNIT, BUILDING, TECH, BLANK, MAJOR_GOD, MINOR_GOD, GOD_POWER, BUSHIDO_AND_GOD_BLESSING, ROWS } from "./addNewLaneToTree.js";
import { Caret } from "./techtree.js";
export class Caret_SP {
    type;
    name;
    id;
    width;
    height;
    x;
    y;
    constructor(type, name, id) {
        this.type = type;
        this.name = name;
        this.id = PREFIX[type.type] + formatId(id) + '_SP'; //
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
    }
    isBuilding() {
        return this.type === CARET_TYPES.BUILDING;
    }
}
function applyDataWrapperSP(item) {
    // console.log('applyDataWrapperSP called with item: ', item);
    // console.log('item instanceof Caret_SP: ', item instanceof Caret_SP, 'item instanceof Caret: ', item instanceof Caret, 'typeof item: ',typeof item);
    if (item.type.name === BLANK) {
        return blank_caret();
    }
    // console.log('*item: ' ,item ,'item.type: ', item.type, 'item.type.type: ', item.type.type);
    // switch(item.type.name) {
    switch (String(item.type)) { //should it be item.type or item.type.type
        case UNIT:
            // return new Caret_SP(CARET_TYPES.UNIT, getName(item, 'units'), item.id);
            return new Caret_SP(CARET_TYPES.UNIT, getName(item), item.id);
        case BUILDING:
            return new Caret_SP(CARET_TYPES.BUILDING, getName(item), item.id);
        case TECH:
            // console.log('TECH item in applyDataWrapperSP entered, CARET_TYPES.TECHNOLOGY', CARET_TYPES.TECHNOLOGY, 'getName(item: ', getName(item));
            return new Caret_SP(CARET_TYPES.TECHNOLOGY, getName(item), item.id);
        case MAJOR_GOD:
            return new Caret_SP(CARET_TYPES.MAJOR_GOD, getName(item), item.id);
        case MINOR_GOD:
            // console.log('MG_SP: ', item);
            return new Caret_SP(CARET_TYPES.MINOR_GOD, getName(item), item.id);
        case GOD_POWER:
            return new Caret_SP(CARET_TYPES.GOD_POWER, getName(item), item.id);
        case BUSHIDO_AND_GOD_BLESSING:
            // console.log('B_GP_SP: ', item);
            return new Caret_SP(CARET_TYPES.BUSHIDO_GOD_BLESSING, getName(item), item.id);
        default:
            // console.log('default entered for item: ', item);
            break;
    }
}
// mythic_1
export function addNewLaneToTreeSP(tree, rowsMatrix) {
    let lane = new Lane();
    for (let i = 0; i < rowsMatrix.length; i++) {
        for (let j = 0; j < rowsMatrix[i].length; j++) {
            switch (i) {
                case ROWS.ARCHAIC_1:
                    lane.rows.archaic_1.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    // console.log('rowsMatrix[i][j]: ', rowsMatrix[i][j]);
                    // console.log('applyDataWrapperSP(rowsMatrix[i][j]): ', applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                case ROWS.ARCHAIC_2:
                    lane.rows.archaic_2.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                case ROWS.CLASSICAL_1:
                    lane.rows.classical_1.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                case ROWS.CLASSICAL_2:
                    lane.rows.classical_2.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                case ROWS.HEROIC_1:
                    lane.rows.heroic_1.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                case ROWS.HEROIC_2:
                    lane.rows.heroic_2.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                case ROWS.HEROIC_3:
                    lane.rows.heroic_3.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                case ROWS.MYTHIC_1:
                    lane.rows.mythic_1.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                case ROWS.MYTHIC_2:
                    lane.rows.mythic_2.push(applyDataWrapperSP(rowsMatrix[i][j]));
                    break;
                default:
                    break;
            }
        }
    }
    tree.lanes.push(lane);
}
//# sourceMappingURL=addNewLaneToTreeSP.js.map