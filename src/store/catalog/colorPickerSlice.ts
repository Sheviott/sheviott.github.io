import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ElementValue = "root" | "header" | "main" | "footer";
export type PropertyValue = "text" | "bg" | "blocks";

type PropertyElements = {
  bg: string | null;
  text?: string | null;
  blocks?: string | null;
};

export type ColorItem = {
  key: ElementValue;
  label: string;
  elem: ElementValue;
  property: PropertyElements;
};
type StoredColorsState = Partial<ColorsState>;

export type ColorPresets = {
  color: string;
  design: ColorItem[];
};

const itemsElement: ColorItem[] = [
  {
    key: "root",
    label: "root",
    elem: "root",
    property: { bg: null },
  },
  {
    key: "header",
    label: "header",
    elem: "header",
    property: { text: null, bg: null },
  },
  {
    key: "main",
    label: "main",
    elem: "main",
    property: { text: null, bg: null, blocks: null },
  },
  {
    key: "footer",
    label: "footer",
    elem: "footer",
    property: { text: null, bg: null },
  },
];
const itemsPresets: ColorPresets[] = [
  {
    color: "#FF8F41",
    design: [
      {
        key: "root",
        label: "root",
        elem: "root",
        property: { bg: "#FFF3E0" },
      },
      {
        key: "header",
        label: "header",
        elem: "header",
        property: { text: "#B82940", bg: "#FFD8B5" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#7A3E1D", bg: "#FFF0E6", blocks: "#EEBA80" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#F84941" },
      },
    ],
  },
  {
    color: "#EEBA80",
    design: [
      {
        key: "root",
        label: "root",
        elem: "root",
        property: { bg: "#FFF7ED" },
      },
      {
        key: "header",
        label: "header",
        elem: "header",
        property: { text: "#8A4B2A", bg: "#FDE3BF" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#5C341C", bg: "#FFF1DE", blocks: "#FFCD74" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#C96A3A" },
      },
    ],
  },
  {
    color: "#F84941",
    design: [
      {
        key: "root",
        label: "root",
        elem: "root",
        property: { bg: "#FFF1F0" },
      },
      {
        key: "header",
        label: "header",
        elem: "header",
        property: { text: "#FFFFFF", bg: "#B82940" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#5B1F24", bg: "#FFE5E3", blocks: "#FF7251" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#F84941" },
      },
    ],
  },
  {
    color: "#B82940",
    design: [
      {
        key: "root",
        label: "root",
        elem: "root",
        property: { bg: "#FFF0F2" },
      },
      {
        key: "header",
        label: "header",
        elem: "header",
        property: { text: "#FFFFFF", bg: "#B82940" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#6F1D2A", bg: "#FCE4E6", blocks: "#E23F8B" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#8F1F31" },
      },
    ],
  },
  {
    color: "#E23F8B",
    design: [
      {
        key: "root",
        label: "root",
        elem: "root",
        property: { bg: "#FFF0F8" },
      },
      {
        key: "header",
        label: "header",
        elem: "header",
        property: { text: "#FFFFFF", bg: "#E23F8B" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#6A2342", bg: "#FDE3EF", blocks: "#FF8F41" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#B82940" },
      },
    ],
  },
];

type ColorsState = {
  items: ColorItem[];
  colorsPanel: string[];
  colorsPresets: ColorPresets[];
  currentEl: ElementValue | null;
  currentSubEl: PropertyValue | null;
  currentClr: string;
  apiStatus: boolean,
  isOpen: boolean
};

const getStoredState = (): StoredColorsState | null => {
  const data = localStorage.getItem("colorsDate");
  if (!data) return null;

  try {
    return JSON.parse(data) as StoredColorsState;
  } catch {
    return null;
  }
};

const storedData = getStoredState();

const defaultInitialState : ColorsState = {
  items: itemsElement,
  colorsPanel: ["#000", "#fff"],
  colorsPresets: itemsPresets,
  currentEl: null,
  currentSubEl: null,
  currentClr: "",
  apiStatus: false,
  isOpen: false,
};
const initialState: ColorsState = {
  items: storedData?.items ?? defaultInitialState.items,
  colorsPanel: storedData?.colorsPanel ?? defaultInitialState.colorsPanel,
  colorsPresets: storedData?.colorsPresets ?? defaultInitialState.colorsPresets,
  currentEl: storedData?.currentEl ?? defaultInitialState.currentEl,
  currentSubEl: storedData?.currentSubEl ?? defaultInitialState.currentSubEl,
  currentClr: storedData?.currentClr ?? defaultInitialState.currentClr,
  apiStatus: storedData?.apiStatus ?? defaultInitialState.apiStatus,
  isOpen: storedData?.isOpen ?? defaultInitialState.isOpen,
};

// Получить элемент по ключу
const getItemByKey = (
  state: ColorsState,
  key: ElementValue,
): ColorItem | undefined => {
  return state.items.find((item) => item.key === key);
};

// Получить property по ключу элемента
const getPropertyByKey = (
  state: ColorsState,
  key: ElementValue,
): PropertyElements | undefined => {
  const item = getItemByKey(state, key);
  return item?.property;
};

export const colorPickerSlice = createSlice({
  name: "colorPicker",
  initialState,
  reducers: {
    setElement: (state, action: PayloadAction<ElementValue>) => {
      state.currentEl = action.payload;
      console.log("Выбран элемент:", action.payload);
    },

    setSubElement: (state, action: PayloadAction<PropertyValue>) => {
      state.currentSubEl = action.payload;
      console.log("Выбран подэлемент:", action.payload);
    },

    setColorEl: (state, action: PayloadAction<string>) => {
      state.currentClr = action.payload;
      console.log("Выбран цвет:", action.payload);
    },
    setItems: (state, action: PayloadAction<ColorItem[]>) => {
      state.items = action.payload;
      console.log("цвета:", state.colorsPanel);
    },
    setColorPanel: (state, action: PayloadAction<string[]>) => {
      state.colorsPanel = action.payload;
      console.log("Панель цветов:", state.colorsPanel);
    },

    applyColorEl: (state) => {
      const { currentEl, currentSubEl, currentClr } = state;

      if (!currentEl || !currentSubEl || !currentClr) {
        console.warn("⚠️ Не выбран элемент, подэлемент или цвет");
        return;
      }

      // Находим элемент
      const item = getItemByKey(state, currentEl);
      if (!item) {
        console.warn(`⚠️ Элемент "${currentEl}" не найден`);
        return;
      }

      // Применяем цвет к свойству
      const property = item.property;
      if (currentSubEl === "bg") {
        property.bg = currentClr;
      } else if (currentSubEl === "text") {
        property.text = currentClr;
      } else if (currentSubEl === "blocks") {
        // blocks - опциональное свойство, проверяем наличие
        if (property.blocks !== undefined) {
          property.blocks = currentClr;
        } else {
          console.warn(
            `⚠️ Свойство "blocks" не определено для элемента "${currentEl}"`,
          );
          return;
        }
      }
      console.log("Применен цвет:", {
        element: currentEl,
        property: currentSubEl,
        color: currentClr,
      });
    },
    // =================================================
    // Панель цветов
    // =================================================
    addColorToPanel: (state, action: PayloadAction<string>) => {
      if (state.colorsPanel.includes(action.payload)) return;
      if (state.colorsPanel.length >= 12) return;
      state.colorsPanel.push(action.payload);
    },
    deleteColorFromPanel: (state, action: PayloadAction<string>) => {
      state.colorsPanel = state.colorsPanel.filter(
        (color) => color !== action.payload,
      );
    },

    // !перенeсти
    addToLocalStorage: (state) => {
      const siteData = state
      localStorage.setItem( "colorsDate", 
        JSON.stringify(siteData),
      );
    },

    setColorsPreset: (state, action: PayloadAction<string>) => {
      const preset = state.colorsPresets.find((item) => item.color == action.payload)
      const design = preset?.design;
      if (!design) return;
      state.items = design;
    },
    addColorsPreset: (state, action: PayloadAction<string>) => {
      if (state.colorsPresets.length >= 12) return;
      state.colorsPanel.push(action.payload);
    },
    setApiStatus: (state) => {
      state.apiStatus = !state.apiStatus;
    },
    setIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    //Сброс выбора
    resetSelection: (state) => {
      state.currentEl = null;
      state.currentSubEl = null;
      state.currentClr = "";
    },

    //Сброс всех цветов
 resetAllColors: () => {
  console.log(initialState)
  return defaultInitialState
 },
  },
  selectors: {
    //Все элементы
    selectAllItems: (state) => state.items,

    //Текущие выборы
    selectCurrentEl: (state) => state.currentEl,
    selectCurrentSubEl: (state) => state.currentSubEl,
    selectCurrentClr: (state) => state.currentClr,

    //Получить элемент по ключу
    selectItemByKey: (state, key: ElementValue) => {
      return getItemByKey(state, key);
    },

    //Получить property по ключу
    selectPropertyByKey: (state, key: ElementValue) => {
      return getPropertyByKey(state, key);
    },

    selectColorsHistory: (state) => {
      return state.colorsPanel;
    },
    selectColorsPresets: (state) => {
      return state.colorsPresets;
    },
    selectRootBg: (state) => {
      const property = getPropertyByKey(state, "root");
      return property?.bg ?? null;
    },
    selectApiStatus: (state) => {
      return state.apiStatus
    },
    selectIsOpen: (state) => {
      return state.isOpen
    },

    // 🔵 HEADER
    selectHeaderBg: (state) => {
      const property = getPropertyByKey(state, "header");
      return property?.bg ?? null;
    },
    selectHeaderText: (state) => {
      const property = getPropertyByKey(state, "header");
      return property?.text ?? null;
    },

    // 🟢 MAIN

    selectMainBg: (state) => {
      const property = getPropertyByKey(state, "main");
      return property?.bg ?? null;
    },
    selectMainText: (state) => {
      const property = getPropertyByKey(state, "main");
      return property?.text ?? null;
    },
    selectMainBlocks: (state) => {
      const property = getPropertyByKey(state, "main");
      return property?.blocks ?? null;
    },

    // 🔴 FOOTER
    selectFooterBg: (state) => {
      const property = getPropertyByKey(state, "footer");
      return property?.bg ?? null;
    },
    selectFooterText: (state) => {
      const property = getPropertyByKey(state, "footer");
      return property?.text ?? null;
    },
  },
});

export const {
  setElement,
  setSubElement,
  setColorEl,
  addColorToPanel,
  deleteColorFromPanel,
  applyColorEl,
  resetSelection,
  resetAllColors,
  // ls
  addToLocalStorage,
  //
  setColorsPreset,
  setItems,
  setColorPanel,
  setApiStatus,
  setIsOpen
} = colorPickerSlice.actions;

export const {
  // Все элементы
  selectAllItems,

  // Текущие выборы
  selectCurrentEl,
  selectCurrentSubEl,
  selectCurrentClr,

  // Поиск по ключу
  selectItemByKey,
  selectPropertyByKey,

  //
  selectColorsHistory,
  selectColorsPresets,
  selectApiStatus,
  selectIsOpen,
  // Root
  selectRootBg,

  // Header
  selectHeaderBg,
  selectHeaderText,

  // Main
  selectMainBg,
  selectMainText,
  selectMainBlocks,

  // Footer
  selectFooterBg,
  selectFooterText,
} = colorPickerSlice.selectors;

export const colorPicker = colorPickerSlice.reducer;
