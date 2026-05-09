// import dataImp from './data.json' assert { type: 'json' };
import { getDefaultTree, getConnections, getConnectionPoints, CARET_TYPES, formatName, BONUS_MULTIPLIER_CLASSES, BONUS_MULTIPLIER_DISPLAY_STR, SELECTED_MAJOR_GOD_ID } from "./techtree.js";
// import { SVG } from "@svgdotjs/svg.js";
// import { SVG } from '../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js';
import { SVG } from '@svgdotjs/svg.js';
import { setMajorGod } from "./majorGodSelection.js";
import jsonData from '../data.json' with { type: 'json' };
import { LOKI, ZEUS } from "./units.js";
import { minorGodLaneMatrices } from "./minorGodLaneMatrices.js";
// console.log('jsonData: ', jsonData);
// import jsonData from '../data.json' with { type: 'json' };
// console.log('jsonData: ', jsonData);
console.log('SELECTED_MAJOR_GOD_ID.id: ', SELECTED_MAJOR_GOD_ID.id);
console.log('minorGodLaneMatrices[jsonData[(SELECTED_MAJOR_GOD_ID.id)].Name][0][0] : ', minorGodLaneMatrices[jsonData[(SELECTED_MAJOR_GOD_ID.id)].Name][0][0]);
const sampleGodPowerCaretId = minorGodLaneMatrices[jsonData[(SELECTED_MAJOR_GOD_ID.id)].Name][0][0].id;
console.log('sampleGodPowerCaretId: ', sampleGodPowerCaretId);
const sampleMinorGodCaret2 = document.getElementById('god_power_791_SP_bg');
console.log('sampleMinorGodCaret2: ', sampleMinorGodCaret2);
const sampleMinorGodCaret = document.getElementById(`god_power_${sampleGodPowerCaretId}_SP_bg`);
console.log('sampleMinorGodCaret: ', sampleMinorGodCaret);
export const sidePanel = document.getElementById('side_panel');
// console.log('dataImp: ', dataImp);
// console.log('sidePanel: ', sidePanel);
//ratio sidePanel width to it's height: w / h = 1100 / 594;
// sidePanel.style.width = '1043.04px'; //3 * 347.6
// sidePanel.style.minWidth = '1043.04px';
// to acommadate an 8th caret in minor god details tree
// sidePanel.style.width = '1100px'; //3 * 347.6
// sidePanel.style.minWidth = '1100px'; // 385 + 581.234 = 966.234px;
//sidepanel width
// side_panel__minor_gods width: 65%
// side_panel__major_god_description width: 35%
// *^*
// sidePanel.style.width = `${sidePanel.clientHeight * (996 / 594)}px`;
// sidePanel.style.minWidth = `${sidePanel.clientHeight * (996 / 594)}px`;
// sidePanel.style.height = '400px';
// console.log('sidePanel.style.width: ', sidePanel.style.width);
// console.log('sidePanel.style.height: ', sidePanel.style.height);
// console.log('sidePanel.style.offsetHeight: ', sidePanel.offsetHeight);
// console.log('sidePanel.style.clientHeight: ', sidePanel.clientHeight);
const sidePanelMajorGodDescription = document.getElementById('side_panel__major_god_description');
let majorGodHeadingName;
let majorGodHeadingSubHeading;
let majorGodArtWork;
let dataLoaded = false;
export function updateMajorGodDisplayDetails() {
    const helptext_SP = document.getElementById('helptext_SP');
    helptext_SP.style.display = 'none';
    const helptext = document.getElementById('helptext');
    helptext.style.display = 'none';
    const root_artwork = document.getElementById('root_artwork');
    if (root_artwork) {
        // console.log('root_artwork: ', root_artwork);
        document.getElementById('side_panel__major_god_description__artwork').removeChild(root_artwork);
    }
    sidePanelMajorGodDescription.style.height = sidePanel.clientHeight + 'px';
    // console.log('sidePanelMajorGodDescription.style.height: ', sidePanelMajorGodDescription.style.height);
    // console.log('sidePanelMajorGodDescription.style.clientHeight: ', sidePanelMajorGodDescription.clientHeight);
    const headingsDiv = document.getElementById('side_panel__major_god_description__headings');
    // headingsDiv.innerHTML = `<h1>ODIN$</h1>` + '<h3>GOD OF WAR, MAGIC AND POWER</h3>';
    // console.log('SELECTED_MAJOR_GOD_ID: ', SELECTED_MAJOR_GOD_ID, 'typeof(SELECTED_MAJOR_GOD_ID): ', typeof(SELECTED_MAJOR_GOD_ID));
    // console.log('typeof(SELECTED_MAJOR_GOD_ID.toString()): ', typeof(SELECTED_MAJOR_GOD_ID.toString()));
    // console.log('jsonData: ', jsonData);
    const majorGodData = jsonData[SELECTED_MAJOR_GOD_ID.id];
    headingsDiv.innerHTML = `<h1>${majorGodData.Name.toUpperCase()}</h1>` + `<h3>${majorGodData.God_Of}</h3>`;
    // artwork dims w: 1000, h: 1185
    const artworkDiv = document.getElementById('side_panel__major_god_description__artwork');
    // const ARTWORK_HEIGHT = 300; // 400 for my UW 34in monitor // old hardcoded: 300px
    // const ARTWORK_WIDTH = ARTWORK_HEIGHT * (1000 / 1185); //raw artwork dims w:1000px, h:1185px; 
    const majorGodSelectionPanel = document.getElementById('side_panel__major_god_description');
    const artworkHeight = `${majorGodSelectionPanel.clientHeight / 2}px`;
    const artworkWidth = `${majorGodSelectionPanel.clientHeight / 2 * (1000 / 1185)}px`;
    const artworkWidthNum = Number(artworkWidth);
    console.log('%^% artworkWidth: ', artworkWidth);
    sidePanelMajorGodDescription.style.minWidth = String(Number(artworkWidth.slice(0, -2)) * (1 / 0.8)) + 'px';
    sidePanelMajorGodDescription.style.width = String(Number(artworkWidth.slice(0, -2)) * (1 / 0.8)) + 'px';
    console.log('%^% typeof(artworkWidth):', typeof (artworkWidth));
    console.log('%^% typeof(artworkWidthNum):', typeof (artworkWidthNum));
    console.log('%^% artworkWidthNum: ', artworkWidthNum);
    console.log("%^% String(artworkWidthNum * (1 / 0.8)) + 'px':", String(artworkWidthNum * (1 / 0.8)) + 'px');
    console.log('majorGodSelectionPanel.clientHeight: ', majorGodSelectionPanel.clientHeight);
    console.log('artworkHeight: ', artworkHeight);
    console.log('artworkWidth: ', artworkWidth);
    const windowHeightInner = window.innerHeight;
    const windowWidthInner = window.innerWidth;
    const documentClientHeight = document.documentElement.clientHeight;
    const documentClientWidth = document.documentElement.clientWidth;
    console.log('MGD / MGS - documentClientHeight: ', documentClientHeight);
    console.log('MGD / MGS - documentClientWidth: ', documentClientWidth);
    console.log('MGD / MGS - windowHeightInner: ', windowHeightInner);
    console.log('MGD / MGS - windowWidthInner: ', windowWidthInner);
    const sidePanelClientHeight = sidePanel.clientHeight;
    const sidePanelClientWidth = sidePanel.clientWidth;
    console.log('MGD / MGS - sidePanelClientHeight: ', sidePanelClientHeight);
    console.log('MGD / MGS - sidePanelClientWidth: ', sidePanelClientWidth);
    // making the major-god-detail scale with screen size
    const majorGodDetailsDiv = document.getElementById('side_panel__major_god_description');
    console.log('MGD / MGS - majorGodDetailsDiv.clientHeight: ', majorGodDetailsDiv.clientHeight);
    console.log('MGD / MGS - Before majorGodDetailsDiv.clientWidth: ', majorGodDetailsDiv.clientWidth);
    majorGodDetailsDiv.style.width = `${Number(artworkWidth) * 2}px`;
    console.log('MGD / MGS - After majorGodDetailsDiv.clientWidth: ', majorGodDetailsDiv.clientWidth);
    artworkDiv.style.height = artworkHeight;
    artworkDiv.style.width = artworkWidth; // '253.165px'// 300 * (1000/1185) 
    const draw = SVG().addTo('#side_panel__major_god_description__artwork').id('root_artwork');
    draw.size(artworkWidth, artworkHeight);
    const item = draw.group().attr({ id: 'major_god_artwork' });
    // const image = item.image('img/odin_artwork.webp') /*.png */
    const image = item.image(`img/major_gods_artwork/${SELECTED_MAJOR_GOD_ID.id}.webp`) /*.png */
        .size(artworkWidth, artworkHeight) // (width, height)
        .id('major_god_artwork_img');
    // // artwork dims w: 1000, h: 1185
    // const artworkDiv = document.getElementById('side_panel__major_god_description__artwork');
    // const ARTWORK_HEIGHT = 300; // 400 for my UW 34in monitor
    // const ARTWORK_WIDTH = ARTWORK_HEIGHT * (1000 / 1185); //raw artwork dims w:1000px, h:1185px;
    // artworkDiv.style.height = `${ARTWORK_HEIGHT}px`; 
    // artworkDiv.style.width = `${ARTWORK_WIDTH}px`; // '253.165px'// 300 * (1000/1185)
    // const ODIN_MG_BONUS_TEXT = `
    //     <b><p>Focus: Great Hall units.</p></b> 
    //     <p>• Gathers and Dwarves hunt 10% faster.</p> 
    //     <p>• Great Hall units generate +25% Favor in battle.</p> 
    //     <p>• Human units and heros regenerate 0.4 hitpoints/second.</p> 
    //     <p>• 2 Raven scouts spawn once the first Temple is buit,</p> 
    //     <p>and respawn a short time after being killed.</p> 
    //     `;
    const descriptionBulletPoints = majorGodData.Description.split('•');
    descriptionBulletPoints.shift();
    const descriptionDiv = document.getElementById('side_panel__major_god_description__bonus-details');
    // descriptionDiv.innerHTML = `<h4>${ODIN_MG_BONUS_TEXT}</h4>`;
    // descriptionDiv.innerHTML = `<h4>${majorGodData.Focus}</h4><h4>${majorGodData.Description}</h4>`;
    descriptionDiv.innerHTML = `<b><p>${majorGodData.Focus}</p></b><ul id="side_panel__major_god_description__bonus-details_list"></ul>`;
    const descriptionDivList = document.getElementById('side_panel__major_god_description__bonus-details_list');
    // for(let i = 0; i < descriptionBulletPoints.length; i++){
    //     descriptionDiv.innerHTML += `<p>• ${descriptionBulletPoints[i]}</p>`;
    // }
    for (let i = 0; i < descriptionBulletPoints.length; i++) {
        descriptionDivList.innerHTML += `<li>${descriptionBulletPoints[i]}</li>`;
    }
}
// function displayUpdatedMajorGodDetails() {}
if (!SELECTED_MAJOR_GOD_ID) {
    SELECTED_MAJOR_GOD_ID.id = LOKI.id;
}
function printSelectedMajorGodId() {
    console.log(' setTimeout, SELECTED_MAJOR_GOD_ID: ', SELECTED_MAJOR_GOD_ID);
    let selectedMajorGodPortraitG = document.getElementById(`major_god_${SELECTED_MAJOR_GOD_ID.id}`);
}
setTimeout(printSelectedMajorGodId, 40);
setTimeout(updateMajorGodDisplayDetails, 50);
setTimeout(setMajorGod, 50, [SELECTED_MAJOR_GOD_ID.id]);
// printSelectedMajorGodId();
// updateMajorGodDisplayDetails();
// setMajorGod(SELECTED_MAJOR_GOD_ID.id);
//# sourceMappingURL=majorGodDetails.js.map