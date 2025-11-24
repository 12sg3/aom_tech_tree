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

class Caret_SP {
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
        return this.type === TYPES.BUILDING;
    }
} 

function applyDataWrapperSP(item) {
    if (item === BLANK) {
        return blank_caret();
    }
    switch(item.type) {
        case UNIT:
            return new Caret_SP(TYPES.UNIT, getName(item, 'units'), item.id);;
        case BUILDING:
            return new Caret_SP(TYPES.BUILDING, getName(item, 'buildings'), item.id);
        case TECH:
           return new Caret_SP(TYPES.TECHNOLOGY, getName(item, 'units'), item.id); 
        case MAJOR_GOD:
            return new Caret_SP(TYPES.MAJOR_GOD, getName(item, 'units'), item.id);
        case MINOR_GOD:
            return new Caret_SP(TYPES.MINOR_GOD, getName(item, 'units'), item.id);
        case GOD_POWER:
            return new Caret_SP(TYPES.GOD_POWER, getName(item, 'units'), item.id);
        default:
            break;
    }
}

// mythic_1
function addNewLaneToTreeSP(tree, rowsMatrix) {
    let lane = new Lane();

    for(let i = 0; i < rowsMatrix.length; i++) {
        for(let j = 0; j < rowsMatrix[i].length; j++) {
            switch(i) {
                case ROWS.ARCHAIC_1:
                    lane.rows.archaic_1.push(applyDataWrapperSP(rowsMatrix[i][j]));
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
    