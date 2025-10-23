let oxCartLane = new Lane();
    oxCartLane.rows.archaic_1.push(unit(OX_CART));
    oxCartLane.rows.archaic_2.push(tech(HUSBANDRY));
    oxCartLane.rows.archaic_2.push(blank_caret());
    oxCartLane.rows.archaic_2.push(tech(PICKAXE));
    oxCartLane.rows.archaic_2.push(tech(HAND_AXE)); 
    oxCartLane.rows.classical_1.push(tech(SURVIVAL_EQUIPMENT));
    oxCartLane.rows.classical_1.push(tech(PLOW));
    
    oxCartLane.rows.heroic_1.push(tech(WINTER_HARVEST));
    oxCartLane.rows.heroic_1.push(tech(IRRIGATION));
    oxCartLane.rows.heroic_1.push(tech(SHAFT_MINE));
    oxCartLane.rows.heroic_1.push(tech(BOW_SAW));
    
    oxCartLane.rows.mythic_1.push(blank_caret());
    oxCartLane.rows.mythic_1.push(tech(FLOOD_CONTROL));
    oxCartLane.rows.mythic_1.push(tech(QUARRY));
    oxCartLane.rows.mythic_1.push(tech(CARPENTERS));
    
    

    tree.lanes.push(oxCartLane);
    