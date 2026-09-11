import { CARET_TYPES } from "./techtree.js";
const legendItemsDiv = document.getElementById('legend-items__container');
const legendContainerdiv = document.getElementById('legend-button-container__fixed');
for (const caret_type in CARET_TYPES) {
    if (caret_type === 'BLANK') {
        continue;
    }
    console.log('UIU', caret_type);
    console.log('UIU', CARET_TYPES[caret_type]);
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
    legendItemsDiv.append(newCaretTypeContainerDiv);
    legendItemsDiv.append(); //
    let curDivHeight = legendContainerdiv.offsetHeight;
    console.log('UIU divheight', curDivHeight);
    // legendContainerdiv.style.height = (curDivHeight + 15) + 'px';
    const legendButton = document.getElementById('legend-button');
    legendButton.onclick = (e) => {
        e.preventDefault();
        if (legendButton.getAttribute('data-state') == 'hidden') {
            legendButton.setAttribute('data-state', 'displayed');
            legendItemsDiv.style.display = 'block';
        }
        else {
            legendButton.setAttribute('data-state', 'hidden');
            legendItemsDiv.style.display = 'none';
        }
    };
}
//# sourceMappingURL=legend.js.map