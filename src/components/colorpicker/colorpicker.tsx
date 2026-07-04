import { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import styles from "./colorpicker.module.css";
import {
  setElement,
  setSubElement,
  setColorEl,
  applyColorEl,
  addColorToPanel,
  deleteColorFromPanel,
  selectCurrentEl,
  selectCurrentSubEl,
  selectAllItems,
  selectColorsHistory,
  resetAllColors,
  addToLocalStorage,
  PropertyValue,
  ElementValue,
  selectIsOpen,
  setIsOpen,
} from "@store/catalog/colorPickerSlice";
import { useAppDispatch, useAppSelector } from "@services/hooks";
import { Button } from "@components/ui/button/button";
import Divider from "@components/divider/divider";
import clsx from "clsx";
import { Tabs } from "@components/ui/tabs/tabs";
import { TabApiToggle } from "@components/tabsElement/tabApiToggle/tabApiToggle";
import { TabPresets } from "@components/tabsElement/tabPresets/tabPresets";

export const ColorPickerUI = () => {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState("#aabbcc");

  const currentEl = useAppSelector(selectCurrentEl);
  const currentSubEl = useAppSelector(selectCurrentSubEl);
  const items = useAppSelector(selectAllItems);
  const panelColors = useAppSelector(selectColorsHistory);

  const IsOpen = useAppSelector(selectIsOpen);

  const colorPickerHandler = (color: string) => {
    setColor(color);
    if (!currentEl) return;
    if (!currentSubEl) return;
    dispatch(setColorEl(color));
    dispatch(applyColorEl());
  };

  const handleElementSelect = (element: string) => {
    dispatch(setElement(element as ElementValue));

    // Если выбран root - сразу выбираем bg
    if (element === "root") {
      dispatch(setSubElement("bg"));
    }
  };
  const panelToggleState = () => {
    dispatch(setIsOpen())
  }
  //Получаем массив элементов из Redux
  const elements = items.map((item) => ({
    key: item.key,
    label: item.label,
  }));

  // ✅ Массив свойств для отображения
  const subElements = [
    { key: "bg", label: "bg" },
    { key: "text", label: "text" },
    { key: "blocks", label: "blocks" },
  ];
  // ✅ Получаем доступные свойства для текущего элемента
  const getAvailableProperties = () => {
    if (!currentEl) return ["bg"];

    const item = items.find((item) => item.key === currentEl);
    if (!item) return ["bg"];

    const props = ["bg"];
    if (item.property.text !== undefined) props.push("text");
    if (item.property.blocks !== undefined) props.push("blocks");
    return props;
  };

  const availableProps = getAvailableProperties();

  const buttonToggleStyle = {
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: 'translate(-3px, 0px)',
    padding: '10px 5px',
    borderRadius: '5px',
  } as const;

    const tabs = [
      { id: "presets", label: "Пресеты", component: < TabPresets /> }, 
      { id: "api", label: "Api", component: <TabApiToggle /> },
    ];

  return (
    <div className={clsx(styles.wrapper, IsOpen && styles.open)}>
      <div className={styles.top}>
        <div className={styles.main}>
          <h1 className={styles.title}>Цветовая панель</h1>
          <Divider></Divider>

          <div className={styles.part}>
            <h2 className={styles.subtitle}>Выберите элемент:</h2>
            <div className={styles.row} style={{ flexWrap: "wrap" }}>
              {elements.map((el) => (
                <Button
                  key={el.key}
                  size="small"
                  onClick={() => handleElementSelect(el.key)}
                >
                  {el.label}
                </Button>
              ))}
            </div>
          </div>

          <div className={styles.part}>
            <p className={styles.subtitle}>Выберите свойство:</p>
            <div className={styles.row}>
              {subElements.map((sub) => {
                const isAvailable = availableProps.includes(sub.key);
                const isActive = currentSubEl === sub.key;

                return (
                  <Button
                    key={sub.key}
                    size="small"
                    variant={isActive ? "primary" : "secondary"}
                    onClick={() => {
                      if (isAvailable) {
                        dispatch(setSubElement(sub.key as PropertyValue));
                      }
                    }}
                    disabled={!isAvailable}
                    className={!isAvailable ? styles.disabled : ""}
                  >
                    {sub.label}
                    {!isAvailable && " 🔒"}
                  </Button>
                );
              })}
            </div>
          </div>

          <Divider></Divider>

          <div
            className={clsx(`${styles.row}`, `${styles.grid}`)}
            style={{ alignItems: "normal" }}
          >
            <HexAlphaColorPicker
              className={styles.HexColorPicker}
              color={color}
              onChange={colorPickerHandler}
            />
            <div className={styles.presets}>
              {panelColors.map((lastColor) => (
                <div key={lastColor}>
                  <Button
                    variant="dot"
                    color={lastColor}
                    onClick={() => {
                      setColor(lastColor);
                      if (currentEl && currentSubEl) {
                        dispatch(setColorEl(lastColor));
                        dispatch(applyColorEl());
                      }
                    }}
                  ></Button>
                  <Button
                    className={styles.deleteBtn}
                    style={{ background: "transparent", border: "none" }}
                    onClick={() => dispatch(deleteColorFromPanel(lastColor))}
                  >
                    x
                  </Button>
                </div>
              ))}
            </div>
            <Button
              size="small"
              className={styles.addColorBtn}
              onClick={() => dispatch(addColorToPanel(color))}
            >
              Добавить цвет на панель
            </Button>
          </div>

          <Divider></Divider>
          <div className={styles.part} style={{ flexFlow: "row", gap: '5px' }}>
            <div className={styles.row} style={{ flexWrap: "wrap" }}>
              <p className={styles.subtitle}>Выбранные Элемент и Цвет:</p>
              <p className={styles.currElements} style={{ display: 'flex', gap: '5px' }}>
                {currentEl && <span>{currentEl}</span>}
                {currentSubEl && <span>{currentSubEl}</span>}
              </p>
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.row}>
              <div className={styles.inputColor} style={{}}>
                <input
                  disabled
                  type="color"
                  onChange={() => colorPickerHandler}
                  value={color}
                />
              </div>
              <div>{color}</div>
            </div>
            <Button size="small" onClick={() => colorPickerHandler(color)}>
              Применить текущий цвет
            </Button>
          </div>

          <Divider></Divider>

          <div className={styles.part}>
            <div className={styles.row}>
              <Tabs tabs={tabs} />
            </div>
          </div>

        </div>

        <div className={styles.row}>
          <Button
            onClick={() => {
              dispatch(addToLocalStorage());
            }}
          >
            Сохранить
          </Button>

          <Button
            onClick={() => {
              dispatch(resetAllColors());
              localStorage.removeItem("colorsDate");
            }}
          >
            Сбросить
          </Button>
        </div>
      </div>
      <Button style={buttonToggleStyle} onClick={() => { dispatch(panelToggleState) }} >{IsOpen ? '>' : '<'}</Button>
    </div>
  );
};
