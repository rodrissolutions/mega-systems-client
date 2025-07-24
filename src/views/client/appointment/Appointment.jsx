import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { LoginRequired } from "components/index.components";
import Toast from "react-native-toast-message";
import { dateUtils } from "../../../utils/index.utils";
import { appointmentAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { setAppointments } from "store/slices/data.slice";
import ListProducts from "../../admin/list-products/ListProducts";

const Appointment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isAvailable, setIsAvailable] = useState(false);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);
  const handleProductName = (name) => setProductName(name);

  const [showProducts, setShowProducts] = useState(false);
  const toggleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const [appointment, setAppointment] = useState({
    description: null,
    date: null,
    time: null,
  });
  const { user, products, service } = useSelector((state) => state.data);
  const [mappedProducts, setMappedProducts] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (!selectedDate || event.type === "dismissed") return;

    if (mode === "date") {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const selected = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );

      if (selected < tomorrow) {
        alert("Selecciona una fecha a partir de mañana");
        return;
      }

      const formatted = dateUtils.formatDate(selected);
      setDate(selected);
      handleChange("date", formatted);
    }

    if (mode === "time") {
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();

      if (hour < 8 || (hour >= 17 && minute > 0)) {
        alert("Selecciona una hora entre 08:00 y 17:00");
        return;
      }

      const timeFormatted = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;

      setDate((prev) => {
        const updated = new Date(prev);
        updated.setHours(hour);
        updated.setMinutes(minute);
        return updated;
      });

      handleChange("time", timeFormatted);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const mapProducts = () => {
    const productsMapped = products.map((product) => ({
      label: product.name,
      value: product.id,
    }));
    setMappedProducts(productsMapped);
  };

  const handleChange = (name, value) => {
    setAppointment({ ...appointment, [name]: value });
  };

  const checkAvailability = () => {
    if (appointment.date && appointment.time) {
      appointmentAPI
        .verifyDisponibility({
          date: appointment.date,
          time: appointment.time,
        })
        .then((res) => {
          const { message } = res.data;
          Toast.show({
            type: "success",
            text1: "Disponibilidad verificada",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
          setIsAvailable(true);
        })
        .catch((err) => {
          setIsAvailable(false);
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
              text2: "Error al verificar disponibilidad",
              text1Style: {
                fontSize: 16,
                fontWeight: "900",
              },
              text2Style: { fontSize: 14 },
            });
          }
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Hora y fecha son obligatorios",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
    }
  };

  const getAppoitments = () => {
    appointmentAPI.getAppointmentsByUser(user.id).then((res) => {
      const { appointments: appointmentsDB } = res.data;
      dispatch(setAppointments(appointmentsDB));
    });
  };

  const handleSubmit = () => {
    if (!isAvailable) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Hora y fecha no disponibles",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    if (Object.values(appointment).includes(null)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Todos los campos son obligatorios",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }
    if (productId !== null) {
      const data = {
        ...appointment,
        UserId: user.id,
        ServiceId: service.id,
        ProductId: productId,
      };

      appointmentAPI
        .createAppointment(data)
        .then((res) => {
          const { message, appointment } = res.data;
          Toast.show({
            type: "success",
            text1: "Cita creada",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
          setAppointment((prev) => ({
            description: null,
            date: null,
            time: null,
          }));
          setIsAvailable(false);
          getAppoitments();
          setTimeout(() => {
            navigation.goBack();
          }, 2500);
        })
        .catch((err) => {
          setIsAvailable(false);
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
              text2: "Error al crear cita",
              text1Style: {
                fontSize: 16,
                fontWeight: "900",
              },
              text2Style: { fontSize: 14 },
            });
          }
        });
    }

    const data = {
      ...appointment,
      UserId: user.id,
      ServiceId: service.id,
    };

    appointmentAPI
      .createAppointment(data)
      .then((res) => {
        const { message, appointment } = res.data;
        Toast.show({
          type: "success",
          text1: "Cita creada",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        setAppointment((prev) => ({
          description: null,
          date: null,
          time: null,
        }));
        setIsAvailable(false);
        getAppoitments();
        setTimeout(() => {
          navigation.goBack();
        }, 2500);
      })
      .catch((err) => {
        setIsAvailable(false);
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
            text2: "Error al crear cita",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  // Fecha base para las restricciones
  const today = new Date();
  const minTime = new Date(today);
  minTime.setHours(8, 0, 0); // 8:00 AM
  const maxTime = new Date(today);
  maxTime.setHours(17, 0, 0); // 5:00 PM

  useEffect(() => {
    mapProducts();
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(8, 0, 0, 0);
  return (
    <View className="flex flex-col flex-1">
      <ScrollView
        className="flex-1 bg-[#F5F9FF] flex flex-col"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
          paddingHorizontal: 20,
        }}
      >
        {user ? (
          <>
            <View className="flex flex-col gap-3  py-10">
              {/* Servicio */}
              <View className="flex flex-col gap-2">
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 18,
                  }}
                >
                  Servicio
                </Text>
                <TextInput
                  value={service?.name}
                  className="border border-gray-200 rounded-lg px-3 bg-white py-4"
                  readOnly
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                  }}
                />
              </View>
              {/* Descripcion */}
              <View className="flex flex-col gap-2">
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 18,
                  }}
                >
                  Descripción
                </Text>

                <TextInput
                  className="w-full h-[200px] bg-white border border-gray-200 rounded-lg px-5 py-4 text-wrap"
                  textAlignVertical="top"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                  }}
                  placeholder="Describe el servicio que deseas adquirir, explicando tus necesidades."
                  onChangeText={(value) => handleChange("description", value)}
                  value={appointment.description}
                />

                {/* Fecha */}
                <View className="flex flex-col gap-2">
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 18,
                    }}
                  >
                    Fecha
                  </Text>
                  <View className="flex flex-row items-center gap-2 h-[50px]">
                    <TextInput
                      readOnly
                      className="flex-1 bg-white border border-gray-200 rounded-lg h-[50px] text-center"
                      placeholder="DD/MM/AAAA"
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                      }}
                      value={appointment.date ? appointment.date : ""}
                    />
                    <TouchableOpacity
                      className="w-[45px] h-[45px] flex flex-row justify-center items-center bg-[#1786f9] rounded-lg"
                      onPressIn={() => showMode("date")}
                    >
                      <Octicons name="calendar" size={20} color={"#fff"} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Hora */}
                <View className="flex flex-col gap-2">
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 18,
                    }}
                  >
                    Hora
                  </Text>
                  <View className="flex flex-row items-center gap-2 h-[50px]">
                    <TextInput
                      readOnly
                      className="flex-1 bg-white border border-gray-200 rounded-lg h-[50px] text-center"
                      placeholder="HH:MM"
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                      }}
                      value={appointment.time ? appointment.time : ""}
                    />
                    <TouchableOpacity
                      className="w-[45px] h-[45px] flex flex-row justify-center items-center bg-[#1786f9] rounded-lg"
                      onPressIn={() => showMode("time")}
                    >
                      <Octicons name="clock" size={20} color={"#fff"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                className="flex flex-row items-center justify-center gap-2 py-4 w-full rounded-lg bg-[#1458b9]"
                onPress={() => checkAvailability()}
              >
                <MaterialIcons
                  name="event-available"
                  size={20}
                  color={"white"}
                />
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Verificar disponibilidad
                </Text>
              </TouchableOpacity>

              {/* Producto */}
              <View className="flex flex-col gap-2 mt-3">
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 18 }}>
                  Producto
                </Text>

                <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                  <TouchableOpacity
                    className="px-3"
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 8,
                      backgroundColor: "white",
                      height: 50,
                      justifyContent: "center",
                    }}
                    onPress={toggleShowProducts}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 16,
                        color: "black",
                      }}
                    >
                      {productName || "Seleccionar un producto"}
                    </Text>
                  </TouchableOpacity>

                  <Text
                    className="text-gray-400 px-2 mt-1"
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                    }}
                  >
                    Nota: Si no adquiriste tu producto en la empresa, deja este
                    campo en blanco
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                className="mt-14 flex flex-row items-center justify-center gap-2 py-4 w-full rounded-lg bg-[#1458b9] disabled:bg-gray-400"
                disabled={!isAvailable}
                onPress={handleSubmit}
              >
                {!isAvailable ? (
                  <Text
                    style={{
                      fontFamily: "Inter_700Bold",
                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    Chequear disponibilidad
                  </Text>
                ) : (
                  <>
                    <MaterialIcons name="save" size={20} color={"white"} />
                    <Text
                      style={{
                        fontFamily: "Inter_700Bold",
                        fontSize: 18,
                        color: "white",
                      }}
                    >
                      Generar cita
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                minimumDate={mode === "date" ? tomorrow : undefined}
                onChange={onChange}
              />
            )}
          </>
        ) : (
          <LoginRequired />
        )}
      </ScrollView>
      <Toast position="top" />
      <ListProducts
        visible={showProducts}
        onClose={toggleShowProducts}
        handleChange={handleChange}
        handleProductName={handleProductName}
      />
    </View>
  );
};

export default Appointment;
