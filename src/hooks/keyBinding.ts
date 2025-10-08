import { useEffect } from "react";
import type { RangeType } from "@/components/Grid";

export const useKeyBind = (
  gridStore: string[][],
  range: RangeType,
  setRange: (r: RangeType) => void
) => {
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRange({ start: null, end: null });
        return;
      }

      if (!range.start || !range.end) return;
      let { row, col } = range.end;

      switch (e.key) {
        case "ArrowUp":
          row = Math.max(0, row - 1);
          break;
        case "ArrowDown":
          row = Math.min(gridStore.length - 1, row + 1);
          break;
        case "ArrowLeft":
          col = Math.max(0, col - 1);
          break;
        case "ArrowRight":
          col = Math.min(gridStore[0].length - 1, col + 1);
          break;
        case "Enter":
          row = Math.min(gridStore.length - 1, row + 1);
          if (!e.shiftKey) col = range.start.col; 
          break;
        case "Tab":
          col = col + 1;
          if (col >= gridStore[0].length) {
            col = 0;
            row = Math.min(gridStore.length - 1, row + 1);
          }
          break;
        default:
          return;
      }

      if (e.shiftKey) {
        setRange({
          start: range.start,
          end: { row, col },
        });
      } else {
        setRange({
          start: { row, col },
          end: { row, col },
        });
      }

      e.preventDefault();
    };

    document.addEventListener("keydown", handleKeys);
    return () => document.removeEventListener("keydown", handleKeys);
  }, [range, gridStore, setRange]);
};
