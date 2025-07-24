import React, { useMemo } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const ProductRevenue = () => {
  const { allSales, offers } = useSelector((state) => state.data);

  const chartData = useMemo(() => {
    const productMap = new Map();

    allSales?.forEach((sale) => {
      if (sale.status === "Pagada") {
        sale.SaleDetails.forEach((detail) => {
          const product = detail.Product;
          const name = product.name;
          let price = detail.unitPrice;

          // Buscar oferta activa asociada al producto (por id o por algún campo)
          const offer = offers?.find((o) => o.isActive);

          // Aplicar descuento si hay una oferta activa
          if (offer) {
            const value = parseFloat(offer.value);
            if (offer.typeValue === "Porcentaje") {
              price = price - price * (value / 100);
            } else if (offer.typeValue === "Fijo") {
              price = Math.max(0, price - value);
            }
          }

          const revenue = detail.quantity * price;

          if (productMap.has(name)) {
            productMap.set(name, productMap.get(name) + revenue);
          } else {
            productMap.set(name, revenue);
          }
        });
      }
    });

    const sorted = [...productMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sorted.map(([name]) =>
      name.length > 8 ? name.slice(0, 8) + "…" : name
    );
    const data = sorted.map(([, revenue]) => Number(revenue.toFixed(2)));

    return {
      labels,
      datasets: [{ data }],
    };
  }, [allSales, offers]);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, // emerald-500
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    barPercentage: 0.6,
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
        Ingresos generados por productos
      </Text>

      {chartData.datasets[0].data.length > 0 ? (
        <ScrollView horizontal>
          <BarChart
            data={chartData}
            width={Math.max(chartData.labels.length * 80, screenWidth - 32)}
            height={250}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero
            showValuesOnTopOfBars
            style={{ borderRadius: 16 }}
          />
        </ScrollView>
      ) : (
        <Text className="text-center text-gray-500">
          No hay datos para mostrar
        </Text>
      )}
    </View>
  );
};

export default ProductRevenue;
