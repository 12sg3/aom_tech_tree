function u(unit) {
    return 'unit_' + unit;
}
function b(building) {
    return 'building_' + building;
}
function t(tech) {
    return 'tech_' + tech;
}
export function addConnection(itemA, itemB, connections) {
    // console.log('itemA: ', itemA, 'itemA.type: ',itemA.type, 'itemB: ', itemB,'itemB.type: ', itemB.type);
    let itemA_type_id;
    let itemB_type_id;
    if (itemA.type === 'building') {
        itemA_type_id = b(itemA.id);
    }
    else if (itemA.type === 'tech') {
        // console.log("***itemA.type === 'tech' ENTERED!");
        itemA_type_id = t(itemA.id);
    }
    else if (itemA.type === 'unit') {
        itemA_type_id = u(itemA.id);
    }
    else {
        throw console.error("Error itemA's type is not one of unit/building/tech");
    }
    if (itemB.type === 'building') {
        itemB_type_id = b(itemB.id);
    }
    else if (itemB.type === 'tech') {
        // console.log("***itemB.type === 'tech' ENTERED!");
        itemB_type_id = t(itemB.id);
    }
    else if (itemB.type === 'unit') {
        itemB_type_id = u(itemB.id);
    }
    else {
        throw console.error("Error itemB's type is not one of unit/building/tech");
    }
    // console.log('itemA_type_id: ', itemA_type_id, 'itemB_type_id: ', itemB_type_id);
    connections.push([itemA_type_id, itemB_type_id]);
}
//# sourceMappingURL=addConnection.js.map