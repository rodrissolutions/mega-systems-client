import { Image, Text, TouchableOpacity, View } from "react-native";
import { Octicons } from "@expo/vector-icons"; // Icono para eliminar
import dateUtil from "../../utils/date/date.util";
import { useSelector } from "react-redux";

const Comment = ({ review, onDelete }) => {
  const { user } = useSelector((state) => state.data);
  const isOwner = user?.id === review.UserId;

  return (
    <View className="flex flex-row gap-2 mb-5">
      {/* Imagen de perfil */}
      <View className="w-[50px] h-[50px] bg-red-300 rounded-full">
        <Image
          source={{ uri: review.User.photo }}
          className="w-full h-full rounded-full"
        />
      </View>

      {/* Comentario + nombre + rating + botón eliminar */}
      <View className="flex flex-col flex-1">
        <View className="flex flex-col bg-gray-100 px-2 py-2 rounded-lg">
          <View className="flex flex-row justify-between items-center">
            <Text
              style={{
                fontFamily: "Inter_800ExtraBold",
                fontSize: 14,
              }}
            >
              {review.User.fullName}
            </Text>

            {/* Botón eliminar si es dueño */}
            {isOwner && (
              <TouchableOpacity onPressIn={() => onDelete?.(review.id)}>
                <Octicons name="trash" size={18} color="#f87171" />
              </TouchableOpacity>
            )}
          </View>

          {/* Comentario */}
          <Text
            className="text-black"
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
            }}
          >
            {review.comment}
          </Text>

          {/* Calificación */}
          <Text
            className="text-yellow-500"
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 13,
            }}
          >
            ⭐ {review.rating} / 5
          </Text>
        </View>

        {/* Tiempo */}
        <View className="flex flex-row gap-2">
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            {dateUtil.formatRelativeTime(review.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Comment;
