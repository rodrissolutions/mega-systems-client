import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

const InfoSale = () => {
  const [status, setStatus] = useState(null);
  const [showObservation, setShowObservation] = useState(false);
  const { currentSale } = useSelector((state) => state.data);

  const typeStatus = [
    { label: "Pendiente", value: "Pendiente" },
    { label: "Pagada", value: "Pagada" },
    { label: "Rechazada", value: "Rechazada" },
  ];

  const handleStatus = (value) => {
    setStatus(value);
    setShowObservation(value === "Rechazada");
  };

  useEffect(() => {
    console.log(currentSale);
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
    <ScrollView
      className="flex-1 bg-[#f9fafb]"
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
      }}
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
                  Valor descontado
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#4b5563",
                  }}
                >
                  - $ {currentSale.disccount}
                </Text>
              </View>
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
      {currentSale.paymentMethod !== "Transferencia" && (
        <View className="mt-6 px-5 py-4 bg-white">
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

          {!currentSale.Voucher ? (
            <View className="w-full h-fit flex flex-col items-center justify-center mt-5">
              {/* Comprobante */}
              <View className="w-full h-[500px] bg-gray-100">
                {/* <Image source={{
                    uri: currentSale.Voucher.photo
                }}
                className="w-full h-full object-contain"
                resizeMode="contain"
                /> */}
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
                    placeholder={{
                      label: "Seleccione una opción",
                      value: null,
                    }}
                    value={currentSale?.status}
                    onValueChange={(value) => handleStatus(value)}
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
              {showObservation && (
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
                    // value={observation}
                    // onChangeText={(value) => setObservation(value)}
                    className="w-full border border-gray-200 h-[100px] bg-white rounded-lg p-3 text-gray-500 mt-3"
                  />
                </View>
              )}

              <TouchableOpacity className="w-full mt-5 flex flex-row items-center justify-center py-3 bg-[#0A192F] rounded-lg">
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
              <Text>No hay comprobante adjunto</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default InfoSale;
