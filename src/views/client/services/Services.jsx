import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Layout from 'layouts/Layout'
import preventivo from 'assets/preventivo.jpg'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const Services = () => {
  const navigation = useNavigation()

  const goToHistory = () => {
    navigation.navigate('History')
  }
  const goToAppointment = () => {
    navigation.navigate('Appointment')
  }

  return (
    <Layout>
      <View className="flex flex-col flex-1">
        {/* FILTROS */}
        <View className="flex flex-row h-[50px] bg-white border-b border-gray-200 shadow-md shadow-gray-300">
          <TouchableOpacity className="flex-1 h-full flex flex-row justify-center items-center border-r border-gray-200 gap-2">
            <Octicons name="filter" size={20} color={'#9ca3af'} />
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: '#9ca3af',
              }}
            >
              Filtrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 h-full flex flex-row justify-center items-center border-r border-gray-200 gap-2"
            onPress={goToHistory}
          >
            <Octicons name="history" size={20} color={'#9ca3af'} />
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: '#9ca3af',
              }}
            >
              Citas (20)
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          className="flex-1 bg-[#F5F9FF] px-4 "
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 20,
          }}
        >
          <View className="flex flex-col gap-2">
            <View className="w-full h-fit bg-white rounded-xl overflow-hidden pb-10 border border-gray-100 shadow-xl shadow-gray-100">
              {/* Imagen */}
              <View className="w-full h-[250px] relative">
                <Image
                  source={preventivo}
                  className="w-full h-full object-cover absolute"
                  resizeMode="cover"
                />
              </View>

              {/* Contenido */}
              <View className="flex flex-col gap-1 mt-4 px-5">
                <Text
                  style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    color: '#1786f9',
                  }}
                >
                  Categoría
                </Text>

                <Text
                  style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 20,
                  }}
                >
                  Mantenimiento preventivo
                </Text>
                <Text
                  className="text-gray-500"
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    textAlign: 'justify',
                    lineHeight: 20,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  exercitationem vitae mollitia maiores consectetur quae
                  necessitatibus quas earum enim soluta. Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Tempore, similique!
                </Text>

                <View className="flex flex-row items-center gap-1">
                  <Text
                    style={{
                      fontFamily: 'Inter_500Medium',
                      fontSize: 16,
                    }}
                  >
                    Costo estimado:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    }}
                  >
                    $20.00
                  </Text>
                </View>

                {/* Boton */}
                <TouchableOpacity
                  className="flex flex-row items-center justify-center py-4 gap-2 rounded-lg bg-[#1786f9] mt-2"
                  onPress={goToAppointment}
                >
                  <Octicons name="calendar" size={20} color={'white'} />
                  <Text
                    style={{
                      fontFamily: 'Inter_700Bold',
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    Agendar cita
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  )
}

export default Services
