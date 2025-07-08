import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import recovery from "assets/animations/recovery.json";
import { Text, TouchableOpacity, View } from "react-native";
const LoginRequired = () => {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <View className="flex-1 flex-col justify-center items-center bg-[#F5F9FF]">
      <LottieView
        autoPlay
        loop
        source={recovery}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          flexWrap: "wrap",
        }}
      >
        Ingresa a tu cuenta o registrate
      </Text>
      <View className="flex flex-row gap-3 mt-5 px-5 w-[90%] mx-auto">
        <TouchableOpacity
          className="bg-[#1458B9] w-[50%] py-3 flex justify-center items-center"
          onPress={goToLogin}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 15,
              color: "white",
            }}
          >
            Ingresar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white w-[50%] py-3 justify-center items-center border border-[#1458B9]"
          onPress={goToRegister}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 15,
            }}
          >
            Crea tu cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginRequired;
