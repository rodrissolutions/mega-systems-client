import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AdminLayout from "layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather, Octicons } from "@expo/vector-icons";
import { NewService } from "../../../modal/index.modals";
import { useNavigation } from "@react-navigation/native";
import { setService } from "store/slices/data.slice";

const Services = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { services } = useSelector((state) => state.data);
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const editService = (current) => {
    dispatch(setService(current));
    navigation.navigate("EditService");
  };

  useEffect(() => {
    console.log(services);
  }, []);

  return isVisible ? (
    <NewService isVisible={isVisible} onClose={toggleModal} />
  ) : (
    <AdminLayout>
      <View className="flex-1 bg-gray-50">
        {/* Buscador + botón */}
        <View className="px-5 py-4 border-b border-gray-100 bg-white">
          <View className="flex flex-row items-center gap-2 mb-3">
            <View className="flex-1 flex flex-row items-center h-[48px] bg-white border border-gray-200 rounded-xl px-3">
              <Octicons name="search" size={18} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-2"
                placeholder="Buscar servicio"
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

        {/* Contenido */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            flexGrow: 1,
          }}
        >
          {!services || services.length === 0 ? (
            <View className="mt-32 items-center">
              <Feather name="box" size={48} color="#D1D5DB" />
              <Text
                className="mt-4 text-gray-400 text-center"
                style={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
              >
                No hay servicios registrados.
              </Text>
            </View>
          ) : (
            services.map((srv) => (
              <View
                key={srv.id}
                className="mb-5 rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Imagen */}
                <View className="w-full h-[200px] relative">
                  <Image
                    source={{ uri: srv.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    className="absolute bottom-3 right-3 bg-[#0A192F] w-[40px] h-[40px] rounded-full flex justify-center items-center"
                    onPress={() => editService(srv)}
                  >
                    <Octicons name="three-bars" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Info */}
                <View className="px-4 py-4 space-y-1">
                  <Text
                    style={{
                      fontFamily: "Inter_700Bold",
                      fontSize: 16,
                      color: "#0A192F",
                    }}
                  >
                    {srv.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: "#4B5563",
                    }}
                  >
                    {srv.description}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 14,
                      color: "#0A192F",
                    }}
                  >
                    Precio estimado: ${" "}
                    <Text style={{ fontFamily: "Inter_700Bold" }}>
                      {srv.estimatedPrice}
                    </Text>
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </AdminLayout>
  );
};

export default Services;
