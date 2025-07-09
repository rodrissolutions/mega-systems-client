import { Octicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

const RankingChart = ({ data }) => {
  return (
    <View className="flex flex-col gap-10">
      {data.map((item, index) => (
        <View className="flex flex-row items-center gap-3">
          {/* Imagen */}
          <Image
            source={{
              uri: item.photo,
            }}
            className="w-[50px] h-[50px] rounded-full"
          />

          <View className="flex flex-col flex-1 gap-2">
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 15,
                color: "#0A192F",
              }}
            >
              {item.name}
            </Text>
            <View className="flex flex-row items-center gap-1">
              <Octicons name="star-fill" size={12} color="#FFD700" />
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 12,
                }}
              >
                {item.scoreAverage} / 5.00
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default RankingChart;
