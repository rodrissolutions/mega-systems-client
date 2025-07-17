import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "layouts/Layout";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saleAPI } from "api/index.api";
import { setBuys } from "redux/slices/data.slice";
import LottieView from "lottie-react-native";
import recovery from "assets/animations/recovery.json";
import { LoginRequired } from "components/index.components";
import { dateUtils } from "../../../utils/index.utils";
import { setBuy } from "../../../redux/slices/data.slice";

const Buy = () => {
  const { user, buys } = useSelector((state) => state.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showDetails = (currentBuy) => {
    dispatch(setBuy(currentBuy));
    navigation.navigate("BuyProductDetail");
  };

  useEffect(() => {
    if (user) {
      const { id } = user;
      saleAPI
        .getByUser(id)
        .then((res) => {
          const { sales } = res.data;
          dispatch(setBuys(sales));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }, []);
  return (
    <Layout showBarSearch={false}>
      {user ? (
        buys && buys.length > 0 ? (
          <View className="flex-1 bg-[#F5F9FF]">
            {/* Filtros */}
            <View className="flex flex-row h-[50px] bg-white border-b border-gray-200 shadow-md shadow-gray-300">
              <TouchableOpacity className="flex-1 h-full flex flex-row justify-center items-center border-r border-gray-200 gap-2">
                <Octicons name="package" size={20} color={"#9ca3af"} />
                <Text>Productos</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 h-full flex flex-row justify-center items-center border-r border-gray-200 gap-2">
                <Octicons name="tools" size={20} color={"#9ca3af"} />
                <Text>Servicios</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 h-full flex flex-row justify-center items-center border-r border-gray-200 gap-2">
                <Octicons name="checklist" size={20} color={"#9ca3af"} />
                <Text>Estado</Text>
              </TouchableOpacity>
            </View>

            {/* Busqueda */}
            <View className="px-5 pt-5">
              <View className="w-full h-[50px] flex flex-row bg-white rounded-lg mr-5">
                <View className="w-[50px] h-full flex flex-row  justify-center items-center">
                  <Octicons name="search" size={18} color="#ccc" />
                </View>
                <TextInput
                  autoCapitalize="none"
                  className="outline-none flex-1 h-full  placeholder:text-gray-400 "
                  placeholder="Código de compra"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#000",
                  }}
                />
              </View>
            </View>

            {/* Mostrar Scroll View de compra de productos */}
            <ScrollView
              className="flex-1 bg-[#F5F9FF]"
              contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: 40,
                paddingHorizontal: 20,
              }}
            >
              <View className="flex flex-col gap-2">
                {/* Compra */}
                {buys &&
                  buys.map((buy) => (
                    <View
                      className="w-full h-fit py-3 bg-white border border-gray-100 rounded-lg flex flex-row justify-between px-5"
                      key={buy.id}
                    >
                      <View className="flex flex-col">
                        <Text
                          style={{
                            fontFamily: "Inter_700Bold",
                            fontSize: 24,
                            color: "#0A192F",
                          }}
                        >
                          #{buy.code}
                        </Text>
                        <View className="flex flex-row items-center gap-1">
                          <Text
                            style={{
                              fontFamily: "Inter_700Bold",
                              fontSize: 15,
                              color: "#0A192F",
                            }}
                          >
                            $ {buy.total}
                          </Text>
                          <Text> - </Text>
                          <Text
                            className="px-2 py-1 bg-gray-200 rounded-full"
                            style={{
                              fontFamily: "Inter_400Regular",
                              fontSize: 10,
                            }}
                          >
                            {buy.status}
                          </Text>
                        </View>

                        <Text
                          className="mt-1 text-gray-800"
                          style={{
                            fontFamily: "Inter_600SemiBold",
                            fontSize: 15,
                          }}
                        >
                          {dateUtils.formatRelativeTime(buy.createdAt)}
                        </Text>
                      </View>

                      <TouchableOpacity
                        className="flex flex-row items-center gap-2"
                        onPress={() => showDetails(buy)}
                      >
                        <Octicons
                          name="three-bars"
                          size={20}
                          color={"#9ca3af"}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View className="flex-1 bg-[#F5F9FF] justify-center items-center gap-3">
            <LottieView
              autoPlay
              loop
              source={recovery}
              style={{
                width: 200,
                height: 200,
              }}
            />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
              }}
            >
              Aún no tienes compras registradas
            </Text>
          </View>
        )
      ) : (
        <LoginRequired />
      )}
    </Layout>
  );
};

export default Buy;
