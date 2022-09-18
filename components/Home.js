import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import { APP_COLORS, fetchCats } from "../utils/config";
import { AntDesign } from "@expo/vector-icons";
import Shimmer from "./Shimmer";

function Home({ setFavorites, favorites, cats, setCats }) {
  const [loading, setLoading] = useState(cats.length < 1);
  const [refreshing, setRefreshing] = useState(false);

  const getData = useCallback(() => {
    fetchCats(30)
      .then((d) => setCats([...d]))
      .catch(({ message }) => Alert.alert("Oops", message))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };
  useEffect(() => {
    if (cats.length < 1) {
      getData();
    }
  }, [setCats, cats.length]);
  return (
    <View style={{ backgroundColor: APP_COLORS.white, flexGrow: 1 }}>
      <View
        style={{
          flexGrow: 1,
          width: "100%",
          maxWidth: 600,
          padding: 20,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text
          style={{
            fontFamily: "sfpro",
            fontWeight: "bold",
            fontSize: 20,
            lineHeight: 24,
            paddingTop: 30,
          }}
        >
          All Cats
        </Text>
        {loading && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 10,
              marginTop: 40,
            }}
          >
            <ActivityIndicator color={APP_COLORS.grey} size="large" />
          </View>
        )}
        {!loading && (
          <FlatList
            testID="home-flatlist"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            data={cats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CatCard
                {...item}
                setFavorites={setFavorites}
                favorites={favorites}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

function CatCard({ breeds, id, url, setFavorites, favorites }) {
  const isClicked = useMemo(
    () => Boolean(favorites.find((f) => f.id === id)),
    [favorites]
  );

  return (
    <TouchableOpacity
      testID="home-cat-button"
      onPress={() => {
        isClicked
          ? setFavorites((f) => [...f.filter((obj) => obj.id !== id)])
          : setFavorites((f) => [
              { breeds, id, url },
              ...f.filter((obj) => obj.id !== id),
            ]);
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
        flexWrap: "wrap",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Shimmer
            src={{ uri: url }}
            style={{
              borderRadius: 10,
            }}
            width={40}
            height={40}
          />
        </View>
        <Text
          style={{
            fontFamily: "sfpro",
            marginLeft: 10,
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          {breeds[0]?.name}
        </Text>
      </View>
      <View>
        {isClicked ? (
          <AntDesign name="heart" size={20} color={APP_COLORS.red} />
        ) : (
          <AntDesign name="hearto" size={20} color={APP_COLORS.grey} />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Home;
export { CatCard };
