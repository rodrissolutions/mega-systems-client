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

const SalesByMonthChart = () => {
  // const [allSales, setAllSales] = useState([
  //   {
  //     id: "1a2b3c",
  //     code: "VTA001",
  //     total: "150.50",
  //     status: "Pagada",
  //     paymentMethod: "Efectivo",
  //     createdAt: "2025-01-15T10:15:00.000Z",
  //     User: {
  //       id: "u1",
  //       fullName: "Juan Pérez",
  //     },
  //   },
  //   {
  //     id: "2b3c4d",
  //     code: "VTA002",
  //     total: "200.00",
  //     status: "Pagada",
  //     paymentMethod: "Transferencia",
  //     createdAt: "2025-02-05T14:30:00.000Z",
  //     User: {
  //       id: "u2",
  //       fullName: "María Gómez",
  //     },
  //   },
  //   {
  //     id: "3c4d5e",
  //     code: "VTA003",
  //     total: "99.99",
  //     status: "Pendiente",
  //     paymentMethod: "Efectivo",
  //     createdAt: "2025-03-10T09:00:00.000Z",
  //     User: {
  //       id: "u3",
  //       fullName: "Carlos Ruiz",
  //     },
  //   },
  //   {
  //     id: "4d5e6f",
  //     code: "VTA004",
  //     total: "300.75",
  //     status: "Pagada",
  //     paymentMethod: "Efectivo",
  //     createdAt: "2025-04-15T18:45:00.000Z",
  //     User: {
  //       id: "u4",
  //       fullName: "Ana Martínez",
  //     },
  //   },
  //   {
  //     id: "5e6f7g",
  //     code: "VTA005",
  //     total: "50.00",
  //     status: "Rechazada",
  //     paymentMethod: "Transferencia",
  //     createdAt: "2025-05-20T11:30:00.000Z",
  //     User: {
  //       id: "u5",
  //       fullName: "Luis Fernández",
  //     },
  //   },
  //   {
  //     id: "6f7g8h",
  //     code: "VTA006",
  //     total: "175.00",
  //     status: "Pagada",
  //     paymentMethod: "Transferencia",
  //     createdAt: "2025-06-10T15:00:00.000Z",
  //     User: {
  //       id: "u6",
  //       fullName: "Sofía López",
  //     },
  //   },
  //   {
  //     id: "7g8h9i",
  //     code: "VTA007",
  //     total: "225.00",
  //     status: "Pagada",
  //     paymentMethod: "Efectivo",
  //     createdAt: "2025-07-05T13:20:00.000Z",
  //     User: {
  //       id: "u7",
  //       fullName: "Diego Torres",
  //     },
  //   },
  // ]);
  const { allSales } = useSelector((state) => state.data);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [loading, setLoading] = useState(false);

  const loadChartData = () => {
    setLoading(true);

    setTimeout(() => {
      const salesPagadas = allSales.filter((sale) => sale.status === "Pagada");

      const salesByMonth = {};

      salesPagadas.forEach((sale) => {
        const month = moment(sale.createdAt).format("YYYY-MM");
        if (!salesByMonth[month]) salesByMonth[month] = 0;
        salesByMonth[month] += parseFloat(sale.total);
      });

      const sortedMonths = Object.keys(salesByMonth).sort();

      const labels = sortedMonths.map((month) =>
        moment(month, "YYYY-MM").format("MMM YY")
      );
      const data = sortedMonths.map((month) =>
        parseFloat(salesByMonth[month].toFixed(2))
      );

      setChartData({ labels, datasets: [{ data }] });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadChartData();
  }, [allSales]);

  const chartWidth = Dimensions.get("window").width - 48; // 24 padding left + right

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
          Ventas por mes
        </Text>

        <TouchableOpacity
          onPress={loadChartData}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#2563EB", // un azul más intenso
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
        verticalLabelRotation={30}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf: "center",
        }}
      /> */}
    </View>
  );
};

export default SalesByMonthChart;
