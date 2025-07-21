import { Feather, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { codeAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "store/slices/data.slice";

const ChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [sendCode, setSendCode] = useState(false);

  const handleEmail = (value) => setEmail(value);
  const handleCode = (value) => setCode(value);
  const handlePassword = (value) => setPassword(value);

  const resetData = () => {
    setEmail("");
    setCode("");
    setPassword("");

    dispatch(logout());
    navigation.navigate("Login");
  };

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

        setSendCode(true);
      })
      .catch((err) => {
        setSendCode(false);
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

        resetData();
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
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
    >
      <View className="flex-1 flex flex-col bg-[#F5F9FF] px-10 py-5">
        {/* Mensaje */}
        <View className="w-full h-[100px] bg-red-100 rounded-xl px-5 flex flex-row justify-center items-center border border-red-100">
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: "#6b7280",
              textAlign: "center",
            }}
          >
            Por cuestiones de seguridad necesitamos verificar tu identidad.
            Enviaremos un código de verificación a tu correo.
          </Text>
        </View>

        {/* Formulario de correo */}
        <View className="mt-3 flex flex-col gap-3">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
            }}
          >
            Correo electrónico
          </Text>

          <TextInput
            readOnly={sendCode}
            value={email}
            autoCapitalize="none"
            onChangeText={(value) => handleEmail(value)}
            className={`w-full h-[50px]  rounded-xl px-5 flex flex-row justify-center items-center border border-gray-200 ${
              sendCode ? "bg-gray-100" : "bg-white"
            }`}
            placeholderTextColor={"#6b7280"}
          />

          <TouchableOpacity
            className="mt-2 py-4 rounded-lg flex flex-row justify-center items-center bg-[#1786f9] gap-2 disabled:opacity-50"
            onPress={getRecoveryPasswordCode}
          >
            <Feather name="send" color={"white"} size={20} />
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 16,
                color: "white",
              }}
            >
              Enviar código
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulario de contraseña */}
        {sendCode && (
          <View className="flex flex-col gap-3 mt-10">
            {/* Código */}
            <View className="flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 16,
                }}
              >
                Código
              </Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={(value) => handleCode(value)}
                value={code}
                className="w-full h-[50px] bg-white rounded-xl px-5 flex flex-row justify-center items-center border border-gray-200"
              />
            </View>

            {/* Contraseña */}
            <View className="flex flex-col gap-2">
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 16,
                }}
              >
                Contraseña
              </Text>
              <TextInput
                autoCapitalize="none"
                onChangeText={(value) => handlePassword(value)}
                value={password}
                className="w-full h-[50px] bg-white rounded-xl px-5 flex flex-row justify-center items-center border border-gray-200"
              />
            </View>

            <TouchableOpacity
              className="mt-2 py-4 rounded-lg flex flex-row justify-center items-center bg-[#1786f9]"
              onPress={changePassword}
            >
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 16,
                  color: "white",
                }}
              >
                Guardar contraseña
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Toast position="top" />
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
