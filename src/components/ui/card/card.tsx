import { useState, useEffect } from 'react';

import styles from "./card.module.css";
import { useAppSelector } from '@services/hooks';
import { selectApiStatus } from '@store/catalog/colorPickerSlice';
type AnimeItem = {
  poster: {
    src: string;
  };
};

export const CardUI = () => {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const api = 'https://anilibria.top/'
  const cards = [];
  const apiStatus = useAppSelector(selectApiStatus);
    useEffect(() => {
    fetch('https://anilibria.top/api/v1/anime/catalog/releases')
      .then(res => res.json())
      .then(data => {
          setAnimeList(data.data);
          setLoading(false);
      })
      .catch(err =>  {
        console.error('Ошибка:', err);
        setLoading(false);
      }
      );
  }, []);
  console.log(animeList)
  if (loading) return <div>Загрузка аниме...</div>;

    for (let i = 0; i < 10; i++) {
      cards.push(
        <div key={i} className={styles.card}>
            <div className={styles.image}>
              {apiStatus ? 
              <div>
                  <img
                    src={api + animeList[i].poster.src}
                    alt="Случайная картинка из API"
                    className={styles.image}
                    loading="lazy"
                  />
                  <p className={styles.title}>{animeList[i].name.main}</p>
                  <p className={styles.description}>{animeList[i].description}</p>
              </div>
                : <div className={styles.imageHidden}></div>
                }
            </div>
          {/* <div className={styles.title}>{animeList[i].name.main}</div> */}
        </div>
      );
    }
  return cards
};
