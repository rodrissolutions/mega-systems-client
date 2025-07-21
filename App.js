import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFontsLoader } from "hooks/index.hooks";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "store/store";
import { useEffect } from "react";
import storageUtil from "utils/storage/storage.util";
import { setUser } from "store/slices/data.slice";
import { userAPI } from "./src/api/index.api";
import { SafeAreaProvider } from "react-native-safe-area-context";

const AppContent = () => {
  const fontsLoaded = useFontsLoader();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const user = await storageUtil.getItem("user");
      if (user) {
        const userFound = await userAPI.getById(user.id);
        if (userFound) {
          const { user: userDB } = await userFound.data;
          dispatch(setUser(userDB));
        }
      }
    };
    loadUser();
  }, []);
  if (!fontsLoaded) return null;
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
