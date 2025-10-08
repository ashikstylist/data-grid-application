import { useStore } from "@nanostores/react";
import { grid } from "../stores/grid.store";
import type { RangeType } from "./Grid";
import { useEffect, useRef } from "react";
import { settings } from "../stores/settings.store";

type CellType = {
  rowIndex: number;
  colIndex: number;
  cell: string;
  selectedRow: number | null;
  selectedCol: number | null;
  onSelect: (row: number, col: number, shiftKey?: boolean) => void;
  range: RangeType;
};

const Cell = ({
  rowIndex,
  colIndex,
  cell,
  selectedRow,
  selectedCol,
  onSelect,
  range,
}: CellType) => {
  const gridStore = useStore(grid);
  const inputRef = useRef<HTMLInputElement>(null);
  const { colWidth, rowHeight } = useStore(settings);
  const isActive = range?.end?.row === rowIndex && range?.end?.col === colIndex;

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isActive]);

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newGrid = [...gridStore];
    const row = [...newGrid[rowIndex]];
    row[colIndex] = value;
    newGrid[rowIndex] = row;
    grid.set(newGrid);
  };

  const header = () => {
    let bgClass = "";
    if (rowIndex === 0 && colIndex === 0) {
      bgClass = "bg-white text-black"; 
    } else if (rowIndex === 0) {
      bgClass = "bg-red-200 text-black font-semibold"; 
    } else if (colIndex === 0) {
      bgClass = "bg-green-200 text-black font-semibold";
    }
    return bgClass;
  };

  

  const isInRange = (row: number, col: number) => {
    if (!range.start || !range.end) return false;
    const minRow = Math.min(range.start.row, range.end.row);
    const maxRow = Math.max(range.start.row, range.end.row);
    const minCol = Math.min(range.start.col, range.end.col);
    const maxCol = Math.max(range.start.col, range.end.col);
    return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
  };

  return (
    <input
      ref={inputRef}
      value={cell}
      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
      style={{
        width: colWidth[colIndex] || 96,
        height: rowHeight[rowIndex + 1] || 24,
      }}
      onMouseDown={(e) => onSelect(rowIndex, colIndex, e.shiftKey)}
      onMouseEnter={(e) => {
        if (e.buttons === 1) onSelect(rowIndex, colIndex, true);
      }}
      className={`border w-24 min-w-[60px] h-6 text-sm min-h-[24px] text-start p-1 outline-none border-gray-300  ${header()}
        ${
          isInRange(rowIndex, colIndex)
            ? "!bg-blue-100 !border-blue-400"
            : rowIndex === selectedRow || colIndex === selectedCol
            ? "bg-yellow-100"
            : ""
        }`}
    />
  );
};

export default Cell;
