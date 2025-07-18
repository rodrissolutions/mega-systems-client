import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import logo from "assets/logo.png";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { storageUtils, pickerUtils } from "utils/index.utils";
import { companyAPI } from "api/index.api";
import { AxiosError } from "axios";
import * as Location from "expo-location";
import { setCompany } from "../../../redux/slices/data.slice";

const InfoCompany = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [newImage, setNewImage] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    ruc: "",
    web: "",
    address: "",
    province: "",
    city: "",
  });
  const { company, user } = useSelector((state) => state.data);

  const getCompanyInfo = async () => {
    companyAPI.getDataCompany().then((res) => {
      const { company: companyDB } = res.data;
      dispatch(setCompany(companyDB));
    });
  };

  const resetData = () => {
    setImageUri(null);
    setNewImage(false);
  };

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      setImageUri(uri);
      if (companyData.id) {
        setNewImage(true);
      } else {
        setNewImage(false);
      }
    }
  };

  const handleChange = (name, value) => {
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const getUbication = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permiso denegado");
      return;
    }

    const ubication = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const reverseGeoCode = await Location.reverseGeocodeAsync({
      latitude: ubication.coords.latitude,
      longitude: ubication.coords.longitude,
    });

    const currentUbicationData = reverseGeoCode[0];
    setCompanyData((prev) => ({
      ...prev,
      province: currentUbicationData.region,
      city: currentUbicationData.city,
    }));
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");

    const { web, id, ...rest } = companyData;

    if (Object.values(rest).some((value) => value === "")) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Todos los campos son obligatorios",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: {
          fontSize: 14,
        },
      });
      return;
    }

    const formData = new FormData();
    if (id) {
      // SI existe el id significa que el usuario esta actualizando la información
      if (newImage) {
        // SI newIMage es verdadero significa que el usuario tambien esta actualizando la imagen
        formData.append("logo", {
          uri: imageUri,
          type: "image/jpeg",
          name: `company_${companyData.name.replace(/\s/g, "")}.jpg`,
        });

        Object.keys(rest).forEach((key) => {
          formData.append(key, rest[key]);
        });
        formData.append("web", web);
        formData.append("AdminId", user.id);

        companyAPI
          .updateWithImage(token, formData, id)
          .then((res) => {
            const { message } = res.data;
            Toast.show({
              type: "success",
              text1: "Información actualizada",
              text2: message,
              text1Style: {
                fontSize: 16,
                fontWeight: "900",
              },
              text2Style: {
                fontSize: 14,
              },
            });
            // Obtener informacion actualizada y resetear el estado
            getCompanyInfo();
            resetData();
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
                text2Style: {
                  fontSize: 14,
                },
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Ha ocurrido un error",
                text1Style: {
                  fontSize: 16,
                  fontWeight: "900",
                },
                text2Style: {
                  fontSize: 14,
                },
              });
            }
          });
      } else {
        companyAPI
          .updateWithoutImage(
            token,
            {
              ...rest,
              web,
            },
            id
          )
          .then((res) => {
            const { message } = res.data;
            Toast.show({
              type: "success",
              text1: "Información actualizada",
              text2: message,
              text1Style: {
                fontSize: 16,
                fontWeight: "900",
              },
              text2Style: {
                fontSize: 14,
              },
            });
            // Obtener informacion actualizada y resetear el estado
            getCompanyInfo();
            resetData();
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
                text2Style: {
                  fontSize: 14,
                },
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Ha ocurrido un error",
                text1Style: {
                  fontSize: 16,
                  fontWeight: "900",
                },
                text2Style: {
                  fontSize: 14,
                },
              });
            }
          });
      }

      return;
    }

    // SI no existe el id significa que el usuario esta creando una nueva empresa
    if (!imageUri) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar un logo",
        text1Style: { fontSize: 16, fontWeight: "900" },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    formData.append("logo", {
      uri: imageUri,
      type: "image/jpeg",
      name: `company_${companyData.name.replace(/\s/g, "")}.jpg`,
    });

    Object.keys(rest).forEach((key) => {
      formData.append(key, rest[key]);
    });
    formData.append("web", web);
    formData.append("AdminId", user.id);

    companyAPI
      .createCompany(token, formData)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Información actualizada",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: {
            fontSize: 14,
          },
        });
        // Obtener informacion actualizada y resetear el estado
        getCompanyInfo();
        resetData();
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
            text2: "Ha ocurrido un error",
            text1Style: { fontSize: 16, fontWeight: "900" },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  useEffect(() => {
    if (company) {
      setCompanyData(company);
    }
  }, [company]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#F5F9FF]"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 40,
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col ">
            {/* Imagen */}
            <TouchableOpacity
              className="relative w-full h-[200px] rounded-xl border-2 border-gray-200 mx-auto flex justify-center items-center bg-white mb-5"
              onPress={pickImage}
            >
              <Image
                className="w-full h-full self-center absolute object-cover rounded-xl"
                resizeMode="cover"
                source={
                  companyData.logo
                    ? { uri: companyData.logo }
                    : imageUri
                    ? { uri: imageUri }
                    : logo
                }
              />

              <View className="absolute bottom-1 -right-1 rounded-full bg-[#0A192F] w-10 h-10 flex items-center justify-center">
                <Ionicons name="camera" size={24} color={"white"} />
              </View>
            </TouchableOpacity>

            {/* Nombre de la empresa */}
            <TextInput
              value={companyData?.name}
              onChangeText={(value) => handleChange("name", value)}
              placeholder="Nombre de la empresa"
              className="bg-white border border-gray-200 rounded-xl h-[50px] px-3 mb-5"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            />

            {/* Eslogan de la empresa */}
            <TextInput
              value={companyData?.description}
              onChangeText={(value) => handleChange("description", value)}
              placeholder="Eslogan de la empresa"
              textAlignVertical="top"
              className="bg-white border border-gray-200 rounded-xl h-[80px] px-3 py-2 mb-5"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            />

            {/* Nombre de la empresa */}
            <TextInput
              value={companyData?.email}
              onChangeText={(value) => handleChange("email", value)}
              placeholder="Email de la empresa"
              className="bg-white border border-gray-200 rounded-xl h-[50px] px-3 mb-5"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            />
            {/* Telefono de la empresa */}
            <TextInput
              value={companyData?.phone}
              onChangeText={(value) => handleChange("phone", value)}
              placeholder="Teléfono de la empresa"
              keyboardType="phone-pad"
              className="bg-white border border-gray-200 rounded-xl h-[50px] px-3 mb-5"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            />

            {/* ruc de la empresa */}
            <TextInput
              value={companyData?.ruc}
              onChangeText={(value) => handleChange("ruc", value)}
              placeholder="Ruc de la empresa"
              keyboardType="numeric"
              className="bg-white border border-gray-200 rounded-xl h-[50px] px-3 mb-5"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            />

            {/* Direccion de la empresa */}
            <View className="flex flex-col mb-5">
              <TouchableOpacity
                className="flex flex-row items-center justify-center py-3 bg-[#1458b9] rounded-lg gap-2"
                onPress={getUbication}
              >
                <FontAwesome6 name="location-dot" color="white" size={16} />
                <Text
                  className="text-white"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                  }}
                >
                  Obtener ubicación
                </Text>
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-1 mt-5">
                <View className="flex flex-col gap-2 w-[50%]">
                  <Text
                    className="text-gray-500"
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                    }}
                  >
                    Provincia
                  </Text>

                  <TextInput
                    className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3 "
                    readOnly
                    value={companyData?.province}
                  />
                </View>
                <View className="flex flex-col gap-2 w-[50%]">
                  <Text
                    className="text-gray-500"
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                    }}
                  >
                    Ciudad
                  </Text>

                  <TextInput
                    className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3"
                    readOnly
                    value={companyData?.city}
                  />
                </View>
              </View>
            </View>

            {/* ruc de la empresa */}
            <TextInput
              value={companyData?.address}
              onChangeText={(value) => handleChange("address", value)}
              placeholder="Dirección de la empresa"
              className="bg-white border border-gray-200 rounded-xl h-[50px] px-3 mb-5"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            />

            {/* ruc de la empresa */}
            <TextInput
              value={companyData?.web}
              onChangeText={(value) => handleChange("web", value)}
              placeholder="Web de la empresa (opcional)"
              className="bg-white border border-gray-200 rounded-xl h-[50px] px-3 mb-5"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            />

            <View className="flex flex-col gap-2 w-full mb-5">
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                }}
              >
                Administrador
              </Text>

              <TextInput
                className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3 "
                readOnly
                value={user?.fullName + " (Tú)"}
              />
            </View>
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
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast position="top" />
    </KeyboardAvoidingView>
  );
};

export default InfoCompany;
