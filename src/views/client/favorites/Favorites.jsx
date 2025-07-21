import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, MaterialIcons, Octicons } from "@expo/vector-icons";
import Layout from "layouts/Layout";
import { useEffect, useState } from "react";
import { InfoProduct } from "modal/index.modals";
import { favoriteAPI } from "api/index.api";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, setProduct } from "store/slices/data.slice";
import LottieView from "lottie-react-native";
import noData from "assets/animations/no-data.json";
import Toast from "react-native-toast-message";
import { LoginRequired } from "components/index.components";

const Favorites = () => {
  const { user, favorites } = useSelector((state) => state.data);
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  const handleInfoProduct = (currentProduct) => {
    dispatch(setProduct(currentProduct));
    toggleShowInfo();
  };
  const toggleShowInfo = () => setShowInfo(!showInfo);

  const handleDelete = (ProductId) => {
    const { id: UserId } = user;
    favoriteAPI.deleteFavorite(UserId, ProductId).then((res) => {
      const { message } = res.data;
      Toast.show({
        type: "success",
        text1: "Producto eliminado de favoritos",
        text2: message,
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      getFavorites();
    });
  };

  const handleAllDelete = () => {
    const { id: UserId } = user;
    favoriteAPI.deleteAll(UserId).then((res) => {
      const { message } = res.data;
      Toast.show({
        type: "success",
        text1: "Productos eliminados de favoritos",
        text2: message,
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      getFavorites();
    });
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // enero = 0
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const getFavorites = () => {
    if (user) {
      const { id } = user;
      favoriteAPI
        .getByUser(id)
        .then((res) => {
          const { favorites } = res.data;
          dispatch(setFavorites(favorites));
        })
        .catch((err) => {})
        .finally(() => {});
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);
  return (
    <Layout>
      <View className="flex  flex-1 bg-[#F5F9FF] ">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          {user ? (
            favorites.length > 0 ? (
              <View className="flex flex-col flex-1 w-full">
                <View className="flex flex-row items-center justify-end">
                  <TouchableOpacity
                    className="flex flex-row items-center gap-2 px-3 py-2 rounded-lg bg-[#1786f9]"
                    onPress={handleAllDelete}
                  >
                    <MaterialIcons name="clear-all" size={30} color="white" />
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 16,
                        color: "white",
                      }}
                    >
                      Borrar todo
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Favoritos */}
                <View className="flex-1 flex-col w-full mt-5 bg-white h-fit border border-gray-100 rounded-lg">
                  {favorites.map((fav) => (
                    <View
                      className="px-2 py-3 border-b border-gray-100 flex flex-row items-center"
                      key={fav.id}
                    >
                      {/* Imagen */}
                      <View className="w-[50px]">
                        <Image
                          source={{
                            uri: fav.Product.photo,
                          }}
                          className="w-[40px] h-[40px]"
                        />
                      </View>

                      {/* Información del producto */}
                      <TouchableOpacity
                        className="flex-1 flex flex-col px-3"
                        onPress={() => handleInfoProduct(fav.Product)}
                      >
                        <Text
                          style={{
                            fontFamily: "Inter_600SemiBold",
                            fontSize: 14,
                            color: "#9ca3af",
                          }}
                        >
                          {fav.Product.Category.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Inter_700Bold",
                            fontSize: 16,
                          }}
                        >
                          {fav.Product.name}
                        </Text>

                        <View className="flex flex-row items-center gap-1">
                          <Text
                            style={{
                              fontFamily: "Inter_600SemiBold",
                              fontSize: 12,
                            }}
                          >
                            Añadido el:
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Inter_400Regular",
                              fontSize: 12,
                            }}
                          >
                            {formatearFecha(fav.createdAt)}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="w-[40px] h-full flex flex-row items-center justify-center"
                        onPress={() => handleDelete(fav.Product.id)}
                      >
                        <Octicons name="trash" size={20} color={"#991B1B"} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View className="flex flex-1 justify-center items-center h-full w-full gap-1 bg-[]">
                <LottieView
                  autoPlay
                  loop
                  source={noData}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
                <View className="flex flex-row items-center justify-center gap-2">
                  <FontAwesome5 name="heart-broken" size={30} color="#9ca3af" />
                  <Text
                    className="text-gray-400"
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 20,
                    }}
                  >
                    No tienes favoritos agregados
                  </Text>
                </View>
              </View>
            )
          ) : (
            <LoginRequired />
          )}
        </ScrollView>
      </View>
      {showInfo && (
        <InfoProduct toggleShowInfo={toggleShowInfo} showInfo={showInfo} />
      )}
      <Toast position="bottom" />
    </Layout>
  );
};

export default Favorites;
