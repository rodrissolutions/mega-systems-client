import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import storageUtil from "utils/storage/storage.util";
import { logout } from "redux/slices/data.slice";
import { useDispatch, useSelector } from "react-redux";
import { LoginRequired } from "components/index.components";
const Profile = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const resetReduxData = () => {
    dispatch(logout());
  };

  const closeSession = async () => {
    await storageUtil.removeItem("user");
    await storageUtil.removeItem("token");
    resetReduxData();
    navigation.replace("Home");
  };
  const goToAddressForm = () => {
    navigation.navigate("Address");
  };

  const goToChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const goToEditInformation = () => {
    navigation.navigate("EditInformation");
  };

  return (
    <View className="flex flex-col flex-1 bg-[#F5F9FF] items-center justify-center">
      {user ? (
        <View className="w-[370px] h-[500px] relative bg-white rounded-xl border border-gray-200">
          {/* Imagen */}
          <View className="w-32 h-32 rounded-full bg-[#1786f9] absolute -top-16 left-[135px] flex flex-col justify-center items-center border-2 border-gray-200 shadow-xl shadow-indigo-500">
            <Image
              source={{
                uri: user.photo,
              }}
              className="w-full h-full rounded-full"
            />
          </View>

          <View className="flex flex-col top-20 justify-center items-center">
            <View className="mt-10 flex gap-8">
              <TouchableOpacity
                className="flex flex-row justify-between items-center w-full  px-5 py-2"
                onPress={goToEditInformation}
              >
                <View className="flex flex-row gap-2 items-center">
                  <Ionicons name="person-outline" size={22} color={"#6b7280"} />
                  <Text
                    className="text-gray-500"
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 18,
                    }}
                  >
                    Editar perfil
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color={"#6b7280"} />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex flex-row justify-between items-center w-full  px-5 py-2"
                onPress={goToChangePassword}
              >
                <View className="flex flex-row gap-2 items-center">
                  <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color={"#6b7280"}
                  />
                  <Text
                    className="text-gray-500"
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 18,
                    }}
                  >
                    Cambiar contraseña
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color={"#6b7280"} />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex flex-row justify-between items-center w-full  px-5 py-2"
                onPress={goToAddressForm}
              >
                <View className="flex flex-row gap-2 items-center">
                  <Ionicons
                    name="location-outline"
                    size={22}
                    color={"#6b7280"}
                  />
                  <Text
                    className="text-gray-500"
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 18,
                    }}
                  >
                    Dirección de entrega
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color={"#6b7280"} />
              </TouchableOpacity>

              <TouchableOpacity className="flex flex-row justify-between items-center w-full  px-5 py-2">
                <View className="flex flex-row gap-2 items-center">
                  <Ionicons
                    name="help-circle-outline"
                    size={22}
                    color={"#6b7280"}
                  />
                  <Text
                    className="text-gray-500"
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 18,
                    }}
                  >
                    Términos y condiciones
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color={"#6b7280"} />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex flex-row justify-between items-center w-full  px-5 py-2"
                onPressIn={closeSession}
              >
                <View className="flex flex-row gap-2 items-center">
                  <Ionicons name="exit-outline" size={22} color={"#6b7280"} />
                  <Text
                    className="text-gray-500"
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 18,
                    }}
                  >
                    Cerrar sesión
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color={"#6b7280"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <LoginRequired />
      )}
    </View>
  );
};

export default Profile;
