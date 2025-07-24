import { Feather, Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { pickerUtils, storageUtils } from "../../../utils/index.utils";
import { productAPI } from "../../../api/index.api";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { setProducts } from "store/slices/data.slice";
import ListColors from "../../../modal/list-colors/LIstColors";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [productData, setProductData] = useState({});
  const [specList, setSpecList] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [newImage, setNewImage] = useState(false);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(null);

  const [showCategories, setShowCategories] = useState(false);
  const toggleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  const [showColors, setShowColors] = useState(false);
  const toggleShowColors = () => {
    setShowColors(!showColors);
  };

  const { product } = useSelector((state) => state.data);

  const getProducts = () => {
    productAPI.getProducts().then((res) => {
      const { products: productsDB } = res.data;
      dispatch(setProducts(productsDB));
    });
  };

  const deleteProduct = async () => {
    const token = await storageUtils.getItem("token");

    productAPI
      .deleteProduct(token, product.id)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Producto eliminado",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getProducts();
        setTimeout(() => {
          navigation.goBack();
        }, 2500);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: err.response.data.message,
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
            text2: err.message,
            text1Style: {
              fontSize: 16,
              fontWeight: "900",
            },
            text2Style: { fontSize: 14 },
          });
        }
      });
  };

  const pickImage = async () => {
    const uri = await pickerUtils.pickImageFromGallery();
    if (uri) {
      setNewImage(true);
      setImageUri(uri);
    }
  };

  const mapYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 2000; i--) {
      years.push({ label: i.toString(), value: i.toString() });
    }
    setYears(years);
  };

  const updateSpec = (index, field, value) => {
    const updated = [...specList];
    updated[index][field] = value;
    setSpecList(updated);

    const updatedObject = {};
    updated.forEach((item) => {
      if (item.key.trim()) updatedObject[item.key.trim()] = item.value.trim();
    });

    if (
      JSON.stringify(currentProduct?.specification) !==
      JSON.stringify(updatedObject)
    ) {
      setProductData((prev) => ({ ...prev, specification: updatedObject }));
    }
  };

  const addSpec = () => {
    setSpecList([...specList, { key: "", value: "" }]);
  };

  const removeSpec = (index) => {
    const updated = [...specList];
    updated.splice(index, 1);
    setSpecList(updated);

    const updatedObject = {};
    updated.forEach((item) => {
      if (item.key.trim()) updatedObject[item.key.trim()] = item.value.trim();
    });

    setProductData((prev) => ({ ...prev, specification: updatedObject }));
  };

  const handleChange = (name, value) => {
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStock = (type) => {
    if (type === "increment") {
      setProductData((prev) => ({
        ...prev,
        stock: String(Number(prev.stock || 0) + 1),
      }));
    }

    if (type === "decrement" && Number(productData.stock) > 0) {
      setProductData((prev) => ({
        ...prev,
        stock: String(Number(prev.stock || 0) - 1),
      }));
    }
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");
    const { id, Category, Reviews, ...rest } = productData;

    try {
      if (newImage) {
        // Crear FormData si hay nueva imagen
        const formData = new FormData();

        formData.append("name", rest.name);
        formData.append("description", rest.description);
        formData.append("price", rest.price);
        formData.append("stock", rest.stock);
        formData.append("brand", rest.brand);
        formData.append("model", rest.model);
        formData.append("color", rest.color);
        formData.append("launchDate", rest.launchDate);
        formData.append("guarantee", rest.guarantee);
        formData.append("CategoryId", rest.CategoryId);
        formData.append("dimensions", rest.dimensions);
        formData.append("specification", JSON.stringify(rest.specification));

        formData.append("photo", {
          uri: imageUri,
          name: `product_${Date.now()}.jpg`,
          type: "image/jpeg",
        });

        await productAPI.updateProductWithImage(token, id, formData);
      } else {
        // Envío directo como JSON
        await productAPI.updateProductWithoutImage(token, id, rest);
      }

      Toast.show({
        type: "success",
        text1: "Producto actualizado",
        text2: "Los cambios fueron guardados correctamente",
        text1Style: { fontSize: 16, fontWeight: "900" },
        text2Style: { fontSize: 14 },
      });

      getProducts();

      setTimeout(() => {
        navigation.goBack();
      }, 2500);
    } catch (err) {
      if (err instanceof AxiosError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.response?.data?.message || "Algo salió mal",
          text1Style: { fontSize: 16, fontWeight: "900" },
          text2Style: { fontSize: 14 },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error inesperado",
          text2: err.message,
          text1Style: { fontSize: 16, fontWeight: "900" },
          text2Style: { fontSize: 14 },
        });
      }
    }
  };

  useEffect(() => {
    mapYears();
    if (product) {
      const year = new Date(product.launchDate).getFullYear().toString();
      setYear(year);
      setProductData(product);
      setImageUri(product.photo);
      setSpecList(
        product.specification
          ? Object.entries(product.specification).map(([key, value]) => ({
              key,
              value,
            }))
          : []
      );
    }
  }, [product]);
  return (
    <View className="flex-1 bg-[#F5F9FF] flex flex-col">
      <View className="px-5 py-4 border-b border-gray-200 bg-white flex justify-end flex-row">
        <TouchableOpacity
          className="w-fit py-3 px-5 flex flex-row items-center justify-center gap-2 bg-red-700 rounded-xl"
          onPress={deleteProduct}
        >
          <Feather name="trash" size={24} color="white" />
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 15,
              color: "white",
            }}
          >
            Eliminar
          </Text>
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

          <TouchableOpacity
            disabled
            className="px-3"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              backgroundColor: "white",
              height: 50,
              justifyContent: "center",
            }}
            onPress={toggleShowCategories}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            >
              {productData?.Category?.name || "Seleccionar"}
            </Text>
          </TouchableOpacity>
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
            value={productData?.name}
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
            value={productData?.description}
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
            value={productData?.price}
            onChangeText={(value) => handleChange("price", value)}
            className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "#374151",
            }}
          />
        </View>

        <View className="flex flex-col mb-5 gap-2">
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: "#0A192F",
            }}
          >
            Stock
          </Text>
          <View className="flex flex-row items-center gap-1 h-[50px]">
            <TouchableOpacity
              className="w-[50px] h-full bg-red-600 flex flex-row items-center justify-center rounded-xl"
              onPress={() => handleStock("decrement")}
            >
              <Feather name="minus" size={20} color="white" />
            </TouchableOpacity>
            <TextInput
              keyboardType="numeric"
              value={productData?.stock?.toString()}
              className="flex-1 h-full bg-white border border-gray-200 rounded-xl px-3 text-center"
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "#374151",
              }}
              onChangeText={(value) => handleChange("stock", value)}
            />
            <TouchableOpacity
              className="w-[50px] h-full bg-green-800 flex flex-row items-center justify-center rounded-xl"
              onPress={() => handleStock("increment")}
            >
              <Feather name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
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
            value={productData?.brand}
            onChangeText={(value) => handleChange("brand", value)}
            className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "#374151",
            }}
          />
        </View>

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
            value={productData?.model}
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

          <TouchableOpacity
            className="px-3"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              backgroundColor: "white",
              height: 50,
              justifyContent: "center",
            }}
            onPress={toggleShowColors}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            >
              {productData?.color || "Seleccionar"}
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            disabled
            className="px-3"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              backgroundColor: "white",
              height: 50,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "black",
              }}
            >
              {year || "Seleccionar"}
            </Text>
          </TouchableOpacity>
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
            value={productData?.guarantee?.toString()}
            onChangeText={(value) => handleChange("guarantee", value)}
            className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "#374151",
            }}
          />
        </View>

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
            value={productData?.dimensions}
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
          onPressIn={handleSubmit}
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
      <ListColors
        visible={showColors}
        onClose={toggleShowColors}
        handleChange={handleChange}
        currentColor={productData?.color}
      />
    </View>
  );
};

export default EditProduct;
