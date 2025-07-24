import { useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

const TypeAddress = ({ visible, onClose, handleChange }) => {
  const [valueSelected, setSelectedValue] = useState(null);
  const typeResidence = [
    { label: "Casa", value: "Casa" },
    { label: "Trabajo", value: "Trabajo" },
  ];
  const handleSelect = (value) => {
    setSelectedValue(value);
    handleChange("type", value);
    onClose();
  };

  const renderRadioButton = ({ item }) => {
    const isSelected = item.value === valueSelected;

    return (
      <TouchableOpacity
        className="flex flex-row items-center gap-3 mb-5"
        onPress={() => handleSelect(item.value)}
      >
        {/* Contenedor del radio button */}
        <View
          className={`w-6 h-6 rounded-full border-2 ${
            isSelected ? "border-[#741D1D]" : "border-gray-400"
          } flex items-center justify-center transition-all duration-200`}
        >
          {/* Punto central si está seleccionado */}
          {isSelected && (
            <View className="w-3 h-3 rounded-full bg-[#741D1D]"></View>
          )}
        </View>

        {/* Texto de la opción */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: isSelected ? "#741D1D" : "#202244",
            transition: "color 0.2s",
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="absolute w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center px-10">
        <View className="w-full rounded-xl p-4 bg-white h-fit flex flex-col">
          {typeResidence.map((item, index) => renderRadioButton({ item }))}
        </View>
      </View>
    </Modal>
  );
};

export default TypeAddress;
