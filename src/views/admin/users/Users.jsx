import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AdminLayout from "layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import InfoUser from "../info-user/InfoUser";
import { setCurrentUser } from "../../../redux/slices/data.slice";
import { useNavigation } from "@react-navigation/native";

const Users = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { users, user: userRedux } = useSelector((state) => state.data);

  const viewInfoUser = (current) => {
    dispatch(setCurrentUser(current));
    navigation.navigate("InfoUser");
  };

  const renderUserCard = (user) => {
    const isCurrentUser = userRedux.id === user.id;
    return (
      <View
        key={user.id}
        className="flex flex-row items-center gap-4 mb-3 rounded-xl p-4"
        style={{
          backgroundColor: isCurrentUser ? "#E0F2FE" : "#ffffff",
          borderColor: "#d1d5db",
          borderWidth: 1,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        {/* Imagen de Perfil */}
        <View
          className="w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-100"
          style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}
        >
          <Image
            source={{ uri: user.photo }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 17,
              color: "#111827",
            }}
          >
            {user.fullName}
            {isCurrentUser && (
              <Text style={{ color: "#2563eb", fontSize: 15 }}> (Tú)</Text>
            )}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            {user.email}
          </Text>
        </View>

        {!isCurrentUser && (
          <TouchableOpacity
            className="flex flex-row items-center justify-center w-[50px]  h-full"
            onPress={() => viewInfoUser(user)}
          >
            <Octicons name="three-bars" size={20} color={"#4b5563"} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <AdminLayout>
      <View className="flex flex-col gap-2">
        {/* Buscador */}
        <View className="px-5 py-5">
          <View className="flex flex-row items-center bg-white border border-gray-200 rounded-xl h-[50px] shadow-sm">
            {/* Icono */}
            <View className="w-[50px] flex flex-row items-center justify-center h-full">
              <Octicons name="search" size={20} color={"#4b5563"} />
            </View>

            <TextInput
              autoComplete="off"
              autoCapitalize="none"
              placeholder="Buscar usuarios..."
              className="flex-1 bg-white outline-none px-1"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#374151",
              }}
            />
          </View>
        </View>

        {/* Lista de usuarios */}
        <ScrollView
          className="flex-1 bg-[#F9FAFB]"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >
          {[...users]
            .sort((a, b) =>
              a.id === userRedux.id ? -1 : b.id === userRedux.id ? 1 : 0
            )
            .map((usr) => renderUserCard(usr))}
        </ScrollView>
      </View>
    </AdminLayout>
  );
};

export default Users;
