import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import laptop from "assets/laptop.png";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "redux/slices/cart.slice";
import { setProduct } from "../../redux/slices/data.slice";
import cartAPI from "../../api/cart/cart.api";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { viewAPI } from "../../api/index.api";

const Product = ({ toggleShowInfo, product, index }) => {
  const { cart, user } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const filled = starNumber <= count;
      return (
        <Octicons
          key={index}
          name={filled ? "star-fill" : "star"}
          size={15}
          color={filled ? "#FFD700" : "#ccc"}
        />
      );
    });
  };

  const showInfoProduct = (currentProduct) => {
    dispatch(setProduct(currentProduct));
    toggleShowInfo();

    if (user) {
      const { id } = user;
      viewAPI.postView(currentProduct.id, id).then((res) => {});
    }
  };

  const addToCart = (product) => {
    // Enviar al carrito de compras en la base de datos
    const { id: CartId } = cart;
    const quantity = 1;

    cartAPI
      .addToCart({
        CartId,
        ProductId: product.id,
        quantity,
      })
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Producto agregado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
      .finally(() => {});

    //
  };

  return (
    <TouchableOpacity
      className="border border-gray-200 h-fit w-[49%] rounded-2xl bg-white"
      onPress={() => showInfoProduct(product)}
      key={index}
    >
      {/* Imagen */}
      <View className="w-full h-[120px] relative border-b border-gray-50">
        <Image
          source={{
            uri: product.photo,
          }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Contenido */}
      <View className="p-5 flex flex-col gap-2">
        <View className="flex flex-row items-center gap-1">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            {product.Category.name}
          </Text>
          <Text> - </Text>
          {product.stock > 0 ? (
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 12,
                color: "green",
              }}
            >
              En Stock
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 12,
                color: "red",
              }}
            >
              Agotado
            </Text>
          )}
        </View>

        <Text
          numberOfLines={1}
          className="text-gray-800  truncate text-ellipsis"
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 18,
          }}
        >
          {product.name}
        </Text>

        {/* Precio */}
        <View className="flex flex-row items-center gap-2">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#1786f9",
            }}
          >
            $ {product.price}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <View className="flex flex-row items-center gap-1">
            {renderStars(product.scoreAverage)}
          </View>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: "#9ca3af",
            }}
          >
            ({product.Reviews.length})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
