import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [cats, setCats] = useState([]);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("state")
      .then((result) => {
        if (result) {
          const { favorites, cats } = JSON.parse(result);
          setFavorites(favorites);
          setCats(cats);
        }

        setInitLoading(false);
      })
      .catch(console.log);
  }, [setFavorites, setCats]);
  useEffect(() => {
    AsyncStorage.setItem("state", JSON.stringify({ favorites, cats })).catch(
      console.log
    );
  }, [favorites, cats]);

  return { favorites, setFavorites, initLoading, cats, setCats };
}

export default useFavorites;
