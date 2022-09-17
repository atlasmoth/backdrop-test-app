import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { APP_COLORS } from "../utils/config";
import { AntDesign } from "@expo/vector-icons";

function Cats({ setFavorites, favorites, navigation }) {
  if (favorites.length < 1) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        testID="button"
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: APP_COLORS.white,
          padding: 20,
        }}
      >
        <AntDesign name="arrowleft" size={40} color={APP_COLORS.black} />
        <Text
          style={{
            fontFamily: "sfpro",
            fontSize: 24,
            lineHeight: 28,
            marginTop: 20,
          }}
        >
          Please like a cat first
        </Text>
      </TouchableOpacity>
    );
  }
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
            paddingHorizontal: 10,

            flexBasis: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "sfpro",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 24,
              paddingLeft: 10,
              paddingTop: 30,
            }}
          >
            Cats I like
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: "100%",
            }}
          >
            {favorites.map((f) => (
              <CatFlexCard key={f.id} {...f} setFavorites={setFavorites} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function CatFlexCard({ breeds, id, url, setFavorites }) {
  return (
    <View
      style={{
        flexBasis: 150,
        flexGrow: 1,
        flexShrink: 0,
        paddingVertical: 20,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <View>
        <Image
          source={{ uri: url }}
          style={{ width: "100%", height: 150, borderRadius: 10 }}
          resizeMode="cover"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            paddingHorizontal: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "sfpro",
              fontSize: 14,
              lineHeight: 18,
            }}
          >
            {breeds[0].name}
          </Text>
          <TouchableOpacity
            testID="cat-button"
            onPress={() => {
              setFavorites((f) => [...f.filter((obj) => obj.id !== id)]);
            }}
          >
            <AntDesign name="heart" size={18} color={APP_COLORS.red} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Cats;
export { CatFlexCard };
