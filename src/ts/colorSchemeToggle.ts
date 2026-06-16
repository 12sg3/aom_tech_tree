const colorSchemeCheckboxEl = document. getElementById('darkmode-toggle') as HTMLInputElement;
const colorSchemeModeLabelToggle =  document.getElementById('darkmode-toggle-label');
const techTreeMain = document.getElementById('techtree');
const majorGodSelectionPanelEl = document.getElementById('major_god_selection_panel__sticky');
const majorGodDescriptionEl = document.getElementById('side_panel__major_god_description');

const sidePanelMinorGods = document.getElementById('side_panel__minor_gods');

const LIGHT_SCHEME_TEXT_COLOR = 'rgb(16, 16, 16)';
const DARK_SCHEME_TEXT_COLOR = 'rgb(240, 234, 234)';



if(localStorage.getItem('colorScheme') === 'light') {
    colorSchemeCheckboxEl.click();
}


let isLightScheme;

colorSchemeModeLabelToggle.onclick = () => {
    setTimeout((()=> { isLightScheme = colorSchemeCheckboxEl.checked
        const tspanELs = document.querySelectorAll('tspan');
        
        if (isLightScheme) {
            localStorage.setItem('colorScheme', 'light');
            console.log('H2O* isDarkScheme: ', isLightScheme)
            techTreeMain.classList.remove('techtree_darkColorScheme');
            techTreeMain.classList.add('techtree_lightColorScheme');

            majorGodSelectionPanelEl.classList.remove('major_god_selection_panel__sticky_darkColorScheme');
            majorGodSelectionPanelEl.classList.add('major_god_selection_panel__sticky_lightColorScheme');

            majorGodDescriptionEl.classList.remove('side_panel__major_god_description_darkColorScheme');
            majorGodDescriptionEl.classList.add('side_panel__major_god_description_lightColorScheme');

            sidePanelMinorGods.classList.remove('side_panel__minor_gods__darkColorScheme');
            sidePanelMinorGods.classList.add('side_panel__minor_gods__lightColorScheme');

            for (let i = 0; i < tspanELs.length; i++) {
                console.log('H2O*: tspanELs[i].style.color: ', tspanELs[i].style.color);
                tspanELs[i].style.fill = LIGHT_SCHEME_TEXT_COLOR;   
            }
            
        } else {
            localStorage.setItem('colorScheme', 'dark');
            techTreeMain.classList.remove('techtree_lightColorScheme');
            techTreeMain.classList.add('techtree_darkColorScheme');

            majorGodSelectionPanelEl.classList.remove('major_god_selection_panel__sticky_lightColorScheme');
            majorGodSelectionPanelEl.classList.add('major_god_selection_panel__sticky_darkColorScheme');

            majorGodDescriptionEl.classList.remove('side_panel__major_god_description_lightColorScheme');
            majorGodDescriptionEl.classList.add('side_panel__major_god_description_darkColorScheme');

            sidePanelMinorGods.classList.remove('side_panel__minor_gods__lightColorScheme');
            sidePanelMinorGods.classList.add('side_panel__minor_gods__darkColorScheme');

            for (let i = 0; i < tspanELs.length; i++) {
                console.log('H2O*: tspanELs[i].style.color: ', tspanELs[i].style.color);
                tspanELs[i].style.fill = DARK_SCHEME_TEXT_COLOR;
            }
        }
    }), 10);    
}




setTimeout(() => {
    if (!localStorage.getItem('colorScheme')) {
        localStorage.setItem('colorScheme', 'dark');
    }
    if (localStorage.getItem('colorScheme') === 'light') {
        colorSchemeCheckboxEl.checked = false;
        colorSchemeCheckboxEl.click();
        // should probably make this a function
        setTimeout((()=> { isLightScheme = colorSchemeCheckboxEl.checked
            const tspanELs = document.querySelectorAll('tspan');
            
            if (isLightScheme) {
                localStorage.setItem('colorScheme', 'light');
                console.log('H2O* isDarkScheme: ', isLightScheme)
                techTreeMain.classList.remove('techtree_darkColorScheme');
                techTreeMain.classList.add('techtree_lightColorScheme');

                majorGodSelectionPanelEl.classList.remove('major_god_selection_panel__sticky_darkColorScheme');
                majorGodSelectionPanelEl.classList.add('major_god_selection_panel__sticky_lightColorScheme');

                majorGodDescriptionEl.classList.remove('side_panel__major_god_description_darkColorScheme');
                majorGodDescriptionEl.classList.add('side_panel__major_god_description_lightColorScheme');

                sidePanelMinorGods.classList.remove('side_panel__minor_gods__darkColorScheme');
                sidePanelMinorGods.classList.add('side_panel__minor_gods__lightColorScheme');

                for (let i = 0; i < tspanELs.length; i++) {
                    console.log('H2O*: tspanELs[i].style.color: ', tspanELs[i].style.color);
                    tspanELs[i].style.fill = LIGHT_SCHEME_TEXT_COLOR;   
                }
                
            } else {
                localStorage.setItem('colorScheme', 'dark');
                techTreeMain.classList.remove('techtree_lightColorScheme');
                techTreeMain.classList.add('techtree_darkColorScheme');

                majorGodSelectionPanelEl.classList.remove('major_god_selection_panel__sticky_lightColorScheme');
                majorGodSelectionPanelEl.classList.add('major_god_selection_panel__sticky_darkColorScheme');

                majorGodDescriptionEl.classList.remove('side_panel__major_god_description_lightColorScheme');
                majorGodDescriptionEl.classList.add('side_panel__major_god_description_darkColorScheme');

                sidePanelMinorGods.classList.remove('side_panel__minor_gods__lightColorScheme');
                sidePanelMinorGods.classList.add('side_panel__minor_gods__darkColorScheme');

                for (let i = 0; i < tspanELs.length; i++) {
                    console.log('H2O*: tspanELs[i].style.color: ', tspanELs[i].style.color);
                    tspanELs[i].style.fill = DARK_SCHEME_TEXT_COLOR;
                }
            }
        }), 55);
    }
}, 15);