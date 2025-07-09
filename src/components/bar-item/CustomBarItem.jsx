import { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";

const CustomBarItem = ({ item, maxViews }) => {
  const [barWidth, setBarWidth] = useState(0);
  const maxBarWidth = 280; // ancho fijo del contenedor de barra

  // const barWidth = (item.views / maxViews) * maxBarWidth;

  useEffect(() => {
    const newBarWidth =
      item.views === maxViews ? maxBarWidth : item.views / maxViews;
    setBarWidth(newBarWidth);
  }, [item]);

  return (
    <View className="flex flex-col gap-3">
      <View className="flex flex-row items-center justify-between">
        <Text
          style={{ textAlign: "center", fontFamily: "Inter_700Bold" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.product}
        </Text>
        <Text
          style={{ textAlign: "center", fontFamily: "Inter_700Bold" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          ({item.views})
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        {/* Imagen */}
        <Image
          source={{ uri: item.photo }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          resizeMode="contain"
        />

        {/* Barra */}
        <View
          style={{
            width: barWidth,
            height: 30,
            backgroundColor: "#4A90E2",
            borderRadius: 15,
            marginLeft: 8,
            justifyContent: "center",
            paddingLeft: 8,
          }}
        ></View>
      </View>
    </View>
  );
};

export default CustomBarItem;
