import { Octicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, View } from "react-native";

const getStarDistribution = (reviews) => {
  const counts = [0, 0, 0, 0, 0]; // Index 0 = 1 estrella, Index 4 = 5 estrellas

  reviews.forEach((review) => {
    const rating = Math.round(review.rating);
    if (rating >= 1 && rating <= 5) {
      counts[rating - 1]++;
    }
  });

  const total = reviews.length || 1;
  const percentages = counts.map((count) => (count / total) * 100);

  return { counts, percentages };
};

const TableRanking = ({ average, reviews }) => {
  useEffect(() => {
    console.log("Average:", average);
  }, []);

  const { percentages } = getStarDistribution(reviews);

  return (
    <View className="flex flex-col gap-2">
      {/* Promedio y estrellas */}
      <View className="flex flex-col gap-2">
        <View className="flex flex-row gap-1 items-center justify-center">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 54,
            }}
          >
            {average !== null && average !== undefined
              ? Number(average).toFixed(1)
              : "0.0"}
          </Text>
          <View className="flex flex-col gap-1">
            <View className="flex flex-row items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Octicons
                  key={index}
                  name="star-fill"
                  size={12}
                  color={index < Math.ceil(average || 0) ? "#FFD700" : "#ccc"}
                />
              ))}
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
              }}
            >
              ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
            </Text>
          </View>
        </View>
      </View>

      {/* Barras por estrella */}
      {[5, 4, 3, 2, 1].map((star) => {
        const percentage = percentages[star - 1]?.toFixed(0) || "0";

        return (
          <View key={star} className="flex flex-row items-center gap-2">
            <View className="flex-1 w-full h-[6px] bg-[#ccc] rounded-full">
              <View
                style={{ width: `${percentage}%` }}
                className="h-full bg-[#1786f9] rounded-l-full"
              />
            </View>
            <View className="flex flex-row items-center gap-1">
              <Text
                className="text-gray-800"
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 14,
                }}
              >
                {star}
              </Text>
              <Octicons name="star-fill" size={12} color="#ccc" />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TableRanking;
