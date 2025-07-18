import React, { useMemo } from "react";
import { Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { ProgressChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const colors = [
  "#3b82f6", // azul
  "#ef4444", // rojo
  "#f59e0b", // amarillo
  "#10b981", // verde
  "#8b5cf6", // morado
];

const TopSellingProducts = () => {
  const { allSales } = useSelector((state) => state.data);

  // Preparamos datos para ProgressChart
  const chartData = useMemo(() => {
    const productMap = new Map();

    allSales?.forEach((sale) => {
      if (sale.status === "Pagada") {
        sale.SaleDetails.forEach((detail) => {
          const product = detail.Product;
          const name = product.name;
          const qty = detail.quantity;

          if (productMap.has(name)) {
            productMap.set(name, productMap.get(name) + qty);
          } else {
            productMap.set(name, qty);
          }
        });
      }
    });

    // Ordenar de mayor a menor y tomar top 5
    const sorted = [...productMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Normalizar cantidades entre 0 y 1 (requerido por ProgressChart)
    const maxQty = Math.max(...sorted.map(([, qty]) => qty)) || 1;
    const data = sorted.map(([, qty]) => qty / maxQty);

    return { sorted, data };
  }, [allSales]);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View className="bg-white p-4 rounded-xl border border-gray-200 overflow-hidden mb-10">
      <Text
        className="text-lg font-semibold text-center mb-4"
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: "#111827",
        }}
      >
        Top productos más vendidos (Progreso)
      </Text>

      {chartData.data.length > 0 ? (
        <>
          <ProgressChart
            data={{ data: chartData.data }}
            width={screenWidth - 32}
            height={220}
            strokeWidth={16}
            radius={60}
            chartConfig={chartConfig}
            hideLegend={true} // ocultamos etiquetas internas para evitar que se corten
            style={{ marginVertical: 8, borderRadius: 16 }}
          />

          {/* Leyenda manual */}
          <View style={{ marginTop: 10 }}>
            {chartData.sorted.map(([name, qty], i) => (
              <View
                key={name}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: colors[i],
                    borderRadius: 4,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14,
                    color: "#374151",
                    flexShrink: 1, // para evitar overflow
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {name} ({qty})
                </Text>
              </View>
            ))}
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

export default TopSellingProducts;
