import React, { useMemo } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const truncate = (str, max) =>
  str.length > max ? str.slice(0, max) + "..." : str;

const getRandomColor = () => {
  const isTooLight = (r, g, b) => {
    // Luminosidad relativa para decidir si es muy claro (valor entre 0 y 1)
    // Usamos fórmula estándar para luminancia relativa
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return lum > 200; // umbral: 200 sobre 255 es bastante claro
  };

  while (true) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    if (!isTooLight(r, g, b)) {
      // Convertimos a hexadecimal
      const hex =
        "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      return hex;
    }
    // Si es muy claro, se vuelve a generar
  }
};

const TopRatedProducts = () => {
  const { products } = useSelector((state) => state.data);

  const { bestProducts, worstProducts } = useMemo(() => {
    if (!products || products.length === 0) {
      return { bestProducts: [], worstProducts: [] };
    }

    const best = products
      .slice()
      .sort((a, b) => b.scoreAverage - a.scoreAverage)
      .slice(0, 5);

    const worst = products
      .slice()
      .sort((a, b) => a.scoreAverage - b.scoreAverage)
      .slice(0, 5);

    return { bestProducts: best, worstProducts: worst };
  }, [products]);

  const chartConfig = {
    color: () => `rgba(0, 0, 0, 0.8)`,
    labelColor: () => "#111827",
  };

  const renderPieChart = (title, productList) => {
    if (!productList || productList.length === 0) {
      return (
        <Text className="text-center text-gray-500 mt-4">
          No hay datos para mostrar
        </Text>
      );
    }

    const colors = productList.map(() => getRandomColor());
    const data = productList.map((p, i) => ({
      name: truncate(p.name, 15),
      population: parseFloat(p.scoreAverage),
      color: colors[i],
      legendFontColor: "#374151",
      legendFontSize: 12,
    }));

    return (
      <View className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
        <Text
          className="text-lg font-semibold text-center mb-4"
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: "#111827",
          }}
        >
          {title}
        </Text>

        {/* Gráfico centrado */}
        <View className="w-full">
          <PieChart
            data={data}
            width={screenWidth - 40}
            height={180}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
            style={{
              marginHorizontal: "auto",
            }}
            hasLegend={false}
          />
        </View>

        {/* Leyendas en columna vertical */}
        <View
          style={{
            marginTop: 12,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {productList.map((p, i) => (
            <View
              key={p.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 4,
                maxWidth: screenWidth - 80,
              }}
            >
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: colors[i],
                  borderRadius: 8,
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#374151",
                  flexShrink: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {p.name} ({Number(p.scoreAverage).toFixed(1)})
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-[#F5F9FF] ">
      {renderPieChart("Top 5 Productos Mejor Calificados", bestProducts)}
      {renderPieChart("Top 5 Productos Peor Calificados", worstProducts)}
    </ScrollView>
  );
};

export default TopRatedProducts;
