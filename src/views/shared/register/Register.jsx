import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import logo from "assets/logo.png";
import user from "assets/user.png";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { pickerUtils } from "utils/index.utils";
import Toast from "react-native-toast-message";
import { userAPI } from "api/index.api";
import { AxiosError } from "axios";
import { Input, Password, Submit } from "components/index.components";
import { validatorUtils } from "../../../utils/index.utils";
import ListGenders from "../../../modal/list-genders/ListGenders";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const initialState = {
    fullName: "",
    dni: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
  };

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [data, setData] = useState(initialState);
  const [imageUri, setImageUri] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) setImageUri(uri);
  };

  const goToLogin = () => {
    setData(initialState);
    setImageUri(null);
    navigation.navigate("Login");
  };

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value.trimEnd() });
  };

  const handleSubmit = () => {
    if (Object.values(data).includes("")) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Todos los campos son obligatorios",
        text1Style: { fontSize: 16, fontWeight: "900" },
        text2Style: { fontSize: 14 },
      });
    }

    if (!imageUri) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar una imagen",
        text1Style: { fontSize: 16, fontWeight: "900" },
        text2Style: { fontSize: 14 },
      });
    }

    if (!validatorUtils.isValidDNI(data.dni)) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "El DNI es inválido",
        text1Style: { fontSize: 16, fontWeight: "900" },
        text2Style: { fontSize: 14 },
      });
    }

    if (!validatorUtils.isValidPhone(data.phone)) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "El teléfono es inválido",
        text1Style: { fontSize: 16, fontWeight: "900" },
        text2Style: { fontSize: 14 },
      });
    }

    if (!validatorUtils.isValidEmail(data.email)) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "El correo es inválido",
        text1Style: { fontSize: 16, fontWeight: "900" },
        text2Style: { fontSize: 14 },
      });
    }

    setLoading(true);

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("profilePicture", {
      uri: imageUri,
      name: `profile_picture_${data.fullName.replace(/\s/g, "")}.jpg`,
      type: "image/jpeg",
    });

    userAPI
      .register(formData)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Registro exitoso",
          text2: "Verifique su correo para completar el registro",
          text1Style: { fontSize: 16, fontWeight: "900" },
          text2Style: { fontSize: 14 },
        });

        setData(initialState);
        setImageUri(null);

        setTimeout(() => {
          navigation.replace("Code", {
            email: formData.get("email"),
            type: "Verificación",
          });
        }, 2500);
      })
      .catch((err) => {
        const msg =
          err instanceof AxiosError
            ? err.response?.data?.message ||
              "Error desconocido. Intente nuevamente"
            : "Error desconocido. Intente nuevamente";

        Toast.show({
          type: "error",
          text1: "Error al registrar",
          text2: msg,
          text1Style: { fontSize: 16, fontWeight: "900" },
          text2Style: { fontSize: 14 },
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-[#F5F9FF] flex flex-col">
          <View className="flex-1 bg-[#F5F9FF]">
            <ScrollView
              contentContainerStyle={{ paddingBottom: 30 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="w-[85%] mx-auto flex flex-col gap-2 flex-1">
                {!keyboardVisible && (
                  <View className="flex flex-row items-center gap-2 mt-10">
                    <Image
                      source={logo}
                      className="w-[100px] h-[100px] scale-x-[-1]"
                      resizeMode="contain"
                    />
                    <View className="flex-col gap-1">
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
                )}

                <View className="flex flex-col gap-3 mt-10">
                  <TouchableOpacity
                    className="relative w-32 h-32 rounded-full border-2 border-gray-[#0A192F] mx-auto flex justify-center items-center bg-white mb-5"
                    onPress={pickImage}
                  >
                    <Image
                      source={imageUri ? { uri: imageUri } : user}
                      className="w-full h-full rounded-full"
                      resizeMode="cover"
                    />
                    <View className="absolute bottom-1 -right-1 rounded-full bg-[#0A192F] w-10 h-10 flex items-center justify-center">
                      <Ionicons name="camera" size={24} color={"white"} />
                    </View>
                  </TouchableOpacity>

                  <View className="flex flex-col gap-2">
                    <Text
                      className=""
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                        color: "#202244",
                      }}
                    >
                      Nombres
                    </Text>
                    <Input
                      holder="Nombres completos"
                      value={data.fullName}
                      onChange={(text) => handleChange("fullName", text)}
                      Icon={() => (
                        <Octicons
                          name="person-fill"
                          size={20}
                          color={"#545454"}
                        />
                      )}
                    />
                  </View>

                  <View className="flex flex-col gap-2">
                    <Text
                      className=""
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                        color: "#202244",
                      }}
                    >
                      Cédula
                    </Text>

                    <Input
                      holder="Cédula"
                      value={data.dni}
                      onChange={(text) => handleChange("dni", text)}
                      keyboard="numeric"
                      Icon={() => (
                        <FontAwesome
                          name="id-card"
                          size={20}
                          color={"#545454"}
                        />
                      )}
                    />
                  </View>

                  <View className="flex flex-col gap-2">
                    <Text
                      className=""
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                        color: "#202244",
                      }}
                    >
                      Teléfono
                    </Text>

                    <Input
                      holder="Teléfono"
                      value={data.phone}
                      onChange={(text) => handleChange("phone", text)}
                      keyboard="numeric"
                      Icon={() => (
                        <MaterialCommunityIcons
                          name="card-account-phone"
                          size={20}
                          color={"#545454"}
                        />
                      )}
                    />
                  </View>

                  <View className="flex flex-col gap-2">
                    <Text
                      className=""
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                        color: "#202244",
                      }}
                    >
                      Correo electrónico
                    </Text>

                    <Input
                      holder="Correo electrónico"
                      value={data.email}
                      onChange={(text) => handleChange("email", text)}
                      keyboard="email-address"
                      Icon={() => (
                        <Entypo name="mail" size={20} color={"#545454"} />
                      )}
                    />
                  </View>

                  <View className="flex flex-col gap-2">
                    <Text
                      className=""
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                        color: "#202244",
                      }}
                    >
                      Género
                    </Text>

                    <TouchableOpacity
                      className="px-3"
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        backgroundColor: "white",
                        height: 50,
                        justifyContent: "center",
                      }}
                      onPress={toggle}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        {data?.gender || "Seleccionar"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex flex-col gap-2">
                    <Text
                      className=""
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                        color: "#202244",
                      }}
                    >
                      Contraseña
                    </Text>

                    <Password
                      value={data.password}
                      handleChange={(text) => handleChange("password", text)}
                      isPasswordVisible={isPasswordVisible}
                      setIsPasswordVisible={setIsPasswordVisible}
                      Icon={() => (
                        <FontAwesome name="lock" size={20} color={"#545454"} />
                      )}
                    />
                  </View>

                  <Submit
                    loading={loading}
                    handleSubmit={handleSubmit}
                    text={"Registrar"}
                  />

                  <View className="flex flex-row items-center justify-center gap-2 mt-5">
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 15,
                        color: "#545454",
                      }}
                    >
                      ¿Ya tienes una cuenta?
                    </Text>
                    <TouchableOpacity onPress={goToLogin}>
                      <Text
                        className="underline"
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 15,
                          color: "#0A192F",
                        }}
                      >
                        Inicia sesión
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <Toast position="top" />
      <ListGenders
        visible={show}
        onClose={toggle}
        handleChange={handleChange}
      />
    </KeyboardAvoidingView>
  );
};

export default Register;
