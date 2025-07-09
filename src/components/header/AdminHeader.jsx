import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const AdminHeader = ({ toggleShowAside }) => {
  const { user } = useSelector((state) => state.data);

  return (
    <View className="h-[60px] bg-[#0A192F] px-5 flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        {/* Imagen de perfil */}
        <View className="w-[40px] h-[40px] rounded-full bg-white">
          <Image
            source={{
              uri: user?.photo,
            }}
            className="w-full h-full rounded-full"
          />
        </View>
        {/* Nombre */}
        <View className="flex flex-col ml-2">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 17,
              color: "white",
            }}
          >
            {user?.fullName}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "white",
            }}
          >
            {user?.Role?.name}
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
