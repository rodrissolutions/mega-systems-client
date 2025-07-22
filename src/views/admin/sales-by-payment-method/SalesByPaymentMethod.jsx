import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
// import { PieChart } from "react-native-chart-kit";

const SalesByPaymentMethod = () => {
  const [mapSales, setMapSales] = useState([]);
  const [totalAmmount, setTotalAmmount] = useState(0);
  const { allSales } = useSelector((state) => state.data);

  const groupByPaymentMethod = () => {
    const paidSales = allSales.filter((sale) => sale.status === "Pagada");

    const totals = paidSales.reduce(
      (acc, sale) => {
        const method = sale.paymentMethod;
        const ammount = parseFloat(sale.total);

        if (method === "Efectivo") acc.efectivo += ammount;
        if (method === "Transferencia") acc.transferencia += ammount;

        return acc;
      },
      {
        efectivo: 0,
        transferencia: 0,
      }
    );

    const mappedChart = [
      {
        name: "Efectivo",
        amount: totals.efectivo,
        color: "#4CAF50",
        legendFontColor: "#333",
        legendFontSize: 14,
      },
      {
        name: "Transferencia",
        amount: totals.transferencia,
        color: "#2196F3",
        legendFontColor: "#333",
        legendFontSize: 14,
      },
    ];

    setMapSales(mappedChart);
  };

  useEffect(() => {
    const total = mapSales.reduce((acc, sale) => acc + sale.amount, 0);
    setTotalAmmount(total);
  }, [mapSales]);

  useEffect(() => {
    groupByPaymentMethod();
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
        Ventas por metodo de pago
      </Text>
      {/* {totalAmmount === 0 ? (
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: "#6B7280",
            textAlign: "center",
          }}
        >
          No hay información suficiente para mostrar el gráfico.
        </Text>
      ) : (
        <PieChart
          data={mapSales.map((item) => ({
            name: item.name,
            population: item.amount,
            color: item.color,
            legendFontColor: item.legendFontColor,
            legendFontSize: item.legendFontSize,
          }))}
          width={350}
          height={220}
          chartConfig={{
            color: () => `#000`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )} */}
    </View>
  );
};

export default SalesByPaymentMethod;
