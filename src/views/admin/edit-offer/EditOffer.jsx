import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { storageUtils } from "../../../utils/index.utils";
import { offerAPI } from "../../../api/index.api";
import { setOffers } from "store/slices/data.slice";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import { AxiosError } from "axios";
import ListTypesValues from "../../../modal/list-types-values/ListTypesValues";
import ListStatusOffer from "../status-offer/StatusOffer";

const EditOffer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  const [showIsActive, setShowIsActive] = useState(false);
  const toggleShowIsActive = () => {
    setShowIsActive(!showIsActive);
  };

  const [offerData, setOfferData] = useState({});
  const { offer } = useSelector((state) => state.data);

  const typeActives = [
    {
      label: "Activo",
      value: true,
    },
    {
      label: "Inactivo",
      value: false,
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

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");

    const { id, ...rest } = offerData;
    offerAPI
      .updateOffer(token, id, rest)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Oferta actualizada",
          text2: message,
          text1Style: { fontSize: 16, fontWeight: "900" },
          text2Style: { fontSize: 14 },
        });
        getOffers();

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

  useEffect(() => {
    if (offer) {
      setOfferData(offer);
    }
  }, [offer]);
  return (
    <View className="flex-1 bg-[#F5F9FF] flex flex-col">
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
            value={offerData?.title}
            multiline
            onChangeText={(value) => handleChange("title", value)}
            className="h-[60px] bg-white border border-gray-200 rounded-lg px-3"
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
            Descripción
          </Text>

          <TextInput
            value={offerData?.description}
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
            onPress={toggleShow}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            >
              {offerData?.typeValue || "Seleccionar"}
            </Text>
          </TouchableOpacity>
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
            value={offerData?.value}
            onChangeText={(value) => handleChange("value", value)}
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
            Estado
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
            onPress={toggleShowIsActive}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            >
              {offerData?.isActive ? "Activo" : "Inactivo"}
            </Text>
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
      <ListTypesValues
        visible={show}
        onClose={toggleShow}
        handleChange={handleChange}
        currentValue={offerData?.typeValue}
      />
      <ListStatusOffer
        visible={showIsActive}
        onClose={toggleShowIsActive}
        handleChange={handleChange}
        currentActive={offerData?.isActive}
      />
    </View>
  );
};

export default EditOffer;
