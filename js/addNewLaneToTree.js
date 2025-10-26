// let oxCartLane = new Lane();
//     oxCartLane.rows.archaic_1.push(unit(OX_CART));
//     oxCartLane.rows.archaic_2.push(tech(HUSBANDRY));
//     oxCartLane.rows.archaic_2.push(blank_caret());
//     oxCartLane.rows.archaic_2.push(tech(PICKAXE));
//     oxCartLane.rows.archaic_2.push(tech(HAND_AXE)); 
//     oxCartLane.rows.classical_1.push(tech(SURVIVAL_EQUIPMENT));
//     oxCartLane.rows.classical_1.push(tech(PLOW));
    
//     oxCartLane.rows.heroic_1.push(tech(WINTER_HARVEST));
//     oxCartLane.rows.heroic_1.push(tech(IRRIGATION));
//     oxCartLane.rows.heroic_1.push(tech(SHAFT_MINE));
//     oxCartLane.rows.heroic_1.push(tech(BOW_SAW));
    
//     oxCartLane.rows.mythic_1.push(blank_caret());
//     oxCartLane.rows.mythic_1.push(tech(FLOOD_CONTROL));
//     oxCartLane.rows.mythic_1.push(tech(QUARRY));
//     oxCartLane.rows.mythic_1.push(tech(CARPENTERS));
    
//     tree.lanes.push(oxCartLane);

const UNIT = 'unit';
const BUILDING = 'building';
const TECH = 'tech'; 
const BLANK = 'blank';

const ROWS = {
    ARCHAIC_1: 0,
    ARCHAIC_2 : 1,
    CLASSICAL_1: 2,
    CLASSICAL_2: 3,
    HEROIC_1: 4,
    HEROIC_2: 5,
    HEROIC_3: 6,
    MYTHIC_1: 7,
    MYTHIC_2: 8,
}

function applyDataWrapper(item) {
    if (item === BLANK) {
        return blank_caret();
    }
    console.log('item: ', item, 'item.type: ', item.type);
    switch(item.type) {
        case UNIT:
            console.log('UNIT Entered, item: ',item, 'unit(item):', unit(item));
            return unit(item);
        case BUILDING:
            return building(item);
        case TECH:
           return tech(item); 
        default:
            break;
    }
}

// mythic_1
function addNewLaneToTree(tree, rowsMatrix) {
    let lane = new Lane();

    for(let i = 0; i < rowsMatrix.length; i++) {
        for(let j = 0; j < rowsMatrix[i].length; j++) {
            switch(i) {
                case ROWS.ARCHAIC_1:
                    lane.rows.archaic_1.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                case ROWS.ARCHAIC_2:
                    lane.rows.archaic_2.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                case ROWS.CLASSICAL_1:
                    lane.rows.classical_1.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                case ROWS.CLASSICAL_2:
                    lane.rows.classical_2.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                case ROWS.HEROIC_1:
                    lane.rows.heroic_1.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                case ROWS.HEROIC_2:
                    lane.rows.heroic_2.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                case ROWS.HEROIC_3:
                    lane.rows.heroic_3.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                case ROWS.MYTHIC_1:
                    lane.rows.mythic_1.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                case ROWS.MYTHIC_2:
                    lane.rows.mythic_2.push(applyDataWrapper(rowsMatrix[i][j]));
                    break;
                default:
                    break;
            }
        }  
    }
    tree.lanes.push(lane);
}
    