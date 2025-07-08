import { View, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { AdminHeader } from "components/index.components";
import { Aside } from "components/index.components";

const AdminLayout = ({ children }) => {
  const [showAside, setShowAside] = useState(false);
  const toggleShowAside = () => setShowAside(!showAside);
  return (
    <View className="flex-1 flex flex-col bg-[#F5F9FF] relative w-full">
      <AdminHeader toggleShowAside={toggleShowAside} />
      {/* {showAside && (
        <Pressable
          className="w-full h-full bg-black/50"
          onPress={toggleShowAside}
        ></Pressable>
      )} */}
      {showAside && <Aside toggleShowAside={toggleShowAside} />}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </View>
  );
};

export default AdminLayout;
