const colorSchemeCheckboxEl = document.getElementById('darkmode-toggle');
const colorSchemeModeLabelToggle = document.getElementById('darkmode-toggle-label');
const techTreeMain = document.getElementById('techtree');
// const isDarkScheme = colorSchemeCheckboxEl.value; //  - =on, for both cases
// let isDarkScheme = colorSchemeCheckboxEl.checked; // = false, for both cases
let isDarkScheme;
colorSchemeModeLabelToggle.onclick = () => {
    setTimeout((() => {
        isDarkScheme = colorSchemeCheckboxEl.checked;
        // console.log('H2O* isDarkScheme: ', isDarkScheme)
        if (isDarkScheme) {
            console.log('H2O* isDarkScheme: ', isDarkScheme);
            techTreeMain.classList.remove('techtree_lightColorScheme');
            techTreeMain.classList.add('techtree_darkColorScheme');
        }
        else {
            console.log('H2O* isDarkScheme: ', isDarkScheme);
            techTreeMain.classList.remove('techtree_darkColorScheme');
            techTreeMain.classList.add('techtree_lightColorScheme');
        }
    }), 10);
};
export {};
//# sourceMappingURL=colorSchemeToggle.js.map