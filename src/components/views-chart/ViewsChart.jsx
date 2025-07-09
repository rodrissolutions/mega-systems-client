import { Text, View } from "react-native";
import { CustomBarChart } from "../index.components";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ViewsChart = ({ screenWidth }) => {
  const [viewsData, setViewsData] = useState(null);
  const { allViews } = useSelector((state) => state.data);

  useEffect(() => {
    const viewMap = allViews
      .map((view) => ({
        id: view.id,
        product: view.Product.name,
        photo: view.Product.photo,
        views: view.quantity,
      }))
      .sort((a, b) => b.views - a.views);

    const newSlice = viewMap.slice(0, 5);
    setViewsData(newSlice);
  }, [allViews]);
  return (
    <View className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4 mb-5">
      <View className="flex flex-row items-center gap-2 mb-3">
        <View className="w-[40px] h-[40px] rounded-lg bg-gray-100 flex justify-center items-center">
          <Octicons name="eye" size={20} color={"#4b5563"} />
        </View>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 18,
            color: "#4b5563",
          }}
        >
          Productos más vistos
        </Text>
      </View>

      {viewsData ? (
        <CustomBarChart data={viewsData} screenWidth={screenWidth} />
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

export default ViewsChart;
