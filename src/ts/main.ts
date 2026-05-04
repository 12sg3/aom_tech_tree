import { getDefaultTree, getConnections, getConnectionPoints, CARET_TYPES, formatName, BONUS_MULTIPLIER_CLASSES, BONUS_MULTIPLIER_DISPLAY_STR } from "./techtree.js";
// import{ SVG } from '@svgdotjs/svg.js'; // will have to figure out if this npm install works or if cdn link is required/better
// import { SVG } from '../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js';
// import { SVG } from "https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.2/dist/svg.min.js";
// import { SVG } from './svg.min.js';
import { SVG } from '@svgdotjs/svg.js';
// import * as SVGJS from '@svgdotjs/svg.js';
// import { SVG } from '@svgdotjs/svg.js/dist/svg.esm.js'
// import { SVG } from 'https://esm.sh';
// import { SVG } from './node_modules/@svgdotjs/svg.js/dist/svg.esm.js';

// import * as SVGMODULE from '@svgdotjs/svg.js';
// console.log('SVGMODULE: ', SVGMODULE);
// // console.log('SVGMODULE():', SVGMODULE());
// // const SVG = SVGMODULE.SVG;
// const SVG = SVGMODULE;
// console.log('SVGJS: ', SVGJS);
// console.log('SVGJS.SVG(): ', SVGJS.SVG());
// const SVG = SVGJS;
console.log('SVG: ', SVG);
console.log('SVG(): ', SVG());

// import jsonData from '../data.json' assert { type: 'json' };
// console.log('jsonData: ', jsonData); // jsonData is now a JavaScript object
import jsonData from '../data.json' with { type: 'json' };
console.log('jsonData: ', jsonData);

export const AGE_IMAGES = ['archaic_age_icon.webp', 'classical_age_icon.webp', 'heroic_age_icon.webp', 'mythic_age_icon.webp'] as const;


let tree;
let data = {};
let civs = {};
let connections;
export let parentConnections;
let connectionpoints;
export const focusedNodeId: {id: number | null} = {id: null};


// window.addEventListener('error', function(e) {
//     console.log("**window.addEventListener('error'... ENTERED");
//     console.log("e.target.tagName: ", e.target.tagName);
//     // if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
//     if (e.target.tagName === 'image') {
//         console.log('**Failed to load resource:', e.target.src || e.target.href);
//         // console.log('e.target.src', e.target.src);
//         console.log('e.target.href: ', e.target.href);
//         console.log('e.target.href.aniVal', e.target.href.animVal);
//         console.log('e.target.href.baseVal', e.target.href.baseVal);
//         let imgId = e.target.href.animVal.toLowerCase().replace('/', '').replace('img', '').replace('minor_gods', '').replace('.webp', '').replace('/', '');
//         console.log('imgId: ', imgId);
//         imgEl = this.document.getElementById(`minor_god_${imgId}_SP_img`);
//         try {
//             console.log('imgEL Before: ', imgEl);
//             console.log('imgEl.href Before: ', imgEl.href);
//             // imgEl.href = imgEl.href.replace('.webp', '.png');
//             // imgEl.href.baseVal = "img/minor_gods/800.png";
//             imgEl.href.baseVal = imgEl.href.baseVal.replace('.webp', '.png');
//             console.log('imgEl After: ', imgEl);
//             console.log('imgEl.href After: ', imgEl.href);
//         } catch (error) {
//             console.error('error: ', error);
//             console.log('imgEl from above error: ', imgEl);
//             console.log('e.target from above error: ', e.target);
//         }
//     }
// }, true);

//  xlink:href="img/minor_gods/800.webp" id="minor_god_800_SP_img" 


// async function loadJsonData() {
//     try {
//         const response = await fetch('../data.json');
//         // const jsonData = await response.json();
//         jsonData = await response.json();
//         // console.log('jsonData: ', jsonData);
//         // return jsonData
//     } catch (error) {
//         console.error('Error loading JSON:', error);
//     }
// }

// loadJsonData();
// const jsonData = loadJsonData();
// const jsonData = loadJsonData();
// console.log('jsonData after load: ', jsonData);
// import '/js/techtree.js'

// treeDims = {
//     width: 2000,
//     height: 250,
// }

// const draw = SVG().addTo('#techtree').id('root').size(treeDims.width, treeDims.height);

// let rect = draw.rect(300, 200);

// rect.fill({color: '#302163'});

    // .click((e)=> {
    //     if (e.target.id === 'root') {
    //         // hideHelp();
    //     }
    // });



// let caret = new Caret()

// function testCrossFileSharing(){
//     console.log('cross file sharing successful');
// }

// tree = getDefaultTree();

// function getAgeNumber(row) {
//     const age = row.split('_')[0];
//     for (let i = 0; i < AGE_IMAGES.length; i++) {
//         const ageimage = AGE_IMAGES[i];
//         if (ageimage.includes(age)) {
//             return i;
//         }
//     }
//     return 1;
// }

// my temp getAgeNumber
export function getAgeNumber(row) {
    return 1;
}

const wrapperDiv = document.getElementById('wrapper');
console.log('wrapperDiv: ', wrapperDiv);
// wrapperDiv.style.height = '594px';
const bodyElement = document.body;
// bodyElement.style.height = '609px';
bodyElement.style.height = '100%';



//ToDo see if this code works via trial and error, re-write as needed
// console.log('tree.lanes: ', tree.lanes);
export function displayData() {
    console.log('displayData called!!');
    // Reset containers
    const root = document.getElementById('root');
    if (root) {
        document.getElementById('techtree').removeChild(root);
    }
    // document.getElementById('civselect').innerHTML = '';
    // document.getElementById('buildingindex__table').innerHTML = '';
    // document.getElementById('key__table').innerHTML = '';

    tree = getDefaultTree();
    connections = getConnections();
    // tree = setTimeout(getDefaultTree, 50);
    // connections = setTimeout(getConnections, 50);

    // console.log(connections);
    parentConnections = new Map();
    connections.forEach(([parent, child]) => {
        if (!parentConnections.has(child)) {
            parentConnections.set(child, []);
        }
        parentConnections.get(child).push(parent);
    });
    connectionpoints = getConnectionPoints(tree);
    
    
    // fillCivSelector();
    // console.log('connectionpoints**: ', connectionpoints);

    function hideHelp() {
        focusedNodeId.id = null;
        const helptext = document.getElementById('helptext');
        helptext.style.display = 'none';
        resetHighlightPath();

        const helptext_SP = document.getElementById('helptext_SP');
        helptext_SP.style.display = 'none';

        console.log('hideHelp called!!!');
    }

    function displayHelp(caretId) {
        const helptext_SP = document.getElementById('helptext_SP');
        helptext_SP.style.display = 'none';

        console.log('displayHelp Called!');
        focusedNodeId.id = caretId;
        let helptextContent = document.getElementById('helptext__content');
        let helptextAdvancedStats = document.getElementById('helptext__advanced_stats');
        let overaly = SVG(`#${caretId}_overlay`);
        let name = overaly.data('name');
        let id = overaly.data('id');
        let caret = overaly.data('caret');
        let type = overaly.data('type');
        // console.log('name: ', name);
        // console.log('id: ', id);
        // console.log('type: ', type);
        helptextContent.innerHTML = getHelpText(name, id.replace('unit_', '').replace('building_', '').replace('tech_',''), type);
        helptextAdvancedStats.innerHTML = getAdvancedStats(name, id, type);
        // styleXRefBages(name, id, type);
        positionHelptext(caret);
        resetHighlightPath();  // this line casues: main.js:310 Uncaught ReferenceError: resetHighlightPath is not defined
    }

    // tree.width is set by tree.UpdatePositions in getDefaultTree 

    // console.log('tree.width: ', tree.width, 'tree.height: ', tree.height);
    // console.log('tree.width: ', tree.width);
    // console.log('tree.height: ', tree.height);

    const draw = SVG().addTo('#techtree').id('root').size(tree.width, tree.height) //tree.width * 10;
        .click((e) => {
            if (e.target instanceof SVGElement && e.target.id === 'root') { // ** need to test this change **
                hideHelp();
            }
        });

        // const draw = SVG().addTo('#techtree').id('root').size(tree.width, tree.height) //tree.width * 10;
        // .click((e) => {
        //     if (e.target.id === 'root') {
        //         hideHelp();
        //     }
        // });

    // // //


    let techTree = document.getElementById('techtree');
    let rootEl = document.getElementById('root');

    console.log('techTree: ', techTree);
    console.log('techTree.offsetHeight: ', techTree.offsetHeight);
    console.log('techTree.clientHeight: ', techTree.clientHeight);

    console.log('rootEl.clientHeight: ', rootEl.clientHeight);

    rootEl.style.height = String(techTree.clientHeight); // root.style.height ... causes null error
    console.log('rootEl.clientHeight: ', rootEl.clientHeight);
    console.log('typeof(techTree.clientHeight): ', typeof(techTree.clientHeight));
    tree.height = techTree.clientHeight;


    console.log('tree: ', tree);
    // console.log('tree.offsetHeight: ', tree.offsetHeight);
    // console.log('tree.clientHeight: ', tree.clientHeight);

    // // //

    // console.log('draw.width: ', draw.width());

    document.getElementById('techtree').onclick = (e) => {
        if (e.target instanceof SVGElement && e.target.id === 'techtree') {
            hideHelp();
        }
    };

    // Draw Age Row Highlighters
    let row_height = tree.height / 4;
    let row_height2 = tree.height * 2 / 9;
    let row_height3 = tree.height * 3 / 9;
    console.log('tree.width (draw-age-row)', tree.width);
    draw.rect(tree.width, row_height2).attr({fill: '#4d3617', opacity:0.3}).click(hideHelp); // tree.width * 10 // row_height
    draw.rect(tree.width, row_height3).attr({fill: '#4d3617', opacity:0.3}).click(hideHelp).y(row_height2 * 2); // tree.width * 10 //row_height

    // Add Age Icons
    let icon_height = Math.min(row_height / 2, 112);
    let icon_width = 112;
    let vertical_spacing_1_4 = (row_height2 - icon_height) / 2 - 10; // -10
    let vertical_spacing_2 = (row_height2 - icon_height) / 2 - 25;
    let vertical_spacing_3 = (row_height3 - icon_height) / 3 -25; // -10, NEED TO REVISE AND REFACTOR THIS
    let margin_left = 20;
    let image_urls = AGE_IMAGES;
    const AGE_NAMES = ['Archaic Age', 'Classical Age', 'Heroic Age', 'Mythic Age'] as const;
    let vert_spacing_list = [vertical_spacing_1_4, vertical_spacing_2, vertical_spacing_3, vertical_spacing_1_4];
    for (let i = 0; i < image_urls.length; i++) {
        let age_image_group = draw.group().click(hideHelp);
        let age_image = age_image_group.image('img/ages/' + image_urls[i])
            .size(icon_width, icon_height)
            .x(margin_left)
            .y(row_height * i + vert_spacing_list[i]); //vertical_spacing

        age_image_group
            .text(AGE_NAMES[i])
            .font({size: 16, weight: 'bold'}) /* Text-anchor: middle does not work */
            .cx(icon_width / 2 + margin_left)
            .y(age_image.attr('y') + age_image.attr('height') + 5);

        // console.log('age logo added');
    }

    // test_unit_images = ['images/norse/AoMR_Ballista_icon.webp', 'images/norse/AoMR_Berserk_icon.webp', 'images/norse/AoMR_Caravan_Norse_icon.webp', 'images/norse/AoMR_Champion_Cavalry_icon.webp', 'images/norse/AoMR_Hirdman_icon.webp', 'images/norse/AoMR_Kraken_icon.webp', 'images/norse/AoMR_Stone_Wall_Norse_icon.webp'];

    // for (let i = 0; i < test_unit_images.length; i++) {
    //     let unit_image_group = draw.group().click(hideHelp);
    //     let unit_image = unit_image_group.image(test_unit_images[i])
    //         .size(icon_width, icon_height)
    //         .x(margin_left * 2  + icon_width + icon_width * i)
    //         .y(vertical_spacing);

    //     unit_image_group.text(test_unit_images[i].slice(18).slice(0, -10).replace(/_/g, ' ')) // .replace('_', ' ') -> only does the first instance of '_', .replace(/_/g, ' ') -> using regex replaces all instances of '_' 
    //         .font({size: 8, weight: 'bold'})
    //         .cx(3 * icon_width / 4 + margin_left + icon_width + icon_width * i)
    //         .y(unit_image.attr('y') + unit_image.attr('height') + 5);
    // }

    // console.log('connections: ', connections);

    // console.log('connectionpoints: ', connectionpoints);
    const connectionGroup = draw.group().attr({id: 'connection_lines'});
    for (let connection of connections) {
        let from = connectionpoints.get(connection[0]);
        let to = connectionpoints.get(connection[1]);
        // console.log('connection: ', connection);
        // console.log('from: ', from);
        // console.log('to: ', to, 'to.x: ', to.x);
        try{
            let intermediate_height = from.y + (tree.element_height * 2 / 3);
            connectionGroup.polyline([from.x, from.y, from.x, intermediate_height, to.x, intermediate_height, to.x, to.y])
                .attr({id: `connection_${connection[0]}_${connection[1]}`})
                .addClass('connection')
                .click(hideHelp);
        }
        catch (error) {
            console.log('An error has occurred:', error);
            console.log('connection: ', connection);
            console.log('connection[0]: ', connection[0]);
            console.log('connection[1]: ', connection[1]);
            console.log('to:', to);
            console.log('from: ', from);
            console.log('connectionpoints: ', connectionpoints);
            
        }
    }

    // console.log('connectionGroup', connectionGroup);

    // function blank_caret() {
    // return new Caret(TYPES.BLANK, TYPES.BLANK.name, get_next_BlankID());
    // }

    for (let lane of tree.lanes) {
        draw.rect(lane.width + 10, tree.height)
            .attr({fill: '#ffeeaa', 'opacity': 0, class: lane.caretIds().map((id) => `lane-with-${id}`)})
            .move(lane.x - 10, lane.y)
            .click(hideHelp);
        for (let r of Object.keys(lane.rows)) {
            let row = lane.rows[r];
            const ageNumber = getAgeNumber(r);
            for (let caret of row) {
                if (caret.type === CARET_TYPES.BLANK) { // will this work?
                    const item = draw.group().attr({id: caret.id}).addClass('blank-anti-node');
                    const rect = item.rect(caret.width, caret.height).attr({
                        fill: caret.type.colour,
                        // opacity: 0, 
                        opacity: caret.type.opacity,
                        id: caret.id,
                    }).move(caret.x, caret.y);
                } else {
                    // console.log('U/T/B caret: ', caret);
                    // console.log(`U/T/B caret.type.colour: ${caret.type.colour}`);
                    const item = draw.group().attr({id: caret.id}).addClass('node');
                    console.log('caret.width: ', caret.width, 'caret.height: ', caret.height);
                    const rect = item.rect(caret.width, caret.height).attr({
                        fill: caret.type.colour || caret.type.colour,
                        id: `${caret.id}_bg`
                    }).move(caret.x, caret.y);
                    let name = formatName(caret.name);
                    // let name = caret.name;
                    // console.log('name.toString(): ', name.toString(), typeof(name.toString()));
                    // console.log("name.toString().replace(/_/g, ' '): ", name.toString().replace(/_/g, ' '), typeof(name.toString()));
                    // const text = item.text(name.toString().replace(/_/g, ' '))
                    // console.log('name: ', name);
                    const text = item.text(name.toString())
                        .font({size: 9, weight: 'bold'}) // size: 12
                        .attr({fill: '#000000', opacity: 0.95, 'text-anchor': 'middle', id: caret.id + '_text'})
                        .cx(caret.x + caret.width / 2) //+25 //1.1*caret.x, + 25 added miht be better way to do this
                        .y(caret.y + caret.height / 1.5);
                    const image_placeholder = item.rect(caret.width * 0.6, caret.height * 0.6)
                        .attr({fill: '#ffffff', opacity: 0.5, id: caret.id + '_imgph'}) // '#000000'
                        .move(caret.x + caret.width * 0.2, caret.y);
                    const prefix = 'img/';
                    const image = item.image(prefix + imagePrefix(caret.id) + '.webp') /*.png */
                        .size(caret.width * 0.6, caret.height * 0.6)
                        .attr({id: caret.id + '_img'})
                        .move(caret.x + caret.width * 0.2, caret.y);
                    const rect_disabled_gray = item.rect(caret.width, caret.height).attr({
                        fill: '#000',
                        opacity: 0.2,
                        id: `${caret.id}_disabled_gray`
                    }).move(caret.x, caret.y);
                    // const cross = item.image(prefix + 'cross.png')
                    //     .size(caret.width * 0.7, caret.height * 0.7)
                    //     .attr({id: caret.id + '_x'})
                    //     .addClass('cross')
                    //     .move(caret.x + caret.width * 0.15, caret.y - caret.height * 0.04);
                    // const earlier_age_image = item.image('img/Ages/' + getShieldForEarlierRow(r))
                    //     .size(caret.width * 0.3, caret.height * 0.3)
                    //     .attr({id: caret.id + '_earlier_age_img_' + ageNumber, 'opacity': 0})
                    //     .addClass('earlier-age')
                    //     .move(caret.x + caret.width * 0.85, caret.y - caret.width * 0.15);
                    const overlaytrigger = item.rect(caret.width, caret.height)
                        .attr({id: caret.id + '_overlay'})
                        .addClass('node__overlay')
                        .move(caret.x, caret.y)
                        .data({'type': caret.type.type, 'caret': caret, 'name': caret.name, 'id': caret.id})
                        .mouseover(function () {
                            highlightPath(caret.id);
                        })
                        .mouseout(function () {
                            resetHighlightPath(); 
                        })
                        .click(function () {
                            if (focusedNodeId.id === caret.id) {
                                hideHelp();
                            } else {
                                displayHelp(caret.id);  // this line casues: main.js:310 Uncaught ReferenceError: resetHighlightPath is not defined
                            }
                        });                    
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
            .replace('god_power_', 'god_powers/');
    }

    function highlightPath(caretId) {
        recurse(caretId);

        function recurse(caretId) {
            console.log('RECURSE caretID: ', caretId);
            SVG('#' + caretId).addClass('is-highlight');

            const parentIds = parentConnections.get(caretId);
            if (!parentIds) return;

            for (let parentId of parentIds) {
                const line = SVG(`#connection_${parentId}_${caretId}`);
                if (line) {
                    // Move to the end of the <g> element so that it is drawn on top.
                    // Without this, the line would be highlighted, but other unhighlighted
                    // connection lines could be drawn on top, undoing the highlighting.
                    line.front().addClass('is-highlight');
                }
                recurse(parentId);
            }
        }
    }

    function unhighlightPath(): void { // need to figure out how to remove as any for SVG
        // this thorwing an svg error chrome dev tools ai said it might be becuase of svg version
        // (SVG as any).find('.node.is-highlight, .connection.is-highlight')
        //     .each((el) => {el.removeClass('is-highlight')});

        // const previosulyHighlighted = document.getElementsByClassName('is-highlight');
        // console.log('previosulyHighlighted: ', previosulyHighlighted);
        const previosulyHighlightedArray = Array.from(document.getElementsByClassName('is-highlight'));
        for (let i = 0; i < previosulyHighlightedArray.length; i++) {
            previosulyHighlightedArray[i].classList.remove('is-highlight');
        }
        // previosulyHighlighted && previosulyHighlighted.classList.remove('is-highlight');
        // const previosulyHighlightedAfterArray = Array.from(document.getElementsByClassName('is-highlight'));
    }

    function resetHighlightPath() {
        unhighlightPath();
        if (focusedNodeId.id) {
            highlightPath(focusedNodeId.id);
        }
        // console.log('resetHighlightPath called!!');
    }

    // create_building_index();
    // let civWasLoaded = updateCivselectValue();
    // if(!civWasLoaded){
    //     loadCiv();
    // }
    // create_colour_key();
    // window.onhashchange = function () {
    //     updateCivselectValue();
    // };
    console.log('tree: ', tree);
    console.log(' parentConnections:', parentConnections);
}

// function displayHelp(caretId) {
//     console.log('displayHelp Called!');
//     focusedNodeId.id = caretId;
//     let helptextContent = document.getElementById('helptext__content');
//     let helptextAdvancedStats = document.getElementById('helptext__advanced_stats');
//     let overaly = SVG(`#${caretId}_overlay`);
//     let name = overaly.data('name');
//     let id = overaly.data('id');
//     let caret = overaly.data('caret');
//     let type = overaly.data('type');
//     helptextContent.innerHTML = getHelpText(name, id, type);
//     helptextAdvancedStats.innerHTML = getAdvancedStats(name, id, type);
//     // styleXRefBages(name, id, type);
//     positionHelptext(caret);
//     resetHighlightPath();  // this line casues: main.js:310 Uncaught ReferenceError: resetHighlightPath is not defined
// }

// function hideHelp() {
//     focusedNodeId.id = null;
//     const helptext = document.getElementById('helptext');
//     helptext.style.display = 'none';
//     resetHighlightPath();

//     console.log('hideHelp called!!!');
// }


// console.log('globalData["Throwing Axemen"]: ', globalData["Throwing Axemen"]);

function getHelpText(name, id, type) {
    // console.log('jsonData3: ', jsonData);
    // console.log('globalData from getHelpText: ', jsonData);
    // console.log('id:', id);
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
    const unit_data = jsonData[id]; 
    

    // console.log(newName, 'unit_data: ', unit_data);

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

        console.log('unit_data.Type: ', unit_data.Type)
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
        //need to remove stats string for techs
        if (unit_data.Type === "tech") {
            return `<p>${formatName(unit_data.Name)}</p><p>${cost_heading}${cost_str}</p><p>${descriptionTextBR}</p>`;
        }
        return `<p>${formatName(unit_data.Name)}</p><p>${cost_heading}${cost_str}</p><p>• ${stat_str}</p><p>${descriptionTextBR}</p>`;
    }
    
    return `Example: ${formatName(name)}, ${id}, ${unit_data}`; // ${unit_data.cost}
    // let entitytype = getEntityType(type);
    // const items = id.split('_', 1);
    // id = id.substring(items[0].length + 1);
    // let text = data.strings[data.data[entitytype][id]['LanguageHelpId']];
    // if (text === undefined) {
    //     return '?';
    // }
    // text = text.replace(/\n/g, '');
    // if (type === 'TECHNOLOGY') {
    //     text = text.replace(/(.+?\(.+?\))(.*)/m,
    //         '<p class="helptext__heading">$1</p>' +
    //         '<p class="helptext__desc">$2</p>' +
    //         '<p class="helptext__stats">&nbsp;</p>');
    // } else if (type === 'UNIT' || type === 'UNIQUEUNIT' ) {
    //     text = text.replace(/(.+?\(‹cost›\))(.+?)<i>\s*(.+?)<\/i>(.*)/m,
    //         '<p class="helptext__heading">$1</p>' +
    //         '<p class="helptext__desc">$2</p>' +
    //         '<p class="helptext__upgrade_info"><em>$3</em></p>' +
    //         '<p class="helptext__stats">$4</p>');
    // } else if (type === 'BUILDING') {
    //     // convert the 'Required for' text in <i> to <em> so that it doesn't break the next regex
    //     text = text.replace(/<b><i>(.+?)<\/b><\/i>/m, '<b><em>$1</em></b>');
    //     if (text.indexOf('<i>') >= 0) {
    //         text = text.replace(/(.+?\(‹cost›\))(.+?)<i>\s*(.+?)<\/i>(.*)/m,
    //             '<p class="helptext__heading">$1</p>' +
    //             '<p class="helptext__desc">$2</p>' +
    //             '<p class="helptext__upgrade_info"><em>$3</em></p>' +
    //             '<p class="helptext__stats">$4</p>');
    //     } else {
    //         // Handle certain buildings like Wonders separately as the upgrades text is missing for them.
    //         text = text.replace(/(.+?\(‹cost›\))(.*)<br>(.*)/m,
    //             '<p>$1</p>' +
    //             '<p>$2</p>' +
    //             '<p class="helptext__stats">$3</p>');
    //     }
    // }
    // text = text.replace(/<br>/g, '');
    // if ((type === 'UNIT' || type === 'UNIQUEUNIT') && id in data.data.unit_upgrades) {
    //     text = text.replace(/<p class="helptext__stats">/,
    //         '<h3>Upgrade</h3><p class="helptext__upgrade_cost">' + cost(data.data.unit_upgrades[id].Cost)
    //         + ' (' + data.data.unit_upgrades[id].ResearchTime + 's)<p><p class="helptext__stats">');
    // }
    // let meta = data.data[entitytype][id];
    // if (meta !== undefined) {
    //     let displayAttack = false;
    //     let ranged = meta.Range > 1;
    //     text = text.replace(/‹cost›/, cost(meta.Cost));
    //     // The format is ‹static_cost=Gold,200› as with Spies/Treason.
    //     text = text.replaceAll(/‹static_cost=([^,›]*),([^›]*)›/g, (_, resource, cost) => {
    //       const className = resource.toLowerCase();
    //       return `<span class="cost ${className}" title="${cost} ${resource}">${cost}</span>`;
    //     });
    //     let stats = []
    //     if (text.match(/‹hp›/)) {
    //         stats.push('HP:&nbsp;' + meta.HP);
    //     }
    //     if (text.match(/‹attack›/) && meta.Attack > 0) {
    //         stats.push('Attack:&nbsp;' + meta.Attack);
    //         displayAttack = true;
    //     }
    //     if (text.match(/‹[Aa]rmor›/)) {
    //         stats.push('Armor:&nbsp;' + meta.MeleeArmor);
    //     }
    //     if (text.match(/‹[Pp]iercearmor›/)) {
    //         stats.push('Pierce armor:&nbsp;' + meta.PierceArmor);
    //     }
    //     if (text.match(/‹garrison›/)) {
    //         stats.push('Garrison:&nbsp;' + meta.GarrisonCapacity);
    //     }
    //     if (text.match(/‹range›/) && displayAttack) {
    //         stats.push('Range:&nbsp;' + meta.Range);
    //     }
    //     stats.push(ifDefinedAndGreaterZero(meta.MinRange, 'Min Range:&nbsp;'));
    //     stats.push(ifDefined(meta.LineOfSight, 'Line of Sight:&nbsp;'));
    //     stats.push(ifDefined(meta.Speed, 'Speed:&nbsp;'));
    //     stats.push(secondsIfDefined(meta.TrainTime, 'Build Time:&nbsp;'));
    //     stats.push(secondsIfDefined(meta.ResearchTime, 'Research Time:&nbsp;'));
    //     stats.push(ifDefined(meta.FrameDelay, 'Frame Delay:&nbsp;', ranged));
    //     stats.push(traitsIfDefined(meta.Trait, meta.TraitPiece));
    //     stats.push(ifDefinedAndGreaterZero(meta.MaxCharge, chargeText(meta.ChargeType)));
    //     stats.push(ifDefinedAndGreaterZero(meta.RechargeRate, 'Recharge Rate:&nbsp;'));
    //     stats.push(secondsIfDefined(meta.RechargeDuration, 'Recharge Duration:&nbsp;'));
    //     if (displayAttack) {
    //         stats.push(secondsIfDefined(meta.AttackDelaySeconds, 'Attack Delay:&nbsp;', ranged));
    //         stats.push(secondsIfDefined(meta.ReloadTime, 'Reload Time:&nbsp;'));
    //     }
    //     stats.push(accuracyIfDefined(meta.AccuracyPercent, 'Accuracy:&nbsp;', ranged));
    //     stats.push(repeatableIfDefined(meta.Repeatable));
    //     text = text.replace(/<p class="helptext__stats">(.+?)<\/p>/, '<h3>Stats</h3><p>' + stats.filter(Boolean).join(', ') + '<p>')
    // } else {
    //     console.error('No metadata found for ' + name);
    // }
    // return text;
}

function getAdvancedStats(name, id, type) {
    return 'ADVANCED STATS TEST';

    // let entitytype = getEntityType(type);
    // const items = id.split('_', 1);
    // id = id.substring(items[0].length + 1);
    // let meta = data.data[entitytype][id];
    // let text = ''
    // if (meta !== undefined) {
    //     text += arrayIfDefinedAndNonEmpty(meta.Attacks, '<h3>Attacks</h3>');
    //     text += arrayIfDefinedAndNonEmpty(meta.Armours, '<h3>Armours</h3>');
    // } else {
    //     console.error('No metadata found for ' + name);
    // }
    // return text;
}

// function styleXRefBadges(name, id, type) {
//     for (let civ of Object.keys(data.civ_names)) {
//         let xRefImage = document.getElementById(`xRef__badge__${civ}`);
//         let found = false;
//         // Make sure this civ exists
//         if (civs[civ]) {
//             if (type === 'UNIT' || type === 'UNIQUEUNIT') {
//                 if (civs[civ].units.map((item) => `unit_${item.id}`).includes(id)) {
//                     found = true;
//                 } else if (`unit_${civs[civ]?.unique?.castleAgeUniqueUnit}` === id || `unit_${civs[civ]?.unique?.imperialAgeUniqueUnit}` === id) {
//                     found = true;
//                 }
//             } else if (type === 'TECHNOLOGY') {
//                 if (civs[civ].techs.map((item) => `tech_${item.id}`).includes(id)) {
//                     found = true;
//                 } else if (`tech_${civs[civ]?.unique?.castleAgeUniqueTech}` === id || `tech_${civs[civ]?.unique?.imperialAgeUniqueTech}` === id) {
//                     found = true;
//                 }
//             } else if (type === 'BUILDING') {
//                 if (civs[civ].buildings.map((item) => `building_${item.id}`).includes(id)) {
//                     found = true;
//                 }
//             }
//         }
//         if (found) {
//             xRefImage.style.opacity = '1.0';
//         } else {
//             xRefImage.style.opacity = '0.2';
//         }
//     }
// }

function positionHelptext(caret) {
    const helptext = document.getElementById('helptext');
    helptext.style.display = 'block';
    positionHelptextBelow(caret, helptext)
    || positionHelptextAbove(caret, helptext)
    || positionHelptextToLeftOrRight(caret, helptext);

    console.log('window.getComputedStyle(helptext).position: ', window.getComputedStyle(helptext).position);
    console.log('window.getComputedStyle("techtree").position: ', window.getComputedStyle(document.getElementById('techtree')).position);
}

function positionHelptextBelow(caret, helptext) {
    let top = caret.y + caret.height + document.getElementById('root').getBoundingClientRect().top;
    let helpbox = helptext.getBoundingClientRect();
    if (top + helpbox.height > tree.height) {
        return false;
    }

    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('techtree');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = techtree.scrollLeft;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
    return true;
}

function positionHelptextAbove(caret, helptext) {
    let helpbox = helptext.getBoundingClientRect();
    let top = caret.y - helpbox.height + document.getElementById('root').getBoundingClientRect().top;
    if (top < 0) {
        return false;
    }

    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('techtree');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = techtree.scrollLeft;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
    return true;
}

function positionHelptextToLeftOrRight(caret, helptext) {
    let helpbox = helptext.getBoundingClientRect();
    let top = 0;
    let destX = caret.x - helpbox.width;
    let techtree = document.getElementById('techtree');
    if (destX < 0 || destX - techtree.scrollLeft < 0) {
        destX = caret.x + caret.width;
    }
    helptext.style.top = top + 'px';
    helptext.style.left = destX + 'px';
}


setTimeout(displayData, 50);
// console.log('tree: ', tree);
console.log('window.innerHeight: ', window.innerHeight);
console.log('window.innerWidth: ', window.innerWidth);

//26616px

// console.log('tree: ', tree);
// console.log('tree.offsetHeight: ', tree.offsetHeight);
// console.log('tree.clientHeight: ', tree.clientHeight);

// let techTree = document.getElementById('techtree');
// console.log('techTree: ', techTree);
// console.log('techTree.offsetHeight: ', techTree.offsetHeight);
// console.log('techTree.clientHeight: ', techTree.clientHeight);

// tree.height = techTree.clientHeight;

// console.log('tree: ', tree);
// console.log('tree.offsetHeight: ', tree.offsetHeight);
// console.log('tree.clientHeight: ', tree.clientHeight);

// function sum(a, b) {
//     return a + b;
// }

// // export {sum};
// module.exports = sum;


