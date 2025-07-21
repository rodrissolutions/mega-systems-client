import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Octicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setCurrentSale } from "store/slices/data.slice";

const Sales = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentStatus, setCurrentStatus] = useState("Todas");
  const { allSales } = useSelector((state) => state.data);

  const typeStatus = [
    { label: "Todas", value: "Todas" },
    { label: "Pendiente", value: "Pendiente" },
    { label: "Pagada", value: "Pagada" },
    { label: "Rechazada", value: "Rechazada" },
  ];

  const viewInfoSale = (current) => {
    dispatch(setCurrentSale(current));
    navigation.navigate("InfoSale");
  };

  useEffect(() => {
    console.log(allSales);
  }, []);

  return (
    <AdminLayout>
      <View className="flex-1 bg-gray-50">
        {/* Filtros */}
        <View className="px-5 py-4 bg-white border-b border-gray-200 flex flex-row items-center justify-between gap-3">
          {/* Buscar por código */}
          <View className="w-[48%] flex flex-col gap-1">
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#0A192F",
              }}
            >
              Código
            </Text>
            <TextInput
              placeholder="#"
              className="h-[48px] px-3 rounded-lg border border-gray-200 bg-white"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#374151",
              }}
            />
          </View>

          {/* Filtro por estado */}
          <View className="w-[48%] flex flex-col gap-1">
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#0A192F",
              }}
            >
              Estado
            </Text>
            <View className="h-[48px] border border-gray-200 rounded-lg justify-center bg-white px-2">
              <RNPickerSelect
                placeholder={{ label: "Seleccione una opción", value: null }}
                style={{
                  inputAndroid: {
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: "#374151",
                  },
                  placeholder: {
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: "#9CA3AF",
                  },
                }}
                value={currentStatus}
                onValueChange={(value) => setCurrentStatus(value)}
                items={typeStatus}
              />
            </View>
          </View>
        </View>

        {/* Lista de ventas */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingVertical: 16,
            paddingHorizontal: 20,
            flexGrow: 1,
          }}
        >
          {!allSales || allSales.length === 0 ? (
            <View className="mt-32 items-center">
              <Octicons name="info" size={48} color="#9CA3AF" />
              <Text
                className="text-gray-400 mt-4 text-center"
                style={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
              >
                No hay ventas registradas.
              </Text>
            </View>
          ) : (
            allSales.map((sale) => (
              <View
                key={sale.id}
                className="mb-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-row justify-between items-start"
              >
                <View className="flex-1">
                  <Text
                    style={{
                      fontFamily: "Inter_700Bold",
                      fontSize: 15,
                      color: "#111827",
                      marginBottom: 4,
                    }}
                  >
                    Código: #{sale.code}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: "#374151",
                      marginBottom: 2,
                    }}
                  >
                    Total: ${sale.total} • {sale.paymentMethod}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 13.5,
                      color: "#6B7280",
                      marginBottom: 2,
                    }}
                  >
                    Tipo: {sale.typeBuy}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 13.5,
                      color:
                        sale.status === "Pendiente"
                          ? "#DC2626"
                          : sale.status === "Pagada"
                          ? "#10B981"
                          : "#F59E0B",
                    }}
                  >
                    Estado: {sale.status}
                  </Text>
                </View>

                <TouchableOpacity
                  className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center"
                  onPress={() => viewInfoSale(sale)}
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

export default Sales;
