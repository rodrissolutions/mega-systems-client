import { Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
// import { RankingChart } from "../index.components";

const RatingChart = () => {
  const [rankingData, setRankingData] = useState(null);
  const { products } = useSelector((state) => state.data);

  useEffect(() => {
    const ranking = products
      .filter((pr) => pr.scoreAverage > 0)
      .sort((a, b) => b.scoreAverage - a.scoreAverage);

    if (ranking.length < 5) {
      setRankingData(ranking);
    } else {
      const newRanking = ranking.slice(0, 5);
      setRankingData(newRanking);
    }
  }, [products]);
  return (
    <View className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4">
      <View className="flex flex-row items-center gap-2 mb-3">
        <View className="w-[40px] h-[40px] rounded-lg bg-gray-100 flex justify-center items-center">
          <Octicons name="star" size={20} color={"#4b5563"} />
        </View>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 18,
            color: "#4b5563",
          }}
        >
          Productos mejor calificados
        </Text>
      </View>

      {/* {rankingData && rankingData.length > 0 ? (
        <RankingChart data={rankingData} />
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
          Aún no hay productos calificados
        </Text>
      )} */}
    </View>
  );
};

export default RatingChart;
