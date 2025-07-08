import { FontAwesome5 } from "@expo/vector-icons";
import AdminLayout from "layouts/AdminLayout";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LineChart, PieChart, BarChart } from "react-native-chart-kit";
import { useState } from "react";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const ventasData = {
  dia: {
    labels: ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM"],
    datasets: [{ data: [5, 10, 7, 15, 9, 13] }],
  },
  semana: {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [{ data: [40, 35, 50, 30, 60, 45, 70] }],
  },
  mes: {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    datasets: [{ data: [120, 140, 160, 180] }],
  },
  año: {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [{ data: [500, 600, 800, 750, 900, 950] }],
  },
};

const usuariosData = [
  {
    name: "Hombres",
    population: 200,
    color: "#4A90E2",
    legendFontColor: "#4A90E2",
    legendFontSize: 14,
  },
  {
    name: "Mujeres",
    population: 200,
    color: "#E91E63",
    legendFontColor: "#E91E63",
    legendFontSize: 14,
  },
];

const favoritosData = {
  labels: ["Paracetamol", "Ibuprofeno", "Vitamina C", "Aspirina", "Jarabe X"],
  datasets: [
    {
      data: [12, 25, 18, 7, 20],
    },
  ],
};

const AdminHome = () => {
  const [periodo, setPeriodo] = useState("dia");

  return (
    <AdminLayout>
      <ScrollView className="flex flex-col px-4 py-5">
        {/* Usuarios Pie Chart */}
        <View className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4 mb-5">
          <View className="flex flex-row items-center gap-2 mb-3">
            <View className="w-[40px] h-[40px] rounded-lg bg-gray-100 flex justify-center items-center">
              <FontAwesome5 name="users" size={20} color={"#4b5563"} />
            </View>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                color: "#4b5563",
              }}
            >
              Distribución de Usuarios
            </Text>
          </View>

          <PieChart
            data={usuariosData}
            width={screenWidth - 48}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[0, 0]}
            absolute
          />
        </View>

        {/* Ventas */}
        <View className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4 mb-5">
          <View className="flex flex-row justify-between items-center mb-2">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 18,
                color: "#4b5563",
              }}
            >
              Ventas ({periodo})
            </Text>

            <View className="flex flex-row gap-2">
              {["dia", "semana", "mes", "año"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setPeriodo(item)}
                  className={`px-2 py-1 rounded-full ${
                    periodo === item ? "bg-blue-500" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      periodo === item ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <LineChart
            data={ventasData[periodo]}
            width={screenWidth - 48}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* Productos añadidos a favoritos */}
        <View className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4">
          <View className="flex flex-row items-center gap-2 mb-3">
            <View className="w-[40px] h-[40px] rounded-lg bg-gray-100 flex justify-center items-center">
              <FontAwesome5 name="heart" size={20} color={"#E91E63"} />
            </View>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 18,
                color: "#4b5563",
              }}
            >
              Productos Favoritos
            </Text>
          </View>

          <BarChart
            data={favoritosData}
            width={screenWidth - 48}
            height={240}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero
            style={{ borderRadius: 16 }}
            showValuesOnTopOfBars
          />
        </View>
      </ScrollView>
    </AdminLayout>
  );
};

export default AdminHome;
