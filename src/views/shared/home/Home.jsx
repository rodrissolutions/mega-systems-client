import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "layouts/Layout";
import { Fontisto } from "@expo/vector-icons";
import { useState, useLayoutEffect, useEffect } from "react";
import { Product } from "components/index.components";
import { InfoProduct } from "modal/index.modals.js";
import {
  categoryAPI,
  offerAPI,
  productAPI,
  cartAPI,
  residencyAPI,
} from "api/index.api";
import {
  setProducts,
  setCategories,
  setCart,
  setResidency,
  setAppoitments,
  setOffer,
} from "redux/slices/data.slice";
import { useDispatch, useSelector } from "react-redux";
import { appointmentAPI } from "../../../api/index.api";
import { setAppointments } from "../../../redux/slices/data.slice";

const Home = ({ navigation }) => {
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();
  const { products, categories, user } = useSelector((state) => state.data);

  const handleInfoProduct = (id) => {
    toggleShowInfo();
  };
  const toggleShowInfo = () => setShowInfo(!showInfo);

  useLayoutEffect(() => {
    setShowInfo(false);
  }, [navigation]);

  // const categories = [
  //   { id: 1, name: "Computadoras", image: laptop },
  //   { id: 2, name: "Computadoras", image: laptop },
  //   { id: 3, name: "Computadoras", image: laptop },
  //   { id: 4, name: "Computadoras", image: laptop },
  //   { id: 5, name: "Computadoras", image: laptop },
  //   { id: 6, name: "Computadoras", image: laptop },
  //   { id: 7, name: "Computadoras", image: laptop },
  //   { id: 8, name: "Computadoras", image: laptop },
  //   { id: 9, name: "Computadoras", image: laptop },
  // ];

  const getData = () => {
    // Obtener toda la información que se mostrará en el home
    if (user) {
      const { id } = user;
      cartAPI
        .getCart(id)
        .then((res) => {
          const { cart } = res.data;
          dispatch(setCart(cart));
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });

      residencyAPI
        .getByUser(id)
        .then((res) => {
          const { residency } = res.data;
          dispatch(setResidency(residency));
        })

        .catch((err) => {
          console.log(err.response.data.message);
        });

      appointmentAPI
        .getAppointmentsByUser(id)
        .then((res) => {
          const { appointments } = res.data;
          dispatch(setAppointments(appointments));
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }

    // Obtener todas las ofertas

    offerAPI
      .getOffers()
      .then((res) => {
        const { offer } = res.data;
        dispatch(setOffer(offer));
      })
      .catch((err) => {
        console.log("Aqui: ", err);
      })
      .finally(() => {});

    // Obtener todas las categorias

    categoryAPI
      .getCategories()
      .then((res) => {
        const { categories } = res.data;
        dispatch(setCategories(categories));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});

    // Obtener todos los productos
    productAPI
      .getProducts()
      .then((res) => {
        const { products } = res.data;
        dispatch(setProducts(products));
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <View className="flex-1 h-screen bg-[#f5f9ff]">
        <ScrollView
          className="flex-1 bg-[#f5f9ff] px-4 "
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 40,
          }}
        >
          <View className="flex flex-col">
            {/* Ofertas */}
            <View className="mb-3">
              {/* Oferta */}
              <View className="w-full h-[200px] bg-[#132f58] rounded-lg border-4 border-[#FFD700] flex flex-row">
                <View className="flex-1 flex justify-center items-center">
                  <Text
                    style={{
                      fontFamily: "Orbitron_700Bold",
                      fontSize: 50,
                      color: "#FFD700",
                    }}
                  >
                    20%
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 20,
                      color: "#FFD700",
                    }}
                  >
                    de descuento
                  </Text>
                </View>
                <View className="flex-1 py-5 flex flex-col items-center justify-center gap-2 px-3 ">
                  <Text
                    style={{
                      fontFamily: "Inter_700Bold",
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    Aprovecha esta semana de descuento
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 15,
                      color: "white",
                    }}
                  >
                    y obtén un 20% de descuento en tu compra
                  </Text>
                </View>
              </View>
            </View>
            {/* Categorías */}
            <View className="flex flex-col">
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                initialNumToRender={1}
                windowSize={3}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View
                    className="flex flex-col gap-1 w-[100px] justify-center items-center mr-5"
                    key={item.id}
                  >
                    {/* Imagen */}
                    <View className="w-[80px] h-[80px] rounded-full bg-white flex flex-row items-center justify-center border border-gray-200 shadow-xl shadow-gray-200">
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        className="w-[50px] h-[50px]"
                      />
                    </View>

                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 13,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                )}
                getItemLayout={(_, index) => ({
                  length: 250,
                  offset: 254 * index,
                })}
              />
            </View>

            {/* Filtrar mas vendidos */}
            <View className="mt-5 flex flex-row items-center mb-3">
              <TouchableOpacity className="flex flex-row items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-[#1786f9]">
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  Más vendidos
                </Text>
                <Fontisto
                  name="arrow-swap"
                  className="rotate-90"
                  color={"#fff"}
                  size={15}
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-1 flex-row w-full justify-between  gap-y-5 flex-wrap gap-2 ">
              {products &&
                products.length > 0 &&
                products.map((product, index) => {
                  return (
                    <Product
                      toggleShowInfo={handleInfoProduct}
                      product={product}
                      key={index}
                    />
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </View>
      {showInfo && (
        <InfoProduct toggleShowInfo={toggleShowInfo} showInfo={showInfo} />
      )}
    </Layout>
  );
};

export default Home;
