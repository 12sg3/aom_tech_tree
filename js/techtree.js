const TYPES = Object.freeze({
    'BUILDING': {colour: '#922602', type: 'BUILDING', name: 'Building'},
    'UNIT': {colour: '#3a6a80', type: 'UNIT', name: 'Unit'},
    // 'UNIQUEUNIT': {colour: '#af30a3', type: 'UNIQUEUNIT', name: 'Unique Unit'},
    'TECHNOLOGY': {colour: '#2c5729', type: 'TECHNOLOGY', name: 'Technology'},
    'MAJOR_GOD': {colour: '#f7dd4aff', type: 'MAJOR_GOD', name: 'Major_God'},
    'MINOR_GOD': {colour:'#c78823ff', type: 'MINOR_GOD', name: 'Minor_God' },
    'GOD_POWER': {colour: '#37076eff', type: 'GOD_POWER', name: 'God_Power'},
    'BUSHIDO_GOD_BLESSING': {colour: '#af30a3', type: 'BUSHIDO_GOD_BLESSING', name: 'Bushido_God_Blessing'},
    'BLANK': {colour: '#000000', type: 'BLANK', name: 'Blank', opacity: 0},
});

const PREFIX = Object.freeze({
    'BUILDING': 'building_',
    'UNIT': 'unit_',
    'TECHNOLOGY': 'tech_',       
    'MAJOR_GOD': 'major_god_',
    'MINOR_GOD': 'minor_god_',
    'GOD_POWER': 'god_power_',
    'BUSHIDO_GOD_BLESSING': 'bushido_god_blessing_',
});

// const BLANK = 'blank';

AGE_IMAGES = ['archaic_age_icon.webp', 'classical_age_icon.webp', 'heroic_age_icon.webp', 'mythic_age_icon.webp'];

let SELECTED_MAJOR_GOD_ID;

if (SELECTED_MAJOR_GOD_ID === undefined) {
    SELECTED_MAJOR_GOD_ID = ODIN.id
}


// ACHILLES_HERO = {id: 0, name: 'ACHILLES_HERO', type: 'unit'};
// AJAX_HERO = {id: 1, name: 'AJAX_HERO', type: 'unit'};
// ANUBITE = {id: 2, name: 'ANUBITE', type: 'unit'};
// ARCUS_HERO = {id: 3, name: 'ARCUS_HERO', type: 'unit'};
// ARCUS = {id: 4, name: 'ARCUS', type: 'unit'};
// ARGUS = {id: 5, name: 'ARGUS', type: 'unit'};
// ASURA = {id: 6, name: 'ASURA', type: 'unit'};
// ATALANTA_HERO = {id: 7, name: 'ATALANTA_HERO', type: 'unit'};
// AUTOMATON = {id: 8, name: 'AUTOMATON', type: 'tech'};
// AVENGER = {id: 9, name: 'AVENGER', type: 'unit'};
// AXE_CART = {id: 10, name: 'AXE_CART', type: 'unit'};
// AXEMAN = {id: 11, name: 'AXEMAN', type: 'unit'};
// BAIHU = {id: 12, name: 'BAIHU', type: 'unit'};
// BALLISTA = {id: 13, name: 'BALLISTA', type: 'unit'};
// BATTLE_BOAR = {id: 14, name: 'BATTLE_BOAR', type: 'unit'};
// BEHEMOTH = {id: 15, name: 'BEHEMOTH', type: 'unit'};
// BELLEROPHON_HERO = {id: 16, name: 'BELLEROPHON_HERO', type: 'unit'};
// BERSERK = {id: 17, name: 'BERSERK', type: 'unit'};
// BIREME = {id: 18, name: 'BIREME', type: 'unit'};
// BUSHI_HERO = {id: 19, name: 'BUSHI_HERO', type: 'unit'};
// CALADRIA = {id: 20, name: 'CALADRIA', type: 'unit'};
// CAMEL_CARAVAN = {id: 21, name: 'CAMEL_CARAVAN', type: 'unit'};
// CAMEL_RIDER = {id: 22, name: 'CAMEL_RIDER', type: 'unit'};
// CARCINOS = {id: 23, name: 'CARCINOS', type: 'unit'};
// CARNIVORA = {id: 24, name: 'CARNIVORA', type: 'unit'};
// CATAPULT = {id: 25, name: 'CATAPULT', type: 'unit'};
// CENTAUR = {id: 26, name: 'CENTAUR', type: 'unit'};
// CENTIMANUS = {id: 27, name: 'CENTIMANUS', type: 'unit'};
// CHARIOT_ARCHER = {id: 28, name: 'CHARIOT_ARCHER', type: 'unit'};
// CHEIROBALLISTA_HERO = {id: 29, name: 'CHEIROBALLISTA_HERO', type: 'unit'};
// CHEIROBALLISTA = {id: 30, name: 'CHEIROBALLISTA', type: 'unit'};
// CHIMERA = {id: 31, name: 'CHIMERA', type: 'unit'};
// CHIRON_HERO = {id: 32, name: 'CHIRON_HERO', type: 'unit'};
// CHIWEN = {id: 33, name: 'CHIWEN', type: 'unit'};
// CHU_KO_NU = {id: 34, name: 'CHU_KO_NU', type: 'unit'};
// CITIZEN_HERO = {id: 35, name: 'CITIZEN_HERO', type: 'unit'};
// CITIZEN = {id: 36, name: 'CITIZEN', type: 'unit'};
// COLOSSUS = {id: 37, name: 'COLOSSUS', type: 'unit'};
// COMMONER = {id: 38, name: 'COMMONER', type: 'unit'};
// CONTARIUS_HERO = {id: 39, name: 'CONTARIUS_HERO', type: 'unit'};
// CONTARIUS = {id: 40, name: 'CONTARIUS', type: 'unit'};
// CYCLOPS = {id: 41, name: 'CYCLOPS', type: 'unit'};
// DAIMYO_HERO = {id: 42, name: 'DAIMYO_HERO', type: 'unit'};
// DAO_SWORDSMAN = {id: 43, name: 'DAO_SWORDSMAN', type: 'unit'};
// DEER_CARAVAN = {id: 44, name: 'DEER_CARAVAN', type: 'unit'};
// DESTROYER_HERO = {id: 45, name: 'DESTROYER_HERO', type: 'unit'};
// DESTROYER = {id: 46, name: 'DESTROYER', type: 'unit'};
// DONKEY_CARAVAN = {id: 47, name: 'DONKEY_CARAVAN', type: 'unit'};
// DOUJIAN = {id: 48, name: 'DOUJIAN', type: 'unit'};
// DRAGON_SHIP = {id: 49, name: 'DRAGON_SHIP', type: 'unit'};
// DRAUGR = {id: 50, name: 'DRAUGR', type: 'unit'};
// DREKI = {id: 51, name: 'DREKI', type: 'unit'};
// DRYAD = {id: 52, name: 'DRYAD', type: 'unit'};
// DWARF = {id: 53, name: 'DWARF', type: 'unit'};
// EINHERI = {id: 54, name: 'EINHERI', type: 'unit'};
// FAFNIR = {id: 55, name: 'FAFNIR', type: 'unit'};
// FANATIC_HERO = {id: 56, name: 'FANATIC_HERO', type: 'unit'};
// FANATIC = {id: 57, name: 'FANATIC', type: 'unit'};
// FEI = {id: 58, name: 'FEI', type: 'unit'};
// FENRIS_WOLF_BROOD = {id: 59, name: 'FENRIS_WOLF_BROOD', type: 'unit'};
// FIMBULWINTER_WOLF = {id: 60, name: 'FIMBULWINTER_WOLF', type: 'unit'};
// FIRE_ARCHER = {id: 61, name: 'FIRE_ARCHER', type: 'unit'};
// FIRE_GIANT = {id: 62, name: 'FIRE_GIANT', type: 'unit'};
// FIRE_SHIP = {id: 63, name: 'FIRE_SHIP', type: 'unit'};
// FIRE_SIPHON = {id: 64, name: 'FIRE_SIPHON', type: 'unit'};
// FISHING_SHIP_ATLANTEAN = {id: 65, name: 'FISHING_SHIP_ATLANTEAN', type: 'unit'};
// FISHING_SHIP_CHINESE = {id: 66, name: 'FISHING_SHIP_CHINESE', type: 'unit'};
// FISHING_SHIP_EGYPTIAN = {id: 67, name: 'FISHING_SHIP_EGYPTIAN', type: 'unit'};
// FISHING_SHIP_GREEK = {id: 68, name: 'FISHING_SHIP_GREEK', type: 'unit'};
// FISHING_SHIP_JAPANESE = {id: 69, name: 'FISHING_SHIP_JAPANESE', type: 'unit'};
// FISHING_SHIP_NORSE = {id: 70, name: 'FISHING_SHIP_NORSE', type: 'unit'};
// FROST_GIANT = {id: 71, name: 'FROST_GIANT', type: 'unit'};
// GASTRAPHETOROS = {id: 72, name: 'GASTRAPHETOROS', type: 'unit'};
// GATHERER = {id: 73, name: 'GATHERER', type: 'unit'};
// GE_HALBERDIER = {id: 74, name: 'GE_HALBERDIER', type: 'unit'};
// GODI_HERO = {id: 75, name: 'GODI_HERO', type: 'unit'};
// HATAMOTO_SAMURAI = {id: 76, name: 'HATAMOTO_SAMURAI', type: 'unit'};
// HELEPOLIS = {id: 77, name: 'HELEPOLIS', type: 'unit'};
// HERACLES_HERO = {id: 78, name: 'HERACLES_HERO', type: 'unit'};
// HERO_OF_RAGNAROK_DWARF = {id: 79, name: 'HERO_OF_RAGNAROK_DWARF', type: 'unit'};
// HERO_OF_RAGNAROK = {id: 80, name: 'HERO_OF_RAGNAROK', type: 'unit'};
// HERSIR_HERO = {id: 81, name: 'HERSIR_HERO', type: 'unit'};
// HETAIROS = {id: 82, name: 'HETAIROS', type: 'unit'};
// HIPPEUS = {id: 83, name: 'HIPPEUS', type: 'unit'};
// HIPPOCAMPUS = {id: 84, name: 'HIPPOCAMPUS', type: 'unit'};
// HIPPOLYTA_HERO = {id: 85, name: 'HIPPOLYTA_HERO', type: 'unit'};
// HIRDMAN = {id: 86, name: 'HIRDMAN', type: 'unit'};
// HONENGYO = {id: 87, name: 'HONENGYO', type: 'unit'};
// HOPLITE = {id: 88, name: 'HOPLITE', type: 'unit'};
// HUNDUN = {id: 89, name: 'HUNDUN', type: 'unit'};
// HUSKARL = {id: 90, name: 'HUSKARL', type: 'unit'};
// HYDRA = {id: 91, name: 'HYDRA', type: 'unit'};
// HYPASPIST = {id: 92, name: 'HYPASPIST', type: 'unit'};
// JARL = {id: 93, name: 'JARL', type: 'unit'};
// JASON_HERO = {id: 94, name: 'JASON_HERO', type: 'unit'};
// JIANG_ZIYA_HERO = {id: 95, name: 'JIANG_ZIYA_HERO', type: 'unit'};
// JORMUN_ELVER = {id: 96, name: 'JORMUN_ELVER', type: 'unit'};
// JOROGUMO = {id: 97, name: 'JOROGUMO', type: 'unit'};
// JUGGERNAUT = {id: 98, name: 'JUGGERNAUT', type: 'unit'};
// JUNKOZOSEN = {id: 99, name: 'JUNKOZOSEN', type: 'unit'};
// KATAPELTES_HERO = {id: 100, name: 'KATAPELTES_HERO', type: 'unit'};
// KATAPELTES = {id: 101, name: 'KATAPELTES', type: 'unit'};
// KEBENIT = {id: 102, name: 'KEBENIT', type: 'unit'};
// KITSUNE = {id: 103, name: 'KITSUNE', type: 'unit'};
// KRAKEN = {id: 104, name: 'KRAKEN', type: 'unit'};
// KUAFU = {id: 105, name: 'KUAFU', type: 'unit'};
// LABORER = {id: 106, name: 'LABORER', type: 'unit'};
// LAMPADES = {id: 107, name: 'LAMPADES', type: 'unit'};
// LEVIATHAN = {id: 108, name: 'LEVIATHAN', type: 'unit'};
// LI_JING_HERO = {id: 109, name: 'LI_JING_HERO', type: 'unit'};
// LLAMA_CARAVAN = {id: 110, name: 'LLAMA_CARAVAN', type: 'unit'};
// LONGBOAT = {id: 111, name: 'LONGBOAT', type: 'unit'};
// LOUCHUAN = {id: 112, name: 'LOUCHUAN', type: 'unit'};
// MAN_O_WAR = {id: 113, name: 'MAN_O_WAR', type: 'unit'};
// MANTICORE = {id: 114, name: 'MANTICORE', type: 'unit'};
// MASTERLESS_SWORD = {id: 115, name: 'MASTERLESS_SWORD', type: 'unit'};
// MECHANICAL_OX_CARAVAN = {id: 116, name: 'MECHANICAL_OX_CARAVAN', type: 'unit'};
// MEDUSA = {id: 117, name: 'MEDUSA', type: 'unit'};
// MENGCHONG = {id: 118, name: 'MENGCHONG', type: 'unit'};
// MERCENARY_CAVALRY = {id: 119, name: 'MERCENARY_CAVALRY', type: 'unit'};
// MERCENARY = {id: 120, name: 'MERCENARY', type: 'unit'};
// MIKO_HERO = {id: 121, name: 'MIKO_HERO', type: 'unit'};
// MILITIA = {id: 122, name: 'MILITIA', type: 'unit'};
// MINION_REINCARNATED = {id: 123, name: 'MINION_REINCARNATED', type: 'unit'};
// MINION = {id: 124, name: 'MINION', type: 'unit'};
// MINOTAUR = {id: 125, name: 'MINOTAUR', type: 'unit'};
// MOUNTAIN_GIANT = {id: 126, name: 'MOUNTAIN_GIANT', type: 'unit'};
// MUMMY = {id: 127, name: 'MUMMY', type: 'unit'};
// MURMILLO_HERO = {id: 128, name: 'MURMILLO_HERO', type: 'unit'};
// MURMILLO = {id: 129, name: 'MURMILLO', type: 'unit'};
// MYRMIDON = {id: 130, name: 'MYRMIDON', type: 'unit'};
// NAGINATA_RIDER = {id: 131, name: 'NAGINATA_RIDER', type: 'unit'};
// NEMEAN_LION = {id: 132, name: 'NEMEAN_LION', type: 'unit'};
// NEREID = {id: 133, name: 'NEREID', type: 'unit'};
// NEZHA_HERO_CHILD = {id: 134, name: 'NEZHA_HERO_CHILD', type: 'unit'};
// NEZHA_HERO_YOUTH = {id: 135, name: 'NEZHA_HERO_YOUTH', type: 'unit'};
// NEZHA_HERO = {id: 136, name: 'NEZHA_HERO', type: 'unit'};
// NIDHOGG = {id: 137, name: 'NIDHOGG', type: 'unit'};
// ODYSSEUS_HERO = {id: 138, name: 'ODYSSEUS_HERO', type: 'unit'};
// ONI = {id: 139, name: 'ONI', type: 'unit'};
// ONMORAKI = {id: 140, name: 'ONMORAKI', type: 'unit'};
// ONMYOJI_HERO = {id: 141, name: 'ONMYOJI_HERO', type: 'unit'};
// ONNA_MUSHA_HERO = {id: 142, name: 'ONNA_MUSHA_HERO', type: 'unit'};
// ORACLE_HERO = {id: 143, name: 'ORACLE_HERO', type: 'unit'};
// ORACLE = {id: 144, name: 'ORACLE', type: 'tech'};
// OX_CARAVAN = {id: 145, name: 'OX_CARAVAN', type: 'unit'};
// OX_CART = {id: 146, name: 'OX_CART', type: 'unit'};
// OYUMI = {id: 147, name: 'OYUMI', type: 'unit'};
// PEASANT = {id: 148, name: 'PEASANT', type: 'unit'};
// PEGASUS = {id: 149, name: 'PEGASUS', type: 'unit'};
// PELTAST = {id: 150, name: 'PELTAST', type: 'unit'};
// PENTEKONTER = {id: 151, name: 'PENTEKONTER', type: 'unit'};
// PERSEUS_HERO = {id: 152, name: 'PERSEUS_HERO', type: 'unit'};
// PETROBOLOS = {id: 153, name: 'PETROBOLOS', type: 'unit'};
// PETSUCHOS = {id: 154, name: 'PETSUCHOS', type: 'unit'};
// PHARAOH_HERO_NEW_KINGDOM = {id: 155, name: 'PHARAOH_HERO_NEW_KINGDOM', type: 'unit'};
// PHARAOH_HERO = {id: 156, name: 'PHARAOH_HERO', type: 'unit'};
// PHOENIX = {id: 157, name: 'PHOENIX', type: 'unit'};
// PIONEER_HERO = {id: 158, name: 'PIONEER_HERO', type: 'unit'};
// PIXIU = {id: 159, name: 'PIXIU', type: 'unit'};
// POLYPHEMUS_HERO = {id: 160, name: 'POLYPHEMUS_HERO', type: 'unit'};
// PORTABLE_RAM = {id: 161, name: 'PORTABLE_RAM', type: 'unit'};
// PRIEST_HERO = {id: 162, name: 'PRIEST_HERO', type: 'unit'};
// PRODROMOS = {id: 163, name: 'PRODROMOS', type: 'unit'};
// PROMETHEAN_OFFSPRING = {id: 164, name: 'PROMETHEAN_OFFSPRING', type: 'unit'};
// PROMETHEAN = {id: 165, name: 'PROMETHEAN', type: 'unit'};
// QILIN = {id: 166, name: 'QILIN', type: 'unit'};
// QINGLONG = {id: 167, name: 'QINGLONG', type: 'unit'};
// QIONGQI_AIR = {id: 168, name: 'QIONGQI_AIR', type: 'unit'};
// QIONGQI = {id: 169, name: 'QIONGQI', type: 'unit'};
// RAIDING_CAVALRY = {id: 170, name: 'RAIDING_CAVALRY', type: 'unit'};
// RAIJU = {id: 171, name: 'RAIJU', type: 'unit'};
// RAMMING_GALLEY = {id: 172, name: 'RAMMING_GALLEY', type: 'unit'};
// RAMMING_WASEN = {id: 173, name: 'RAMMING_WASEN', type: 'unit'};
// REVENANT_SHIMIGAMI = {id: 174, name: 'REVENANT_SHIMIGAMI', type: 'unit'};
// ROC = {id: 175, name: 'ROC', type: 'unit'};
// ROCK_GIANT = {id: 176, name: 'ROCK_GIANT', type: 'unit'};
// SAGE_HERO = {id: 177, name: 'SAGE_HERO', type: 'unit'};
// SAMURAI = {id: 178, name: 'SAMURAI', type: 'unit'};
// SATYR = {id: 179, name: 'SATYR', type: 'unit'};
// SCARAB = {id: 180, name: 'SCARAB', type: 'unit'};
// SCORPION_MAN = {id: 181, name: 'SCORPION_MAN', type: 'unit'};
// SCYLLA = {id: 182, name: 'SCYLLA', type: 'unit'};
// SEA_SNAKE = {id: 183, name: 'SEA_SNAKE', type: 'unit'};
// SERPENT = {id: 184, name: 'SERPENT', type: 'unit'};
// SERVANT = {id: 185, name: 'SERVANT', type: 'unit'};
// SHINIGAMI = {id: 186, name: 'SHINIGAMI', type: 'unit'};
// SHINOBI = {id: 187, name: 'SHINOBI', type: 'unit'};
// SHOGUN_HERO = {id: 188, name: 'SHOGUN_HERO', type: 'unit'};
// SIEGE_BIREME = {id: 189, name: 'SIEGE_BIREME', type: 'unit'};
// SIEGE_CROSSBOW = {id: 190, name: 'SIEGE_CROSSBOW', type: 'unit'};
// SIEGE_TOWER = {id: 191, name: 'SIEGE_TOWER', type: 'unit'};
// SKY_LANTERN = {id: 192, name: 'SKY_LANTERN', type: 'unit'};
// SLINGER = {id: 193, name: 'SLINGER', type: 'unit'};
// SON_OF_OSIRIS_HERO = {id: 194, name: 'SON_OF_OSIRIS_HERO', type: 'unit'};
// SPEARMAN = {id: 195, name: 'SPEARMAN', type: 'unit'};
// SPHINX = {id: 196, name: 'SPHINX', type: 'unit'};
// STYMPHALIAN_BIRD = {id: 197, name: 'STYMPHALIAN_BIRD', type: 'unit'};
// TAOTIE = {id: 198, name: 'TAOTIE', type: 'unit'};
// TAOWU = {id: 199, name: 'TAOWU', type: 'unit'};
// TENGU = {id: 200, name: 'TENGU', type: 'unit'};
// THE_ARGO_HERO = {id: 201, name: 'THE_ARGO_HERO', type: 'unit'};
// THESEUS = {id: 202, name: 'THESEUS', type: 'unit'};
// THROWING_AXEMAN = {id: 203, name: 'THROWING_AXEMAN', type: 'unit'};
// TIGER_CAVALRY_DISMOUNTED = {id: 204, name: 'TIGER_CAVALRY_DISMOUNTED', type: 'unit'};
// TIGER_CAVALRY = {id: 205, name: 'TIGER_CAVALRY', type: 'unit'};
// TITAN_ATLANTEAN = {id: 206, name: 'TITAN_ATLANTEAN', type: 'unit'};
// TITAN_CHINESE = {id: 207, name: 'TITAN_CHINESE', type: 'unit'};
// TITAN_EGYPTIAN = {id: 208, name: 'TITAN_EGYPTIAN', type: 'unit'};
// TITAN_GREEK = {id: 209, name: 'TITAN_GREEK', type: 'unit'};
// TITAN_JAPANESE = {id: 210, name: 'TITAN_JAPANESE', type: 'unit'};
// TITAN_NORSE = {id: 211, name: 'TITAN_NORSE', type: 'unit'};
// TOXOTES = {id: 212, name: 'TOXOTES', type: 'unit'};
// TRANSPORT_SHIP_ATLANTEAN = {id: 213, name: 'TRANSPORT_SHIP_ATLANTEAN', type: 'unit'};
// TRANSPORT_SHIP_CHINESE = {id: 214, name: 'TRANSPORT_SHIP_CHINESE', type: 'unit'};
// TRANSPORT_SHIP_EGYPTIAN = {id: 215, name: 'TRANSPORT_SHIP_EGYPTIAN', type: 'unit'};
// TRANSPORT_SHIP_GREEK = {id: 216, name: 'TRANSPORT_SHIP_GREEK', type: 'unit'};
// TRANSPORT_SHIP_JAPANESE = {id: 217, name: 'TRANSPORT_SHIP_JAPANESE', type: 'unit'};
// TRANSPORT_SHIP_NORSE = {id: 218, name: 'TRANSPORT_SHIP_NORSE', type: 'unit'};
// TRIREME = {id: 219, name: 'TRIREME', type: 'unit'};
// TROLL = {id: 220, name: 'TROLL', type: 'unit'};
// TURMA_HERO = {id: 221, name: 'TURMA_HERO', type: 'unit'};
// TURMA = {id: 222, name: 'TURMA', type: 'unit'};
// UMIBOZU = {id: 223, name: 'UMIBOZU', type: 'unit'};
// VALKYRIE = {id: 224, name: 'VALKYRIE', type: 'unit'};
// VENGEFUL_SHINIGAMI = {id: 225, name: 'VENGEFUL_SHINIGAMI', type: 'unit'};
// VILLAGER_GREEK = {id: 226, name: 'VILLAGER_GREEK', type: 'unit'};
// WADJET = {id: 227, name: 'WADJET', type: 'unit'};
// WALKING_WOODS = {id: 228, name: 'WALKING_WOODS', type: 'unit'};
// WANYUDO = {id: 229, name: 'WANYUDO', type: 'unit'};
// WAR_BARGE = {id: 230, name: 'WAR_BARGE', type: 'unit'};
// WAR_ELEPHANT = {id: 231, name: 'WAR_ELEPHANT', type: 'unit'};
// WAR_TURTLE = {id: 232, name: 'WAR_TURTLE', type: 'unit'};
// WASEN = {id: 233, name: 'WASEN', type: 'unit'};
// WATER_CARNIVORA = {id: 234, name: 'WATER_CARNIVORA', type: 'unit'};
// WEN_ZHONG_HERO = {id: 235, name: 'WEN_ZHONG_HERO', type: 'unit'};
// WHITE_HORSE_CAVALRY = {id: 236, name: 'WHITE_HORSE_CAVALRY', type: 'unit'};
// WRETCH = {id: 237, name: 'WRETCH', type: 'unit'};
// WUZU_JAVELINEER = {id: 238, name: 'WUZU_JAVELINEER', type: 'unit'};
// XUANWU = {id: 239, name: 'XUANWU', type: 'unit'};
// YANG_JIAN_HERO = {id: 240, name: 'YANG_JIAN_HERO', type: 'unit'};
// YARI_SPEARMAN = {id: 241, name: 'YARI_SPEARMAN', type: 'unit'};
// YAZI = {id: 242, name: 'YAZI', type: 'unit'};
// YINGLONG = {id: 243, name: 'YINGLONG', type: 'unit'};
// YUMI_ARCHER = {id: 244, name: 'YUMI_ARCHER', type: 'unit'};
// YUMI_HORSE_ARCHER = {id: 245, name: 'YUMI_HORSE_ARCHER', type: 'unit'};
// ZHUQUE_LANDED = {id: 246, name: 'ZHUQUE_LANDED', type: 'unit'};
// ZHUQUE = {id: 247, name: 'ZHUQUE', type: 'unit'};
// ARCHERY_RANGE = {id: 248, name: 'ARCHERY_RANGE', type: 'building'};
// ARMORY_ATLANTEAN = {id: 249, name: 'ARMORY_ATLANTEAN', type: 'building'};
// ARMORY_CHINESE = {id: 250, name: 'ARMORY_CHINESE', type: 'building'};
// ARMORY_EGYPTIANS = {id: 251, name: 'ARMORY_EGYPTIANS', type: 'building'};
// ARMORY_GREEK = {id: 252, name: 'ARMORY_GREEK', type: 'building'};
// ARMORY_JAPANESE = {id: 253, name: 'ARMORY_JAPANESE', type: 'building'};
// ARMORY_NORSE = {id: 254, name: 'ARMORY_NORSE', type: 'building'};
// BAOLEI = {id: 255, name: 'BAOLEI', type: 'building'};
// BARRACKS = {id: 256, name: 'BARRACKS', type: 'building'};
// CASTLE = {id: 257, name: 'CASTLE', type: 'building'};
// CITADEL_CENTER_ATLANTEAN = {id: 258, name: 'CITADEL_CENTER_ATLANTEAN', type: 'building'};
// CITADEL_CENTER_CHINESE = {id: 259, name: 'CITADEL_CENTER_CHINESE', type: 'building'};
// CITADEL_CENTER_EGYPTIAN = {id: 260, name: 'CITADEL_CENTER_EGYPTIAN', type: 'building'};
// CITADEL_CENTER_GREEK = {id: 261, name: 'CITADEL_CENTER_GREEK', type: 'building'};
// CITADEL_CENTER_NORSE = {id: 262, name: 'CITADEL_CENTER_NORSE', type: 'building'};
// COUNTER_BARRACKS = {id: 263, name: 'COUNTER_BARRACKS', type: 'building'};
// DOCK_ATLANTEAN = {id: 264, name: 'DOCK_ATLANTEAN', type: 'building'};
// DOCK_CHINESE = {id: 265, name: 'DOCK_CHINESE', type: 'building'};
// DOCK_EGYPTIAN = {id: 266, name: 'DOCK_EGYPTIAN', type: 'building'};
// DOCK_GREEK = {id: 267, name: 'DOCK_GREEK', type: 'building'};
// DOCK_JAPANESE = {id: 268, name: 'DOCK_JAPANESE', type: 'building'};
// DOCK_NORSE = {id: 269, name: 'DOCK_NORSE', type: 'building'};
// DOJO = {id: 270, name: 'DOJO', type: 'building'};
// DWARVEN_ARMORY = {id: 271, name: 'DWARVEN_ARMORY', type: 'building'};
// ECONOMIC_GUILD = {id: 272, name: 'ECONOMIC_GUILD', type: 'building'};
// FARM_ATLANTEAN = {id: 273, name: 'FARM_ATLANTEAN', type: 'building'};
// FARM_CHINESE = {id: 274, name: 'FARM_CHINESE', type: 'building'};
// FARM_EGYPTIAN = {id: 275, name: 'FARM_EGYPTIAN', type: 'building'};
// FARM_GREEK = {id: 276, name: 'FARM_GREEK', type: 'building'};
// FARM_JAPANESE = {id: 277, name: 'FARM_JAPANESE', type: 'building'};
// FARM_NORSE = {id: 278, name: 'FARM_NORSE', type: 'building'};
// FORTRESS = {id: 279, name: 'FORTRESS', type: 'building'};
// GRANARY_EGYPTIAN = {id: 280, name: 'GRANARY_EGYPTIAN', type: 'building'};
// GRANARY = {id: 281, name: 'GRANARY', type: 'building'};
// GREAT_HALL = {id: 282, name: 'GREAT_HALL', type: 'building'};
// GUARDHOUSE = {id: 283, name: 'GUARDHOUSE', type: 'building'};
// HILL_FORT = {id: 284, name: 'HILL_FORT', type: 'building'};
// HOUSE_ATLANTEAN = {id: 285, name: 'HOUSE_ATLANTEAN', type: 'building'};
// HOUSE_EGYPTIAN = {id: 286, name: 'HOUSE_EGYPTIAN', type: 'building'};
// HOUSE_GREEK = {id: 287, name: 'HOUSE_GREEK', type: 'building'};
// HOUSE_JAPANESE = {id: 288, name: 'HOUSE_JAPANESE', type: 'building'};
// HOUSE_NORSE = {id: 289, name: 'HOUSE_NORSE', type: 'building'};
// IMPERIAL_ACADEMY = {id: 290, name: 'IMPERIAL_ACADEMY', type: 'building'};
// LIGHTHOUSE = {id: 291, name: 'LIGHTHOUSE', type: 'building'};
// LONGHOUSE = {id: 292, name: 'LONGHOUSE', type: 'building'};
// LUMBER_CAMP = {id: 293, name: 'LUMBER_CAMP', type: 'building'};
// MACHINE_WORKSHOP = {id: 294, name: 'MACHINE_WORKSHOP', type: 'building'};
// MANOR = {id: 295, name: 'MANOR', type: 'building'};
// MARKET_ATLANTEAN = {id: 296, name: 'MARKET_ATLANTEAN', type: 'building'};
// MARKET_CHINESE = {id: 297, name: 'MARKET_CHINESE', type: 'building'};
// MARKET_EGYPTIAN = {id: 298, name: 'MARKET_EGYPTIAN', type: 'building'};
// MARKET_GREEK = {id: 299, name: 'MARKET_GREEK', type: 'building'};
// MARKET_JAPANESE = {id: 300, name: 'MARKET_JAPANESE', type: 'building'};
// MARKET_NORSE = {id: 301, name: 'MARKET_NORSE', type: 'building'};
// MIGDOL_STRONGHOLD = {id: 302, name: 'MIGDOL_STRONGHOLD', type: 'building'};
// MILITARY_ACADEMY = {id: 303, name: 'MILITARY_ACADEMY', type: 'building'};
// MILITARY_CAMP_TOWER_TRAINING_YARD = {id: 304, name: 'MILITARY_CAMP_TOWER_TRAINING_YARD', type: 'building'};
// MILITARY_CAMP_TOWER = {id: 305, name: 'MILITARY_CAMP_TOWER', type: 'building'};
// MILITARY_CAMP = {id: 306, name: 'MILITARY_CAMP', type: 'building'};
// MILLITARY_BARRACKS = {id: 307, name: 'MILLITARY_BARRACKS', type: 'building'};
// MINING_CAMP_EGYPTIAN = {id: 308, name: 'MINING_CAMP_EGYPTIAN', type: 'building'};
// MINING_CAMP_JAPANESE = {id: 309, name: 'MINING_CAMP_JAPANESE', type: 'building'};
// MIRROR_TOWER = {id: 310, name: 'MIRROR_TOWER', type: 'building'};
// MONUMENT_TO_GODS = {id: 311, name: 'MONUMENT_TO_GODS', type: 'building'};
// MONUMENT_TO_PHARAOHS = {id: 312, name: 'MONUMENT_TO_PHARAOHS', type: 'building'};
// MONUMENT_TO_PRIESTS = {id: 313, name: 'MONUMENT_TO_PRIESTS', type: 'building'};
// MONUMENT_TO_SOLDIERS = {id: 314, name: 'MONUMENT_TO_SOLDIERS', type: 'building'};
// MONUMENT_TO_VILLAGERS = {id: 315, name: 'MONUMENT_TO_VILLAGERS', type: 'building'};
// OBELISK = {id: 316, name: 'OBELISK', type: 'building'};
// PALACE = {id: 317, name: 'PALACE', type: 'building'};
// SENTINEL = {id: 318, name: 'SENTINEL', type: 'building'};
// SENTRY_TOWER_ATLANTEAN = {id: 319, name: 'SENTRY_TOWER_ATLANTEAN', type: 'building'};
// SENTRY_TOWER_CHINESE = {id: 320, name: 'SENTRY_TOWER_CHINESE', type: 'building'};
// SENTRY_TOWER_EGYPTIAN = {id: 321, name: 'SENTRY_TOWER_EGYPTIAN', type: 'building'};
// SENTRY_TOWER_GREEK = {id: 322, name: 'SENTRY_TOWER_GREEK', type: 'building'};
// SENTRY_TOWER_JAPANESE = {id: 323, name: 'SENTRY_TOWER_JAPANESE', type: 'building'};
// SENTRY_TOWER_NORSE = {id: 324, name: 'SENTRY_TOWER_NORSE', type: 'building'};
// SHENNOGS_FARM = {id: 325, name: 'SHENNOGS_FARM', type: 'building'};
// SHRINE = {id: 326, name: 'SHRINE', type: 'building'};
// SIEGE_WORKS = {id: 327, name: 'SIEGE_WORKS', type: 'building'};
// SILO = {id: 328, name: 'SILO', type: 'building'};
// SKY_PASSAGE = {id: 329, name: 'SKY_PASSAGE', type: 'building'};
// STABLE_JAPANESE = {id: 330, name: 'STABLE_JAPANESE', type: 'building'};
// STABLE = {id: 331, name: 'STABLE', type: 'building'};
// STOREHOUSE = {id: 332, name: 'STOREHOUSE', type: 'building'};
// TEMPLE_ATLANTEAN = {id: 333, name: 'TEMPLE_ATLANTEAN', type: 'building'};
// TEMPLE_CHINESE = {id: 334, name: 'TEMPLE_CHINESE', type: 'building'};
// TEMPLE_EGYPTIAN = {id: 335, name: 'TEMPLE_EGYPTIAN', type: 'building'};
// TEMPLE_GREEK = {id: 336, name: 'TEMPLE_GREEK', type: 'building'};
// TEMPLE_JAPANESE = {id: 337, name: 'TEMPLE_JAPANESE', type: 'building'};
// TEMPLE_NORSE = {id: 338, name: 'TEMPLE_NORSE', type: 'building'};
// TOWN_CENTER_ATLANTEAN = {id: 339, name: 'TOWN_CENTER_ATLANTEAN', type: 'building'};
// TOWN_CENTER_CHINESE = {id: 340, name: 'TOWN_CENTER_CHINESE', type: 'building'};
// TOWN_CENTER_EGYPTIAN = {id: 341, name: 'TOWN_CENTER_EGYPTIAN', type: 'building'};
// TOWN_CENTER_GREEK = {id: 342, name: 'TOWN_CENTER_GREEK', type: 'building'};
// TOWN_CENTER_JAPANESE = {id: 343, name: 'TOWN_CENTER_JAPANESE', type: 'building'};
// TOWN_CENTER_NORSE = {id: 344, name: 'TOWN_CENTER_NORSE', type: 'building'};
// VILLAGE_CENTER_ATLANTEAN = {id: 345, name: 'VILLAGE_CENTER_ATLANTEAN', type: 'building'};
// VILLAGE_CENTER_CHINESE = {id: 346, name: 'VILLAGE_CENTER_CHINESE', type: 'building'};
// VILLAGE_CENTER_EGYPTIAN = {id: 347, name: 'VILLAGE_CENTER_EGYPTIAN', type: 'building'};
// VILLAGE_CENTER_GREEK = {id: 348, name: 'VILLAGE_CENTER_GREEK', type: 'building'};
// VILLAGE_CENTER_JAPANESE = {id: 349, name: 'VILLAGE_CENTER_JAPANESE', type: 'building'};
// VILLAGE_CENTER_NORSE = {id: 350, name: 'VILLAGE_CENTER_NORSE', type: 'building'};
// WATERMILL = {id: 351, name: 'WATERMILL', type: 'building'};
// WONDER_FUXI_CHINESE = {id: 352, name: 'WONDER_FUXI_CHINESE', type: 'building'};
// WONDER_HADES_GREEK = {id: 353, name: 'WONDER_HADES_GREEK', type: 'building'};
// WONDER_ISIS_EGYPTIAN = {id: 354, name: 'WONDER_ISIS_EGYPTIAN', type: 'building'};
// WONDER_KRONOS_ATLANTEAN = {id: 355, name: 'WONDER_KRONOS_ATLANTEAN', type: 'building'};
// WONDER_ODIN_NORSE = {id: 356, name: 'WONDER_ODIN_NORSE', type: 'building'};
// WONDER_POSEIDON_GREEK = {id: 357, name: 'WONDER_POSEIDON_GREEK', type: 'building'};
// WONDER_TSUKUYOMI_JAPANESE = {id: 358, name: 'WONDER_TSUKUYOMI_JAPANESE', type: 'building'};
// WONDER_ZEUS_GREEK = {id: 359, name: 'WONDER_ZEUS_GREEK', type: 'building'};
// WOODEN_WALL_CONNECTOR_ATLANTEAN = {id: 360, name: 'WOODEN_WALL_CONNECTOR_ATLANTEAN', type: 'building'};
// WOODEN_WALL_CONNECTOR_CHINESE = {id: 361, name: 'WOODEN_WALL_CONNECTOR_CHINESE', type: 'building'};
// WOODEN_WALL_CONNECTOR_EGYPTIAN = {id: 362, name: 'WOODEN_WALL_CONNECTOR_EGYPTIAN', type: 'building'};
// WOODEN_WALL_CONNECTOR_GREEK = {id: 363, name: 'WOODEN_WALL_CONNECTOR_GREEK', type: 'building'};
// WOODEN_WALL_CONNECTOR_JAPANESE = {id: 364, name: 'WOODEN_WALL_CONNECTOR_JAPANESE', type: 'building'};
// WOODEN_WALL_CONNECTOR_NORSE = {id: 365, name: 'WOODEN_WALL_CONNECTOR_NORSE', type: 'building'};
// WOODEN_WALL_GATE_ATLANTEAN = {id: 366, name: 'WOODEN_WALL_GATE_ATLANTEAN', type: 'building'};
// WOODEN_WALL_GATE_CHINESE = {id: 367, name: 'WOODEN_WALL_GATE_CHINESE', type: 'building'};
// WOODEN_WALL_GATE_EGYPTIAN = {id: 368, name: 'WOODEN_WALL_GATE_EGYPTIAN', type: 'building'};
// WOODEN_WALL_GATE_GREEK = {id: 369, name: 'WOODEN_WALL_GATE_GREEK', type: 'building'};
// WOODEN_WALL_GATE_JAPANESE = {id: 370, name: 'WOODEN_WALL_GATE_JAPANESE', type: 'building'};
// WOODEN_WALL_GATE_NORSE = {id: 371, name: 'WOODEN_WALL_GATE_NORSE', type: 'building'};
// WOODEN_WALL_LONG_ATLANTEAN = {id: 372, name: 'WOODEN_WALL_LONG_ATLANTEAN', type: 'building'};
// WOODEN_WALL_LONG_CHINESE = {id: 373, name: 'WOODEN_WALL_LONG_CHINESE', type: 'building'};
// WOODEN_WALL_LONG_EGYPTIAN = {id: 374, name: 'WOODEN_WALL_LONG_EGYPTIAN', type: 'building'};
// WOODEN_WALL_LONG_JAPANESE = {id: 375, name: 'WOODEN_WALL_LONG_JAPANESE', type: 'building'};
// WOODEN_WALL_MEDUIM_ATLANTEAN = {id: 376, name: 'WOODEN_WALL_MEDUIM_ATLANTEAN', type: 'building'};
// WOODEN_WALL_MEDUIM_CHINESE = {id: 377, name: 'WOODEN_WALL_MEDUIM_CHINESE', type: 'building'};
// WOODEN_WALL_MEDUIM_EGYPTIAN = {id: 378, name: 'WOODEN_WALL_MEDUIM_EGYPTIAN', type: 'building'};
// WOODEN_WALL_MEDUIM_GREEK = {id: 379, name: 'WOODEN_WALL_MEDUIM_GREEK', type: 'building'};
// WOODEN_WALL_MEDUIM_JAPANESE = {id: 380, name: 'WOODEN_WALL_MEDUIM_JAPANESE', type: 'building'};
// WOODEN_WALL_MEDUIM_NORSE = {id: 381, name: 'WOODEN_WALL_MEDUIM_NORSE', type: 'building'};
// WOODEN_WALL_SHORT_ATLANTEAN = {id: 382, name: 'WOODEN_WALL_SHORT_ATLANTEAN', type: 'building'};
// WOODEN_WALL_SHORT_CHINESE = {id: 383, name: 'WOODEN_WALL_SHORT_CHINESE', type: 'building'};
// WOODEN_WALL_SHORT_EGYPTIAN = {id: 384, name: 'WOODEN_WALL_SHORT_EGYPTIAN', type: 'building'};
// WOODEN_WALL_SHORT_GREEK = {id: 385, name: 'WOODEN_WALL_SHORT_GREEK', type: 'building'};
// WOODEN_WALL_SHORT_JAPANESE = {id: 386, name: 'WOODEN_WALL_SHORT_JAPANESE', type: 'building'};
// WOODEN_WALL_SMALL = {id: 387, name: 'WOODEN_WALL_SMALL', type: 'building'};
// BUILDINGS = {id: 388, name: 'BUILDINGS', type: 'None'};
// CHAMPIOM_OF_FREYR_LEGEND = {id: 389, name: 'CHAMPIOM_OF_FREYR_LEGEND', type: 'None'};
// GOD_POWERS = {id: 390, name: 'GOD_POWERS', type: 'None'};
// MINION_OTHER = {id: 391, name: 'MINION_OTHER', type: 'None'};
// ONNA_MUSHA_HERO = {id: 392, name: 'ONNA-MUSHA_HERO', type: 'None'};
// RAMMING_GALLEY = {id: 393, name: 'RAMMING-GALLEY', type: 'None'};
// RAMMING_WASEN = {id: 394, name: 'RAMMING-WASEN', type: 'None'};
// RAVEN = {id: 395, name: 'RAVEN', type: 'None'};
// TECHS = {id: 396, name: 'TECHS', type: 'None'};
// ARMORY_EGYPTIAN = {id: 397, name: 'ARMORY_EGYPTIAN', type: 'None'};
// HOUSE_CHINESE = {id: 398, name: 'HOUSE_CHINESE', type: 'None'};
// MILLITARY_ACADEMY = {id: 399, name: 'MILLITARY_ACADEMY', type: 'None'};
// SHENNONGS_FARM = {id: 400, name: 'SHENNONGS_FARM', type: 'None'};
// STABLE_GREEK = {id: 401, name: 'STABLE_GREEK', type: 'None'};
// WONDER_JAPANESE = {id: 402, name: 'WONDER_JAPANESE', type: 'None'};
// WOODEN_WALL_CHINESE = {id: 403, name: 'WOODEN_WALL_CHINESE', type: 'None'};
// WOODEN_WALL_EGYPTIAN = {id: 404, name: 'WOODEN_WALL_EGYPTIAN', type: 'None'};
// WOODEN_WALL_GREEK = {id: 405, name: 'WOODEN_WALL_GREEK', type: 'None'};
// WOODEN_WALL_JAPANESE = {id: 406, name: 'WOODEN_WALL_JAPANESE', type: 'None'};
// CHAMPION_CAVALRY_NORSE = {id: 407, name: 'CHAMPION_CAVALRY_NORSE', type: 'tech'};
// N_CHAMPION_INFANTRY_NORSE_HF = {id: 408, name: 'N_CHAMPION_INFANTRY_NORSE_HF', type: 'tech'};
// CONSCRIPT_GREAT_HALL_SOLDIERS = {id: 409, name: 'CONSCRIPT_GREAT_HALL_SOLDIERS', type: 'tech'};
// CONSCRIPT_HILL_FORT_SOLDIERS = {id: 410, name: 'CONSCRIPT_HILL_FORT_SOLDIERS', type: 'tech'};
// CONSCRIPT_LONGHOUSE_SOLDIERS = {id: 411, name: 'CONSCRIPT_LONGHOUSE_SOLDIERS', type: 'tech'};
// DRAFT_HORSES_NORSE = {id: 412, name: 'DRAFT_HORSES_NORSE', type: 'tech'};
// ENGINEERS_NORSE = {id: 413, name: 'ENGINEERS_NORSE', type: 'tech'};
// HEAVY_CAVALRY_NORSE = {id: 414, name: 'HEAVY_CAVALRY_NORSE', type: 'tech'};
// N_HEAVY_INFANTRY_NORSE_HF = {id: 415, name: 'N_HEAVY_INFANTRY_NORSE_HF', type: 'tech'};
// LEVY_GREAT_HALL_SOLDIERS = {id: 416, name: 'LEVY_GREAT_HALL_SOLDIERS', type: 'tech'};
// LEVY_HILL_FORT_SOLDIERS = {id: 417, name: 'LEVY_HILL_FORT_SOLDIERS', type: 'tech'};
// LEVY_LONGHOUSE_SOLDIERS = {id: 418, name: 'LEVY_LONGHOUSE_SOLDIERS', type: 'tech'};
// MEDIUM_CAVALRY_NORSE = {id: 419, name: 'MEDIUM_CAVALRY_NORSE', type: 'tech'};
// N_MEDIUM_INFANTRY_NORSE_HF = {id: 420, name: 'N_MEDIUM_INFANTRY_NORSE_HF', type: 'tech'};
// BUSHIDO_AND_GOD_BLESSINGS = {id: 421, name: 'BUSHIDO_AND_GOD_BLESSINGS', type: 'None'};
// // MAJOR_GOD = {id: 422, name: 'MAJOR_GOD', type: 'None'};
// // MINOR_GOD = {id: 423, name: 'MINOR_GOD', type: 'None'};
// ABUNDANCE = {id: 424, name: 'ABUNDANCE', type: 'tech'};
// ADVANCED_DEFENSES = {id: 425, name: 'ADVANCED_DEFENSES', type: 'tech'};
// ADVANCED_FORTIFICATIONS = {id: 426, name: 'ADVANCED_FORTIFICATIONS', type: 'tech'};
// ADZE_OF_WEPWAWET = {id: 427, name: 'ADZE_OF_WEPWAWET', type: 'tech'};
// AEGIS_SHIELD = {id: 428, name: 'AEGIS_SHIELD', type: 'tech'};
// ALLUVIAL_CLAY = {id: 429, name: 'ALLUVIAL_CLAY', type: 'tech'};
// AMBASSADORS = {id: 430, name: 'AMBASSADORS', type: 'tech'};
// ANASTROPHE = {id: 431, name: 'ANASTROPHE', type: 'tech'};
// ARCHITECTS = {id: 432, name: 'ARCHITECTS', type: 'tech'};
// ARGIVE_PATRONAGE = {id: 433, name: 'ARGIVE_PATRONAGE', type: 'tech'};
// ARGONAUTS = {id: 434, name: 'ARGONAUTS', type: 'tech'};
// ASCETIC_PRACTICES = {id: 435, name: 'ASCETIC_PRACTICES', type: 'tech'};
// ASMMETRICAL_BOW = {id: 436, name: 'ASMMETRICAL_BOW', type: 'tech'};
// ASPER_BLOOD = {id: 437, name: 'ASPER_BLOOD', type: 'tech'};
// ATEF_CROWN = {id: 438, name: 'ATEF_CROWN', type: 'tech'};
// AUTUMN_OF_ABUNDANCE = {id: 439, name: 'AUTUMN_OF_ABUNDANCE', type: 'tech'};
// AVENGING_SPIRIT = {id: 440, name: 'AVENGING_SPIRIT', type: 'tech'};
// AXE_OF_VENGEANCE = {id: 441, name: 'AXE_OF_VENGEANCE', type: 'tech'};
// BALLISTICS = {id: 442, name: 'BALLISTICS', type: 'tech'};
// BEAST_SLAYER = {id: 443, name: 'BEAST_SLAYER', type: 'tech'};
// BERSERKERGANG = {id: 444, name: 'BERSERKERGANG', type: 'tech'};
// BITE_OF_THE_SHARK = {id: 445, name: 'BITE_OF_THE_SHARK', type: 'tech'};
// BOILING_OIL = {id: 446, name: 'BOILING_OIL', type: 'tech'};
// BONE_BOW = {id: 447, name: 'BONE_BOW', type: 'tech'};
// BOOK_OF_THOTH = {id: 448, name: 'BOOK_OF_THOTH', type: 'tech'};
// BOTTOMLESS_STOMACH = {id: 449, name: 'BOTTOMLESS_STOMACH', type: 'tech'};
// BOW_SAW = {id: 450, name: 'BOW_SAW', type: 'tech'};
// BRAVERY = {id: 451, name: 'BRAVERY', type: 'tech'};
// BRONZE_ARMOR = {id: 452, name: 'BRONZE_ARMOR', type: 'tech'};
// BRONZE_SHIELD = {id: 453, name: 'BRONZE_SHIELD', type: 'tech'};
// BRONZE_WALL_ATLANTEAN = {id: 454, name: 'BRONZE_WALL_ATLANTEAN', type: 'tech'};
// BRONZE_WEAPONS = {id: 455, name: 'BRONZE_WEAPONS', type: 'tech'};
// BURNING_MALEVOLENCE = {id: 456, name: 'BURNING_MALEVOLENCE', type: 'tech'};
// BURNING_PITCH = {id: 457, name: 'BURNING_PITCH', type: 'tech'};
// CALL_OF_VALHALLA = {id: 458, name: 'CALL_OF_VALHALLA', type: 'tech'};
// CARPENTERS = {id: 459, name: 'CARPENTERS', type: 'tech'};
// CARRIER_PIGEONS = {id: 460, name: 'CARRIER_PIGEONS', type: 'tech'};
// CAVE_TROLL = {id: 461, name: 'CAVE_TROLL', type: 'tech'};
// CELERITY = {id: 462, name: 'CELERITY', type: 'tech'};
// CELESTIAL_WEAPONS = {id: 463, name: 'CELESTIAL_WEAPONS', type: 'tech'};
// CHAMPION_AXEMEN = {id: 464, name: 'CHAMPION_AXEMEN', type: 'tech'};
// CHAMPION_CAMEL_RIDERS = {id: 465, name: 'CHAMPION_CAMEL_RIDERS', type: 'tech'};
// CHAMPION_CAVALRY_ATLANTEAN = {id: 466, name: 'CHAMPION_CAVALRY_ATLANTEAN', type: 'tech'};
// CHAMPION_CAVALRY_GREEK = {id: 467, name: 'CHAMPION_CAVALRY_GREEK', type: 'tech'};
// CHAMPION_CHARIOTS = {id: 468, name: 'CHAMPION_CHARIOTS', type: 'tech'};
// CHAMPION_ELEPHANTS = {id: 469, name: 'CHAMPION_ELEPHANTS', type: 'tech'};
// CHAMPION_INFANTRY_ATLANTEAN = {id: 470, name: 'CHAMPION_INFANTRY_ATLANTEAN', type: 'tech'};
// CHAMPION_INFANTRY_GREEK = {id: 471, name: 'CHAMPION_INFANTRY_GREEK', type: 'tech'};
// CHAMPION_RANGED_SOLDIERS_GREEK = {id: 472, name: 'CHAMPION_RANGED_SOLDIERS_GREEK', type: 'tech'};
// CHAMPION_RANGED_SOLDIERS = {id: 473, name: 'CHAMPION_RANGED_SOLDIERS', type: 'tech'};
// CHAMPION_SLINGERS = {id: 474, name: 'CHAMPION_SLINGERS', type: 'tech'};
// CHAMPION_SPEARMEN = {id: 475, name: 'CHAMPION_SPEARMEN', type: 'tech'};
// CHAMPION_WARSHIP = {id: 476, name: 'CHAMPION_WARSHIP', type: 'tech'};
// CHANNELS = {id: 477, name: 'CHANNELS', type: 'tech'};
// CHASING_THE_SUN = {id: 478, name: 'CHASING_THE_SUN', type: 'tech'};
// CHTHONIC_RITES = {id: 479, name: 'CHTHONIC_RITES', type: 'tech'};
// CITADEL_WALL = {id: 480, name: 'CITADEL_WALL', type: 'tech'};
// CLAIRVOYANCE = {id: 481, name: 'CLAIRVOYANCE', type: 'tech'};
// COINAGE = {id: 482, name: 'COINAGE', type: 'tech'};
// CONDEMNED_SOUL = {id: 483, name: 'CONDEMNED_SOUL', type: 'tech'};
// CONSCRIPT_BARRACKS_SOLDIERS = {id: 484, name: 'CONSCRIPT_BARRACKS_SOLDIERS', type: 'tech'};
// CONSCRIPT_CAVALRY = {id: 485, name: 'CONSCRIPT_CAVALRY', type: 'tech'};
// CONSCRIPT_COUNTER_SOLDIERS = {id: 486, name: 'CONSCRIPT_COUNTER_SOLDIERS', type: 'tech'};
// CONSCRIPT_INFANTRY = {id: 487, name: 'CONSCRIPT_INFANTRY', type: 'tech'};
// CONSCRIPT_MAINLINE_SOLIDERS = {id: 488, name: 'CONSCRIPT_MAINLINE_SOLIDERS', type: 'tech'};
// CONSCRIPT_MIGDOL_SOLDIERS = {id: 489, name: 'CONSCRIPT_MIGDOL_SOLDIERS', type: 'tech'};
// CONSCRIPT_PALACE_SOLDIERS = {id: 490, name: 'CONSCRIPT_PALACE_SOLDIERS', type: 'tech'};
// CONSCRIPT_RANGED_SOLDIERS = {id: 491, name: 'CONSCRIPT_RANGED_SOLDIERS', type: 'tech'};
// CONSCRIPT_SAILORS = {id: 492, name: 'CONSCRIPT_SAILORS', type: 'tech'};
// COPPER_ARMOR = {id: 493, name: 'COPPER_ARMOR', type: 'tech'};
// COPPER_SHIELDS = {id: 494, name: 'COPPER_SHIELDS', type: 'tech'};
// COPPER_WEAPONS = {id: 495, name: 'COPPER_WEAPONS', type: 'tech'};
// CRENELLATIONS = {id: 496, name: 'CRENELLATIONS', type: 'tech'};
// CRIMSON_LINEN = {id: 497, name: 'CRIMSON_LINEN', type: 'tech'};
// CRIOSPHINX = {id: 498, name: 'CRIOSPHINX', type: 'tech'};
// CROCODILOPOLIS = {id: 499, name: 'CROCODILOPOLIS', type: 'tech'};
// CRUSHING_WAVES = {id: 500, name: 'CRUSHING_WAVES', type: 'tech'};
// DAKTYLOI = {id: 501, name: 'DAKTYLOI', type: 'tech'};
// DAN_NO_URA_TACTICS = {id: 502, name: 'DAN-NO-URA_TACTICS', type: 'tech'};
// DARK_WATER = {id: 503, name: 'DARK_WATER', type: 'tech'};
// DAUGHTERS_OF_THE_SEA = {id: 504, name: 'DAUGHTERS_OF_THE_SEA', type: 'tech'};
// DEADLY_RAGE = {id: 505, name: 'DEADLY_RAGE', type: 'tech'};
// DEADLY_SNARE = {id: 506, name: 'DEADLY_SNARE', type: 'tech'};
// DEIMOS_SWORD_OF_DREAD = {id: 507, name: 'DEIMOS_SWORD_OF_DREAD', type: 'tech'};
// DEN_DEN_DRUMS = {id: 508, name: 'DEN_DEN_DRUMS', type: 'tech'};
// DESERT_WIND = {id: 509, name: 'DESERT_WIND', type: 'tech'};
// DEVOTEES_OF_ATLAS = {id: 510, name: 'DEVOTEES_OF_ATLAS', type: 'tech'};
// DIONYSIA = {id: 511, name: 'DIONYSIA', type: 'tech'};
// DISABLOT = {id: 512, name: 'DISABLOT', type: 'tech'};
// DIVINE_BLOOD = {id: 513, name: 'DIVINE_BLOOD', type: 'tech'};
// DIVINE_BOOKS = {id: 514, name: 'DIVINE_BOOKS', type: 'tech'};
// DIVINE_JUDGMENT = {id: 515, name: 'DIVINE_JUDGMENT', type: 'tech'};
// DIVINE_PREFECTURE = {id: 516, name: 'DIVINE_PREFECTURE', type: 'tech'};
// DRAGONSCALE_SHIELDS = {id: 517, name: 'DRAGONSCALE_SHIELDS', type: 'tech'};
// DROUGHT_SHIPS = {id: 518, name: 'DROUGHT_SHIPS', type: 'tech'};
// DWARVEN_AUGER = {id: 519, name: 'DWARVEN_AUGER', type: 'tech'};
// DWARVEN_BREASTPLATE = {id: 520, name: 'DWARVEN_BREASTPLATE', type: 'tech'};
// DWARVEN_MINE = {id: 521, name: 'DWARVEN_MINE', type: 'tech'};
// DWARVEN_WEAPONS = {id: 522, name: 'DWARVEN_WEAPONS', type: 'tech'};
// EIGHT_BANNERS = {id: 523, name: 'EIGHT_BANNERS', type: 'tech'};
// ELECTRUM_BULLETS = {id: 524, name: 'ELECTRUM_BULLETS', type: 'tech'};
// EMPYRIAN_SPEED = {id: 525, name: 'EMPYRIAN_SPEED', type: 'tech'};
// ENCLOSED_DECK = {id: 526, name: 'ENCLOSED_DECK', type: 'tech'};
// ENYOS_BOW_OF_HORROR = {id: 527, name: 'ENYOS_BOW_OF_HORROR', type: 'tech'};
// ETERNAL_HAUNTING = {id: 528, name: 'ETERNAL_HAUNTING', type: 'tech'};
// EYES_IN_THE_FOREST = {id: 529, name: 'EYES_IN_THE_FOREST', type: 'tech'};
// FACE_OF_THE_GORGON = {id: 530, name: 'FACE_OF_THE_GORGON', type: 'tech'};
// FEASTS_OF_RENOWN = {id: 531, name: 'FEASTS_OF_RENOWN', type: 'tech'};
// FEET_OF_THE_JACKAL = {id: 532, name: 'FEET_OF_THE_JACKAL', type: 'tech'};
// FLAMES_OF_TYPHON = {id: 533, name: 'FLAMES_OF_TYPHON', type: 'tech'};
// FLAMING_BLOOD = {id: 534, name: 'FLAMING_BLOOD', type: 'tech'};
// FLOOD_CONTROL = {id: 535, name: 'FLOOD_CONTROL', type: 'tech'};
// FLOOD_OF_THE_NILE = {id: 536, name: 'FLOOD_OF_THE_NILE', type: 'tech'};
// FORCE_OF_THE_WEST_WIND = {id: 537, name: 'FORCE_OF_THE_WEST_WIND', type: 'tech'};
// FORGE_OF_OLYMPUS = {id: 538, name: 'FORGE_OF_OLYMPUS', type: 'tech'};
// FORTIFIED_TOWN_CENTER = {id: 539, name: 'FORTIFIED_TOWN_CENTER', type: 'tech'};
// FORTIFIED_WALL_EGYPTIAN = {id: 540, name: 'FORTIFIED_WALL_EGYPTIAN', type: 'tech'};
// FORTIFIED_WALL_GREEK = {id: 541, name: 'FORTIFIED_WALL_GREEK', type: 'tech'};
// FRENZIED_DASH = {id: 542, name: 'FRENZIED_DASH', type: 'tech'};
// FREYRS_GIFT = {id: 543, name: 'FREYRS_GIFT', type: 'tech'};
// FRONTLINE_HEROICS = {id: 544, name: 'FRONTLINE_HEROICS', type: 'tech'};
// FUNERAL_BARGE = {id: 545, name: 'FUNERAL_BARGE', type: 'tech'};
// FUNERAL_RITES = {id: 546, name: 'FUNERAL_RITES', type: 'tech'};
// FURY_OF_THE_FALLEN = {id: 547, name: 'FURY_OF_THE_FALLEN', type: 'tech'};
// GALES_FURY = {id: 548, name: 'GALES_FURY', type: 'tech'};
// GEMINI = {id: 549, name: 'GEMINI', type: 'tech'};
// GILDED_SHIELDS = {id: 550, name: 'GILDED_SHIELDS', type: 'tech'};
// GJALLARHORN = {id: 551, name: 'GJALLARHORN', type: 'tech'};
// GOHEI_WANDS = {id: 552, name: 'GOHEI_WANDS', type: 'tech'};
// GOLDEN_APPLES = {id: 553, name: 'GOLDEN_APPLES', type: 'tech'};
// GOLDEN_KITE = {id: 554, name: 'GOLDEN_KITE', type: 'tech'};
// GRANITE_BLOOD = {id: 555, name: 'GRANITE_BLOOD', type: 'tech'};
// GRANITE_MAW = {id: 556, name: 'GRANITE_MAW', type: 'tech'};
// GRASP_OF_RAN = {id: 557, name: 'GRASP_OF_RAN', type: 'tech'};
// GREATEST_OF_FIFTY = {id: 558, name: 'GREATEST_OF_FIFTY', type: 'tech'};
// GUARD_TOWER_GREEK = {id: 559, name: 'GUARD_TOWER_GREEK', type: 'tech'};
// GUARD_TOWER = {id: 560, name: 'GUARD_TOWER', type: 'tech'};
// GUARDIAN_OF_IO = {id: 561, name: 'GUARDIAN_OF_IO', type: 'tech'};
// HALL_OF_THANES = {id: 562, name: 'HALL_OF_THANES', type: 'tech'};
// HALO_OF_THE_SUN = {id: 563, name: 'HALO_OF_THE_SUN', type: 'tech'};
// HAMASK = {id: 564, name: 'HAMASK', type: 'tech'};
// HAMMER_OF_THUNDER = {id: 565, name: 'HAMMER_OF_THUNDER', type: 'tech'};
// HAND_AXE = {id: 566, name: 'HAND_AXE', type: 'tech'};
// HAND_OF_TALOS = {id: 567, name: 'HAND_OF_TALOS', type: 'tech'};
// HANNYA_MASK = {id: 568, name: 'HANNYA_MASK', type: 'tech'};
// HEAVENLY_BARRAGE = {id: 569, name: 'HEAVENLY_BARRAGE', type: 'tech'};
// HEAVY_AXEMEN = {id: 570, name: 'HEAVY_AXEMEN', type: 'tech'};
// HEAVY_CAMEL_RIDERS = {id: 571, name: 'HEAVY_CAMEL_RIDERS', type: 'tech'};
// HEAVY_CAVALRY_ATLANTEAN = {id: 572, name: 'HEAVY_CAVALRY_ATLANTEAN', type: 'tech'};
// HEAVY_CAVALRY_GREEK = {id: 573, name: 'HEAVY_CAVALRY_GREEK', type: 'tech'};
// HEAVY_CHARIOTS = {id: 574, name: 'HEAVY_CHARIOTS', type: 'tech'};
// HEAVY_ELEPHANTS = {id: 575, name: 'HEAVY_ELEPHANTS', type: 'tech'};
// HEAVY_INFANTRY_ATLANTEAN = {id: 576, name: 'HEAVY_INFANTRY_ATLANTEAN', type: 'tech'};
// HEAVY_INFANTRY_GREEK = {id: 577, name: 'HEAVY_INFANTRY_GREEK', type: 'tech'};
// HEAVY_RANGED_SOLDIERS_ATLANTEAN = {id: 578, name: 'HEAVY_RANGED_SOLDIERS_ATLANTEAN', type: 'tech'};
// HEAVY_RANGED_SOLDIERS_GREEK = {id: 579, name: 'HEAVY_RANGED_SOLDIERS_GREEK', type: 'tech'};
// HEAVY_SLINGERS = {id: 580, name: 'HEAVY_SLINGERS', type: 'tech'};
// HEAVY_SPEARMAN = {id: 581, name: 'HEAVY_SPEARMAN', type: 'tech'};
// HEAVY_WARSHIPS = {id: 582, name: 'HEAVY_WARSHIPS', type: 'tech'};
// HEPHAESTUS_REVENGE = {id: 583, name: 'HEPHAESTUS_REVENGE', type: 'tech'};
// HERBAL_MEDICINE = {id: 584, name: 'HERBAL_MEDICINE', type: 'tech'};
// HEROIC_FLEET = {id: 585, name: 'HEROIC_FLEET', type: 'tech'};
// HEROIC_RENEWAL = {id: 586, name: 'HEROIC_RENEWAL', type: 'tech'};
// HIERACOSPHINX = {id: 587, name: 'HIERACOSPHINX', type: 'tech'};
// HOOVES_OF_THE_WIND = {id: 588, name: 'HOOVES_OF_THE_WIND', type: 'tech'};
// HORNS_OF_CONSECRATION = {id: 589, name: 'HORNS_OF_CONSECRATION', type: 'tech'};
// HUNTERS_STRENGHT = {id: 590, name: 'HUNTERS_STRENGHT', type: 'tech'};
// HUNTRESS_AXE = {id: 591, name: 'HUNTRESS_AXE', type: 'tech'};
// HUSBANDRY = {id: 592, name: 'HUSBANDRY', type: 'tech'};
// HYPERION = {id: 593, name: 'HYPERION', type: 'tech'};
// IMPERIAL_ORDER = {id: 594, name: 'IMPERIAL_ORDER', type: 'tech'};
// IRON_ARMOR = {id: 595, name: 'IRON_ARMOR', type: 'tech'};
// IRON_SHIELDS = {id: 596, name: 'IRON_SHIELDS', type: 'tech'};
// IRON_WALL = {id: 597, name: 'IRON_WALL', type: 'tech'};
// IRON_WEAPONS = {id: 598, name: 'IRON_WEAPONS', type: 'tech'};
// IRRIGATION = {id: 599, name: 'IRRIGATION', type: 'tech'};
// IVORY_NETSUKE = {id: 600, name: 'IVORY_NETSUKE', type: 'tech'};
// JOTUNS = {id: 601, name: 'JOTUNS', type: 'tech'};
// KAGURA = {id: 602, name: 'KAGURA', type: 'tech'};
// KATAGI = {id: 603, name: 'KATAGI', type: 'tech'};
// KUAFU_CHIEFTAIN = {id: 604, name: 'KUAFU_CHIEFTAIN', type: 'tech'};
// KUMIKI = {id: 605, name: 'KUMIKI', type: 'tech'};
// LABYRINTH_OF_MINOS = {id: 606, name: 'LABYRINTH_OF_MINOS', type: 'tech'};
// LANCE_OF_STONE = {id: 607, name: 'LANCE_OF_STONE', type: 'tech'};
// LAST_STAND = {id: 608, name: 'LAST_STAND', type: 'tech'};
// LEATHER_FRAME_SHIELD = {id: 609, name: 'LEATHER_FRAME_SHIELD', type: 'tech'};
// LEIZUS_SILK = {id: 610, name: 'LEIZUS_SILK', type: 'tech'};
// LEVY_BARRACKS_SOLDIERS = {id: 611, name: 'LEVY_BARRACKS_SOLDIERS', type: 'tech'};
// LEVY_CAVALRY = {id: 612, name: 'LEVY_CAVALRY', type: 'tech'};
// LEVY_COUNTER_SOLDIERS = {id: 613, name: 'LEVY_COUNTER_SOLDIERS', type: 'tech'};
// LEVY_INFANTRY_GREEK = {id: 614, name: 'LEVY_INFANTRY_GREEK', type: 'tech'};
// LEVY_MAINLINE_SOLDIERS = {id: 615, name: 'LEVY_MAINLINE_SOLDIERS', type: 'tech'};
// LEVY_MIGDOL_SOLDIERS = {id: 616, name: 'LEVY_MIGDOL_SOLDIERS', type: 'tech'};
// LEVY_PALACE_SOLDIERS = {id: 617, name: 'LEVY_PALACE_SOLDIERS', type: 'tech'};
// LEVY_RANGED_SOLDIERS = {id: 618, name: 'LEVY_RANGED_SOLDIERS', type: 'tech'};
// LONG_SERPENT = {id: 619, name: 'LONG_SERPENT', type: 'tech'};
// LORD_OF_HORSES = {id: 620, name: 'LORD_OF_HORSES', type: 'tech'};
// MAELSTROM = {id: 621, name: 'MAELSTROM', type: 'tech'};
// MASONS = {id: 622, name: 'MASONS', type: 'tech'};
// MASTER_OF_WEAPONRY = {id: 623, name: 'MASTER_OF_WEAPONRY', type: 'tech'};
// MECHANICAL_ARTISANS = {id: 624, name: 'MECHANICAL_ARTISANS', type: 'tech'};
// MEDIUM_AXEMAN = {id: 625, name: 'MEDIUM_AXEMAN', type: 'tech'};
// MEDIUM_CAVALRY_GREEK = {id: 626, name: 'MEDIUM_CAVALRY_GREEK', type: 'tech'};
// MEDIUM_INFANTRY_ATLANTEAN = {id: 627, name: 'MEDIUM_INFANTRY_ATLANTEAN', type: 'tech'};
// MEDIUM_INFANTRY_GREEK = {id: 628, name: 'MEDIUM_INFANTRY_GREEK', type: 'tech'};
// MEDIUM_RANGED_SOLDIERS_ATLANTEAN = {id: 629, name: 'MEDIUM_RANGED_SOLDIERS_ATLANTEAN', type: 'tech'};
// MEDIUM_RANGED_SOLDIERS_GREEK = {id: 630, name: 'MEDIUM_RANGED_SOLDIERS_GREEK', type: 'tech'};
// MEDIUM_SLINGERS = {id: 631, name: 'MEDIUM_SLINGERS', type: 'tech'};
// MEDIUM_SPEARMAN = {id: 632, name: 'MEDIUM_SPEARMAN', type: 'tech'};
// METEORIC_IRON_ARMOR = {id: 633, name: 'METEORIC_IRON_ARMOR', type: 'tech'};
// MONSTROUS_RAGE = {id: 634, name: 'MONSTROUS_RAGE', type: 'tech'};
// MOUNTAINOUS_MIGHT = {id: 635, name: 'MOUNTAINOUS_MIGHT', type: 'tech'};
// MYTHIC_REJUVENATION = {id: 636, name: 'MYTHIC_REJUVENATION', type: 'tech'};
// NEBTY = {id: 637, name: 'NEBTY', type: 'tech'};
// NECROPOLIS = {id: 638, name: 'NECROPOLIS', type: 'tech'};
// NEW_KINGDOM = {id: 639, name: 'NEW_KINGDOM', type: 'tech'};
// NINE_WAVES = {id: 640, name: 'NINE_WAVES', type: 'tech'};
// OLYMPIAN_PARENTAGE = {id: 641, name: 'OLYMPIAN_PARENTAGE', type: 'tech'};
// OLYMPIAN_WEAPONS = {id: 642, name: 'OLYMPIAN_WEAPONS', type: 'tech'};
// OMNISCIENCE = {id: 643, name: 'OMNISCIENCE', type: 'tech'};
// ONI_MASK = {id: 644, name: 'ONI_MASK', type: 'tech'};
// ONMYODO = {id: 645, name: 'ONMYODO', type: 'tech'};
// ORICHALCUM_MAIL = {id: 646, name: 'ORICHALCUM_MAIL', type: 'tech'};
// ORICHALCUM_WALL = {id: 647, name: 'ORICHALCUM_WALL', type: 'tech'};
// PEACH_OF_IMMORTALITY = {id: 648, name: 'PEACH_OF_IMMORTALITY', type: 'tech'};
// PERCEPTION = {id: 649, name: 'PERCEPTION', type: 'tech'};
// PETRIFICATION = {id: 650, name: 'PETRIFICATION', type: 'tech'};
// PHOBOS_SPEAR_OF_PANIC = {id: 651, name: 'PHOBOS_SPEAR_OF_PANIC', type: 'tech'};
// PICKAXE = {id: 652, name: 'PICKAXE', type: 'tech'};
// PIONEER_OF_THE_SKIES = {id: 653, name: 'PIONEER_OF_THE_SKIES', type: 'tech'};
// PLOW = {id: 654, name: 'PLOW', type: 'tech'};
// POSEIDONS_SECRET = {id: 655, name: 'POSEIDONS_SECRET', type: 'tech'};
// POWER_OF_CHAOS = {id: 656, name: 'POWER_OF_CHAOS', type: 'tech'};
// PROPHETIC_SIGHT = {id: 657, name: 'PROPHETIC_SIGHT', type: 'tech'};
// PTAH = {id: 658, name: 'PTAH', type: 'tech'};
// PURSE_SEINE = {id: 659, name: 'PURSE_SEINE', type: 'tech'};
// QILINS_BLESSING = {id: 660, name: 'QILINS_BLESSING', type: 'tech'};
// QUARRY = {id: 661, name: 'QUARRY', type: 'tech'};
// RAGE_OF_SLAUGHTER = {id: 662, name: 'RAGE_OF_SLAUGHTER', type: 'tech'};
// RAMPAGE = {id: 663, name: 'RAMPAGE', type: 'tech'};
// RED_CLIFFS_FLEET = {id: 664, name: 'RED_CLIFFS_FLEET', type: 'tech'};
// REINCARNATION = {id: 665, name: 'REINCARNATION', type: 'tech'};
// RESTLESS_ARMY = {id: 666, name: 'RESTLESS_ARMY', type: 'tech'};
// RHEIAS_GIFT = {id: 667, name: 'RHEIAS_GIFT', type: 'tech'};
// RIGSTHULA = {id: 668, name: 'RIGSTHULA', type: 'tech'};
// RIME = {id: 669, name: 'RIME', type: 'tech'};
// RING_GIVER = {id: 670, name: 'RING_GIVER', type: 'tech'};
// RING_OATH = {id: 671, name: 'RING_OATH', type: 'tech'};
// RISING_TIDE = {id: 672, name: 'RISING_TIDE', type: 'tech'};
// ROAR_OF_ORTHUS = {id: 673, name: 'ROAR_OF_ORTHUS', type: 'tech'};
// ROCK_SOLID = {id: 674, name: 'ROCK_SOLID', type: 'tech'};
// SACRED_CATS = {id: 675, name: 'SACRED_CATS', type: 'tech'};
// SAFEGUARD = {id: 676, name: 'SAFEGUARD', type: 'tech'};
// SALT_AMPHORA = {id: 677, name: 'SALT_AMPHORA', type: 'tech'};
// SALTWATER_SPRING = {id: 678, name: 'SALTWATER_SPRING', type: 'tech'};
// SARISSA = {id: 679, name: 'SARISSA', type: 'tech'};
// SASHIMONO_BANNERMEN = {id: 680, name: 'SASHIMONO_BANNERMEN', type: 'tech'};
// SCALLOPED_AXE = {id: 681, name: 'SCALLOPED_AXE', type: 'tech'};
// SCORCHING_FEATHERS = {id: 682, name: 'SCORCHING_FEATHERS', type: 'tech'};
// SEASIDE_INFILTRATORS = {id: 683, name: 'SEASIDE_INFILTRATORS', type: 'tech'};
// SECRETS_OF_THE_TITANS = {id: 684, name: 'SECRETS_OF_THE_TITANS', type: 'tech'};
// SERPENT_SPEAR = {id: 685, name: 'SERPENT_SPEAR', type: 'tech'};
// SERVANTS_OF_GLORY = {id: 686, name: 'SERVANTS_OF_GLORY', type: 'tech'};
// SESSRUMNIR = {id: 687, name: 'SESSRUMNIR', type: 'tech'};
// SHADUF = {id: 688, name: 'SHADUF', type: 'tech'};
// SHAFT_MINE = {id: 689, name: 'SHAFT_MINE', type: 'tech'};
// SHAFTS_OF_PLAGUE = {id: 690, name: 'SHAFTS_OF_PLAGUE', type: 'tech'};
// SHAKER_OF_HEAVEN = {id: 691, name: 'SHAKER_OF_HEAVEN', type: 'tech'};
// SHOULDER_OF_TALOS = {id: 692, name: 'SHOULDER_OF_TALOS', type: 'tech'};
// SIGNAL_FIRES = {id: 693, name: 'SIGNAL_FIRES', type: 'tech'};
// SINISTER_DEFIANCE = {id: 694, name: 'SINISTER_DEFIANCE', type: 'tech'};
// SKIN_OF_THE_RHINO = {id: 695, name: 'SKIN_OF_THE_RHINO', type: 'tech'};
// SLASH_AND_BURN = {id: 696, name: 'SLASH_AND_BURN', type: 'tech'};
// SLIENT_RESOLVE = {id: 697, name: 'SLIENT_RESOLVE', type: 'tech'};
// SLINGS_OF_THE_SUN = {id: 698, name: 'SLINGS_OF_THE_SUN', type: 'tech'};
// SOJUTSU = {id: 699, name: 'SOJUTSU', type: 'tech'};
// SOLAR_BARQUE = {id: 700, name: 'SOLAR_BARQUE', type: 'tech'};
// SON_OF_LOONG = {id: 701, name: 'SON_OF_LOONG', type: 'tech'};
// SONG_OF_MIDSUMMER = {id: 702, name: 'SONG_OF_MIDSUMMER', type: 'tech'};
// SONS_OF_THE_SUN = {id: 703, name: 'SONS_OF_THE_SUN', type: 'tech'};
// SONS_SLEIPNIR = {id: 704, name: 'SONS_SLEIPNIR', type: 'tech'};
// SOUTHERN_FIRE = {id: 705, name: 'SOUTHERN_FIRE', type: 'tech'};
// SPEAR_OF_HORUS = {id: 706, name: 'SPEAR_OF_HORUS', type: 'tech'};
// SPIRIT_OF_MAAT = {id: 707, name: 'SPIRIT_OF_MAAT', type: 'tech'};
// SPIRITED_CHARGE = {id: 708, name: 'SPIRITED_CHARGE', type: 'tech'};
// SPOILS_OF_WAR = {id: 709, name: 'SPOILS_OF_WAR', type: 'tech'};
// STONE_WALL_ATLANTEAN = {id: 710, name: 'STONE_WALL_ATLANTEAN', type: 'tech'};
// STONE_WALL_EGYPTIAN = {id: 711, name: 'STONE_WALL_EGYPTIAN', type: 'tech'};
// STONE_WALL_GREEK = {id: 712, name: 'STONE_WALL_GREEK', type: 'tech'};
// STONE_WALL_NORSE = {id: 713, name: 'STONE_WALL_NORSE', type: 'tech'};
// SUMO_TRAINING = {id: 714, name: 'SUMO_TRAINING', type: 'tech'};
// SUN_DRIED_MUD_BRICK = {id: 715, name: 'SUN_DRIED_MUD_BRICK', type: 'tech'};
// SUN_RAY = {id: 716, name: 'SUN_RAY', type: 'tech'};
// SURVIVAL_EQUIPMENT = {id: 717, name: 'SURVIVAL_EQUIPMENT', type: 'tech'};
// SWINE_ARRAY = {id: 718, name: 'SWINE_ARRAY', type: 'tech'};
// SYLVAN_LORE = {id: 719, name: 'SYLVAN_LORE', type: 'tech'};
// TAI_CHI = {id: 720, name: 'TAI_CHI', type: 'tech'};
// TAX_COLLECTORS = {id: 721, name: 'TAX_COLLECTORS', type: 'tech'};
// TEMPESTUOUS_STORM = {id: 722, name: 'TEMPESTUOUS_STORM', type: 'tech'};
// TEMPLE_OF_HEALING = {id: 723, name: 'TEMPLE_OF_HEALING', type: 'tech'};
// TENSHU = {id: 724, name: 'TENSHU', type: 'tech'};
// TEN_FIST_SWORD = {id: 725, name: 'TEN-FIST_SWORD', type: 'tech'};
// THEIA = {id: 726, name: 'THEIA', type: 'tech'};
// THRACIAN_HORSES = {id: 727, name: 'THRACIAN_HORSES', type: 'tech'};
// THUNDERING_HOOVES = {id: 728, name: 'THUNDERING_HOOVES', type: 'tech'};
// THUNDEROUS_PRESENCE = {id: 729, name: 'THUNDEROUS_PRESENCE', type: 'tech'};
// THURISAZ_RUNE = {id: 730, name: 'THURISAZ_RUNE', type: 'tech'};
// TITAN_SHIELD = {id: 731, name: 'TITAN_SHIELD', type: 'tech'};
// TITANOMACHY = {id: 732, name: 'TITANOMACHY', type: 'tech'};
// TUSKS_OF_APEDEMAK = {id: 733, name: 'TUSKS_OF_APEDEMAK', type: 'tech'};
// TWILIGHT_OF_THE_GODS = {id: 734, name: 'TWILIGHT_OF_THE_GODS', type: 'tech'};
// VALGALDR = {id: 735, name: 'VALGALDR', type: 'tech'};
// VALLEY_OF_THE_KINGS = {id: 736, name: 'VALLEY_OF_THE_KINGS', type: 'tech'};
// VAULTS_OF_EREBUS = {id: 737, name: 'VAULTS_OF_EREBUS', type: 'tech'};
// VIBRANT_LAND = {id: 738, name: 'VIBRANT_LAND', type: 'tech'};
// VIKINGS = {id: 739, name: 'VIKINGS', type: 'tech'};
// VOLCANIC_FORGE = {id: 740, name: 'VOLCANIC_FORGE', type: 'tech'};
// WATCH_TOWER_GREEK = {id: 741, name: 'WATCH_TOWER_GREEK', type: 'tech'};
// WATCH_TOWER = {id: 742, name: 'WATCH_TOWER', type: 'tech'};
// WEIGHTLESS_MACE = {id: 743, name: 'WEIGHTLESS_MACE', type: 'tech'};
// WILL_OF_KRONOS = {id: 744, name: 'WILL_OF_KRONOS', type: 'tech'};
// WIND_SICKLES = {id: 745, name: 'WIND_SICKLES', type: 'tech'};
// WINGED_MESSENGER = {id: 746, name: 'WINGED_MESSENGER', type: 'tech'};
// WINTER_HARVEST = {id: 747, name: 'WINTER_HARVEST', type: 'tech'};
// WISDOM_OF_NINE = {id: 748, name: 'WISDOM_OF_NINE', type: 'tech'};
// WRATH_OF_THE_DEEP = {id: 749, name: 'WRATH_OF_THE_DEEP', type: 'tech'};
// XUANYUANS_BLOODLINE = {id: 750, name: 'XUANYUANS_BLOODLINE', type: 'tech'};
// YDALIR = {id: 751, name: 'YDALIR', type: 'tech'};
// AMATERASU = {id: 752, name: 'AMATERASU', type: 'major_god'};
// FREYR = {id: 753, name: 'FREYR', type: 'major_god'};
// FUXI = {id: 754, name: 'FUXI', type: 'major_god'};
// GAIA = {id: 755, name: 'GAIA', type: 'major_god'};
// HADES = {id: 756, name: 'HADES', type: 'major_god'};
// ISIS = {id: 757, name: 'ISIS', type: 'major_god'};
// KRONOS = {id: 758, name: 'KRONOS', type: 'major_god'};
// LOKI = {id: 759, name: 'LOKI', type: 'major_god'};
// NUWA = {id: 760, name: 'NUWA', type: 'major_god'};
// ODIN = {id: 761, name: 'ODIN', type: 'major_god'};
// ORANOS = {id: 762, name: 'ORANOS', type: 'major_god'};
// POSEIDON = {id: 763, name: 'POSEIDON', type: 'major_god'};
// RA = {id: 764, name: 'RA', type: 'major_god'};
// SHENNONG = {id: 765, name: 'SHENNONG', type: 'major_god'};
// SUSANOO = {id: 766, name: 'SUSANOO', type: 'major_god'};
// THOR = {id: 767, name: 'THOR', type: 'major_god'};
// TSUKUYOMI = {id: 768, name: 'TSUKUYOMI', type: 'major_god'};
// ZEUS = {id: 769, name: 'ZEUS', type: 'major_god'};
// SET = {id: 770, name: 'SET', type: 'major_god'};
// N_CHAMPION_INFANTRY_NORSE_LH = {id: 771, name: 'N_CHAMPION_INFANTRY_NORSE_LH', type: 'tech'};
// N_HEAVY_INFANTRY_NORSE_LH = {id: 772, name: 'N_HEAVY_INFANTRY_NORSE_LH', type: 'tech'};
// N_MEDIUM_INFANTRY_NORSE_LH = {id: 773, name: 'N_MEDIUM_INFANTRY_NORSE_LH', type: 'tech'};


// test if it works
function formatName(originalname) {
    let name = originalname.toString().replace(/<br>/g, '\n').replace(/\n+/g, '\n');
    const items = name.split('\n');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (items[i].length > 10) {
            let space = item.indexOf(' ');
            if (space !== -1) {
                items[i] = item.slice(0, space) + '\n' + item.slice(space + 1);
                let alternativeSpace = space + 1 + item.slice(space + 1).indexOf(' ');
                if (alternativeSpace !== -1) {
                    if (Math.abs((item.length / 2) - alternativeSpace) < Math.abs((item.length / 2) - space)) {
                        items[i] = item.slice(0, alternativeSpace) + '\n' + item.slice(alternativeSpace + 1);
                    }
                }
            } else {
                let hyphen = item.indexOf('-');
                if (hyphen !== -1) {
                    items[i] = item.slice(0, hyphen) + '-\n' + item.slice(hyphen + 1);
                    let alternativeHyphen = hyphen + 1 + item.slice(hyphen + 1).indexOf('-');
                    if (alternativeHyphen !== -1) {
                        if (Math.abs((item.length / 2) - alternativeHyphen) < Math.abs((item.length / 2) - hyphen)) {
                            items[i] = item.slice(0, alternativeHyphen) + '-\n' + item.slice(alternativeHyphen + 1);
                        }
                    }
                }
            }
        }
    }
    return items.join('\n');
}

class Tree {
    constructor() {
        this.offsets = {
            archaic_1_y: 0,
            archaic_2_y: 0,
            classical_1_y: 0, 
            classical_2_y: 0,
            heroic_1_y: 0, // Norse 4 icons
            heroic_2_y: 0,
            heroic_3_y: 0,
            mythic_1_y: 0,
            mythic_2_y: 0,
        };
        this.padding = 20; //20
        this.height = Math.max(window.innerHeight - 2 * (this.padding), 100); // this.height = Math.max(window.innerHeight - 80, 100);
        this.width = 0;
        // this.padding = 20;
        this.element_height = 0;
        this.lanes = [];
        this.offsets_x = 150; // 150 is starting offset from the left to accommodate age icons
    }

    // this.element_height is a fraction of height // 8 element_heights and 10 gaps

    // not sure if archaic_1 is correct of if it should be archaic_1_y
    updateOffsets() {
        // this sets caret size
        // this.element_height = (this.height * 0.95) / 4 / 3.25; // this.height / 4 / 3 // *0.95 is to get the bottom row (mythic_2) to fit
        this.element_height = (this.height) / 4 / 3 * 1.04; // this.height / 4 / 3 //
        // let element_offset = this.element_height / 3 /(1 + (0.1 * 2 / 3)); // this.element_height / 2 // vert distance between carets in the same column *1/2 gap is half caret *1/3 gap is 1/3 a caret 
        let element_offset = this.element_height / 3; // * 0.9
        console.log('this.element_height / 3: ', this.element_height / 3);                                            //decreasing element offset does not incease element_height 
        console.log('this.element_height / 3 * 0.6: ', this.element_height / 3 * 0.6);  
        // console.log('in updateOffsets - this.element_height: ', this.element_height, 'element_offset: ', element_offset);

        this.offsets.archaic_1 = this.padding - 10; // this.padding = 20, -10 moves top of age row icons down to give them visible border. padding=10 reintroduces verticle scroll bar
        this.offsets.archaic_2 = this.offsets.archaic_1 + this.element_height + element_offset;
        // this.offsets.archaic_2 = this.offsets.archaic_1 + this.element_height + element_offset;
        this.offsets.classical_1 = this.offsets.archaic_2 + this.element_height + element_offset;
        this.offsets.classical_2 = this.offsets.classical_1 + this.element_height + element_offset;
        this.offsets.heroic_1 = this.offsets.classical_2 + this.element_height + element_offset;
        this.offsets.heroic_2 = this.offsets.heroic_1 + this.element_height + element_offset;
        this.offsets.heroic_3 = this.offsets.heroic_2 + this.element_height + element_offset;
        this.offsets.mythic_1 = this.offsets.heroic_3 + this.element_height + element_offset;
        this.offsets.mythic_2 = this.offsets.mythic_1 + this.element_height + element_offset; //added -10
    }

    updatePositions() {
        // console.log('UP top - this.lanes: ', this.lanes);
        for (let lane of this.lanes) {
            lane.updatePositions(this.offsets, this.element_height);
        }

        let x = this.padding + this.offsets_x;
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].x = x;
            x = x + this.lanes[i].width + this.padding;
        }
        this.width = x;

        for (let lane of this.lanes) {
            // console.log('this.height: ', this.height);
            // console.log('this.element_height: ', this.element_height);
            // console.log('this.offsets: ', this.offsets , 'this.element_height: ', this.element_height);
            lane.updatePositions(this.offsets, this.element_height);
        }
        // console.log('UP bottom - this.lanes: ', this.lanes);
    }
}

class Lane {
    constructor() {
        this.rows = {
            archaic_1: [],
            archaic_2: [],
            classical_1: [],
            classical_2: [],
            heroic_1: [],
            heroic_2: [],
            heroic_3: [],
            mythic_1: [],
            mythic_2: [],  
        };
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.padding = 10;
    }
    // x = 311.021 for Mountain Giant and Jotun 
    updatePositions(offsets, element_length) {
        let lane_width = 0;
        // console.log('Object.keys(this.rows): ', Object.keys(this.rows));
        for (let r of Object.keys(this.rows)) {
            
                // console.log('r: ', r);
                // console.log('offsets[r]: ', offsets[r]);
                // console.log('this.rows[r][i]: ', this.rows[r][i]);
                let x = this.x;
                let row_width = 0;
                // console.log('this.rows[r].length: ', this.rows[r].length);
                // console.log('this.rows[r]: ', this.rows[r]);
                // console.log('r: ', r, 'this.rows: ', this.rows);
                for (let i = 0; i < this.rows[r].length; i++) {
                    try {
                        // console.log('***r: ', r,'i: ', i,'this.rows[r][i]: ',this.rows[r][i], 'x :', x, 'this.rows[r][i].width:', this.rows[r][i].width, 'this.padding: ', this.padding);
                        // console.log('this.rows[r][i] before: ', this.rows[r][i]);
                        // console.log('this.rows[r][i].y before: ', this.rows[r][i].y);
                        this.rows[r][i].y = offsets[r]; //maybe caret.y is set here
                        // console.log('this.rows[r][i].y after: ', this.rows[r][i].y);
                        this.rows[r][i].x = x;
                        this.rows[r][i].width = element_length;
                        this.rows[r][i].height = element_length;
                        x = x + this.rows[r][i].width + this.padding;
                        row_width = row_width + this.rows[r][i].width + this.padding;
                    } catch (error) {
                        console.error('An error occured: ', error.message);
                        console.log('error, r: ', r);
                        console.log('this.rows[r]: ', this.rows[r]); 
                        console.log('this.rows[r][i]: ', this.rows[r][i]); //
                    }
                }
                lane_width = Math.max(lane_width, row_width);
            
                
        }
        this.width = lane_width;

        for (let r of Object.keys(this.rows)) {
            for (let i = 0; i < this.rows[r].length; i++) {
                if (this.rows[r][i].isBuilding() && this.rows[r][i].id.slice(-3) !== '_SP') { // I think this is whats moving DWARVEN ARMORY
                    this.rows[r][i].x = this.x + ((this.width - this.padding) / 2) - (this.rows[r][i].width / 2); //
                }
            }
        }
        // ToDo - add getConnections

        let connections = getConnections();
        // console.log('connections', connections);
        let carets = this.nonBuidingCarets();
        for (let connection of connections) {
            let from = connection[0];
            let to = connection[1]; // not used??
            // console.log('connection: ', connection,'from connection[0]: ', from, 'to connection[1]: ', to, 'to.x:', to.x);
            let allConnectionsForFrom = connections.filter(c => c[0] === from && carets.has(c[0]) && carets.has(c[1]));
            let allRelevantTos = allConnectionsForFrom.map(c => c[1]);
            if (carets.has(from) && carets.get(from).x < Math.min(allRelevantTos.map(to_ => carets.get(to_).x))) {
                carets.get(from).x = Math.min(allRelevantTos.map(to_ => carets.get(to_).x));
            }
            if (carets.has(from) && carets.get(from).x > Math.max(allRelevantTos.map(to_ => carets.get(to_).x))) {
                console.assert(allRelevantTos.length === 1, `Overlapping carets: ${allRelevantTos}`)
                allRelevantTos.forEach(to_ => carets.get(to_).x = carets.get(from).x);
            }
        }
    }

    nonBuidingCarets() {
        let c = new Map();
        for (let r of Object.keys(this.rows)) {
            for (let caret of this.rows[r]) {
                if (!caret.isBuilding()) {
                    c.set(caret.id, caret);
                }
            }
        }
        return c;
    }

    caretIds() {
        const idList = [];
        for (let r of Object.keys(this.rows)) {
            for (let i = 0; i < this.rows[r].length; i++) {
                idList.push(this.rows[r][i].id);
            }
        }
        return idList;
    }
}

class Caret {
    constructor(type, name, id) {
        this.type = type;
        this.name = name;
        this.id = PREFIX[type.type] + formatId(id); //
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 0;
    }

    isBuilding() {
        return this.type === TYPES.BUILDING;
    }
}

function formatId(string) {
    // return string.toString().replace(/\s/g, '_').replace(/\//g, '_').toLowerCase();
    return string.toString().toLowerCase();
}

// function getName(id, itemType) {
//     //ToDo handle unique stuff properly
//     if(isFinite.toString().startsWith('UNIQUE')) {
//         return id
//     }
//     const languageNameId = data['data'][itemType][id]['LanguageNameId'];
//     return data['string'][languageNameId];
// }
 
// function building(id) {
//     return new Caret(TYPES.BUILDING, getName(id, 'buildings'), id);
// }

//my first version
// function getName(obj_name_id, itemType) { //(id, itemType)
//     return obj_name_id.name;
// }
// console.log('test123 test123 test123 test123 test123 test123 test123 test123 test123 test123');

// Previous working version jan 16
// function getName(obj_name_id) { //(id, itemType)
//     let nameFormatted = obj_name_id.name.toString().replace(/_/g, ' ');
//     if (nameFormatted.length > 9) {
//         let lastSpaceIndex = nameFormatted.lastIndexOf(' ');
//         nameFormatted = `${nameFormatted.slice(0,lastSpaceIndex)}\n${nameFormatted.slice(lastSpaceIndex)}`;
//     }
//     // console.log('nameFormatted: ', nameFormatted);
//     return nameFormatted;
// }


function getName(obj_name_id) { //(id, itemType)
    // let nameFormatted = obj_name_id.name.toString().replace(/_/g, ' ');
    // if (nameFormatted.length > 9) {
    //     let lastSpaceIndex = nameFormatted.lastIndexOf(' ');
    //     nameFormatted = `${nameFormatted.slice(0,lastSpaceIndex)}\n${nameFormatted.slice(lastSpaceIndex)}`;
    // }
    let nameFormatted =  globalJsonData[obj_name_id.id]["Name"];

    // console.log('nameFormatted: ', nameFormatted);
    return nameFormatted;
}

function building(obj_name_id) { //(id)
    const caret = new Caret(TYPES.BUILDING, getName(obj_name_id, 'buildings'), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
    // return new Caret(TYPES.BUILDING, getName(obj_name_id, 'buildings'), obj_name_id.id);
}

function unit(obj_name_id) { //(id)
    // console.log('unit called. obj_name_id: ', obj_name_id)
    // return new Caret(TYPES.UNIT, getName(obj_name_id, 'units'), obj_name_id.id);
    const caret = new Caret(TYPES.UNIT, getName(obj_name_id, 'units'), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
}

function tech(obj_name_id) { //(id)
    return new Caret(TYPES.TECHNOLOGY, getName(obj_name_id, 'units'), obj_name_id.id);
}

function major_god(obj_name_id) { //(id)
    // console.log('MG - obj_name_id: ', obj_name_id);
    // console.log('obj_name_id.id: ', obj_name_id.id);
    // console.log("getName(obj_name_id, 'units'): ",getName(obj_name_id, 'units'));
    const caret = new Caret(TYPES.MAJOR_GOD, getName(obj_name_id, 'units'), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
}

function minor_god(obj_name_id) { //(id)
    // console.log('Minor God - obj_name_id: ', obj_name_id);
    // console.log('obj_name_id.id: ', obj_name_id.id);
    // console.log("getName(obj_name_id, 'units'): ",getName(obj_name_id, 'units'));
    const caret = new Caret(TYPES.MINOR_GOD, getName(obj_name_id, 'units'), obj_name_id.id);
    // console.log('caret: ', caret);
    return caret;
}

function god_power(obj_name_id) { //(id)
    // console.log('God Power - obj_name_id: ', obj_name_id);
    // console.log('obj_name_id.id: ', obj_name_id.id);
    // console.log("getName(obj_name_id, 'units'): ",getName(obj_name_id, 'units'));
    const caret = new Caret(TYPES.GOD_POWER, getName(obj_name_id, 'units'), obj_name_id.id);
    console.log('caret GP: ', caret);
    return caret;
}

function bushido_god_blessing(obj_name_id) { //(id)
    // console.log('God Power - obj_name_id: ', obj_name_id);
    // console.log('obj_name_id.id: ', obj_name_id.id);
    // console.log("getName(obj_name_id, 'units'): ",getName(obj_name_id, 'units'));
    const caret = new Caret(TYPES.BUSHIDO_GOD_BLESSING, getName(obj_name_id, 'units'), obj_name_id.id);
    console.log('caret B_GP: ', caret);
    return caret;
}

// to-add-blank-dummy-slot
let blankID_Count = 0;
function get_next_BlankID() {
    blankID_Count++;
    
    return `blankID_${blankID_Count}`;
}

function blank_caret() {
    // return new Caret(TYPES.BLANK.type, TYPES.BLANK.name, get_next_BlankID());
    return new Caret(TYPES.BLANK, TYPES.BLANK.name, get_next_BlankID());
}

function getDefaultTree() {
    let tree = new Tree();
    tree.updateOffsets();

    // townCenterLaneMatrix = [
    //     [TOWN_CENTER_NORSE], // archaic_1
    //     [GATHERER, DWARF, BERSERK], // archaic_2
    //     [RIGSTHULA], // classical_1
    //     [MASONS], // classical_2
    //     [ARCHITECTS], // heroic_1
    //     [FORTIFIED_TOWN_CENTER], // heroic_2
    //     [], // heroic_3
    //     [SECRETS_OF_THE_TITANS, ZEUS], // mythic_1
    //     [SECRETS_OF_THE_TITANS], // mythic_2
    // ];

    // addNewLaneToTree(tree, townCenterLaneMatrix);

    // oxCartLaneMatrix = [
    //     [OX_CART], // archaic_1
    //     [HUSBANDRY, BLANK, PICKAXE, HAND_AXE], // archaic_2
    //     [SURVIVAL_EQUIPMENT, PLOW], // classical_1
    //     [], // classical_2
    //     [WINTER_HARVEST, IRRIGATION, SHAFT_MINE, BOW_SAW], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [BLANK, FLOOD_CONTROL, QUARRY, CARPENTERS], // mythic_1
    //     [], // mythic_2
    // ];
    
    // addNewLaneToTree(tree, oxCartLaneMatrix);
 
    // houseLaneMatrix = [
    //     [HOUSE_NORSE], // archaic_1
    //     [FARM_NORSE], // archaic_2
    //     [], // classical_1
    //     [], // classical_2
    //     [], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, houseLaneMatrix);

    // dockLaneMatrix = [
    //     [DOCK_NORSE], // archaic_1
    //     [FISHING_SHIP_NORSE], // archaic_2
    //     [BLANK, LONGBOAT, DREKI, DRAGON_SHIP, TRANSPORT_SHIP_NORSE], // classical_1
    //     [PURSE_SEINE,        HEROIC_FLEET,    BLANK, BLANK,       ENCLOSED_DECK], // classical_2
    //     [SALT_AMPHORA, KRAKEN, HEAVY_WARSHIPS], // heroic_1
    //     [BLANK, WRATH_OF_THE_DEEP], // heroic_2
    //     [], // heroic_3
    //     [JORMUN_ELVER, CONSCRIPT_SAILORS, CHAMPION_WARSHIPS], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, dockLaneMatrix);

    // templeLaneMatrix = [
    //     [TEMPLE_NORSE], // archaic_1
    //     [HERSIR_HERO], // archaic_2
    //     [VALKYRIE, EINHERI, SAFEGUARD], // classical_1
    //     [DISABLOT, GJALLARHORN], // classical_2
    //     [MOUNTAIN_GIANT, FROST_GIANT], // heroic_1
    //     [JOTUNS, RIME], // heroic_2
    //     [], // heroic_3
    //     [OMNISCIENCE, FIRE_GIANT, FENRIS_WOLF_BROOD], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, templeLaneMatrix);

    // sentryTowerLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [SENTRY_TOWER_NORSE], // classical_1
    //     [SIGNAL_FIRES, WATCH_TOWER, CRENELLATIONS], // classical_2
    //     [CARRIER_PIGEONS, BOILING_OIL], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree,sentryTowerLaneMatrix);

    // armoryLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [ARMORY_NORSE], // classical_1
    //     [COPPER_WEAPONS, COPPER_ARMOR, COPPER_SHIELDS], // classical_2
    //     [BRONZE_WEAPONS, BRONZE_ARMOR, BRONZE_SHIELDS, BALLISTICS], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [IRON_WEAPONS, IRON_ARMOR, IRON_SHIELDS, BURNING_PITCH], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, armoryLaneMatrix);
  
    // marketLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [MARKET_NORSE], // classical_1
    //     [], // classical_2
    //     [OX_CARAVAN, TAX_COLLECTORS], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [COINAGE, AMBASSADORS], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, marketLaneMatrix);

    // longhouseLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [LONGHOUSE], // classical_1
    //     [N_MEDIUM_INFANTRY_NORSE_LH, BERSERK, THROWING_AXEMAN, HIRDMAN, HAMASK], // classical_2
    //     [N_HEAVY_INFANTRY_NORSE_LH, LEVY_LONGHOUSE_SOLDIERS, HUNTRESS_AXE], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [N_CHAMPION_INFANTRY_NORSE_LH, CONSCRIPT_LONGHOUSE_SOLDIERS, BERSERKERGANG], // mythic_1
    //     [BERSERKERGANG], // mythic_2
    // ];

    // addNewLaneToTree(tree, longhouseLaneMatrix);

    // greatHallLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [GREAT_HALL], // classical_1
    //     [HERSIR_HERO, RAIDING_CAVALRY, SESSRUMNIR, THUNDERING_HOOVES, MEDIUM_CAVALRY_NORSE], // classical_2
    //     [GODI_HERO, JARL, LEVY_GREAT_HALL_SOLDIERS, BLANK, HEAVY_CAVALRY_NORSE], // heroic_1
    //     [], // heroic_2
    //     [], // heroic_3
    //     [BLANK, BLANK, CONSCRIPT_GREAT_HALL_SOLDIERS,BLANK, CHAMPION_CAVALRY_NORSE], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, greatHallLaneMatrix);

    // hillFortLaneMatrix = [
    //     [], // archaic_1
    //     [], // archaic_2
    //     [], // classical_1
    //     [], // classical_2
    //     [HILL_FORT], // heroic_1
    //     [N_MEDIUM_INFANTRY_NORSE_HF, HUSKARL, PORTABLE_RAM, DRAFT_HORSES_NORSE, LEVY_HILL_FORT_SOLDIERS], // heroic_2
    //     [N_HEAVY_INFANTRY_NORSE_HF], // heroic_3
    //     [N_CHAMPION_INFANTRY_NORSE_HF, ENGINEERS_NORSE, BALLISTA, CONSCRIPT_HILL_FORT_SOLDIERS], // mythic_1
    //     [], // mythic_2
    // ];

    // addNewLaneToTree(tree, hillFortLaneMatrix);

    // tree.updatePositions();

    // const minorGodLaneMatrix = minorGodLaneMatrices[globalJsonData[SELECTED_MAJOR_GOD_ID].Name];
    const selectedMajorGodLanesMatrices = majorGodLaneMatrices[globalJsonData[SELECTED_MAJOR_GOD_ID].Name];

    console.log('selectedMajorGodLanesMatrices: ', selectedMajorGodLanesMatrices);
    console.log('typeof(selectedMajorGodLanesMatrices): ', typeof(selectedMajorGodLanesMatrices));

    for ([key, value] of Object.entries(selectedMajorGodLanesMatrices)) {
        console.log('key: ', key);
        console.log('value:', value);
        addNewLaneToTree(tree, value);
    }

    console.log('tree: ', tree);

    tree.updatePositions();

    return tree;
}

function u(unit) {
    return 'unit_' + unit;
}

function b(building) {
    return 'building_' + building;
}

function t(tech) {
    return 'tech_' + tech;
}

function getConnections() {
    // let connections = [
    //     [b(TOWN_CENTER_NORSE.id), u(GATHERER.id)],
    //     [b(TOWN_CENTER_NORSE.id), u(DWARF.id)],
    //     // [b(TOWN_CENTER_NORSE.id), u(BERSERK.id)], // need to at affixes for tc berserk
    //     // [b(TOWN_CENTER_NORSE.id), t(MASONS.id)],
    //     [t(MASONS.id), t(ARCHITECTS.id)],
    //     // [b(TOWN_CENTER_NORSE.id), t(FORTIFIED_TOWN_CENTER.id)],
    //     // [b(TOWN_CENTER_NORSE.id), t(SECRETS_OF_THE_TITANS.id)],
    //     [u(OX_CART.id), t(HUSBANDRY.id)],
    //     [u(OX_CART.id), t(PICKAXE.id)],
    //     [u(OX_CART.id), t(HAND_AXE.id)],
    //     [t(PICKAXE.id), t(SHAFT_MINE.id)],
    //     [t(SHAFT_MINE.id), t(QUARRY.id)],
    //     [t(PLOW.id), t(IRRIGATION.id)],
    //     [t(IRRIGATION.id), t(FLOOD_CONTROL.id)],
    //     [t(HAND_AXE.id), t(BOW_SAW.id)],
    //     [t(BOW_SAW.id), t(CARPENTERS.id)],
    //     [b(DOCK_NORSE.id), u(FISHING_SHIP_NORSE.id)],
    //     [b(DOCK_NORSE.id), u(LONGBOAT.id)],
    //     [b(DOCK_NORSE.id), u(DREKI.id)],
    //     [b(DOCK_NORSE.id), u(DRAGON_SHIP.id)],
    //     [b(DOCK_NORSE.id), u(TRANSPORT_SHIP_NORSE.id)],
    //     [b(TEMPLE_NORSE.id), u(HERSIR_HERO.id)],
    //     [b(TEMPLE_NORSE.id), u(VALKYRIE.id)],
    //     [b(TEMPLE_NORSE.id), u(EINHERI.id)],
    //     [b(TEMPLE_NORSE.id), t(SAFEGUARD.id)],
    //     [u(VALKYRIE.id), t(DISABLOT.id)],
    //     [u(EINHERI.id), t(GJALLARHORN.id)],
    //     [b(TEMPLE_NORSE.id), u(MOUNTAIN_GIANT.id)],
    //     [b(TEMPLE_NORSE.id), u(FROST_GIANT.id)],
    //     [u(MOUNTAIN_GIANT.id), t(JOTUNS.id)],
    //     [u(FROST_GIANT.id), t(RIME.id)],
    //     [b(TEMPLE_NORSE.id), t(OMNISCIENCE.id)],
    //     [b(TEMPLE_NORSE.id), u(FIRE_GIANT.id)],
    //     [b(TEMPLE_NORSE.id), u(FENRIS_WOLF_BROOD.id)],

    //     [u(FISHING_SHIP_NORSE.id), t(PURSE_SEINE.id)],
    //     [t(PURSE_SEINE.id), t(SALT_AMPHORA.id)],
    //     [b(LONGHOUSE.id), u(BERSERK.id)],
    //     [b(LONGHOUSE.id), u(THROWING_AXEMAN.id)],
    //     [b(LONGHOUSE.id), u(HIRDMAN.id)],
    //     [b(LONGHOUSE.id), t(N_MEDIUM_INFANTRY_NORSE_LH.id)],
    //     // [b(LONGHOUSE.id), t(LEVY_LONGHOUSE_SOLDIERS.id)],
    //     [b(LONGHOUSE.id), t(N_HEAVY_INFANTRY_NORSE_LH.id)],
    //     [t(LEVY_LONGHOUSE_SOLDIERS.id), t(CONSCRIPT_LONGHOUSE_SOLDIERS.id)],
    //     [b(LONGHOUSE.id), t(N_CHAMPION_INFANTRY_NORSE_LH.id)],
    //     [b(GREAT_HALL.id), u(HERSIR_HERO.id)],
    //     [b(GREAT_HALL.id), u(RAIDING_CAVALRY.id)],
    //     [b(GREAT_HALL.id), t(MEDIUM_CAVALRY_NORSE.id)],  // MEDIUM_CAVALRY_NORSE = {id: 11, name: "MEDIUM_CAVALRY_NORSE"};
    //     [b(GREAT_HALL.id), u(GODI_HERO.id)],
    //     [b(GREAT_HALL.id), u(JARL.id)],
    //     [b(GREAT_HALL.id), t(HEAVY_CAVALRY_NORSE.id)],
    //     [b(GREAT_HALL.id), t(LEVY_GREAT_HALL_SOLDIERS.id)],
    //     [t(HEAVY_CAVALRY_NORSE.id), t(CHAMPION_CAVALRY_NORSE.id)],
    //     [t(LEVY_GREAT_HALL_SOLDIERS.id), t(CONSCRIPT_GREAT_HALL_SOLDIERS.id)],
    //     [b(HILL_FORT.id), u(HUSKARL.id)],
    //     [b(HILL_FORT.id), u(PORTABLE_RAM.id)],
    //     [b(HILL_FORT.id), t(N_MEDIUM_INFANTRY_NORSE_HF.id)],
    //     [b(HILL_FORT.id), t(DRAFT_HORSES_NORSE.id)],
    //     [b(HILL_FORT.id), t(LEVY_HILL_FORT_SOLDIERS.id)],
    //     [t(N_MEDIUM_INFANTRY_NORSE_HF.id), t(N_HEAVY_INFANTRY_NORSE_HF.id)],
    //     [t(N_HEAVY_INFANTRY_NORSE_HF.id), t(N_CHAMPION_INFANTRY_NORSE_HF.id)],
    //     [b(HILL_FORT.id), t(ENGINEERS_NORSE.id)],
    //     [t(LEVY_HILL_FORT_SOLDIERS.id), t(CONSCRIPT_HILL_FORT_SOLDIERS.id)],
    //     [b(HILL_FORT.id), u(BALLISTA.id)]

    // ];

        // let connections = [
        //     [b(TOWN_CENTER_NORSE.id), u(GATHERER.id)],
        //     [b(TOWN_CENTER_NORSE.id), u(DWARF.id)],
        //     // [b(TOWN_CENTER_NORSE.id), u(BERSERK.id)], // need to at affixes for tc berserk
        //     // [b(TOWN_CENTER_NORSE.id), t(MASONS.id)],
        //     [t(MASONS.id), t(ARCHITECTS.id)],
        //     [u(OX_CART.id), t(HUSBANDRY.id)],
        //     [u(OX_CART.id), t(PICKAXE.id)],
        //     [u(OX_CART.id), t(HAND_AXE.id)],
        //     [t(PICKAXE.id), t(SHAFT_MINE.id)],
        //     [t(SHAFT_MINE.id), t(QUARRY.id)],
        //     [t(PLOW.id), t(IRRIGATION.id)],
        //     [t(IRRIGATION.id), t(FLOOD_CONTROL.id)],
        //     [t(HAND_AXE.id), t(BOW_SAW.id)],
        //     [t(BOW_SAW.id), t(CARPENTERS.id)],
        // ];

        // let connections = [
        //     [b(TOWN_CENTER_NORSE.id), u(GATHERER.id)],
        //     [b(TOWN_CENTER_NORSE.id), u(DWARF.id)],
        //     // [b(TOWN_CENTER_NORSE.id), u(BERSERK.id)], // need to at affixes for tc berserk
        //     // [b(TOWN_CENTER_NORSE.id), t(MASONS.id)],
        //     [t(MASONS.id), t(ARCHITECTS.id)],
        //     [u(OX_CART.id), t(HUSBANDRY.id)],
        //     [u(OX_CART.id), t(PICKAXE.id)],
        //     [u(OX_CART.id), t(HAND_AXE.id)],
        //     [t(PICKAXE.id), t(SHAFT_MINE.id)],
        //     [t(SHAFT_MINE.id), t(QUARRY.id)],
        //     [u(OX_CART.id), t(PLOW.id)], // added after check OX_CART: 146 PLOW: 654
        //     [t(PLOW.id), t(IRRIGATION.id)],
        //     [t(IRRIGATION.id), t(FLOOD_CONTROL.id)],
        //     [t(HAND_AXE.id), t(BOW_SAW.id)],
        //     [t(BOW_SAW.id), t(CARPENTERS.id)],
        // ];

    let connectionsToAdd = [
        // [TOWN_CENTER_NORSE, GATHERER],
        // [TOWN_CENTER_NORSE, DWARF],
        // // [TOWN_CENTER_NORSE, BERSERK],
        // [MASONS, ARCHITECTS],

        // [OX_CART, HUSBANDRY],
        // [OX_CART, PICKAXE],
        // [OX_CART, HAND_AXE],
        // [PICKAXE, SHAFT_MINE],
        // [SHAFT_MINE, QUARRY],
        // [HAND_AXE, BOW_SAW],
        // [BOW_SAW, CARPENTERS],
        // [OX_CART, PLOW], //
        // [PLOW, IRRIGATION],
        // [IRRIGATION, FLOOD_CONTROL],

        // [DOCK_NORSE, FISHING_SHIP_NORSE],
        // [DOCK_NORSE, LONGBOAT],
        // [DOCK_NORSE, DREKI],
        // [DOCK_NORSE, DRAGON_SHIP],
        // [DOCK_NORSE, TRANSPORT_SHIP_NORSE],
        // [TRANSPORT_SHIP_NORSE, ENCLOSED_DECK],
        // [PURSE_SEINE, SALT_AMPHORA],
        // [HEAVY_WARSHIPS, CHAMPION_WARSHIPS], //need to rename to CHAMPION_WARSHIPS

        // // [TEMPLE_NORSE, HERSIR_HERO],
        // [TEMPLE_NORSE, EINHERI],
        // [TEMPLE_NORSE, SAFEGUARD],
        // [VALKYRIE, DISABLOT],
        // [EINHERI, GJALLARHORN],
        // [MOUNTAIN_GIANT, JOTUNS],
        // [FROST_GIANT, RIME],

        // [SENTRY_TOWER_NORSE, WATCH_TOWER],
        // [SENTRY_TOWER_NORSE, SIGNAL_FIRES],
        // [SENTRY_TOWER_NORSE, CRENELLATIONS],
        // [SIGNAL_FIRES, CARRIER_PIGEONS],

        // [ARMORY_NORSE, COPPER_WEAPONS],
        // [ARMORY_NORSE, COPPER_ARMOR],
        // [ARMORY_NORSE, COPPER_SHIELDS],
        // [COPPER_WEAPONS, BRONZE_WEAPONS],
        // [COPPER_ARMOR, BRONZE_ARMOR],
        // [COPPER_SHIELDS, BRONZE_SHIELDS], // check if shield should be plural
        // [ARMORY_NORSE, BALLISTICS],
        // [BRONZE_WEAPONS, IRON_WEAPONS],
        // [BRONZE_ARMOR, IRON_ARMOR],
        // [BRONZE_SHIELDS, IRON_SHIELDS],

        // [MARKET_NORSE, OX_CARAVAN],
        // [MARKET_NORSE, TAX_COLLECTORS],
        // [TAX_COLLECTORS, AMBASSADORS],

        // [LONGHOUSE, N_MEDIUM_INFANTRY_NORSE_LH],
        // [LONGHOUSE, BERSERK],
        // [LONGHOUSE, THROWING_AXEMAN],
        // [LONGHOUSE, HIRDMAN],
        // [LONGHOUSE, HAMASK],
        // [N_MEDIUM_INFANTRY_NORSE_LH, N_HEAVY_INFANTRY_NORSE_LH],
        // [N_HEAVY_INFANTRY_NORSE_LH, N_CHAMPION_INFANTRY_NORSE_LH],
        // [LEVY_LONGHOUSE_SOLDIERS, CONSCRIPT_LONGHOUSE_SOLDIERS],
        // [THROWING_AXEMAN, HUNTRESS_AXE],

        // [GREAT_HALL, HERSIR_HERO],
        // [GREAT_HALL, RAIDING_CAVALRY],
        // [GREAT_HALL, SESSRUMNIR],
        // [GREAT_HALL, THUNDERING_HOOVES],
        // [GREAT_HALL, MEDIUM_CAVALRY_NORSE],
        // [MEDIUM_CAVALRY_NORSE, HEAVY_CAVALRY_NORSE],
        // [HEAVY_CAVALRY_NORSE, CHAMPION_CAVALRY_NORSE],
        // [LEVY_GREAT_HALL_SOLDIERS, CONSCRIPT_GREAT_HALL_SOLDIERS],

        // [HILL_FORT, N_MEDIUM_INFANTRY_NORSE_HF],
        // [HILL_FORT, HUSKARL],
        // [HILL_FORT, PORTABLE_RAM],
        // [HILL_FORT, DRAFT_HORSES_NORSE],
        // [HILL_FORT, LEVY_HILL_FORT_SOLDIERS],
        // [LEVY_HILL_FORT_SOLDIERS, CONSCRIPT_HILL_FORT_SOLDIERS],
        // [N_MEDIUM_INFANTRY_NORSE_HF, N_HEAVY_INFANTRY_NORSE_HF],
        // [N_HEAVY_INFANTRY_NORSE_HF, N_CHAMPION_INFANTRY_NORSE_HF],

    ];

    let connections = [];

    for (let i = 0; i < connectionsToAdd.length; i++) {
        addConnection(connectionsToAdd[i][0], connectionsToAdd[i][1], connections);
        // console.log('connectionsToAdd[i][0]: ', connectionsToAdd[i][0], 'connectionsToAdd[i][0].type: ', connectionsToAdd[i][0].type);
        // console.log('connectionsToAdd[i][1]: ', connectionsToAdd[i][1], 'connectionsToAdd[i][1].type: ', connectionsToAdd[i][1].type);    
    }

    let connections_ids = [];
    for (let c of connections) {
        connections_ids.push([formatId(c[0]), formatId(c[1])]);
    }
    return connections_ids;
}


// remove 
function testCrossFileSharing(){
    console.log('cross file sharing successful');
}

function getConnectionPoints(tree) {
    let points = new Map();
    for (let lane of tree.lanes) {
        for (let r of Object.keys(lane.rows)) {
            for (let caret of lane.rows[r]) {
                // console.log('caret: ', caret);
                points.set(caret.id, {
                    x: caret.x + (caret.width / 2),
                    y: caret.y + (caret.height / 2)
                });
            }
        }
    }
    return points;
}

console.log('RAMMING_WASEN: ', RAMMING_WASEN);