import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AdminLayout from "layouts/AdminLayout";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const reportOptions = [
  { id: "ProductReport", label: "Productos", icon: "package" },
  { id: "ClientReport", label: "Clientes", icon: "people" },
  { id: "SaleReport", label: "Ventas", icon: "graph" },
];

const Reports = () => {
  const navigation = useNavigation();
  const goToReport = (id) => {
    navigation.navigate(id);
    // navigation.navigate(`Reports${id.charAt(0).toUpperCase() + id.slice(1)}`);
  };

  return (
    <AdminLayout>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#f9fafb",
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingVertical: 24,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 24,
            color: "#0A192F",
            marginBottom: 20,
          }}
        >
          Reportes
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {reportOptions.map(({ id, label, icon }) => (
            <TouchableOpacity
              key={id}
              onPress={() => goToReport(id)}
              activeOpacity={0.8}
              className="bg-white w-[48%] rounded-xl p-5 mb-5 items-center shadow-md"
            >
              <Octicons name={icon} size={36} color="#0A192F" />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: "#0A192F",
                  marginTop: 12,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </AdminLayout>
  );
};

export default Reports;
