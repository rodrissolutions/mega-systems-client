// components/CarritoAside.js
import { Text, TouchableOpacity, View } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import empty from 'assets/empty.json'
import { useNavigation } from '@react-navigation/native'

const Cart = ({ openCart, toggleOpenCart }) => {
  const navigation = useNavigation()

  const goToLogin = () => {
    toggleOpenCart()
    navigation.navigate('Login')
  }

  const goToRegister = () => {
    toggleOpenCart()
    navigation.navigate('Register')
  }

  if (!openCart) return null

  return (
    <View
      className={`absolute top-[80px] w-full h-screen bg-white z-50 border-t border-gray-700 flex flex-col`}
    >
      <View className="py-10 bg-[#0A192F] px-5 flex flex-col">
        <View className="flex flex-row items-center gap-3">
          <View className="w-[60px] h-[60px] rounded-full bg-white border-gray-200 flex justify-center items-center">
            <Octicons name="person" size={30} color="#ccc" />
          </View>
          <View className="flex flex-col gap-1 max-w-[85%]">
            <Text
              className="text-white"
              style={{ fontFamily: 'Inter_700Bold', fontSize: 18 }}
            >
              Bienvenido
            </Text>
            <Text
              className="text-gray-400"
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 15,
                flexWrap: 'wrap',
              }}
            >
              Ingresa a tu cuenta para ver tus compras, favoritos, etc.
            </Text>
          </View>
        </View>

        <View className="flex flex-row mt-5 px-5 gap-3">
          <TouchableOpacity
            className="bg-[#1458b9] w-[50%] py-3 flex justify-center items-center"
            onPress={goToLogin}
          >
            <Text
              className="text-white"
              style={{ fontFamily: 'Inter_600SemiBold', fontSize: 15 }}
            >
              Ingresa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white w-[50%] py-3 justify-center items-center border border-[#1458b9]"
            onPress={goToRegister}
          >
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 15 }}>
              Crea tu cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex justify-center items-center py-10">
        <LottieView
          autoPlay
          loop
          source={empty}
          style={{ width: 200, height: 200 }}
        />
        <Text
          className="text-gray-500"
          style={{ fontFamily: 'Inter_600SemiBold', fontSize: 21 }}
        >
          No tienes nada en el carrito
        </Text>
      </View>
    </View>
  )
}

export default Cart
