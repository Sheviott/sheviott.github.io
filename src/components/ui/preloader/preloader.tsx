import styles from "./preloader.module.css";

export default function Preloader() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src="loader.gif" alt="Загрузка контента" />
    </div>
  )
}