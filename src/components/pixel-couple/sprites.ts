/**
 * Pixel-art sprites for the Kandyan wedding couple.
 *
 * Both characters share a 48x64 grid. In the hold pose the bride's right
 * hand (cols 32-36) and the groom's left hand (cols 2-6) occupy rows 36-37,
 * so with `HOLD_OVERLAP` columns of overlap the two hands land on the same
 * pixels. Keep those anchors in sync when editing either sprite.
 */

export const SPRITE_WIDTH = 48;
export const SPRITE_HEIGHT = 64;
export const HOLD_OVERLAP = 18;
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
  "........................gyyg....................",
  "........................oggo....................",
  ".......................oggggo...................",
  "...................orrrrrrrrrrrro...............",
  "................orrryrrrrrrrrrryrrro............",
  "..............orryrrryrrryyrrryrrryrro..........",
  "............orrrrryrrryrrrrrryrrryrrrrro........",
  "..........oyrrRrrrrrrrrrrrrrrrrrrrrrrRrryo......",
  ".........oRRRrrrrrrrrrrrrrrrrrrrrrrrrrrRRRo.....",
  ".........oRRRRrrrrrrrrrrrrrrrrrrrrrrrrRRRRo.....",
  "..........oggyggyggyggyggyyggyggyggyggyggo......",
  "...........oGGGGGGGGGGGGGGGGGGGGGGGGGGGGo.......",
  "...............ohhhhhhhhhhhhhhhhhhhho...........",
  "...............ohhsssssssssssssssshho...........",
  "...............ohssssssssssssssssssho...........",
  "...............ohsssshhhsssshhhssssho...........",
  ".............oSsssssskksssssskkssssssSo.........",
  ".............oSbbssssfksssssskfssssbbSo.........",
  "..............oSbbssskksssssskksssbbSo..........",
  "...............osssssssssSSssssssssso...........",
  "...............osssssshhhsshhhsssssso...........",
  "...............osssssssmmmmmmssssssso...........",
  "................osssssssssssssssssso............",
  ".................osssssssssssssssso.............",
  "...................osssssSSssssso...............",
  "....................oSssssssssSo................",
  "...................ogyssssssssygo...............",
  "..................owggyssssssyggwo..............",
  ".............owwwwwwwwwwgGGgwwwwwwwwwwo.........",
  "............owwWwwwwwwwwgyygwwwwwwwwWwwo........",
  "............owWWwwwgwwwwgGGgwwwwgwwwWWwo........",
  "............owWWwwgwwwwwgyygwwwwwgwwWWwo........",
  "............owWWwgwwwwwwgGGgwwwwwwgwWWwo........",
  "............owWWwywwwwwwgyygwwwwwwywWWwo........",
  "............oWWWwwwwwwwwgGGgwwwwwwwwWWWo........",
  "..............oWwoWwwwwwgyygwwwwwWowWo..........",
  "..............oWwoWwwwwwgGGgwwwwwWowWo..........",
  "..............oWwoWwwwwwgyygwwwwwWowWo..........",
  "..............oWwoWwwwwwgGGgwwwwwWowWo..........",
  "..............ogyoWwwwwwgyygwwwwwWoygo..........",
  "..............ossoWwwwwwgGGgwwwwwWosso..........",
  "..............oSsoWwwwwwgyygwwwwwWosSo..........",
  "..............oooGgGgGgGgGGgGgGgGgGooo..........",
  "................oGggggggggggggggggGo............",
  "................orrrrrrgyyyygrrrrrro............",
  "................oRRrrrrgGGGGgrrrrRRo............",
  "................oggggggggggggggggggo............",
  "................owwwwwwgrrrrgwwwwwwo............",
  "...............owwWwwwwgrrrrgwwwwWwwo...........",
  "..............owwWwwwwwgRrrRgwwwwwWwwo..........",
  "..............owwWwwwwwgRrrRgwwwwwWwwo..........",
  ".............owwwWwwwwwwgrrgwwwwwwWwwwo.........",
  "............owwwwWwwwwwwgyygwwwwwwWwwwwo........",
  "............owwwwWwwwwwwyGGywwwwwwWwwwwo........",
  "...........owwwwwWwwwwwwgyygwwwwwwWwwwwwo.......",
  "..........owwwwwwWwwwwwwyGGywwwwwwWwwwwwwo......",
  "..........owwwwwwWwwwwwwgyygwwwwwwWwwwwwwo......",
  ".........owwwwwwwWwwwwwwyGGywwwwwwWwwwwwwwo.....",
  ".........owwwwwwwWwwwwwwgyygwwwwwwWwwwwwwwo.....",
  ".........oggyggyggyggyggyggyggyggyggyggyggo.....",
  ".........oGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGo.....",
  "...............owwwwwo........owwwwwo...........",
  "...............oWwwwWo........oWwwwWo...........",
  "...............ooooooo........ooooooo...........",
]);

const GROOM_WALK_B = grid(
  withRows(GROOM_WALK_A, {
    61: "...................owwwwwoowwwwwo...............",
    62: "...................oWwwwWooWwwwWo...............",
    63: "...................oooooooooooooo...............",
  }),
);

const GROOM_HOLD = grid(
  withRows(GROOM_WALK_B, {
    21: "...............ossssssmmmmmmmmsssssso...........",
    32: "..........ooooWWwgwwwwwwgGGgwwwwwwgwWWwo........",
    33: "........owwoowWWwywwwwwwgyygwwwwwwywWWwo........",
    34: "......owwo..oWWWwwwwwwwwgGGgwwwwwwwwWWWo........",
    35: "....ogygo.........owwwwwgyygwwwwwWowWo..........",
    36: "..ossso...........owwwwwgGGgwwwwwWowWo..........",
    37: "...ooo............owwwwwgyygwwwwwWowWo..........",
    38: "..................owwwwwgGGgwwwwwWowWo..........",
    39: "..................owwwwwgyygwwwwwWoygo..........",
    40: "..................owwwwwgGGgwwwwwWosso..........",
    41: "..................owwwwwgyygwwwwwWosSo..........",
    42: ".................ogGgGgGgGGgGgGgGgGooo..........",
  }),
);

const BRIDE_WALK_A = grid([
  "................................................",
  "................................................",
  "................................................",
  "................................................",
  "................................................",
  "................................................",
  "...............p.f.p..p.f.p.....................",
  ".............opfhhhhHHhhhhfpo...................",
  "...........ofphhhhhhHHhhhhhhpfo.................",
  ".......ohhhpfhhhhhhhHHhhhhhhhfpo................",
  "......ohhhhhhhhhhhhhHHhhhhhhhhhfo...............",
  ".....ofhhhhhhhhhhhhhgghhhhhhhhhho...............",
  ".....opHhhhhhsssssssggssssssshhho...............",
  "......ofhhhhhsssssssyyssssssshho................",
  ".......ohhohhsssshhhsshhhsssshho................",
  "..........ohhsssskksssskksssshho................",
  ".........ogbbssssfksssskfssssbbgo...............",
  ".........ogbbsssskksssskkssssbbgo...............",
  ".........oysssssssssSSsssssssssyo...............",
  "..........osssssssssssssssssssso................",
  "..........ossssssssmmmmsssssssso................",
  "...........osssssssssssssssssso.................",
  "............osssssssssssssssso..................",
  "..............osssssssssssso....................",
  "................oSssssssSo......................",
  "................oSssssssSo......................",
  "................ogygyygygo......................",
  "...............ogGgGggGgGgo.....................",
  ".........owwwwwsgygyggygygswwwwwo...............",
  ".....owwwWggwwwssssgyygsssswwwwwWwwwo...........",
  "....oWwwwWwggwwwwssgyygsswwwwwwwWwwwWo..........",
  "....oWwwwWwwggwwwwwyGGywwwwwwwwwWwwwWo..........",
  "....oWwwwWwwwwggwwwwwwwwwwwwwwwwWwwwWo..........",
  "....oWwwwWwwwwwggpwfwwpwfwwwwwwwWwwwWo..........",
  "....ogygyWwwwwwwpfppfpfppfwwwwwwWygygo..........",
  ".....osssowwwwwfppfpfpfppfpwwwwwossso...........",
  "......osssowwwwlpfppfppfpflwwwwossso............",
  ".......ogggowwwLlpfpfpfpfllwwwogggo.............",
  "........osssowwwLlpffpffLLwwwossso..............",
  "...........ossssslllLLlllssssso.................",
  "............oWwwwwwwLLwggwwwWo..................",
  "............oWwwwwwwwwwwggwwWo..................",
  "............oWwwwwwwwwwwwwggWo..................",
  "...........ogyggygggyygggyggygo.................",
  "...........oGGGGGGGGGGGGGGGGGGo.................",
  "...........owwwWwwwwwwwwwwgWwgo.................",
  "..........owwwwWwwwwwwwwwwgWwgwo................",
  "..........owwwwWwwwwwwwwwwgWwgwo................",
  ".........owwwwwWwwwwwwwwwwgWwgwwo...............",
  ".........owwwwwWwwwwwwwwwwgWwgwwo...............",
  "........owwwwwwWwwwwwwwwwwgWwgwwwo..............",
  ".......owwwwwwwWwwwwwwwwwwgWwgwwwwo.............",
  ".......owwwwwwwWwwwwwwwwwwgWwgwwwwo.............",
  "......owwwwwwwwWwwwwwwwwwwgWwgwwwwwo............",
  "......owwwwwwwwWwwwwwwwwwwgWwgwwwwwo............",
  ".....owwwwwwwwwWwwwwwwwwwwgWwgwwwwwwo...........",
  ".....owwwwwwwwwWwwwwwwwwwwgWwgwwwwwwo...........",
  "....owwwwwwwwwwWwwwwwwwwwwgWwgwwwwwwwo..........",
  "....owwwwwwwwwwWwwwwwwwwwwgWwgwwwwwwwo..........",
  "....oggygggyggygggyggggygggyggygggyggo..........",
  "....oGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGo..........",
  "...........ssss............ssss.................",
  "..........ogggggo........ogggggo................",
  "..........ooooooo........ooooooo................",
]);

const BRIDE_WALK_B = grid(
  withRows(BRIDE_WALK_A, {
    61: "................ssss..ssss......................",
    62: "..............ogggggoogggggo....................",
    63: "..............oooooooooooooo....................",
  }),
);

const BRIDE_HOLD = grid(
  withRows(BRIDE_WALK_B, {
    20: "..........osssssssmmmmmmssssssso................",
    32: "....oWwwwWwwwwggwwwwwwwwoooowwwwWwwwWo..........",
    33: "....oWwwwWwwwwwggpwfwwpwfwowwowwWwwwWo..........",
    34: "....ogygyWwwwwwwpfppfpfppfwwowwo.....o..........",
    35: ".....osssowwwwwfppfpfpfppfpwwogygo..............",
    36: "......osssowwwwlpfppfppfpflwwwwoossso...........",
    37: ".......ogggowwwLlpfpfpfpfllwwwoo.ooo............",
    38: "........osssowwwLlpffpffLLwwwoso................",
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
