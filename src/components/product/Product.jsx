import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import laptop from 'assets/laptop.png'
import { useDispatch } from 'react-redux'
import { increment } from 'redux/slices/cart.slice'

const Product = ({ ranking, toggleShowInfo }) => {
  const dispatch = useDispatch()
  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1
      const filled = starNumber <= count
      return (
        <Octicons
          key={index}
          name={filled ? 'star-fill' : 'star'}
          size={15}
          color={filled ? '#FFD700' : '#ccc'}
        />
      )
    })
  }

  const addToCart = () => {
    // Enviar al carrito de compras en la base de datos

    //
    dispatch(increment())
  }

  return (
    <TouchableOpacity
      className="border border-gray-200 h-fit w-[49%] rounded-2xl bg-white"
      onPress={toggleShowInfo}
    >
      {/* Imagen */}
      <View className="w-full h-[120px] relative border-b border-gray-50">
        <Image source={laptop} className="w-full h-full" resizeMode="contain" />
      </View>

      {/* Contenido */}
      <View className="p-5 flex flex-col gap-2">
        <View className="flex flex-row items-center gap-1">
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 12,
              color: '#9ca3af',
            }}
          >
            Categoría
          </Text>
          <Text> - </Text>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 12,
              color: 'green',
            }}
          >
            En Stock
          </Text>
        </View>

        <Text
          numberOfLines={1}
          className="text-gray-800  truncate text-ellipsis"
          style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 18,
          }}
        >
          Secador De Cabello Morado 1500 W Voltaje 110v Color Violeta
        </Text>

        {/* Precio */}
        <View className="flex flex-row items-center gap-2">
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#1786f9',
            }}
          >
            $ 1.200
          </Text>
        </View>
        {ranking > 0 && (
          <View className="flex flex-row items-center gap-2">
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
      </View>
    </TouchableOpacity>
  )
}

export default Product
