import { useStore } from "@nanostores/react";
import { grid, type GridType } from "@/stores/grid.store";
import HeaderRow from "@/components/HeaderRow";
import LabelColumn from "@/components/LabelColumn";
import Cell from "@/components/Cell";
import { useEffect, useState } from "react";
import { useKeyBind } from "@/hooks/keyBinding";
import {
  useCopyToClipboard,
  useCutToClipboard,
  usePasteFromClipboard,
} from "@/hooks/clipboardOperation";

export type RangeType = {
  start: { row: number; col: number } | null;
  end: { row: number; col: number } | null;
};

const Grid = () => {
  const gridStore = useStore(grid);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [range, setRange] = useState<RangeType>({ start: null, end: null });
  
  const addRow = () => {
    const newRow = Array(gridStore[0].length).fill("");
    grid.set([...gridStore, newRow]);
  };

  const addColumn = () => {
    const newGrid = gridStore.map((row) => [...row, ""]);
    grid.set(newGrid);
  };

  const handleSelect = (row: number, col: number, shiftKey = false) => {
    if (!shiftKey) {
      setRange({ start: { row, col }, end: { row, col } });
    } else if (range.start) {
      setRange((prev) => ({ ...prev, end: { row, col } }));
    }
  };

  useEffect(() => {
    if (selectedRow !== null) setSelectedCol(null);
  }, [selectedRow]);

  useEffect(() => {
    if (selectedCol !== null) setSelectedRow(null);
  }, [selectedCol]);

  useCopyToClipboard(gridStore, range);
  useCutToClipboard(gridStore, range, (updatedGrid: GridType) => {
    grid.set(updatedGrid);
  });
  usePasteFromClipboard(gridStore, range, setRange, (updatedGrid: GridType) => {
    grid.set(updatedGrid);
  });

  useKeyBind(gridStore, range, setRange);

  return (
    <div className="p-4">
      <div className="border relative border-gray-300 inline-block select-none">
        <button
          onClick={addRow}
          className="absolute w-14 h-6 text-[10px] -bottom-6 border bg-gray-200 border-gray-400 text-gray-600 text-center"
        >
          Add Row
        </button>
        <button
          onClick={addColumn}
          className="absolute w-24 h-6 text-[10px] -right-24 border bg-gray-200 border-gray-400 text-gray-600 text-center"
        >
          Add Column
        </button>

        <HeaderRow
          setSelectedCol={setSelectedCol}
        />

        {gridStore.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            <LabelColumn setSelectedRow={setSelectedRow} count={rowIndex + 1} />
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                cell={cell}
                selectedRow={selectedRow}
                selectedCol={selectedCol}
                onSelect={handleSelect}
                range={range}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
