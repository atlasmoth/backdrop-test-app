import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { APP_COLORS, fetchCats } from "../utils/config";
import { AntDesign } from "@expo/vector-icons";

export default function Home({ setFavorites }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCats(30)
      .then((d) => setCats([...d]))
      .catch()
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
            flexGrow: 1,
            maxWidth: 650,
            padding: 25,
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
              <CatCard key={c.id} {...c} setFavorites={setFavorites} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

function CatCard({ breeds, id, url, setFavorites }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setIsClicked((s) => !s);
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
            fontWeight: 600,
            marginLeft: 10,
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {breeds[0].name}
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

CatCard.defaultProps = {
  breeds: [],
  url: "",
  id: "",
};
