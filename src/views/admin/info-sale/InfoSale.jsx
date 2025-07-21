import { Feather } from "@expo/vector-icons";
import { use, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { storageUtils } from "../../../utils/index.utils";
import { saleAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { setAllSales } from "store/slices/data.slice";

const InfoSale = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [saleData, setSaleData] = useState({
    status: null,
    observations: null,
  });
  const { currentSale } = useSelector((state) => state.data);

  const typeStatus = [
    { label: "Pendiente", value: "Pendiente" },
    { label: "Pagada", value: "Pagada" },
    { label: "Rechazada", value: "Rechazada" },
  ];

  const getSales = async () => {
    const token = await storageUtils.getItem("token");
    saleAPI.getSales(token).then((res) => {
      const { sales } = res.data;
      dispatch(setAllSales(sales));
    });
  };

  const handleChange = (name, value) => {
    setSaleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");
    const { id } = currentSale.Voucher;

    if (!saleData.status) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar un estado",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    if (saleData.status === "Rechazada" && !saleData.observations) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes ingresar una observación",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    if (saleData.status !== "Rechazada") {
      saleData.observations = null;
    }

    const data = {
      VoucherId: id,
      ...saleData,
    };

    saleAPI
      .updateSale(token, currentSale.id, data)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Información actualizada",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        getSales();
        setTimeout(() => {
          navigation.goBack();
        }, 2500);
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
            text2: err.message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const handleConfirmPayment = async () => {
    const token = await storageUtils.getItem("token");

    saleAPI
      .confirmPayment(token, currentSale.id)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Pago confirmado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getSales();
        setTimeout(() => {
          navigation.goBack();
        }, 2500);
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
            text2: err.message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  useEffect(() => {
    if (currentSale) {
      setSaleData({
        status: currentSale?.status,
        observations: currentSale?.Voucher?.observations,
      });
    }
  }, [currentSale]);

  if (!currentSale) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 18 }}>
          No hay información de la venta.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-[#f5f9ff] flex flex-col"
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            paddingBottom: 40,
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Productos adquiridos */}
          <View className="flex flex-col gap-3 bg-white rounded-xl p-5 shadow-md">
            <View className="flex flex-row items-center gap-2 mb-3">
              <Feather name="shopping-bag" size={22} color="#0A192F" />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 22,
                  color: "#0A192F",
                }}
              >
                Productos adquiridos
              </Text>
            </View>

            {/* Lista de productos */}
            <View className="flex flex-col gap-4">
              {currentSale.SaleDetails.map((item) => (
                <View
                  key={item.id}
                  className="flex flex-row items-center gap-3 border-b border-gray-200 pb-3"
                >
                  {/* Imagen */}
                  <View className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-gray-100 flex justify-center items-center">
                    <Image
                      source={{ uri: item.Product.photo }}
                      className="w-full h-full object-cover"
                      resizeMode="cover"
                    />
                  </View>

                  {/* Detalles */}
                  <View className="flex-1 flex flex-col">
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 16,
                        color: "#0A192F",
                      }}
                    >
                      {item.Product.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 14,
                        color: "#4b5563",
                      }}
                    >
                      Precio unitario: $ {item.Product.price}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 14,
                        color: "#4b5563",
                      }}
                    >
                      Cantidad: {item.quantity || 1}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 14,
                        color: "#0A192F",
                        marginTop: 4,
                      }}
                    >
                      Total: ${" "}
                      {(item.Product.price * (item.quantity || 1)).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Resumen de la compra */}
            <View className="mt-6 border-t border-gray-300 pt-4">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                  marginBottom: 6,
                }}
              >
                Resumen de la compra
              </Text>

              <View className="flex flex-row justify-between mb-2">
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#4b5563",
                  }}
                >
                  Subtotal:
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#4b5563",
                  }}
                >
                  $ {currentSale.subTotal ?? "0.00"}
                </Text>
              </View>

              {currentSale.disccount > 0 && (
                <>
                  <View className="flex flex-row justify-between mb-2">
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                        color: "#4b5563",
                      }}
                    >
                      Descuento ({currentSale.disccountType || "Valor"}):
                    </Text>
                    {currentSale.disccountType === "Porcentaje" ? (
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                          color: "#4b5563",
                        }}
                      >
                        - {parseFloat(currentSale.disccountValue).toFixed(0)} %
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                          color: "#4b5563",
                        }}
                      >
                        - $ {currentSale.disccountValue}
                      </Text>
                    )}
                  </View>
                  <View className="flex flex-row justify-between mb-2">
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                        color: "#4b5563",
                      }}
                    >
                      Valor descuento:
                    </Text>

                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                        color: "#4b5563",
                      }}
                    >
                      - ${" "}
                      {currentSale.disccountType === "Porcentaje"
                        ? (
                            (currentSale.subTotal *
                              currentSale.disccountValue) /
                            100
                          ).toFixed(2)
                        : currentSale.disccountValue}
                    </Text>
                  </View>

                  {currentSale.Delivery && (
                    <View className="flex flex-row justify-between mb-2">
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                          color: "#4b5563",
                        }}
                      >
                        Delivery - ({currentSale.Delivery.typeDelivery}):
                      </Text>

                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 16,
                          color: "#4b5563",
                        }}
                      >
                        $ {currentSale.Delivery.surchage}
                      </Text>
                    </View>
                  )}
                </>
              )}

              <View className="flex flex-row justify-between">
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 18,
                    color: "#0A192F",
                  }}
                >
                  Total:
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 18,
                    color: "#0A192F",
                  }}
                >
                  $ {currentSale.total ?? "0.00"}
                </Text>
              </View>
            </View>
          </View>

          {/* Comprobante */}
          {currentSale.paymentMethod === "Transferencia" ? (
            <View className="flex-1 mt-6 px-5 py-4 bg-white border border-gray-200 rounded-lg">
              <View className="flex flex-row items-center gap-1">
                <Feather name="image" size={20} color="#0A192F" />
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 18,
                    color: "#0A192F",
                  }}
                >
                  Comprobante
                </Text>
              </View>

              {currentSale.Voucher ? (
                <View className="w-full h-fit flex flex-col items-center justify-center mt-5">
                  {/* Comprobante */}
                  <View className="w-full h-[500px] bg-gray-100">
                    <Image
                      source={{
                        uri: currentSale.Voucher.photo,
                      }}
                      className="w-full h-full object-contain"
                      resizeMode="contain"
                    />
                  </View>

                  {/* Estado */}

                  <View className="flex flex-col mt-5 w-full">
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 16,
                        color: "#0A192F",
                        marginBottom: 6,
                      }}
                    >
                      Estado
                    </Text>
                    <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                      <RNPickerSelect
                        value={saleData?.status}
                        placeholder={{
                          label: "Seleccione una opción",
                          value: null,
                        }}
                        onValueChange={(value) => handleChange("status", value)}
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
                        items={typeStatus}
                      />
                    </View>
                  </View>

                  {/* Observacion */}
                  {saleData.status === "Rechazada" && (
                    <View className="flex flex-col mt-5 w-full">
                      <Text
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          fontSize: 16,
                          color: "#0A192F",
                        }}
                      >
                        Observación
                      </Text>

                      <TextInput
                        placeholder="Ingrese una observación"
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                        value={saleData.observations}
                        onChangeText={(value) =>
                          handleChange("observations", value)
                        }
                        className="w-full border border-gray-200 h-[100px] bg-white rounded-lg p-3 text-gray-500 mt-3"
                      />
                    </View>
                  )}

                  <TouchableOpacity
                    className="w-full mt-5 flex flex-row items-center justify-center py-3 bg-[#0A192F] rounded-lg"
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 16,
                        color: "white",
                      }}
                    >
                      Guardar
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="w-full h-[100px] flex flex-row items-center justify-center">
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 16,
                      color: "#0A192F",
                    }}
                  >
                    No hay comprobante adjunto
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View className="flex flex-col mt-5">
              {/* Estado actual */}
              <View className="flex flex-col gap-2">
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: "#0A192F",
                  }}
                >
                  Estado actual
                </Text>
                <View className="w-full bg-gray-100 h-[50px] flex flex-row items-center px-5 border border-gray-200 rounded-xl">
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 16,
                      color: "#0A192F",
                    }}
                  >
                    {currentSale.status}
                  </Text>
                </View>
              </View>
              {/* Nota */}
              <View className="w-full h-fit py-5 flex flex-col justify-center items-center border border-gray-200 rounded-xl px-5 bg-green-300 mt-5">
                <Text
                  className="text-green-700"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  Nota: El cliente seleccionó pagar en efectivo. Por favor
                  cuando se realice el pago, confirme dando click en el botón de
                  abajo.
                </Text>
              </View>

              <TouchableOpacity
                className="mt-3 w-full py-3 flex flex-row items-center justify-center bg-[#0A192F] rounded-lg"
                onPress={handleConfirmPayment}
              >
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Confirmar pago
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tipo de retiro */}
          <View className="flex flex-col mt-6 bg-white border border-gray-200 rounded-lg px-5 py-4">
            {currentSale.typeBuy === "Entrega a Domicilio" ? (
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#0A192F",
                  textAlign: "justify",
                }}
              >
                El cliente ha seleccionado que desearía que su compra se
                entregará a domicilio. Una vez confirmado el pago deberá
                contactarse con el cliente para coordinar la entrega.
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#0A192F",
                  textAlign: "justify",
                }}
              >
                El cliente ha seleccionado que desearía que su compra se retira
                en tienda. El cliente deberá ir a la tienda para retirar su
                compra.
              </Text>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast position="top" />
    </KeyboardAvoidingView>
  );
};

export default InfoSale;
