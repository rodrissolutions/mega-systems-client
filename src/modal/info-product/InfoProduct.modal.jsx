// InfoProduct.js
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { Comment, TableRanking } from "components/index.components";
import { useDispatch, useSelector } from "react-redux";
import {
  favoriteAPI,
  cartAPI,
  productAPI,
  reviewAPI,
  saleAPI,
} from "../../api/index.api";
import {
  setFavorites,
  addOrIncrementItem,
  setProducts,
  setProduct,
} from "store/slices/data.slice";
import { AxiosError } from "axios";
import { removeItem, setSubtotal } from "store/slices/data.slice";

const InfoProduct = ({ showInfo, toggleShowInfo }) => {
  const dispatch = useDispatch();
  const { user, favorites, cart, product, subtotal } = useSelector(
    (state) => state.data
  );
  const [hasReviewed, setHasReviewed] = useState(false);
  const [hasInCart, setHasInCart] = useState(false);
  const [review, setReview] = useState({ rating: null, comment: null });
  const [bought, setBought] = useState(false);

  const checkHasInCart = () => {
    const productFound = cart?.Items.find(
      (item) => item.ProductId === product.id
    );
    setHasInCart(productFound !== undefined);
  };

  const checkIfReviewed = (productReviews) => {
    if (user && productReviews?.length > 0) {
      const alreadyReviewed = productReviews.some((r) => r.UserId === user.id);
      setHasReviewed(alreadyReviewed);
    } else {
      setHasReviewed(false);
    }
  };

  const updateCurrentProduct = async () => {
    try {
      const res = await productAPI.getProducts();
      const productsDB = res.data.products;
      dispatch(setProducts(productsDB));
      const found = productsDB.find((p) => p.id === product.id);
      if (found) {
        dispatch(setProduct(found));
        checkIfReviewed(found.Reviews);
      }
    } catch (err) {
      console.error("Error al actualizar producto:", err);
    }
  };

  const getFavorites = async () => {
    if (user?.id) {
      try {
        const res = await favoriteAPI.getByUser(user.id);
        dispatch(setFavorites(res.data.favorites));
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
      }
    }
  };

  const hasPurchased = async () => {
    if (user?.id && product?.id) {
      try {
        const res = await saleAPI.hasPurchased(product.id, user.id);
        setBought(res.data.bought);
      } catch (err) {
        setBought(false);
      }
    }
  };

  const handleReview = (name, value) =>
    setReview((prev) => ({ ...prev, [name]: value }));

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      text1Style: { fontSize: 16, fontWeight: "900" },
      text2Style: { fontSize: 14 },
    });
  };

  const handleSubmit = async () => {
    if (!review.rating || !review.comment) return;
    try {
      const data = { ...review, ProductId: product.id, UserId: user.id };
      const res = await reviewAPI.createReview(data);
      showToast("success", "Producto calificado", res.data.message);
      setReview({ rating: null, comment: null });
      updateCurrentProduct();
      hasPurchased();
      getFavorites();
    } catch (err) {
      const msg =
        err instanceof AxiosError ? err.response?.data?.message : err.message;
      showToast("error", "Error", msg || "Error desconocido");
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const res = await reviewAPI.deleteReview(id);
      showToast("success", "Review eliminada", res.data.message);
      updateCurrentProduct();
      hasPurchased();
      getFavorites();
    } catch (err) {
      const msg =
        err instanceof AxiosError ? err.response?.data?.message : err.message;
      showToast("error", "Error", msg || "Error desconocido");
    }
  };

  const addToCart = (product) => {
    dispatch(addOrIncrementItem(product));
    cartAPI
      .addToCart({
        CartId: cart.id,
        ProductId: product.id,
        quantity: 1,
      })
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Producto agregado",
          text2: res.data.message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
      });
  };

  const removeItemCart = (product) => {
    const { id } = product;
    const item = cart.Items.find((it) => it.ProductId === id);
    const subtotalItem = product.price * item.quantity;
    dispatch(setSubtotal(subtotal - subtotalItem));
    dispatch(removeItem(product));

    cartAPI.deleteItem(cart.id, id).then((res) => {
      const { message } = res.data;
      Toast.show({
        type: "success",
        text1: "Producto eliminado del carrito",
        text2: message,
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
    });
  };

  const addToFavorite = (id) => {
    const { id: UserId } = user;
    favoriteAPI
      .addFavorite(UserId, id)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Producto agregado a favoritos",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        getFavorites();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const removeFavorite = (id) => {
    const { id: UserId } = user;
    favoriteAPI
      .deleteFavorite(UserId, id)
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    checkHasInCart();
  }, [cart]);

  useEffect(() => {
    hasPurchased();
    getFavorites();
    checkIfReviewed(product?.Reviews);
  }, [product]);

  return (
    <View
      className={`absolute h-full w-full bg-black/80 z-50 top-0 left-0 flex flex-col ${
        showInfo ? "translate-y-0" : "-translate-y-full"
      } transition-all duration-300`}
    >
      <View className="flex flex-row items-center justify-end px-5 h-[70px]">
        <TouchableOpacity onPress={toggleShowInfo}>
          <Octicons name="x" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      >
        <View className="w-full h-full bg-white rounded-xl border border-gray-200 overflow-hidden pb-20">
          {/* Header Imagen */}
          <View className="w-full h-[200px] relative border-b border-gray-100 overflow-hidden flex justify-center items-center">
            <Image
              source={{
                uri: product.photo,
              }}
              className="h-[200px] w-[200px]"
              resizeMode="contain"
            />

            {user &&
              (!hasInCart ? (
                <TouchableOpacity
                  className="absolute top-4 right-7 flex flex-row items-center gap-1"
                  onPress={() => addToCart(product)}
                >
                  <MaterialCommunityIcons
                    name="cart-plus"
                    size={25}
                    color={"#9ca3af"}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="absolute top-4 right-7 flex flex-row items-center gap-1"
                  onPress={() => removeItemCart(product)}
                >
                  <MaterialCommunityIcons
                    name="cart-minus"
                    size={25}
                    color={"#9ca3af"}
                  />
                </TouchableOpacity>
              ))}

            {user &&
              (favorites.some((fav) => fav.ProductId === product.id) ? (
                <TouchableOpacity
                  className="absolute top-4 left-7 flex flex-row items-center gap-1"
                  onPress={() => removeFavorite(product.id)}
                >
                  <Octicons name="heart-fill" size={25} color={"#f00"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="absolute top-4 left-7 flex flex-row items-center gap-1"
                  onPress={() => addToFavorite(product.id)}
                >
                  <Octicons name="heart" size={25} color={"#9ca3af"} />
                </TouchableOpacity>
              ))}
          </View>

          {/* Contenido */}
          <View className="flex flex-col gap-3 p-5">
            <View className="flex flex-row items-center justify-between">
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 16,
                  color: "#1786f9",
                }}
              >
                {product.Category.name}
              </Text>

              {product.guarantee && (
                <View className="rounded-full px-3 py-1 bg-green-500">
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 12,
                      color: "white",
                    }}
                  >
                    Garantía de {product.guarantee} meses
                  </Text>
                </View>
              )}
            </View>
            {/* Titulo */}
            <Text
              className="text-gray-800"
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
              }}
            >
              {product.name} - ({product.color})
            </Text>

            {/* Descripcion */}
            <Text
              className="text-gray-600"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                lineHeight: 25,
                textAlign: "justify",
              }}
            >
              {product.description}
            </Text>

            {/* Precio */}
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 25,
                color: "#1786f9",
              }}
            >
              $ {product.price}
            </Text>
            <View className="flex flex-row gap-1 items-center">
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 16,
                }}
              >
                Marca:
              </Text>
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                }}
              >
                {product.brand}
              </Text>
            </View>

            <View className="flex flex-row gap-1 items-center">
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 16,
                }}
              >
                Modelo:
              </Text>
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                }}
              >
                {product.model}
              </Text>
            </View>
            {product.dimensions && (
              <View className="flex flex-row gap-1 items-center">
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 16,
                  }}
                >
                  Dimensiones:
                </Text>
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                  }}
                >
                  {product.dimensions}
                </Text>
              </View>
            )}
          </View>

          {/* Especificaciones */}
          <View className="flex flex-col gap-2 px-5 mt-2">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
              }}
            >
              Especificaciones
            </Text>
            {/* Parseo seguro */}
            {(() => {
              let specs = product.specification;
              if (typeof specs === "string") {
                try {
                  specs = JSON.parse(specs);
                } catch (error) {
                  console.log("Error al parsear las especificaciones: ", error);
                  return (
                    <Text
                      className="text-gray-400 italic"
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                      }}
                    >
                      No se pueden mostrar las especificaciones del producto
                    </Text>
                  );
                }
              }

              if (typeof specs === "object" && specs !== null) {
                return Object.entries(specs).map(([key, value]) => (
                  <View key={key} className="flex flex-row gap-1 items-center">
                    <Text
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Text>
                    <Text
                      className="text-gray-500"
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                      }}
                    >
                      {value}
                    </Text>
                  </View>
                ));
              }
            })()}
          </View>

          {/* Ranking y Comentarios */}
          <View className="flex flex-col px-5 gap-2 mt-2">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Opiniones del producto
            </Text>
            {product.Reviews.length > 0 ? (
              <>
                {/* Ranking */}
                <TableRanking
                  average={product.scoreAverage}
                  reviews={product.Reviews}
                />

                {/* Comentarios */}
                <View className=" mt-5 h-[200px]">
                  <ScrollView
                    nestedScrollEnabled={true}
                    style={{ height: "auto" }}
                    contentContainerStyle={{
                      paddingBottom: 20,
                    }}
                    scrollEnabled={true}
                  >
                    {product.Reviews.length > 0 &&
                      product.Reviews.map((review) => (
                        <Comment
                          key={review.id}
                          review={review}
                          onDelete={handleDeleteReview}
                        />
                      ))}

                    {/* Comentario */}
                  </ScrollView>
                </View>
              </>
            ) : (
              <View className="flex flex-col h-[100px] justify-center items-center px-5 bg-gray-100 border border-gray-200 rounded-xl">
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Este producto aún no cuenta con valoraciones de clientes
                </Text>
              </View>
            )}
            {!hasReviewed && bought && (
              <>
                {/* Dejar un comentario */}
                <View className="flex flex-col gap-3 mt-5">
                  {/* Calificar */}
                  <View className="w-full flex flex-row items-center gap-2 justify-center">
                    <TouchableOpacity
                      onPressIn={() => handleReview("rating", 1)}
                    >
                      <Octicons
                        name={review?.rating >= 1 ? "star-fill" : "star"}
                        size={30}
                        color={review?.rating >= 1 && "#1786f9"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => handleReview("rating", 2)}
                    >
                      <Octicons
                        name={review?.rating >= 2 ? "star-fill" : "star"}
                        size={30}
                        color={review?.rating >= 3 && "#1786f9"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => handleReview("rating", 3)}
                    >
                      <Octicons
                        name={review?.rating >= 3 ? "star-fill" : "star"}
                        size={30}
                        color={review?.rating >= 3 && "#1786f9"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => handleReview("rating", 4)}
                    >
                      <Octicons
                        name={review?.rating >= 4 ? "star-fill" : "star"}
                        size={30}
                        color={review?.rating >= 4 && "#1786f9"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => handleReview("rating", 5)}
                    >
                      <Octicons
                        name={review?.rating >= 5 ? "star-fill" : "star"}
                        size={30}
                        color={review?.rating >= 5 && "#1786f9"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Comentar */}
                <View className="flex flex-col w-[90%] mx-auto mt-2">
                  <TextInput
                    placeholder="Deja tu comentario sobre el producto"
                    className="border border-gray-200 px-5 rounded-lg h-[150px]"
                    textAlignVertical="top"
                    onChangeText={(text) => handleReview("comment", text)}
                    value={review?.comment}
                  />

                  {/* Boton */}
                  <TouchableOpacity
                    className="flex flex-row w-full mt-3 items-center justify-center py-4 gap-2 bg-[#1786f9] rounded-lg"
                    onPressIn={handleSubmit}
                  >
                    <MaterialIcons
                      name="add-comment"
                      size={20}
                      color={"white"}
                    />
                    <Text
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                        color: "white",
                      }}
                    >
                      Comentar
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {!hasReviewed && !bought && (
              <View className="flex flex-col h-[100px] justify-center items-center px-5 bg-red-400 border border-red-700 rounded-xl ">
                <Text
                  className="text-red-900"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Para poder valorar y comentar este producto debes adquirirlo.
                  Att. Mega Systems
                </Text>
              </View>
            )}
            {hasReviewed && bought && (
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Nota: Solo se permite una valoración de producto por usuario
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Toast position="top" />
    </View>
  );
};

export default InfoProduct;
