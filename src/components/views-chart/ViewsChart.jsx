import { Image, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ViewsChart = ({ screenWidth }) => {
  const [viewsData, setViewsData] = useState(null);
  const { allViews } = useSelector((state) => state.data);

  useEffect(() => {
    // Mapa para agrupar vistas por producto
    const productViewsMap = {};

    allViews.forEach((view) => {
      const productId = view.Product.id;
      if (!productViewsMap[productId]) {
        productViewsMap[productId] = {
          id: productId,
          product: view.Product.name,
          photo: view.Product.photo,
          views: 0,
        };
      }

      productViewsMap[productId].views += view.quantity;
    });

    // Convertimos el objeto en array y ordenamos por cantidad de vistas
    const groupedViews = Object.values(productViewsMap).sort(
      (a, b) => b.views - a.views
    );

    // Tomamos los top 5 productos más vistos
    const topViews = groupedViews.slice(0, 5);

    setViewsData(topViews);
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
        <View className="flex flex-col gap-3">
          {viewsData.map((item, index) => (
            <View key={index} className="flex flex-row items-center gap-2">
              {/* Posición */}
              <View className="w-[30px] h-[30px] rounded-full flex flex-row items-center justify-center bg-[#0A192F]">
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  {index + 1}
                </Text>
              </View>
              <View className="flex-1 flex-col">
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 15,
                  }}
                >
                  {item.product}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                  }}
                >
                  Visto:{" "}
                  {item.views === 1
                    ? item.views + " vez"
                    : item.views + " veces"}
                </Text>
              </View>

              {/* Imagen */}
              <View className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
                <Image
                  source={{
                    uri: item.photo,
                  }}
                  className="w-[50px] h-[50px] object-contain"
                  resizeMode="contain"
                />
              </View>
            </View>
          ))}
        </View>
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
