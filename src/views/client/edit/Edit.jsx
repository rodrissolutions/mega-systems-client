import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
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
import { useDispatch, useSelector } from "react-redux";
import { Input, Password, Submit } from "../../../components/index.components";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { pickerUtils } from "../../../utils/index.utils";
import { userAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import { setUser } from "store/slices/data.slice";
import storageUtil from "../../../utils/storage/storage.util";

const Edit = () => {
  const { user } = useSelector((state) => state.data);
  const [data, setData] = useState(user);
  const [infoData, setInfoData] = useState({});
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      setImageUri(uri);
    }
  };
  const handleChange = (name, value) => {
    setInfoData({ ...infoData, [name]: value.trimEnd() });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (imageUri) {
      formData.append("profilePicture", {
        uri: imageUri,
        type: "image/jpeg",
        name: `profile-${user.id}`,
      });
      // Usa `data` en lugar de `user` para que coja los datos actualizados
      Object.keys(infoData).forEach((key) => {
        formData.append(key, infoData[key]);
      });
      userAPI
        .updateWithImage(formData, user.id)
        .then((res) => {
          const { message, user: userDB } = res.data;
          dispatch(setUser(userDB));
          Toast.show({
            type: "success",
            text1: "Perfil actualizado",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        })
        .catch((err) => {
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
              text2: err.message,
              text1Style: {
                fontSize: 16,
                fontWeight: "900",
              },
              text2Style: { fontSize: 14 },
            });
          }
        })
        .finally(() => {
          setInfoData({});
          setImageUri(null);
        });

      return;
    }
    if (Object.values(infoData).includes("")) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Todos los campos son obligatorios",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    userAPI
      .updateWithoutImage(infoData, user.id)
      .then((res) => {
        const { message, user: userDB } = res.data;
        dispatch(setUser(userDB));
        Toast.show({
          type: "success",
          text1: "Perfil actualizado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
      })
      .catch((err) => {
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
            text2: err.message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      })
      .finally(() => setInfoData({}));
  };

  useEffect(() => {
    setData(user);
  }, [user]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center bg-[#F5F9FF] flex-col gap-2 pt-5">
            <View className="w-[85%] mx-auto flex flex-col gap-2 flex-1 ">
              {/* Formulario */}
              <View className="flex flex-col gap-3 mt-10">
                {/* Foto de perfil */}
                <TouchableOpacity
                  className="relative w-32 h-32 rounded-full border-2 border-gray-200 mx-auto flex justify-center items-center bg-white mb-5"
                  onPress={pickImage}
                >
                  <Image
                    source={
                      imageUri
                        ? { uri: imageUri }
                        : {
                            uri: data.photo,
                          }
                    }
                    className="w-full h-full rounded-full"
                    resizeMode="cover"
                  />

                  <View className="absolute bottom-1 -right-1 rounded-full bg-[#0A192F] w-10 h-10 flex items-center justify-center">
                    <Ionicons name="camera" size={24} color={"white"} />
                  </View>
                </TouchableOpacity>

                {/* Nombres completos */}

                <Input
                  holder={"Nombres completos"}
                  value={data.fullName}
                  onChange={(text) => handleChange("fullName", text)}
                  Icon={() => (
                    <Octicons name="person-fill" size={20} color={"#545454"} />
                  )}
                />

                {/* DNI */}
                <Input
                  holder="Cédula"
                  value={data.dni}
                  onChange={(text) => handleChange("dni", text)}
                  keyboard="numeric"
                  Icon={() => (
                    <FontAwesome name="id-card" size={20} color={"#545454"} />
                  )}
                  onlyRead={true}
                />

                {/* Teléfono */}
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

                {/* Teléfono */}
                <Input
                  holder="Correo electrónico"
                  value={data.email}
                  onChange={(text) => handleChange("email", text)}
                  keyboard="email-address"
                  Icon={() => (
                    <Entypo name="mail" size={20} color={"#545454"} />
                  )}
                  onlyRead={true}
                />

                {/* Botón */}
                <TouchableOpacity
                  className="w-full mt-5 py-3 flex flex-row items-center justify-center bg-[#0A192F] rounded-full"
                  onPress={handleSubmit}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    Guardar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast position="bottom" />
    </KeyboardAvoidingView>
  );
};

export default Edit;
