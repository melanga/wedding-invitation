/**
 * Pixel-art sprites for the Kandyan wedding couple.
 *
 * Each row is one pixel line and every character is a key into SPRITE_PALETTE
 * (`.` is transparent). The walk-B and hold poses reuse the walk-A grid with a
 * few bands of rows swapped out: feet together for the second walk frame, and
 * a smile plus a reaching arm once the couple meets.
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

const FEET_ROW = 76;
const SMILE_ROW = 31;
const ARM_ROW = 52;

// walkA/walkB keep a calm closed mouth; the smile is part of the hold pose.
function holdPose(walkB: SpriteGrid, smile: string[], arm: string[]): SpriteGrid {
  return grid(withRows(withRows(walkB, SMILE_ROW, smile), ARM_ROW, arm));
}

const GROOM_WALK_A = grid([
  "............................oggo............................",
  "...........................oyggyo...........................",
  "...........................oyggyo...........................",
  "............................oGGo............................",
  "........................oRgrryyrrgRo........................",
  "......................oRrgrrryyrrrgrRo......................",
  "....................oRrrgrrrryyrrrrgrrRo....................",
  "...................oRrrrgrrrryyrrrrgrrrRo...................",
  "..................oRrrrrgrrrryyrrrrgrrrrRo..................",
  ".................oRrrrrgrrrrryyrrrrrgrrrrRo.................",
  ".................oRrrrrgrrrrryyrrrrrgrrrrRo.................",
  "................oRgrrrrgrrrrryyrrrrrgrrrrgRo................",
  "................oRgrrrrgrrrrryyrrrrrgrrrrgRo................",
  "................oRgrrrrgrrrrryyrrrrrgrrrrgRo................",
  "................oRgrrrrgrrrrryyrrrrrgrrrrgRo................",
  "................oRgRRRRgRRRRRyyRRRRRgRRRRgRo................",
  "...............oygygygygygygyggygygygygygygyo...............",
  "...............ogrgggrgggrgggrrgggrgggrgggrgo...............",
  "................oGGGGGGGGGGGGGGGGGGGGGGGGGGo................",
  "..................ohhhhhhhhhhhhhhhhhhhhhho..................",
  "..................ohhhHssssssssssssssHhhho..................",
  "..................ohhsssssssssssssssssshho..................",
  "..................ohssssssssssssssssssssho..................",
  "..................ohssssssssssssssssssssho..................",
  "..................ohssssssssssssssssssssho..................",
  "..................ohsskkksssssssssskkkssho..................",
  "..................ohskffkksssssssskkffksho..................",
  "..................ohskkkkksssssssskkkkksho..................",
  "..................osskkkkksssssssskkkkksso..................",
  "..................ossskkksssssssssskkkssso..................",
  "..................obbbssssssssssssssssbbbo..................",
  "..................obbbssssssssssssssssbbbo..................",
  "..................ossssssssssmmsssssssssso..................",
  "...................oSssssssssssssssssssSo...................",
  "....................oSssssssssssssssssSo....................",
  "......................oSssssssssssssSo......................",
  ".........................osssssssso.........................",
  ".........................oSSSSSSSSo.........................",
  "................oWwwwwyggyggyggyggyggywwwwWo................",
  "..............oWwwwWyggyggyggyyggyggyggyWwwwWo..............",
  ".............oWwwwWwGGGGGGGGGGGGGGGGGGGGwWwwwWo.............",
  "............oWwwwWwwwwygwwwwGyyGwwwwgywwwwWwwwWo............",
  "............oWwwwWwwwwwwygygGyyGgygywwwwwwWwwwWo............",
  "............oWwwwWwwwwwwwywwyggywwywwwwwwwWwwwWo............",
  "............oWwwwWwwwwwwwwgyGyyGygwwwwwwwwWwwwWo............",
  "............oWwwwWwwwwwwwwwwgyygwwwwwwwwwwWwwwWo............",
  "............oggyggwwwwwwwwwwGyyGwwwwwwwwwwggyggo............",
  "............oGGGGGwwwwwwwwwwGffGwwwwwwwwwwGGGGGo............",
  ".............oWwwwWwwwwwwwwwGyyGwwwwwwwwwWwwwWo.............",
  ".............oWwwwWwwwwwwwwwGyyGwwwwwwwwwWwwwWo.............",
  "..............oWwwwWwwwwwwwwGyyGwwwwwwwwWwwwWo..............",
  "..............oWwwwWwwwwwwwwGffGwwwwwwwwWwwwWo..............",
  "...............oggggWwwwwwwwGyyGwwwwwwwWggggo...............",
  "...............oGGGGWwwwwwwwGyyGwwwwwwwWGGGGo...............",
  "...............oosssWwwwwwwwGyyGwwwwwwwWsssoo...............",
  "................ossswwwwwwwwGffGwwwwwwwwssso................",
  "................oSSSwwwwwwwwGyyGwwwwwwwwSSSo................",
  "................oggggggggggggggggggggggggggo................",
  "................orrrrrrrrrrGyrryGrrrrrrrrrro................",
  "................oRrrrrrrrrrGyrryGrrrrrrrrrRo................",
  "................oGGGGGGGGGGGGGGGGGGGGGGGGGGo................",
  "...............oWwwwwwWwwwwwGyyGwwwwwWwwwwwWo...............",
  "...............oWwwwwwWwwwywGyyGwywwwWwwwwwWo...............",
  "...............oWwwwwwWwwwwwGyyGwwwwwWwwwwwWo...............",
  "..............oWwwwwwWwwwwywGyyGwywwwwWwwwwwWo..............",
  "..............oWwwwwwWwwwwwwGyyGwwwwwwWwwwwwWo..............",
  "..............oWwwwwwWwwwwywGyyGwywwwwWwwwwwWo..............",
  ".............oWwwwwwwWwwwwwwGyyGwwwwwwWwwwwwwWo.............",
  ".............oWwwwwwwWwwwwywGyyGwywwwwWwwwwwwWo.............",
  ".............oWwwwwwwWwwwwwwGyyGwwwwwwWwwwwwwWo.............",
  "............oWwwwwwwWwwwwywwGyyGwwywwwwWwwwwwwWo............",
  "............oWwwwwwwWwwwwwwwGyyGwwwwwwwWwwwwwwWo............",
  "............oWwwwwwwWwwwwywwGyyGwwywwwwWwwwwwwWo............",
  "...........oWwwwwwwwWwwwwwwwGyyGwwwwwwwWwwwwwwwWo...........",
  "...........ogygygygygygygygygyygygygygygygygygygo...........",
  "...........oGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGo...........",
  ".....................osssso......osssso.....................",
  ".....................okkkko......okkkko.....................",
  ".....................okkkko......okkkko.....................",
  ".....................oooooo......oooooo.....................",
]);

const GROOM_FEET_TOGETHER = [
  ".........................osssoossso.........................",
  ".........................okkkookkko.........................",
  ".........................okkkookkko.........................",
  ".........................oooooooooo.........................",
];

const GROOM_WALK_B = grid(withRows(GROOM_WALK_A, FEET_ROW, GROOM_FEET_TOGETHER));

const GROOM_SMILE = [
  "..................obbbsssssmssssmsssssbbbo..................",
  "..................osssssssssmmmmssssssssso..................",
];

const GROOM_HOLD_ARM = [
  "........oooo...ogwwwWwwwwwwwGyyGwwwwwwwWggggo...............",
  ".......ossssooogGwwwWwwwwwwwGyyGwwwwwwwWGGGGo...............",
  "......ossssssssgGwwwWwwwwwwwGyyGwwwwwwwWsssoo...............",
  "......osSSsssssgGwwwwwwwwwwwGffGwwwwwwwwssso................",
  "......osssSSsssoowwwwwwwwwwwGyyGwwwwwwwwSSSo................",
  ".......ossssooo.oggggggggggggggggggggggggggo................",
  "........oooo....orrrrrrrrrrGyrryGrrrrrrrrrro................",
];

const GROOM_HOLD = holdPose(GROOM_WALK_B, GROOM_SMILE, GROOM_HOLD_ARM);

const BRIDE_WALK_A = grid([
  "............................................................",
  "............................f..f............................",
  "........................p..fyffyf..p........................",
  ".......................pyphhfhhfhhpyp.......................",
  ".....................flLphhhhhhhhhhpLlf.....................",
  "....................fyflhhhhhhhhhhhhlfyf....................",
  "...................LlfHhhhhhhhhhhhhhhHflL...................",
  "..................PlhHhhhhhhhhhhhhhhhhHhlP..................",
  ".................PyPHhhhhhhhhhhhhhhhhhhHPyP.................",
  ".................oPhHhhhhhhhhhhhhhhhhhhHhPo.................",
  "................LlhHhhhhhhhhhhhhhhhhhhhhHhlL................",
  "................lhhHhhhhhhhhhhhhhhhhhhhhHhhl................",
  "...............pyphhhhhhhhhhhhhhhhhhhhhhhhpyp...............",
  "................phhhhhhhhhhhhhhhhhhhhhhhhhhp................",
  "...............LlhhhhhhhhhhhhhhhhhhhhhhhhhhlL...............",
  "...............lfhhhhhhhhhhhhhhhhhhhhhhhhhhfl...............",
  "...............fyfhhhhhhhhhhhhhhhhhhhhhhhhfyf...............",
  "................fogggggggggygyygygggggggggof................",
  "..................oGGGGGGGGgyggygGGGGGGGGo..................",
  "................ohhhhssssssssggsssssssshhhho................",
  "...............ohhhhhsssssssgyygssssssshhhhho...............",
  "..............ohhhhhhssssssssyysssssssshhhhhho..............",
  "............ohhhhhhssssssssssyysssssssssshhhhhho............",
  "............oHHhhhhssssssssssggsssssssssshhhhHHo............",
  "............ohhhhhhsssssssssssssssssssssshhhhhho............",
  "............ohhhhhhssskkksssssssssskkkssshhhhhho............",
  "............ohhhhhhsskffkksssssssskkffksshhhhhho............",
  "............ohhhhhhsskkkkksssssssskkkkksshhhhhho............",
  "............ohhhhhhsskkkkksssssssskkkkksshhhhhho............",
  "............ohhhhyhssskkksssssssssskkkssshyhhhho............",
  "............oHHhhghbbbssssssssssssssssbbbhghhHHo............",
  ".............ohhoyobbbssssssssssssssssbbboyohho.............",
  ".............ohhhghssssssssssmmsssssssssshghhho.............",
  ".............ohhhhhoSssssssssssssssssssSohhhhho.............",
  "..............ohhhhhoSssssssssssssssssSohhhhho..............",
  "..............ohhhhhhhoSssssssssssssSohhhhhhho..............",
  ".............ohhhhhhhhhhhossssssssohhhhhhhhhhho.............",
  ".............oHHhhhhhhhhhoSSSSSSSSohhhhhhhhhHHo.............",
  ".............ohhhhhhhwwwwygygyygygywwwwhhhhhhho.............",
  "......Ll..pllohhhhhhhwGyssssssssssssyGwhhhhhhho.............",
  "......lllpypllllhhhhhwwGyssssssssssyGwwhhhhhhho.............",
  "......lppppLLllllhhhhwwwGysssyysssyGwwwhhhhhhho.............",
  ".....lppyppLLffflLhhhwwwwGywwggwwyGwwwwhhhhhhho.............",
  ".....flpppLLffyfflhhhwwwwwGywwwwyGwwwwwhhhhhhho.............",
  "....fyfLLLfffffflllhhwwwwwwwwwwwwwwwwwwhhhhhhHHo............",
  "....lfLLLffyffLLPllShwwwwwwwwwwwwwwwwwwhSssohhho............",
  "....llPPPLfffLLPyPlSwwwwwwwwwwwwwwwwwwwwSssoo...............",
  ".....PPyPPLLpppLPlsSwwwwwwwwwwwwwwwwwwwwSssoo...............",
  "....LlPPPLLppyppllsSWwwwwwwwwwwwwwwwwwwWSsso................",
  "....l.llllLLpppllgggWwwwwwwwwwwwwwwwwwwWgggg................",
  ".......lllllllllggGGWwwwwwwwwwwwwwwwwwwWGGGG................",
  "..........lllggggGsSwwwwwwwwwwwwwwwwwwwwSsso................",
  ".............ossssoSgyggyggyggggyggyggyosssso...............",
  ".............ossssoGGGGGGGGGGGGGGGGGGGGosssso...............",
  ".............osSSsowwwwwwwwwwwwwwwwwwwwossSso...............",
  ".............oooooowwwwwwwwwwwwwwwwwwwwoooooo...............",
  ".................oWwwwwwwwwwwwwwwwwwwwwwwWo.................",
  ".................ogggggggggygyygygggggggggo.................",
  ".................oyyyyyyyyygPggPgyyyyyyyyyo.................",
  "................oGGGGGGGGGGygyygyGGGGGGGGGGo................",
  "...............oWwwwwwwWwwyGyggyGywwWwwwwwwWo...............",
  "..............oWwwwwwwWwwwwGyggyGwwwwWwwwwwwWo..............",
  "..............oWwwwwwwWwwwwGyggyGwwwwWwwwwwwWo..............",
  ".............oWwwwwwwwWwwwyGyggyGywwwWwwwwwwwWo.............",
  ".............oWwwwwwwwWwwwwGyggyGwwwwWwwwwwwwWo.............",
  "............oWwwwwwwwWwwwwwGyggyGwwwwwWwwwwwwwWo............",
  "............oWwwwwwwwWwwwwyGyggyGywwwwWwwwwwwwWo............",
  "...........oWwwwwwwwwWwwwwwGyggyGwwwwwWwwwwwwwwWo...........",
  "...........oWwwwwwwwwWwwwwwGyggyGwwwwwWwwwwwwwwWo...........",
  "..........oWwwwwwwwwWwwwwywGyggyGwywwwwWwwwwwwwwWo..........",
  "..........oWwwwwwwwwWwwwwwwGyggyGwwwwwwWwwwwwwwwWo..........",
  ".........oWwwwwwwwwwWwwwwwwGyggyGwwwwwwWwwwwwwwwwWo.........",
  ".........oWwwwwwwwwwWwwwwywGyggyGwywwwwWwwwwwwwwwWo.........",
  ".........oWwwwwwwwwwWwwwwwwGyggyGwwwwwwWwwwwwwwwwWo.........",
  ".........ogygygygygygygygygygyygygygygygygygygygygo.........",
  ".........oGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGo.........",
  ".....................osssso......osssso.....................",
  ".....................osssso......osssso.....................",
  ".....................osssso......osssso.....................",
  ".....................oooooo......oooooo.....................",
]);

const BRIDE_FEET_TOGETHER = [
  ".........................osssoossso.........................",
  ".........................osssoossso.........................",
  ".........................osssoossso.........................",
  ".........................oooooooooo.........................",
];

const BRIDE_WALK_B = grid(withRows(BRIDE_WALK_A, FEET_ROW, BRIDE_FEET_TOGETHER));

const BRIDE_SMILE = [
  ".............ohhoyobbbsssssmssssmsssssbbboyohho.............",
  ".............ohhhgosssssssssmmmmsssssssssoghhho.............",
];

const BRIDE_HOLD_ARM = [
  ".............ossssoSgyggyggyggggyggyggyossssoooooo..........",
  ".............ossssoGGGGGGGGGGGGGGGGGGGGosssssssssso.........",
  ".............osSSsowwwwwwwwwwwwwwwwwwwwossssSssssso.........",
  ".............oooooowwwwwwwwwwwwwwwwwwwwoosssssSSsso.........",
  ".................oWwwwwwwwwwwwwwwwwwwwwwwWooosssSSo.........",
  ".................ogggggggggygyygygggggggggo..osssso.........",
  ".................oyyyyyyyyygPggPgyyyyyyyyyo...oooo..........",
];

const BRIDE_HOLD = holdPose(BRIDE_WALK_B, BRIDE_SMILE, BRIDE_HOLD_ARM);

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
