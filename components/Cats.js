import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { APP_COLORS } from "../utils/config";
import { AntDesign } from "@expo/vector-icons";

export default function Cats({ setFavorites, favorites }) {
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
            Cats I like
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {favorites.length > 0 && (
              <>
                {favorites.map((f) => (
                  <CatFlexCard key={f.id} {...f} />
                ))}
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function CatFlexCard({ breeds, id, url, setFavorites }) {
  return (
    <TouchableOpacity
      onPress={() => {
        setFavorites((f) => [...f.filter((obj) => obj.id !== id)]);
      }}
      style={{
        marginVertical: 20,
        flexBasis: 150,
        flexShrink: 0,
        height: 200,
        justifyContent: "space-between",
      }}
    >
      <Image
        source={{ uri: url }}
        style={{ width: 150, height: 150, borderRadius: 10 }}
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            fontFamily: "sfpro",
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {breeds[0].name}
        </Text>
        <View>
          <AntDesign name="heart" size={18} color={APP_COLORS.red} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

CatFlexCard.defaultProps = {
  breeds: [],
  url: "",
  id: "",
};
