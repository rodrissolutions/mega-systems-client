import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { CustomBarItem } from "../index.components";

const CustomBarChart = ({ data, screenWidth }) => {
  const [maxViews, setMaxViews] = useState(0);

  useEffect(() => {
    const maxViews = Math.max(...data.map((item) => item.views));

    setMaxViews(maxViews);
  }, [data]);
  return (
    <View className="p-2">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CustomBarItem
            item={item}
            maxViews={maxViews}
            key={item.id}
            screenWidth={screenWidth}
          />
        )}
      />
    </View>
  );
};

export default CustomBarChart;
