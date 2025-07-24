import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

const ListColors = ({
  visible,
  onClose,
  handleChange,
  currentColor = null,
}) => {
  const [valueSelected, setSelectedValue] = useState(null);
  const colors = [
    { label: "Rojo", value: "Rojo" },
    { label: "Verde", value: "Verde" },
    { label: "Azul", value: "Azul" },
    { label: "Amarillo", value: "Amarillo" },
    { label: "Naranja", value: "Naranja" },
    { label: "Morado", value: "Morado" },
    { label: "Rosado", value: "Rosado" },
    { label: "Negro", value: "Negro" },
    { label: "Blanco", value: "Blanco" },
    { label: "Gris", value: "Gris" },
    { label: "Celeste", value: "Celeste" },
    { label: "Marrón", value: "Marrón" },
    { label: "Turquesa", value: "Turquesa" },
    { label: "Lima", value: "Lima" },
    { label: "Dorado", value: "Dorado" },
    { label: "Plateado", value: "Plateado" },
  ];
  const handleSelect = (value) => {
    setSelectedValue(value);
    handleChange("color", value);
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

  useEffect(() => {
    if (currentColor) {
      setSelectedValue(currentColor);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="absolute w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center px-10">
        <View className="w-full rounded-xl p-4 bg-white h-fit flex flex-col">
          {colors.map((item, index) => renderRadioButton({ item }))}
        </View>
      </View>
    </Modal>
  );
};

export default ListColors;
