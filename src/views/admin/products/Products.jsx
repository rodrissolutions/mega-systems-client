import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Octicons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { NewProduct } from "../../../modal/index.modals";
import { useNavigation } from "@react-navigation/native";
import { setProduct } from "store/slices/data.slice";

const Products = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { products } = useSelector((state) => state.data);
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const editProduct = (current) => {
    dispatch(setProduct(current));
    navigation.navigate("EditProduct");
  };

  return isVisible ? (
    <NewProduct isVisible={isVisible} onClose={toggleModal} />
  ) : (
    <AdminLayout>
      <View className="flex-1 bg-gray-50">
        {/* Header: buscador + botón */}
        <View className="px-5 py-4 border-b border-gray-200 bg-white">
          <View className="flex flex-row items-center gap-2 mb-3">
            <View className="flex-1 flex flex-row items-center h-[48px] bg-white border border-gray-200 rounded-xl px-3">
              <Octicons name="search" size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Buscar producto"
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
                Nuevo
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de productos */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            flexGrow: 1,
          }}
        >
          {!products || products.length === 0 ? (
            <View className="mt-32 items-center">
              <Feather name="package" size={48} color="#D1D5DB" />
              <Text
                className="mt-4 text-gray-400 text-center"
                style={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
              >
                No hay productos registrados.
              </Text>
            </View>
          ) : (
            products.map((pr) => (
              <View
                className="flex flex-row items-center py-3 px-3 mb-2 bg-white border border-gray-200 rounded-xl shadow-sm"
                key={pr.id}
              >
                {/* Imagen */}
                <View className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                  <Image
                    source={{ uri: pr.photo }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Info */}
                <View className="flex-1 px-3">
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 13,
                      color: "#0A192F",
                    }}
                  >
                    {pr.Category?.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 15,
                      color: "#4B5563",
                    }}
                  >
                    {pr.name}
                  </Text>
                </View>

                {/* Acciones */}
                <TouchableOpacity
                  className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center"
                  onPress={() => editProduct(pr)}
                >
                  <Octicons name="three-bars" size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </AdminLayout>
  );
};

export default Products;
