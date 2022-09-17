import { useEffect, useState, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { APP_COLORS, fetchCats } from "../utils/config";
import { AntDesign } from "@expo/vector-icons";

function Home({ setFavorites, favorites }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCats(30)
      .then((d) => setCats([...d]))
      .catch(({ message }) => Alert.alert("Oops", message))
      .finally(() => setLoading(false));
  }, [setCats]);
  return (
    <ScrollView
      style={{ backgroundColor: APP_COLORS.white, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            maxWidth: 650,
            padding: 20,
            flexBasis: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "sfpro",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 24,
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
          {!loading &&
            cats.length > 0 &&
            cats.map((c) => (
              <CatCard
                key={c.id}
                {...c}
                setFavorites={setFavorites}
                favorites={favorites}
              />
            ))}
        </View>
      </View>
    </ScrollView>
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
        <Image
          source={{ uri: url }}
          style={{ width: 40, height: 40, borderRadius: 10 }}
          resizeMode="cover"
        />
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
