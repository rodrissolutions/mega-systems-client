import { useMemo } from "react";
import { Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

// Funcion para generar colores
const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const truncate = (str, max) =>
  str.length > max ? str.slice(0, max) + "..." : str;

const LowRotationProducts = () => {
  const { allSales } = useSelector((state) => state.data);

  const pieData = useMemo(() => {
    const productMap = new Map();
    allSales?.forEach((sale) => {
      sale.SaleDetails.forEach((dtl) => {
        const product = dtl.Product;
        const name = product.name;
        const qty = dtl.quantity;

        if (productMap.has(name)) {
          productMap.set(name, productMap.get(name) + qty);
        } else {
          productMap.set(name, qty);
        }
      });
    });

    const sorted = [...productMap.entries()]
      .sort((a, b) => a[1] - b[1])
      .slice(0, 5);

    return sorted.map(([name, quantity]) => ({
      name: `${truncate(name, 10)} (${quantity})`,
      population: quantity,
      color: getRandomColor(),
      legendFontColor: "#374151", // gray-700
      legendFontSize: 10,
    }));
  }, [allSales]);

  return (
    <View className=" bg-white p-4 rounded-xl border border-gray-200 mb-10">
      <Text
        className="text-lg font-semibold text-center mb-4"
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: "#111827",
        }}
      >
        Productos con menor rotación
      </Text>
      {pieData.length > 0 ? (
        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            color: () => `rgba(0,0,0,1)`,
            labelColor: () => "#111827",
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      ) : (
        <Text>No hay datos</Text>
      )}
    </View>
  );
};

export default LowRotationProducts;
