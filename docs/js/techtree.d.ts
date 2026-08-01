import { Caret_SP } from "./addNewLaneToTreeSP.js";
export type caretConstMetadata = {
    colour: string;
    type: string;
    name: string;
    opacity?: number;
};
export declare const CARET_TYPES: {
    [key: string]: caretConstMetadata;
};
export declare const PREFIX: Readonly<{
    BUILDING: "building_";
    UNIT: "unit_";
    TECHNOLOGY: "tech_";
    MAJOR_GOD: "major_god_";
    MINOR_GOD: "minor_god_";
    GOD_POWER: "god_power_";
    BUSHIDO_GOD_BLESSING: "bushido_god_blessing_";
}>;
export declare const BONUS_MULTIPLIER_CLASSES: {
    readonly MythUnit: "bonus_multiplier_myth_unit";
    readonly Hero: "bonus_multiplier_hero";
    readonly AbstractInfantry: "bonus_multiplier_infantry";
    readonly Building: "bonus_multiplier_building";
    readonly Ship: "bonus_multiplier_ship";
    readonly AbstractCavalry: "bonus_multiplier_cavalry";
    readonly AbstractArcher: "bonus_multiplier_archer";
    readonly AbstractVillager: "bonus_multiplier_villager";
    readonly AbstractArcherShip: "bonus_multiplier_archer_ship";
    readonly AbstractTower: "bonus_multiplier_tower";
    readonly OxCart: "bonus_multiplier_ox_cart";
    readonly AbstractTitan: "bonus_multiplier_titan";
};
export declare const BONUS_MULTIPLIER_DISPLAY_STR: {
    readonly MythUnit: "x bonus multiplier vs myth units";
    readonly Hero: "x bonus multiplier vs heroes";
    readonly AbstractInfantry: "x bonus multiplier vs infantry";
    readonly Building: "x bonus multiplier vs buildings";
    readonly Ship: "x bonus multiplier vs ships";
    readonly AbstractCavalry: "x bonus multiplier vs cavalry";
    readonly AbstractArcher: "x bonus multiplier vs archers";
    readonly AbstractVillager: "x bonus multiplier vs villagers";
    readonly AbstractArcherShip: "x bonus multiplier vs archer ships";
    readonly AbstractTower: "x bonus multiplier vs towers";
    readonly OxCart: "x bonus multiplier vs ox carts";
    readonly AbstractTitan: "x bonus multiplier titans";
};
export declare const SELECTED_MAJOR_GOD_ID: {
    id: number | undefined;
};
export declare function formatName(originalname: any): any;
export declare class Tree {
    offsets_y: {
        [key: string]: number;
    };
    padding_tree: number;
    height: number;
    width: number;
    element_height: number;
    lanes: Lane[];
    offset_x: number;
    extra_y_offset: number;
    extra_y_offset_2: number;
    extra_y_offset_3_archaic_1_top_padding: number;
    element_offset: number;
    element_offset_size_factor: number;
    constructor();
    updateOffsets(): void;
    updatePositions(): void;
    getDefaultCaretHeight(): number;
}
export declare class Lane {
    rows: {
        [key: string]: (Caret | Caret_SP)[];
    };
    x: number;
    y: number;
    width: number;
    height: number;
    padding_lane: number;
    constructor();
    getPaddingLane(): number;
    updatePositions(offsets_y: any, element_length: any): void;
    nonBuidingCarets(): Map<any, any>;
    caretIds(): any[];
}
export declare class Caret {
    type: caretConstMetadata;
    name: string;
    id: number;
    width: number;
    height: number;
    x: number;
    y: number;
    constructor(type: any, name: any, id: any);
    isBuilding(): boolean;
}
export declare function formatId(string: any): any;
export declare function getName(obj_name_id: any): any;
export declare function building(obj_name_id: any): Caret;
export declare function unit(obj_name_id: any): Caret;
export declare function tech(obj_name_id: any): Caret;
export declare function major_god(obj_name_id: any): Caret;
export declare function minor_god(obj_name_id: any): Caret;
export declare function god_power(obj_name_id: any): Caret;
export declare function bushido_god_blessing(obj_name_id: any): Caret;
export declare function blank_caret(): Caret;
export declare function getDefaultTree(): Tree;
export declare function getConnections(): any[];
export declare function getConnectionPoints(tree: any): Map<any, any>;
//# sourceMappingURL=techtree.d.ts.map