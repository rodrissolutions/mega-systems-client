import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/data.slice";
import storageUtil from "../../utils/storage/storage.util";
import { storageUtils } from "../../utils/index.utils";

const Aside = ({ toggleShowAside }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedOption, setSelectedOption] = useState(route.name);
  const { user } = useSelector((state) => state.data);

  const menuItems = [
    {
      name: "Dashboard",
      link: "Home",
      icon: <MaterialIcons name="dashboard" size={18} color={"#4b5563"} />,
    },
    {
      name: "Usuarios",
      link: "MainUsers",
      icon: <FontAwesome5 name="users" size={18} color={"#4b5563"} />,
    },
    {
      name: "Productos",
      link: "MainProducts",
      icon: <FontAwesome5 name="boxes" size={18} color={"#4b5563"} />,
    },
    {
      name: "Servicios",
      link: "MainServices",
      icon: <MaterialCommunityIcons name="tools" size={18} color={"#4b5563"} />,
    },
    {
      name: "Categorías",
      link: "MainCategories",
      icon: <MaterialIcons name="category" size={18} color={"#4b5563"} />,
    },
    {
      name: "Ventas",
      link: "MainSales",
      icon: <AntDesign name="tags" size={18} color={"#4b5563"} />,
    },
    {
      name: "Citas",
      link: "MainAppointments",
      icon: <Entypo name="calendar" size={18} color={"#4b5563"} />,
    },
    {
      name: "Comentarios",
      link: "Comments",
      icon: <FontAwesome name="comments" size={18} color={"#4b5563"} />,
    },
    {
      name: "Ofertas",
      link: "MainOffers",
      icon: <MaterialIcons name="local-offer" size={18} color={"#4b5563"} />,
    },
    {
      name: "Reportes",
      link: "MainReports",
      icon: <Ionicons name="stats-chart" size={18} color={"#4b5563"} />,
    },
    {
      name: "Configuración",
      link: "MainSettings",
      icon: <Ionicons name="settings" size={18} color={"#4b5563"} />,
    },
    {
      name: "Cerrar sesión",
      link: "Login",
      icon: <MaterialIcons name="logout" size={18} color={"#4b5563"} />,
    },
  ];

  const selectOption = async (option) => {
    if (option === "Login") {
      dispatch(logout());
      await storageUtils.clearAll();
    }
    setSelectedOption(option);
    navigation.replace(option);
    toggleShowAside();
  };

  useEffect(() => {
    setSelectedOption(route.name);
  }, []);

  return (
    <View className="absolute h-full w-[300px] bg-white top-0 right-0 rounded-tl-xl z-50 rounded-bl-xl border-l border-gray-200 overflow-hidden">
      {/* Header */}
      <View className="w-full h-[60px] bg-[#F5F9FF] border-b border-[#F5F9FF] flex flex-row items-center px-5 justify-between">
        <View className="flex flex-col">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 17,
              color: "#0A192F",
            }}
          >
            {user?.fullName}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "#0A192F",
            }}
          >
            {user?.Role.name}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleShowAside}>
          <Ionicons name="close" size={25} color={"#0A192F"} />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View className="flex flex-col">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => selectOption(item.link)}
            className={`flex flex-row items-center px-4 py-5 gap-2 border-b border-gray-100 ${
              selectedOption === item.link ? "bg-blue-100" : ""
            }`}
          >
            {item.icon}
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#4b5563",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Aside;
