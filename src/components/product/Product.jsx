import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import laptop from 'assets/laptop.png'

const Product = ({ ranking }) => {
  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1
      const filled = starNumber <= count
      return (
        <Octicons
          key={index}
          name={filled ? 'star-fill' : 'star'}
          size={20}
          color={filled ? '#1786f9' : '#ccc'}
        />
      )
    })
  }

  return (
    <View className="border border-gray-200 h-[400px] w-full rounded-lg bg-white">
      {/* Imagen */}
      <View className="w-full h-[200px] relative border-b border-gray-100">
        <Image source={laptop} className="w-full h-full" resizeMode="contain" />

        <TouchableOpacity className="absolute top-3 right-5 flex flex-row items-center gap-1">
          <Octicons name="eye" size={20} color={'#9ca3af'} />
          <Text
            style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 16,
              color: '#9ca3af',
            }}
          >
            Ver
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <View className="p-5 flex flex-col gap-2">
        <Text
          className="text-gray-400"
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
          }}
        >
          Secador De Cabello Morado 1500 W Voltaje 110v Color Violeta
        </Text>

        {ranking > 0 && (
          <View className="flex flex-row items-center gap-2">
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: '#9ca3af',
              }}
            >
              {ranking}.0
            </Text>
            <View className="flex flex-row items-center gap-1">
              {renderStars(ranking)}
            </View>
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                color: '#9ca3af',
              }}
            >
              (12)
            </Text>
          </View>
        )}

        {/* Precio */}
        <View className="flex flex-row items-center gap-2">
          <Text
            style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 25,
              color: '#1786f9',
            }}
          >
            $1.200
          </Text>
        </View>

        <TouchableOpacity className="flex flex-row items-center justify-center gap-2 h-[40px] bg-[#1786f9] rounded-lg">
          <MaterialCommunityIcons name="cart-plus" size={20} color={'#fff'} />
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#fff',
            }}
          >
            Agregar al carrito
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Product
