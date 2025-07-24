import React, { useMemo } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { StackedBarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const StockVsSales = () => {
  const { allSales, products } = useSelector((state) => state.data);

  const chartData = useMemo(() => {
    const salesMap = new Map();

    allSales?.forEach((sale) => {
      if (sale.status === "Pagada") {
        sale.SaleDetails.forEach((detail) => {
          const productId = detail.ProductId;
          const quantity = detail.quantity;

          salesMap.set(productId, (salesMap.get(productId) || 0) + quantity);
        });
      }
    });

    const filtered = products.filter((p) => p.stock > 0 || salesMap.has(p.id));

    const labels = filtered.map((p) =>
      p.name.length > 8 ? p.name.slice(0, 8) + "…" : p.name
    );

    const data = filtered.map((p) => {
      const sales = salesMap.get(p.id) || 0;
      const stock = p.stock || 0;
      return [sales, stock];
    });

    return {
      labels,
      legend: ["Ventas", "Stock"],
      data,
      barColors: ["#3B82F6", "#10B981"], // azul, verde
    };
  }, [products, allSales]);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`, // gray-800
    labelColor: (opacity = 1) => `rgba(75, 85, 99, ${opacity})`, // gray-600
    style: {
      borderRadius: 16,
    },
  };

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
        Stock vs Ventas
      </Text>

      {chartData.data.length > 0 ? (
        <>
          <ScrollView horizontal>
            <StackedBarChart
              data={chartData}
              width={Math.max(chartData.labels.length * 80, screenWidth - 32)}
              height={250}
              chartConfig={chartConfig}
              style={{ borderRadius: 16 }}
              decimalPlaces={0}
              hideLegend
              yAxisSuffix=""
              fromZero
            />
          </ScrollView>

          <View className="flex-row justify-center mt-4 gap-x-6">
            <View className="flex-row items-center gap-x-2">
              <View className="w-4 h-4 rounded bg-blue-500" />
              <Text className="text-gray-700">Ventas</Text>
            </View>
            <View className="flex-row items-center gap-x-2">
              <View className="w-4 h-4 rounded bg-emerald-500" />
              <Text className="text-gray-700">Stock</Text>
            </View>
          </View>
        </>
      ) : (
        <Text className="text-center text-gray-500">
          No hay datos para mostrar
        </Text>
      )}
    </View>
  );
};

export default StockVsSales;
