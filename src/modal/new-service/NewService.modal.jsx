import { Feather, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pickerUtils, storageUtils } from "../../utils/index.utils";
import { useDispatch } from "react-redux";
import { serviceAPI } from "../../api/index.api";
import { setServices } from "store/slices/data.slice";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

const NewService = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState(null);
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    estimatedPrice: "",
  });

  const getServices = () => {
    serviceAPI.getServices().then((res) => {
      const { services: servicesDB } = res.data;
      dispatch(setServices(servicesDB));
    });
  };

  const resetData = () => {
    setImageUri(null);
    setServiceData({
      name: "",
      description: "",
      estimatedPrice: "",
    });
  };

  const handleChange = (name, value) => {
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      setImageUri(uri);
    }
  };

  const createFormData = (data, imageUri) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: `service_${data.name.replace(/\s/g, "")}.jpg`,
    });

    return formData;
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");

    if (Object.values(serviceData).includes("")) {
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

    if (!imageUri) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar una imagen",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    const data = createFormData(serviceData, imageUri);

    serviceAPI
      .registerService(token, data)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Servicio creado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getServices();
        resetData();

        setTimeout(() => {
          onClose();
        }, 2500);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          const msg = err.response.data.message;
          Toast.show({
            type: "error",
            text1: "Error",
            text2: msg,
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
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      style={{
        margin: 0,
      }}
    >
      <SafeAreaView className="flex-1 bg-[#F5F9FF] flex flex-col">
        <View className="flex-1 bg-[#F5F9FF] flex flex-col">
          {/* Header */}
          <View className="flex flex-row px-7 h-[60px] items-center justify-between bg-[#0A192F]">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              Nuevo Servicio
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Octicons name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 20,
              paddingBottom: 40,
              paddingHorizontal: 20,
            }}
          >
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Nombre
              </Text>

              <TextInput
                value={serviceData.name}
                onChangeText={(value) => handleChange("name", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Descripcion */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Descripción
              </Text>

              <TextInput
                value={serviceData.description}
                multiline
                onChangeText={(value) => handleChange("description", value)}
                className="h-[120px] bg-white border border-gray-200 rounded-lg px-3"
                textAlignVertical="top"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Precio estimado
              </Text>

              <TextInput
                value={serviceData.estimatedPrice}
                keyboardType="numeric"
                onChangeText={(value) => handleChange("estimatedPrice", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Imagen
              </Text>

              <View className="w-full h-fit px-3 py-5 bg-green-100 border border-gray-200 rounded-lg">
                <Text
                  className="text-green-800"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    textAlign: "justify",
                  }}
                >
                  Nota: La imagen debe representar visualmente el servicio que
                  estás registrando. Se recomienda que tenga una proporción
                  rectangular (ancho mayor que alto) y esté en formato JPG o
                  PNG, para asegurar una presentación clara y consistente dentro
                  de la aplicación.
                </Text>
              </View>

              <TouchableOpacity
                className="w-full mt-3 h-[250px] rounded-xl flex flex-col bg-white items-center justify-center gap-2 border border-gray-200 overflow-hidden"
                onPressIn={pickImage}
              >
                {!imageUri ? (
                  <>
                    <Feather name="camera" size={40} color={"#e5e7eb"} />
                    <Text
                      className="text-gray-400"
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 20,
                      }}
                    >
                      Seleccionar imagen
                    </Text>
                  </>
                ) : (
                  <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full object-contain"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="w-full py-3 flex flex-row items-center justify-center gap-2 bg-[#0A192F] disabled:bg-gray-300 disabled:cursor-not-allowed"
              onPress={handleSubmit}
            >
              <Feather name="save" size={24} color="white" />
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 15,
                  color: "white",
                }}
              >
                Guardar
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <Toast position="top" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NewService;
