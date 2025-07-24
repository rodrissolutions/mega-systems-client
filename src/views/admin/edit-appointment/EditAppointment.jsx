import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { dateUtils } from "../../../utils/index.utils";
import { Feather, Octicons } from "@expo/vector-icons";
import ListTechs from "../../../modal/list-techs/ListTechs";
import ListTypeStatus from "../../../modal/type-status/TypeStatus";

const EditAppointment = () => {
  const [technicians, setTechnicians] = useState([]);
  const [appointmentData, setAppointmentData] = useState({});
  const { appointment, users } = useSelector((state) => state.data);

  const [showTypeStatus, setShowTypeStatus] = useState(false);
  const [showTechs, setShowTechs] = useState(false);

  const toggleShowTypeStatus = () => {
    setShowTypeStatus(!showTypeStatus);
  };

  const toggleShowTechs = () => {
    setShowTechs(!showTechs);
  };

  const handleTechName = (name) => {
    setTechName(name);
  };

  const handleChange = (name, value) => {
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
    if (name === "TechnicianId") {
      const tech = users.find((usr) => usr.id === value);
      setAppointmentData((prev) => ({ ...prev, Technician: tech }));
    }
  };

  const handleSubmit = () => {
    const { Client, Technician, Product, Service, ...rest } = appointmentData;
  };

  useEffect(() => {
    if (appointment) {
      setAppointmentData(appointment);
    }
  }, [appointment]);
  return (
    <ScrollView
      className="flex-1 bg-[#F5F9FF] flex flex-col"
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
      }}
    >
      {/* Servicio requerido */}
      <View className="flex flex-col mb-5 gap-2">
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: "#0A192F",
          }}
        >
          Servicio requerido
        </Text>

        <View className="w-full h-[50px] bg-white border border-gray-200 rounded-lg flex flex-row items-center px-3">
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
            }}
          >
            {appointmentData?.Service?.name}
          </Text>
        </View>
      </View>

      {/* Descripción del problema */}
      <View className="flex flex-col mb-5 gap-2">
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: "#0A192F",
          }}
        >
          Descripción
        </Text>

        <View className="w-full h-[150px] bg-white border border-gray-200 rounded-lg flex flex-row  px-3 py-2">
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              textAlign: "justify",
            }}
          >
            {appointmentData?.description}
          </Text>
        </View>
      </View>

      {/* Producto */}
      <View className="flex flex-col mb-5 gap-2">
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: "#0A192F",
          }}
        >
          Producto
        </Text>
        {appointmentData?.Product ? (
          <View className="flex flex-col">
            {/* Imagen del producto */}
            <View className="w-full h-[200px] bg-white border border-gray-200 rounded-xl relative">
              <Image
                source={{
                  uri: appointmentData?.Product?.photo,
                }}
                className="absolute w-full h-full object-cover"
                resizeMode="cover"
              />
            </View>

            {/* Nombre del producto */}
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {appointmentData?.Product?.name}
            </Text>
          </View>
        ) : (
          <View className="w-full h-fit bg-green-300 rounded-xl flex flex-row items-center justify-center px-3 py-5">
            <Text
              className="text-green-900"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              El cliente ha especificado que el producto no fue adquirido en la
              tienda.
            </Text>
          </View>
        )}
      </View>

      {/* Fecha y hora de la cita */}

      <View className="flex flex-col mb-5 gap-2">
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: "#0A192F",
          }}
        >
          Fecha y hora
        </Text>

        <View className="flex flex-row items-center justify-between gap-2">
          <View className="flex flex-row items-center h-[50px] w-[50%] bg-white border border-gray-200 rounded-xl justify-center">
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {dateUtils.formatDateFromDB(appointmentData?.date)}
            </Text>
          </View>

          <View className="flex flex-row items-center h-[50px] w-[50%] bg-white border border-gray-200 rounded-xl justify-center">
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {appointmentData?.time}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-col gap-2 mb-5">
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: "#0A192F",
          }}
        >
          Ténico asignado
        </Text>

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
          onPress={toggleShowTechs}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: "black",
            }}
          >
            {appointmentData?.Technician?.fullName || "Seleccionar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-col gap-2 mb-5">
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: "#0A192F",
          }}
        >
          Estado
        </Text>

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
          onPress={toggleShowTypeStatus}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: "black",
            }}
          >
            {appointmentData?.status
              ? "Realizada"
              : "Pendiente" || "Seleccionar"}
          </Text>
        </TouchableOpacity>
      </View>

      {appointmentData.TechnicianId ? (
        <View className="flex flex-col gap-2 mb-5">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: "#0A192F",
            }}
          >
            Información del ténico asignado
          </Text>

          <View className="w-full mt-5 flex flex-col">
            {/* Foto del técnico */}
            <View className="w-[150px] h-[150px] rounded-full bg-gray-100 border border-gray-200 mx-auto">
              <Image
                source={{
                  uri: appointmentData?.Technician?.photo,
                }}
                className="w-full h-full rounded-full object-cover"
                resizeMode="cover"
              />
            </View>

            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                textAlign: "center",
                marginTop: 10,
                color: "#0A192F",
              }}
            >
              {appointmentData?.Technician?.fullName}
            </Text>
          </View>

          <TouchableOpacity
            className="w-full mt-5 flex flex-row items-center justify-center py-4 bg-[#0A192F] rounded-xl gap-2"
            onPress={handleSubmit}
          >
            <Feather name="save" size={20} color={"white"} />
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
        <View className="w-full mt-5 bg-red-300 rounded-xl flex flex-row items-center justify-center px-3 py-5 border border-red-500">
          <Text
            className="text-red-900"
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Debes asignar un ténico a la cita
          </Text>
        </View>
      )}

      <ListTechs
        visible={showTechs}
        onClose={toggleShowTechs}
        handleChange={handleChange}
      />
      <ListTypeStatus
        visible={showTypeStatus}
        onClose={toggleShowTypeStatus}
        handleChange={handleChange}
      />
    </ScrollView>
  );
};

export default EditAppointment;
