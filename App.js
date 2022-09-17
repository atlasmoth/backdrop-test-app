import { Text, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { APP_COLORS } from "./utils/config";
import Home from "./components/Home";
import Cats from "./components/Cats";
import useFavorites from "./hooks/useFavorites";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        backgroundColor: APP_COLORS.white,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: APP_COLORS.white,
          paddingHorizontal: 10,
          alignItems: "center",
          flexGrow: 1,
          maxWidth: 400,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={route.key}
              style={{
                flex: 1,
                padding: 10,
                paddingHorizontal: 5,
                backgroundColor: APP_COLORS.white,
              }}
            >
              <options.tabBarIcon active={isFocused ? true : false} />
              <Text
                style={{
                  color: isFocused ? APP_COLORS.black : APP_COLORS.grey,
                  textAlign: "center",
                  lineHeight: 18,
                  fontFamily: "sfpro",
                  fontWeight: "normal",
                  fontSize: 13,
                  marginTop: 5,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function App() {
  const [favorites, setFavorites, initLoading] = useFavorites();

  const [fontsLoaded] = useFonts({
    sfpro: require("./assets/fonts/sfpro.otf"),
  });

  if (!fontsLoaded || initLoading) {
    return null;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          options={{
            title: "All cats",
            headerShown: false,
            tabBarIcon: ({ active }) => {
              return (
                <View>
                  <Text style={{ textAlign: "center", fontFamily: "sfpro" }}>
                    <MaterialCommunityIcons
                      name="cat"
                      size={24}
                      color={active ? APP_COLORS.black : APP_COLORS.grey}
                    />
                  </Text>
                </View>
              );
            },
          }}
        >
          {() => <Home setFavorites={setFavorites} favorites={favorites} />}
        </Tab.Screen>
        <Tab.Screen
          name="Favorites"
          options={{
            title: "Cats I like",
            headerShown: false,
            tabBarIcon: ({ active }) => (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  <AntDesign
                    name="heart"
                    size={24}
                    color={active ? APP_COLORS.black : APP_COLORS.grey}
                  />
                </Text>
              </View>
            ),
          }}
        >
          {(props) => (
            <Cats
              setFavorites={setFavorites}
              favorites={favorites}
              {...props}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
