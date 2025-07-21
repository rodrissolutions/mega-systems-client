import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { pickerUtils, storageUtils } from "../../../utils/index.utils";
import { categoryAPI, serviceAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import { setServices } from "store/slices/data.slice";

const EditService = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [newImage, setNewImage] = useState(false);
  const [serviceData, setserviceData] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const { service } = useSelector((state) => state.data);

  const getServices = () => {
    serviceAPI.getServices().then((res) => {
      const { services: servicesDB } = res.data;
      dispatch(setServices(servicesDB));
    });
  };

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      setNewImage(true);
      setImageUri(uri);
    }
  };

  const deleteService = async () => {
    const token = await storageUtils.getItem("token");

    serviceAPI
      .deleteService(token, service.id)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Servicio eliminado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getServices();
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
            text2: err.message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const handleChange = (name, value) => {
    setserviceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");
    const { id, ...rest } = serviceData;

    try {
      if (newImage) {
        const formData = new FormData();
        Object.keys(rest).forEach((key) => {
          formData.append(key, rest[key]);
        });

        formData.append("image", {
          uri: imageUri,
          type: "image/jpeg",
          name: `service_${rest.name.replace(/\s/g, "")}.jpg`,
        });

        await serviceAPI.updateServiceWithImage(token, id, formData);
      } else {
        await serviceAPI.updateServiceWithoutImage(token, id, rest);
      }

      Toast.show({
        type: "success",
        text1: "Producto actualizado",
        text2: "Los cambios fueron guardados correctamente",
        text1Style: { fontSize: 16, fontWeight: "900" },
        text2Style: { fontSize: 14 },
      });

      getServices();

      setTimeout(() => {
        navigation.goBack();
      }, 2500);
    } catch (error) {
      if (err instanceof AxiosError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.response?.data?.message || "Algo salió mal",
          text1Style: { fontSize: 16, fontWeight: "900" },
          text2Style: { fontSize: 14 },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error inesperado",
          text2: err.message,
          text1Style: { fontSize: 16, fontWeight: "900" },
          text2Style: { fontSize: 14 },
        });
      }
    }
  };

  useEffect(() => {
    if (service) {
      setserviceData(service);
      setImageUri(service.image);
    }
  }, [service]);
  return (
    <View className="flex-1 bg-[#F5F9FF] flex flex-col">
      <View className="px-5 py-4 border-b border-gray-200 bg-white flex justify-end flex-row">
        <TouchableOpacity
          className="w-fit py-3 px-5 flex flex-row items-center justify-center gap-2 bg-red-700 rounded-xl"
          onPress={deleteService}
        >
          <Feather name="trash" size={24} color="white" />
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 15,
              color: "white",
            }}
          >
            Eliminar
          </Text>
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
        {/* Nombre */}
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
            value={serviceData?.name}
            multiline
            onChangeText={(value) => handleChange("name", value)}
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
            Descripción
          </Text>

          <TextInput
            value={serviceData?.description}
            multiline
            onChangeText={(value) => handleChange("description", value)}
            className="h-[100px] bg-white border border-gray-200 rounded-lg px-3"
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
            value={serviceData?.estimatedPrice?.toString()}
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
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="w-full py-3 flex flex-row items-center justify-center gap-2 bg-[#0A192F] disabled:bg-gray-300 disabled:cursor-not-allowed"
          onPressIn={handleSubmit}
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
  );
};

export default EditService;
