/**
 * Pixel-art sprites for the Kandyan wedding couple.
 */

export const SPRITE_WIDTH = 30;
export const SPRITE_HEIGHT = 40;
export const HOLD_OVERLAP = 11;

export type SpriteGrid = readonly string[];

export interface CharacterSprites {
  readonly walkA: SpriteGrid;
  readonly walkB: SpriteGrid;
  readonly hold: SpriteGrid;
}

function grid(
  rows: readonly string[],
  width = SPRITE_WIDTH,
  height = SPRITE_HEIGHT
): SpriteGrid {
  if (rows.length !== height) {
    throw new Error(`Sprite must have ${height} rows, got ${rows.length}`);
  }
  const badRow = rows.findIndex((row) => row.length !== width);
  if (badRow !== -1) {
    throw new Error(
      `Sprite row ${badRow} must have ${width} columns, got ${rows[badRow].length}`
    );
  }
  return rows;
}

function withRows(
  base: SpriteGrid,
  startRow: number,
  patch: readonly string[]
): string[] {
  const next = [...base];
  patch.forEach((row, index) => {
    next[startRow + index] = row;
  });
  return next;
}

const GROOM_WALK_A = grid([
  ".................yy...........",
  "................gggg..........",
  "..............orrrrrro........",
  "............orrrrrrrrrro......",
  "..........orryrrryyrrryrro....",
  ".........oyrrrrrrrrrrrrrryo...",
  ".........oRrrrrrrrrrrrrrrRo...",
  "..........oggyggyggyggyggo....",
  "...........ohhhhhhhhhhhho.....",
  "............ossssssssssso.....",
  "............oshhssshhssso.....",
  "............oskkssskkssso.....",
  "............obbsssssbbsso.....",
  "............ossSsssssssso.....",
  "............ossmmmsssssso.....",
  ".............ossssssssso......",
  "..............ossssssso.......",
  "...............ossssso........",
  "..............ogsssssgo.......",
  "...........owwwwwgggwwwwwo....",
  "..........owwwwwwgggwwwwwwo...",
  "..........oWwwywwygywwywwWo...",
  "..........oWwwwywygywywwwWo...",
  "...........owwwwygggywwwwo....",
  "...........owwwwwgggwwwwwo....",
  "............oWwwwgggwwwWo.....",
  "............osswwgggwwsso.....",
  ".............owwwgggwwwo......",
  "............orrrrygyrrrro.....",
  "............oRrrrgggrrrRo.....",
  "...........owwWwwwgwwwWwwo....",
  "..........owwWwwwwgwwwwWwwo...",
  ".........owwwWwwwwgwwwwWwwwo..",
  ".........owwwWwwwwgwwwwWwwwo..",
  "........owwwwWwwwwgwwwwWwwwwo.",
  "........oggyggggyggyggggygggo.",
  "........oGGGGGGGGGGGGGGGGGGGo.",
  ".............oso.....oso......",
  "..........okkkko....okkkko....",
  "..........oooooo....oooooo....",
]);

const GROOM_FEET_TOGETHER = [
  "..............os..so..........",
  ".............okkookko.........",
  ".............oooooooo.........",
];

const GROOM_WALK_B = grid(withRows(GROOM_WALK_A, 37, GROOM_FEET_TOGETHER));

const GROOM_HOLD = grid(
  GROOM_WALK_B.map((row, index) => {
    switch (index) {
      case 10:
        return "............oskkssskkssso.....";
      case 11:
        return "............ossssssssssso.....";
      case 14:
        return "............osmmmmsssssso.....";
      case 19:
        return ".......ooooowwwwwgggwwwwwo....";
      case 20:
        return ".......owwowwwwwwgggwwwwwwo...";
      case 21:
        return "......owwooWwwywwygywwywwWo...";
      case 22:
        return ".....owwo.oWwwwywygywywwwWo...";
      case 23:
        return "....owwo...owwwwygggywwwwo....";
      case 24:
        return ".ossso.....owwwwwgggwwwwwo....";
      case 25:
        return "..ooo.......oWwwwgggwwwWo.....";
      default:
        return row;
    }
  })
);

const BRIDE_WALK_A = grid([
  "..............................",
  "..............................",
  "..............................",
  "..............................",
  "......pp.ff.pp................",
  ".....ohhhhhhhhhhho............",
  "...ohhhhhhhhhhhhhho...........",
  "..ophhhhhhhhhhhhho............",
  "..ohhgggggggggggho............",
  "..ohhsssssgssssso.............",
  "..ohhssshhssshhso.............",
  "..ohhssskkssskkso.............",
  "..ohhsbbsssssbbso.............",
  "..ohhssssssssSssgo............",
  "...ossssssmmmsso..............",
  "....osssssssssso..............",
  ".....osssssssso...............",
  ".......ossssso................",
  "......ogggggggo...............",
  "....owwwssssswwwowwwo.........",
  "...owwwwysssywwwoWWWo.........",
  "..oWwwwwwgggwwwwoWWo..........",
  "..oWwwwwwygywwppfpo...........",
  "..oWwwwwwwssplppo.............",
  "..oWwwwwwwsslplpo.............",
  "...owwwwwwwwlLlo..............",
  "...owwwwwwwwwwo...............",
  "....owwwwwwwwwwwo.............",
  "....oggygggyggygo.............",
  "...owwWwwwwwwWwwwo............",
  "..owwwWwwwwwwwWwwwo...........",
  "..owwwWwwwwwwwWwwwo...........",
  ".owwwwWwwwwwwwWwwwwo..........",
  ".owwwwWwwwwwwwWwwwwo..........",
  "owwwwwWwwwwwwwWwwwwwo.........",
  "owwwwwWwwwwwwwWwwwwwo.........",
  "oggyggggyggyggggygggo.........",
  "oGGGGGGGGGGGGGGGGGGGo.........",
  ".....ss.....ss................",
  "....oooo...oooo...............",
]);

const BRIDE_FEET_TOGETHER = [
  ".......ss..ss.................",
  "......oooooooo................",
];

const BRIDE_WALK_B = grid(withRows(BRIDE_WALK_A, 38, BRIDE_FEET_TOGETHER));

const BRIDE_HOLD = grid(
  BRIDE_WALK_B.map((row, index) => {
    switch (index) {
      case 10:
        return "..ohhssskkssskkso.............";
      case 11:
        return "..ohhssssssssssso.............";
      case 14:
        return "...ossssssmmmmso..............";
      case 19:
        return "....owwwssssswwwoooo..........";
      case 20:
        return "...owwwwysssywwwowwo..........";
      case 21:
        return "..oWwwwwwgggwwwwoowwo.........";
      case 22:
        return "..oWwwwwwygywwwwo.owwo........";
      case 23:
        return "..oWwwwwwwwwwwo....owwo.......";
      case 24:
        return "..oWwwwwwwwwwwo.....ossso.....";
      case 25:
        return "...owwwwwwwwwwo......ooo......";
      default:
        return row;
    }
  })
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
  HEART_HEIGHT
);
