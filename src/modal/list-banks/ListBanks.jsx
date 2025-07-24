import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { useSelector } from "react-redux";

const ListBanks = ({ visible, onClose, handleChange }) => {
  const [valueSelected, setSelectedValue] = useState(null);

  const banksEcuador = [
    { label: "Banco Pichincha", value: "Banco Pichincha" },
    { label: "Banco del Pacífico", value: "Banco del Pacífico" },
    { label: "Banco Guayaquil", value: "Banco Guayaquil" },
    { label: "Produbanco", value: "Produbanco" },
    { label: "Banco Internacional", value: "Banco Internacional" },
    { label: "Banco Bolivariano", value: "Banco Bolivariano" },
    { label: "Banco de Machala", value: "Banco de Machala" },
    { label: "Banco Amazonas", value: "Banco Amazonas" },
    { label: "Banco Solidario", value: "Banco Solidario" },
    { label: "Banco Coopnacional", value: "Banco Coopnacional" },
    { label: "Banco General Rumiñahui", value: "Banco General Rumiñahui" },
    { label: "Banco Diners Club", value: "Banco Diners Club" },
    { label: "Banco Capital", value: "Banco Capital" },
    { label: "Banco ProCredit", value: "Banco ProCredit" },
    { label: "Banco del Austro", value: "Banco del Austro" },
    { label: "BanEcuador", value: "BanEcuador" },
  ];

  const handleSelect = (value) => {
    setSelectedValue(value);
    handleChange("bankName", value);
    onClose();
  };

  const renderRadioButton = ({ item }) => {
    const isSelected = item.value === valueSelected;

    return (
      <TouchableOpacity
        className="flex flex-row items-center gap-3 mb-5"
        onPress={() => handleSelect(item.value)}
        key={item.value}
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
          {banksEcuador.map((item) => renderRadioButton({ item }))}
        </View>
      </View>
    </Modal>
  );
};

export default ListBanks;
