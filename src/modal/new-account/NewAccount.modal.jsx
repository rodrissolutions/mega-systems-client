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
import { useState } from "react";
import Toast from "react-native-toast-message";
import { bankAccountAPI } from "../../api/index.api";
import { storageUtils } from "../../utils/index.utils";
import { useDispatch } from "react-redux";
import { setBankAccounts } from "store/slices/data.slice";
import { AxiosError } from "axios";
import ListBanks from "../list-banks/ListBanks";
import ListAccountType from "../list-account/ListAccount";

const NewAccount = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAccountType, setShowAccountType] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const toggleAccountType = () => {
    setShowAccountType(!showAccountType);
  };
  const [bankAccountData, setBankAccountData] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    accountType: "",
    identification: "",
  });

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
                onPress={toggle}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "black",
                  }}
                >
                  {bankAccountData.bankName || "Seleccionar"}
                </Text>
              </TouchableOpacity>
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
              {/* Tipo de cuenta */}

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
                onPress={toggleAccountType}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "black",
                  }}
                >
                  {bankAccountData.accountType || "Seleccionar"}
                </Text>
              </TouchableOpacity>
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
                onChangeText={(value) => {
                  // Solo permite números y máximo 10 dígitos
                  const numericValue = value.replace(/[^0-9]/g, ""); // eliminar caracteres no numéricos
                  if (numericValue.length <= 10) {
                    handleBankAccountData("accountNumber", numericValue);
                  }
                }}
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
                onChangeText={(value) => {
                  // Solo permite números y máximo 10 dígitos
                  const numericValue = value.replace(/[^0-9]/g, ""); // eliminar caracteres no numéricos
                  if (numericValue.length <= 10) {
                    handleBankAccountData("identification", numericValue);
                  }
                }}
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
          <ListBanks
            visible={show}
            onClose={toggle}
            handleChange={handleBankAccountData}
          />
          <ListAccountType
            visible={showAccountType}
            onClose={toggleAccountType}
            handleChange={handleBankAccountData}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NewAccount;
