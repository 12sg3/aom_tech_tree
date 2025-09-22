const TYPES = Object.freeze({
    'BUILDING': {colour: '#922602', type: 'BUILDING', name: 'Building'},
    'UNIT': {colour: '#3a6a80', type: 'UNIT', name: 'Unit'},
    // 'UNIQUEUNIT': {colour: '#af30a3', type: 'UNIQUEUNIT', name: 'Unique Unit'},
    'TECHNOLOGY': {colour: '#2c5729', type: 'TECHNOLOGY', name: 'Technology'}
});

const PREFIX = Object.freeze({
    'BUILDING': 'building_',
    'UNIT': 'unit_',
    'TECHNOLOGY': 'tech_',       
});

AGE_IMAGES = ['archaic_age_icon.webp', 'classical_age_icon.webp', 'heroic_age_icon.webp', 'mythic_age_icon.webp'];

// LONGHOUSE = 0;
// BERSERK = 1;
// THROWING_AXEMEN = 2;
// HIRDMAN = 3;
// MEDIUM_INFANTRY = 4;
// LEVY_LONGHOUSE_SOLDIERS = 5;
// HEAVY_INFANTRY  = 6;
// CHAMPION_INFANTRY = 7;
// LONGHOUSE = {"id": 0, "name":"LONGHOUSE"};
// LONGHOUSE = {id: 0, name:"LONGHOUSE"};
// BERSERK = {id:1, name: "BERSERK"};
// THROWING_AXEMEN = 2;
// HIRDMAN = 3;
// MEDIUM_INFANTRY = 4;
// LEVY_LONGHOUSE_SOLDIERS = 5;
// HEAVY_INFANTRY  = 6;
// CHAMPION_INFANTRY = 7;
// GREAT_HALL = 8;
// HERSIR = 9;
// RAIDING_CAVALRY = 10;
// MEDIUM_CAVALRY = 11;
// GODI = 12;
// HEAVY_CAVALRY = 13;
// LEVY_GREAT_HALL_SOLDIERS = 14;
// CHAMPION_CAVALRY = 15;
// CONSCRIPT_GREAT_HALL_SOLDIERS = 16;
// HILL_FORT = 17;
// HUSKARL = 18;
// PORTABLE_RAM = 19;
// DRAFT_HORSES = 20;
// LEVY_HILL_FORT_SOLDIERS = 21;
// BALLISTA = 22;
// ENGINEERS = 23;
// CONSCRIPT_HILL_FORT_SOLDIERS = 24;
// TEMPLE = 25;
// OMNISCIENCE = 26;
// DOCK = 27;
// FISHING_SHIP = 28;
// PURSE_SEINE = 29;
// TRANSPORT_SHIP = 30;
// LONGBOAT = 31;
// DREKI = 32;
// DRAGON_SHIP = 33;
// SALT_AMPHORA = 34;
// ENCLOSED_DECK = 35;
// HEROIC_FLEET = 36;
// HEAVY_WARSHIPS = 37;
// KRAKEN = 38;
// CONSCRIPT_SAILORS = 39;
// CHAMPION_WARSHIP = 40;
// JORMUN_ELVER = 41;

// LONGHOUSE = {id: 0, name: "LONGHOUSE"};
// BERSERK = {id: 1, name: "BERSERK"};
// // THROWING_AXEMEN = {id: 2, name: "THROWING_AXEMEN"};
// THROWING_AXEMEN = {id: 2, name: "THROWING_AXEMEN"};
// HIRDMAN = {id: 3, name: "HIRDMAN"};
// N_MEDIUM_INFANTRY_LH = {id: 4, name: "MEDIUM_INFANTRY"};
// LEVY_LONGHOUSE_SOLDIERS = {id: 5, name: "LEVY_LONGHOUSE_SOLDIERS"};
// N_HEAVY_INFANTRY_LH = {id: 6, name: "HEAVY_INFANTRY"};
// CONSCRIPT_LONGHOUSE_SOLDIERS = {id: 42, name: "CONSCRIPT_LONGHOUSE_SOLDIERS"}
// // CHAMPION_INFANTRY = {id: 7, name: "CHAMPION_INFANTRY"};
// N_CHAMPION_INFANTRY_LH = {id: 7, name: "CHAMPION_INFANTRY"};
// GREAT_HALL = {id: 8, name: "GREAT_HALL"};
// HERSIR = {id: 9, name: "HERSIR"};
// RAIDING_CAVALRY = {id: 10, name: "RAIDING_CAVALRY"};
// MEDIUM_CAVALRY = {id: 11, name: "MEDIUM_CAVALRY"};
// GODI = {id: 12, name: "GODI"};
// JARL = {id: 43, name: "JARL"};
// HEAVY_CAVALRY = {id: 13, name: "HEAVY_CAVALRY"};
// LEVY_GREAT_HALL_SOLDIERS = {id: 14, name: "LEVY_GREAT_HALL_SOLDIERS"};
// CHAMPION_CAVALRY = {id: 15, name: "CHAMPION_CAVALRY"};
// CONSCRIPT_GREAT_HALL_SOLDIERS = {id: 16, name: "CONSCRIPT_GREAT_HALL_SOLDIERS"};
// HILL_FORT = {id: 17, name: "HILL_FORT"};
// N_MEDIUM_INFANTRY_HF = {id: 44, name: "MEDIUM_INFANTRY"}; //4
// N_HEAVY_INFANTRY_HF = {id: 45, name: "HEAVY_INFANTRY"}; //6
// N_CHAMPION_INFANTRY_HF = {id: 46, name: "CHAMPION_INFANTRYY"}; //7
// HUSKARL = {id: 18, name: "HUSKARL"};
// PORTABLE_RAM = {id: 19, name: "PORTABLE_RAM"};
// DRAFT_HORSES = {id: 20, name: "DRAFT_HORSES"};
// LEVY_HILL_FORT_SOLDIERS = {id: 21, name: "LEVY_HILL_FORT_SOLDIERS"};
// BALLISTA = {id: 22, name: "BALLISTA"};
// ENGINEERS = {id: 23, name: "ENGINEERS"};
// CONSCRIPT_HILL_FORT_SOLDIERS = {id: 24, name: "CONSCRIPT_HILL_FORT_SOLDIERS"};
// TEMPLE = {id: 25, name: "TEMPLE"};
// OMNISCIENCE = {id: 26, name: "OMNISCIENCE"};
// DOCK = {id: 27, name: "DOCK"};
// FISHING_SHIP = {id: 28, name: "FISHING_SHIP"};
// PURSE_SEINE = {id: 29, name: "PURSE_SEINE"};
// TRANSPORT_SHIP = {id: 30, name: "TRANSPORT_SHIP"};
// LONGBOAT = {id: 31, name: "LONGBOAT"};
// DREKI = {id: 32, name: "DREKI"};
// DRAGON_SHIP = {id: 33, name: "DRAGON_SHIP"};
// SALT_AMPHORA = {id: 34, name: "SALT_AMPHORA"};
// ENCLOSED_DECK = {id: 35, name: "ENCLOSED_DECK"};
// HEROIC_FLEET = {id: 36, name: "HEROIC_FLEET"};
// HEAVY_WARSHIPS = {id: 37, name: "HEAVY_WARSHIPS"};
// KRAKEN = {id: 38, name: "KRAKEN"};
// CONSCRIPT_SAILORS = {id: 39, name: "CONSCRIPT_SAILORS"};
// CHAMPION_WARSHIP = {id: 40, name: "CHAMPION_WARSHIP"};
// JORMUN_ELVER = {id: 41, name: "JORMUN_ELVER"};

// test if it works
function formatName(originalname) {
    let name = originalname.toString().replace(/<br>/g, '\n').replace(/\n+/g, '\n');
    const items = name.split('\n');
    for (let i = 0; i < items.length; i++) {
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

class Tree {
    constructor() {
        this.offsets = {
            archaic_1_y: 0,
            archaic_2_y: 0,
            classical_1_y: 0, 
            classical_2_y: 0,
            heroic_1_y: 0,
            heroic_2_y: 0,
            heroic_3_y: 0,
            mythic_1_y: 0,
            mythic_2_y: 0,
        };
        this.height = Math.max(window.innerHeight, 100); // this.height = Math.max(window.innerHeight - 80, 100);
        this.width = 0;
        this.padding = 20;
        this.element_height = 0;
        this.lanes = [];
        this.offsets_x = 150; // 150 is starting offset from the left to accommodate age icons
    }

    // not sure if archaic_1 is correct of if it should be archaic_1_y
    updateOffsets() {
        this.element_height = this.height / 4 / 3;
        let element_offset = this.element_height / 2;

        // console.log('in updateOffsets - this.element_height: ', this.element_height, 'element_offset: ', element_offset);

        this.offsets.archaic_1 = this.padding;
        this.offsets.archaic_2 = this.offsets.archaic_1 + this.element_height + element_offset;
        this.offsets.classical_1 = this.offsets.archaic_2 + this.element_height + element_offset;
        this.offsets.classical_2 = this.offsets.classical_1 + this.element_height + element_offset;
        this.offsets.heroic_1 = this.offsets.classical_2 + this.element_height + element_offset;
        this.offsets.heroic_2 = this.offsets.heroic_1 + this.element_height + element_offset;
        this.offsets.heroic_3 = this.offsets.heroic_2 + this.element_height + element_offset;
        this.offsets.mythic_1 = this.offsets.heroic_3 + this.element_height + element_offset;
        this.offsets.mythic_2 = this.offsets.mythic_1 + this.element_height + element_offset;
    }

    updatePositions() {
        for (let lane of this.lanes) {
            lane.updatePositions(this.offsets, this.element_height);
        }

        let x = this.padding + this.offsets_x;
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].x = x;
            x = x + this.lanes[i].width + this.padding;
        }
        this.width = x;

        for (let lane of this.lanes) {
            // console.log('this.offsets: ', this.offsets , 'this.element_height: ', this.element_height);
            lane.updatePositions(this.offsets, this.element_height);
        }
    }
}

class Lane {
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
        this.padding = 10;
    }

    updatePositions(offsets, element_length) {
        let lane_width = 0;
        for (let r of Object.keys(this.rows)) {
            let x = this.x;
            let row_width = 0;
            for (let i = 0; i < this.rows[r].length; i++) {
                // console.log('this.rows[r][i].y before: ', this.rows[r][i].y);
                this.rows[r][i].y = offsets[r]; //maybe caret.y is set here
                // console.log('this.rows[r][i].y after: ', this.rows[r][i].y);
                this.rows[r][i].x = x;
                this.rows[r][i].width = element_length;
                this.rows[r][i].height = element_length;
                x = x + this.rows[r][i].width + this.padding;
                row_width = row_width + this.rows[r][i].width + this.padding;
            }
            lane_width = Math.max(lane_width, row_width);
        }
        this.width = lane_width;

        for (let r of Object.keys(this.rows)) {
            for (let i = 0; i < this.rows[r].length; i++) {
                if (this.rows[r][i].isBuilding()) {
                    this.rows[r][i].x = this.x + ((this.width - this.padding) / 2) - (this.rows[r][i].width / 2); //
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
            console.log('connection: ', connection,'from connection[0]: ', from, 'to connection[1]: ', to, 'to.x:', to.x);
            let allConnectionsForFrom = connections.filter(c => c[0] === from && carets.has(c[0]) && carets.has(c[1]));
            let allRelevantTos = allConnectionsForFrom.map(c => c[1]);
            if (carets.has(from) && carets.get(from).x < Math.min(allRelevantTos.map(to_ => carets.get(to_).x))) {
                carets.get(from).x = Math.min(allRelevantTos.map(to_ => carets.get(to_).x));
            }
            if (carets.has(from) && carets.get(from).x > Math.max(allRelevantTos.map(to_ => carets.get(to_).x))) {
                console.assert(allRelevantTos.length === 1, `Overlapping carets: ${allRelevantTos}`)
                allRelevantTos.forEach(to_ => carets.get(to_).x = carets.get(from).x);
            }
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

class Caret {
    constructor(type, name, id) {
        this.type = type;
        this.name = name;
        this.id = PREFIX[type.type] + formatId(id);
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
    }

    isBuilding() {
        return this.type === TYPES.BUILDING;
    }
}

function formatId(string) {
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
function getName(obj_name_id) { //(id, itemType)
    let nameFormatted = obj_name_id.name.toString().replace(/_/g, ' ');
    if (nameFormatted.length > 9) {
        let lastSpaceIndex = nameFormatted.lastIndexOf(' ');
        nameFormatted = `${nameFormatted.slice(0,lastSpaceIndex)}\n${nameFormatted.slice(lastSpaceIndex)}`;
    }
    // console.log('nameFormatted: ', nameFormatted);
    return nameFormatted;
}

function building(obj_name_id) { //(id)
    const caret = new Caret(TYPES.BUILDING, getName(obj_name_id, 'buildings'), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
    // return new Caret(TYPES.BUILDING, getName(obj_name_id, 'buildings'), obj_name_id.id);
}

function unit(obj_name_id) { //(id)
    console.log('unit called. obj_name_id: ', obj_name_id)
    // return new Caret(TYPES.UNIT, getName(obj_name_id, 'units'), obj_name_id.id);
    const caret = new Caret(TYPES.UNIT, getName(obj_name_id, 'units'), obj_name_id.id);
    console.log('caret: ', caret);
    return caret;
}

function tech(obj_name_id) { //(id)
    return new Caret(TYPES.TECHNOLOGY, getName(obj_name_id, 'units'), obj_name_id.id);
}

DUMMY_SLOT = null;

function getDefaultTree() {
    let tree = new Tree();
    tree.updateOffsets();

    let longhouseLane = new Lane();
    longhouseLane.rows.classical_1.push(building(LONGHOUSE));
    // console.log('longhouseLane after 1: ', longhouseLane);
    longhouseLane.rows.classical_2.push(tech(N_MEDIUM_INFANTRY_LH));
    longhouseLane.rows.classical_2.push(unit(BERSERK));
    longhouseLane.rows.classical_2.push(unit(THROWING_AXEMAN));
    longhouseLane.rows.classical_2.push(unit(HIRDMAN));
    longhouseLane.rows.heroic_1.push(tech(N_HEAVY_INFANTRY_LH));
    longhouseLane.rows.heroic_1.push(tech(LEVY_LONGHOUSE_SOLDIERS));
    longhouseLane.rows.mythic_1.push(tech(N_CHAMPION_INFANTRY_LH))
    longhouseLane.rows.mythic_1.push(tech(CONSCRIPT_LONGHOUSE_SOLDIERS))
    
    // console.log('longhouseLane: ', {longhouseLane});
    tree.lanes.push(longhouseLane);

    let greatHallLane = new Lane();
    greatHallLane.rows.classical_1.push(building(GREAT_HALL));
    greatHallLane.rows.classical_2.push(unit(HERSIR));
    greatHallLane.rows.classical_2.push(unit(RAIDING_CAVALRY));
    greatHallLane.rows.classical_2.push(tech(MEDIUM_CAVALRY));
    greatHallLane.rows.heroic_1.push(unit(GODI));
    greatHallLane.rows.heroic_1.push(unit(JARL));
    greatHallLane.rows.heroic_1.push(tech(HEAVY_CAVALRY));
    greatHallLane.rows.heroic_1.push(tech(LEVY_GREAT_HALL_SOLDIERS));
    greatHallLane.rows.mythic_1.push(tech(CHAMPION_CAVALRY));
    greatHallLane.rows.mythic_1.push(tech(CONSCRIPT_GREAT_HALL_SOLDIERS));
    tree.lanes.push(greatHallLane);

    let hillFortLane = new Lane();
    hillFortLane.rows.heroic_1.push(building(HILL_FORT));
    hillFortLane.rows.heroic_2.push(tech(N_MEDIUM_INFANTRY_HF));
    hillFortLane.rows.heroic_3.push(tech(N_HEAVY_INFANTRY_HF));
    hillFortLane.rows.heroic_2.push(unit(HUSKARL));
    hillFortLane.rows.heroic_2.push(unit(PORTABLE_RAM));
    hillFortLane.rows.heroic_2.push(tech(DRAFT_HORSES));
    hillFortLane.rows.heroic_2.push(tech(LEVY_HILL_FORT_SOLDIERS));
    hillFortLane.rows.mythic_1.push(tech(N_CHAMPION_INFANTRY_HF));
    hillFortLane.rows.mythic_1.push(tech(ENGINEERS));
    hillFortLane.rows.mythic_1.push(tech(CONSCRIPT_HILL_FORT_SOLDIERS));
    hillFortLane.rows.mythic_1.push(unit(BALLISTA));
    tree.lanes.push(hillFortLane);

    tree.updatePositions();

    // return longhouseLane;
    return tree;
}

function u(unit) {
    return 'unit_' + unit;
}

function b(building) {
    return 'building_' + building;
}

function t(tech) {
    return 'tech_' + tech;
}

function getConnections() {
    let connections = [
        [b(LONGHOUSE.id), u(BERSERK.id)],
        [b(LONGHOUSE.id), u(THROWING_AXEMAN.id)],
        [b(LONGHOUSE.id), u(HIRDMAN.id)],
        [b(LONGHOUSE.id), t(N_MEDIUM_INFANTRY_LH.id)],
        // [b(LONGHOUSE.id), t(LEVY_LONGHOUSE_SOLDIERS.id)],
        [b(LONGHOUSE.id), t(N_HEAVY_INFANTRY_LH.id)],
        [t(LEVY_LONGHOUSE_SOLDIERS.id), t(CONSCRIPT_LONGHOUSE_SOLDIERS.id)],
        [b(LONGHOUSE.id), t(N_CHAMPION_INFANTRY_LH.id)],
        [b(GREAT_HALL.id), u(HERSIR.id)],
        [b(GREAT_HALL.id), u(RAIDING_CAVALRY.id)],
        [b(GREAT_HALL.id), t(MEDIUM_CAVALRY.id)],  // MEDIUM_CAVALRY = {id: 11, name: "MEDIUM_CAVALRY"};
        [b(GREAT_HALL.id), u(GODI.id)],
        [b(GREAT_HALL.id), u(JARL.id)],
        [b(GREAT_HALL.id), t(HEAVY_CAVALRY.id)],
        [b(GREAT_HALL.id), t(LEVY_GREAT_HALL_SOLDIERS.id)],
        [t(HEAVY_CAVALRY.id), t(CHAMPION_CAVALRY.id)],
        [t(LEVY_GREAT_HALL_SOLDIERS.id), t(CONSCRIPT_GREAT_HALL_SOLDIERS.id)],
        [b(HILL_FORT.id), u(HUSKARL.id)],
        [b(HILL_FORT.id), u(PORTABLE_RAM.id)],
        [b(HILL_FORT.id), t(N_MEDIUM_INFANTRY_HF.id)],
        [b(HILL_FORT.id), t(DRAFT_HORSES.id)],
        [b(HILL_FORT.id), t(LEVY_HILL_FORT_SOLDIERS.id)],
        [t(N_MEDIUM_INFANTRY_HF.id), t(N_HEAVY_INFANTRY_HF.id)],
        [t(N_HEAVY_INFANTRY_HF.id), t(N_CHAMPION_INFANTRY_HF.id)],
        [b(HILL_FORT.id), t(ENGINEERS.id)],
        [t(LEVY_HILL_FORT_SOLDIERS.id), t(CONSCRIPT_HILL_FORT_SOLDIERS.id)],
        [b(HILL_FORT.id), u(BALLISTA.id)]

    ];

    let connections_ids = [];
    for (let c of connections) {
        connections_ids.push([formatId(c[0]), formatId(c[1])]);
    }
    return connections_ids;
}


function testCrossFileSharing(){
    console.log('cross file sharing successful');
}

function getConnectionPoints(tree) {
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