import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import laptop from 'assets/laptop.png'
import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons'
import Layout from 'layouts/Layout'
import { useState } from 'react'
import { InfoProduct } from 'modal/index.modals'
const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [showInfo, setShowInfo] = useState(false)

  const handleInfoProduct = (id) => {
    toggleShowInfo()
  }
  const toggleShowInfo = () => setShowInfo(!showInfo)
  return (
    <Layout>
      <View className="flex  flex-1 bg-[#F5F9FF] ">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          {favorites.length === 0 ? (
            <View className="flex flex-col flex-1 w-full">
              <View className="flex flex-row items-center justify-end">
                <TouchableOpacity className="flex flex-row items-center gap-2 px-3 py-2 rounded-lg bg-[#1786f9]">
                  <MaterialIcons name="clear-all" size={30} color="white" />
                  <Text
                    style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    Borrar todo
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Favoritos */}
              <View className="flex flex-col w-full mt-5 bg-white h-fit border border-gray-100 rounded-lg">
                {/* Producto */}
                <View className="px-2 py-3 border-b border-gray-100 flex flex-row items-center">
                  {/* Imagen */}
                  <View className="w-[50px]">
                    <Image source={laptop} className="w-[40px] h-[40px]" />
                  </View>

                  {/* Información del producto */}
                  <TouchableOpacity
                    className="flex-1 flex flex-col px-3"
                    onPress={() => handleInfoProduct(1)}
                  >
                    <Text
                      style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                        color: '#9ca3af',
                      }}
                    >
                      Categoría
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter_700Bold',
                        fontSize: 16,
                      }}
                    >
                      Laptop Macbook Pro 16"
                    </Text>

                    <View className="flex flex-row items-center gap-1">
                      <Text
                        style={{
                          fontFamily: 'Inter_600SemiBold',
                          fontSize: 12,
                        }}
                      >
                        Añadido el:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                        }}
                      >
                        20/05/2023
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity className="w-[40px] h-full flex flex-row items-center justify-center">
                    <Octicons name="trash" size={20} color={'#991B1B'} />
                  </TouchableOpacity>
                </View>

                <View className="px-2 py-3 border-b border-gray-100 flex flex-row items-center">
                  {/* Imagen */}
                  <View className="w-[50px]">
                    <Image source={laptop} className="w-[40px] h-[40px]" />
                  </View>

                  {/* Información del producto */}
                  <TouchableOpacity className="flex-1 flex flex-col px-3">
                    <Text
                      style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                        color: '#9ca3af',
                      }}
                    >
                      Categoría
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter_700Bold',
                        fontSize: 16,
                      }}
                    >
                      Laptop Macbook Pro 16"
                    </Text>

                    <View className="flex flex-row items-center gap-1">
                      <Text
                        style={{
                          fontFamily: 'Inter_600SemiBold',
                          fontSize: 12,
                        }}
                      >
                        Añadido el:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                        }}
                      >
                        20/05/2023
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity className="w-[40px] h-full flex flex-row items-center justify-center">
                    <Octicons name="trash" size={20} color={'#991B1B'} />
                  </TouchableOpacity>
                </View>
                <View className="px-2 py-3 border-b border-gray-100 flex flex-row items-center">
                  {/* Imagen */}
                  <View className="w-[50px]">
                    <Image source={laptop} className="w-[40px] h-[40px]" />
                  </View>

                  {/* Información del producto */}
                  <TouchableOpacity className="flex-1 flex flex-col px-3">
                    <Text
                      style={{
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                        color: '#9ca3af',
                      }}
                    >
                      Categoría
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter_700Bold',
                        fontSize: 16,
                      }}
                    >
                      Laptop Macbook Pro 16"
                    </Text>

                    <View className="flex flex-row items-center gap-1">
                      <Text
                        style={{
                          fontFamily: 'Inter_600SemiBold',
                          fontSize: 12,
                        }}
                      >
                        Añadido el:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                        }}
                      >
                        20/05/2023
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity className="w-[40px] h-full flex flex-row items-center justify-center">
                    <Octicons name="trash" size={20} color={'#991B1B'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View className="flex flex-1 justify-center items-center h-full w-full gap-1">
              <FontAwesome5 name="heart-broken" size={40} color="#9ca3af" />
              <Text
                className="text-gray-400"
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 20,
                }}
              >
                No tienes favoritos agregados
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      {showInfo && (
        <InfoProduct toggleShowInfo={toggleShowInfo} showInfo={showInfo} />
      )}
    </Layout>
  )
}

export default Favorites
