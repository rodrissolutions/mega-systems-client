import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import { storageUtils } from "../../../utils/index.utils";
import { bankAccountAPI } from "../../../api/index.api";
import { AxiosError } from "axios";
import {
  setBankAccounts,
  setCurrentBankAccount,
} from "store/slices/data.slice";
import { useNavigation } from "@react-navigation/native";
import ListBanks from "../../../modal/list-banks/ListBanks";
import ListAccountType from "../../../modal/list-account/ListAccount";

const EditBankAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [accountData, setAccountData] = useState({});
  const [bankAccountData, setBankAccountData] = useState({});
  const { currentBankAccount } = useSelector((state) => state.data);
  const [show, setShow] = useState(false);
  const [showAccountType, setShowAccountType] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const toggleAccountType = () => {
    setShowAccountType(!showAccountType);
  };

  const resetData = () => {
    setAccountData({});
  };

  const updateRedux = async () => {
    const token = await storageUtils.getItem("token");

    bankAccountAPI.getAll(token).then((res) => {
      const { bankAccounts: bankAccountsDB } = res.data;
      const banAccount = bankAccountsDB.find(
        (bankAccount) => bankAccount.id === currentBankAccount.id
      );
      dispatch(setBankAccounts(bankAccountsDB));
      dispatch(setCurrentBankAccount(banAccount));
    });
  };

  const handleBankAccountData = (name, value) => {
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const deleteBankAccount = async () => {
    const token = await storageUtils.getItem("token");
    bankAccountAPI
      .deleteBankAccount(token, currentBankAccount.id)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Cuenta bancaria eliminada",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });
        updateRedux();
        setTimeout(() => {
          navigation.goBack();
        }, 3500);
      });
  };

  const handleSubmit = async () => {
    const token = await storageUtils.getItem("token");

    if (Object.values(accountData).length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se encontraron cambios",
        text1Style: {
          fontSize: 16,
          fontWeight: "900",
        },
        text2Style: { fontSize: 14 },
      });
      return;
    }

    bankAccountAPI
      .updateBankAccount(token, currentBankAccount.id, accountData)
      .then((res) => {
        const { message } = res.data;
        Toast.show({
          type: "success",
          text1: "Cuenta bancaria actualizada",
          text2: message,
          text1Style: {
            fontSize: 16,
            fontWeight: "900",
          },
          text2Style: { fontSize: 14 },
        });

        updateRedux();
        resetData();
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
            text2: "Algo salió mal",
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
    setBankAccountData(currentBankAccount);
  }, [currentBankAccount]);
  return (
    <View className="flex-1 bg-[#F5F9FF] flex flex-col">
      <View className="px-5 py-4 border-b border-gray-200 bg-white flex justify-end flex-row">
        <TouchableOpacity
          className="w-fit py-3 px-5 flex flex-row items-center justify-center gap-2 bg-red-700 rounded-xl"
          onPress={deleteBankAccount}
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
      <View className="flex-1 bg-[#F5F9FF] flex flex-col">
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
                {bankAccountData?.bankName || "Seleccionar"}
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
                {bankAccountData?.accountType || "Seleccionar"}
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
              value={bankAccountData?.accountNumber}
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
              value={bankAccountData?.accountHolder}
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
              value={bankAccountData?.identification}
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
    </View>
  );
};

export default EditBankAccount;
