import { sidePanel } from "./majorGodDetails.js";
import { AGE_IMAGES } from "./main.js";
// import { SVG } from "@svgdotjs/svg.js";
// import { SVG } from '../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js';
import { SVG } from '@svgdotjs/svg.js';
// const sidePanel = document.getElementById('side_panel');
const sidePanelMinorGods = document.getElementById('side_panel__minor_gods');
console.log(' AGE ICONS - sidePanel.clientHeight: ', sidePanel.clientHeight);
sidePanelMinorGods.style.height = sidePanel.clientHeight + 'px';
// Add Age Icons
// let icon_height = Math.min(row_height / 2, 112);
// let icon_width = 112;
// let vertical_spacing_1_4 = (row_height2 - icon_height) / 2 - 10; // -10
// let vertical_spacing_2 = (row_height2 - icon_height) / 2 - 25;
// let vertical_spacing_3 = (row_height3 - icon_height) / 3 -25; // -10, NEED TO REVISE AND REFACTOR THIS
// let margin_left = 20;
let image_urls = AGE_IMAGES;
console.log('image_urls: ', image_urls);
// let age_names = ['Archaic Age', 'Classical Age', 'Heroic Age', 'Mythic Age'];
// let vert_spacing_list = [vertical_spacing_1_4, vertical_spacing_2, vertical_spacing_3, vertical_spacing_1_4];
// const age_icons_container = document.getElementById('side_panel__minor_gods__age_icons');
// console.log('AIC* age_icons_container.offsetHeight: ', age_icons_container.offsetHeight)
// const drawAge = SVG().addTo('#side_panel__minor_gods__age_icons').id('root__age_icons');
// let age_icons_container_height = age_icons_container.offsetHeight;
// let age_icons_container_width = age_icons_container.offsetWidth;
// let age_icons_container_width_client = age_icons_container.clientWidth;
// console.log('AIC* age_icons_container_height: ', age_icons_container_height);
// console.log('AIC* age_icons_container_width: ', age_icons_container_width);
// console.log('AIC* age_icons_container_width: ', age_icons_container_width_client);
// // root__age_icons.style.height = age_icons_container_height + 'px';
// // root__age_icons.style.width = age_icons_container_width + 'px';
// window.onload = () => {
setTimeout(() => {
    const age_icons_container = document.getElementById('side_panel__minor_gods__age_icons');
    console.log('AIC* age_icons_container.offsetHeight: ', age_icons_container.offsetHeight);
    const drawAge = SVG().addTo('#side_panel__minor_gods__age_icons').id('root__age_icons');
    let age_icons_container_height = age_icons_container.offsetHeight;
    let age_icons_container_width = age_icons_container.offsetWidth;
    let age_icons_container_width_client = age_icons_container.clientWidth;
    console.log('AIC* age_icons_container_height: ', age_icons_container_height);
    console.log('AIC* age_icons_container_width: ', age_icons_container_width);
    console.log('AIC* age_icons_container_width: ', age_icons_container_width_client);
    // root__age_icons.style.height = age_icons_container_height + 'px';
    // root__age_icons.style.width = age_icons_container_width + 'px';
    const el = document.querySelector('#side_panel__minor_gods__age_icons');
    console.log('AIC* el.getBoundingClientRect().width: ', el.getBoundingClientRect().width); // Should show ~80px
    // };
    // let row_height = 0;
    let margin_left = age_icons_container_width * 0.1;
    let margin_top = age_icons_container_height * 0.025;
    let space_between = age_icons_container_height * 0.28;
    let image_width = age_icons_container_width * 0.8;
    let image_height = image_width;
    console.log('AIC* AGE_IMG image_urls', image_urls);
    for (let i = 0; i < image_urls.length; i++) {
        let age_image_group = drawAge.group();
        let age_image = age_image_group.image('img/ages/' + image_urls[i])
            .size(image_width, image_height)
            .x(margin_left)
            .y(space_between * i + margin_top); //vertical_spacing
    }
    const age_icons_svg_sp = document.getElementById('root__age_icons');
    age_icons_svg_sp.style.height = age_icons_container_height + 'px';
    //     age_image_group
    //         .text(age_names[i])
    //         .font({size: 16, weight: 'bold'}) /* Text-anchor: middle does not work */
    //         .cx(icon_width / 2 + margin_left)
    //         .y(age_image.attr('y') + age_image.attr('height') + 5);
    //     // console.log('age logo added');
    // }
}, 50);
// };
//# sourceMappingURL=ageIconsSidePanel.js.map