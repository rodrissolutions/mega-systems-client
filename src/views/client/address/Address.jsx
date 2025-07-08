import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { LoginRequired } from "components/index.components";
import { FontAwesome6 } from "@expo/vector-icons";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import residencyAPI from "../../../api/residency/residency.api";
import { setResidency } from "../../../redux/slices/data.slice";

const Address = () => {
  const dispatch = useDispatch();
  const { user, residency } = useSelector((state) => state.data);
  const [ubication, setUbication] = useState({
    latitude: "",
    longitude: "",
    province: "",
    city: "",
    mainStreet: "",
    secondaryStreet: "",
    reference: "",
    fullName: "",
    phone: "",
    type: "",
  });

  const typeResidence = [
    { label: "Casa", value: "Casa" },
    { label: "Trabajo", value: "Trabajo" },
  ];

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
    setUbication((prev) => ({
      ...prev,
      latitude: ubication.coords.latitude.toString(),
      longitude: ubication.coords.longitude.toString(),
      province: currentUbicationData.region,
      city: currentUbicationData.city,
    }));
  };

  const handleChange = (name, value) => {
    setUbication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getUbicationDB = () => {
    const { id } = user;
    residencyAPI.getByUser(id).then((res) => {
      const { residency: residencyDB } = res.data;
      dispatch(setResidency(residencyDB));
    });
  };

  const handleSubmit = () => {
    if (Object.values(ubication).includes("")) {
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

    if (!residency) {
      // Agregara una direccion
      const { id } = user;
      const data = {
        ...ubication,
        UserId: id,
      };

      residencyAPI
        .save(data)
        .then((res) => {
          const { message } = res.data;
          Toast.show({
            type: "success",
            text1: "Dirección agregada",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });

          getUbicationDB();
        })
        .catch((err) => {
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
        });
    } else {
      // Actualizara una direccion
      residencyAPI
        .update(ubication)
        .then((res) => {
          const { message } = res.data;
          Toast.show({
            type: "success",
            text1: "Dirección actualizada",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
          getUbicationDB();
        })
        .catch((err) => {
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
        });
    }
  };

  useEffect(() => {
    if (user) {
      setUbication((prev) => ({
        ...prev,
        fullName: user.fullName,
        phone: user.phone,
      }));
    }

    if (residency) {
      setUbication(residency);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "android" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "android" ? 100 : 0}
    >
      {user ? (
        <ScrollView
          className="flex-1 flex bg-[#F5F9FF]"
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 bg-[#F5F9FF] flex flex-col ">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
              }}
            >
              Elige donde recibir tus compras
            </Text>
            <Text
              className="mt-2 text-gray-500"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 15,
              }}
            >
              Enviaremos tu pedido a tu domicilio. Recargo adicional.
            </Text>

            {/* Formularios */}
            <View className="mt-5 flex flex-col gap-4">
              <View className="flex flex-col gap-2">
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
                <View className="flex flex-row items-center gap-1">
                  <View className="flex flex-col gap-2 w-[50%]">
                    <Text
                      className="text-gray-500"
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 16,
                      }}
                    >
                      Latitud
                    </Text>

                    <TextInput
                      className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3 "
                      readOnly
                      defaultValue={ubication?.latitude}
                      value={ubication?.latitude}
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
                      Longitud
                    </Text>

                    <TextInput
                      className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3"
                      readOnly
                      value={ubication?.longitude}
                    />
                  </View>
                </View>
              </View>
              <View className="flex flex-col gap-2">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                  }}
                >
                  Ciudad Principal/Provincia
                </Text>
                <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                  <TextInput
                    readOnly
                    className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3"
                    value={ubication?.province}
                  />
                </View>
              </View>
              <View className="flex flex-col gap-2">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                  }}
                >
                  Cantón
                </Text>

                <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                  <TextInput
                    readOnly
                    className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3"
                    value={ubication?.city}
                  />
                </View>
              </View>
              <View className="flex flex-col gap-2">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                  }}
                >
                  Nombre y apellido
                </Text>

                <TextInput
                  readOnly
                  className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3"
                  value={user?.fullName}
                />
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 11,
                  }}
                >
                  Tal cual figure en la cédula de identidad
                </Text>
              </View>

              <View className="flex flex-col gap-2">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                  }}
                >
                  Calle
                </Text>

                <TextInput
                  name="mainStreet"
                  className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3"
                  autoComplete="off"
                  autoCapitalize="none"
                  value={ubication?.mainStreet}
                  onChangeText={(text) => handleChange("mainStreet", text)}
                />

                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 11,
                  }}
                >
                  Escribe solo el nombre de la calle o avenida
                </Text>
              </View>

              <View className="flex flex-col gap-2">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                  }}
                >
                  Calle secundaria
                </Text>

                <TextInput
                  name="secondaryStreet"
                  className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3"
                  autoComplete="off"
                  autoCapitalize="none"
                  value={ubication?.secondaryStreet}
                  onChangeText={(text) => handleChange("secondaryStreet", text)}
                />
              </View>

              <View className="flex flex-col gap-2">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                  }}
                >
                  Referencias adicionales de esta dirección
                </Text>

                <TextInput
                  name="reference"
                  value={ubication?.reference}
                  onChangeText={(text) => handleChange("reference", text)}
                  className="w-full border border-gray-200 h-[150px] bg-white rounded-lg px-3"
                  textAlignVertical="top"
                  autoComplete="off"
                  autoCapitalize="none"
                  maxLength={200}
                />

                <View className="flex flex-row items-center justify-end px-2">
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                    }}
                  >
                    {ubication.reference ? ubication.reference.length : 0}/200
                  </Text>
                </View>
              </View>

              <View className="flex flex-col gap-2">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                  }}
                >
                  Teléfono
                </Text>

                <TextInput
                  keyboardType="phone-pad"
                  name="phone"
                  readOnly
                  className="w-full border border-gray-200 h-[50px] bg-white rounded-lg px-3"
                  value={ubication?.phone}
                />

                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 11,
                  }}
                >
                  Llamarán a este número si hay algún problema con la entrega
                </Text>
              </View>

              <View className="flex flex-col gap-2">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                  }}
                >
                  ¿Es casa o trabajo?
                </Text>
                <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                  <RNPickerSelect
                    placeholder={{
                      label: "Seleccione una opción",
                      value: null,
                    }}
                    style={{
                      inputAndroid: {
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                      },
                      placeholder: {
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                      },
                    }}
                    onValueChange={(value) => handleChange("type", value)}
                    items={typeResidence}
                    value={ubication?.type}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              className="mt-5 flex flex-row py-3 bg-[#1458b9] rounded-lg justify-center items-center"
              onPress={handleSubmit}
            >
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 18,
                  color: "white",
                }}
              >
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <LoginRequired />
      )}

      <Toast position="bottom" />
    </KeyboardAvoidingView>
  );
};

export default Address;
