// let SELECTED_MAJOR_GOD_ID;
// if (SELECTED_MAJOR_GOD_ID === undefined) {
//     SELECTED_MAJOR_GOD_ID = ODIN.id
// }
import { getDefaultTree, getConnections, getConnectionPoints, CARET_TYPES, formatName, BONUS_MULTIPLIER_CLASSES, BONUS_MULTIPLIER_DISPLAY_STR, SELECTED_MAJOR_GOD_ID, Tree } from "./techtree.js";
import { getAgeNumber, displayData, BACKGROUND_AGE_RECT_OPACITY, BACKGROUND_AGE_RECT_FILLCOLOR, CARET_NAME_FONT_COLOR } from "./main.js";
import { displayDataMinorGods } from "./minorGodDetails.js";
import { addConnection } from "./addConnection.js";
import { addNewLaneToTree } from "./addNewLaneToTree.js";
import { Caret_SP } from "./addNewLaneToTreeSP.js";
import { updateMajorGodDisplayDetails } from "./majorGodDetails.js";
import { SVG } from "@svgdotjs/svg.js";
import { minorGodLaneMatrices } from "./minorGodLaneMatrices.js";
import jsonData from '../data.json' with { type: 'json' };
// import { SVG } from '../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js';
import { AMATERASU, TSUKUYOMI, SUSANOO, FUXI, NUWA, SHENNONG, ZEUS, HADES, POSEIDON, RA, ISIS, SET, THOR, ODIN, LOKI, FREYR, KRONOS, ORANOS, GAIA, HUITZILOPOCHTLI_major_god, TEZCATLIPOCA_major_god, QUETZALCOATL, DEMETER } from "./units.js";
let majorGodSelectionPanel = document.getElementById('major_god_selection_panel__sticky');
// let sidePanel = document.getElementById('side_panel');
let sidePanelMGS = document.getElementById('side_panel');
let rootEl = document.getElementById('root');
// majorGodSelectionPanel.style.height = rootEl.clientHeight + 'px';
// let sidePanel = document.getElementById('side_panel');
// sidePanelMajorGodDescription.style.height = sidePanel.clientHeight + 'px';
// majorGodSelectionPanel.style.height = sidePanelMGS.clientHeight + 'px';
// majorGodSelectionPanel.style.height = '100%'; //'100%' // change back to 100%?? // '97.5%'
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
setTimeout(() => {
    console.log('IN MGS setTimeout: document.documentElement.clientHeight: ', document.documentElement.clientHeight);
}, 1000);
// sidepanel height : 594px (34in uw)
// mg portrait height : 300px (34in uw)
// wrapper height: 609px, width: 967px (34in uw)
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
const PANTHEON_TITLES = {
    'archaic_1': 'AZTECS',
    'archaic_2': 'JAPANESE',
    'classical_1': 'CHINESE',
    'classical_2': 'GREEKS',
    'heroic_1': 'EGYPTIAN',
    'heroic_2': 'NORSE',
    'heroic_3': 'ATLANTEANS',
};
// const drawMG = SVG().addto('#major_god_selection_panel__sticky').id('root_MG').size(tree.width, tree.height)
//     .click((e) => {
//         // hideHelp();
//     })
// let = MAJOR_GOD_LANE = [
//     [AMATERASU, TSUKUYOMI, SUSANOO], // JAPANESE_MAJOR_GODS
//     [FUXI, NUWA, SHENNONG], // CHINESE_MAJOR_GODS
//     [ZEUS, HADES, POSEIDON], // GREEK_MAJOR_GODS
//     [RA, ISIS, SET], // EGYPTIAN_MAJOR_GODS
//     [THOR, ODIN, LOKI, FREYR], // NORSE_MAJOR_GODS
//     [KRONOS, ORANOS, GAIA], // ATLANTEAN_MAJOR_GODS
// ];
export function setMajorGod(id) {
    // findout why this is getting called multiple times onclick - seems like it might be called once for each caret rendered after the one clicked
    let previousSelectedMajorGod = document.getElementsByClassName('is-highlight-mg-panel')[0];
    if (previousSelectedMajorGod) {
        previousSelectedMajorGod.classList.remove('is-highlight-mg-panel');
    }
    if (!id) {
        id = ZEUS.id;
    }
    SELECTED_MAJOR_GOD_ID.id = id;
    if (jsonData[SELECTED_MAJOR_GOD_ID.id].Type !== 'major_god') {
        SELECTED_MAJOR_GOD_ID.id = ZEUS.id;
    }
    updateMajorGodDisplayDetails();
    // major_god_1045_bg
    // let selectedMajorGodPortraitG = document.getElementById(`major_god_${id}`);
    let selectedMajorGodPortraitG = document.getElementById(`major_god_${id}_bg`);
    // console.log('selectedMajorGodPortraitG: ', selectedMajorGodPortraitG);
    selectedMajorGodPortraitG.classList.add('is-highlight-mg-panel');
    localStorage.setItem("SELECTED_MAJOR_GOD_ID", JSON.stringify(SELECTED_MAJOR_GOD_ID.id));
    // selectedMajorGodPortraitG.stroke({ color: '#000', width: 5 })
}
let TREE_HEIGHT_SIZE_FACTOR = 0.1;
let pantheonTitlesFontSize = 14;
let pantheonTitleMoveAmount = 20; // 
const windowHeight = window.innerHeight;
console.log('J!J windowHeight: ', windowHeight);
switch (true) {
    case windowHeight > 500 && windowHeight < 600:
        TREE_HEIGHT_SIZE_FACTOR = 0.1;
        break;
    case windowHeight > 500 && windowHeight < 550:
        TREE_HEIGHT_SIZE_FACTOR = 1.125;
        break;
    case windowHeight > 450 && windowHeight < 500:
        TREE_HEIGHT_SIZE_FACTOR = 0.15;
        break;
    case windowHeight > 375 && windowHeight < 450:
        TREE_HEIGHT_SIZE_FACTOR = 0.175;
        pantheonTitleMoveAmount = 17;
        break;
    case windowHeight > 325 && windowHeight < 375:
        TREE_HEIGHT_SIZE_FACTOR = 0.2;
        pantheonTitleMoveAmount = 15;
        break;
    case windowHeight < 325:
        TREE_HEIGHT_SIZE_FACTOR = 0.35;
        pantheonTitlesFontSize = 10;
        pantheonTitleMoveAmount = 15;
        break;
    default:
        TREE_HEIGHT_SIZE_FACTOR = 0.02; // for 600 > windowHeight
        pantheonTitlesFontSize = 14;
        pantheonTitleMoveAmount = 20;
}
function getDefaultMGTree() {
    console.log('getDefaultMgTree called!!');
    let treeMajorGods = new Tree();
    console.log('J!J before treeMG.height: ', treeMajorGods.height);
    console.log('J!J TREE_HEIGHT_SIZE_FACTOR :', TREE_HEIGHT_SIZE_FACTOR);
    treeMajorGods.height = Math.max(window.innerHeight - (window.innerHeight * TREE_HEIGHT_SIZE_FACTOR), 100);
    console.log('J!J after treeMG.height: ', treeMajorGods.height);
    console.log('!!@ before treeMajorGods.offsets_y: ', treeMajorGods.offsets_y);
    treeMajorGods.extra_y_offset = 15;
    treeMajorGods.updateOffsets();
    treeMajorGods.offsets_y.archaic_1 += 5; // to offset the -10 hardcoded into the updateoffset method
    treeMajorGods.updatePositions();
    console.log('!!@ after treeMajorGods.offsets_y: ', treeMajorGods.offsets_y);
    treeMajorGods.offset_x = mgSelection_X_OFFSET; // this works here but: treeMG.offset_x = 0; does not in display data
    const MAJOR_GOD_LANE = [
        [HUITZILOPOCHTLI_major_god, TEZCATLIPOCA_major_god, QUETZALCOATL], // Aztec_stand-in
        [AMATERASU, TSUKUYOMI, SUSANOO], // JAPANESE_MAJOR_GODS
        [FUXI, NUWA, SHENNONG], // CHINESE_MAJOR_GODS
        [ZEUS, HADES, POSEIDON, DEMETER], // GREEK_MAJOR_GODS - 2nd Zeus is Demter stand-in
        [RA, ISIS, SET], // EGYPTIAN_MAJOR_GODS
        [THOR, ODIN, LOKI, FREYR], // NORSE_MAJOR_GODS
        [KRONOS, ORANOS, GAIA], // ATLANTEAN_MAJOR_GODS
    ];
    addNewLaneToTree(treeMajorGods, MAJOR_GOD_LANE);
    treeMajorGods.updatePositions();
    console.log('treeMajorGods: ', treeMajorGods);
    return treeMajorGods;
}
function displayDataMg() {
    console.log('displayDataMg called!!');
    // const root_MG = document.getElementById('root_MG');
    treeMG = getDefaultMGTree();
    // console.log('J!J before treeMG.height: ', treeMG.height);
    // treeMG.height = Math.max(window.innerHeight - (window.innerHeight * 0.2), 100);
    // console.log('J!J after treeMG.height: ', treeMG.height);
    //  const draw = SVG().addTo('#major_god_selection_panel__sticky__inner').id('root_MG').attr({fill: BACKGROUND_AGE_RECT_FILLCOLOR ,opacity: 1}); // major_god_selection_panel__sticky__inner
    const draw = SVG().addTo('#major_god_selection_panel__sticky__inner').id('root_MG'); // major_god_selection_panel__sticky__inner
    const root_MG = document.getElementById('root_MG');
    // Norse (4 caret) is heroic_1
    for (let lane of treeMG.lanes) {
        console.log('!!@ lane.width: ', lane.width, 'lane.getPaddingLane(): ', lane.getPaddingLane());
        draw.rect(lane.width + 10, treeMG.height * 1.0702) // 363/339.187 = 1.0702
            .attr({ fill: '#ffeeaa', 'opacity': 0, class: lane.caretIds().map((id) => `lane-with-${id}`) })
            .move(lane.x - 10, lane.y);
        // .click(hideHelp);
        for (let r of Object.keys(lane.rows)) {
            console.log('!@r: ', r);
            console.log('!@r typeof r:', typeof r);
            console.log('!@r PANTHEON_TITLES[r]:', PANTHEON_TITLES[r]);
            if (PANTHEON_TITLES[r]) {
                const pantheonTitleGroup = draw.group();
                pantheonTitleGroup.text(PANTHEON_TITLES[r])
                    .move((lane.width + lane.getPaddingLane()) / 2, treeMG.offsets_y[r] - pantheonTitleMoveAmount) // figure out how to cale ypos - 20(20 should be a var)
                    .attr('text-anchor', 'middle')
                    .font({ size: pantheonTitlesFontSize, weight: 'bold' })
                    .attr({ fill: CARET_NAME_FONT_COLOR, opacity: 0.95 }); // size: 12
            }
            let row = lane.rows[r];
            const ageNumber = getAgeNumber(r);
            for (let caret of row) {
                let fourth_cartet_buffer_x;
                if (r === 'classical_2' || r === 'heroic_2') {
                    fourth_cartet_buffer_x = 0;
                }
                else {
                    fourth_cartet_buffer_x = caret.width / 2;
                }
                const item = draw.group().attr({ id: caret.id }).addClass('node').addClass('major_god_selector_button'); // maybe remove node class? 
                console.log('caret.width: ', caret.width, 'caret.height: ', caret.height);
                // const rect = item.rect(caret.width, caret.height).attr({
                //     fill: caret.type.colour || caret.type.colour,
                //     id: `${caret.id}_bg`
                // }).move(caret.x + fourth_cartet_buffer_x, caret.y);
                const rect = item.rect(caret.width, caret.height).attr({
                    fill: 'none',
                    stroke: caret.type.colour,
                    'stroke-width': 3.5,
                    id: `${caret.id}_bg`
                }).move(caret.x + fourth_cartet_buffer_x, caret.y);
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
                    .size(caret.width, caret.height) // * 0.96, * 0.96
                    .attr({ id: caret.id + '_img' }) // caret: 69.420, pic 66.643, diff 2.777, diff / 2 = 1.3885
                    .move(caret.x + fourth_cartet_buffer_x, caret.y); // + 1.3885  // older - figure out if const(+1.3885 is fine or dynmaically computed const is needed)  
                // let imgEl = document.getElementById(`major_god_${caret.id}_img`);
                // imgEl.setAttribute("stroke", "#e74c3c");
                // imgEl.setAttribute("stroke-width", "5");
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
    //  this.offset_x
    treeMG.offset_x = 0;
    console.log("GOD TEST!!!!!!!!!!!!!");
    console.log('treeMG: ', treeMG); // h: 801, width: 507.68
    // acutal -> h: 150, w: 300
    // root_MG.style.width = '377.8px'; // lane width: 327.680, svg width = 25 + 327.680 + 25 = **377.8** // try 327.680 + 20 //tree has 20 padding added to x
    // document.getElementById('major_god_selection_panel__sticky').style.minWidth = '347.68px'; // 352.8px //'327.68px' a space will break this
    // document.getElementById('major_god_selection_panel__sticky').style.width = '347.68px';
    console.log("document.getElementById('major_god_selection_panel__sticky').style.minWidth: ", document.getElementById('major_god_selection_panel__sticky').style.minWidth);
    // root_MG.style.height = '801px';
    root_MG.style.height = '100%';
    root_MG.style.width = treeMG.width;
    console.log(majorGodSelectionPanel);
    console.log('SELECTED_MAJOR_GOD_ID.id: ', SELECTED_MAJOR_GOD_ID.id);
    console.log('treeMG.width: ', treeMG.width);
    majorGodSelectionPanel.style.width = treeMG.width + 'px';
    console.log('TTT treeMG.width: ', treeMG.width);
    console.log('TTT majorGodSelectionPanel.style.width: ', majorGodSelectionPanel.style.width);
    console.log('TTT MajorGod Tree - treeMG.offsets_y: ', treeMG.offsets_y);
    const creditsTextGroup = draw.group();
    const creditsText = `
Version: Age of Empires II DE Update 177723 | » Chronicles | » RoR

A project by Siege Engineers. Contribute on GitHub. Donate to support this project.

Made by hszemi, Anda, exterkamp, paulirish, lalitpatel, with thanks to Jineapple, TriRem, pip, and NkoDragaš

Item Metadata (cost, HP etc.) extracted with genieutils-py

Age of Empires II © Microsoft Corporation.
aoe2techtree was created under Microsoft's "Game Content Usage Rules" using assets from Age of Empires II, and it is not endorsed by or affiliated with Microsoft.
`;
    //    creditsTextGroup.text(creditsText);
    // .move()
}
// setTimeout(displayDataMg, 50);
displayDataMg();
//# sourceMappingURL=majorGodSelection.js.map