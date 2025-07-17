import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AdminLayout from "../../../layouts/AdminLayout";
import { Entypo, Octicons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setAppointment } from "../../../redux/slices/data.slice";
import { dateUtils } from "../../../utils/index.utils";

const Appointments = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { allAppointments } = useSelector((state) => state.data);
  const [search, setSearch] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const infoAppointment = (current) => {
    dispatch(setAppointment(current));
    navigation.navigate("EditAppointment");
  };

  useEffect(() => {
    if (allAppointments) {
      setFilteredAppointments(allAppointments);
    }
  }, [allAppointments]);

  // Función para filtrar las citas según búsqueda
  const handleSearch = (text) => {
    setSearch(text);

    if (!allAppointments) return;

    const filtered = allAppointments.filter((a) => {
      const clientName = a.Client?.fullName?.toLowerCase() || "";
      const serviceName = a.Service?.name?.toLowerCase() || "";
      const technicianName = a.Technician?.fullName?.toLowerCase() || "";
      const dateStr = new Date(a.date).toLocaleDateString();

      const searchText = text.toLowerCase();

      return (
        clientName.includes(searchText) ||
        serviceName.includes(searchText) ||
        technicianName.includes(searchText) ||
        dateStr.includes(searchText)
      );
    });

    setFilteredAppointments(filtered);
  };

  return (
    <AdminLayout>
      <View className="flex-1 bg-[#F5F9FF]">
        {/* Buscador */}
        <View className="px-5 py-4 border-b border-gray-200 bg-white">
          <View className="flex flex-row items-center gap-2 mb-3">
            <View className="flex-1 flex flex-row items-center h-[48px] bg-white border border-gray-200 rounded-xl px-3">
              <Octicons name="search" size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Buscar por cliente, servicio, técnico o fecha"
                className="flex-1 ml-2"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
                value={search}
                onChangeText={handleSearch}
                clearButtonMode="while-editing"
              />
            </View>
          </View>
        </View>

        {/* Lista de citas */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 40,
            flexGrow: 1,
            paddingHorizontal: 20,
          }}
        >
          {!filteredAppointments || filteredAppointments.length === 0 ? (
            <View className="mt-32 items-center">
              <Entypo name="calendar" size={48} color="#D1D5DB" />
              <Text
                className="mt-4 text-gray-400 text-center"
                style={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
              >
                No hay citas programadas.
              </Text>
            </View>
          ) : (
            filteredAppointments.map((a) => {
              const dateFormatted = dateUtils.formatDate(new Date(a.date));
              const timeFormatted = a.time.slice(0, 5); // HH:MM

              return (
                <TouchableOpacity
                  onPress={() => infoAppointment(a)}
                  key={a.id}
                  className="mb-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                >
                  {/* Cliente + Servicio + Técnico */}
                  <View className="flex flex-row justify-between mb-3">
                    {/* Cliente */}
                    <View className="flex flex-row items-center gap-3 flex-1">
                      <Image
                        source={{
                          uri:
                            a.Client?.photo ||
                            "https://via.placeholder.com/100",
                        }}
                        className="w-12 h-12 rounded-full bg-gray-200"
                      />
                      <View className="flex-1">
                        <Text
                          className="text-base text-gray-800"
                          style={{ fontFamily: "Inter_600SemiBold" }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {a.Client?.fullName || "Cliente Anónimo"}
                        </Text>
                        <Text
                          className="text-sm text-gray-500"
                          style={{ fontFamily: "Inter_400Regular" }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Servicio: {a.Service?.name || "N/A"}
                        </Text>
                        <Text
                          className="text-sm text-gray-500"
                          style={{ fontFamily: "Inter_400Regular" }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          Técnico: {a.Technician?.fullName || "Sin asignar"}
                        </Text>
                      </View>
                    </View>

                    {/* Estado */}
                    <View className="flex flex-col items-end justify-center ml-3">
                      {(() => {
                        switch (a.status) {
                          case "Pendiente":
                            return (
                              <View className="flex flex-row items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                                <MaterialIcons
                                  name="pending-actions"
                                  size={18}
                                  color="#ca8a04"
                                />
                                <Text
                                  className="text-yellow-700 text-xs font-semibold"
                                  style={{ fontFamily: "Inter_600SemiBold" }}
                                >
                                  Pendiente
                                </Text>
                              </View>
                            );

                          case "En proceso":
                            return (
                              <View className="flex flex-row items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                                <MaterialIcons
                                  name="build-circle"
                                  size={18}
                                  color="#2563eb"
                                />
                                <Text
                                  className="text-blue-700 text-xs font-semibold"
                                  style={{ fontFamily: "Inter_600SemiBold" }}
                                >
                                  En proceso
                                </Text>
                              </View>
                            );

                          case "Terminada":
                            return (
                              <View className="flex flex-row items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                                <MaterialIcons
                                  name="check-circle"
                                  size={18}
                                  color="#16a34a"
                                />
                                <Text
                                  className="text-green-700 text-xs font-semibold"
                                  style={{ fontFamily: "Inter_600SemiBold" }}
                                >
                                  Terminada
                                </Text>
                              </View>
                            );

                          case "Cancelada":
                            return (
                              <View className="flex flex-row items-center gap-1 bg-red-100 px-2 py-1 rounded-full">
                                <MaterialIcons
                                  name="cancel"
                                  size={18}
                                  color="#dc2626"
                                />
                                <Text
                                  className="text-red-700 text-xs font-semibold"
                                  style={{ fontFamily: "Inter_600SemiBold" }}
                                >
                                  Cancelada
                                </Text>
                              </View>
                            );

                          default:
                            return null;
                        }
                      })()}
                    </View>
                  </View>

                  {/* Fecha y Hora */}
                  <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-1">
                      <Octicons name="calendar" size={18} color="#6b7280" />
                      <Text
                        className="text-gray-700"
                        style={{ fontFamily: "Inter_400Regular", fontSize: 14 }}
                      >
                        {dateFormatted}
                      </Text>
                    </View>

                    <View className="flex flex-row items-center gap-1">
                      <Octicons name="clock" size={18} color="#6b7280" />
                      <Text
                        className="text-gray-700"
                        style={{ fontFamily: "Inter_400Regular", fontSize: 14 }}
                      >
                        {timeFormatted}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </AdminLayout>
  );
};

export default Appointments;
