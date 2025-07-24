import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { useSelector } from "react-redux";

const ListProducts = ({
  visible,
  onClose,
  handleChange,
  handleProductName,
}) => {
  const [valueSelected, setSelectedValue] = useState(null);
  const { products } = useSelector((state) => state.data);
  const [productsMap, setProductsMap] = useState([]);
  const handleSelect = (name, value) => {
    setSelectedValue(value);
    handleChange("ProductId", value);
    handleProductName(name);
    onClose();
  };

  const renderRadioButton = ({ item }) => {
    const isSelected = item.value === valueSelected;

    return (
      <TouchableOpacity
        className="flex flex-row items-center gap-3 mb-5"
        onPress={() => handleSelect(item.label, item.value)}
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

  const mappedProducts = () => {
    const mapped = products.map((pr) => ({
      label: pr.name,
      value: pr.id,
    }));

    setProductsMap(mapped);
  };

  useEffect(() => {
    mappedProducts();
  }, []);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="absolute w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center px-10">
        <View className="w-full rounded-xl p-4 bg-white h-fit flex flex-col">
          {productsMap.map((item) => renderRadioButton({ item }))}
        </View>
      </View>
    </Modal>
  );
};

export default ListProducts;
