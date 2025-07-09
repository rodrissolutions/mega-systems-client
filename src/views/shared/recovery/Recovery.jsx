import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import recovery from "assets/animations/recovery.json";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { codeAPI } from "../../../api/index.api";
import { useNavigation } from "@react-navigation/native";

const Recovery = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [emailFound, setEmailFound] = useState(false);

  const handledEmail = (value) => setEmail(value);
  const handledCode = (value) => setCode(value);
  const handledPassword = (value) => setPassword(value);

  const getRecoveryPasswordCode = () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes ingresar un correo",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    codeAPI
      .getRecoveryPasswordCode(email)
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Correo enviado",
          text2: "Revisa tu bandeja de entrada",
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        setEmailFound(true);
      })
      .catch((err) => {
        setEmailFound(false);
        if (err instanceof AxiosError) {
          const { message } = err.response.data;
          Toast.show({
            type: "error",
            text1: "Error",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Ocurrió un error",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const changePassword = () => {
    if (!code || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes ingresar el código y la contraseña",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    codeAPI
      .validatePasswordRecoveryCode(code, email, password)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Verificación exitosa",
          text2: "Contraseña cambiada exitosamente",
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        navigation.navigate("Login");
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          const { message } = err.response.data;
          Toast.show({
            type: "error",
            text1: "Error",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Ocurrió un error",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };
  return (
    <ScrollView
      className="flex-1 bg-[#F5F9FF]"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
    >
      <View className="flex-1 bg-[#F5F9FF] flex flex-col pt-14 px-5 items-center">
        {/* Animacion */}
        <LottieView
          autoPlay
          loop
          source={recovery}
          style={{
            width: 200,
            height: 200,
          }}
        />

        <View className="px-3 py-5 w-full h-fit bg-green-100 mt-3 border border-green-200 rounded-xl">
          <Text
            className="text-green-800"
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Por tu seguridad enviaremos un código al correo asociado para que
            puedas restablecer tu contraseña
          </Text>
        </View>

        {/* Ingresar correo */}
        <View className="flex flex-col gap-2 mt-3 w-full px-3">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
            }}
          >
            Ingresa tu correo
          </Text>

          <TextInput
            value={email}
            onChangeText={(value) => handledEmail(value)}
            className="bg-white h-[50px] mt-1 rounded-lg border border-gray-200 px-3"
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
            }}
          />

          <TouchableOpacity
            className="w-full h-[50px] flex flex-row justify-center items-center bg-[#4F46E5] rounded-lg mt-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
            onPress={getRecoveryPasswordCode}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Enviar código
            </Text>
          </TouchableOpacity>
        </View>

        {/* Codigo y nueva contraseña */}

        <View className="flex flex-col gap-3 mt-10 w-full px-3">
          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: emailFound ? "black" : "gray",
              }}
            >
              Código de verificación
            </Text>

            <TextInput
              readOnly={!emailFound}
              onChangeText={(value) => handledCode(value)}
              value={code}
              className={`${
                emailFound ? "bg-white" : "bg-gray-100"
              }  h-[50px]  rounded-lg border border-gray-200 px-3`}
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
              }}
            />
          </View>

          <View className="flex flex-col gap-2">
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: emailFound ? "black" : "gray",
              }}
            >
              Nueva contraseña
            </Text>

            <TextInput
              readOnly={!emailFound}
              onChangeText={(value) => handledPassword(value)}
              value={password}
              className={`h-[50px]  rounded-lg border border-gray-200 px-3 ${
                emailFound ? "bg-white" : "bg-gray-100"
              }`}
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={changePassword}
            disabled={!emailFound}
            className={`
          w-full h-[50px] flex flex-row justify-center items-center ${
            emailFound ? "bg-[#4F46E5]" : "bg-gray-400"
          } rounded-lg mt-2 `}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Restablecer contraseña
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast position="top" />
    </ScrollView>
  );
};

export default Recovery;
