import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons'
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import laptop from 'assets/laptop.png'
import { useState } from 'react'
import { Comment, TableRanking } from '../../components/index.components'
const InfoProduct = ({ showInfo, toggleShowInfo }) => {
  const [ranking, setRanking] = useState(0)

  return (
    <View
      className={`absolute h-full w-full bg-black/80 z-50 top-0 left-0 flex flex-col ${
        showInfo ? 'translate-y-0' : '-translate-y-full'
      } transition-all duration-300`}
    >
      {/* Header */}
      <View className="flex flex-row items-center justify-end px-5 h-[70px]">
        <TouchableOpacity onPress={toggleShowInfo}>
          <Octicons name="x" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Body */}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      >
        <View className="w-full h-full bg-white rounded-xl border border-gray-200 overflow-hidden pb-20">
          {/* Header Imagen */}
          <View className="w-full h-[200px] relative border-b border-gray-100 overflow-hidden">
            <Image
              source={laptop}
              className="w-full h-full"
              resizeMode="contain"
            />

            <TouchableOpacity className="absolute top-4 right-7 flex flex-row items-center gap-1">
              <MaterialCommunityIcons
                name="cart-plus"
                size={25}
                color={'#9ca3af'}
              />
            </TouchableOpacity>

            <TouchableOpacity className="absolute top-4 left-7 flex flex-row items-center gap-1">
              <Octicons name="heart" size={25} color={'#9ca3af'} />
            </TouchableOpacity>
          </View>

          {/* Contenido */}
          <View className="flex flex-col gap-3 p-5">
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: '#1786f9',
              }}
            >
              Categoría
            </Text>
            {/* Titulo */}
            <Text
              className="text-gray-800"
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 20,
              }}
            >
              Secador De Cabello Morado 1500 W Voltaje 110v Color Violeta
            </Text>

            {/* Descripcion */}
            <Text
              className="text-gray-600"
              style={{
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                lineHeight: 25,
                textAlign: 'justify',
              }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
              repudiandae labore praesentium autem perferendis eligendi debitis
              soluta, doloribus ab ex quidem optio, ipsum temporibus error porro
              ipsam corrupti quos veniam minus nulla velit. Repellendus,
              deleniti earum adipisci quos, dignissimos dicta, iste inventore ea
              ipsum animi commodi quidem molestiae ab quia.
            </Text>

            {/* Precio */}
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 25,
                color: '#1786f9',
              }}
            >
              $1.200
            </Text>
            <View className="flex flex-row gap-1 items-center">
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 16,
                }}
              >
                Marca:
              </Text>
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 16,
                }}
              >
                Marca 1
              </Text>
            </View>

            <View className="flex flex-row gap-1 items-center">
              <Text
                style={{
                  fontFamily: 'Inter_700Bold',
                  fontSize: 16,
                }}
              >
                Modelo:
              </Text>
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Inter_400Regular',
                  fontSize: 16,
                }}
              >
                Modelo 1
              </Text>
            </View>
          </View>

          {/* Ranking y Comentarios */}
          <View className="flex flex-col px-5 gap-2">
            <Text
              style={{
                fontFamily: 'Inter_700Bold',
                fontSize: 20,
                textAlign: 'center',
              }}
            >
              Opiniones del producto
            </Text>
            {/* Ranking */}
            <TableRanking />

            {/* Comentarios */}
            <View className=" mt-5">
              <ScrollView
                nestedScrollEnabled={true}
                style={{ height: 'auto' }}
                contentContainerStyle={{
                  paddingBottom: 20,
                }}
                scrollEnabled={true}
              >
                {/* Comentario */}
                <Comment />
              </ScrollView>
            </View>

            {/* Dejar un comentario */}
            <View className="flex flex-col gap-3 mt-5">
              {/* Calificar */}
              <View className="w-full flex flex-row items-center gap-2 justify-center">
                <TouchableOpacity onPressIn={() => setRanking(1)}>
                  <Octicons
                    name={ranking >= 1 ? 'star-fill' : 'star'}
                    size={30}
                    color={ranking >= 1 && '#1786f9'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => setRanking(2)}>
                  <Octicons
                    name={ranking >= 2 ? 'star-fill' : 'star'}
                    size={30}
                    color={ranking >= 2 && '#1786f9'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => setRanking(3)}>
                  <Octicons
                    name={ranking >= 3 ? 'star-fill' : 'star'}
                    size={30}
                    color={ranking >= 3 && '#1786f9'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => setRanking(4)}>
                  <Octicons
                    name={ranking >= 4 ? 'star-fill' : 'star'}
                    size={30}
                    color={ranking >= 4 && '#1786f9'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => setRanking(5)}>
                  <Octicons
                    name={ranking >= 5 ? 'star-fill' : 'star'}
                    size={30}
                    color={ranking >= 5 && '#1786f9'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Comentar */}
            <View className="flex flex-col w-[90%] mx-auto mt-2">
              <TextInput
                className="border border-gray-200 px-5 rounded-lg h-[150px]"
                textAlignVertical="top"
              />

              {/* Boton */}
              <TouchableOpacity className="flex flex-row w-full mt-3 items-center justify-center py-4 gap-2 bg-[#1786f9] rounded-lg">
                <MaterialIcons name="add-comment" size={20} color={'white'} />
                <Text
                  style={{
                    fontFamily: 'Inter_700Bold',
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  Comentar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default InfoProduct
