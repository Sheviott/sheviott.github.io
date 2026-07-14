
import { CardUIData } from "@components/card/card";
import styles from "./card.module.css";
import clsx from "clsx";

type CardUIProps = {
  cardData: CardUIData;
  hasData: boolean;
}
export const CardUI = ({ cardData, hasData }: CardUIProps) => {

  return (
    <li className={styles.card}>
      {cardData.image ? (<img
        src={cardData.image}
        alt="Картинка из API"
        className={clsx(styles.image, { [styles.hidden]: !hasData })}
        loading="lazy"
      />) : null
      }
      <p className={styles.title}>{hasData ? cardData.title : 'я не текст'}</p>
      <p className={styles.description}>{hasData ? cardData.description : ''}</p>
    </li>
  )
};