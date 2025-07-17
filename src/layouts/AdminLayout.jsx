import { View, ScrollView, Pressable, StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { AdminHeader } from "components/index.components";
import { Aside } from "components/index.components";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminLayout = ({ children }) => {
  const [showAside, setShowAside] = useState(false);
  const toggleShowAside = () => setShowAside(!showAside);
  return (
    <SafeAreaView className="flex-1 bg-[#F5F9FF] relative w-full">
      <StatusBar backgroundColor="#0A192F" barStyle="light-content" />

      <View className="flex-1 flex flex-col bg-[#F5F9FF] relative w-full">
        <AdminHeader toggleShowAside={toggleShowAside} />
        {/* {showAside && (
        <Pressable
          className="w-full h-full bg-black/50"
          onPress={toggleShowAside}
        ></Pressable>
      )} */}
        {showAside && <Aside toggleShowAside={toggleShowAside} />}
        {children}
      </View>
    </SafeAreaView>
  );
};

export default AdminLayout;
