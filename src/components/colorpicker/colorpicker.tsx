import { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import styles from "./colorpicker.module.css";
import {
  setElement,
  setSubElement,
  setColorEl,
  applyColorEl,
  addColorToPanelPins,
  deleteColorFromPanelPins,
  selectCurrentEl,
  selectCurrentSubEl,
  selectAllItems,
  selectColorsPins,
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
import { TabExports } from "@components/tabsElement/tabExports/tabExports";

export const ColorPickerUI = () => {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState("#aabbcc");

  const currentEl = useAppSelector(selectCurrentEl);
  const currentSubEl = useAppSelector(selectCurrentSubEl);
  const items = useAppSelector(selectAllItems);
  const colorsPins = useAppSelector(selectColorsPins);

  const IsOpen = useAppSelector(selectIsOpen);

  const colorPickerHandler = (color: string) => {
    setColor(color);
    if (!currentEl) return;
    if (!currentSubEl) return;
    dispatch(setColorEl(color));
    dispatch(applyColorEl());
  };

  const handleElementSelect = (element: ElementValue) => {
    setActiveElement(element);
    dispatch(setElement(element));
    dispatch(setSubElement("bg"));
  };

  //Получаем массив элементов из Redux
  const elements = items.map((item) => ({
    key: item.key,
    label: item.label,
  }));

  // ✅ Массив свойств для отображения
  const subElements = [
    { key: "bg", label: "bg" },
    { key: "text", label: "text" },
  ];
  // ✅ Получаем доступные свойства для текущего элемента
  const getAvailableProperties = () => {
    if (!currentEl) return ["bg"];

    const item = items.find((item) => item.key === currentEl);
    if (!item) return ["bg"];

    const props = ["bg"];
    if (item.property.text !== undefined) props.push("text");
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
    { id: "api", label: "Api", component: <TabApiToggle /> },
    { id: "presets", label: "Пресеты", component: < TabPresets /> },
    { id: "export", label: "Экспорт", component: <TabExports /> },
    { id: "ui", label: "UI", component: <>В разработке</> },
  ];

  const top = ["root", "header"];
  const main = ["main", "li"];
  const footer = ["footer"];

  const topArray = elements.filter((item) => top.includes(item.key));
  const mainArray = elements.filter((item) => main.includes(item.key));
  const footerArray = elements.filter((item) => footer.includes(item.key));
  const [activeElement, setActiveElement] = useState<ElementValue | null>(null);

  return (
    <div className={clsx(styles.wrapper, IsOpen && styles.open)}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.colors}>
            <h1 className={styles.title}>Цветовая панель</h1>

            <Divider></Divider>

            <div className={styles.part}>
              <h2 className={styles.subtitle}>Выберите элемент:</h2>
              <div className={styles.row} style={{ flexFlow: 'column', alignItems: 'flex-start' }}>
                <div className={styles.elems}>
                  {topArray.map((el) => {
                    return (
                      <Button
                        key={el.key}
                        variant={activeElement === el.key ? "secondary" : "primary"}
                        onClick={() => handleElementSelect(el.key)}
                      >
                        {el.label}
                      </Button>
                    );
                  })}
                </div>
                <div className={styles.elems}>
                  {mainArray.map((el) => {
                    return (
                      <Button
                        key={el.key}
                        variant={activeElement === el.key ? "secondary" : "primary"}
                        onClick={() => handleElementSelect(el.key)}
                      >
                        {el.label}
                      </Button>
                    );
                  })}
                </div>
                <div className={styles.elems}>
                  {footerArray.map((el) => {
                    return (
                      <Button
                        key={el.key}
                        variant={activeElement === el.key ? "secondary" : "primary" }
                        onClick={() => handleElementSelect(el.key)}
                      >
                        {el.label}
                      </Button>
                    );
                  })}
                </div>
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
                      variant={isActive ? "secondary" : "primary"}
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
              <div className={styles.pins}>
                {colorsPins.map((lastColor) => (
                  <div key={lastColor} className={styles.pin}>
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
                      onClick={() => dispatch(deleteColorFromPanelPins(lastColor))}
                    >
                      x
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                size="small"
                className={styles.addColorBtn}
                onClick={() => dispatch(addColorToPanelPins(color))}
              >
                Добавить цвет на панель
              </Button>
            </div>

            <Divider></Divider>
            <div className={styles.part} style={{ flexFlow: "row", gap: '5px' }}>
              <div className={styles.row} style={{ flexWrap: "wrap" }}>
                <p className={styles.subtitle}>Выбранные Элемент и Цвет:</p>
                <p className={styles.currElements} style={{ display: "flex", gap: "5px" }}>
                  {currentEl || currentSubEl ? (
                    <>
                      {currentEl && <span>{currentEl}</span>}
                      {currentSubEl && <span>{currentSubEl}</span>}
                    </>
                  ) : (
                    <span style={{ color: 'red', fontSize: '14px' }}>Не выбрано</span>
                  )}
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
                <Tabs tabs={tabs} className={styles.tabs} />
              </div>
            </div>

          </div>

          <div className={styles.actions}>
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
        <Button style={buttonToggleStyle} onClick={() => dispatch(setIsOpen())} >{IsOpen ? '>' : '<'}
        </Button>
      </div>
    </div>
  );
};
