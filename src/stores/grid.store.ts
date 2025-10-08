import { persistentAtom } from "@nanostores/persistent";

export type GridType = string[][];

const defaultGrid: GridType = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => "")
);

export const grid = persistentAtom<GridType>("grid", defaultGrid, {
  encode: JSON.stringify,
  decode: JSON.parse,
});