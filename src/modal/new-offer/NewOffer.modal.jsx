import { Feather, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";

import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message";
import { storageUtils } from "../../utils/index.utils";
import { offerAPI } from "../../api/index.api";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setOffer, setOffers } from "store/slices/data.slice";

const NewOffer = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    typeValue: "",
    value: "",
  });

  const typeValues = [
    {
      label: "Porcentaje",
      value: "Porcentaje",
    },
    {
      label: "Fijo",
      value: "Fijo",
    },
  ];

  const getOffers = async () => {
    const token = await storageUtils.getItem("token");
    offerAPI.getAllOffers(token).then((res) => {
      const { offers: offersDB } = res.data;
      dispatch(setOffers(offersDB));
    });
  };

  const handleChange = (name, value) => {
    setOfferData((prev) => ({ ...prev, [name]: value }));
  };

  const resetData = () => {
    setOfferData({
      title: "",
      description: "",
      typeValue: "",
      value: "",
    });
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");

    if (Object.values(offerData).includes("")) {
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

    offerAPI
      .createOffer(token, offerData)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Oferta creada",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getOffers();
        resetData();
        setTimeout(() => {
          onClose();
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
          <View className="flex flex-row px-7 h-[60px] items-center justify-between bg-[#0A192F]">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              Nueva Oferta
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Octicons name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="px-5 py-3">
            <View className="w-full h-fit px-3 py-5 bg-green-100 border border-gray-200 rounded-lg">
              <Text
                className="text-green-800"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  textAlign: "justify",
                }}
              >
                Nota: Solo puedes tener una oferta como válida. Si has creado
                mas ofertas en el pasado, desactiva las ofertas anteriores para
                poder crear una nueva.
              </Text>
            </View>
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
                Título
              </Text>

              <TextInput
                value={offerData.title}
                onChangeText={(value) => handleChange("title", value)}
                className="h-[70px] bg-white border border-gray-200 rounded-lg px-3"
                textAlignVertical="top"
                multiline
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
                value={offerData.description}
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
                Tipo
              </Text>

              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  placeholder={{
                    label: "Seleccione una categoría",
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
                  onValueChange={(value) => handleChange("typeValue", value)}
                  items={typeValues}
                />
              </View>
            </View>

            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Valor
              </Text>

              <TextInput
                keyboardType="numeric"
                value={offerData.value}
                onChangeText={(value) => handleChange("value", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
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

export default NewOffer;
