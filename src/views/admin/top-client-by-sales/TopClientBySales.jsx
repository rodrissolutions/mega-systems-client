import { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const TopClientBySales = () => {
  const [mapSales, setMapSales] = useState([]);
  const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];
  const { allSales } = useSelector((state) => state.data);

  const groupBySales = () => {
    const ammountsByClient = {};
    allSales.forEach((sale) => {
      if (sale.status !== "Pagada") return;
      const client = sale.Client.fullName;
      const total = parseFloat(sale.total);

      if (client) {
        ammountsByClient[client] = (ammountsByClient[client] || 0) + total;
      }
    });

    const mapped = Object.entries(ammountsByClient)
      .map(([client, total]) => ({ name: client, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    const data = mapped.map((client, i) => ({
      name: client.name,
      population: client.total,
      color: colors[i % colors.length],
      legendFontColor: "#333",
      legendFontSize: 14,
    }));

    setMapSales(data);
  };

  useEffect(() => {
    groupBySales();
  }, [allSales]);
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
        Top 5 de clientes con mayores compras
      </Text>
      {mapSales.length > 0 ? (
        <PieChart
          data={mapSales}
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
          No hay información de ventas
        </Text>
      )}
    </View>
  );
};

export default TopClientBySales;
