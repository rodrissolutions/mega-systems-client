import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../../components/item/Item";
import {
  resetCart,
  setSubtotal,
  setTotal,
} from "../../../redux/slices/data.slice";
import { codeAPI, saleAPI } from "../../../api/index.api";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

const Checkout = () => {
  const [accountVerification, setAccountVerification] = useState(false);
  const [code, setCode] = useState("");
  const [delivery, setDelivery] = useState({
    typeDelivery: null,
    surcharge: null,
  });

  const [sale, setSale] = useState({
    paymentMethod: null,
    typeBuy: null,
  });

  const { residency, cart, total, subtotal, offer, user } = useSelector(
    (state) => state.data
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };

  const typeBuy = [
    { label: "Retiro en Tienda", value: "Retiro en Tienda" },
    { label: "Entrega a Domicilio", value: "Entrega a Domicilio" },
  ];
  const typeAddressDelivery = [
    { label: "Entrega normal", value: "Entrega normal" },
    { label: "Entrega rápida", value: "Entrega rápida" },
  ];

  const typePayment = [
    { label: "Efectivo", value: "Efectivo" },
    { label: "Transferencia bancaria", value: "Transferencia" },
  ];

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

  const goToAddress = () => {
    navigation.navigate("Address");
  };

  const handleChange = (name, value) => {
    setSale({ ...sale, [name]: value });
  };

  const getConfirmationCode = () => {
    codeAPI
      .createCode({
        UserId: user.id,
        type: "Compra",
        email: user.email,
        name: user.fullName,
      })
      .then((res) => {
        const { message, codeData } = res.data;
        Toast.show({
          type: "success",
          text1: "Código de confirmación",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          const { message } = err.response.data;
          Toast.show({
            type: "error",
            text1: "Error",
            text2: message,
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
            text2: "Ha ocurrido un error",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const verifcateCode = () => {
    if (code === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "El código es obligatorio",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }
    codeAPI
      .verificateBuyCode(user.id, { code })
      .then((res) => {
        setAccountVerification(true);
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Código verificado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          const { message } = err.response.data;
          Toast.show({
            type: "error",
            text1: "Error",
            text2: message,
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
            text2: "Ha ocurrido un error",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const handleTypeDelivery = (name, value) => {
    if (delivery.typeDelivery !== null) {
      if (delivery.typeDelivery !== value) {
        const price = value === "Entrega normal" ? 3.0 : 10.0;
        const surcharge = delivery.surcharge;
        const newTotal = total - surcharge;

        const totalWithSurcharge = newTotal + price;
        setDelivery({ typeDelivery: value, surcharge: price });
        dispatch(setTotal(totalWithSurcharge));
      }
    } else {
      const price = value === "Entrega normal" ? 3.0 : 10.0;
      setDelivery({ typeDelivery: value, surcharge: price });
      dispatch(setTotal(total + price));
    }
  };

  const handleSubmit = () => {
    console.log(sale);
    console.log(delivery);

    console.log(cart);
    console.log(subtotal);
    console.log(total);

    if (sale.typeBuy === "Entrega a Domicilio") {
      const saleData = {
        total,
        typeBuy: sale.typeBuy,
        paymentMethod: sale.paymentMethod,
        UserId: user.id,
        Delivery: {
          typeDelivery: delivery.typeDelivery,
          surchage: delivery.surcharge,
          ResidencyId: residency.id,
        },
        Cart: cart,
      };

      saleAPI
        .createSaleWithDelivery(saleData)
        .then((res) => {
          const { message } = res.data;
          Toast.show({
            type: "success",
            text1: "Compra realizada",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
          dispatch(resetCart());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const saleData = {
        total,
        typeBuy: sale.typeBuy,
        paymentMethod: sale.paymentMethod,
        UserId: user.id,
        Cart: cart,
      };
    }
  };

  useEffect(() => {
    getTotal();
  }, [cart]);

  return (
    <View className="flex-1 bg-[#f5f9ff] flex flex-col">
      {/* Header */}
      <View className="w-full px-5 h-[60px] bg-[#1786f9] flex flex-row items-center justify-between">
        <TouchableOpacity
          className="flex flex-row items-center gap-3"
          onPress={goBack}
        >
          <Octicons name="arrow-left" color={"white"} size={20} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: "white",
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: "white",
          }}
        >
          Confirmar compra
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        {/* Nota */}
        <View className="w-full h-fit bg-green-200 rounded-lg flex flex-row items-center justify-center border border-green-300 px-5 py-3">
          <Text
            className="text-green-900"
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Nota: Por favor, completa las informaciones requeridas para realizar
            la compra.
          </Text>
        </View>

        <View className="flex flex-col mt-5">
          {/* Método de entrega */}

          <View className="flex flex-col gap-2">
            <Text
              className="text-gray-500"
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
              }}
            >
              ¿Cómo desea recibir su compra?
            </Text>
            <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
              <RNPickerSelect
                placeholder={{
                  label: "Seleccione una opción",
                  value: null,
                }}
                style={{
                  inputAndroid: {
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                  },
                  placeholder: {
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                  },
                }}
                onValueChange={(value) => handleChange("typeBuy", value)}
                items={typeBuy}
              />
            </View>
          </View>

          {/* Tipo de entrega a domicilio, solo se muestra si la opcion escogida es de entrega a domicilio */}
          {sale.typeBuy === "Entrega a Domicilio" ? (
            !residency ? (
              // Caso 1: Es entrega a domicilio, pero no hay dirección
              <View className="flex flex-col mt-3">
                <View className="w-full border border-gray-200 h-fit bg-red-100 rounded-lg flex flex-col gap-2 justify-center items-center px-5 py-3">
                  <Text
                    className="text-red-900"
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    Aún no has registrado una dirección de envío. Por favor,
                    agrega una y vuelve a intentarlo
                  </Text>

                  <TouchableOpacity
                    className="w-fit flex flex-row items-center justify-center py-3 bg-gray-100 rounded-full px-5 border border-gray-200 gap-2"
                    onPress={goToAddress}
                  >
                    <Octicons name="location" size={14} color="black" />
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 13,
                      }}
                    >
                      Agregar dirección
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // Caso 2: Es entrega a domicilio y sí hay dirección
              <View className="flex flex-col mt-3">
                {/* Nota */}
                <View className="w-full h-fit bg-red-200 rounded-lg flex flex-row items-center justify-center border border-red-300 px-5 py-3">
                  <Text
                    className="text-red-900"
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    Las entregas a domicilio tienen un recargo adicional que
                    varía según el tipo de entrega
                  </Text>
                </View>

                {/* Tipo de entrega */}
                <View className="flex flex-col gap-2 mt-3">
                  <Text
                    className="text-gray-500"
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                    }}
                  >
                    Tipo de entrega
                  </Text>
                  <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                    <RNPickerSelect
                      placeholder={{
                        label: "Seleccione una opción",
                        value: null,
                      }}
                      style={{
                        inputAndroid: {
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                        },
                        placeholder: {
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                        },
                      }}
                      onValueChange={(value) =>
                        handleTypeDelivery("type", value)
                      }
                      items={typeAddressDelivery}
                    />
                  </View>
                </View>

                {/* Dirección */}
                <View className="flex flex-col gap-2 mt-3">
                  <View className="flex flex-row justify-between items-center">
                    <Text
                      className="text-gray-500"
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 16,
                      }}
                    >
                      Dirección de entrega
                    </Text>
                    <TouchableOpacity
                      className="flex flex-row items-center gap-1"
                      onPress={goToAddress}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          fontSize: 13,
                          color: "#0A192F",
                        }}
                      >
                        Editar
                      </Text>
                      <Octicons name="pencil" size={14} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View className="w-full mt-2 h-fit px-5 py-4 bg-white flex flex-col gap-2 border border-gray-200 rounded-lg">
                    <View className="flex flex-row justify-between items-center">
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 16,
                        }}
                      >
                        Provincia:
                      </Text>

                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                        }}
                      >
                        {residency.province}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between items-center">
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 16,
                        }}
                      >
                        Ciudad:
                      </Text>

                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                        }}
                      >
                        {residency.city}
                      </Text>
                    </View>
                    <View className="flex flex-col justify-between ">
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 16,
                        }}
                      >
                        Calle principal:
                      </Text>

                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                        }}
                      >
                        {residency.mainStreet}
                      </Text>
                    </View>
                    <View className="flex flex-col justify-between ">
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 16,
                        }}
                      >
                        Calle secundaria:
                      </Text>

                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                        }}
                      >
                        {residency.secondaryStreet}
                      </Text>
                    </View>
                    <View className="flex flex-col justify-between ">
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 16,
                        }}
                      >
                        Referencia:
                      </Text>

                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                        }}
                      >
                        {residency.reference}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          ) : null}

          {/* Tipo de pago */}
          <View className="flex flex-col gap-2 mt-3">
            <Text
              className="text-gray-500"
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
              }}
            >
              Forma de pago
            </Text>
            <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
              <RNPickerSelect
                placeholder={{
                  label: "Seleccione una opción",
                  value: null,
                }}
                style={{
                  inputAndroid: {
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                  },
                  placeholder: {
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                  },
                }}
                onValueChange={(value) => handleChange("paymentMethod", value)}
                items={typePayment}
              />
            </View>
          </View>

          {/* Nota que solo aparecerá si la opcion escogida es de pago por transferencia */}
          {sale.paymentMethod == "Transferencia" && (
            <View className="w-full h-fit bg-red-200 rounded-lg flex flex-row items-center justify-center border border-red-300 px-5 py-3 mt-3">
              <Text
                className="text-red-900"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Recuerda que las entregas a domicilio tienen un recargo
                adicional que varía segun el tipo de entrega
              </Text>
            </View>
          )}

          {/* Resumen del pedido */}
          <View className="flex flex-col gap-2 mt-3">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 16,
              }}
            >
              Resumen de la compra
            </Text>
            {cart &&
              cart.Items.map((item, index) => (
                <Item
                  product={item.Product}
                  quantity={item.quantity}
                  key={index}
                  pd={0}
                />
              ))}
          </View>

          <View className="mt-10 flex flex-col">
            <View className="w-full h-fit bg-white border border-gray-200 rounded-lg px-5 py-3">
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Nota: Por tu seguridad, debes solicitar un código de
                verificación antes de confirmar la compra, el código será
                enviado a tu correo registrado.
              </Text>
            </View>

            <View className="flex mt-3 flex-col">
              {/* Caja y boton */}
              <View className="flex flex-row items-center gap-1">
                <TextInput
                  readOnly={accountVerification}
                  className="w-[60%] border border-gray-200 h-[50px] bg-white rounded-lg px-3 "
                  placeholder="Código"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                  }}
                  value={code}
                  onChangeText={(text) => setCode(text)}
                />
                <TouchableOpacity
                  disabled={accountVerification}
                  className="w-[40%] h-full flex flex-row items-center justify-center bg-[#0A192F] rounded-lg"
                  onPress={getConfirmationCode}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    Solicitar
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="w-full  flex flex-row items-center justify-center bg-[#0A192F] rounded-full py-3 mt-5"
                onPress={verifcateCode}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Verificar
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {accountVerification && (
            <TouchableOpacity
              className="mt-10 py-4 rounded-full flex flex-row gap-3 items-center justify-center bg-[#1458b9] disabled:bg-gray-400"
              disabled={!residency}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "white",
                }}
              >
                {"Continuar"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {/* Footer */}
      <View className="h-fit bg-[#2ea4ff] px-10 py-3">
        {/* Subtotal */}
        <View className="flex flex-row items-center justify-between">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
              color: "white",
            }}
          >
            Subtotal
          </Text>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "white",
            }}
          >
            $ {subtotal}
          </Text>
        </View>

        {/* Si hay descuento se mostrará aquí */}
        {offer.isActive && (
          <>
            <View className="flex flex-row items-center justify-between">
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 16,
                  color: "white",
                }}
              >
                Descuento
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "white",
                }}
              >
                {offer.typeValue === "Porcentaje"
                  ? `${parseInt(offer.value)}%`
                  : `$${offer.value}`}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 16,
                  color: "white",
                }}
              >
                Descontado
              </Text>
              <Text
                className="line-through text-gray-500"
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

        {/* Se motrará lo siguiente solo si la entrega es a domicilio */}

        {delivery.typeDelivery !== null && (
          <View className="flex flex-row items-center justify-between">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 16,
                color: "white",
              }}
            >
              {delivery.typeDelivery}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                color: "white",
                fontSize: 16,
              }}
            >
              $ {parseFloat(delivery.surcharge).toFixed(2)}
            </Text>
          </View>
        )}

        <View className="flex flex-row items-center justify-between mt-3">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
              color: "white",
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              color: "white",
              fontSize: 18,
            }}
          >
            $ {total}
          </Text>
        </View>
      </View>
      <Toast position="bottom" />
    </View>
  );
};

export default Checkout;
