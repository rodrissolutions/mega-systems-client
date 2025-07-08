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
import { validatorUtils } from "../../../utils/index.utils";
import { codeAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
const Resend = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [emailFound, setEmailFound] = useState(false);

  const handleChange = (value) => {
    setEmail(value);
  };

  const handleCode = (value) => {
    setCode(value);
  };

  const sendCode = () => {
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

    if (!validatorUtils.isValidEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "El correo es inválido",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    codeAPI
      .generateNewVerificationAccountCode(email)
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Código enviado",
          text2: "Revisa tu correo",
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
          Toast.show({
            type: "error",
            text1: "Error",
            text2: err.response.data.message,
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
            text2: "Error al enviar el código",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const validateCode = () => {
    if (!code) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes ingresar un código",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    codeAPI
      .validateAccountCode(email, "Verificación", code)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Verificación exitosa",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        setTimeout(() => {
          navigation.replace("Login");
        }, 2500);
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
            text2: "Error al verificar el código",
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
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#F5F9FF",
        paddingBottom: 40,
      }}
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
            Enviaremos un código de activación al correo asociado registrado
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
            readOnly={emailFound}
            onChangeText={(value) => handleChange(value)}
            className="bg-white h-[50px] mt-1 rounded-lg border border-gray-200 px-3"
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
            }}
          />

          <TouchableOpacity
            className="w-full h-[50px] flex flex-row justify-center items-center bg-[#4F46E5] rounded-lg mt-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={emailFound}
            onPress={sendCode}
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
              Código de activación
            </Text>

            <TextInput
              onChangeText={(value) => handleCode(value)}
              readOnly={!emailFound}
              className={`${
                emailFound ? "bg-white" : "bg-gray-100"
              }  h-[50px]  rounded-lg border border-gray-200 px-3`}
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={validateCode}
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
              Verificar código
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast position="top" />
    </ScrollView>
  );
};

export default Resend;
