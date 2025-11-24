// import dataImp from './data.json' assert { type: 'json' };

const sidePanel = document.getElementById('side_panel');
// console.log('dataImp: ', dataImp);
// console.log('sidePanel: ', sidePanel);

sidePanel.style.width = '1043.04px'; //3 * 347.6
sidePanel.style.minWidth = '1043.04px';
// sidePanel.style.height = '400px';
// console.log('sidePanel.style.width: ', sidePanel.style.width);
// console.log('sidePanel.style.height: ', sidePanel.style.height);
// console.log('sidePanel.style.offsetHeight: ', sidePanel.offsetHeight);
// console.log('sidePanel.style.clientHeight: ', sidePanel.clientHeight);

const sidePanelMajorGodDescription = document.getElementById('side_panel__major_god_description');

let majorGodHeadingName
let majorGodHeadingSubHeading
let majorGodArtWork
let dataLoaded = false;

function updateMajorGodDisplayDetails() {
    // if (globalJsonData === null) {
    //     console.log('globalJsonData === null entered!!')
    //     // loadJsonData();
    //     // setTimeout(printJsondata, 500);
    //     // while (globalJsonData === null) {
    //     //     console.log('while loop running!!!');   
    //     // }
    // } 
    // const major_god_artwork_img = document.getElementById('major_god_artwork_img');
    // if(major_god_artwork_img) {
    //     document.getElementById('major_god_artwork').removeChild(major_god_artwork_img);
    // }

    // const side_panel__major_god_description__artwork = document.getElementById('side_panel__major_god_description__artwork');
    // if(side_panel__major_god_description__artwork) {
    //     document.getElementById('side_panel__major_god_description').removeChild(side_panel__major_god_description__artwork);
    // }

    const root_artwork = document.getElementById('root_artwork');
    if(root_artwork) {
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
    // console.log('globalJsonData: ', globalJsonData);

    const majorGodData = globalJsonData[SELECTED_MAJOR_GOD_ID];

    headingsDiv.innerHTML = `<h1>${majorGodData.Name.toUpperCase()}</h1>` + `<h3>${majorGodData.Focus}</h3>`;

    // artwork dims w: 1000, h: 1185
    const artworkDiv = document.getElementById('side_panel__major_god_description__artwork');
    const ARTWORK_HEIGHT = 300; // 400 for my UW 34in monitor
    const ARTWORK_WIDTH = ARTWORK_HEIGHT * (1000 / 1185); //raw artwork dims w:1000px, h:1185px;
    artworkDiv.style.height = `${ARTWORK_HEIGHT}px`; 
    artworkDiv.style.width = `${ARTWORK_WIDTH}px`; // '253.165px'// 300 * (1000/1185) 

    const draw = SVG().addTo('#side_panel__major_god_description__artwork').id('root_artwork');
    draw.size(ARTWORK_WIDTH, ARTWORK_HEIGHT)
    const item = draw.group().attr({id: 'major_god_artwork'});
    // const image = item.image('img/odin_artwork.webp') /*.png */
    const image = item.image(`img/major_gods_artwork/${SELECTED_MAJOR_GOD_ID}.webp`) /*.png */
                        .size(ARTWORK_WIDTH, ARTWORK_HEIGHT) // (width, height)
                        .id('major_god_artwork_img');

    // // artwork dims w: 1000, h: 1185
    // const artworkDiv = document.getElementById('side_panel__major_god_description__artwork');
    // const ARTWORK_HEIGHT = 300; // 400 for my UW 34in monitor
    // const ARTWORK_WIDTH = ARTWORK_HEIGHT * (1000 / 1185); //raw artwork dims w:1000px, h:1185px;
    // artworkDiv.style.height = `${ARTWORK_HEIGHT}px`; 
    // artworkDiv.style.width = `${ARTWORK_WIDTH}px`; // '253.165px'// 300 * (1000/1185)

    const ODIN_MG_BONUS_TEXT = `
        <b><p>Focus: Great Hall units.</p></b> 
        <p>• Gathers and Dwarves hunt 10% faster.</p> 
        <p>• Great Hall units generate +25% Favor in battle.</p> 
        <p>• Human units and heros regenerate 0.4 hitpoints/second.</p> 
        <p>• 2 Raven scouts spawn once the first Temple is buit,</p> 
        <p>and respawn a short time after being killed.</p> 
        `;

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
    for(let i = 0; i < descriptionBulletPoints.length; i++){
        descriptionDivList.innerHTML += `<li>${descriptionBulletPoints[i]}</li>`;
    }
}

function displayUpdatedMajorGodDetails() {}

setTimeout(updateMajorGodDisplayDetails, 50);




