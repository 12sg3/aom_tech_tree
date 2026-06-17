const colorSchemeCheckboxEl = document.getElementById('darkmode-toggle');
const colorSchemeModeLabelToggle = document.getElementById('darkmode-toggle-label');
const techTreeMain = document.getElementById('techtree');
const majorGodSelectionPanelEl = document.getElementById('major_god_selection_panel__sticky');
const majorGodSelectionPanelStickyCreditsEL = document.getElementById('major_god_selection_panel__sticky_credits');
const majorGodDescriptionEl = document.getElementById('side_panel__major_god_description');
const sidePanelMinorGods = document.getElementById('side_panel__minor_gods');
const helpTextEl = document.getElementById('helptext');
const helpTextSPEl = document.getElementById('helptext_SP');
const rootEl = document.documentElement;
const LIGHT_SCHEME_TEXT_COLOR = 'rgb(16, 16, 16)';
const DARK_SCHEME_TEXT_COLOR = 'rgb(240, 234, 234)';
if (localStorage.getItem('colorScheme') === 'light') {
    colorSchemeCheckboxEl.click();
}
let isLightScheme;
colorSchemeModeLabelToggle.onclick = () => {
    setTimeout((() => updateColorScheme()), 10);
};
setTimeout(() => {
    if (!localStorage.getItem('colorScheme')) {
        localStorage.setItem('colorScheme', 'dark');
    }
    if (localStorage.getItem('colorScheme') === 'light') {
        colorSchemeCheckboxEl.checked = false;
        colorSchemeCheckboxEl.click();
        // should probably make this a function
        setTimeout((() => {
            isLightScheme = colorSchemeCheckboxEl.checked;
            const tspanELs = document.querySelectorAll('tspan');
            if (isLightScheme) {
                updateColorScheme();
            }
        }), 55);
    }
}, 15);
function updateColorScheme() {
    isLightScheme = colorSchemeCheckboxEl.checked;
    const tspanELs = document.querySelectorAll('tspan');
    if (isLightScheme) {
        localStorage.setItem('colorScheme', 'light');
        console.log('H2O* isDarkScheme: ', isLightScheme);
        techTreeMain.classList.remove('techtree_darkColorScheme');
        techTreeMain.classList.add('techtree_lightColorScheme');
        majorGodSelectionPanelEl.classList.remove('major_god_selection_panel__sticky_darkColorScheme');
        majorGodSelectionPanelEl.classList.add('major_god_selection_panel__sticky_lightColorScheme');
        majorGodDescriptionEl.classList.remove('side_panel__major_god_description_darkColorScheme');
        majorGodDescriptionEl.classList.add('side_panel__major_god_description_lightColorScheme');
        sidePanelMinorGods.classList.remove('side_panel__minor_gods__darkColorScheme');
        sidePanelMinorGods.classList.add('side_panel__minor_gods__lightColorScheme');
        majorGodSelectionPanelStickyCreditsEL.classList.remove('major_god_selection_panel__sticky_credits_darkColorScheme');
        majorGodSelectionPanelStickyCreditsEL.classList.add('major_god_selection_panel__sticky_credits_lightColorScheme');
        rootEl.style.colorScheme = 'light';
        for (let i = 0; i < tspanELs.length; i++) {
            console.log('H2O*: tspanELs[i].style.color: ', tspanELs[i].style.color);
            tspanELs[i].style.fill = LIGHT_SCHEME_TEXT_COLOR;
        }
        helpTextEl.style.color = LIGHT_SCHEME_TEXT_COLOR;
        helpTextEl.style.background = '#727477';
        helpTextSPEl.style.color = LIGHT_SCHEME_TEXT_COLOR;
        helpTextSPEl.style.background = '#727477';
    }
    else {
        localStorage.setItem('colorScheme', 'dark');
        techTreeMain.classList.remove('techtree_lightColorScheme');
        techTreeMain.classList.add('techtree_darkColorScheme');
        majorGodSelectionPanelEl.classList.remove('major_god_selection_panel__sticky_lightColorScheme');
        majorGodSelectionPanelEl.classList.add('major_god_selection_panel__sticky_darkColorScheme');
        majorGodDescriptionEl.classList.remove('side_panel__major_god_description_lightColorScheme');
        majorGodDescriptionEl.classList.add('side_panel__major_god_description_darkColorScheme');
        sidePanelMinorGods.classList.remove('side_panel__minor_gods__lightColorScheme');
        sidePanelMinorGods.classList.add('side_panel__minor_gods__darkColorScheme');
        majorGodSelectionPanelStickyCreditsEL.classList.remove('major_god_selection_panel__sticky_credits_lightColorScheme');
        majorGodSelectionPanelStickyCreditsEL.classList.add('major_god_selection_panel__sticky_credits_darkColorScheme');
        rootEl.style.colorScheme = 'dark';
        for (let i = 0; i < tspanELs.length; i++) {
            console.log('H2O*: tspanELs[i].style.color: ', tspanELs[i].style.color);
            tspanELs[i].style.fill = DARK_SCHEME_TEXT_COLOR;
        }
        helpTextEl.style.color = '#d1cfd9';
        helpTextEl.style.background = '#241f38';
        helpTextSPEl.style.color = '#d1cfd9';
        helpTextSPEl.style.background = '#241f38';
    }
}
export {};
//# sourceMappingURL=colorSchemeToggle.js.map