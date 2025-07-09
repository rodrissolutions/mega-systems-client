import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const UsersChart = ({ chartConfig, screenWidth }) => {
  const { users } = useSelector((state) => state.data);

  const [usersData, setUsersData] = useState([
    {
      name: "Hombres",
      population: 0,
      color: "#4A90E2",
      legendFontColor: "#4A90E2",
      legendFontSize: 14,
    },
    {
      name: "Mujeres",
      population: 0,
      color: "#E91E63",
      legendFontColor: "#E91E63",
      legendFontSize: 14,
    },
    {
      name: "Otros",
      population: 0,
      color: "#9C27B0",
      legendFontColor: "#9C27B0",
      legendFontSize: 14,
    },
  ]);

  useEffect(() => {
    if (users.length > 0) {
      const males = users.filter((user) => user.gender === "Masculino");
      const females = users.filter((user) => user.gender === "Femenino");
      const others = users.filter((user) => user.gender === "Otro");

      setUsersData([
        {
          name: males.length === 1 ? "Hombre" : "Hombres",
          population: males.length,
          color: "#4A90E2",
          legendFontColor: "#4A90E2",
          legendFontSize: 14,
        },
        {
          name: females.length === 1 ? "Mujer" : "Mujeres",
          population: females.length,
          color: "#E91E63",
          legendFontColor: "#E91E63",
          legendFontSize: 14,
        },
        {
          name: others.length === 1 ? "Otro" : "Otros",
          population: others.length,
          color: "#9C27B0",
          legendFontColor: "#9C27B0",
          legendFontSize: 14,
        },
      ]);
    }
  }, [users]);
  return (
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
        data={usersData}
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
  );
};

export default UsersChart;
