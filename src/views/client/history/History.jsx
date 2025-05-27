import { Entypo, Octicons } from '@expo/vector-icons'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const History = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#F5F9FF',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <View className="flex flex-col flex-1">
        {/* Cita */}
        <View className="w-full h-fit bg-white border border-gray-200 rounded-lg flex flex-col gap-2 overflow-hidden pb-5">
          {/* Titutlo y fecha */}
          <View className=" flex-col px-5 py-3">
            <View className="flex flex-row items-center gap-2">
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 17,
                  color: '#0A192F',
                }}
              >
                Mantenimiento preventivo -
              </Text>
              <Text
                className="px-2 py-1 bg-green-800 rounded-full"
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 7,
                  color: 'white',
                }}
              >
                Pendiente
              </Text>
            </View>
            <View className="flex flex-row gap-1 items-center mt-2">
              <Text
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 13,
                }}
              >
                Programada para el:
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter_500Medium',
                  fontSize: 13,
                }}
              >
                20/01/2023 - 10:00 AM
              </Text>
            </View>
            <Text
              className="mt-2 text-gray-600"
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 13,
                textAlign: 'justify',
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              vero, impedit beatae doloremque officiis corporis possimus
              excepturi consequuntur nesciunt esse cumque et dignissimos animi
              id magni omnis, error consequatur. Sunt fuga suscipit eveniet
              officiis praesentium nam qui temporibus labore tempore doloribus
              perspiciatis repellendus, nesciunt, exercitationem, soluta nisi
              blanditiis dolores totam?
            </Text>
          </View>
          <View className="w-full flex flex-col items-center justify-between px-5 gap-2">
            <TouchableOpacity className="w-full flex flex-row items-center justify-center bg-[#1786f9] py-3 rounded-lg gap-2">
              <Entypo name="calendar" size={20} color={'#fff'} />
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 17,
                  color: 'white',
                }}
              >
                Actualizar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-full flex-row items-center justify-center bg-[#7f1d1d] gap-2 py-3 rounded-lg">
              <Octicons name="trash" size={20} color="white" />
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 17,
                  color: 'white',
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default History
