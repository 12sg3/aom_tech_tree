let tree
let data = {};
let civs = {};
let connections;
let parentConnections;
let connectionpoints;
let focusNodeId = null;

// import '/js/techtree.js'

treeDims = {
    width: 2000,
    height: 250,
}

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

testCrossFileSharing();

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
function getAgeNumber(row) {
    return 1;
}

//ToDo see if this code works via trial and error, re-write as needed
// console.log('tree.lanes: ', tree.lanes);
function displayData() {
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
    console.log('connectionpoints**: ', connectionpoints);

function hideHelp() {
    // focusedNodeId = null;
    // const helptext = document.getElementById('helptext');
    // helptext.style.display = 'none';
    // resetHighlightPath();

    console.log('hideHelp called!!!');
}

// tree.width is set by tree.UpdatePositions in getDefaultTree 

// console.log('tree.width: ', tree.width, 'tree.height: ', tree.height);
// console.log('tree.width: ', tree.width);
// console.log('tree.height: ', tree.height);

    const draw = SVG().addTo('#techtree').id('root').size(tree.width * 10, tree.height)
        .click((e) => {
            if (e.target.id === 'root') {
                hideHelp();
            }
        });

    // console.log('draw.width: ', draw.width());

    document.getElementById('techtree').onclick = (e) => {
        if (e.target.id === 'techtree') {
            hideHelp();
        }
    };

    // Draw Age Row Highlighters
    let row_height = tree.height / 4;
    draw.rect(tree.width * 10, row_height).attr({fill: '#4d3617', opacity:0.3}).click(hideHelp);
    draw.rect(tree.width * 10, row_height).attr({fill: '#4d3617', opacity:0.3}).click(hideHelp).y(row_height * 2);

    // Add Age Icons
    let icon_height = Math.min(row_height / 2, 112);
    let icon_width = 112;
    let vertical_spacing = (row_height - icon_height) / 2 - 10;
    let margin_left = 20;
    let image_urls = AGE_IMAGES;
    let age_names = ['Archaic Age', 'Classical Age', 'Heroic Age', 'Mythic Age'];
    
    for (let i = 0; i < image_urls.length; i++) {
        let age_image_group = draw.group().click(hideHelp);
        let age_image = age_image_group.image('images/ages/' + image_urls[i])
            .size(icon_width, icon_height)
            .x(margin_left)
            .y(row_height * i + vertical_spacing);

        age_image_group
            .text(age_names[i])
            .font({size: 16, weight: 'bold'}) /* Text-anchor: middle does not work */
            .cx(icon_width / 2 + margin_left)
            .y(age_image.attr('y') + age_image.attr('height') + 5);

        // console.log('age logo added');
    }

    test_unit_images = ['images/norse/AoMR_Ballista_icon.webp', 'images/norse/AoMR_Berserk_icon.webp', 'images/norse/AoMR_Caravan_Norse_icon.webp', 'images/norse/AoMR_Champion_Cavalry_icon.webp', 'images/norse/AoMR_Hirdman_icon.webp', 'images/norse/AoMR_Kraken_icon.webp', 'images/norse/AoMR_Stone_Wall_Norse_icon.webp'];

    for (let i = 0; i < test_unit_images.length; i++) {
        let unit_image_group = draw.group().click(hideHelp);
        let unit_image = unit_image_group.image(test_unit_images[i])
            .size(icon_width, icon_height)
            .x(margin_left * 2  + icon_width + icon_width * i)
            .y(vertical_spacing);

        unit_image_group.text(test_unit_images[i].slice(18).slice(0, -10).replace(/_/g, ' ')) // .replace('_', ' ') -> only does the first instance of '_', .replace(/_/g, ' ') -> using regex replaces all instances of '_' 
            .font({size: 8, weight: 'bold'})
            .cx(3 * icon_width / 4 + margin_left + icon_width + icon_width * i)
            .y(unit_image.attr('y') + unit_image.attr('height') + 5);
    }

    console.log('connectionpoints: ', connectionpoints);
    const connectionGroup = draw.group().attr({id: 'connection_lines'});
    for (let connection of connections) {
        let from = connectionpoints.get(connection[0]);
        let to = connectionpoints.get(connection[1]);
        console.log('connection: ', connection);
        console.log('from: ', from);
        console.log('to: ', to, 'to.x: ', to.x);
        let intermediate_height = from.y + (tree.element_height * 2 / 3);
        connectionGroup.polyline([from.x, from.y, from.x, intermediate_height, to.x, intermediate_height, to.x, to.y])
            .attr({id: `connection_${connection[0]}_${connection[1]}`})
            .addClass('connection')
            .click(hideHelp);
    }

    console.log('connectionGroup', connectionGroup);

    for (let lane of tree.lanes) {
        draw.rect(lane.width + 10, tree.height)
            .attr({fill: '#ffeeaa', 'opacity': 0, class: lane.caretIds().map((id) => `lane-with-${id}`)})
            .move(lane.x - 10, lane.y)
            .click(hideHelp);
        for (let r of Object.keys(lane.rows)) {
            let row = lane.rows[r];
            const ageNumber = getAgeNumber(r);
            for (let caret of row) {
                const item = draw.group().attr({id: caret.id}).addClass('node');
                const rect = item.rect(caret.width, caret.height).attr({
                    fill: caret.type.colour,
                    id: `${caret.id}_bg`
                }).move(caret.x, caret.y);
                let name = formatName(caret.name);
                // let name = caret.name;
                // console.log('name.toString(): ', name.toString(), typeof(name.toString()));
                // console.log("name.toString().replace(/_/g, ' '): ", name.toString().replace(/_/g, ' '), typeof(name.toString()));
                // const text = item.text(name.toString().replace(/_/g, ' '))
                // console.log('name: ', name);
                const text = item.text(name)
                    .font({size: 7, weight: 'bold'})
                    .attr({fill: '#000000', opacity: 0.95, 'text-anchor': 'middle', id: caret.id + '_text'})
                    .cx(caret.x + caret.width / 2 +25) //1.1*caret.x, + 25 added miht be better way to do this
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
                // const overlaytrigger = item.rect(caret.width, caret.height)
                //     .attr({id: caret.id + '_overlay'})
                //     .addClass('node__overlay')
                //     .move(caret.x, caret.y)
                //     .data({'type': caret.type.type, 'caret': caret, 'name': caret.name, 'id': caret.id});
                    // .mouseover(function () {
                    //     highlightPath(caret.id);
                    // })
                    // .mouseout(function () {
                    //     resetHighlightPath();
                    // })
                    // .click(function () {
                    //     if (focusedNodeId === caret.id) {
                    //         hideHelp();
                    //     } else {
                    //         displayHelp(caret.id);
                    //     }
                    // });
            }
        }
    }

    function imagePrefix(name) {
        return name.replace('_copy', '')
            .replace('building_', 'Buildings/')
            .replace('unit_', 'Units/')
            .replace('tech_', 'Tech/');
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
}

displayData();
// console.log('tree: ', tree);