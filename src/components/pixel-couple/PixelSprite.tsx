import { SPRITE_PALETTE, TRANSPARENT, type PaletteKey } from "./palette";
import type { SpriteGrid } from "./sprites";

interface SpriteRect {
  x: number;
  y: number;
  width: number;
  fill: string;
}

function buildRects(grid: SpriteGrid): SpriteRect[] {
  const rects: SpriteRect[] = [];

  grid.forEach((row, y) => {
    let runStart = -1;
    let runChar = TRANSPARENT;

    const flush = (end: number) => {
      if (runStart === -1 || runChar === TRANSPARENT) return;
      rects.push({
        x: runStart,
        y,
        width: end - runStart,
        fill: SPRITE_PALETTE[runChar as PaletteKey],
      });
    };

    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      if (char === runChar) continue;
      flush(x);
      runStart = x;
      runChar = char;
    }
    flush(row.length);
  });

  return rects;
}

const rectCache = new WeakMap<SpriteGrid, SpriteRect[]>();

function getRects(grid: SpriteGrid): SpriteRect[] {
  let rects = rectCache.get(grid);
  if (!rects) {
    rects = buildRects(grid);
    rectCache.set(grid, rects);
  }
  return rects;
}

interface PixelSpriteProps {
  grid: SpriteGrid;
  gridWidth: number;
  gridHeight: number;
  className?: string;
}

export function PixelSprite({
  grid,
  gridWidth,
  gridHeight,
  className,
}: PixelSpriteProps) {
  return (
    <svg
      viewBox={`0 0 ${gridWidth} ${gridHeight}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {getRects(grid).map((rect, index) => (
        <rect
          key={index}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={1}
          fill={rect.fill}
        />
      ))}
    </svg>
  );
}
