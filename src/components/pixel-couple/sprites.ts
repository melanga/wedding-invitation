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
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................oggo............................",
  "...........................oyggyo...........................",
  "............................oGGo............................",
  "........................orRRRRRRRRro........................",
  "......................orRRRRRRRRRRRRro......................",
  "....................orRRRfRRRRRRRRfRRRro....................",
  "...................orRRRRRRRRRRRRRRRRRRro...................",
  "..................orRRRRRRRfRRRRfRRRRRRRro..................",
  ".................orRRfRRRRRRRRRRRRRRRRfRRro.................",
  ".................orRRRRRRRRRRRRRRRRRRRRRRro.................",
  "................oggggggggggggyyggggggggggggo................",
  "..............orRfRRRfRRRfRRRRRRRRfRRRfRRRfRro..............",
  "..............orRWRRRWRRRWRRRRRRRRWRRRWRRRWRro..............",
  "..............ogygygygygygygyGGygygygygygygygo..............",
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
  "................orRRRRyggyggyggyggyggyRRRRro................",
  "..............orRRRryggyggyggyyggyggyggyrRRRro..............",
  ".............orRRRrRGGGGGGGGGGGGGGGGGGGGRrRRRro.............",
  "............orRRRrRRRRRRygRRGyyGRRgyRRRRRRrRRRro............",
  "............orWRRrRWRRRRWRygGyyGgyRWRRRRWRrRRWro............",
  "............oWfWRrWfWRRWfWRRyggyRRWfWRRWfWrRWfWo............",
  "............orWRRrRWRRRRWRGggggggGRWRRRRWRrRRWro............",
  "............orRRRrRRRRRRRRgggyygggRRRRRRRRrRRRro............",
  "............ggggggRRRWRRRRgggyygggRRRRWRRRgggggg............",
  "............yyyyyyRRWfWRRWGggggggGWRRWfWRRyyyyyy............",
  "............GGGGGGrRRWRRRRWRGyyGRWRRRRWRRrGGGGGG............",
  ".............orRRRrRRRRRRRRRGffGRRRRRRRRRrRRRro.............",
  "..............WrRRRWRRRRWRRRGyyGRRRWRRRRWRRRrW..............",
  ".............WfWRRWfWRRWfWRRGyyGRRWfWRRWfWRRWfW.............",
  "..............WgggggrRRRWRRRGyyGRRRWRRRrgggggW..............",
  "...............GGGGGrRRRRRRRGffGRRRRRRRrGGGGG...............",
  "..............osssssrRRRRRRRGyyGRRRRRRRrssssso..............",
  "..............osssssggggggggyGGyggggggggssssso..............",
  "..............oSSSSSGGGGGGGGGGGGGGGGGGGGSSSSSo..............",
  "...............oggggggggggggggggggggggggggggo...............",
  "...............oyGyyGyyGyyGyyGGyyGyyGyyGyyGyo...............",
  "...............oGGGGGGGGGGooooooooGGGGGGGGGGo...............",
  "...............oWwwwwwdwwooggggggoowwdwwwwwWo...............",
  "...............oWwywwwdywoggGyyGggowydwwwywWo...............",
  "...............oWwwwwwdwwogggyygggowwdwwwwwWo...............",
  "..............oWwwwwwdwwwoggGggGggowwwdwwwwwWo..............",
  "..............oWwywwwdywwooggGGggoowwydwwwywWo..............",
  "..............oWwwwwwdwwwwooggggoowwwwdwwwwwWo..............",
  ".............oWwwwwwwdwwwwwoooooowwwwwdwwwwwwWo.............",
  ".............oWwywwwwywwwwywwddwwywwwwywwwwywWo.............",
  ".............ogygygygygygygygyygygygygygygygygo.............",
  "............oGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGo............",
  "............oWwywwwwywwwwywwwddwwwywwwwywwwwywWo............",
  "............oWwwwwwwdwwwwwwwwddwwwwwwwwdwwwwwwWo............",
  "...........oWwwwwwwwdwwwwwwwwddwwwwwwwwdwwwwwwwWo...........",
  "...........oWwywwwwydwwwywwwwddwwwwywwwdywwwwywWo...........",
  "...........ogygygygygygygygygyygygygygygygygygygo...........",
  "...........oGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGo...........",
  ".....................osssso......osssso.....................",
  ".....................oRyRRo......oRyRRo.....................",
  ".....................oRRRRo......oRRRRo.....................",
  ".....................oooooo......oooooo.....................",
]);

const GROOM_FEET_TOGETHER = [
  ".........................osssoossso.........................",
  ".........................oRyRooRyRo.........................",
  ".........................oRRRooRRRo.........................",
  ".........................oooooooooo.........................",
];

const GROOM_WALK_B = grid(withRows(GROOM_WALK_A, FEET_ROW, GROOM_FEET_TOGETHER));

const GROOM_SMILE = [
  "..................obbbsssssmssssmsssssbbbo..................",
  "..................osssssssssmmmmssssssssso..................",
];

const GROOM_HOLD_ARM = [
  "........oooo..WggRRRrRRRWRRRGyyGRRRWRRRrgggggW..............",
  ".......ossssooogGRRRrRRRRRRRGffGRRRRRRRrGGGGG...............",
  "......ossssssssgGRRRrRRRRRRRGyyGRRRRRRRrssssso..............",
  "......osSSsssssgGRRRggggggggyGGyggggggggssssso..............",
  "......osssSSsssSoRRRGGGGGGGGGGGGGGGGGGGGSSSSSo..............",
  ".......ossssooooggggggggggggggggggggggggggggo...............",
  "........oooo...oyGyyGyyGyyGyyGGyyGyyGyyGyyGyo...............",
];

const GROOM_HOLD = holdPose(GROOM_WALK_B, GROOM_SMILE, GROOM_HOLD_ARM);

const BRIDE_WALK_A = grid([
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "..........................ohhhhhho..........................",
  "........................ohHhhhhhhHho........................",
  ".......................ohhHhhhhhhHhho.......................",
  ".......................ohhhhhhhhhhhho.......................",
  ".....................ohhhhyfhhhhfyhhhho.....................",
  "...................ohhhhhhhhhhhhhhhhhhhho...................",
  "..................ohhHyfhhhhhhhhhhhhfyHhho..................",
  "..................ohhHhhhhhhhhhhhhhhhhHhho..................",
  "..................ohhHhhhhhhhhhhhhhhhhHhho..................",
  "..................ohyfhhhhhhhhhhhhhhhhfyho..................",
  "..................ohhHhhhhhhhhhhhhhhhhHhho..................",
  "..................ohhHhhhhhhhhhhhhhhhhHhho..................",
  "..................ohyfhhhhhhhhhhhhhhhhfyho..................",
  "..................oygygygygygyygygygygygyo..................",
  ".................ohhgssssssssggssssssssghho.................",
  ".................ohhyssssssssyyssssssssyhho.................",
  ".................ohhssssssssgyygsssssssshho.................",
  "..................ohsssssssssggsssssssssho..................",
  "..................osssssssssssssssssssssso..................",
  "..................osssssssssssssssssssssso..................",
  "..................ossskkksssssssssskkkssso..................",
  "..................osskffkksssssssskkffksso..................",
  "................y.osskkkkksssssssskkkkksso.y................",
  "................g.osskkkkksssssssskkkkksso.g................",
  "...............oyoossskkksssssssssskkksssooyo...............",
  "...............ogoobbbssssssssssssssssbbboogo...............",
  "................o.obbbssssssssssssssssbbbo.o................",
  "..................ossssssssssmmsssssssssso..................",
  "...................oSssssssssssssssssssSo...................",
  "....................oSssssssssssssssssSo....................",
  "......................oSssssssssssssSo......................",
  ".........................osssssssso.........................",
  ".........................oSSSSSSSSo.........................",
  ".........ooooooooo....ossygygyygygysso....ooooooooo.........",
  ".......ooowwwwwwwooossssssssssssssssssssooowwwwwwwooo.......",
  ".....ooowwwwwwwwwwwoosssygssssssssgysssoowwwwwwwwwwwoo......",
  ".....oowwwdwwdwwdwwwowssssygssssgysssswowwwdwwdwwdwwwo......",
  ".....oowwwdwwdwwdwwwowwwssssyggysssswwwowwwdwwdwwdwwwo......",
  ".....oowwwdwwdwwdwwwowwwwwsssggssswwwwwowwwdwwdwwdwwwo......",
  ".....ooowwdwwdwwdwwoowwwwwwwwggwwwwwwwwoowwdwwdwwdwwoo......",
  ".....owowwWWWWWWWwwowdwwdwwdwggwdwwdwwdwowwWWWWWWWwwo.......",
  ".....owooooooooooooowwwwwwwwGyyGwwwwwwwwooooooooooooo.......",
  ".....owdoowwwwwwwooooooLooooLoowdwwdwwdwdoowwwwwwwoo........",
  ".....owdwowdwwwwwoofWWlfWWWlWWooowwwwwwdWoowdwwwwwo.........",
  ".....owdwowwwwwwoofdfWfyfWfdfWWWoowdwwddWoowwwwwwwo.........",
  ".....owdwowwwwwdoWWfWWWfWWWfWWWWWowwwwwdWoowwwwwdwo.........",
  ".....owdwowdwwwooWWfWWWfWWWfWWWfoowdwwddWoowdwwwwwo.........",
  ".....owdwoggygggWWfdfWfyfWfdfWfdfowwwwwdWooWWWWWWWo.........",
  ".....owdwossssssoWWfWWWfWWWfWWWfooWWWWWWWWooggyggoo.........",
  ".....owdwdssssssoWWfWWWfWWWfWWWooddddddddd.ossssso..........",
  ".....owdwdsSSsssoofdfWfyfWfdfWWWoWWWWWWWWW.ossSSso..........",
  ".....owdwdsssSssooWfWWWfWWWfWWooodwwwwdwWoWossssso..........",
  ".....owdwdssssssoooWWWfWWWfWWWWowwwdwwwwdwWossssso..........",
  ".....owdwdwwwWooWwoWWfdfWfyfWooowwwwdwwwwdwWooooo...........",
  ".....owdwdwwwWoWwdooWWfWWWfWWWowdwwwwdwwwwdwWo..............",
  ".....owdwdwwwWowdwwooWWfWWWfooowwdwwwwdwwwwdwWo.............",
  ".....owdwdwwwWodwwwwoofyfWfdfowwwwdwwwwdwwwwdwWo............",
  ".....owdwdwwwWodWWdWWoofWWWfooWWdWWdWWdWWdWWdWWd............",
  ".....owdwdwwwWooddoddoooWWooddddoddoddoddoddoddo............",
  ".....owdwdwdwwWooodoowoooooWooooWoowoowoodoo.oo.............",
  ".....owdwdwdwwWoWWWWWWWWWWWWWWWWWWWWWWWWWWWW................",
  ".....owdwdwdwwWooWdwdwWddwwwdwwdwwwddWwdwdWo................",
  ".....owdwdwdwwWooWdwwwwdwwwwwwwwwwwwdwwwwdWo................",
  ".....owdwdwdwwWooWdwwwWdwwwWwwwwWwwwdWwwwdWo................",
  ".....owdwdwdwwWooWdwdwwddwwwdwwdwwwddwwdwdWo................",
  ".....owdwdwdwwWooWdwwwwdwwwwwwwwwwwwdwwwwdWo................",
  ".....owdwdwdwwWooWdwwwwdwwwwwwwwwwwwdwwwwdWo................",
  ".....owdwdwwdwwWoWwdwWWdwwwWwwwwWwwwdWWwdwWWo...............",
  ".....owdwdwwdwwWoWWWWWWWWWWWWWWWWWWWWWWWWWWWo...............",
  ".....owdwdwwdwwWodddddddddddddddddddddddddddo...............",
  ".....owdwdwwdwwWoWWWWWWWWWWWWWWWWWWWWWWWWWWWo...............",
  ".....oooooooooooo....osssso......osssso.....................",
  ".....................osssso......osssso.....................",
  ".....................osssso......osssso.....................",
  ".....................oooooo......oooooo.....................",
]);

const BRIDE_FEET_TOGETHER = [
  ".....oooooooooooo........osssoossso.........................",
  ".........................osssoossso.........................",
  ".........................osssoossso.........................",
  ".........................oooooooooo.........................",
];

const BRIDE_WALK_B = grid(withRows(BRIDE_WALK_A, FEET_ROW, BRIDE_FEET_TOGETHER));

const BRIDE_SMILE = [
  "................o.obbbsssssmssssmsssssbbbo.o................",
  "..................osssssssssmmmmssssssssso..................",
];

const BRIDE_HOLD_ARM = [
  ".....owdwoggygggWWfdfWfyfWfdfWfdfowwwwwdWoogggggWWo.........",
  ".....owdwossssssoWWfWWWfWWWfWWWfooWWWWWWWWossssssso.........",
  ".....owdwdssssssoWWfWWWfWWWfWWWoodddddddddossssssso.........",
  ".....owdwdsSSsssoofdfWfyfWfdfWWWoWWWWWWWWWosssSSsso.........",
  ".....owdwdsssSssooWfWWWfWWWfWWooodwwwwdwWoWoosssSSo.........",
  ".....owdwdssssssoooWWWfWWWfWWWWowwwdwwwwdwWooosssso.........",
  ".....owdwdwwwWooWwoWWfdfWfyfWooowwwwdwwwwdwWoooooo..........",
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
