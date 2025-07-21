import { Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { dateUtils } from "../../../utils/index.utils";

// Mostrar ubicación en map
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { setCurrentSale } from "../../../redux/slices/data.slice";

const InfoUser = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const [userViews, setUserViews] = useState([]);
  const [sales, setSales] = useState([]);
  const { currentUser, allFavorites, allSales, allViews, allReviews } =
    useSelector((state) => state.data);

  const goToLocation = () => {
    navigation.navigate("Map");
  };

  const goToSale = (currentSale) => {
    dispatch(setCurrentSale(currentSale));
    navigation.navigate("MainSales", {
      screen: "InfoSale",
    });
  };

  useEffect(() => {
    const favorites = allFavorites.filter(
      (fav) => fav.UserId === currentUser.id
    );
    setFavorites(favorites);

    const userViews = allViews
      .filter((view) => view.UserId === currentUser.id)
      .sort((a, b) => b.quantity - a.quantity);

    setUserViews(userViews);

    const sales = allSales.filter((sale) => sale.UserId === currentUser.id);
    setSales(sales);
  }, [currentUser]);
  return (
    <ScrollView
      className="flex-1 bg-[#f5f9ff]"
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
      }}
    >
      {/* Mostrar informacion completa del usuario */}

      {/* Mostrar datos personales */}

      <View className="flex flex-col gap-2">
        <View className="flex flex-row items-center gap-2">
          <Octicons name="person" size={24} color="#0A192F" />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: "#0A192F",
            }}
          >
            Datos personales
          </Text>
        </View>

        <View className="my-5 mx-auto w-[150px] h-[150px] rounded-full bg-gray-100 border-4 border-gray-200">
          <Image
            source={{
              uri: currentUser.photo,
            }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
        </View>

        {/* Informacion */}
        <View className="flex flex-col gap-1 mt-5 mb-3">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
            }}
          >
            Nombres completos
          </Text>
          <View className="w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              {currentUser.fullName}
            </Text>
          </View>
        </View>

        <View className="flex flex-col gap-1 mb-3">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
            }}
          >
            Cédula
          </Text>
          <View className="w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              {currentUser.dni}
            </Text>
          </View>
        </View>

        <View className="flex flex-col gap-1 mb-3">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
            }}
          >
            Teléfono
          </Text>
          <View className="w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              {currentUser.phone}
            </Text>
          </View>
        </View>
        <View className="flex flex-col gap-1 mb-3">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
            }}
          >
            Género
          </Text>
          <View className="w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              {currentUser.gender}
            </Text>
          </View>
        </View>

        <View className="flex flex-col gap-1 mb-3">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
            }}
          >
            Correo electrónico
          </Text>
          <View className="w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              {currentUser.email}
            </Text>
          </View>
        </View>

        <View className="flex flex-col gap-1 mb-3">
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
            }}
          >
            Cuenta verificada
          </Text>
          <View className="w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              {currentUser.isVerified ? "Verificada" : "No verificada"}
            </Text>
          </View>
        </View>
      </View>

      {/* Mostrar datos de residencia */}
      <View className="mt-5">
        <View className="flex flex-row items-center gap-2 mb-5">
          <Octicons name="location" size={18} color="#0A192F" />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: "#0A192F",
            }}
          >
            Residencia
          </Text>
        </View>
        {currentUser.Residency ? (
          <View className="flex flex-col gap-2 py-5 bg-white border border-gray-200 rounded-xl px-5">
            <View className="mt-3 flex flex-col">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "#0A192F",
                }}
              >
                Provincia
              </Text>
              <View className="mt-2 w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#0A192F",
                  }}
                >
                  {currentUser.Residency.province}
                </Text>
              </View>
            </View>

            <View className="mt-3 flex flex-col">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "#0A192F",
                }}
              >
                Cantón
              </Text>
              <View className="mt-2 w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#0A192F",
                  }}
                >
                  {currentUser.Residency.city}
                </Text>
              </View>
            </View>

            <View className="mt-3 flex flex-col">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "#0A192F",
                }}
              >
                Calle prinicipal
              </Text>
              <View className="mt-2 w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#0A192F",
                  }}
                >
                  {currentUser.Residency.mainStreet}
                </Text>
              </View>
            </View>

            <View className="mt-3 flex flex-col">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "#0A192F",
                }}
              >
                Calle secundaria
              </Text>
              <View className="mt-2 w-full h-[50px] bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center">
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#0A192F",
                  }}
                >
                  {currentUser.Residency.secondaryStreet}
                </Text>
              </View>
            </View>

            <View className="mt-3 flex flex-col">
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "#0A192F",
                }}
              >
                Referencia
              </Text>
              <View className="mt-2 w-full h-fit bg-gray-100 border border-gray-200 rounded-xl px-5 flex flex-row items-center py-5">
                <Text
                  className="text-wrap"
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: "#0A192F",
                    textAlign: "justify",
                  }}
                >
                  {currentUser.Residency.reference}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="mt-5 flex flex-row items-center gap-2 bg-[#0A192F] py-3 px-5 rounded-xl justify-center"
              onPress={goToLocation}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: "white",
                }}
              >
                Ver ubicación
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="w-full h-[100px] bg-white border border-gray-200 rounded-xl px-5 flex flex-col items-center justify-center gap-2">
            <FontAwesome5 name="heart-broken" size={24} color="#0A192F" />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              No hay datos de residencia
            </Text>
          </View>
        )}
      </View>

      {/* Mostrar productos agregados a favoritos */}
      <View className="flex flex-col gap-2 mt-5">
        <View className="flex flex-row items-center gap-2">
          <Octicons name="heart" size={24} color="#0A192F" />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: "#0A192F",
            }}
          >
            Favoritos
          </Text>
        </View>

        {favorites.length > 0 ? (
          <View className="w-full bg-white rounded-xl flex flex-col">
            {favorites.map((fav) => (
              <View className="py-5 px-5 flex flex-row items-center border-b border-gray-100">
                {/* Imagen */}
                <Image
                  source={{
                    uri: fav.Product.photo,
                  }}
                  className="w-[50px] h-[50px] rounded-full"
                />

                {/* Nombre del producto */}
                <View className="flex flex-col px-5">
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 15,
                      color: "#0A192F",
                    }}
                  >
                    {fav.Product.name}
                  </Text>
                  <Text>{dateUtils.formatRelativeTime(fav.createdAt)}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="w-full h-[100px] bg-white border border-gray-200 rounded-xl px-5 flex flex-col items-center justify-center gap-2">
            <FontAwesome5 name="heart-broken" size={24} color="#0A192F" />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              Lista de favoritos vacia
            </Text>
          </View>
        )}
      </View>

      {/* Mostrar carrito actual */}

      {/* Mostrar historial de compras */}
      <View className="mt-5 flex flex-col">
        <View className="flex flex-row items-center gap-2 mb-5">
          <Feather name="shopping-cart" size={18} color="#0A192F" />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: "#0A192F",
            }}
          >
            Compras
          </Text>
        </View>

        {sales.length > 0 ? (
          <View className="flex flex-col gap-2 py-5 bg-white border border-gray-200 rounded-xl px-5">
            {sales.map((sl) => (
              <View
                key={sl.id}
                className="flex flex-row items-start justify-between px-5 py-4 bg-white rounded-xl mb-3 shadow-sm border border-gray-200"
              >
                {/* Información */}
                <View className="flex flex-col flex-1">
                  <Text
                    style={{
                      fontFamily: "Inter_700Bold",
                      fontSize: 16,
                      color: "#0A192F",
                      marginBottom: 4,
                    }}
                  >
                    Código: #{sl.code}
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 15,
                      color: "#4B5563",
                      marginBottom: 2,
                    }}
                  >
                    Total: ${sl.total} • {sl.paymentMethod}
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: "#6B7280",
                      marginBottom: 2,
                    }}
                  >
                    Tipo: {sl.typeBuy}
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: sl.status === "Pendiente" ? "#DC2626" : "#10B981", // rojo si pendiente, verde si no
                    }}
                  >
                    Estado: {sl.status}
                  </Text>
                </View>

                {/* Botón de opciones */}
                <TouchableOpacity
                  className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center"
                  onPress={() => goToSale(sl)}
                >
                  <Octicons name="three-bars" size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View className="w-full h-[100px] bg-white px-5 flex flex-col items-center justify-center gap-2">
            <FontAwesome5 name="heart-broken" size={24} color="#0A192F" />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              Lista de compras vacía
            </Text>
          </View>
        )}
      </View>

      {/* Mostrar historial de vistas */}

      <View className="flex flex-col gap-2 mt-5">
        <View className="flex flex-row items-center gap-2">
          <Octicons name="eye" size={24} color="#0A192F" />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: "#0A192F",
            }}
          >
            Intereses recientes
          </Text>
        </View>

        {userViews.length > 0 ? (
          <View className="w-full bg-white rounded-xl flex flex-col">
            {userViews.map((usv) => (
              <View className="py-5 px-5 flex flex-row items-center border-b border-gray-100">
                {/* Imagen */}
                <Image
                  source={{
                    uri: usv.Product.photo,
                  }}
                  className="w-[40px] h-[40px] rounded-full object-contain "
                  resizeMode="cover"
                />

                {/* Nombre del producto */}
                <View className="flex flex-col px-5">
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 15,
                      color: "#0A192F",
                    }}
                  >
                    {usv.Product.name}
                  </Text>

                  <Text>
                    Visto{" "}
                    {usv.quantity === 1 ? "1 vez" : `${usv.quantity} veces`}
                  </Text>

                  <Text
                    className="mt-3"
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                    }}
                  >
                    Última vista: {dateUtils.formatRelativeTime(usv.lastView)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="w-full h-[100px] bg-white border border-gray-200 rounded-xl px-5 flex flex-col items-center justify-center gap-2">
            <FontAwesome5 name="heart-broken" size={24} color="#0A192F" />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#0A192F",
              }}
            >
              Lista de vistas vacía
            </Text>
          </View>
        )}
      </View>

      {/* Mostrar historias de citas */}

      {/* Mostrar comentarios */}
    </ScrollView>
  );
};

export default InfoUser;
