import { Image, Text, TouchableOpacity, View } from "react-native";
import laptop from "assets/laptop.png";
import { Entypo, Octicons } from "@expo/vector-icons";
import cartAPI from "../../api/cart/cart.api";
import { useDispatch, useSelector } from "react-redux";
import { addOrIncrementItem, decrementItem } from "store/slices/data.slice";
import { useEffect } from "react";
import { setSubtotal, setTotal } from "store/slices/data.slice";
const Item = ({ product, quantity, id, index, pd }) => {
  const dispatch = useDispatch();
  const { cart, offer } = useSelector((state) => state.data);
  const getTotal = () => {
    const subTotalAmmount =
      Math.round(
        cart?.Items?.reduce((sum, item) => {
          const price = parseFloat(item.Product.price) || 0;
          return sum + item.quantity * price;
        }, 0) * 100
      ) / 100;

    dispatch(setSubtotal(subTotalAmmount));

    if (offer.isActive) {
      const { typeValue } = offer;
      let totalAmmount;

      if (typeValue === "Porcentaje") {
        const discount = (subTotalAmmount * offer.value) / 100;
        totalAmmount = subTotalAmmount - discount;
      } else {
        const discount = offer.value;
        totalAmmount = subTotalAmmount - discount;
      }

      // 🔧 Redondea el total final a 2 decimales
      totalAmmount = Math.round(totalAmmount * 100) / 100;

      dispatch(setTotal(totalAmmount));
    } else {
      dispatch(setTotal(subTotalAmmount));
    }
  };

  const incrementItem = () => {
    if (quantity + 1 > product.stock) return;
    dispatch(addOrIncrementItem(product));

    if (!id) {
      cartAPI.incrementItemWithoutItemId(cart.id, product.id);
    } else {
      cartAPI.incrementItem(id);
    }

    getTotal();
  };

  const decrement = () => {
    dispatch(decrementItem(product));

    if (!id) {
      cartAPI.decrementItemWithoutItemId(cart.id, product.id);
    } else {
      cartAPI.decrementItem(id);
    }
    getTotal();
  };

  return (
    <View
      className={`flex flex-row py-3 ${
        !pd ? "px-5" : "px-0"
      } border-b  border-gray-100 items-center`}
      key={index}
    >
      {/* Imagen */}
      <Image
        source={{
          uri: product?.photo,
        }}
        className="w-[50px] h-[50px]"
      />

      {/* Nombre y precio */}
      <View className="flex flex-col flex-1 px-3">
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 15,
          }}
        >
          {product?.name}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 13,
          }}
        >
          $ {product?.price}
        </Text>
      </View>

      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity
          className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300"
          onPress={decrement}
        >
          <Entypo name="minus" size={15} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 15,
          }}
        >
          {quantity}
        </Text>
        <TouchableOpacity
          disabled={quantity + 1 > product.stock}
          className="w-[25px] h-[25px] flex justify-center items-center rounded-lg border border-gray-200 bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          onPress={() => incrementItem(id ? id : product.id)}
        >
          <Octicons name="plus" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;
