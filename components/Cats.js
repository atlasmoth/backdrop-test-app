import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { APP_COLORS } from "../utils/config";
import { AntDesign } from "@expo/vector-icons";
import Shimmer from "./Shimmer";

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
    <View style={{ backgroundColor: APP_COLORS.white, flexGrow: 1 }}>
      <View
        style={{
          width: "100%",
          maxWidth: 600,
          paddingTop: 20,
          paddingHorizontal: 10,
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
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          Cats I like
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          width: "100%",
          maxWidth: 600,
          paddingBottom: 90,
          paddingHorizontal: 10,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CatFlexCard {...item} setFavorites={setFavorites} />
        )}
      />
    </View>
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
        <Shimmer
          src={{ uri: url }}
          width="100%"
          height={150}
          style={{
            borderRadius: 10,
          }}
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
              flex: 1,
            }}
          >
            {breeds[0].name}
          </Text>
          <TouchableOpacity
            style={{ flexBasis: 20, flexShrink: 0 }}
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
