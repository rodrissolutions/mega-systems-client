import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const InfoAccount = () => {
  const [data, setData] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [newImage, setNewImage] = useState(false);
  const { user } = useSelector((state) => state.data);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value.trimEnd() });
  };

  const handleSubmit = () => {
    const { id, ...rest } = setData;
  };

  useEffect(() => {
    setData(user);
  }, [user]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-[#F5F9FF] flex flex-col"
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center bg-[#F5F9FF] flex flex-col gap-2 pt-5">
            <View className="w-[85%] mx-auto flex flex-col gap-2 flex-1"></View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InfoAccount;
