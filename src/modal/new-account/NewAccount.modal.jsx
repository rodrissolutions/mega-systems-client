import { Feather, Octicons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { bankAccountAPI } from "../../api/index.api";
import { storageUtils } from "../../utils/index.utils";
import { useDispatch } from "react-redux";
import { setBankAccounts } from "store/slices/data.slice";
import { AxiosError } from "axios";

const NewAccount = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [bankAccountData, setBankAccountData] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    accountType: "",
    identification: "",
  });
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

  const typeAccount = [
    { label: "Ahorro", value: "Ahorro" },
    { label: "Corriente", value: "Corriente" },
  ];

  const getBankAccounts = async () => {
    const token = await storageUtils.getItem("token");
    bankAccountAPI.getAll(token).then((res) => {
      const { bankAccounts: bankAccountsDB } = res.data;
      dispatch(setBankAccounts(bankAccountsDB));
    });
  };

  const reseData = () => {
    setBankAccountData({
      bankName: "",
      accountHolder: "",
      accountNumber: "",
      accountType: "",
      identification: "",
    });
  };

  const handleBankAccountData = (name, value) => {
    setBankAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");

    if (Object.values(bankAccountData).includes("")) {
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

    bankAccountAPI
      .createBankAccount(token, bankAccountData)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Cuenta creada",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        getBankAccounts();
        reseData();
        setTimeout(() => {
          onClose();
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
          <View className="flex flex-row px-7 h-[60px] items-center justify-between bg-[#0A192F]">
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              Nueva cuenta
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
            {/* Banco */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Banco
              </Text>

              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  placeholder={{
                    label: "Seleccione un banco",
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
                  onValueChange={(value) =>
                    handleBankAccountData("bankName", value)
                  }
                  items={banksEcuador}
                />
              </View>
            </View>

            {/* Tipo de cuenta */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Tipo de cuenta
              </Text>

              <View className="w-full border border-gray-200 h-[50px] bg-white rounded-lg">
                <RNPickerSelect
                  placeholder={{
                    label: "Seleccione un tipo de cuenta",
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
                  onValueChange={(value) =>
                    handleBankAccountData("accountType", value)
                  }
                  items={typeAccount}
                />
              </View>
            </View>

            {/* Numero de cuenta */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Cuenta
              </Text>

              <TextInput
                keyboardType="numeric"
                value={bankAccountData.accountNumber}
                onChangeText={(value) =>
                  handleBankAccountData("accountNumber", value)
                }
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Titular de la cuenta */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Titular
              </Text>

              <TextInput
                value={bankAccountData.accountHolder}
                onChangeText={(value) =>
                  handleBankAccountData("accountHolder", value)
                }
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
            </View>

            {/* Indentificación */}
            <View className="flex flex-col gap-2 mb-5">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: "#0A192F",
                }}
              >
                Indentificación
              </Text>

              <TextInput
                keyboardType="numeric"
                value={bankAccountData.identification}
                onChangeText={(value) =>
                  handleBankAccountData("identification", value)
                }
                className="h-[50px] bg-white border border-gray-200 rounded-lg px-3"
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: "#374151",
                }}
              />
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

export default NewAccount;
