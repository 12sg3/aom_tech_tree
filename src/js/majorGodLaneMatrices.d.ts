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
export declare function formatId(string: any): any;
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
export declare function blank_caret(): Caret;
export declare const BLANK = "blank";
export declare const majorGodLaneMatrices: {
    huitzilopochtli: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        calpulliLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        warHutLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        trapLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        nobleHutMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        greatTempleLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    tezcatlipoca: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        calpulliLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        warHutLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        trapLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        nobleHutMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        greatTempleLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    quetzalcoatl: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        calpulliLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        warHutLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        trapLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        nobleHutMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        greatTempleLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    amaterasu: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        watermillLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        miningCampLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        shrineLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        guardhouseLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        dojoLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        stableLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        castleLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    tsukuyomi: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        watermillLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        miningCampLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        shrineLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        guardhouseLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        dojoLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        stableLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        castleLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    susanoo: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        watermillLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        miningCampLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        shrineLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        guardhouseLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        dojoLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        stableLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        castleLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    fuxi: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        siloLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryCampLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        mahcineWorkshopLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        imperialAcademyLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        baoleiLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    nuwa: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        siloLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryCampLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        mahcineWorkshopLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        imperialAcademyLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        baoleiLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    shennong: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        siloLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryCampLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        mahcineWorkshopLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        imperialAcademyLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        baoleiLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    zeus: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        storeHouseLaneMartrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        granaryLaneMartrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryAcademyLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        archeryRangeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        stableLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        fotressLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    hades: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        storeHouseLaneMartrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        granaryLaneMartrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryAcademyLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        archeryRangeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        stableLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        fotressLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    poseidon: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        storeHouseLaneMartrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        granaryLaneMartrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryAcademyLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        archeryRangeLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        stableLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        fotressLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    demeter: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        storeHouseLaneMartrix: ({
            id: number;
            name: string;
            type: string;
        }[] | string[])[];
        granaryLaneMartrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryAcademyLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        archeryRangeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        stableLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        fotressLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    ra: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        lumberCampLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        miningCampLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        granaryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        barracksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        migdolStrongholdLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        siegeWorksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        lightHouseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    isis: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        lumberCampLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        miningCampLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        granaryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        armoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        barracksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        migdolStrongholdLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        siegeWorksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        lightHouseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    set: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        pharaohLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        lumberCampLaneMatrix: ({
            id: number;
            name: string;
            type: string;
        }[] | string[])[];
        miningCampLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        granaryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        barracksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        migdolStrongholdLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        siegeWorksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        lightHouseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    thor: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        oxCartLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dwarvenArmoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        longhouseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        greatHallLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        hillFortLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    odin: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        oxCartLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        longhouseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        greatHallLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        hillFortLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    loki: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        oxCartLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        longhouseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        greatHallLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        hillFortLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    freyr: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        oxCartLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        houseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        longhouseLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        greatHallLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        hillFortLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    kronos: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        economicGuildLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        manorLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryBarracksLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        counterBarracksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        palaceLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    oranos: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        economicGuildLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        manorLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryBarracksLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        counterBarracksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        palaceLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
    gaia: {
        townCenterLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        economicGuildLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        manorLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        wallLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        dockLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        templeLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        sentryTowerLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        armoryLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        marketLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        militaryBarracksLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        counterBarracksLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
        palaceLaneMatrix: (string | {
            id: number;
            name: string;
            type: string;
        })[][];
        wonderLaneMatrix: {
            id: number;
            name: string;
            type: string;
        }[][];
    };
};
//# sourceMappingURL=majorGodLaneMatrices.d.ts.map