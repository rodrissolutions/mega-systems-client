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

const SalesByWeek = () => {
  const { allSales } = useSelector((state) => state.data);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [loading, setLoading] = useState(false);

  const loadChartData = () => {
    setLoading(true);

    setTimeout(() => {
      const currentYear = moment().year();
      const salesPagadas = allSales.filter(
        (sale) =>
          sale.status === "Pagada" &&
          moment(sale.createdAt).year() === currentYear
      );

      const salesByWeek = {};

      salesPagadas.forEach((sale) => {
        const week = moment(sale.createdAt).week();
        if (!salesByWeek[week]) salesByWeek[week] = 0;
        salesByWeek[week] += parseFloat(sale.total);
      });

      const sortedWeeks = Object.keys(salesByWeek)
        .map((w) => parseInt(w))
        .sort((a, b) => a - b);

      const labels = sortedWeeks.map((w) => `S${w}`);
      const data = sortedWeeks.map((w) =>
        parseFloat(salesByWeek[w].toFixed(2))
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
          Ventas semanales ({moment().year()})
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

export default SalesByWeek;
