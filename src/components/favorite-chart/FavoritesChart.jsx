import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const FavoritesChart = ({ chartConfig, screenWidth }) => {
  const { allFavorites } = useSelector((state) => state.data);
  const [favoritosData, setFavoritosData] = useState(null);

  useEffect(() => {
    if (!allFavorites || allFavorites.length === 0) {
      setFavoritosData(null);
      return;
    }

    // Contamos cuantas veces aparece un producto
    const counter = [];
    allFavorites.forEach((fav) => {
      const name = fav.Product.name;
      if (counter[name]) {
        counter[name]++;
      } else {
        counter[name] = 1;
      }
    });

    // Ordenamos por los mas favoritos
    const entries = Object.entries(counter).sort((a, b) => b[1] - a[1]);

    // Limitamos a 10 productos
    const top = entries.slice(0, 10);

    const labels = top.map(([name]) =>
      name.length > 10 ? name.slice(0, 10) + "..." : name
    );

    const data = top.map(([_, cant]) => cant);

    setFavoritosData({
      labels,
      datasets: [{ data }],
    });
  }, [allFavorites]);
  return (
    <View className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4 mb-5">
      <View className="flex flex-row items-center gap-2 mb-3">
        <View className="w-[40px] h-[40px] rounded-lg bg-gray-100 flex justify-center items-center">
          <FontAwesome5 name="heart" size={20} color={"#4b5563"} />
        </View>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 18,
            color: "#4b5563",
          }}
        >
          Productos Favoritos
        </Text>
      </View>

      {favoritosData ? (
        <BarChart
          data={favoritosData}
          width={screenWidth - 48}
          height={400}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero
          style={{ borderRadius: 16 }}
          showValuesOnTopOfBars
        />
      ) : (
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: "#6b7280",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Aún no hay productos añadidos a favoritos.
        </Text>
      )}
    </View>
  );
};

export default FavoritesChart;
