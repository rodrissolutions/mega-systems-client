import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { Octicons, Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import scheduleAPI from "../../../api/schedule/schedule.api";
import { setSchedules } from "store/slices/data.slice";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { storageUtils } from "../../../utils/index.utils";
import ListDays from "../list-days/ListDays";

const Schedule = () => {
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.data);
  const [schedulesData, setSchedulesData] = useState([]);
  const [form, setForm] = useState({
    day: "",
    openingHour: "",
    closingHour: "",
    isWorking: true,
  });

  const [showDay, setShowDay] = useState(false);
  const toggleShowDays = () => setShowDay(!showDay);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [timeField, setTimeField] = useState(null); // 'opening' or 'closing'

  const getSchedules = () => {
    scheduleAPI.listAll().then((res) => {
      const { schedules: schedulesDB } = res.data;
      dispatch(setSchedules(schedulesDB));
    });
  };

  const handleChangeTime = (event, selectedDate) => {
    setShow(false);
    if (event.type === "dismissed" || !selectedDate) return;

    const hour = selectedDate.getHours();
    const minute = selectedDate.getMinutes();
    const formatted = `${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}`;

    if (timeField === "opening") {
      setForm({ ...form, openingHour: formatted });
    } else if (timeField === "closing") {
      const [openH, openM] = form.openingHour.split(":").map(Number);

      const openMinutes = openH * 60 + openM;
      const selectedMinutes = hour * 60 + minute;

      if (form.openingHour && selectedMinutes <= openMinutes) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "La hora de cierre debe ser posterior a la de apertura",
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        return;
      }

      setForm({ ...form, closingHour: formatted });
    }
  };

  const handleAdd = async () => {
    if (!form.day || !form.openingHour || !form.closingHour) {
      Toast.show({
        type: "error",
        text1: "Campos obligatorios",
        text2: "Todos los campos son obligatorios",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    const token = await storageUtils.getItem("token");

    scheduleAPI
      .newSchedule(token, form)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Horario creado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        getSchedules();
        setForm({ day: "", openingHour: "", closingHour: "", isWorking: true });
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

  const handleDay = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleDelete = async (id) => {
    const token = await storageUtils.getItem("token");

    scheduleAPI
      .deleteSchedule(token, id)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Horario eliminado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getSchedules();
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

  useEffect(() => {
    if (schedules) {
      setSchedulesData(schedules);
    }
  }, [schedules]);

  return (
    <View className="flex-1 p-5">
      {/* Nota informativa */}
      <View className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: "#1e3a8a",
          }}
        >
          Añade los horarios de atención para que los clientes puedan saber
          cuándo pueden agendar citas o retirar productos.
        </Text>
      </View>

      {/* Formulario */}
      <View className="mb-5 bg-white p-4 rounded-xl border border-gray-200">
        <Text
          className="mb-2"
          style={{ fontFamily: "Inter_600SemiBold", fontSize: 16 }}
        >
          Agregar horario
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
          onPress={toggleShowDays}
        >
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: "black",
            }}
          >
            {form.day || "Selecciona un día"}
          </Text>
        </TouchableOpacity>

        {/* Horas */}
        <View className="flex-row gap-3 mt-3">
          {/* Hora de apertura */}
          <TouchableOpacity
            className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-3 justify-center"
            onPress={() => {
              setShow(true);
              setTimeField("opening");
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#505050",
              }}
            >
              {form.openingHour || "Hora de apertura"}
            </Text>
          </TouchableOpacity>

          {/* Hora de cierre */}
          <TouchableOpacity
            className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-3 justify-center"
            onPress={() => {
              setShow(true);
              setTimeField("closing");
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#505050",
              }}
            >
              {form.closingHour || "Hora de cierre"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Día laboral */}
        <View className="flex-row items-center mt-3">
          <Switch
            value={form.isWorking}
            onValueChange={(value) => setForm({ ...form, isWorking: value })}
          />
          <Text
            className="ml-2"
            style={{ fontFamily: "Inter_400Regular", fontSize: 14 }}
          >
            ¿Se trabaja este día?
          </Text>
        </View>

        {/* Botón agregar */}
        <TouchableOpacity
          onPress={handleAdd}
          className="mt-4 bg-blue-600 px-4 py-2 rounded-xl"
        >
          <Text
            className="text-white text-center"
            style={{ fontFamily: "Inter_600SemiBold", fontSize: 14 }}
          >
            Agregar horario
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de horarios */}
      <ScrollView>
        {schedulesData.length === 0 ? (
          <View className="mt-10 items-center">
            <Octicons name="calendar" size={40} color="#ccc" />
            <Text
              className="mt-3 text-gray-500"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              No hay horarios agregados aún.
            </Text>
          </View>
        ) : (
          schedulesData.map((item) => (
            <View
              key={item.day}
              className="mb-3 p-4 bg-white rounded-xl border border-gray-200 flex-row justify-between items-center"
            >
              <View>
                <Text
                  className="text-base text-gray-800"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  {item.day}
                </Text>
                <Text
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  {item.openingHour} - {item.closingHour}
                </Text>
                <Text
                  className="text-sm"
                  style={{
                    fontFamily: "Inter_400Regular",
                    color: item.isWorking ? "#16a34a" : "#dc2626",
                  }}
                >
                  {item.isWorking ? "Día laboral" : "No se trabaja"}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Feather name="trash-2" size={20} color="#dc2626" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <Toast position="top" />
      <ListDays
        visible={showDay}
        onClose={toggleShowDays}
        handleChange={handleDay}
      />
      {/* Picker de hora */}
      {show && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleChangeTime}
        />
      )}
    </View>
  );
};

export default Schedule;
