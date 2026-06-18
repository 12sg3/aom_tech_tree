import { getDefaultTree, getConnections, getConnectionPoints, CARET_TYPES, formatName, BONUS_MULTIPLIER_CLASSES, BONUS_MULTIPLIER_DISPLAY_STR, SELECTED_MAJOR_GOD_ID, Tree, } from "./techtree.js";
import { minorGodLaneMatrices } from "./minorGodLaneMatrices.js";

import { addNewLaneToTreeSP } from "./addNewLaneToTreeSP.js";
// import { SVG } from "@svgdotjs/svg.js";
// import { SVG } from '../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js';
import { SVG } from '@svgdotjs/svg.js';
import { getAgeNumber, focusedNodeId, parentConnections } from "./main.js";

import jsonData from '../data.json' with { type: 'json' };
console.log('jsonData: ', jsonData);

const minorGodLaneMatrix2 = minorGodLaneMatrices[jsonData[SELECTED_MAJOR_GOD_ID.id].Name];
console.log('@#@ minorGodLaneMatrix2: ', minorGodLaneMatrix2);

const minorGodLaneMatrix3 = minorGodLaneMatrices[jsonData[965].Name];
console.log('@#@ minorGodLaneMatrix3: ', minorGodLaneMatrix3);

// for (let i =0; i < minorGodLaneMatrix3.length; i++) {
//     for(let j = 0; j < minorGodLaneMatrix3[i].length; j++) {
//        console.log('@#@: ', minorGodLaneMatrix3[i][j]);
//     }
// }




let treeMinorGods;
const MINOR_GOD_CARET_SIZE_RATIO = 1.25; 

function getDefaultTreeMinorGods() {
    console.log('getDefaultTreeMinorGods called!!');
    let treeMinorGods = new Tree();
    // treeMinorGods.extra_y_offset = 0; // 5
    console.log('@@! Before - treeMinorGods.offsets_y: ', treeMinorGods.offsets_y);
    treeMinorGods.extra_y_offset_2 = 10;
    treeMinorGods.updateOffsets();
    treeMinorGods.updatePositions();
    console.log('@@! After - treeMinorGods.offsets_y: ', treeMinorGods.offsets_y);
    treeMinorGods.offset_x = 0; // this works here but: treeMG.offset_x = 0; does not in display data
    

    console.log('jsonData[SELECTED_MAJOR_GOD_ID.id]: ', jsonData[SELECTED_MAJOR_GOD_ID.id]);
    console.log('SELECTED_MAJOR_GOD_ID: ', SELECTED_MAJOR_GOD_ID);
    const minorGodLaneMatrix = minorGodLaneMatrices[jsonData[SELECTED_MAJOR_GOD_ID.id].Name];
    // console.log('jsonData[SELECTED_MAJOR_GOD_ID].Name: ', jsonData[SELECTED_MAJOR_GOD_ID].Name);
    // console.log('minorGodLaneMatrix: ', minorGodLaneMatrix);
    // console.log('minorGodLaneMatrices: ', minorGodLaneMatrices);
    
    // addNewLaneToTree(treeMinorGods, minorGodLaneMatrix);
    addNewLaneToTreeSP(treeMinorGods, minorGodLaneMatrix);
    // console.log('minorGodLaneMatrix: ', minorGodLaneMatrix);
    // console.table(minorGodLaneMatrix);
    // console.log('treeMinorGods after addNewLaneToTreeSP: ', treeMinorGods);
    treeMinorGods.updatePositions();
    // console.log('treeMinorGods: ', treeMinorGods);

    return treeMinorGods;
}

let root_minor_gods = document.getElementById('root_minor-gods');

export function displayDataMinorGods() {
    console.log('displayDataMinorGods called!!');
    treeMinorGods = getDefaultTreeMinorGods();
    // const root_minor_gods = document.getElementById('root_minor-gods');

    if (root_minor_gods) {
        document.getElementById('side_panel__minor_gods__details').removeChild(root_minor_gods);
    }
    
    const draw = SVG().addTo('#side_panel__minor_gods__details').id('root_minor-gods');

    // Norse (4 caret) is heroic_1

    for (let lane of treeMinorGods.lanes) {
        console.log('!Q! lane of treeMG.lanes, lane: ', lane);
        draw.rect(lane.width + 10, treeMinorGods.height)
            .attr({fill: '#ffeeaa', 'opacity': 0, class: lane.caretIds().map((id) => `lane-with-${id}`)})
            .move(lane.x - 10, lane.y)
            .click(hideHelp_SP);
        // console.log('Calling hideHelp_SP:', hideHelp_SP());
        let ageSeperationPaddingY = 0;
        // treeMinorGods.extra_y_offset_2 = 25;
        for (let r of Object.keys(lane.rows)) {
            // if (r === 'classical_1' || r === 'heroic_1' || r === 'heroic_3') {
            //     treeMinorGods.extra_y_offset_2 = 10; //10
            // } else {
            //     treeMinorGods.extra_y_offset_2 = 0;
            // }
            console.log('!Q! r of lanes.rows, lane: ', r);
            let row = lane.rows[r];
            // console.log('!Q! row: ', row);
            const ageNumber = getAgeNumber(r);
            let previousCaretIsMinorGod = false;
            for (let caret of row) {
                if (caret.type.type === 'MINOR_GOD') {
                    if (r === 'classical_2' || r === 'heroic_2' || r === 'mythic_1' ) {
                        //Still need to fix this
                        console.log('!Q!: if entered r: ',  r);
                        ageSeperationPaddingY = caret.height * MINOR_GOD_CARET_SIZE_RATIO * 0.1;
                    }
                    const item = draw.group().attr({id: caret.id}).addClass('node');
                    // const rect = item.rect(caret.width * MINOR_GOD_CARET_SIZE_RATIO, caret.height * MINOR_GOD_CARET_SIZE_RATIO).attr({
                    //     fill: caret.type.colour || caret.type.colour,
                    //     id: `${caret.id}_bg`
                    // }).move(caret.x, caret.y + ageSeperationPaddingY);
                    const rect = item.rect(caret.width * MINOR_GOD_CARET_SIZE_RATIO, caret.height * MINOR_GOD_CARET_SIZE_RATIO).attr({
                        fill: 'none',
                        stroke: caret.type.colour,
                        'stroke-width': 1.5,
                        id: `${caret.id}_bg`
                    }).move(caret.x, caret.y + ageSeperationPaddingY);
                    // ***ADD TOGGLE FEATRUE to change between name display vs icon***
                    const prefix = 'img/';
                    const image = item.image(prefix + imagePrefix(caret.id.replace('_SP', '')) + '.webp') /*.png */
                        .size(caret.width * MINOR_GOD_CARET_SIZE_RATIO, caret.height * MINOR_GOD_CARET_SIZE_RATIO) //0.6
                        .attr({id: caret.id + '_img'}) // caret: 69.420, pic 66.643, diff 2.777, diff / 2 = 1.3885
                        .move(caret.x, caret.y + ageSeperationPaddingY); // figure out if const(+1.3885 is fine or dynmaically computed const is needed)
                    
                    const overlaytrigger = item.rect(caret.width * MINOR_GOD_CARET_SIZE_RATIO, caret.height * MINOR_GOD_CARET_SIZE_RATIO)
                        .attr({id: caret.id + '_overlay'})
                        .addClass('node__overlay')
                        .move(caret.x, caret.y + ageSeperationPaddingY)
                        .data({'type': caret.type.type, 'caret': caret, 'name': caret.name, 'id': caret.id})
                        .mouseover(function () {
                            // console.log('**MouseOver called - minor god details!!!')
                            highlightPath_SP(caret.id);
                        })
                        .mouseout(function () {
                            resetHighlightPath_SP();
                        })
                        .click(function () {
                            if (focusedNodeId.id === caret.id) {
                                hideHelp_SP();
                            } else {
                                displayHelp_SP(caret.id);
                            }
                        });
                        previousCaretIsMinorGod = true                     
                } else {
                    const item = draw.group().attr({id: caret.id}).addClass('node');
                    // console.log('caret.width: ', caret.width, 'caret.height: ', caret.height);
                    // console.log('MGD caret: ', caret, 'caret.x: ', caret.x);
                    let extraXPaddingForMinorGodX = 10;
                    let yPaddingToCenterOnMinorGodCaret = (caret.height * 0.96) * (MINOR_GOD_CARET_SIZE_RATIO - 1) / 2;  
                    console.log('^^ yPaddingToCenterOnMinorGodCaret: ', yPaddingToCenterOnMinorGodCaret);
                    console.log('^^ caret.y: ', caret.y);
                    // if (previousCaretIsMinorGod) {
                    //     extraXPaddingForMinorGodX = 15;
                    // }
                    // const rect = item.rect(caret.width, caret.height).attr({
                    //     fill: caret.type.colour || caret.type.colour,
                    //     id: `${caret.id}_bg`
                    // }).move(caret.x + extraXPaddingForMinorGodX, caret.y + yPaddingToCenterOnMinorGodCaret + ageSeperationPaddingY);
                    
                    const rect = item.rect(caret.width, caret.height).attr({
                        fill: 'none',
                        stroke: caret.type.colour,
                        'stroke-width': 5,
                        id: `${caret.id}_bg`
                    }).move(caret.x + extraXPaddingForMinorGodX, caret.y + yPaddingToCenterOnMinorGodCaret + ageSeperationPaddingY);
                    // ***ADD TOGGLE FEATRUE to change between name display vs icon***
                    const prefix = 'img/';
                    const image = item.image(prefix + imagePrefix(caret.id.replace('_SP', '')) + '.webp') /*.png */
                        .size(caret.width, caret.height) //0.6
                        .attr({id: caret.id + '_img'}) // caret: 69.420, pic 66.643, diff 2.777, diff / 2 = 1.3885
                        .move(caret.x + extraXPaddingForMinorGodX, caret.y + yPaddingToCenterOnMinorGodCaret + ageSeperationPaddingY); // figure out if const(+1.3885 is fine or dynmaically computed const is needed)
                    
                    const overlaytrigger = item.rect(caret.width, caret.height)
                        .attr({id: caret.id + '_overlay'})
                        .addClass('node__overlay')
                        .move(caret.x + extraXPaddingForMinorGodX, caret.y + yPaddingToCenterOnMinorGodCaret + + ageSeperationPaddingY)
                        .data({'type': caret.type.type, 'caret': caret, 'name': caret.name, 'id': caret.id})
                        .mouseover(function () {
                            // console.log('**MouseOver called - minor god details!!!')
                            highlightPath_SP(caret.id);
                        })
                        .mouseout(function () {
                            resetHighlightPath_SP();
                        })
                        .click(function () {
                            if (focusedNodeId.id === caret.id) {
                                hideHelp_SP();
                            } else {
                                displayHelp_SP(caret.id);
                            }
                        });
                        previousCaretIsMinorGod = false;
                }
            }
        }
    }

    function imagePrefix(name) {
        return name.replace('_copy', '')
            .replace('building_', 'Buildings/')
            .replace('unit_', 'Units/')
            .replace('tech_', 'Techs/')
            .replace('major_god_', 'major_gods/')
            .replace('minor_god_', 'minor_gods/')
            .replace('god_power_', 'god_powers/')
            .replace('bushido_god_blessing_', 'bushido_god_blessings/');
            // 'BUSHIDO_GOD_BLESSING': 'bushido_god_blessing_',
    }
    //  this.offset_x
    treeMinorGods.offset_x = 0;

    root_minor_gods = document.getElementById('root_minor-gods');
    // root_MG.style.height = '100%';
    // console.log('root_minor_gods', root_minor_gods);
    root_minor_gods.style.height = '100%';
    root_minor_gods.style.width = '100%';

    // *** sampleGodPowerCaretId *** // 
    // tree.getDefaultCaretHeight()
    // const sampleGodPowerCaretId = minorGodLaneMatrices[jsonData[(SELECTED_MAJOR_GOD_ID.id)].Name][0][0].id;
    // console.log('*^* sampleGodPowerCaretId in displayDataMG(): ', sampleGodPowerCaretId);

    // id="god_power_791_SP_bg"
    //     god_power_791_SP_bg
    // const sampleMinorGodCaret = document.getElementById(`god_power_${sampleGodPowerCaretId}_SP_bg`);
    // console.log(`('*^* god_power_${sampleGodPowerCaretId}_SP_bg`);
    // console.log('*^* sampleMinorGodCaret in displayDataMG(): ', sampleMinorGodCaret);
    // console.log('*^* sampleMinorGodCaret.clientWidth: ', sampleMinorGodCaret.clientWidth)
    // console.log('*^* sampleMinorGodCaret.offsetWidth: ', sampleMinorGodCaret.offsetWidth)
    // console.log('*^* sampleMinorGodCaret.getAttribute("width")', sampleMinorGodCaret.getAttribute("width"));

    const sidePanelEl = document.getElementById('side_panel');
    const sidePanelMinorGodEl = document.getElementById('side_panel__minor_gods');
    const sidePanelMajorGodDescEl = document.getElementById('side_panel__major_god_description');
    const rootMinorGodsEl = document.getElementById('root_minor-gods');

    // sidePanelMinorGodEl width: 11 x caret.width = 2 caretsW (age icons) + 8 caretsW (max number of carets per row) + 1 caretW (1/2 padding on each side)
    // 11 x caret.width = 0.60 x sidePanelEL.width
    // side panelEl.width = 18.333 caret.widths
    console.log('*^* rootMinorGodsEl', rootMinorGodsEl);
    console.log('*^* before rootMinorGodsEl.offsetWidth: ', rootMinorGodsEl.offsetWidth);
    console.log('*^* before rootMinorGodsEl.getBoundingClientRect(): ', rootMinorGodsEl.getBoundingClientRect());

    // const caretWidthMGTree = sampleMinorGodCaret.getAttribute("width");
    const caretWidthMGTree = treeMinorGods.getDefaultCaretHeight();
    const numberOfCaretWidths = 18.333;
    const spaceBtwCarets = 10 * 6;
    const marginSpaceEnds = 25;
    const sidePanelWidthCalc = numberOfCaretWidths * Number(caretWidthMGTree) + spaceBtwCarets + marginSpaceEnds;
    console.log('*^* caretWidthMGTree: ', caretWidthMGTree); // 49.313 on 34in uw
    console.log('*^* sidePanelWidthCalc:', sidePanelWidthCalc);
    // sidePanelEl.style.width = `${sidePanelWidthCalc}px`;
    // sidePanelEl.style.minWidth = `${sidePanelWidthCalc}px`;
    console.log('*^* sidePanelEl.getAttribute("width"):', sidePanelEl.getAttribute("width"));
    console.log('@@ *^* sidePanelEl.style.width:', sidePanelEl.style.width);
    console.log('*^* sidePanelEl.style.clientWidth:', sidePanelEl.clientWidth);
    console.log('*^* sidePanelEl.offsetWidth', sidePanelEl.offsetWidth);
    console.log('*^* sidePanelEl.getBoundingClientRect():', sidePanelEl.getBoundingClientRect());
    console.log('*^* sidePanelEl: ', sidePanelEl);
    
    console.log('treeMinorGods.offsets_y: ', treeMinorGods.offsets_y);
    // *** print lanes offsets ***

    console.log('*^* after rootMinorGodsEl.offsetWidth: ', rootMinorGodsEl.offsetWidth);
    console.log('*^* after rootMinorGodsEl.getBoundingClientRect(): ', rootMinorGodsEl.getBoundingClientRect());


    // ratio sidePanel width to it's height: w / h = 1100 / 594;
    
    // sidePanel.style.width = '1043.04px'; //3 * 347.6
    // sidePanel.style.minWidth = '1043.04px';
    
    // to acommadate an 8th caret in minor god details tree
    // sidePanel.style.width = '1100px'; //3 * 347.6
    // sidePanel.style.minWidth = '1100px'; // 385 + 581.234 = 966.234px;
    
    //sidepanel width
    // side_panel__minor_gods width: 65%
    // side_panel__major_god_description width: 35%
    
    
    // sidePanel.style.width = `${sidePanel.clientHeight * (996 / 594)}px`;
    // sidePanel.style.minWidth = `${sidePanel.clientHeight * (996 / 594)}px`;

    const minorGodDetailsEl = document.getElementById('side_panel__minor_gods__details');
    const minorGodSidePanel = document.getElementById('side_panel__minor_gods');

        console.log('@@ minorGodDetailsEl: ', minorGodDetailsEl);
    
        console.log('@@ SELECTED_MAJOR_GOD_ID.id: ', SELECTED_MAJOR_GOD_ID.id);
        console.log('@@ treeMG.width: ', treeMinorGods.width);

        /* minor god sidePanel width set here */
        minorGodDetailsEl.style.width = treeMinorGods.width + 'px';
        minorGodSidePanel.style.width = Number(treeMinorGods.width) * (1 / 0.85) + 'px'; // age_icon_div is 15% hence minorGodDetails is 85%
        
        console.log("@@@ Number(treeMinorGods.width) * (1 / 0.85) + 'px': ", Number(treeMinorGods.width) * (1 / 0.85) + 'px');


        console.log('@@ majorGodSelectionPanel.style.width: ', minorGodDetailsEl.style.width);
        console.log('@@ Before MajorGod Tree - treeMG.offsets_y: ',treeMinorGods.offsets_y);
        console.log('@@ sidePanelEl.style.width: ', sidePanelEl.style.width);

        // sidePanelEl.style.width = 
        treeMinorGods.updateOffsets();
        console.log('@@ After MajorGod Tree - treeMG.offsets_y: ',treeMinorGods.offsets_y);
}

setTimeout(displayDataMinorGods, 50);
// const root_minor_gods = document.getElementById('root_minor-gods');
// // root_MG.style.height = '100%';
// console.log('root_minor_gods', root_minor_gods);
// root_minor_gods.style.height = '100%';
// root_minor_gods.style.width = '100%';

// console.log('minorGodDetails TEST!!!');

// treeMinorGods.lanes.c

function highlightPath_SP(caretId) {
        recurse(caretId);

        function recurse(caretId) {
            SVG('#' + caretId).addClass('is-highlight');
            // console.log('caretID ', caretId);
            const parentIds = parentConnections.get(caretId);
            if (!parentIds) return;

            // for (let parentId of parentIds) {
            //     const line = SVG(`#connection_${parentId}_${caretId}`);
            //     if (line) {
            //         // Move to the end of the <g> element so that it is drawn on top.
            //         // Without this, the line would be highlighted, but other unhighlighted
            //         // connection lines could be drawn on top, undoing the highlighting.
            //         line.front().addClass('is-highlight');
            //     }
                // recurse(parentId);
            // }
        }
}

function unhighlightPath_SP() {
        // (SVG as any).find('.node.is-highlight, .connection.is-highlight')
        //     .each((el) => {el.removeClass('is-highlight')});

        // (SVG as any).select('.node.is-highlight, .connection.is-highlight')
        //     .each((el) => {el.removeClass('is-highlight')});

        
        const previosulyHighlightedArray = Array.from(document.getElementsByClassName('is-highlight'));
        for (let i = 0; i < previosulyHighlightedArray.length; i++) {
            previosulyHighlightedArray[i].classList.remove('is-highlight');
        }
        // previosulyHighlighted && previosulyHighlighted.classList.remove('is-highlight');
        // const previosulyHighlightedAfterArray = Array.from(document.getElementsByClassName('is-highlight'));
    }

    
function resetHighlightPath_SP() {
    unhighlightPath_SP();
    if (focusedNodeId.id) {
        highlightPath_SP(focusedNodeId.id);
    }
    // console.log('resetHighlightPath_SP called!!');
}

function hideHelp_SP() {
        // add helptext_SP and change helptext to act on #helptext
        // console.log('hideHelp_SP Called');
        focusedNodeId.id = null; // need to change focusedNodeId to an object, so it can be update in multiple files
        const helptext_SP = document.getElementById('helptext_SP');
        // console.log('helptext_SP BEFORE: ', helptext_SP);
        helptext_SP.style.display = 'none';
        // console.log('helptext_SP AFTER: ', helptext_SP);
        
        const helptext = document.getElementById('helptext');
        helptext.style.display = 'none';
        
        resetHighlightPath_SP();
        // resetHighlightPath();

        // console.log('hideHelp_SP called!!!');
}

// hideHelp_SP();

function displayHelp_SP(caretId) {
        const helptext = document.getElementById('helptext');
        helptext.style.display = 'none';
        // console.log('displayHelp Called!');
        focusedNodeId.id = caretId;
        let helptextContent = document.getElementById('helptext__content_SP');
        // let helptextAdvancedStats = document.getElementById('helptext__advanced_stats');
        let overaly = SVG(`#${caretId}_overlay`);
        let name = overaly.data('name');
        let id = overaly.data('id');
        let caret = overaly.data('caret');
        let type = overaly.data('type');
        // console.log('name: DHSP', name);
        // console.log('id: DHSP', id);
        // console.log('type: DHSP', type);
        // *** NEED TO update with new caret type ***
        helptextContent.innerHTML = getHelpText_SP(name, id.replace('unit_', '').replace('building_', '').replace('tech_','').replace('major_god_', '').replace('minor_god_', '').replace('god_power_', '').replace('bushido_god_blessing_', ''), type);
        // helptextAdvancedStats.innerHTML = getAdvancedStats(name, id, type);
        // styleXRefBages(name, id, type);
        positionHelptext_SP(caret);
        resetHighlightPath_SP();  // this line casues: main.js:310 Uncaught ReferenceError: resetHighlightPath is not defined
}

function getHelpText_SP(name, id, type) {
    // console.log('jsonData3: ', jsonData);
    // console.log('globalData from getHelpText_SP: ', jsonData);
    console.log('getHelpText_SP id:', id);
    let first_letter = name[0];
    let nameSplit = name.split(' ');
    // console.log(nameSplit);
    let newName = "";
    for (const word of nameSplit) {
        // console.log('word: ', word);
        newName += word[0] + word.slice(1).toLowerCase().replace("\n", " ");
    }
    // let restOfLetters = name.slice(1).toLowerCase();
    // let newName = first_letter + restOfLetters;
    // console.log('newName: ', newName);

    // const unit_data = jsonData[newName]; 
    const unit_data = jsonData[id.replace('_SP', '')]; 
    

    console.log(newName, 'unit_data: ', unit_data, 'id: ', id, "id.replace('_SP', '')", id.replace('_SP', ''));

    if (unit_data) {
        let cost_str = '';
        const cost_heading = '• Cost: '
        let stat_str = '';
        const stats_heading = '• Stats: '
        // Food > Wood > Gold > Favor > Pop > Training Time
        if (unit_data.Food_Cost || unit_data.Wood_Cost || unit_data.Gold_Cost || unit_data.Favor_Cost) {
            // cost_str += '• Cost: '
            if (unit_data.Food_Cost) {
                // cost_str += `${unit_data.Food_Cost} FIcon `;
                cost_str += `<span class="cost food" title="${unit_data.Food_Cost} Food">${unit_data.Food_Cost}</span> `;
            }
            
            if (unit_data.Wood_Cost) {
                // cost_str += `${unit_data.Wood_Cost} WIcon `;
                cost_str += `<span class="cost wood" title="${unit_data.Wood_Cost} Wood">${unit_data.Wood_Cost}</span> `;
            }

            if (unit_data.Gold_Cost) {
                // cost_str += `${unit_data.Gold_Cost} GIcon `;
                cost_str += `<span class="cost gold" title="${unit_data.Gold_Cost} Gold">${unit_data.Gold_Cost}</span> `;
            }

            if (unit_data.Favor_Cost) {
                // cost_str += `${unit_data.Favor_Cost} VIcon `;
                cost_str += `<span class="cost favor" title="${unit_data.Favor_Cost} Favor">${unit_data.Favor_Cost}</span> `;
            }

            if (unit_data.Pop_Cost) {
                cost_str += `<span class="cost pop" title="${unit_data.Pop_Cost} Pop">${unit_data.Pop_Cost}</span> `;
            }

            if (unit_data.Training_Time) {
                cost_str += `<span class="cost training_time" title="${unit_data.Training_Time} Training_time">${unit_data.Training_Time}</span> `;
            }

            // Stats

            if (unit_data.Hitpoints) {
                stat_str += `<span class="stat hitpoints" title="${unit_data.Hitpoints} Hitpoints"> ${unit_data.Hitpoints}, </span>`;
            }

            if (unit_data.Hack_Armor) {
                stat_str += `<span class="stat hack_armor" title="${unit_data.Hack_Armor} Hack_Armor"> ${unit_data.Hack_Armor}%, </span>`;
            }

            if (unit_data.Pierce_Armor) {
                stat_str += `<span class="stat pierce_armor" title="${unit_data.Pierce_Armor} Pierce_Armor">${unit_data.Pierce_Armor}%, </span>`;
            }

            if (unit_data.Crush_Armor) {
                stat_str += `<span class="stat crush_armor" title="${unit_data.Crush_Armor} Crush_Armor">${unit_data.Crush_Armor}%, </span>`;
            }

            if (unit_data.Velocity) {
                stat_str += `<span class="stat velocity" title="${unit_data.Velocity} Velocity">${unit_data.Velocity}, </span>`;
            }

            if (unit_data.Attack_Type) {
                stat_str += `<span class="stat attack_type" title="${unit_data.Attack_Type} Attack_Type">${unit_data.Attack_Type}, </span>`;
            }

            // if (unit_data.Attack_Type) {
            //     stat_str += `<span class="stat attack_type" title="${unit_data.Attack_Type} Attack_Type">${unit_data.Attack_Type}, </span>`;
            // }

            if (unit_data.Hack_Damage) {
                stat_str += `<span class="stat hack_damage" title="${unit_data.Hack_Damage} hack_damage">${unit_data.Hack_Damage}, </span>`;
            }

            if (unit_data.Pierce_Damage) {
                stat_str += `<span class="stat pierce_damage" title="${unit_data.Pierce_Damage} pierce_damage">${unit_data.Pierce_Damage}, </span>`;
            }

            if (unit_data.Divine_Damage) {
                stat_str += `<span class="stat divine_damage" title="${unit_data.Divine_Damage} divine_damage">${unit_data.Divine_Damage}, </span>`;
            }

            if (unit_data.Crush_Damage) {
                stat_str += `<span class="stat crush_damage" title="${unit_data.Crush_Damage} crush_damage">${unit_data.Crush_Damage}, </span>`;
            }

            if (unit_data.Rate_of_fire) {
                stat_str += `<span class="stat rate_of_fire" title="${unit_data.Rate_of_fire} rate_of_fire">${unit_data.Rate_of_fire}, </span>`;
            }

            if (unit_data.Bonus_Multiplier) {

                let bonus_multiplier_str = unit_data.Bonus_Multiplier;
                let bonus_multiplier_str_list = bonus_multiplier_str.split(':');
                // console.log('bonus_multiplier_str_list: ', bonus_multiplier_str_list);
                bonus_multiplier_str_list = bonus_multiplier_str_list.map(word => word.split(','));
                // console.log('bonus_multiplier_str_list: ', bonus_multiplier_str_list);
                let bonus_multiplier_word_list = [];
                for (let i = 0; i < bonus_multiplier_str_list.length; i++) {
                    bonus_multiplier_word_list.push(...bonus_multiplier_str_list[i]);
                }
                bonus_multiplier_word_list = bonus_multiplier_word_list.map(word => word.trim());
                // console.log('bonus_multiplier_word_list: ', bonus_multiplier_word_list);

                for (let i = 0; i < bonus_multiplier_word_list.length; i = i + 2) {
                let multiplier_value;
                try {
                    multiplier_value = bonus_multiplier_word_list[i + 1];
                    if (multiplier_value[multiplier_value.length - 1] === '0') {multiplier_value = multiplier_value.slice(0, -1)};
                    if (multiplier_value[multiplier_value.length - 1] === '0') {multiplier_value = multiplier_value.slice(0, -2)};
                } catch (e) {
                    console.error(`Caught an error: ${e}`);
                }
                // console.log('BONUS_MULTIPLIER_CLASSES: ', BONUS_MULTIPLIER_CLASSES);
                // console.log(`BONUS_MULTIPLIER_CLASSES[bonus_multiplier_word_list[i]]: ${BONUS_MULTIPLIER_CLASSES[bonus_multiplier_word_list[i].trim()]}`);
                stat_str += `<span class="stat ${BONUS_MULTIPLIER_CLASSES[bonus_multiplier_word_list[i]]}" title="${multiplier_value}${BONUS_MULTIPLIER_DISPLAY_STR[bonus_multiplier_word_list[i]]}">${multiplier_value}x, </span>`;
                // console.log(`** <span class="stat ${BONUS_MULTIPLIER_CLASSES[bonus_multiplier_word_list[i]]}" title="${multiplier_value}${BONUS_MULTIPLIER_DISPLAY_STR[bonus_multiplier_word_list[i]]}">${multiplier_value}x, </span>`);  
                }
            }    
        }

        let descriptionText = unit_data.Description;
        let descriptionTextBR = '';
        if (descriptionText) {
            let descriptionTextOGLength = descriptionText.length; 
            let lastIndex = 0
            for (let i = 0; i < descriptionTextOGLength; i++) {
                console.log(`descptionText[${i}]: `, descriptionText[i]);
                if(descriptionText[i] === '•') {
                    descriptionTextBR += descriptionText.slice(lastIndex, i) + '<br>' + '•';
                    lastIndex = i + 1;
                }
            }
            descriptionTextBR += descriptionText.slice(lastIndex);
            descriptionTextBR = descriptionTextBR.replace("<br>", "");
            if (descriptionTextBR[0] !== '•') {
                descriptionTextBR = '• ' + descriptionTextBR;
            }
            console.log('descriptionText: ', descriptionText);
            console.log('descptionTextBR: ', descriptionTextBR);
        }
        

        console.log('unit_data.Type: ', unit_data.Type);
        if (unit_data.Type === 'tech') {
            return `<p>${formatName(unit_data.Name)}</p><p>${cost_heading}${cost_str}</p><p>${descriptionTextBR}</p>`;
        }
        if (unit_data.Type === 'unit' || unit_data.Type === 'building') {
        return `<p>${formatName(unit_data.Name)}</p><p>${cost_heading}${cost_str}</p><p>${stat_str}</p><p>${descriptionTextBR}</p>`;
        }

        if (unit_data.Type === 'minor_god' || unit_data.Type === 'god_power') {
            return `<p>${formatName(unit_data.Name)}</p> <p>${unit_data.Description}</p>`;
        }
    }
    
    return `Example: ${formatName(name)}, ${id}, ${unit_data}`; // ${unit_data.cost}
}

function positionHelptext_SP (caret) {
    const helptext = document.getElementById('helptext_SP');
    helptext.style.display = 'block';
    positionHelptextBelow_SP(caret, helptext)
    || positionHelptextAbove_SP(caret, helptext)
    || positionHelptextToLeftOrRight_SP(caret, helptext);

    // EXPERIMENT to posistion SP help text properly
    console.log('helptext.style.left BEFORE: ', helptext.style.left);
    let helpbox = helptext.getBoundingClientRect();
    let caretEl = document.getElementById(caret.id);
    let caretBRC = caretEl.getBoundingClientRect();
    console.log('caret.x: ', caret.x, 'helpbox.width: ', helpbox.width);
    console.log('caretBRC.left: ', caretBRC.left, 'helpbox.left: ', helpbox.left);
    // helptext.style.left = (caretBRC.left - helpbox.width) + 'px';
    console.log('helptext.style.left AFTER: ', helptext.style.left);
    // console.log('window.getComputedStyle(helptext): ', window.getComputedStyle(helptext));
    console.log('window.getComputedStyle(helptext).position: ', window.getComputedStyle(helptext).position);
    console.log('window.getComputedStyle("side_panel__minor_gods__details").position: ', window.getComputedStyle(document.getElementById('side_panel__minor_gods__details')).position);

}

function positionHelptextBelow_SP(caret, helptext) {
    console.log('positionHelptextBelow_SP ENTERED!!!', 'caret: ', caret);

    let top = caret.y + caret.height + document.getElementById('root_minor-gods').getBoundingClientRect().top;
    let helpbox = helptext.getBoundingClientRect();
    console.log('caret.name: ', caret.name,'helpbox: ', helpbox);
    let caretEl = document.getElementById(caret.id);
    let careElbox = caretEl.getBoundingClientRect();
    console.log('caret.name: ', caret.name,'caretEl: ', caretEl);
    console.log('caret.name: ', caret.name,'caretElbox: ', careElbox);
    console.log('caret.x: ', caret.x);
    if (top + helpbox.height > treeMinorGods.height) {
        return false;
    }

    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('side_panel__minor_gods__details');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = techtree.scrollLeft;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
    return true;
}

function positionHelptextAbove_SP(caret, helptext) {
    console.log('positionHelptextAbove_SP ENTERED!!!', 'caret: ', caret);
    let helpbox = helptext.getBoundingClientRect();
    console.log('helpbox: ', helpbox);
    let caretEl = document.getElementById(caret.id);
    let careElbox = caretEl.getBoundingClientRect();
    console.log('caretEl: ', caretEl);
    console.log('caretElbox: ', careElbox);
    console.log('caret.x: ', caret.x);
    let top = caret.y - helpbox.height + document.getElementById('root_minor-gods').getBoundingClientRect().top;
    if (top < 0) {
        return false;
    }

    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('side_panel__minor_gods__details');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = techtree.scrollLeft;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
    return true;
}

function positionHelptextToLeftOrRight_SP(caret, helptext) {
    console.log('positionHelptextToLeftOrRight_SP ENTERED!!!', 'caret: ', caret);
    let helpbox = helptext.getBoundingClientRect();
    console.log('helpbox: ', helpbox);
    let top = 0;
    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('side_panel__minor_gods__details');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = caret.x + caret.width;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
}


// trying to accomidate .png

// async function checkHrefValidity(url) {
//     try {
//         const response = await fetch(url, {method: 'HEAD'}); // Use HEAD method to save bandwidth
//         if (response.ok) {
//             console.log(`${true} ${url} is valid (Status: ${response.status}`);
//             return true;
//         } else {
//             // console.error(`${url} returned an error: ${response.status}`);
//         }
//     } catch (error) {
//         // console.error(`Network request failed for ${url}: ${error.message}`);
//         console.log(`${false}`);
//     }
//     return false;
// }



