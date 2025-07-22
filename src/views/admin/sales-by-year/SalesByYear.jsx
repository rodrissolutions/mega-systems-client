import { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
// import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const SalesByYear = () => {
  const { allSales } = useSelector((state) => state.data);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [loading, setLoading] = useState(false);

  const loadChartData = () => {
    setLoading(true);

    setTimeout(() => {
      // Filtrar ventas pagadas
      const salesPagadas = allSales.filter((sale) => sale.status === "Pagada");

      // Agrupar por año y sumar totales
      const salesByYear = {};

      salesPagadas.forEach((sale) => {
        const year = moment(sale.createdAt).format("YYYY");
        if (!salesByYear[year]) salesByYear[year] = 0;
        salesByYear[year] += parseFloat(sale.total);
      });

      // Ordenar años cronológicamente
      const sortedYears = Object.keys(salesByYear).sort();

      // Formatear etiquetas y datos para gráfico
      const labels = sortedYears; // ya son años
      const data = sortedYears.map((year) =>
        parseFloat(salesByYear[year].toFixed(2))
      );

      setChartData({ labels, datasets: [{ data }] });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadChartData();
  }, [allSales]);

  const chartWidth = Dimensions.get("window").width - 48;

  return (
    <View
      style={{
        padding: 24,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_600SemiBold",
            color: "#111827",
          }}
        >
          Ventas por año
        </Text>

        <TouchableOpacity
          onPress={loadChartData}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#2563EB",
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 8,
          }}
          activeOpacity={0.7}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <MaterialIcons name="refresh" size={20} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 8,
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                }}
              >
                Refrescar
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* <BarChart
        data={chartData}
        width={chartWidth}
        height={240}
        fromZero
        showValuesOnTopOfBars
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          labelColor: () => "#374151",
          style: { borderRadius: 16 },
        }}
        verticalLabelRotation={0}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf: "center",
        }}
      /> */}
    </View>
  );
};

export default SalesByYear;
