import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export type ElementValue = "root" | "header" | "main" | "li" | "footer";
export type PropertyValue = "text" | "bg";

type PropertyElements = {
  bg: string | null;
  text?: string | null;
};

export type ColorItem = {
  key: ElementValue;
  label: string;
  elem: ElementValue;
  property: PropertyElements;
};
type StoredColorsState = Partial<ColorsState>;

export type ColorPreset = {
  id: string;
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
    property: { text: null, bg: null },
  },
  {
    key: "li",
    label: "li",
    elem: "li",
    property: { text: null, bg: null },
  },
  {
    key: "footer",
    label: "footer",
    elem: "footer",
    property: { text: null, bg: null },
  },
];
const itemsPresets: ColorPreset[] = [
  {
    id: "#4CAF50",
    design: [
      {
        key: "root",
        label: "root",
        elem: "root",
        property: { bg: "#E8F5E9" },
      },
      {
        key: "header",
        label: "header",
        elem: "header",
        property: { text: "#1B5E20", bg: "#C8E6C9" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#2E7D32", bg: "#F1F8E9" },
      },
      {
        key: "li",
        label: "li",
        elem: "li",
        property: { text: "#1B5E20", bg: "#C8E6C9" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#388E3C" },
      },
    ],
  },
  {
    id: "#2196F3",
    design: [
      {
        key: "root",
        label: "root",
        elem: "root",
        property: { bg: "#E3F2FD" },
      },
      {
        key: "header",
        label: "header",
        elem: "header",
        property: { text: "#0D47A1", bg: "#BBDEFB" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#1565C0", bg: "#EAF4FD" },
      },
      {
        key: "li",
        label: "li",
        elem: "li",
        property: { text: "#0D47A1", bg: "#BBDEFB" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#1976D2" },
      },
    ],
  },
  {
    id: "#FF9800",
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
        property: { text: "#E65100", bg: "#FFE0B2" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#BF360C", bg: "#FFF8E1" },
      },
      {
        key: "li",
        label: "li",
        elem: "li",
        property: { text: "#E65100", bg: "#FFE0B2" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#F57C00" },
      },
    ],
  },
  {
    id: "#F44336",
    design: [
      {
        key: "root",
        label: "root",
        elem: "root",
        property: { bg: "#FFEBEE" },
      },
      {
        key: "header",
        label: "header",
        elem: "header",
        property: { text: "#FFFFFF", bg: "#D32F2F" },
      },
      {
        key: "main",
        label: "main",
        elem: "main",
        property: { text: "#B71C1C", bg: "#FFCDD2" },
      },
      {
        key: "li",
        label: "li",
        elem: "li",
        property: { text: "#FFFFFF", bg: "#EF5350" },
      },
      {
        key: "footer",
        label: "footer",
        elem: "footer",
        property: { text: "#FFFFFF", bg: "#C62828" },
      },
    ],
  },
];

type ColorsState = {
  items: ColorItem[];
  colorsPanel: string[];
  colorsPresets: ColorPreset[];
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

const defaultInitialState: ColorsState = {
  items: itemsElement,
  colorsPanel: ["#000000", "#ffffff"],
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
// отображение элементов 

export const colorPickerSlice = createSlice({
  name: "colorPicker",
  initialState,
  reducers: {
    setElement: (state, action: PayloadAction<ElementValue>) => {
      state.currentEl = action.payload;
    },

    setSubElement: (state, action: PayloadAction<PropertyValue>) => {
      state.currentSubEl = action.payload;
    },

    setColorEl: (state, action: PayloadAction<string>) => {
      state.currentClr = action.payload;
    },
    setItems: (state, action: PayloadAction<ColorItem[]>) => {
      state.items = action.payload;
    },
    setColorPanel: (state, action: PayloadAction<string[]>) => {
      state.colorsPanel = action.payload;
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
      }
    },
    // =================================================
    // Панель закреплённых цветов
    // =================================================
    addColorToPanelPins: (state, action: PayloadAction<string>) => {
      if (state.colorsPanel.includes(action.payload)) return;
      if (state.colorsPanel.length >= 12) return;
      state.colorsPanel.push(action.payload);
    },
    deleteColorFromPanelPins: (state, action: PayloadAction<string>) => {
      state.colorsPanel = state.colorsPanel.filter(
        (color) => color !== action.payload,
      );
    },
    // =================================================
    // =================================================


    // =================================================
    // Пресеты 
    // =================================================

    // по клику применяем стили пресета
    // исп. в файле tabPresets
    setColorsPreset: (state, action: PayloadAction<string>) => {
      const preset = state.colorsPresets.find(
        (item) => item.id === action.payload
      );
      if (!preset) return;

      state.items = preset.design;
    },

    // Добавить пресет на панель
    addColorsPreset: {
      reducer: (state, action: PayloadAction<ColorPreset>) => {
        state.colorsPresets.push(action.payload);
      },
      prepare(design: ColorItem[]) {
        return {
          payload: {
            id: nanoid(),
            design,
          } as ColorPreset,
        };
      },
    },

    // =================================================
    // =================================================
    // !перенeсти
    addToLocalStorage: (state) => {
      const siteData = state
      localStorage.setItem("colorsDate",
        JSON.stringify(siteData),
      );
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

    selectColorsPins: (state) => {
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
    selectLiBg: (state) => {
      const property = getPropertyByKey(state, "li");
      return property?.bg ?? null;
    },
    selectLiText: (state) => {
      const property = getPropertyByKey(state, "li");
      return property?.text ?? null;
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
  // 
  addColorToPanelPins,
  deleteColorFromPanelPins,
  // 
  applyColorEl,
  resetSelection,
  resetAllColors,
  // ls
  addToLocalStorage,
  //
  setColorsPreset,
  addColorsPreset,
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
  selectColorsPins,
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
  selectLiBg,
  selectLiText,

  // Footer
  selectFooterBg,
  selectFooterText,
} = colorPickerSlice.selectors;

export const colorPicker = colorPickerSlice.reducer;
