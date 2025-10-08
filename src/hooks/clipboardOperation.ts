import { useEffect } from "react";
import type { GridType } from "@/stores/grid.store";
import type { RangeType } from "@/components/Grid";

export const useCopyToClipboard = (gridStore: GridType, range: RangeType) => {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      if (!range.start || !range.end) return;

      const minRow = Math.min(range.start.row, range.end.row);
      const maxRow = Math.max(range.start.row, range.end.row);
      const minCol = Math.min(range.start.col, range.end.col);
      const maxCol = Math.max(range.start.col, range.end.col);

      const selectedRows = gridStore.slice(minRow, maxRow + 1);
      const copiedRows = selectedRows.map((row) => {
        const selectedCells = row.slice(minCol, maxCol + 1);
        return selectedCells.join("\t");
      });

      const copied = copiedRows.join("\n");

      e.clipboardData?.setData("text/plain", copied);
      e.preventDefault();
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, [gridStore, range]);
};

export const useCutToClipboard = (
  gridStore: GridType,
  range: RangeType,
  onCut: (value: GridType) => void
) => {
  useEffect(() => {
    const handleCut = (e: ClipboardEvent) => {
      if (!range.start || !range.end) return;

      e.preventDefault();

      const minRow = Math.min(range.start.row, range.end.row);
      const maxRow = Math.max(range.start.row, range.end.row);
      const minCol = Math.min(range.start.col, range.end.col);
      const maxCol = Math.max(range.start.col, range.end.col);

      const copied = gridStore
        .slice(minRow, maxRow + 1)
        .map((row) => row.slice(minCol, maxCol + 1).join("\t"))
        .join("\n");

      e.clipboardData?.setData("text/plain", copied);

      const newGrid = gridStore.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex >= minRow &&
          rIndex <= maxRow &&
          cIndex >= minCol &&
          cIndex <= maxCol
            ? ""
            : cell
        )
      );

      onCut(newGrid);
    };
    document.addEventListener("cut", handleCut);
    return () => document.removeEventListener("cut", handleCut);
  }, [range, gridStore]);
};

export const usePasteFromClipboard = (
  gridStore: GridType,
  range: RangeType,
  setRange: React.Dispatch<React.SetStateAction<RangeType>>,
  onPaste: (value: GridType) => void
) => {
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!range.start) return;
      const pasteText = e.clipboardData?.getData("text/plain");
      if (!pasteText) return;

      e.preventDefault();

      const pasteRows = pasteText.split(/\r?\n/).map((r) => r.split("\t"));

      const startRow = range.start.row;
      const startCol = range.start.col;

      let newGrid = gridStore.map((row) => [...row]);

      const requiredRows = startRow + pasteRows.length;
      while (newGrid.length < requiredRows) {
        newGrid.push(Array(newGrid[0]?.length || 0).fill(""));
      }

      const requiredCols =
        startCol + Math.max(...pasteRows.map((r) => r.length));
      newGrid = newGrid.map((row) => {
        const extraCols = requiredCols - row.length;
        return extraCols > 0 ? [...row, ...Array(extraCols).fill("")] : row;
      });

      pasteRows.forEach((pasteRow, rIdx) => {
        pasteRow.forEach((value, cIdx) => {
          newGrid[startRow + rIdx][startCol + cIdx] = value;
        });
      });
      setRange({
        start: { row: startRow, col: startCol },
        end: {
          row: startRow + pasteRows.length - 1,
          col: startCol + pasteRows[0].length - 1,
        },
      });
      onPaste(newGrid);
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [range, gridStore]);
};
