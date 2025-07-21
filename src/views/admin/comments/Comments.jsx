import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { reviewAPI } from "../../../api/index.api";
import { storageUtils } from "../../../utils/index.utils";
import { setAllReviews } from "store/slices/data.slice";
import { AxiosError } from "axios";

const Comments = () => {
  const dispatch = useDispatch();
  const { allReviews } = useSelector((state) => state.data);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");

  const getReviews = async () => {
    const token = await storageUtils.getItem("token");
    reviewAPI.listAll(token).then((res) => {
      const { reviews: reviewsDB } = res.data;
      dispatch(setAllReviews(reviewsDB));
    });
  };

  useEffect(() => {
    if (allReviews) {
      setFilteredReviews(allReviews);
    }
  }, [allReviews]);

  const handleDelete = (id) => {
    reviewAPI
      .deleteReview(id)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Comentario eliminado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        getReviews();
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: err.response.data.message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Error al eliminar el comentario",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = allReviews.filter((r) =>
      r.product?.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  return (
    <AdminLayout>
      <View className="flex-1">
        {/* Buscador */}
        <View className="px-5 py-3 border-b border-gray-100 bg-white">
          <View className="flex flex-row w-full h-[50px] bg-white border border-gray-200 rounded-xl">
            <View className="w-[50px] h-full flex justify-center items-center">
              <Octicons name="search" size={18} color="#ccc" />
            </View>
            <TextInput
              value={search}
              onChangeText={handleSearch}
              className="flex-1 outline-none px-3"
              placeholder="Buscar por producto"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#505050",
              }}
            />
          </View>
        </View>

        {/* Comentarios */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 16,
            flexGrow: 1,
          }}
        >
          {filteredReviews?.length === 0 ? (
            <View className="flex-1 justify-center items-center mt-20">
              <Octicons name="comment-discussion" size={60} color="#ccc" />
              <Text
                className="mt-4 text-gray-500 text-center"
                style={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
              >
                No se han recibido comentarios aún.
              </Text>
            </View>
          ) : (
            filteredReviews.map((review) => (
              <View
                key={review.id}
                className="mb-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
              >
                {/* Usuario + Producto */}
                <View className="flex flex-row items-center justify-between mb-3">
                  <View className="flex flex-row items-center gap-3">
                    <Image
                      source={{
                        uri:
                          review.User?.photo ||
                          "https://via.placeholder.com/100",
                      }}
                      className="w-12 h-12 rounded-full bg-gray-200"
                    />
                    <View>
                      <Text
                        className="text-base text-gray-800"
                        style={{ fontFamily: "Inter_600SemiBold" }}
                      >
                        {review.User?.fullName || "Usuario anónimo"}
                      </Text>
                      <Text
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "Inter_400Regular" }}
                      >
                        Producto: {review.Product?.name}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(review.id)}>
                    <MaterialIcons name="delete" size={22} color="#dc2626" />
                  </TouchableOpacity>
                </View>

                {/* Estrellas */}
                <View className="flex flex-row items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Octicons
                      key={i}
                      name="star-fill"
                      size={16}
                      color={i < review.rating ? "#facc15" : "#e5e7eb"}
                    />
                  ))}
                  <Text
                    className="text-sm text-gray-500 ml-2"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    {review.rating} de 5
                  </Text>
                </View>

                {/* Comentario */}
                <Text
                  className="text-sm text-gray-700 italic"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  Dejó el siguiente comentario:
                </Text>
                <Text
                  className="mt-1 italic text-gray-600"
                  style={{ fontFamily: "Inter_400Italic" }}
                >
                  “{review.comment}”
                </Text>
              </View>
            ))
          )}
        </ScrollView>
        <Toast position="top" />
      </View>
    </AdminLayout>
  );
};

export default Comments;
