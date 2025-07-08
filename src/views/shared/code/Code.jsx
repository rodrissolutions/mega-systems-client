import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import logo from "assets/logo.png";
import { useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { codeAPI } from "api/index.api";
import { Countdown } from "components/index.components";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";

const Code = ({ route }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const [creationTime, setCreationTime] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;

    setCode(newCode);

    if (text.length === 1 && index < 3) {
      const refs = [input2Ref, input3Ref, input4Ref];
      refs[index]?.current?.focus();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const codeString = code.join("");
    codeAPI
      .validateAccountCode(email, type, codeString)
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
        }
        setCode(["", "", "", ""]);
        const refs = [input1Ref, input2Ref, input3Ref, input4Ref];
        refs[0]?.current?.focus();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resendCode = () => {
    codeAPI.resendCode(email, type).then((res) => {
      const { codeData } = res.data;
      setCreationTime(codeData.createdAt);
      setExpirationTime(codeData.expirationTime);

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

      setTimeout(() => {
        navigation.replace("Login");
      }, 2500);
    });
  };

  useEffect(() => {
    if (email.length > 0 && type.length > 0) {
      codeAPI
        .getCode(email, type)
        .then((res) => {
          const { codeData } = res.data;
          setCreationTime(codeData.createdAt);
          setExpirationTime(codeData.expirationTime);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [email, type]);

  useEffect(() => {
    if (route.params) {
      const { email, type } = route.params;
      setEmail(email);
      setType(type);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 flex flex-col   items-center bg-[#F5F9FF] py-20">
            <View className="w-[85%] mx-auto flex-1 flex flex-col gap-2 ">
              <View className="flex flex-row items-center gap-2">
                <Image
                  source={logo}
                  className="w-[100px] h-[100px] scale-x-[-1]"
                />
                <View className="flex flex-col gap-1">
                  <Text
                    className="text-[#eb1c33]"
                    style={{
                      fontFamily: "Orbitron_800ExtraBold",
                      fontSize: 30,
                    }}
                  >
                    Mega Systems
                  </Text>

                  <Text
                    className="text-gray-400"
                    style={{
                      fontFamily: "Inter_700Bold",
                      fontSize: 15,
                    }}
                  >
                    Servicio y Tecnología a tu alcance
                  </Text>
                </View>
              </View>

              <View className="mt-10 flex flex-col gap-2">
                <Text
                  className="text-wrap text-center text-gray-500"
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 20,
                  }}
                >
                  Hemos enviado un código de verificación al correo electrónico
                  registrado
                </Text>
              </View>

              {/* Cajas */}
              <View className="flex flex-row justify-between w-full gap-3 mt-10">
                {[input1Ref, input2Ref, input3Ref, input4Ref].map(
                  (ref, index) => (
                    <TextInput
                      key={index}
                      keyboardType="numeric"
                      maxLength={1}
                      value={code[index]}
                      onChangeText={(text) => handleChange(text, index)}
                      ref={ref}
                      className="flex-1 h-[100px] rounded-lg px-3 bg-white shadow-md border border-gray-300 text-center"
                      style={{
                        fontFamily: "Orbitron_800ExtraBold",
                        fontSize: 40,
                        color: "#505050",
                      }}
                    />
                  )
                )}
              </View>

              <TouchableOpacity
                className="mt-5 py-4 rounded-full flex flex-row gap-3 items-center justify-center bg-[#0A192F] disabled:bg-gray-400 mb-10"
                disabled={code.some((c) => c === "")}
                onPress={handleSubmit}
              >
                {loading && <ActivityIndicator size={"small"} color="white" />}
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  {loading ? "Validando..." : "Validar"}
                </Text>
              </TouchableOpacity>
            </View>

            <Countdown
              createdAt={creationTime}
              expirationTime={expirationTime}
              resendCode={resendCode}
            />
          </View>
        </ScrollView>
      </TouchableNativeFeedback>
      <Toast position="top" />
    </KeyboardAvoidingView>
  );
};

export default Code;
