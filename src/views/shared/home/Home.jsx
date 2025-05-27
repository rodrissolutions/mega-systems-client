import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Layout from 'layouts/Layout'
import { Fontisto, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import laptop from 'assets/laptop.png'
import { useState, useLayoutEffect } from 'react'
import { Product } from 'components/index.components'
import { InfoProduct } from 'modal/index.modals.js'

const Home = ({ navigation }) => {
  const [ranking, setRanking] = useState(3)
  const [showInfo, setShowInfo] = useState(false)

  const handleInfoProduct = (id) => {
    toggleShowInfo()
  }
  const toggleShowInfo = () => setShowInfo(!showInfo)

  useLayoutEffect(() => {
    setShowInfo(false)
  }, [navigation])

  const categories = [
    { id: 1, name: 'Computadoras', image: laptop },
    { id: 2, name: 'Computadoras', image: laptop },
    { id: 3, name: 'Computadoras', image: laptop },
    { id: 4, name: 'Computadoras', image: laptop },
    { id: 5, name: 'Computadoras', image: laptop },
    { id: 6, name: 'Computadoras', image: laptop },
    { id: 7, name: 'Computadoras', image: laptop },
    { id: 8, name: 'Computadoras', image: laptop },
    { id: 9, name: 'Computadoras', image: laptop },
  ]

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
                      fontFamily: 'Orbitron_700Bold',
                      fontSize: 50,
                      color: '#FFD700',
                    }}
                  >
                    20%
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 20,
                      color: '#FFD700',
                    }}
                  >
                    de descuento
                  </Text>
                </View>
                <View className="flex-1 py-5 flex flex-col items-center justify-center gap-2 px-3 ">
                  <Text
                    style={{
                      fontFamily: 'Inter_700Bold',
                      fontSize: 20,
                      color: 'white',
                    }}
                  >
                    Aprovecha esta semana de descuento
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 15,
                      color: 'white',
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
                  <View className="flex flex-col gap-1 w-[100px] justify-center items-center mr-5">
                    {/* Imagen */}
                    <View className="w-[80px] h-[80px] rounded-full bg-white flex flex-row items-center justify-center border border-gray-200 shadow-xl shadow-gray-200">
                      <Image
                        source={item.image}
                        className="w-[50px] h-[50px]"
                      />
                    </View>

                    <Text
                      style={{
                        fontFamily: 'Inter_600SemiBold',
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
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 15,
                    color: '#fff',
                  }}
                >
                  Más vendidos
                </Text>
                <Fontisto
                  name="arrow-swap"
                  className="rotate-90"
                  color={'#fff'}
                  size={15}
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-1 flex-row w-full justify-between  gap-y-5 flex-wrap gap-2 ">
              <Product ranking={ranking} toggleShowInfo={handleInfoProduct} />
              <Product ranking={ranking} toggleShowInfo={handleInfoProduct} />
              <Product ranking={ranking} toggleShowInfo={handleInfoProduct} />
              <Product ranking={ranking} toggleShowInfo={handleInfoProduct} />
              <Product ranking={ranking} toggleShowInfo={handleInfoProduct} />
            </View>
          </View>
        </ScrollView>
      </View>
      {showInfo && (
        <InfoProduct toggleShowInfo={toggleShowInfo} showInfo={showInfo} />
      )}
    </Layout>
  )
}

export default Home
