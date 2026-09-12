/**
 * Pixel-art sprites for the Kandyan wedding couple.
 *
 * Both characters share a 48x64 grid. In the hold pose both sprites paint
 * the same V-clasp so with HOLD_OVERLAP columns of overlap the hands land
 * on the same pixels. Keep those clasp rows in sync.
 */

export const SPRITE_WIDTH = 48;
export const SPRITE_HEIGHT = 64;
export const HOLD_OVERLAP = 21;
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
  "...........................gyyg.................",
  "...........................oggo.................",
  "..........................oggggo................",
  "......................orrrrrrrrrrrro............",
  "...................orrryrrrrrrrrrryrrro.........",
  ".................orryrrryrrryyrrryrrryrro.......",
  "...............orrrrryrrryrrrrrryrrryrrrrro.....",
  ".............oyrrRrrrrrrrrrrrrrrrrrrrrrrRrryo...",
  "............oRRRrrrrrrrrrrrrrrrrrrrrrrrrrrRRRo..",
  "............oRRRRrrrrrrrrrrrrrrrrrrrrrrrrRRRRo..",
  ".............oggyggyggyggyggyyggyggyggyggyggo...",
  "..............oGGGGGGGGGGGGGGGGGGGGGGGGGGGGo....",
  "..................ohhhhhhhhhhhhhhhhhhhho........",
  "..................ohhsssssssssssssssshho........",
  "..................ohssssssssssssssssssho........",
  "..................ohsssshhhsssshhhssssho........",
  "................oSsssssskksssssskkssssssSo......",
  "................oSbbssssfksssssskfssssbbSo......",
  ".................oSbbssskksssssskksssbbSo.......",
  "..................osssssssssSSssssssssso........",
  "..................osssssshhhsshhhsssssso........",
  "..................osssssssmmmmmmssssssso........",
  "...................osssssssssssssssssso.........",
  "....................osssssssssssssssso..........",
  "......................osssssSSssssso............",
  ".......................oSssssssssSo.............",
  "......................ogyssssssssygo............",
  ".....................owggyssssssyggwo...........",
  "...............owwwwwwwwwwwgGGgwwwwwwwwwwwo.....",
  "..............owwWwwwwwwwwwgyygwwwwwwwwwWwwo....",
  ".............owwWWwwwwgwwwwgGGgwwwwgwwwwWWwwo...",
  ".............owwWWwwwgwwwwwgyygwwwwwgwwwWWwwo...",
  ".............owwWWwwgwwwwwwgGGgwwwwwwgwwWWwwo...",
  ".............owwWWwgwwwwwwwgyygwwwwwwwgwWWwwo...",
  ".............owwWWwygwwwwwwgGGgwwwwwwgywWWwwo...",
  "..............oWwwoWwwwwwwwgyygwwwwwwwWowwWo....",
  "..............oWwwoWwwwwwwwgGGgwwwwwwwWowwWo....",
  "..............oWwwoWwwwwwwwgyygwwwwwwwWowwWo....",
  "..............oWwwoWwwwwwwwgGGgwwwwwwwWowwWo....",
  "..............oggyoWwwwwwwwgyygwwwwwwwWoyggo....",
  "..............osssoWwwwwwwwgGGgwwwwwwwWossso....",
  "..............oSssoWwwwwwwwgyygwwwwwwwWossSo....",
  ".................oGgGgGgGgGgGGgGgGgGgGgGo.......",
  "...................oggggggggggggggggggo.........",
  "...................orrrrrrgyyyygrrrrrro.........",
  "...................orrrrrrgGGGGgrrrrrro.........",
  "...................oggggggggggggggggggo.........",
  "...................owwwwwwgrrrrgwwwwwwo.........",
  ".................owWwwwwwwgrrrrgwwwwwwWwo.......",
  ".................owWwwwwwwgRrrRgwwwwwwWwo.......",
  "................owwWwwwwwwgRrrRgwwwwwwWwwo......",
  "................owwWwwwwwwwgrrgwwwwwwwWwwo......",
  "...............owwwWwwwwwwwgyygwwwwwwwWwwwo.....",
  "...............owwwWwwwwwwwyGGywwwwwwwWwwwo.....",
  ".............owwwwwWwwwwwwwgyygwwwwwwwWwwwwwo...",
  ".............owwwwwWwwwwwwwyGGywwwwwwwWwwwwwo...",
  "............owwwwwwWwwwwwwwgyygwwwwwwwWwwwwwwo..",
  "............owwwwwwWwwwwwwwyGGywwwwwwwWwwwwwwo..",
  "............owwwwwwWwwwwwwwgyygwwwwwwwWwwwwwwo..",
  "............oggyggyggyggyggyggyggyggyggyggyggo..",
  "............oGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGo..",
  "..................owwwwwo........owwwwwo........",
  "..................oWwwwWo........oWwwwWo........",
  "..................ooooooo........ooooooo........",
]);

const GROOM_WALK_B = grid(
  withRows(GROOM_WALK_A, {
    61: "......................owwwwwoowwwwwo............",
    62: "......................oWwwwWooWwwwWo............",
    63: "......................oooooooooooooo............",
  }),
);

const GROOM_HOLD = grid(
  withRows(GROOM_WALK_B, {
    16: "................oSsssssskkssssskkkssssssSo......",
    17: "................oSbbssskssksssksssssssbbSo......",
    18: ".................oSbbssssssssssssssssbbSo.......",
    21: "..................ossssssmmmmmmmmsssssso........",
    31: "...oooo......ooooWwwwgwwwwwgyygwwwwwgwwwWWwwo...",
    32: "...owwo......owwoWwwgwwwwwwgGGgwwwwwwgwwWWwwo...",
    33: "....owwo....owwoWWwgwwwwwwwgyygwwwwwwwgwWWwwo...",
    34: ".....owwo..owwowWWwygwwwwwwgGGgwwwwwwgywWWwwo...",
    35: "......owwsswwo....oWwwwwwwwgyygwwwwwwwWowwWo....",
    36: ".......ossso......oWwwwwwwwgGGgwwwwwwwWowwWo....",
    37: "........ooo.......oWwwwwwwwgyygwwwwwwwWowwWo....",
    38: "..................oWwwwwwwwgGGgwwwwwwwWowwWo....",
    39: "..................oWwwwwwwwgyygwwwwwwwWoyggo....",
    40: "..................oWwwwwwwwgGGgwwwwwwwWossso....",
    41: "..................oWwwwwwwwgyygwwwwwwwWossSo....",
  }),
);

const BRIDE_WALK_A = grid([
  "................................................",
  "................................................",
  "................................................",
  "................................................",
  "................................................",
  "................................................",
  "...........p.f.p..p.f.p.........................",
  ".........opfhhhhHHhhhhfpo.......................",
  ".......ofphhhhhhHHhhhhhhpfo.....................",
  "...ohhhpfhhhhhhhHHhhhhhhhfpo....................",
  "..ohhhhhhhhhhhhhHHhhhhhhhhhfo...................",
  ".ofhhhhhhhhhhhhhgghhhhhhhhhho...................",
  ".opHhhhhhsssssssggssssssshhho...................",
  "..ofhhhhhsssssssyyssssssshho....................",
  "...ohhohhsssshhhsshhhsssshho....................",
  "......ohhsssskksssskksssshho....................",
  ".....ogbbssssfksssskfssssbbgo...................",
  ".....ogbbsssskksssskkssssbbgo...................",
  ".....oysssssssssSSsssssssssyo...................",
  "......osssssssssssssssssssso....................",
  "......ossssssssmmmmsssssssso....................",
  ".......osssssssssssssssssso.....................",
  "........osssssssssssssssso......................",
  "..........osssssssssssso........................",
  "............oSssssssSo..........................",
  "............oSssssssSo..........................",
  "............ogygyygygo..........................",
  "...........ogGgGggGgGgo.........................",
  ".....owwwwwsgygyggygygswwwwwo...................",
  ".owwwWggwwwssssgyygsssswwwwwWwwwo...............",
  "oWwwwWwggwwwwssgyygsswwwwwwwWwwwWo..............",
  "oWwwwWwwggwwwwwyGGywwwwwwwwwWwwwWo..............",
  "oWwwwWwwwwggwwwwwwwwwwwwwwwwWwwwWo..............",
  "oWwwwWwwwwwggpwfwwpwfwwwwwwwWwwwWo..............",
  "ogygyWwwwwwwpfppfpfppfwwwwwwWygygo..............",
  ".osssowwwwwfppfpfpfppfpwwwwwossso...............",
  "..osssowwwwlpfppfppfpflwwwwossso................",
  "...ogggowwwLlpfpfpfpfllwwwogggo.................",
  "....osssowwwLlpffpffLLwwwossso..................",
  ".....ossssssslllLLlllssssssso...................",
  ".......owwwwwwwwLLwwggwwwwo.....................",
  ".......owwwwwwwwwwwwwggwwwo.....................",
  ".......owwwwwwwwwwwwwwggwwo.....................",
  "......ogggygggyggggygggygggo....................",
  "......oGGGGGGGGGGGGGGGGGGGGGo...................",
  "......owwwWwwwwwwwwwwwgWwgwwo...................",
  ".....owwwwWwwwwwwwwwwwgWwgwwwo..................",
  ".....owwwwWwwwwwwwwwwwgWwgwwwo..................",
  "....owwwwwWwwwwwwwwwwwgWwgwwwwo.................",
  "....owwwwwWwwwwwwwwwwwgWwgwwwwo.................",
  "..owwwwwwwWwwwwwwwwwwwgWwgwwwwwo................",
  "..owwwwwwwWwwwwwwwwwwwgWwgwwwwwo................",
  "..owwwwwwwWwwwwwwwwwwwgWwgwwwwwo................",
  ".owwwwwwwwWwwwwwwwwwwwgWwgwwwwwwo...............",
  ".owwwwwwwwWwwwwwwwwwwwgWwgwwwwwwo...............",
  ".owwwwwwwwWwwwwwwwwwwwgWwgwwwwwwo...............",
  "owwwwwwwwwWwwwwwwwwwwwgWwgwwwwwwwo..............",
  "owwwwwwwwwWwwwwwwwwwwwgWwgwwwwwwwo..............",
  "owwwwwwwwwWwwwwwwwwwwwgWwgwwwwwwwo..............",
  "oggygggyggygggyggggygggyggygggyggo..............",
  "oGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGo..............",
  ".......ssss............ssss.....................",
  "......ogggggo........ogggggo....................",
  "......ooooooo........ooooooo....................",
]);

const BRIDE_WALK_B = grid(
  withRows(BRIDE_WALK_A, {
    61: "............ssss..ssss..........................",
    62: "..........ogggggoogggggo........................",
    63: "..........oooooooooooooo........................",
  }),
);

const BRIDE_HOLD = grid(
  withRows(BRIDE_WALK_B, {
    15: "......ohhsssskkssskkksssshho....................",
    16: ".....ogbbssskssksksskssssbbgo...................",
    17: ".....ogbbssssssssssssssssbbgo...................",
    19: "......osssssssmssssmssssssso....................",
    31: "oWwwwWwwggwwwwwyGGywwwwwwwwwWwoooo......oooo....",
    32: "oWwwwWwwwwggwwwwwwwwwwwwwwwwWwowwo......owwo....",
    33: "oWwwwWwwwwwggpwfwwpwfwwwwwwwWwwowwo....owwo.....",
    34: "ogygyWwwwwwwpfppfpfppfwwwwwwWygyowwo..owwo......",
    35: ".osssowwwwwfppfpfpfppfpwwwwo.....owwsswwo.......",
    36: "..osssowwwwlpfppfppfpflwwwwo......ossso.........",
    37: "...ogggowwwLlpfpfpfpfllwwwoo.......ooo..........",
    38: "....osssowwwLlpffpffLLwwwo......................",
    39: ".....ossssssslllLLlllsssssso....................",
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
