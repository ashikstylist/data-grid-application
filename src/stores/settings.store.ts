import { persistentAtom } from "@nanostores/persistent";

type SettingType = {
  colWidth: {
    [index: number]: number;
  };
  rowHeight: {
    [index: number]: number;
  };
};

const defaultSettings: SettingType = {
  colWidth: {},
  rowHeight: {},
};

export const settings = persistentAtom<SettingType>(
  "settings",
  defaultSettings,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
