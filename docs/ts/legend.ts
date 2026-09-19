import { CARET_TYPES } from "./techtree.js";

const COST_ICONS = [
    'wood',
    'food',
    'gold',
    'favor',
    'pop',
    'training_time'
]

const STATS_ICONS = [
    'hitpoints',
    'hack_armor',
    'pierce_armor',
    'crush_armor',
    'velocity',
    'hack_damage',
    'pierce_damage',
    'divine_damage',
    'crush_damage',
    'rate_of_fire',
    'bonus_multiplier_mythunit',
    'bonus_multiplier_hero',
    'bonus_multiplier_infantry',
    'bonus_multiplier_building',
    'bonus_multiplier_ship',
    'bonus_multiplier_cavalry',
    'bonus_multiplier_archer',
    'bonus_multiplier_villager',
    // 'bonus_multiplier_archer_ship',
    'bonus_multiplier_archership',
    'bonus_multiplier_tower',
    'bonus_multiplier_ox_cart',
    'bonus_multiplier_titan',
    'range',
    'recharge_time',
]

const legendItemsDiv = document.getElementById('legend-items__container');
const legendContainerdiv = document.getElementById('legend-button-container__fixed');
const legendItemsDivLeft = document.createElement('div');
const legendItemsDivCenter = document.createElement('div');
const legendItemsDivRight = document.createElement('div');

// 587px

// cost_str += `<span class="cost food " title="${unit_data.Food_Cost} Food">${unit_data.Food_Cost}</span> `;

// add i.e. movement speed to velocity 

const legendItemsTotalCount = Object.keys(CARET_TYPES).length + COST_ICONS.length + STATS_ICONS.length - 1;
let legendItemsAddedCount = 0;
const legendItemsCountOneThird = legendItemsTotalCount / 3; 
console.log('UIU legendItemsTotalCount: ', legendItemsTotalCount); // 37
console.log('UIU legendItemsCountOneThird: ', legendItemsCountOneThird); // 12.333

for (const caret_type in CARET_TYPES) {
    if (caret_type === 'BLANK') {
        continue;
    }
    // console.log('UIU', caret_type);
    // console.log('UIU', CARET_TYPES[caret_type]);
    // lengendItemsDiv.innerHTML += `<br> ${CARET_TYPES[caret_type].name}`;
    const newCaretTypeContainerDiv = document.createElement('div');
    // const newCaretColourDiv = document.createElement('div');
    newCaretTypeContainerDiv.classList.add('legend-item');

    const caretSquareDiv = document.createElement('div');


    caretSquareDiv.style.width = '15px';
    caretSquareDiv.style.height = '15px';
    // caretSquareDiv.style.backgroundColor = 'red';
    caretSquareDiv.style.backgroundColor = `${CARET_TYPES[caret_type]['colour']}`;
    caretSquareDiv.style.marginRight = '5px';

    newCaretTypeContainerDiv.append(caretSquareDiv);
    // newCaretTypeContainerDiv.innerHTML = `<div>${CARET_TYPES[caret_type].name.replaceAll('_', ' ')}</div>`;
    const caretTypeTextdiv = document.createElement('div');
    caretTypeTextdiv.innerHTML = `${CARET_TYPES[caret_type].name.replaceAll('_', ' ')}`;
    newCaretTypeContainerDiv.append(caretTypeTextdiv);
    
    if (legendItemsAddedCount < legendItemsCountOneThird) {
        legendItemsDivLeft.appendChild(newCaretTypeContainerDiv);
    } else if (legendItemsAddedCount < legendItemsCountOneThird * 2) {
        legendItemsDivCenter.appendChild(newCaretTypeContainerDiv); 
    } else {
        legendItemsDivRight.appendChild(newCaretTypeContainerDiv);
    }
    legendItemsAddedCount++;
    
    // legendItemsDiv.append() //


    let curDivHeight = legendContainerdiv.offsetHeight;
    console.log('UIU divheight', curDivHeight);

}


for (const cost_icon_name of COST_ICONS) {
    const newLegendIconDiv = document.createElement('div');
    newLegendIconDiv.innerHTML += `<span class="cost ${cost_icon_name}" title="${cost_icon_name} Cost">${cost_icon_name.replaceAll('_', ' ')}</span>`;
    if (legendItemsAddedCount < legendItemsCountOneThird) {
        legendItemsDivLeft.appendChild(newLegendIconDiv);
    } else if (legendItemsAddedCount < legendItemsCountOneThird * 2) {
        legendItemsDivCenter.appendChild(newLegendIconDiv); 
    } else {
        legendItemsDivRight.appendChild(newLegendIconDiv);
    }
    legendItemsAddedCount++;
    
} 

// stat_str += `<span class="stat hitpoints" title="${unit_data.Hitpoints} Hitpoints"> ${unit_data.Hitpoints}, </span>`;

for (const stat_icon_name of STATS_ICONS) {
    const newLegendIconDiv = document.createElement('div');
    newLegendIconDiv.innerHTML += `<span class="stat ${stat_icon_name}" title="${stat_icon_name}">   ${stat_icon_name.replaceAll('_', ' ')}</span>`;
    if (legendItemsAddedCount < legendItemsCountOneThird) {
        legendItemsDivLeft.appendChild(newLegendIconDiv);
    } else if (legendItemsAddedCount < legendItemsCountOneThird * 2) {
        legendItemsDivCenter.appendChild(newLegendIconDiv); 
    } else {
        legendItemsDivRight.appendChild(newLegendIconDiv);
    }
    legendItemsAddedCount++;
}

legendItemsDiv.appendChild(legendItemsDivLeft);
legendItemsDiv.appendChild(legendItemsDivCenter);
legendItemsDiv.appendChild(legendItemsDivRight);

const legendButton = document.getElementById('legend-button');

    legendButton.onclick = (e) => {
        e.preventDefault();
        const screenHeight = document.querySelector('body').offsetHeight;
        console.log('UIU screenHeight: ', screenHeight);
    
        if (legendButton.getAttribute('data-state') == 'hidden') {
            legendButton.setAttribute('data-state', 'displayed');
            // legendItemsDiv.style.display = 'block';
            legendItemsDiv.style.display = 'grid';
            legendItemsDiv.style.pointerEvents = 'auto';
        } else {
            legendButton.setAttribute('data-state', 'hidden')
            legendItemsDiv.style.display = 'none';
            legendItemsDiv.style.pointerEvents = 'none';
        } 
    }