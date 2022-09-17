import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("favorites")
      .then((result) => {
        setFavorites(JSON.parse(result || "[]"));
        setInitLoading(false);
      })
      .catch(console.log);
  }, [setFavorites]);
  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites)).catch(
      console.log
    );
  }, [favorites]);

  return [favorites, setFavorites, initLoading];
}

export default useFavorites;
