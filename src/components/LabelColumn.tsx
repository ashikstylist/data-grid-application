import { settings } from "@/stores/settings.store";
import { useStore } from "@nanostores/react";

type LabelColumnType = {
  count: number;
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
};
const LabelColumn = ({ count, setSelectedRow }: LabelColumnType) => {
  const settingStore = useStore(settings);

  const handleRowResize = (e: React.MouseEvent, rowIndex: number) => {
    const startY = e.clientY;
    const initialHeight = settingStore.rowHeight[rowIndex] || 30;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const difference = moveEvent.clientY - startY;
      const newHeight = Math.max(20, initialHeight + difference);
      const rowWidthSet = { ...settingStore.rowHeight, [rowIndex]: newHeight };
      settings.set({ ...settingStore, rowHeight: rowWidthSet });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      onClick={() => setSelectedRow(count - 1)}
      style={{ height: settingStore.rowHeight[count] || 24 }}
      onMouseDown={(e) => handleRowResize(e, count)}
      className="w-14 h-6 min-h-6 border hover:border-blue-500 text-sm p-1 bg-gray-100 flex text-gray-500 items-center justify-center font-semibold cursor-ns-resize"
    >
      {count}
    </div>
  );
};

export default LabelColumn;
