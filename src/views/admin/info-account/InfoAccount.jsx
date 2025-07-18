import { useEffect, useState } from "react";
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
import { Input } from "../../../components/index.components";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { pickerUtils } from "../../../utils/index.utils";
import { userAPI } from "../../../api/index.api";
import { setUser } from "../../../redux/slices/data.slice";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";

const InfoAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [newImage, setNewImage] = useState(false);
  const { user } = useSelector((state) => state.data);

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      setNewImage(true);
      setImageUri(uri);
    }
  };

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value.trimEnd() });
  };

  const handleSubmit = () => {
    const { id, Role, ...rest } = data;

    const formData = new FormData();

    if (newImage) {
      formData.append("profilePicture", {
        uri: imageUri,
        type: "image/jpeg",
        name: `profile-${user.id}`,
      });

      Object.keys(rest).forEach((key) => {
        formData.append(key, rest[key]);
      });

      userAPI
        .updateWithImage(formData, id)
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

          setTimeout(() => {
            navigation.goBack();
          }, 2500);
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
              text2: "Algo salió mal. Inténtalo de nuevo",
              text1Style: {
                fontSize: 16,
                fontWeight: "900",
              },
              text2Style: { fontSize: 14 },
            });
          }
        });

      return;
    }

    userAPI
      .updateWithoutImage(rest, id)
      .then((res) => {
        const { message, user: userDB } = res.data;
        dispatch(setUser(userDB));
        Toast.show({
          type: "success",
          text1: "Perfil actualizado",
          text2: message,
          text1Style: { fontSize: 16, fontWeight: "900" },
          text2Style: { fontSize: 14 },
        });

        setTimeout(() => {
          navigation.goBack();
        }, 2500);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: err.response.data.message,
            text1Style: { fontSize: 16, fontWeight: "900" },
            text2Style: { fontSize: 14 },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Algo salió mal. Inténtalo de nuevo",
            text1Style: { fontSize: 16, fontWeight: "900" },
            text2Style: { fontSize: 14 },
          });
        }
      });
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
          className="flex-1 bg-[#F5F9FF] flex flex-col"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center bg-[#F5F9FF] flex flex-col gap-2 pt-5">
            <View className="w-[85%] mx-auto flex flex-col gap-2 flex-1">
              <View className="flex flex-col gap-3 mt-10">
                <TouchableOpacity
                  className="relative w-32 h-32 rounded-full border border-[#0A192F] mx-auto flex justify-center items-center bg-white mb-5 "
                  onPress={pickImage}
                >
                  <Image
                    source={imageUri ? { uri: imageUri } : { uri: data.photo }}
                    className="w-full h-full rounded-full"
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <Input
                  holder={"Nombres completos"}
                  value={data?.fullName}
                  onChange={(text) => handleChange("fullName", text)}
                  Icon={() => (
                    <Octicons name="person-fill" size={20} color={"#545454"} />
                  )}
                />

                {/* DNI */}
                <Input
                  holder="Cédula"
                  value={data?.dni}
                  onChange={(text) => handleChange("dni", text)}
                  keyboard="numeric"
                  Icon={() => (
                    <FontAwesome name="id-card" size={20} color={"#545454"} />
                  )}
                  onlyRead={true}
                />

                <Input
                  holder="Teléfono"
                  value={data?.phone}
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

                <Input
                  holder="Correo electrónico"
                  value={data?.email}
                  onChange={(text) => handleChange("email", text)}
                  keyboard="email-address"
                  Icon={() => (
                    <Entypo name="mail" size={20} color={"#545454"} />
                  )}
                  onlyRead={true}
                />

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

export default InfoAccount;
