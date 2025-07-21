import { Feather, Octicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { pickerUtils, storageUtils } from "../../utils/index.utils";
import Toast from "react-native-toast-message";
import { productAPI } from "../../api/index.api";
import { setProducts } from "store/slices/data.slice";
import { AxiosError } from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const NewProduct = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [specList, setSpecList] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    model: "",
    color: "",
    launchDate: "",
    guarantee: "",
    dimensions: "",
    specification: {},
  });
  const [categoryId, setCategoryId] = useState(null);
  const { categories } = useSelector((state) => state.data);
  const [categoriesData, setCategoriesData] = useState([]);
  const [years, setYears] = useState([]);

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

  const mapCategories = () => {
    const data = categories.map((ctg) => ({
      label: ctg.name,
      value: ctg.id,
    }));

    setCategoriesData(data);
  };

  const mapYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 2000; i--) {
      years.push({ label: i, value: i });
    }

    setYears(years);
  };

  const handleCategoryChange = (value) => {
    setCategoryId(value);
  };

  const handleChange = (name, value) => {
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      setImageUri(uri);
    }
  };

  const addSpec = () => {
    // Si hay alguna clave o valor vacía en la lista, no permitir agregar otra
    const hasEmpty = specList.some(
      (item) => !item.key.trim() || !item.value.trim()
    );

    if (hasEmpty) {
      alert("Completa todas las especificaciones antes de agregar una nueva.");
      return;
    }

    // Si todo está bien, agrega una nueva vacía
    setSpecList([...specList, { key: "", value: "" }]);
  };

  const updateSpec = (index, field, text) => {
    const newList = [...specList];
    newList[index][field] = text;
    setSpecList(newList);

    // Actualizar el JSON en productData.specifications
    const specObject = {};
    newList.forEach((item) => {
      if (item.key.trim()) {
        specObject[item.key.trim()] = item.value.trim();
      }
    });

    setProductData((prev) => ({
      ...prev,
      specification: specObject,
    }));
  };

  const removeSpec = (index) => {
    const newList = [...specList];
    newList.splice(index, 1);
    setSpecList(newList);

    // Actualizar el JSON después de eliminar
    const specObject = {};
    newList.forEach((item) => {
      if (item.key.trim()) {
        specObject[item.key.trim()] = item.value.trim();
      }
    });

    setProductData((prev) => ({
      ...prev,
      specification: specObject,
    }));
  };

  const isProductDataValid = (data) => {
    // Recorremos todos los campos del objeto excepto specifications
    for (const key in data) {
      if (key !== "specification") {
        if (!data[key] || data[key].toString().trim() === "") {
          return false; // Campo vacío
        }
      }
    }

    // Validamos que specifications tenga al menos una clave
    if (Object.keys(data.specification).length === 0) {
      return false;
    }

    setIsValid(true);

    return true;
  };

  const getProducts = () => {
    productAPI.getProducts().then((res) => {
      const { products: productsDB } = res.data;
      dispatch(setProducts(productsDB));
    });
  };

  const resetData = () => {
    setImageUri("");
    setSpecList([]);
    setCategoryId(null);
    setIsValid(false);
    setProductData({
      name: "",
      description: "",
      price: "",
      stock: "",
      brand: "",
      model: "",
      color: "",
      launchDate: "",
      guarantee: "",
      dimensions: "",
      specification: {},
    });
  };

  const createFormData = (data, imageUri) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      let value = data[key];

      if (key === "specification") {
        // serializar como string JSON
        value = JSON.stringify(value);
      } else if (typeof value !== "string") {
        // asegurar que todos los valores sean string antes de agregar
        value = String(value);
      }

      formData.append(key, value);
    });

    formData.append("CategoryId", categoryId);

    formData.append("photo", {
      uri: imageUri,
      name: `product_${data.name.replace(/\s/g, "")}.jpg`,
      type: "image/jpeg",
    });

    return formData;
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");

    if (!categoryId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar una categoría",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    if (!imageUri) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar una imagen",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    if (!isProductDataValid(productData)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Todos los campos son obligatorios",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    const data = createFormData(productData, imageUri);

    productAPI
      .registerProduct(token, data)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Éxito",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getProducts();
        resetData();

        setTimeout(() => {
          onClose();
        }, 2500);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          const { message } = err.response.data;
          Toast.show({
            type: "error",
            text1: "Error",
            text2: message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Ha ocurrido un error al crear el producto",
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  useEffect(() => {
    mapCategories();
    mapYears();
  }, [categories]);
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      style={{
        margin: 0,
      }}
    >
      <SafeAreaView className="flex-1 bg-[#F5F9FF] flex flex-col">
        <View className="flex-1 bg-[#F5F9FF] flex flex-col">
          {/* Header */}
          <View className="flex flex-row px-7 h-[60px] items-center justify-between bg-[#0A192F]">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              Nuevo Producto
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Octicons name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 20,
              paddingBottom: 40,
              paddingHorizontal: 20,
            }}
          >
            {/* Categoría */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Categoría
              </Text>

              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  placeholder={{
                    label: "Seleccione una categoría",
                    value: null,
                  }}
                  style={{
                    inputAndroid: {
                      fontFamily: "Inter_400Regular",
                      fontSize: 16,
                    },
                    placeholder: {
                      fontFamily: "Inter_400Regular",
                      fontSize: 16,
                    },
                  }}
                  onValueChange={(value) => handleCategoryChange(value)}
                  items={categoriesData}
                />
              </View>
            </View>

            {/* Nombre */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Nombre
              </Text>

              <TextInput
                value={productData.name}
                multiline
                onChangeText={(value) => handleChange("name", value)}
                className="h-[80px] bg-white border border-gray-200 rounded-lg px-3"
                textAlignVertical="top"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Descripcion */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Descripción
              </Text>

              <TextInput
                value={productData.description}
                multiline
                onChangeText={(value) => handleChange("description", value)}
                className="h-[120px] bg-white border border-gray-200 rounded-lg px-3"
                textAlignVertical="top"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Precio */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Precio
              </Text>

              <TextInput
                keyboardType="numeric"
                value={productData.price}
                onChangeText={(value) => handleChange("price", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Stock */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Stock
              </Text>

              <TextInput
                keyboardType="numeric"
                value={productData.stock}
                onChangeText={(value) => handleChange("stock", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Marca */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Marca
              </Text>

              <TextInput
                value={productData.brand}
                onChangeText={(value) => handleChange("brand", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Modelo */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Modelo
              </Text>

              <TextInput
                value={productData.model}
                onChangeText={(value) => handleChange("model", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Color */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Color
              </Text>

              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  placeholder={{
                    label: "Seleccione un color",
                    value: null,
                  }}
                  style={{
                    inputAndroid: {
                      fontFamily: "Inter_400Regular",
                      fontSize: 16,
                    },
                    placeholder: {
                      fontFamily: "Inter_400Regular",
                      fontSize: 16,
                    },
                  }}
                  onValueChange={(value) => handleChange("color", value)}
                  items={colors}
                />
              </View>
            </View>

            {/* Año de lanzamiento */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Año de lanzamiento
              </Text>

              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  placeholder={{
                    label: "Seleccione un año",
                    value: null,
                  }}
                  style={{
                    inputAndroid: {
                      fontFamily: "Inter_400Regular",
                      fontSize: 16,
                    },
                    placeholder: {
                      fontFamily: "Inter_400Regular",
                      fontSize: 16,
                    },
                  }}
                  onValueChange={(value) => handleChange("launchDate", value)}
                  items={years}
                />
              </View>
            </View>

            {/* Garantía */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Garantía (meses)
              </Text>

              <TextInput
                keyboardType="numeric"
                value={productData.guarantee}
                onChangeText={(value) => handleChange("guarantee", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>
            {/* Dimensiones */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Dimensiones
              </Text>

              <TextInput
                placeholder="Ej: 40x40"
                value={productData.dimensions}
                onChangeText={(value) => handleChange("dimensions", value)}
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Especificaciones */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Especificaciones
              </Text>

              {specList.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Clave"
                    value={item.key}
                    onChangeText={(text) => updateSpec(index, "key", text)}
                    style={{
                      fontFamily: "Inter_400Regular",
                      flex: 2,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 6,
                      padding: 8,
                      marginRight: 5,
                    }}
                  />
                  <TextInput
                    placeholder="Valor"
                    value={item.value}
                    onChangeText={(text) => updateSpec(index, "value", text)}
                    style={{
                      flex: 3,
                      fontFamily: "Inter_400Regular",
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 6,
                      padding: 8,
                      marginRight: 5,
                    }}
                  />
                  <TouchableOpacity onPress={() => removeSpec(index)}>
                    <Octicons name="trash" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                onPress={addSpec}
                style={{
                  backgroundColor: "#0A192F",
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  Agregar especificación
                </Text>
              </TouchableOpacity>
            </View>

            {/* Imagen */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Imagen
              </Text>

              <View className="w-full h-fit px-3 py-5 bg-green-100 border border-gray-200 rounded-lg">
                <Text
                  className="text-green-800"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    textAlign: "justify",
                  }}
                >
                  Nota: La imagen debe tener una proporción cuadrada (ancho y
                  alto iguales), estar en formato PNG y contar con un fondo
                  blanco o transparente para mantener uniformidad visual en el
                  catálogo de productos.
                </Text>
              </View>

              <TouchableOpacity
                className="w-full mt-3 h-[250px] rounded-xl flex flex-col bg-white items-center justify-center gap-2 border border-gray-200 overflow-hidden"
                onPress={() => pickImage()}
              >
                {!imageUri ? (
                  <>
                    <Feather name="camera" size={40} color={"#e5e7eb"} />
                    <Text
                      className="text-gray-400"
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 20,
                      }}
                    >
                      Seleccionar imagen
                    </Text>
                  </>
                ) : (
                  <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full object-contain"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="w-full py-3 flex flex-row items-center justify-center gap-2 bg-[#0A192F] disabled:bg-gray-300 disabled:cursor-not-allowed"
              onPress={handleSubmit}
            >
              <Feather name="save" size={24} color="white" />
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 15,
                  color: "white",
                }}
              >
                Guardar
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <Toast position="top" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NewProduct;
