import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Keyboard,
  Text,
} from "react-native";
import logo from "assets/logo.png";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Octicons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Header = ({ toggleOpenCart, showBarSearch }) => {
  const navigation = useNavigation();
  const { cart, residency } = useSelector((state) => state.data);
  const [focusInput, setFocusInput] = useState(false);

  const handleFocus = () => setFocusInput(true);
  const handleBlur = () => setFocusInput(false);

  const closeSearch = () => {
    setFocusInput(false);
    Keyboard.dismiss();
  };

  const goToInfoAddress = () => {
    navigation.navigate("Address");
  };

  return (
    <View className="relative">
      <View className="flex flex-col">
        <View
          className={`h-[80px] bg-[#1786f9] flex flex-row items-center px-5 gap-2 ${
            !showBarSearch && "justify-between"
          }`}
        >
          {/* <Image source={logo} className="w-[40px] h-[40px] scale-x-[-1]" /> */}

          <View className="flex-1 h-[40px] flex flex-row bg-white rounded-lg mr-5">
            <View className="w-[50px] h-full flex justify-center items-center">
              <Octicons name="search" size={18} color="#ccc" />
            </View>
            <TextInput
              autoCapitalize="none"
              className="outline-none flex-1 h-full text-[#ccc]"
              placeholder="Estoy buscando..."
              onFocus={handleFocus}
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
              }}
            />
          </View>

          <TouchableOpacity onPress={toggleOpenCart} className="relative">
            <Feather name="shopping-cart" size={24} color="#fff" />
            <View className="absolute w-[15px] h-[15px] bg-red-400 rounded-full flex justify-center items-center -right-2 -top-1">
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 10,
                  color: "#fff",
                }}
              >
                {cart ? cart.Items.length : 0}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Ubicacion */}
        <View className="h-[40px] bg-[#1786f9] px-5">
          <TouchableOpacity
            className="flex flex-row items-center gap-2"
            onPress={goToInfoAddress}
          >
            <Feather name="map-pin" color={"#fff"} size={12} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "#fff",
              }}
            >
              {residency ? residency.city : "Ingresa tu ubicación"}
            </Text>
            <Octicons name="chevron-right" color={"#fff"} size={15} />
          </TouchableOpacity>
        </View>
      </View>

      {focusInput && (
        <Pressable
          onPress={closeSearch}
          className="absolute top-0 left-0 w-full h-full z-40 bg-white px-5 py-3"
        >
          <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
            {focusInput ? (
              <Feather name="x" size={24} color="#ccc" />
            ) : (
              <Octicons name="search" size={18} color="#ccc" />
            )}
            <TextInput
              autoFocus
              autoCapitalize="none"
              placeholder="Buscar productos..."
              className="flex-1 ml-2 text-black"
              onBlur={handleBlur}
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
              }}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Header;
