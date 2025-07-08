import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const AdminHeader = ({ toggleShowAside }) => {
  return (
    <View className="h-[60px] bg-[#0A192F] px-5 flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        {/* Imagen de perfil */}
        <View className="w-[40px] h-[40px] rounded-full bg-white"></View>
        {/* Nombre */}
        <View className="flex flex-col ml-2">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 17,
              color: "white",
            }}
          >
            User Name
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "white",
            }}
          >
            Administrador
          </Text>
        </View>
      </View>

      {/* Boton del menu */}
      <TouchableOpacity onPress={toggleShowAside}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AdminHeader;
