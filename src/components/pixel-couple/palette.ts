/**
 * Shared palette for the pixel-art wedding couple.
 *
 * Each sprite grid encodes one pixel per character; the character is a
 * key into this palette. `.` marks a transparent pixel.
 */

export const SPRITE_PALETTE = {
  o: "#3a2a20", // outline
  k: "#241a12", // eyes / darkest accents
  s: "#f4c99c", // skin
  S: "#dda878", // skin shade
  h: "#332016", // hair
  w: "#fdf7e7", // ivory garment
  W: "#e7d3ae", // garment shade / folds
  g: "#d29c3f", // gold
  G: "#a3762a", // gold shade
  y: "#f2d27d", // gold highlight
  r: "#a92433", // kandyan red
  R: "#7c1522", // kandyan red shade
  p: "#ef93b4", // flower pink
  f: "#fff8ec", // flower white / pearl
  l: "#5d8a4a", // leaf green
  L: "#3f6234", // leaf shade
  b: "#f2a58d", // blush
  m: "#8a4030", // mouth
} as const;

export type PaletteKey = keyof typeof SPRITE_PALETTE;

export const TRANSPARENT = ".";
