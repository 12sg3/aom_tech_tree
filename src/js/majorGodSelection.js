// let SELECTED_MAJOR_GOD_ID;
// if (SELECTED_MAJOR_GOD_ID === undefined) {
//     SELECTED_MAJOR_GOD_ID = ODIN.id
// }
import { getDefaultTree, getConnections, getConnectionPoints, CARET_TYPES, formatName, BONUS_MULTIPLIER_CLASSES, BONUS_MULTIPLIER_DISPLAY_STR, SELECTED_MAJOR_GOD_ID, Tree } from "./techtree.js";
import { getAgeNumber, displayData } from "./main.js";
import { displayDataMinorGods } from "./minorGodDetails.js";
import { addConnection } from "./addConnection.js";
import { addNewLaneToTree } from "./addNewLaneToTree.js";
import { Caret_SP } from "./addNewLaneToTreeSP.js";
import { updateMajorGodDisplayDetails } from "./majorGodDetails.js";
import { SVG } from "@svgdotjs/svg.js";
// import { SVG } from '../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js';
import { AMATERASU, TSUKUYOMI, SUSANOO, FUXI, NUWA, SHENNONG, ZEUS, HADES, POSEIDON, RA, ISIS, SET, THOR, ODIN, LOKI, FREYR, KRONOS, ORANOS, GAIA } from "./units.js";
let majorGodSelectionPanel = document.getElementById('major_god_selection_panel__fixed');
// let sidePanel = document.getElementById('side_panel');
let sidePanelMGS = document.getElementById('side_panel');
let rootEl = document.getElementById('root');
// majorGodSelectionPanel.style.height = rootEl.clientHeight + 'px';
// let sidePanel = document.getElementById('side_panel');
// sidePanelMajorGodDescription.style.height = sidePanel.clientHeight + 'px';
// majorGodSelectionPanel.style.height = sidePanelMGS.clientHeight + 'px';
majorGodSelectionPanel.style.height = '97.5%'; //'100%'
// majorGodSelectionPanel.style.height = '100vh'; //'100%'
console.log("IN MGS: sidePanel.clientHeight + 'px': ", sidePanelMGS.clientHeight + 'px');
console.log("IN MGS: sidePanel.offsetHeight + 'px': ", sidePanelMGS.offsetHeight + 'px');
console.log("IN MGS: majorGodSelectionPanel.clientHeight + 'px': ", majorGodSelectionPanel.clientHeight + 'px');
console.log("IN MGS: majorGodSelectionPanel.offsetHeight + 'px': ", majorGodSelectionPanel.offsetHeight + 'px');
console.log("IN MGS: majorGodSelectionPanel.style.height: ", majorGodSelectionPanel.style.height);
console.log("IN MGS: window.getComputedStyle(element).height: ", window.getComputedStyle(document.getElementById('side_panel__major_god_description')).height);
console.log('IN MGS: window.innerHeight: ', window.innerHeight);
console.log('IN MGS: document.body.clientHeight: ', document.body.clientHeight);
console.log('IN MGS: document.documentElement.clientHeight: ', document.documentElement.clientHeight);
console.log('IN MGS:document.body.scrollHeight: ', document.body.scrollHeight);
// majorGodSelectionPanel.style.width = '500px';
// sidePanel.style.height = rootEl.clientHeight + 'px';
// sidePanel.style.width = '100px';
const JAPANESE_MAJOR_GODS = ['AMATERASU', 'TSUKUYOMI', 'SUSANOO'];
const CHINESE_MAJOR_GODS = ['FUXI', 'NUWA', 'SHENNONG'];
const GREEK_MAJOR_GODS = ['ZEUS', 'HADES', 'POSEIDON'];
const EGYPTIAN_MAJOR_GODS = ['RA', 'ISIS', 'SET'];
const NORSE_MAJOR_GODS = ['THOR', 'ODIN', 'LOKI', 'FREYR'];
const ATLANTEAN_MAJOR_GODS = ['KRONOS', 'ORANOS', 'GAIA'];
export const mgSelection_X_OFFSET = 0;
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
export function setMajorGod(id) {
    let previousSelectedMajorGod = document.getElementsByClassName('is-highlight-mg-panel')[0];
    if (previousSelectedMajorGod) {
        previousSelectedMajorGod.classList.remove('is-highlight-mg-panel');
    }
    if (!id) {
        id = ODIN.id;
    }
    SELECTED_MAJOR_GOD_ID.id = id;
    updateMajorGodDisplayDetails();
    let selectedMajorGodPortraitG = document.getElementById(`major_god_${id}`);
    // console.log('selectedMajorGodPortraitG: ', selectedMajorGodPortraitG);
    selectedMajorGodPortraitG.classList.add('is-highlight-mg-panel');
}
function getDefaultMGTree() {
    console.log('getDefaultMgTree called!!');
    let treeMajorGods = new Tree();
    console.log('treeMajorGods.offsets: ', treeMajorGods.offsets);
    treeMajorGods.updateOffsets();
    treeMajorGods.offsets_x = mgSelection_X_OFFSET; // this works here but: treeMG.offsets_x = 0; does not in display data
    const majorGodLane = [
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
    console.log('displayDataMg called!!');
    // const root_MG = document.getElementById('root_MG');
    treeMG = getDefaultMGTree();
    const draw = SVG().addTo('#major_god_selection_panel__fixed').id('root_MG');
    const root_MG = document.getElementById('root_MG');
    // Norse (4 caret) is heroic_1
    for (let lane of treeMG.lanes) {
        // console.log('lane of treeMG.lanes, lane: ', lane);
        draw.rect(lane.width + 10, treeMG.height)
            .attr({ fill: '#ffeeaa', 'opacity': 0, class: lane.caretIds().map((id) => `lane-with-${id}`) })
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
                let norse_buffer_x;
                if (r === 'heroic_1') {
                    norse_buffer_x = 0;
                }
                else {
                    norse_buffer_x = caret.width / 2;
                }
                const item = draw.group().attr({ id: caret.id }).addClass('node').addClass('major_god_selector_button'); // maybe remove node class? 
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
                    .size(caret.width * 0.96, caret.height * 0.96) // 0.96
                    .attr({ id: caret.id + '_img' }) // caret: 69.420, pic 66.643, diff 2.777, diff / 2 = 1.3885
                    .move(caret.x + 1.3885 + norse_buffer_x, caret.y + 1.3885); // figure out if const(+1.3885 is fine or dynmaically computed const is needed)
                // .addEventListener('click', setMajorGod(caret.id));            
                // const overlaytrigger = item.rect(caret.width, caret.height)
                //     .attr({id: caret.id + '_overlay'})
                //     .addClass('node__overlay')
                //     .move(caret.x, caret.y)
                //     .data({'type': caret.type.type, 'caret': caret, 'name': caret.name, 'id': caret.id});
                // }
                const major_god_selection_buttons = document.getElementsByClassName('major_god_selector_button');
                for (let i = 0; i < major_god_selection_buttons.length; i++) {
                    // console.log('for mg-selection-buttons entered displayDataMg, i: ', i, 'major_god_selection_buttons:', major_god_selection_buttons);
                    major_god_selection_buttons[i].addEventListener('click', function () {
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
    console.log("GOD TEST!!!!!!!!!!!!!");
    console.log('treeMG: ', treeMG); // h: 801, width: 507.68
    // acutal -> h: 150, w: 300
    // root_MG.style.width = '377.8px'; // lane width: 327.680, svg width = 25 + 327.680 + 25 = **377.8** // try 327.680 + 20 //tree has 20 padding added to x
    document.getElementById('major_god_selection_panel__fixed').style.minWidth = '347.68px'; // 352.8px //'327.68px' a space will break this
    document.getElementById('major_god_selection_panel__fixed').style.width = '347.68px';
    console.log("document.getElementById('major_god_selection_panel__fixed').style.minWidth: ", document.getElementById('major_god_selection_panel__fixed').style.minWidth);
    // root_MG.style.height = '801px';
    root_MG.style.height = '100%';
    console.log(majorGodSelectionPanel);
    console.log('SELECTED_MAJOR_GOD_ID.id: ', SELECTED_MAJOR_GOD_ID.id);
}
// setTimeout(displayDataMg, 50);
displayDataMg();
//# sourceMappingURL=majorGodSelection.js.map