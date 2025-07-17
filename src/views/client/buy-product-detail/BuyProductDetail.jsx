import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import laptop from "assets/laptop.png";
import { useEffect, useState } from "react";
import { Feather, Octicons } from "@expo/vector-icons";
import { pickerUtils } from "utils/index.utils";
import { useDispatch, useSelector } from "react-redux";
import { saleAPI, voucherAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { setBuy, setBuys } from "../../../redux/slices/data.slice";

const BuyProductDetail = () => {
  const dispatch = useDispatch();
  const { buy, user } = useSelector((state) => state.data);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      setImageUri(uri);
    }
  };

  const getSales = () => {
    const { id } = buy;

    saleAPI.getByUser("", user.id).then((res) => {
      const { sales } = res.data;
      dispatch(setBuys(sales));

      const buyFound = sales.find((sale) => sale.id === id);
      if (buyFound) {
        dispatch(setBuy(buyFound));
      }
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (!imageUri) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar una imagen",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    formData.append("photo", {
      uri: imageUri,
      type: "image/jpeg",
      name: `voucher-compra${buy.code}.jpg`,
    });
    formData.append("SaleId", buy.id);

    voucherAPI
      .saveVoucher(formData)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Comprobante de compra",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        getSales();
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
            text2: "Ocurrio un error",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const handleDeleteVoucher = async () => {
    try {
      await voucherAPI.deleteVoucher(buy.Voucher.id);
      Toast.show({
        type: "success",
        text1: "Comprobante eliminado",
        text2: "Has eliminado el comprobante correctamente",
      });
      setImageUri(null);
      setIsSwitchOn(false);
      getSales();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo eliminar el comprobante",
      });
    }
  };

  const handleChangeVoucher = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      const formData = new FormData();
      formData.append("photo", {
        uri,
        type: "image/jpeg",
        name: `voucher-actualizado-${buy.code}.jpg`,
      });
      formData.append("SaleId", buy.id);

      try {
        await voucherAPI.updateVoucher(buy.Voucher.id, formData);
        Toast.show({
          type: "success",
          text1: "Comprobante actualizado",
          text2: "Tu comprobante ha sido reemplazado correctamente",
        });
        getSales();
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo actualizar el comprobante",
        });
      }
    }
  };

  return (
    <ScrollView
      className="flex"
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#F5F9FF",
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        #{buy?.code}
      </Text>

      {/* Tabla */}
      <View className="mt-5 flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white">
        {/* Header */}
        <View className="flex flex-row bg-gray-800 h-[50px]">
          {/* Imagen */}
          <View className="w-[20%] h-full border-r border-gray-500"></View>
          {/* Nombre del producto */}
          <View className="w-[40%] h-full border-r border-gray-500 flex flex-row items-center justify-center">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#fff",
              }}
            >
              Producto
            </Text>
          </View>

          <View className="w-[15%] h-full border-r border-gray-500 flex flex-row items-center justify-center">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#fff",
              }}
            >
              #
            </Text>
          </View>
          <View className="w-[25%] h-full  flex flex-row items-center justify-center">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#fff",
              }}
            >
              $
            </Text>
          </View>
        </View>

        {/* Body */}
        <View className="flex flex-col">
          {buy?.SaleDetails.map((sld) => (
            <View className="flex flex-row h-fit border-b border-gray-200">
              {/* Imagen */}
              <View className="w-[20%] h-full  flex flex-row items-center justify-center">
                <Image
                  source={{
                    uri: sld.Product.photo,
                  }}
                  className="w-[40px] h-[40px]"
                />
              </View>

              <View className="w-[40%] h-full  flex flex-row items-center justify-center px-3 py-3">
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: "#0A192F",
                    textAlign: "center",
                  }}
                >
                  {sld.Product.name}
                </Text>
              </View>

              <View className="w-[15%] h-full  flex flex-row items-center justify-center">
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 14,
                    color: "#0A192F",
                  }}
                >
                  {sld.quantity}
                </Text>
              </View>

              <View className="w-[25%] h-full flex flex-row items-center justify-center">
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 14,
                    color: "#0A192F",
                  }}
                >
                  ${sld.Product.price}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View className="flex flex-row h-[50px] bg-gray-700">
          <View className="w-[75%] h-full flex flex-row items-center justify-center border-r border-gray-600">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#fff",
              }}
            >
              Total
            </Text>
          </View>

          <View className="w-[25%] h-full flex flex-row items-center justify-center">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#fff",
              }}
            >
              $ {buy.total}
            </Text>
          </View>
        </View>
      </View>

      {buy?.paymentMethod === "Transferencia" ? (
        !buy?.Voucher ? (
          // ✅ Si no hay comprobante y es transferencia
          <View className="flex flex-col mt-10 gap-3">
            <View className="flex flex-row items-center gap-2">
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 18,
                }}
              >
                Adjuntar comprobante
              </Text>

              <Switch
                value={isSwitchOn}
                onValueChange={(value) => setIsSwitchOn(value)}
                trackColor={{
                  false: "#767577",
                  true: "#81b0ff",
                }}
                thumbColor={isSwitchOn ? "#f4f3f4" : "#f4f3f4"}
              />
            </View>

            {isSwitchOn ? (
              <>
                <TouchableOpacity
                  className="w-full h-[620px] bg-white rounded-lg flex flex-col items-center justify-center gap-2"
                  onPress={!imageUri ? pickImage : () => {}}
                >
                  {!imageUri ? (
                    <>
                      <Feather name="camera" size={50} color={"#e5e7eb"} />
                      <Text
                        className="text-gray-400"
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 20,
                        }}
                      >
                        Adjuntar comprobante de pago
                      </Text>
                    </>
                  ) : (
                    <Image
                      source={{ uri: imageUri }}
                      className="w-full h-full absolute object-cover"
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>

                {imageUri && (
                  <>
                    <View className="mt-2 flex flex-row items-center justify-between">
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 16,
                        }}
                      >
                        Estado del comprobante
                      </Text>
                      <Text
                        className="px-2 py-1 text-white bg-gray-400 rounded-full"
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 11,
                        }}
                      >
                        Pendiente
                      </Text>
                    </View>
                    <TouchableOpacity
                      className="w-full flex flex-row items-center justify-center gap-2 py-3 bg-[#1786f9] rounded-lg"
                      onPress={handleSubmit}
                    >
                      <Octicons name="upload" size={20} color={"white"} />
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 18,
                          color: "#fff",
                        }}
                      >
                        Subir
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            ) : (
              <View className="w-full h-fit bg-white rounded-lg border border-gray-200 flex flex-row items-center justify-center px-5 py-5">
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  {buy.typeBuy === "Entrega a Domicilio"
                    ? "Su pedido no será enviado hasta confirmar la transferencia. Seleccione adjuntar comprobante para enviar el comprobante de pago."
                    : "Seleccione adjuntar comprobante para enviar el comprobante de pago y poder acercarse a la tienda con el código de compra para retirar sus productos."}
                </Text>
              </View>
            )}
          </View>
        ) : (
          // ✅ Si ya hay voucher cargado
          <View className="flex flex-col mt-10 gap-3 bg-white px-5 py-5 rounded-lg border border-gray-200 ">
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              Ya has subido un comprobante de pago.
            </Text>

            <Image
              source={{ uri: buy.Voucher.photo }}
              className="w-full h-[600px] rounded-lg object-cover"
              resizeMode="contain"
            />

            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#4B5563",
              }}
            >
              Estado: {buy.Voucher.status}
            </Text>

            {["Pendiente", "Rechazada"].includes(buy.Voucher.status) && (
              <View className="flex flex-col gap-3 justify-between mt-3">
                {buy.Voucher.status === "Rechazada" &&
                  buy.Voucher.observations && (
                    <View className="p-3 bg-red-100 border border-red-400 rounded-lg">
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 14,
                          color: "#991b1b",
                        }}
                      >
                        Motivo del rechazo: {buy.Voucher.observations}
                      </Text>
                    </View>
                  )}

                <View className="flex flex-row gap-3">
                  <TouchableOpacity
                    className="flex-1 py-3 rounded-lg border border-red-500"
                    onPress={handleDeleteVoucher}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_700Bold",
                        textAlign: "center",
                        color: "#DC2626",
                      }}
                    >
                      Eliminar comprobante
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 py-3 rounded-lg bg-[#1786f9]"
                    onPress={handleChangeVoucher}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_700Bold",
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      Cambiar comprobante
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )
      ) : (
        // ✅ Si el método de pago NO es transferencia
        <View className="flex flex-col mt-10 gap-3 bg-white px-5 py-5 rounded-lg border border-gray-200">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#0A192F",
            }}
          >
            El pago se realizará en caja. No es necesario subir comprobante.
          </Text>
        </View>
      )}
      <Toast position="bottom" />
    </ScrollView>
  );
};

export default BuyProductDetail;
