import { useStore } from "@nanostores/react";
import { grid } from "@/stores/grid.store";
import { settings } from "@/stores/settings.store";

type HeaderRowType = {
  setSelectedCol: React.Dispatch<React.SetStateAction<number | null>>;
};
const HeaderRow = ({ setSelectedCol }: HeaderRowType) => {
  const gridStore = useStore(grid);
  const settingStore = useStore(settings);

  const getColumnLabel = (index: number): string => {
    let result = "";
    let num = index + 1;

    while (num > 0) {
      const remainder = (num - 1) % 26;
      result = String.fromCharCode(65 + remainder) + result;
      num = Math.floor((num - 1) / 26);
    }

    return result;
  };

  const handleMouseDown = (e: React.MouseEvent, colIndex: number) => {
    const startX = e.clientX;
    const initialWidth = settingStore.colWidth[colIndex] || 100;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const difference = moveEvent.clientX - startX;
      const newWidth = Math.max(30, initialWidth + difference);
      const colWidthSet = { ...settingStore.colWidth, [colIndex]: newWidth };
      settings.set({ ...settingStore, colWidth: colWidthSet });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex">
      <div className="w-14 h-6   border bg-gray-100"></div>
      {gridStore[0].map((_value, index) => (
        <div
          key={index}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onClick={() => setSelectedCol(index)}
          style={{ width: settingStore.colWidth[index] || 96 }}
          className="w-24 min-w-[60px] h-6 text-sm border hover:border-blue-500 cursor-pointer bg-gray-100 flex items-center hover:cursor-ew-resize justify-center font-semibold p-1"
        >
          {getColumnLabel(index)}
        </div>
      ))}
    </div>
  );
};

export default HeaderRow;
