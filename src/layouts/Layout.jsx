// components/Layout.js
import { StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Cart, Header } from "components/index.components";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = ({ children, showBarSearch = true }) => {
  const [openCart, setOpenCart] = useState(false);
  const toggleOpenCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F9FF] flex flex-col">
      <StatusBar backgroundColor="#1786f9" barStyle="light-content" />
      <View className="flex-1 flex flex-col ">
        <Header toggleOpenCart={toggleOpenCart} showBarSearch={showBarSearch} />
        {children}
        {openCart && (
          <Cart openCart={openCart} toggleOpenCart={toggleOpenCart} />
        )}
      </View>
    </SafeAreaView>
  );
};
export default Layout;
