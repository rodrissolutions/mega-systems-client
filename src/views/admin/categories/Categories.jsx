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
import { NewCategory } from "../../../modal/index.modals";
import { setCategory } from "../../../redux/slices/data.slice";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { categories } = useSelector((state) => state.data);

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const editCategory = (current) => {
    dispatch(setCategory(current));
    navigation.navigate("EditCategory");
  };

  return isVisible ? (
    <NewCategory isVisible={isVisible} onClose={toggleModal} />
  ) : (
    <AdminLayout>
      <View className="flex-1 bg-gray-50">
        {/* Encabezado */}
        <View className="px-5 py-4 bg-white border-b border-gray-200">
          {/* Buscador */}
          <View className="flex flex-row items-center gap-2 mb-3">
            <View className="flex-1 flex flex-row items-center h-[48px] bg-white border border-gray-200 rounded-xl px-3">
              <Octicons name="search" size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Buscar categoría"
                className="flex-1 ml-2"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>
          </View>

          {/* Botón "Nueva" */}
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

        {/* Lista de categorías */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            flexGrow: 1,
          }}
        >
          {!categories || categories.length === 0 ? (
            <View className="mt-32 items-center">
              <Feather name="grid" size={48} color="#D1D5DB" />
              <Text
                className="mt-4 text-gray-400 text-center"
                style={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
              >
                No hay categorías registradas.
              </Text>
            </View>
          ) : (
            categories.map((ct) => (
              <View
                key={ct.id}
                className="flex flex-row items-center px-4 py-3 mb-3 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                {/* Imagen */}
                <View className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                  <Image
                    source={{ uri: ct.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Info */}
                <View className="flex-1 px-3">
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 15,
                      color: "#0A192F",
                      marginBottom: 2,
                    }}
                  >
                    {ct.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 13,
                      color: "#6B7280",
                    }}
                  >
                    {ct.description}
                  </Text>
                </View>

                {/* Opciones */}
                <TouchableOpacity
                  className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center"
                  onPress={() => editCategory(ct)}
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

export default Categories;
