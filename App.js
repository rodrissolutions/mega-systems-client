import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFontsLoader } from "hooks/index.hooks";
import { Provider, useDispatch } from "react-redux";
import store from "store/store";
import { useEffect, useState } from "react";
import { setUser } from "store/slices/data.slice";
import { userAPI } from "api/index.api";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storageUtils } from "utils/index.utils";
import { View, ActivityIndicator, Text } from "react-native";
import "./global.css";

const AppContent = () => {
  const fontsLoaded = useFontsLoader();
  const dispatch = useDispatch();
  const [appReady, setAppReady] = useState(false); // NUEVO

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await storageUtils.getItem("user");

        if (user) {
          const userFound = await userAPI.getById(user.id);
          if (userFound) {
            const { user: userDB } = await userFound.data;
            dispatch(setUser(userDB));
          }
        }
      } catch (error) {
        console.warn("⚠️ Error al cargar el usuario:", error);
      } finally {
        setAppReady(true); // Indica que terminó la carga, haya usuario o no
      }
    };

    loadUser();
    // setAppReady(true);
  }, []);

  if (!fontsLoaded || !appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando la app...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
