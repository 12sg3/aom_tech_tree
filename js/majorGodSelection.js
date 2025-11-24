// let SELECTED_MAJOR_GOD_ID;

// if (SELECTED_MAJOR_GOD_ID === undefined) {
//     SELECTED_MAJOR_GOD_ID = ODIN.id
// }

let majorGodSelectionPanel = document.getElementById('major_god_selection_panel__fixed');
// let sidePanel = document.getElementById('side_panel');
let sidePanelMGS = document.getElementById('side_panel');


let rootEl = document.getElementById('root');

// majorGodSelectionPanel.style.height = rootEl.clientHeight + 'px';
// let sidePanel = document.getElementById('side_panel');
// sidePanelMajorGodDescription.style.height = sidePanel.clientHeight + 'px';
// majorGodSelectionPanel.style.height = sidePanelMGS.clientHeight + 'px';
majorGodSelectionPanel.style.height = '97.5%'; //'100%'
console.log("IN MGS: sidePanel.clientHeight + 'px': ", sidePanelMGS.clientHeight + 'px');
console.log("IN MGS: sidePanel.offsetHeight + 'px': ", sidePanelMGS.offsetHeight + 'px');
console.log("IN MGS: majorGodSelectionPanel.clientHeight + 'px': ", majorGodSelectionPanel.clientHeight + 'px');
console.log("IN MGS: majorGodSelectionPanel.offsetHeight + 'px': ", majorGodSelectionPanel.offsetHeight + 'px');
console.log("IN MGS: majorGodSelectionPanel.style.height: ", majorGodSelectionPanel.style.height);
console.log("IN MGS: window.getComputedStyle(element).height: ", window.getComputedStyle(document.getElementById('side_panel__major_god_description')).height);
console.log('window.innerHeight: ', window.innerHeight);
console.log('document.body.clientHeight: ', document.body.clientHeight);
console.log('document.documentElement.clientHeight: ', document.documentElement.clientHeight);

console.log('document.body.scrollHeight: ', document.body.scrollHeight);
// majorGodSelectionPanel.style.width = '500px';
// sidePanel.style.height = rootEl.clientHeight + 'px';
// sidePanel.style.width = '100px';

// AMATERASU = {id: 752, name: 'AMATERASU', type: 'major_god'};
// FREYR = {id: 753, name: 'FREYR', type: 'major_god'};
// FUXI = {id: 754, name: 'FUXI', type: 'major_god'};
// GAIA = {id: 755, name: 'GAIA', type: 'major_god'};
// HADES = {id: 756, name: 'HADES', type: 'major_god'};
// ISIS = {id: 757, name: 'ISIS', type: 'major_god'};
// KRONOS = {id: 758, name: 'KRONOS', type: 'major_god'};
// LOKI = {id: 759, name: 'LOKI', type: 'major_god'};
// NUWA = {id: 760, name: 'NUWA', type: 'major_god'};
// ODIN = {id: 761, name: 'ODIN', type: 'major_god'};
// ORANOS = {id: 762, name: 'ORANOS', type: 'major_god'};
// POSEIDON = {id: 763, name: 'POSEIDON', type: 'major_god'};
// RA = {id: 764, name: 'RA', type: 'major_god'};
// SHENNONG = {id: 765, name: 'SHENNONG', type: 'major_god'};
// SUSANOO = {id: 766, name: 'SUSANOO', type: 'major_god'};
// THOR = {id: 767, name: 'THOR', type: 'major_god'};
// TSUKUYOMI = {id: 768, name: 'TSUKUYOMI', type: 'major_god'};
// ZEUS = {id: 769, name: 'ZEUS', type: 'major_god'};
// SET = {id: 770, name: 'SET', type: 'major_god'};



const JAPANESE_MAJOR_GODS = ['AMATERASU', 'TSUKUYOMI', 'SUSANOO'];
const CHINESE_MAJOR_GODS = ['FUXI', 'NUWA', 'SHENNONG'];
const GREEK_MAJOR_GODS = ['ZEUS', 'HADES', 'POSEIDON'];
const EGYPTIAN_MAJOR_GODS = ['RA', 'ISIS', 'SET'];
const NORSE_MAJOR_GODS = ['THOR', 'ODIN', 'LOKI', 'FREYR'];
const ATLANTEAN_MAJOR_GODS = ['KRONOS', 'ORANOS', 'GAIA'];

const mgSelection_X_OFFSET = 0;

let treeMG;

// const drawMG = SVG().addto('#major_god_selection_panel__fixed').id('root_MG').size(tree.width, tree.height)
//     .click((e) => {
//         // hideHelp();
//     })

// let = majorGodLane = [
//     [AMATERASU, TSUKUYOMI, SUSANOO], // JAPANESE_MAJOR_GODS
//     [FUXI, NUWA, SHENNONG], // CHINESE_MAJOR_GODS
//     [ZEUS, HADES, POSEIDON], // GREEK_MAJOR_GODS
//     [RA, ISIS, SET], // EGYPTIAN_MAJOR_GODS
//     [THOR, ODIN, LOKI, FREYR], // NORSE_MAJOR_GODS
//     [KRONOS, ORANOS, GAIA], // ATLANTEAN_MAJOR_GODS
// ];

function setMajorGod(id) {
    SELECTED_MAJOR_GOD_ID = id;
    console.log('changed, SELECTED_MAJOR_GOD_ID: ', SELECTED_MAJOR_GOD_ID)
    updateMajorGodDisplayDetails();

}

// function updateMajorGodDisplayDetails(){

// }

function getDefaultMGTree() {
    let treeMajorGods = new Tree();
    console.log('treeMajorGods.offsets: ', treeMajorGods.offsets);
    treeMajorGods.updateOffsets();
    treeMajorGods.offsets_x = mgSelection_X_OFFSET; // this works here but: treeMG.offsets_x = 0; does not in display data

    let = majorGodLane = [
        [AMATERASU, TSUKUYOMI, SUSANOO], // JAPANESE_MAJOR_GODS
        [FUXI, NUWA, SHENNONG], // CHINESE_MAJOR_GODS
        [ZEUS, HADES, POSEIDON], // GREEK_MAJOR_GODS
        [RA, ISIS, SET], // EGYPTIAN_MAJOR_GODS
        [THOR, ODIN, LOKI, FREYR], // NORSE_MAJOR_GODS
        [KRONOS, ORANOS, GAIA], // ATLANTEAN_MAJOR_GODS
    ];

    addNewLaneToTree(treeMajorGods, majorGodLane);

    treeMajorGods.updatePositions();
    console.log('treeMajorGods: ', treeMajorGods);

    return treeMajorGods;
}

function displayDataMg() {
    const root_MG = document.getElementById('root_MG');
    treeMG = getDefaultMGTree();
    
    const draw = SVG().addTo('#major_god_selection_panel__fixed').id('root_MG');

    // Norse (4 caret) is heroic_1

    for (let lane of treeMG.lanes) {
        // console.log('lane of treeMG.lanes, lane: ', lane);
        draw.rect(lane.width + 10, treeMG.height)
            .attr({fill: '#ffeeaa', 'opacity': 0, class: lane.caretIds().map((id) => `lane-with-${id}`)})
            .move(lane.x - 10, lane.y);
            // .click(hideHelp);
        for (let r of Object.keys(lane.rows)) {
            // if (r === 'heroic_1') {
            //     const norse_buffer_x = 0;
            // } else {
            //     const norse_buffer_x = caret.width /2 ;
            // }
            let row = lane.rows[r];
            const ageNumber = getAgeNumber(r);
            for (let caret of row) {
                // if (caret.type === TYPES.BLANK) {
                //     const item = draw.group().attr({id: caret.id}).addClass('blank-anti-node');
                //     const rect = item.rect(caret.width, caret.height).attr({
                //         fill: caret.type.colour,
                //         opacity: caret.type.opacity,
                //         id: caret.id,
                //     }).move(caret.x, caret.y);
                // } else {
                let norse_buffer_x
                if (r === 'heroic_1') {
                    norse_buffer_x = 0;
                } else {
                    norse_buffer_x = caret.width /2;
                }
                const item = draw.group().attr({id: caret.id}).addClass('node').addClass('major_god_selector_button'); // maybe remove node class? 
                console.log('caret.width: ', caret.width, 'caret.height: ', caret.height);
                const rect = item.rect(caret.width, caret.height).attr({
                    fill: caret.type.colour || caret.type.colour,
                    id: `${caret.id}_bg`
                }).move(caret.x + norse_buffer_x, caret.y);
                // ADD TOGGLE FEATRUE to change between name display vs icon
                // let name = formatName(caret.name);
                // let name = caret.name;
                // console.log('name.toString(): ', name.toString(), typeof(name.toString()));
                // console.log("name.toString().replace(/_/g, ' '): ", name.toString().replace(/_/g, ' '), typeof(name.toString()));
                // const text = item.text(name.toString().replace(/_/g, ' '))
                // console.log('name: ', name);
                // const text = item.text(name.toString())
                //     .font({size: 9, weight: 'bold'}) // size: 12
                //     .attr({fill: '#000000', opacity: 0.95, 'text-anchor': 'middle', id: caret.id + '_text'})
                //     .cx(caret.x + caret.width / 2 + 25) //+25 //1.1*caret.x, + 25 added miht be better way to do this
                //     .y(caret.y + caret.height / 1.5);
                // const image_placeholder = item.rect(caret.width * 0.6, caret.height * 0.6)
                //     .attr({fill: '#ffffff', opacity: 0.5, id: caret.id + '_imgph'}) // '#000000'
                //     .move(caret.x + caret.width * 0.2, caret.y);
                const prefix = 'img/';
                const image = item.image(prefix + imagePrefix(caret.id) + '.webp') /*.png */
                    .size(caret.width * 0.96, caret.height * 0.96) //0.6
                    .attr({id: caret.id + '_img'}) // caret: 69.420, pic 66.643, diff 2.777, diff / 2 = 1.3885
                    .move(caret.x + 1.3885 + norse_buffer_x, caret.y + 1.3885); // figure out if const(+1.3885 is fine or dynmaically computed const is needed)
                    // .addEventListener('click', setMajorGod(caret.id));            
                
                // const overlaytrigger = item.rect(caret.width, caret.height)
                //     .attr({id: caret.id + '_overlay'})
                //     .addClass('node__overlay')
                //     .move(caret.x, caret.y)
                //     .data({'type': caret.type.type, 'caret': caret, 'name': caret.name, 'id': caret.id});
                                        
            // }

             const major_god_selection_buttons = document.getElementsByClassName('major_god_selector_button');

             for(let i = 0; i < major_god_selection_buttons.length; i++) {
                major_god_selection_buttons[i].addEventListener('click', function(){
                    setMajorGod(major_god_selection_buttons[i].id.replace('major_god_', ''));
                    displayDataMinorGods();
                    displayData(); // sets tech-tree
                });
                
                console.log('add event listener added!!!');
            }
                
            }
        }
    }

    function imagePrefix(name) {
        return name.replace('_copy', '')
            .replace('building_', 'Buildings/')
            .replace('unit_', 'Units/')
            .replace('tech_', 'Techs/')
            .replace('major_god_', 'major_gods/');
    }
    //  this.offsets_x
    treeMG.offsets_x = 0;
}

displayDataMg();





console.log("GOD TEST!!!!!!!!!!!!!");
console.log('treeMG: ', treeMG); // h: 801, width: 507.68
                                // acutal -> h: 150, w: 300

root_MG.style.width = '377.8px'; // lane width: 327.680, svg width = 25 + 327.680 + 25 = **377.8** // try 327.680 + 20 //tree has 20 padding added to x
document.getElementById('major_god_selection_panel__fixed').style.minWidth = '347.68px'; // 352.8px //'327.68px' a space will break this
document.getElementById('major_god_selection_panel__fixed').style.width = '347.68px';
console.log("document.getElementById('major_god_selection_panel__fixed').style.minWidth: ", document.getElementById('major_god_selection_panel__fixed').style.minWidth);
// root_MG.style.height = '801px';
root_MG.style.height = '100%';

console.log(majorGodSelectionPanel)

console.log('SELECTED_MAJOR_GOD_ID: ', SELECTED_MAJOR_GOD_ID);