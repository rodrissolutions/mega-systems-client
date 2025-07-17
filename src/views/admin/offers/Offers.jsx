import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import AdminLayout from "../../../layouts/AdminLayout";
import { Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { NewOffer } from "../../../modal/index.modals";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setOffer } from "../../../redux/slices/data.slice";

const Offers = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { offers } = useSelector((state) => state.data);
  const [isVisible, setIsVisible] = useState(false);

  const editOffer = (current) => {
    dispatch(setOffer(current));
    navigation.navigate("EditOffer");
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return isVisible ? (
    <NewOffer isVisible={isVisible} onClose={toggleModal} />
  ) : (
    <AdminLayout>
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="px-5 py-4 border-b border-gray-200 bg-white">
          <View className="flex flex-row items-center gap-2 mb-3">
            <View className="flex-1 flex flex-row items-center h-[48px] bg-white border border-gray-200 rounded-xl px-3">
              <Octicons name="search" size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Buscar oferta"
                className="flex-1 ml-2"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>
          </View>

          <View className="flex items-end">
            <TouchableOpacity
              className="bg-[#0A192F] px-5 py-2 rounded-full flex flex-row items-center gap-2 shadow-md"
              onPress={toggleModal}
            >
              <Octicons name="plus" size={18} color="white" />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "white",
                }}
              >
                Nueva
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ofertas */}
        <ScrollView className="px-5 py-4">
          {offers.length === 0 ? (
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#6B7280",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              No hay ofertas registradas.
            </Text>
          ) : (
            offers.map((offer) => (
              <View
                key={offer.id}
                className="mb-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <View className="flex flex-row justify-between items-center mb-2">
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 16,
                      color: "#111827",
                    }}
                  >
                    {offer.title}
                  </Text>

                  <View className="flex flex-row items-center gap-2">
                    <View
                      className={`px-2 py-0.5 rounded-full ${
                        offer.isActive ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_500Medium",
                          fontSize: 12,
                          color: offer.isActive ? "#16A34A" : "#DC2626",
                        }}
                      >
                        {offer.isActive ? "Activa" : "Inactiva"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => editOffer(offer)}
                      className="p-1"
                    >
                      <Octicons
                        name="kebab-horizontal"
                        size={18}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  {offer.description}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: "#6B7280",
                  }}
                >
                  Tipo: {offer.typeValue} | Valor: {offer.value}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </AdminLayout>
  );
};

export default Offers;
