import { BARRACKS, MONUMENT_TO_GODS, MONUMENT_TO_PHARAOHS, MONUMENT_TO_PRIESTS, MONUMENT_TO_SOLDIERS, MONUMENT_TO_VILLAGERS, TITAN_GATE } from "./units.js";

const buildingCaretsToSkipCenteringFor = [TITAN_GATE, BARRACKS, MONUMENT_TO_VILLAGERS, MONUMENT_TO_SOLDIERS, MONUMENT_TO_PRIESTS, MONUMENT_TO_PHARAOHS, MONUMENT_TO_GODS];

export const buildingCaretsToSkipCenteringForId = buildingCaretsToSkipCenteringFor.map(caret => `building_${String(caret.id)}`);