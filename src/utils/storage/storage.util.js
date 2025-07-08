import AsyncStorage from "@react-native-async-storage/async-storage";

const saveItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error al guardar el item ${key}: ${error}`);
  }
};

const getItem = async (key, value) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error al obtener el item ${key}: ${error}`);
    return null;
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error al eliminar el item ${key}: ${error}`);
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(`Error al limpiar todos los items: ${error}`);
  }
};

export default { saveItem, getItem, removeItem, clearAll };
