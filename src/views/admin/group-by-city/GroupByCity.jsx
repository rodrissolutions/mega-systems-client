import { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";

import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const GroupByCity = () => {
  const [mapClients, setMapClients] = useState([]);

  const colors = [
    "#f44336",
    "#2196f3",
    "#4caf50",
    "#ff9800",
    "#9c27b0",
    "#00bcd4",
    "#ffc107",
    "#e91e63",
    "#3f51b5",
    "#8bc34a",
  ];
  const { users } = useSelector((state) => state.data);

  const groupClientsByCity = () => {
    const countByCity = [];

    users.forEach((user) => {
      const isClient = user?.Role?.name === "Cliente";
      const city = user?.Residency?.city;

      if (isClient && city) {
        countByCity[city] = (countByCity[city] || 0) + 1;
      }
    });

    const mapped = Object.entries(countByCity).map(([city, count], i) => ({
      name: city,
      population: count,
      color: colors[i % colors.length],
      legendFontColor: "#7F7F7F",
      legendFontSize: 10,
    }));

    console.log(mapped);

    setMapClients(mapped);
  };

  useEffect(() => {
    groupClientsByCity();
  }, [users]);

  return (
    <View className="bg-white p-4 rounded-xl border border-gray-200 mb-10">
      <Text
        className="text-lg font-semibold text-center mb-4"
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: "#111827",
        }}
      >
        Clientes por ciudad
      </Text>
      {mapClients.length > 0 ? (
        <PieChart
          data={mapClients}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: "#6B7280",
            textAlign: "center",
          }}
        >
          No hay información de residencia
        </Text>
      )}
    </View>
  );
};

export default GroupByCity;
