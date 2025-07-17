import { Entypo, FontAwesome5, Octicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LoginRequired } from "components/index.components";
import { useEffect, useState } from "react";
import { dateUtils } from "../../../utils/index.utils";
import LottieView from "lottie-react-native";
import noData from "assets/animations/no-data.json";
import { appointmentAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { setAppointments } from "../../../redux/slices/data.slice";

const History = () => {
  const dispatch = useDispatch();
  const [appointmentsData, setAppointmentsData] = useState([]);
  const { user, appointments } = useSelector((state) => state.data);

  const getAppointments = () => {
    appointmentAPI.getAppointmentsByUser(user.id).then((res) => {
      const { appointments: appointmentsDB } = res.data;
      dispatch(setAppointments(appointmentsDB));
    });
  };

  const handleDelete = (id) => {
    appointmentAPI
      .deleteAppointment(id)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Cita eliminada",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getAppointments();
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
            text2: "Error al eliminar la cita",
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
    if (appointments) {
      setAppointmentsData(appointments);
    }
  }, [appointments]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#F5F9FF",
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      {user ? (
        <View className="flex flex-col flex-1">
          {/* Cita */}
          {appointments && appointments.length > 0 ? (
            appointments.map((app) => {
              const date = dateUtils.formatDateFromDB(app.date);
              return (
                <View
                  className="w-full h-fit bg-white border border-gray-200 rounded-lg flex flex-col gap-2 overflow-hidden pb-5 mb-5"
                  key={app.id}
                >
                  {/* Titutlo y fecha */}
                  <View className=" flex-col px-5 py-3">
                    <View className="flex flex-row items-center gap-2">
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 17,
                          color: "#0A192F",
                        }}
                      >
                        {app.Service.name} -
                      </Text>
                      <Text
                        className="px-2 py-1 bg-green-800 rounded-full"
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 7,
                          color: "white",
                        }}
                      >
                        {app.status}
                      </Text>
                    </View>
                    <View className="flex flex-row gap-1 items-center mt-2">
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 13,
                        }}
                      >
                        Programada para el:
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Inter_500Medium",
                          fontSize: 13,
                        }}
                      >
                        {date} - {app.time.slice(0, 5)}
                      </Text>
                    </View>
                    <View className="bg-[#F5F9FF] mt-4 px-4 py-3 border border-gray-200 rounded-lg flex flex-col">
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 15,
                        }}
                      >
                        El cliente solicita:
                      </Text>
                      <Text
                        className="text-gray-600"
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 14,
                          textAlign: "justify",
                        }}
                      >
                        {app.description}
                      </Text>
                    </View>
                  </View>
                  <View className="w-full flex flex-col items-center justify-between px-5 gap-2">
                    <TouchableOpacity
                      className="w-full flex-row items-center justify-center bg-[#7f1d1d] gap-2 py-3 rounded-lg"
                      onPress={() => handleDelete(app.id)}
                    >
                      <Octicons name="trash" size={20} color="white" />
                      <Text
                        style={{
                          fontFamily: "Inter_700Bold",
                          fontSize: 17,
                          color: "white",
                        }}
                      >
                        Cancelar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
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
                  Aún no tienes citas agendadas
                </Text>
              </View>
            </View>
          )}
        </View>
      ) : (
        <LoginRequired />
      )}
      <Toast position="top" />
    </ScrollView>
  );
};

export default History;
