// components/CarritoAside.js
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { Item } from "components/index.components";
import { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import empty from "assets/empty.json";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "store/slices/data.slice";
import { setSubtotal } from "store/slices/data.slice";

const Cart = ({ openCart, toggleOpenCart }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, cart, total, offer, subtotal } = useSelector(
    (state) => state.data
  );

  const goToLogin = () => {
    toggleOpenCart();
    navigation.navigate("Login");
  };

  const goToRegister = () => {
    toggleOpenCart();
    navigation.navigate("Register");
  };

  const goToCheckout = () => {
    toggleOpenCart();
    navigation.navigate("BuyMain", {
      screen: "Checkout",
    });
  };

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

  if (!openCart) return null;

  useEffect(() => {
    getTotal();
  }, [cart]);

  return (
    <View
      className={`absolute top-0 w-[85%] right-0 h-screen z-50  flex flex-col  bg-white border-l border-gray-200 rounded-tl-xl shadow-xl shadow-gray-300 overflow-hidden`}
    >
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-10 border-b border-gray-100 bg-[#0A192F]">
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 20,
            color: "white",
          }}
        >
          Mi carrito
        </Text>
        <TouchableOpacity onPressIn={toggleOpenCart}>
          <Octicons name="x" size={20} color={"white"} />
        </TouchableOpacity>
      </View>

      {user ? (
        cart && cart.Items?.length > 0 ? (
          <>
            <View className="flex flex-col flex-1">
              <ScrollView
                className="flex-1"
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 50,
                }}
              >
                {cart.Items.map((item, index) => (
                  <Item
                    product={item.Product}
                    quantity={item.quantity}
                    id={item.id ? item.id : null}
                    key={item.id}
                    pd={null}
                  />
                ))}
                {/* Producto */}
              </ScrollView>
            </View>

            {/* Footer */}
            <View className="h-fit bg-gray-100 fixed w-full bottom-14 py-5">
              {/* Subtotal */}
              <View className="flex flex-row items-center justify-between px-5">
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 16,
                  }}
                >
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                  }}
                >
                  $ {subtotal}
                </Text>
              </View>
              {offer && offer?.isActive && (
                <>
                  <View className="flex flex-row items-center justify-between px-5">
                    <Text
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                      }}
                    >
                      Descuento
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 16,
                      }}
                    >
                      {offer.typeValue === "Porcentaje"
                        ? `${parseInt(offer.value)}%`
                        : `$${offer.value}`}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center justify-between px-5">
                    <Text
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 16,
                      }}
                    >
                      Descontado
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 16,
                      }}
                    >
                      $ {parseFloat(subtotal - total).toFixed(2)}
                    </Text>
                  </View>
                </>
              )}

              <View className="flex flex-row items-center justify-between px-5 mt-5">
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 16,
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    color: "#1786f9",
                    fontSize: 18,
                  }}
                >
                  $ {total}
                </Text>
              </View>
              <TouchableOpacity
                className="w-[90%] mx-auto mt-5 py-3 bg-[#1786f9] rounded-lg flex flex-row items-center justify-center"
                onPress={goToCheckout}
              >
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Confirmar compra
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View className="flex  items-center flex-1 pt-52">
            <LottieView
              autoPlay
              loop
              source={empty}
              style={{ width: 200, height: 200 }}
            />
            <Text
              className="text-gray-500"
              style={{ fontFamily: "Inter_600SemiBold", fontSize: 21 }}
            >
              Carrito vacío
            </Text>
          </View>
        )
      ) : (
        <View className="py-10 bg-[#0A192F] px-5 flex flex-col ">
          <View className="flex flex-row items-center gap-3">
            <View className="w-[60px] h-[60px] rounded-full bg-white border-gray-200 flex justify-center items-center">
              <Octicons name="person" size={30} color="#ccc" />
            </View>
            <View className="flex flex-col gap-1 max-w-[85%]">
              <Text
                className="text-white"
                style={{ fontFamily: "Inter_700Bold", fontSize: 18 }}
              >
                Bienvenido
              </Text>
              <Text
                className="text-gray-400"
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 15,
                  flexWrap: "wrap",
                }}
              >
                Ingresa a tu cuenta para ver tus compras, favoritos, etc.
              </Text>
            </View>
          </View>

          <View className="flex flex-row mt-5 px-5 gap-3">
            <TouchableOpacity
              className="bg-[#1458b9] w-[50%] py-3 flex justify-center items-center"
              onPress={goToLogin}
            >
              <Text
                className="text-white"
                style={{ fontFamily: "Inter_600SemiBold", fontSize: 15 }}
              >
                Ingresa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white w-[50%] py-3 justify-center items-center border border-[#1458b9]"
              onPress={goToRegister}
            >
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15 }}>
                Crea tu cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;
