import { CardUI } from "../ui/card/card";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@services/hooks";
import {
  selectApiStatus,
  selectIsLoading,
  setIsLoading,
} from "@store/catalog/colorPickerSlice";
import { Link } from "react-router-dom";

type AnimeItem = {
  id: number;
  poster: {
    src: string;
  };
  name: {
    main: string;
  };
  description: string;
};

export type CardUIData = {
  id: number;
  image: string | null;
  title: string;
  description: string;
};
export const Card = () => {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const dispatch = useAppDispatch();
  const api = "https://anilibria.top";

  const apiStatus = useAppSelector(selectApiStatus);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (!apiStatus) return;

    const fetchData = async () => {
      dispatch(setIsLoading(true));
      try {
        const res = await fetch(`${api}/api/v1/anime/catalog/releases`);
        const data = await res.json();
        setAnimeList(data.data);
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    fetchData();
  }, [apiStatus, dispatch]);

  const cards = Array.from({ length: 10 }, (_, i) => {
    const item = animeList[i];
    const cardData: CardUIData = item
      ? {
          id: item.id,
          image: api + item.poster.src,
          title: item.name.main,
          description: item.description,
        }
      : {
          id: 0,
          image: null,
          title: "",
          description: "",
        };
    return item ? (
      <Link key={i} to={`catalog/${item.id}`}>
        <CardUI  cardData={cardData} hasData={apiStatus && !isLoading} />
      </Link>
    ) : (
      <CardUI key={i} cardData={cardData} hasData={false} />
    );
  });

  return cards;
};
