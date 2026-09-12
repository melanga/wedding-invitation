/**
 * Pixel-art sprites for the Kandyan wedding couple.
 *
 * Both characters share a 60x80 grid. In the hold pose the bride's right
 * hand and the groom's left hand occupy the shared clasp oval (rows 48-51),
 * so with `HOLD_OVERLAP` columns of overlap the two hands land on the same
 * pixels. Keep those anchors in sync when editing either sprite.
 */

export const SPRITE_WIDTH = 60;
export const SPRITE_HEIGHT = 80;
export const HOLD_OVERLAP = 22;
export const SPRITE_DISPLAY_WIDTH = "clamp(94px, 19vw, 156px)";

export type SpriteGrid = readonly string[];

export interface CharacterSprites {
  readonly walkA: SpriteGrid;
  readonly walkB: SpriteGrid;
  readonly hold: SpriteGrid;
}

function grid(
  rows: readonly string[],
  width = SPRITE_WIDTH,
  height = SPRITE_HEIGHT,
): SpriteGrid {
  if (rows.length !== height) {
    throw new Error(`Sprite must have ${height} rows, got ${rows.length}`);
  }
  const badRow = rows.findIndex((row) => row.length !== width);
  if (badRow !== -1) {
    throw new Error(
      `Sprite row ${badRow} must have ${width} columns, got ${rows[badRow].length}`,
    );
  }
  return rows;
}

function withRows(
  base: SpriteGrid,
  patches: Readonly<Record<number, string>>,
): string[] {
  return base.map((row, index) => patches[index] ?? row);
}

const GROOM_WALK_A = grid([
  "..................................yyyy......................",
  "..................................yyyy......................",
  "................................gggggggg....................",
  "................................gggggggg....................",
  "............................oorrrrrrrrrrrroo................",
  "............................oorrrrrrrrrrrroo................",
  "........................oorrrrrrrrrrrrrrrrrrrroo............",
  "........................oorrrrrrrrrrrrrrrrrrrroo............",
  "....................oorrrryyrrrrrryyyyrrrrrryyrrrroo........",
  "....................oorrrryyrrrrrryyyyrrrrrryyrrrroo........",
  "..................ooyyrrrrrrrrrrrrrrrrrrrrrrrrrrrryyoo......",
  "..................ooyyrrrrrrrrrrrrrrrrrrrrrrrrrrrryyoo......",
  "..................ooRRrrrrrrrrrrrrrrrrrrrrrrrrrrrrRRoo......",
  "..................ooRRrrrrrrrrrrrrrrrrrrrrrrrrrrrrRRoo......",
  "....................ooggggyyggggyyggggyyggggyyggggoo........",
  "....................ooggggyyggggyyggggyyggggyyggggoo........",
  "......................oohhhhHHhhhhhhhhhhhhhhhhhhoo..........",
  "......................oohhhhHHhhhhhhhhhhhhhhhhhhoo..........",
  "........................oossssssssssssssssssssssoo..........",
  "........................oossssssssssssssssssssssoo..........",
  "........................oohhhhhhhhhhsshhhhssssssoo..........",
  "........................oohhhhhhsshhsshhhhssssssoo..........",
  "........................oosskksssssssssskkssssssoo..........",
  "........................oosskfsssssssssskfssssssoo..........",
  "........................oobbbbssssssssssbbbbssssoo..........",
  "........................oobbbbssssssssssbbbbssssoo..........",
  "........................oosshhsshhssssssssssssssoo..........",
  "........................oosshsSSshssssssssssssssoo..........",
  "........................oosssmmmmmmmmsssssssssssoo..........",
  "........................oossssmmmmmmssssssssssssoo..........",
  "..........................oossssssssssssssssssoo............",
  "..........................oossssssssssssssssssoo............",
  "............................oossssssssssssssoo..............",
  "............................oossssssssssssssoo..............",
  "..............................oossssssssssoo................",
  "..............................oossssssssssoo................",
  "............................ooyGssssssssssggoo..............",
  "............................ooGyssssssssssggoo..............",
  "......................oowwwwwwwwwwggggggwwwwwwwwwwoo........",
  "......................oowwwwwwwwwwggggggwwwwwwwwwwoo........",
  "....................oowwwwygwwwwwwgggggggywwwwwwwwwwoo......",
  "....................oowwwwwygwwwwwggggggywwwwwwwwwwwoo......",
  "....................ooWWwwwwyywwwwyygggywwwwyywwwwWWoo......",
  "....................ooWWwwwwyGgwwwyyggyywwwwyywwwwWWoo......",
  "....................ooWWwwwwwwygwwyygyyywwyywwwwwwWWoo......",
  "....................ooWWwwwwwwyygwygygyywwyywwwwwwWWoo......",
  "......................oowwwwwywwyyggggggyywwwwwwwwoo........",
  "......................oowwwwwGwwyyggggggyywwwwwwwwoo........",
  "......................oowwwwwwwwwwggggggwwwwwwwwwwoo........",
  "......................oowwwwwwwwwwggggggwwwwwwwwwwoo........",
  "........................ooWWwywwwwggggggwwwwwwWWoo..........",
  "........................ooWWwGwwwwggggggwwwwwwWWoo..........",
  "........................oosssswwwwgyggggwwwwssssoo..........",
  "........................oosssswwwwggGgggwwwwssssoo..........",
  "..........................oowwwwwwggggggwwwwwwoo............",
  "..........................oowwwwwwggggggwwwwwwoo............",
  "........................oorrygyrrryyggyyrrrrrrrroo..........",
  "........................oorrgGgrrryyggyyrrrrrrrroo..........",
  "........................ooRRrrRrrrggggggrrrrrrRRoo..........",
  "........................ooRRrrRrrrggggggrrrrrrRRoo..........",
  "......................oowwwwWygwwwwwggwwwwwwWWwwwwoo........",
  "......................oowwwwWWwwwwwwggwwwwwwWWwwwwoo........",
  "....................oowwwwWWwywwwwwwggwwwwwwwwWWwwwwoo......",
  "....................oowwwwWWwwwwwwwwggwwwwwwwwWWwwwwoo......",
  "..................oowwwwwwWWwywwwwwwggwwwwwwwwWWwwwwwwoo....",
  "..................oowwwwwwWWwwwwwwwwggwwwwwwwwWWwwwwwwoo....",
  "..................oowwwwwwWWwywwwwwwggwwwwwwwwWWwwwwwwoo....",
  "..................oowwwwwwWWwwwwwwwwggwwwwwwwwWWwwwwwwoo....",
  "................oowwwwwwwwWWwywwwwwwggwwwwwwwwWWwwwwwwwwoo..",
  "................oowwwwwwwwWWwwwwwwwwggwwwwwwwwWWwwwwwwwwoo..",
  "................ooygggyyygggggggyyygggyyygggggggyyggggggoo..",
  "................ooggggyyggggggggyyggggyyggggggggyyggggggoo..",
  "................ooGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGoo..",
  "................ooGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGoo..",
  "..........................oossoo..........oossoo............",
  "..........................oossoo..........oossoo............",
  "....................oowwwwwwwwoo........oowwwwwwwwoo........",
  "....................oowwwwwwwwoo........oowwwwwwwwoo........",
  "....................oooooooooooo........oooooooooooo........",
  "....................oooooooooooo........oooooooooooo........",
]);

const GROOM_WALK_B = grid(
  withRows(GROOM_WALK_A, {
    74: "............................ooss....ssoo....................",
    75: "............................ooss....ssoo....................",
    76: "..........................oowwwwoooowwwwoo..................",
    77: "..........................oowwwwoooowwwwoo..................",
    78: "..........................oooooooooooooooo..................",
    79: "..........................oooooooooooooooo..................",
  }),
);

const GROOM_HOLD = grid(
  withRows(GROOM_WALK_B, {
    20: "........................oohhhhkkhhhhsskkkkssssssoo..........",
    21: "........................oohhkkkksshhsskkkkssssssoo..........",
    28: "........................oossmmmmmmmmmsssssssssssoo..........",
    29: "........................oossmmmmmmmmssssssssssssoo..........",
    38: "..............oooooooooowwwwwwwwwwggggggwwwwwwwwwwoo........",
    39: "..............oooooooooowwwwwwwwwwggggggwwwwwwwwwwoo........",
    40: "..............oowwwwoowwwwygwwwwwwgggggggywwwwwwwwwwoo......",
    41: "..............oowwwwoowwwwwygwwwwwggggggywwwwwwwwwwwoo......",
    42: "............oowwwwooooWWwwwwyywwwwyygggywwwwyywwwwWWoo......",
    43: "............oowwwwooooWWwwwwyGgwwwyyggyywwwwyywwwwWWoo......",
    44: "..........oowwwwoo..ooWWwwwwwwygwwyygyyywwyywwwwwwWWoo......",
    45: "..........oowwwwoo..ooWWwwwwwwyygwygygyywwyywwwwwwWWoo......",
    46: "........oogwwwoo......oowwwwwywwyyggggggyywwwwwwwwoo........",
    47: "........oogwwwoo......oowwwwwGwwyyggggggyywwwwwwwwoo........",
    48: ".....ossso............oowwwwwwwwwwggggggwwwwwwwwwwoo........",
    49: "....ossssso...........oowwwwwwwwwwggggggwwwwwwwwwwoo........",
    50: "....osSsSso.............ooWWwywwwwggggggwwwwwwWWoo..........",
    51: ".....ooooo..............ooWWwGwwwwggggggwwwwwwWWoo..........",
    52: "........................oosssswwwwggggggwwwwssssoo..........",
    53: "........................oosssswwwwggggggwwwwssssoo..........",
  }),
);

const BRIDE_WALK_A = grid([
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............pppp..ffff..pppp................................",
  "............pppp..ffff..pppp................................",
  "..........oophfhphfhphfhhhhhhhhhhhoo........................",
  "..........oophhhphhhphhhhhhhhhhhhhoo........................",
  "......oohhhhhhhhHHhhhhhhhhhhhhhhhhhhoo......................",
  "......oohhhhhhhhHHhhhhhhhhhhhhhhhhhhoo......................",
  "....oopppfhhhhhhhhhhhhhhhhhhhhhhhhoo........................",
  "....ooppfphhhhhhhhhhhhhhhhhhhhhhhhoo........................",
  "....oohhhhggggggggggyggggggggggghhoo........................",
  "....oohhhhggggggggggGygggggggggghhoo........................",
  "....oohhhhssssssssssygssssssssssoo..........................",
  "....oohhhhssssssssssggssssssssssoo..........................",
  "....oohhhhsssssshhhhsssssshhhhssoo..........................",
  "....oohhhhsssssshhhhsssssshhhhssoo..........................",
  "....oohhhhsssssskksssssssssskkssoo..........................",
  "....oohhhhsssssskfsssssssssskfssoo..........................",
  "....oohhhhssbbbbssssssssssbbbbssoo..........................",
  "....oohhhhssbbbbssssssssssbbbbssoo..........................",
  "....oohhhhgsssssssssssssssSSsgssggoo........................",
  "....oohhhhysssssssssssssssSSsyssggoo........................",
  "......oossgsssssssssmmmmmmsssgoo............................",
  "......oossssssssssssmmmmmmssssoo............................",
  "........oossssssssssssssssssssoo............................",
  "........oossssssssssssssssssssoo............................",
  "..........oossssssssssssssssoo..............................",
  "..........oossssssssssssssssoo..............................",
  "..............oossssssssssoo................................",
  "..............oossssssssssoo................................",
  "............ooggygygygygggggoo..............................",
  "............oogggGgGgGgGggggoo..............................",
  "........oowwwwwwssfyfyfssswwwwwwoowwwwwwoo..................",
  "........oowwwwwwssssyGyssswwwwwwoowwwwwwoo..................",
  "......oowwygwwwwyysssyssyywwwwwwooWWWWWWoo..................",
  "......oowwwwwwwwyyssssssyywwwwwwooWWWWWWoo..................",
  "....ooWWwwwwygwwwwggggggwwwwwwwwooWWWWoo....................",
  "....ooWWwwwwwwwwwwggggggwwwwwwwwooWWWWoo....................",
  "....ooWWwwwwwwygwwyypgfypwwwppppffppoo......................",
  "....ooWWwwwwwwwwwwypfpfpfwwwppppffppoo......................",
  "....ooWWwwwwwwwwygwfppfpfpllgygpoo..........................",
  "....ooWWwwwwwwwwwwwwlpfplpllgGgpoo..........................",
  "....ooWWwwwwwwwwwwwwsLlLllppllppoo..........................",
  "....ooWWwwwwwwwwwwwwssLsllppllppoo..........................",
  "......oowwwwwwwwwwwwwwwwllLLlloo............................",
  "......oowwwwwwwwwwwwwwwwllLLlloo............................",
  "......oowwwwwwwwgygwwwwwwwwwoo..............................",
  "......oowwwwwwwwgGgwwwwwwwwwoo..............................",
  "........oowwwwwwwwygwwwwwwwwwwwwoo..........................",
  "........oowwwwwwwwwwwwwwwwwwwwwwoo..........................",
  "........ooggggyyggggygyyggggyyggoo..........................",
  "........ooggggyyggggggyyggggyyggoo..........................",
  "......oowwwwWWwwwwwwwwygwwgWwgwwwwoo........................",
  "......oowwwwWWwwwwwwwwwwwwgWwgwwwwoo........................",
  "....oowwwwwwWWwwwwwwwwwwyggWwgwwwwwwoo......................",
  "....oowwwwwwWWwwwwwwwwwwwwgWwgwwwwwwoo......................",
  "....oowwwwwwWWwwwwwwwwwwwwgWwgwwwwwwoo......................",
  "....oowwwwwwWWwwwwwwwwwwwwgWwgwwwwwwoo......................",
  "..oowwwwwwwwWWwwwwwwwwwwwwgWwgwwwwwwwwoo....................",
  "..oowwwwwwwwWWwwwwwwwwwwwwgWwgwwwwwwwwoo....................",
  "..oowwwwwwwwWWwwwwwwwwwwwwgWwgygwwwwwwoo....................",
  "..oowwwwwwwwWWwwwwwwwwwwwwgWwgwwwwwwwwoo....................",
  "oowwwwwwwwwwWWwwwwwwwwwwwwgWwgwwygwwwwwwoo..................",
  "oowwwwwwwwwwWWwwwwwwwwwwwwgWwgwwwwwwwwwwoo..................",
  "oowwwwwwwwwwWWwwwwwwwwwwwwgWwgwwwwwwwwwwoo..................",
  "oowwwwwwwwwwWWwwwwwwwwwwwwgWwgwwwwwwwwwwoo..................",
  "ooggggyyggggggggyyggggyygggWwgggyyggggggoo..................",
  "ooggggyyggggggggyyggggyygggWwgggyyggggggoo..................",
  "ooGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGoo..................",
  "ooGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGoo..................",
  "..........gsgs..........gsgs................................",
  "..........ysys..........ysys................................",
  "........oooooooo......oooooooo..............................",
  "........oooooooo......oooooooo..............................",
]);

const BRIDE_WALK_B = grid(
  withRows(BRIDE_WALK_A, {
    76: "..............ssss....ssgs..................................",
    77: "..............ssss....ssys..................................",
    78: "............oooooooooooooooo................................",
    79: "............oooooooooooooooo................................",
  }),
);

const BRIDE_HOLD = grid(
  withRows(BRIDE_WALK_B, {
    21: "....oohhhhsssssskkkksssssskkkkssoo..........................",
    28: "......oossgsssssssssmmmmmmmmsgoo............................",
    29: "......oossssssssssssmmmmmmmmssoo............................",
    38: "........oowwwwwwssfyfyfssswwwwwwoooooooo....................",
    39: "........oowwwwwwssssyGyssswwwwwwoooooooo....................",
    40: "......oowwygwwwwyysssyssyywwwwwwoowwwwoo....................",
    41: "......oowwwwwwwwyyssssssyywwwwwwoowwwwoo....................",
    42: "....ooWWwwwwygwwwwggggggwwwwwwwwoooowwwwoo..................",
    43: "....ooWWwwwwwwwwwwggggggwwwwwwwwoooowwwwoo..................",
    44: "....ooWWwwwwwwygwwyypgfypwwwwwwwoo..oowwwwoo................",
    45: "....ooWWwwwwwwwwwwypfpfpfwwwwwwwoo..oowwwwoo................",
    46: "....ooWWwwwwwwwwygwfppfpfwwwoo........oowwwwoo..............",
    47: "....ooWWwwwwwwwwwwwwlpfplwwwoo........oowwwwoo..............",
    48: "....ooWWwwwwwwwwwwwwwLlLwwwwoo.............ossso............",
    49: "....ooWWwwwwwwwwwwwwwwLwwwwwoo............ossssso...........",
    50: "......oowwwwwwwwwwwwwwwwwwwwoo............osSsSso...........",
    51: "......oowwwwwwwwwwwwwwwwwwwwoo.............ooooo............",
    52: "......oowwwwwwwwwwwwwwwwwwwwoo..............................",
    53: "......oowwwwwwwwwwwwwwwwwwwwoo..............................",
  }),
);

export const GROOM_SPRITES: CharacterSprites = {
  walkA: GROOM_WALK_A,
  walkB: GROOM_WALK_B,
  hold: GROOM_HOLD,
};

export const BRIDE_SPRITES: CharacterSprites = {
  walkA: BRIDE_WALK_A,
  walkB: BRIDE_WALK_B,
  hold: BRIDE_HOLD,
};

export const HEART_WIDTH = 9;
export const HEART_HEIGHT = 8;

export const HEART_SPRITE = grid(
  [
    "..oo.oo..",
    ".orrorro.",
    "orryrrrro",
    "orrrrrrro",
    ".orrrrro.",
    "..orrro..",
    "...oro...",
    "....o....",
  ],
  HEART_WIDTH,
  HEART_HEIGHT,
);
